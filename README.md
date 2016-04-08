# Vue Hot Reloading Template For Cordova / PhoneGap

Vue,Vuex,Vue-Router Cordova / PhoneGap Template with Babel, Webpack and Hot Reloading

## Getting Started

### Prerequisites

To use this template, you'll need Node.js v5 or newer.

### Installation

To use this as a template, use Cordova 6.0.0+ and create a new project:

```
cordova create MyAppName --template=https://github.com/yunshansimon/phonegap-template-react-hot-loader
```

```
cd MyAppName
```

```
npm install
```
### Write your ES6 code
```
|-index.html
|--src
|   |--main.js      # bootstrap file  
|   |--App.vue      # main Vue file
|   |--components   # vue components directory
|   |--vuex         # vuex file
|--res              # cordova icons and flash screen images
|--build            # npm build/prepare js commands
|--www              # cordova source directory
|--hooks            # cordova hooks directory (Deprecated)
|--static           # keep for old commands
```

### Run the app in the browser / simulator

Run this to start the development webpack server:

```
npm run dev
```

You can then open the app in your browser by visiting [localhost:8080](http://localhost:8080)


Notice:You need install Cordova, Node.js on your system.


### Build the app for production

Compile your ES6 code to Cordova `/www` directory and copy the files to Cordova platform directory

```
npm run prepare
```

Use cordova to build your app:

```
cordova buile android --[debug,release]
```


This will switch your `config.xml` file to production mode, build the app bundle to `/www` using Webpack, and run `cordova build` for you.

After that, the normal Cordova / PhoneGap commands can be used such as `phonegap serve`, or `cordova run ios`, etc.

# License

MIT. Copyright (c) 2016 Jed Watson. Yang Tsao.
