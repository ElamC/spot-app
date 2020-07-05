
<p align="center">
  <img alt="logo" title="logo" src="https://i.imgur.com/i8VpW6P.png" width="150">
</p>
<br>




## Table of Contents

- [Introduction](#introduction)
- [Pull Request](#pull-request)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Spot lets you find charge points near you, view relevant information, and get live directions. Built with React Native, using  data from [openchargemap](https://openchargemap.org/site).

**Tested on iOS only.**

<p align="center">
  <img alt="screens" title="screens" src="https://i.imgur.com/5YrG1Zs.png" width="900">
</p>


## Pull Request

Spot is open source, so you can create a pull request after fixing any issues. Please follow the steps below in order to start development.


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

Before creating a pull request, test and check for any errors. If there are no errors, commit and push.

For more information, please refer to the Contributing section.

## Contributing

Contributions are always welcome! 

Feel free to take on any issue that's currently open and resolve any that you would enjoy working on, even if it happens to be low priority.

## License

[(Back to top)](#table-of-contents)


The MIT License (MIT) 2017 - [Athitya Kumar](https://github.com/athityakumar/). Please have a look at the [LICENSE.md](LICENSE.md) for more details.
