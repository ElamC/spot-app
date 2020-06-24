
<p align="center">
  <img alt="logo" title="logo" src="https://i.imgur.com/i8VpW6P.png" width="150">
</p>
<br>

<p align="center">
  Finding charge points, made easy. Built with React Native.
</p>


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Packages](#packages)
- [Pull Request](#pull-request)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Spot lets you find charge points near you, view relevant information, and get live directions. Built with React Native, using  data from [openchargemap](https://openchargemap.org/site).

**Tested on iOS only.**

<p align="center">
  <img alt="screens" title="screens" src="https://i.imgur.com/5YrG1Zs.png" width="900">
</p>

## Features

A few of the things you can do with Spot:

* Find charging points near you
* View point information
* Get live directions
* Update results based on location


## Packages

| Name | Description |
| --- | --- |
| [`@react-native-modal`](https://github.com/react-native-community/react-native-modal) | Customizable React Native modal |
| [`@react-native-navigation-directions`](https://github.com/laki944/react-native-navigation-directions) | Open default maps app with directions |
| [`@react-native-maps`](https://github.com/react-native-community/react-native-maps) | React Native Mapview component |
| [`@react-native-get-location`](https://github.com/douglasjunior/react-native-get-location) | Get native device location |
| [`@react-native-public-ip`](https://github.com/teamairship/react-native-public-ip) | Get public IP address |
| [`@react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen) | Splash screen for React Native |
| [`@npm-check`](https://github.com/dylang/npm-check) | Check dependencies |


## Pull Request

Spot is open source, so you can create a pull request after fixing any issues. Please follow the steps below in order to start development.


### Setup

Fork `master` branch into your personal repository and clone to local machine. From your command line:

```sh
# Clone this repository
$ git clone https://github.com/ElamC/Spot.git

# Go into the repository
$ cd Spot

# Install dependencies
$ npm install

# Initialize Podfile
$ cd ios
$ pod install

# Return to root directory
$ cd ../
```


### Usage

#### Google Maps SDK
To enable Google Maps on iOS, obtain an API key from [Maps SDK for iOS](https://developers.google.com/maps/documentation/ios-sdk/get-api-key), and edit your .env.example file as follows:


```dosini
# replace KEY with your Google API key
# Copy and rename this file to '.env'

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

Before creating a pull request, test and check for any errors. If there are no errors, commit and push.

For more information, please refer to the Contributing section.

## Contributing

Thank you for thinking of contributing to this project.
Your contributions are always welcome! 

Please feel free to take on any issue that's currently open. Feel free to resolve any issue that you would enjoy working on even if it happens to be a low priority.

## License

[(Back to top)](#table-of-contents)


The MIT License (MIT) 2017 - [Athitya Kumar](https://github.com/athityakumar/). Please have a look at the [LICENSE.md](LICENSE.md) for more details.
