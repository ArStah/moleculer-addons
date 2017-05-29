![Moleculer logo](http://moleculer.services/images/banner.png)

# moleculer-store-mongoose [![NPM version](https://img.shields.io/npm/v/moleculer-store-mongoose.svg)](https://www.npmjs.com/package/moleculer-store-mongoose)

Mongoose adapter for Moleculer Store service

## Features

## Install

```bash
$ npm install moleculer-store-mongoose --save
```
or
```bash
$ yarn add moleculer-store-mongoose
```

## Usage

```js
"use strict";

const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker();

// Load service
broker.createService(require("moleculer-store-mongoose"));

// Call
broker.call("store-mongoose.xyz", {}).then(console.log);
/* Result: ??? */

```

## Settings
| Property | Description |
| -------- | ----------- |

## Actions
| Name | Params | Result | Description |
| ---- | ------ | ------ | ----------- |

# Test
```
$ npm test
```

In development with watching

```
$ npm run ci
```

# License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

# Contact
Copyright (c) 2016-2017 Ice Services

[![@ice-services](https://img.shields.io/badge/github-ice--services-green.svg)](https://github.com/ice-services) [![@MoleculerJS](https://img.shields.io/badge/twitter-MoleculerJS-blue.svg)](https://twitter.com/MoleculerJS)