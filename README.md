<p align="center">
  <img alt="screens" title="screens" src="https://i.imgur.com/5YrG1Zs.png" width="700">
</p>


### Setup

```sh
# clone this repository
$ git clone https://github.com/ElamC/spot-app.git
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

#### Update & run project on ios simulator

``` sh
$ npm-check -y
$ react-native run-ios
```
