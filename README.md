
# ip details

ip-details is an lightweight fast node package to find full details of any ip address. It is perfect to use when wanting to block requests from certain countries ip addresses, tracking if the request has came from a proxy or not, finding out the internet provider for the ip address and finding full geolocation details for the ip. 

## super simple to use

ip-details has been designed to be the simplest way possible to retrieve full details of any ip address. 

### native promises

```js
// import that library
const ipdetails = require('node-ip-details');
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ip: "1.1.1.1"});

// return all the information for the IP supplied
ipInitialised.allInformation()
         .then(r => console.dir(r))
         .catch(err => console.error(err))
```

### async and await 

```js
// import that library
const ipdetails = require('node-ip-details');
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

### example successful response 

```js
{
    ipAddress: "86.34.278.345",
    city: "Leicester",
    regionName: "England",
    regionCode: "Eng",
    countryName: "United Kingdom",
    countryCode: "GB",
    latitude: "54.8794",
    longitude: "-6.7389",
    mobile: false,
    internetProvider: "Virgin Media",
    proxy: "false",
    query: "81.45.980.123",
    timezone: "Europe/London",
    zip: "LE1",
}
```

## initialise the ip details module

The ip-details package uses classes which contain a contructor which is dependate on a config supplied (see below for details on the config). This then allows the developer to initialise the class and then use it throughout without having to supply the same details constantly. If you want to use it for another IP you need to reinitialise the class.

```js
// import that library
const ipdetails = require('node-ip-details');
// initilise the class with the config details
const ipInitialised = ipdetails.initialise({ip: "1.1.1.1"});
```

once initialised you can use all the functions which are explained below.

## config - this will get updated when more config options are added

```js
{
    ip: "this is the ip address you want to get the details about"
}
```

## get the latitude and longitude of the ip address 

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

### example successful response 

```js
{
    latitude: 58.6333,
    longitude: -1.9333,
}
```

## get the timezone of the ip address

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

### example successful response  

This will just return an timezone i.e. "Europe/London"

## get the internet provider of the ip address

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
### example successful response 

This will just return a string with the internet providers name i.e. "Virgin Media"

## see if the ip address is on an proxy

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

### example successful response  

This will just return a boolean

## see if the ip address is on a mobile 

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

### example successful response 

This will just return a boolean

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

### example successful response 

```js
{
    city: "Leicester",
    zip: "LE3 456",
    regionName: "England",
    regionCode: "ENG",
    countryName: "United Kingdom",
    countryCode: "GB",        
}
```

## provider

To get all the information for the ip address this packages uses a free provider called "ip-api". They allow the use of there packages for non-commercial use. Look at there usage limits below to see the criteria of using this package:

### usage limits
Our system will automatically ban any IP addresses doing over 150 requests per minute. To unban your IP click [here](http://ip-api.com/docs/unban).

You are free to use ip-api.com for non-commercial use. We do not allow commercial use without prior approval.

For commercial, unlimited use see our [pro service](https://signup.ip-api.com/) (this is very cheap and you can get unlimited API calls for 13$ a month).

## it is down to the user of the package to use this within the terms of the above.