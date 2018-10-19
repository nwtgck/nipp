#ua-device-detector
##

[![Build Status](https://travis-ci.org/srfrnk/ua-device-detector.svg?branch=master)](https://travis-ci.org/srfrnk/ua-device-detector)
[![GitHub issues](https://img.shields.io/github/issues/srfrnk/ua-device-detector.svg)](https://github.com/srfrnk/ua-device-detector/issues)
[![Known Vulnerabilities](https://snyk.io/package/npm/ua-device-detector/badge.svg)](https://snyk.io/package/npm/ua-device-detector)
[![Open Source Helpers](https://www.codetriage.com/srfrnk/ua-device-detector/badges/users.svg)](https://www.codetriage.com/srfrnk/ua-device-detector)

[![GitHub license](https://img.shields.io/github/license/srfrnk/ua-device-detector.svg)](https://github.com/srfrnk/ua-device-detector/blob/master/license.txt)
[![npm](https://img.shields.io/npm/dm/ua-device-detector.svg)](https://www.npmjs.com/package/ua-device-detector) 
[![npm](https://img.shields.io/npm/dt/ua-device-detector.svg)](https://www.npmjs.com/package/ua-device-detector)
[![npm](https://img.shields.io/npm/v/ua-device-detector.svg)](https://www.npmjs.com/package/ua-device-detector)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Semver](http://img.shields.io/SemVer/2.0.0.png)](http://semver.org/spec/v2.0.0.html)

### Install
$ bower i ua-device-detector -S

### Server-Side Usage
```javascript
var uaDeviceDetector=require('ua-device-detector');
.
.
.
var deviceInfo=uaDeviceDetector.parseUserAgent(options);
```

### Client-Side Usage
Add script load to HTML:

```html
<script type="text/javascript" src=".../re-tree.js"></script>
<script type="text/javascript" src=".../ua-device-detector.js"></script>
```
Then use in your javascript:
```javascript
var deviceInfo=window.uaDeviceDetector.parseUserAgent(options);
```

To use from angular:

**Don't** - Instead use ng-device-detector :)

Usage with `Webpack`:

An issue with webpack might cause an error like this:
```diff
- Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
```

To solve add this to your `webpack.config.js`:
```js
module.exports = {
    module: {
        unknownContextCritical:false,
    }
}
```

More details [here](https://github.com/AnalyticalGraphicsInc/cesium/issues/4876)

### API

parseUserAgent options specification:
- userAgent: (string, required) user agent string to parse
- customDetectors: ([object], optional) array of custom detectors:
    - name: (string, required) name of detector as it will appear in deviceInfo
    - re: (string|regex|reTree expression, required) the expression to use for detecting

parseUserAgent returns a deviceInfo object:
- raw
    - userAgent (string) - raw user agent
    - os (object) - true/false detections per os
    - browser (object) - true/false detections per browser
    - device (object) - true/false detections per device
- os (string) - detected os
- browser (string) - detected browser
- device (string) - detected device
- os_version (string) - detected os version
- browser_version (string) - detected browser version
- isMobile() - returns true if device is mobile. false otherwise
- isTablet() - returns true if device is tablet. false otherwise
- isDesktop() - returns true if device is desktop. false otherwise
- custom (object) - true/false result of detection per custom detector

### Support

Pull-requests with new stuff will be highly appreciated :)

**Please remember to add tests when making changes.**

### License

[MIT License](//github.com/srfrnk/ua-device-detector/blob/master/license.txt)
