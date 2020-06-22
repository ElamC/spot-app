import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';
import Modal from 'react-native-modal';
import GetLocation from 'react-native-get-location';
import publicIP from 'react-native-public-ip';
import SplashScreen from 'react-native-splash-screen';
import Config from "react-native-config";

import { PINREV, PIN, CHARGE, DIRECTION, CROSSHAIR, LOCATION } from './src';
import mapStyle from './src/mapstyle.json';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      userIP: null,
      animation: new Animated.Value(0)
    };
  }


  UNSAFE_componentWillMount() {
    //disable warning
    console.disableYellowBox = true;

    //disable statusbar
    StatusBar.setHidden(true);

    publicIP().then(ip => {
      this.setState({ userIP: ip })
    })

    this.currentLocation();

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }


  /** 
  * fetch current location
  * @returns {object} region 
  */
  async currentLocation() {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        this.setState({ location });
        this.apiData(location.latitude, location.longitude);

        this.setState({
          region: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.01
          }
        })
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }


  /** 
  * call openchargemap API
  * pass coordinates from currentLocation()
  * default: maxresults=10, radius=5
  * @param {number} lat
  * @param {number} lon
  * @returns {object} response 
  */
  async apiData(lat, lon) {
    let resp = await fetch('https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&latitude=' + lat + '&longitude=' + lon + '&distance=5&compact=true&distanceunit=KM&maxresults=10')
    let respJson = await resp.json()
    this.setState({ data: this.removeDuplicates(respJson) })
  }


  /** 
  * remove duplicate data in apiData() response
  * @param {object} arr - JSON array
  * @returns {object} uniqueData
  */
  removeDuplicates(arr) {
    const map = new Map();
    arr.forEach(v => map.set(v.AddressInfo.Postcode, v))
    let uniqueData = [...map.values()];
    return uniqueData
  }


  /** 
  * fetch current location region & city name using public ip
  * @returns {object} locationName
  */
  async getLocationName() {
    let resp = await fetch('http://ip-api.com/json/' + this.state.userIP)
    let respJson = await resp.json()
    this.setState({ locationName: respJson['city'] + ', ' + respJson['regionName'] })
  }


  /** 
  * call Google Distance Matrix API
  * set distance & duration states
  * @param {number} endLat - endPoint latitude
  * @param {number} endLat - endPoint longitude
  */
  async distanceMatrix(lat, lon) {
    let resp = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + this.state.location.latitude + ',' + this.state.location.longitude + '&destinations=' + lat + ',' + lon + '&key=' + Config.GOOGLE_API_KEY)
    let respJson = await resp.json()

    let distance = respJson['rows'][0]['elements'][0]['distance']['text']
    this.setState({ spotDistance: distance })

    let duration = respJson['rows'][0]['elements'][0]['duration']['text']
    this.setState({ spotDuration: duration })
  }


  /** 
  * opens maps w/ directions to passed marker
  * startPoint: current location
  * endPoint: marker location
  * @param {number} endLat - endPoint latitude
  * @param {number} endLat - endPoint longitude
  */
  callShowDirections = (endLat, endLon) => {
    const startPoint = {
      longitude: this.state.location.longitude,
      latitude: this.state.location.latitude
    }
    const endPoint = {
      longitude: endLon,
      latitude: endLat
    }
    OpenMapDirections(startPoint, endPoint, 'd');
  }


  /** 
  * instantiate MapView w/ Google Maps
  * @param {object} loc - location
  * @param {object} points - marker array
  * @returns {object} MapView
  */
  displayMap(loc, points) {
    return <MapView.Animated
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
      ref={ref => { this.map = ref; }}
      initialRegion={{
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.01
      }}
    >
      {points}
    </MapView.Animated>
  }

  /** 
  * animate legend on modal press
  */
  toggleLegend() {
    const toValue = this.open ? 0 : 1

    Animated.spring(this.state.animation, {
      toValue,
      friction: 6,
      useNativeDriver: true
    }).start();

    this.open = !this.open;
  }


  /** 
  * animate MapView to marker region
  * zoom on met condition, else zoom to state.region
  * @param {number} lat - latitude
  * @param {number} lon - longitude
  * @param {boolean} condition - press condition
  */
  animateToMarker(lat, lon, condition) {
    if (condition) {
      this.map.animateToRegion(
        {
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        350
      );
    } else {
      this.map.animateToRegion(
        this.state.region,
        350
      );
    }
  }


  /** 
  * animates map to current region (state.region)
  */
  restoreLocation() {
    this.map.animateToRegion(
      this.state.region,
      350
    );
  }


  /** 
  * marker press method
  * @param {string} title - name
  * @param {string} pcode - postcode
  * @param {string} town - town
  * @param {string} city - city
  * @param {number} numpoint - charging bay #
  * @param {number} lat - marker latitude
  * @param {number} lon - marker longitude
  */
  markerPress(title, pcode, town, city, numpoint, lat, lon) {
    this.setState({ title: title })
    this.setState({ pcode: pcode })
    this.setState({ town: town })
    this.setState({ city: city })
    this.setState({ numpoint: numpoint })
    this.setState({ visibleModal: 5 })
    this.setState({ directionsLat: lat })
    this.setState({ directionsLon: lon })
    this.animateToMarker(lat, lon, true)
    this.distanceMatrix(lat, lon)
    this.toggleLegend()
    this.getLocationName()
  }


  /** 
  * modal press method
  * animateToMarker() condition default: false
  */
  modalPress() {
    this.setState({ visibleModal: null })
    this.animateToMarker(null, null, false)
    this.toggleLegend()
    this.titleString(this.state.title)
  }


  /** 
  * remove separators from title
  * sets shortened to title state
  * @param {string} title - title
  */
  titleString(title) {
    let output = ''

    if (title.split(/[\s,]+/)[1] == undefined) {
      output = title.split(/[\s,]+/)[0]
    } else {
      output = title.split(/[\s,]+/)[0] + ' ' + this.state.title.split(/[\s,]+/)[1]
    }

    return output
  }


  /** 
  * render method
  */
  render() {
    const legendStyle = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140]
          })
        }
      ]
    }

    let pointsArr = [];
    let callMap;


    if (this.state.location != null && this.state.data != null) {

      /** 
      * create array of markers (pointsArr[])
      */
      for (let i = 0; i < 10; i++) {
        if (this.state.data[i] == null) {
          continue;
        }

        coord = { latitude: this.state.data[i].AddressInfo.Latitude, longitude: this.state.data[i].AddressInfo.Longitude }
        pointsArr.push(
          <Marker
            key={i}
            coordinate={coord}
            onPress={(e) => { e.stopPropagation(); this.markerPress(this.state.data[i].AddressInfo.Title, this.state.data[i].AddressInfo.Postcode, this.state.data[i].AddressInfo.Town, this.state.data[i].AddressInfo.StateOrProvince, this.state.data[i].NumberOfPoints, this.state.data[i].AddressInfo.Latitude, this.state.data[i].AddressInfo.Longitude) }}
          >
            <Image source={PIN} style={{ height: 40, width: 40 }} />
          </Marker >
        )
      }
      callMap = this.displayMap(this.state.location, pointsArr)
    }

    return (
      <View style={styles.container}>

        {callMap}

        <Animated.View style={[styles.legend, legendStyle]}>
          <Image source={PINREV} style={{ height: 30, width: 30 }} />
          <Text style={{ fontWeight: "bold", color: '#fff', padding: 6, marginLeft: 5 }}>Charging spot</Text>
        </Animated.View>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.locbutton}
          onPress={() => this.restoreLocation()}
        >
          <Image source={CROSSHAIR} style={{ height: 25, width: 25 }} resizeMode={'cover'} />
        </TouchableOpacity>


        <Modal isVisible={this.state.visibleModal === 5} onBackdropPress={(e) => { e.stopPropagation(); this.modalPress() }} backdropColor={'transparent'} animationOutTiming={400} style={styles.bottomModal}>
          <View style={styles.modalContent}>
            <Text style={styles.spotname}>{(this.state.title != undefined) ? this.titleString(this.state.title) : 'undefined_title'}</Text>
            <View style={{ flexDirection: 'row' }}>
              {this.state.numpoint != null ? <Image source={CHARGE} style={styles.spotimg} /> : <Text />}
              <Text style={styles.spotnum}>{this.state.numpoint}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Image source={LOCATION} style={styles.spotimg} />
              <Text style={styles.spotnum}>{this.state.city != null ? this.state.city : this.state.town}, {this.state.pcode}</Text>
            </View>

            <View style={{
              justifyContent: 'center',
              alignItems: "center",
              position: "absolute",
              right: 30,
              top: -35,
            }}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.directionbutn}
                onPress={() => this.callShowDirections(this.state.directionsLat, this.state.directionsLon)}
              >
                <Image source={DIRECTION} style={styles.directionimg} />
              </TouchableOpacity>
              <Text style={styles.distance}>{this.state.spotDistance}</Text>
              <Text style={styles.time}>{this.state.spotDuration}</Text>
            </View>

          </View>
        </Modal>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -60
  },
  legend: {
    position: 'absolute',
    top: 60,
    right: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 20,
    width: 170,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#0055ff',
    shadowColor: '#0055ff',
    shadowOpacity: 0.4,
    flexDirection: 'row',
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  locbutton: {
    width: 50,
    height: 50,
    marginLeft: 30,
    borderRadius: 50,
    position: 'absolute',
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 20,
  },
  spotname: {
    fontSize: 26,
    color: "#1a202c",
    marginTop: 0,
    marginBottom: 14,
  },
  distance: {
    marginTop: 10,
    fontSize: 22,
    color: "#1a202c",
  },
  postcode: {
    letterSpacing: 0.25,
    textTransform: "uppercase",
    fontSize: 14,
    color: "#4a5568",
    fontWeight: "700",
  },
  spotimg: {
    height: 30,
    width: 30,
    marginBottom: 10,
  },
  spotloc: {
    color: "#4a5568",
    fontSize: 14,
    marginLeft: 'auto'
  },
  spotnum: {
    color: "#737ea1",
    fontSize: 16,
    fontWeight: "500",
    flexDirection: 'row',
    marginLeft: 12,
    paddingBottom: 5,
    paddingTop: 5,
  },
  time: {
    color: "#737ea1",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  directionimg: {
    height: 28,
    width: 28,
  },
  directionbutn: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#0055ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    height: 165,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 20,
  },
  bottomModal: {
    justifyContent: 'center',
    marginTop: 660,
  },
});