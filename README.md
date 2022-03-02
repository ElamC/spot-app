<p align="center">
  <img alt="logo" title="logo" src="https://i.imgur.com/i8VpW6P.png" width="100">
</p>
<br>

Find and view EV charge points near you. Built with React Native, using  data from [openchargemap](https://openchargemap.org/site).

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)


<p align="center">
  <img alt="screens" title="screens" src="https://i.imgur.com/5YrG1Zs.png" width="700">
</p>


## Development

### Setup

```sh
# clone this repository
$ git clone https://github.com/ElamC/spot-deprecated.git
$ cd spot-app

# install dependencies
$ npm install

# initialize podfile
$ cd ios
$ pod install

# return to root directory
$ cd ../
```


### Usage

#### Google Maps API
To enable Google Maps on iOS, obtain an API key from [Maps SDK for iOS](https://developers.google.com/maps/documentation/ios-sdk/get-api-key), and edit your .env.example file as follows:


```dosini
# replace KEY with your Google API key
# copy and rename this file to '.env'

GOOGLE_API_KEY=KEY
```


#### Package update

``` sh
$ npm-check -y
```

#### Run project on ios simulator

``` sh
$ react-native run-ios
```


## Contributing

This project is now archived.

## License

[(Back to top)](#table-of-contents)


The MIT License (MIT) 2017 - [Athitya Kumar](https://github.com/athityakumar/). Please have a look at the [LICENSE.md](LICENSE.md) for more details.
