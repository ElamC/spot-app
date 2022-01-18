<p align="center">
  <img alt="logo" title="logo" src="https://i.imgur.com/i8VpW6P.png" width="120">
</p>
<br>

Spot lets you find EV charge points near you, view relevant information, and get live directions. Built with React Native, using  data from [openchargemap](https://openchargemap.org/site).

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)


<p align="center">
  <img alt="screens" title="screens" src="https://i.imgur.com/5YrG1Zs.png" width="800">
</p>


## Development
Please follow the steps below.


### Setup

Fork `master` branch into your personal repository and clone to local machine. From your command line:

```sh
# clone this repository
$ git clone https://github.com/ElamC/spot-app.git

# go into the repository
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

This project is now archived, but contributions are welcome!

## License

[(Back to top)](#table-of-contents)


The MIT License (MIT) 2017 - [Athitya Kumar](https://github.com/athityakumar/). Please have a look at the [LICENSE.md](LICENSE.md) for more details.
