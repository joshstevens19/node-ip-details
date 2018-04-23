# node-ip details

[![npm package](https://nodei.co/npm/node-ip-details.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-ip-details/)

node-ip-details is an lightweight fast node package to find full details of any ip address. It is perfect to use when wanting to block requests from certain countries ip addresses,tracking if the request has came from a proxy or not,finding out the internet provider for the ip address and finding full geolocation details for the ip.

## super simple to use

node-ip-details has been designed to be the simplest way possible to retrieve full details of any ip address or ip addresses.

### native promises

#### single ip address

```js
// import that library
const ipdetails = require("node-ip-details");
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ip: "1.1.1.1"});

// return all the information for the IP supplied
ipInitialised.allInformation()
         .then(r => console.dir(r))
         .catch(err => console.error(err))
```

#### multiple ip addresses, you can request a maximum of 100 in each request

```js
// import that library
const ipdetails = require("node-ip-details");
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ips: ["1.1.1.1", "8.8.8.8"]});

// return all the information for the IP supplied
ipInitialised.allInformation()
         .then(r => console.dir(r))
         .catch(err => console.error(err))
```

### async and await

#### single ip address

```js
// import that library
const ipdetails = require("node-ip-details");
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ip: "1.1.1.1"});

async () => {
    try {
        const result = await ipInitialised.allInformation()
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
}
```

#### multiple ip addresses, you can request a maximum of 100 in each request

```js
// import that library
const ipdetails = require("node-ip-details");
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ips: ["1.1.1.1", "8.8.8.8"]});

async () => {
    try {
        const result = await ipInitialised.allInformation()
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
}
```

### example successful response for single ip address

```js
{
    city: "Leicester",
    regionName: "England",
    regionCode: "Eng",
    countryName: "United Kingdom",
    countryCode: "GB",
    latitude: 54.8794,
    longitude: -6.7389,
    mobile: false,
    internetProvider: "Virgin Media",
    proxy: "false",
    query: "81.45.980.123",
    timezone: "Europe/London",
    zip: "LE1",
}
```

### example successful response for multiple ip addresses

Bulk request will not give you details about if they are on mobile or if they are on an proxy.

```js
[
    {
        city: "Research",
        regionName: "Victoria",
        regionCode: "VIC",
        countryName: "Australia",
        countryCode: "AU",
        latitude: -37.7,
        longitude: 145.1833,
        internetProvider: "APNIC and Cloudflare DNS Resolver project",
        query: "1.1.1.1",
        timezone: "Australia/Melbourne",
        zip: "3095"
    },
    {
        city: "Mountain View",
        regionName: "California",
        regionCode: "CA",
        countryName: "United States",
        countryCode: "US",
        latitude: 37.4229,
        longitude: -122.085,
        internetProvider: "Google",
        query: "8.8.8.8",
        timezone: "America/Los_Angeles",
        zip: ""
    }
]
```

### response table content

|        Name      |           Description          |    Type    |
| ---------------- | ------------------------------ | ---------- |
| countryName      | the country name               |   string   |
| countryCode      | the country code               |   string   |
| regionName       | the region name                |   string   |
| regionCode       | the region code                |   string   |
| city             | the city name                  |   string   |
| zip              | the zip address                |   string   |
| latitude         | the latitude                   |   float    |
| longitude        | the longitude                  |   float    |
| internetProvider | Organization name              |   string   |
| regionName       | the region name                |   string   |
| proxy            | proxy (anoymous)               |   bool     |
| mobile           | mobile (cellular) connection   |   bool     |
| query            | ip used for the query          |   string   |

## initialise the ip details module

The node-ip-details package uses classes which contain a contructor which is dependate on a config supplied (see below for details on the config). This then allows the developer to initialise the class and then use it throughout without having to supply the same details constantly. If you want to use it for another ip or ips you need to reinitialise the class.

#### single ip address

```js
// import that library
const ipdetails = require("node-ip-details");
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ip: "1.1.1.1"});
```

#### multiple ip addresses, you can request a maximum of 100 in each request

```js
// import that library
const ipdetails = require("node-ip-details");
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ips: ["1.1.1.1", "8.8.8.8"]});
```

once initialised you can use all the functions which are explained below.

## config

```js
{
    ip: "this is the ip address you want to get the details about. It does not need to be supplied if `ips` is used.",
    ips "this is an array of ips you want to get the details about. It does not need to be supplied if `ip` is used."
}
```

## get the latitude and longitude of the ip address(es)

### native promises

```js
ipInitialised.getLatitudeAndLongitude()
            .then(r => console.log(r))
```
### async and await

```js
async () => {
     try {
        const results = await ipInitialised.getLatitudeAndLongitude();
        console.dir(results);
     } catch (err) {
         // ... error checks
     }
}
```

### example successful response for single ip

```js
{
    latitude: 58.6333,
    longitude: -1.9333,
}
```

### example successful response for multiple ips

```js
[
  {
    latitude: -37.7,
    longitude: 145.1833,
    query: "1.1.1.1",
  },
  {
    latitude: 37.4229,
    longitude: -122.085,
    query: "8.8.8.8",
  }
]
```

## get the timezone of the ip address(es)

### native promises

```js
ipInitialised.getTimezone()
            .then(r => console.dir(r))
            .catch(err => console.error(err));
```

### async and await

```js
async () => {
     try {
        const results = await ipInitialised.getTimezone();
        console.dir(results);
     } catch (err) {
         // ... error checks
     }
}
```

### example successful response for single ip

```js
"Europe/London"
```

### example successful response for multiple ips

```js
[
  {
    timezone: "Australia/Melbourne",
    query: "1.1.1.1",
  },
  {
    timezone: "America/Los_Angeles",
    query: "8.8.8.8",
  }
]
```

## get the internet provider of the ip address(es)

### native promises

```js
ipInitialised.getInternetProvider()
            .then(r => console.dir(r))
            .catch(err => console.error(err));
```

### async and await

```js
async () => {
     try {
        const results = await ipInitialised.getInternetProvider();
        console.dir(results);
     } catch (err) {
         // ... error checks
     }
}
```
### example successful response for single ip

```js
"Virgin Media"
```

### example successful response for multiple ips

```js
[
  {
    provider: "APNIC and Cloudflare DNS Resolver project",
    query: "1.1.1.1",
  },
  {
    provider: "Google",
    query: "8.8.8.8",
  }
]
```

## see if the ip address is on an proxy (not supported for `ips`)

### native promises

```js
ipInitialised.isOnProxy()
            .then(r => console.dir(r))
            .catch(err => console.error(err));
```

### async and await

```js
async () => {
     try {
        const results = await ipInitialised.isOnProxy();
        console.dir(results);
     } catch (err) {
         // ... error checks
     }
}
```

### example successful response for single ip

```js
true
```

### example successful response for multiple ips

Not supported for multiple ips request

## see if the ip address is on a mobile (not supported for `ips`)

### native promises

```js
ipInitialised.isOnMobile()
            .then(r => console.dir(r))
            .catch(err => console.error(err));
```

### async and await

```js
async () => {
     try {
        const results = await ipInitialised.isOnMobile();
        console.dir(results);
     } catch (err) {
         // ... error checks
     }
}
```

### example successful response for single ip

```js
true
```

### example successful response for multiple ips

Not supported for multiple ips request

## get the address of the ip address

### native promises

```js
ipInitialised.getAddress()
            .then(r => console.dir(r))
            .catch(err => console.error(err));
```

### async and await

```js
async () => {
     try {
        const results = await ipInitialised.getAddress();
        console.dir(results);
     } catch (err) {
         // ... error checks
     }
}
```

### example successful response for single ip

```js
{
    city: "Leicester",
    zip: "LE1",
    regionName: "England",
    regionCode: "ENG",
    countryName: "United Kingdom",
    countryCode: "GB",
}
```

### example successful response for multiple ips

```js
[
  {
    city: "Research",
    zip: "3095"
    regionName: "Victoria",
    regionCode: "VIC",
    countryName: "Australia",
    countryCode: "AU",
    query: "1.1.1.1",
  },
  {
    city: "Mountain View",
    zip: "",
    regionName: "California",
    regionCode: "CA",
    countryName: "United States",
    countryCode: "US",
    query: "8.8.8.8",
  }
]
```

## provider

To get all the information for the ip address this packages uses a free provider called "ip-api". They allow the use of there packages for non-commercial use. Look at there usage limits below to see the criteria of using this package:

### usage limits
ip-api system will automatically ban any IP addresses doing over 150 requests per minute. To unban your IP click [here](http://ip-api.com/docs/unban).

You are free to use ip-api.com for non-commercial use. They do not allow commercial use without prior approval.

For commercial, unlimited use see there [pro service](https://signup.ip-api.com/) (this is very cheap and you can get unlimited API calls for 13$ a month).

## it is down to the user of the package to use this within the terms of the above.

## disclaimer

ip addresses can be faked with VPN and proxies, the package will give you the most update to date information it has on the ip address which is provided but this ip could of been vpn to fake location etc.

ip addresses can be made private so any private ips will not return any data about them.
