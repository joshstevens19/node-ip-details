'use strict';
const request = require("request-promise");

class initialise {
    // made it handle a config so we can easily extend this to support other requests
    // from the community
    constructor(config) {
        this.config = config;
        if(!this.config.ip) {
            throw new Error("A IP address needs to be defined");
        }

        this.apiEndpoint = `http://ip-api.com/json/${this.config.ip}?fields=520191`;
    }

    async allInformation() {
        const data = await request(this.getRequestOptions());
        return {
            ipAddress: this.config.ip,
            city: data.city,
            regionName: data.regionName,
            regionCode: data.region,
            countryName: data.country,
            countryCode: data.countryCode,
            latitude: data.lat,
            longitude: data.lon,
            mobile: data.mobile,
            internetProvider: data.org,
            proxy: data.proxy,
            query: data.query,
            timezone: data.timezone,
            zip: data.zip,
        };
    }

    async getLatitudeAndLongitude() {
        const data = await this.allInformation();
        return {
            latitude: data.latitude,
            longitude: data.longitude,
        }
    }

    async getTimezone() {
        return (await this.allInformation()).timezone;
    }

    async getInternetProvider() {
        return (await this.allInformation()).internetProvider;
    }

    async isOnProxy() {
        return (await this.allInformation()).proxy;
    }

    async isOnMobile() {
        return (await this.allInformation).mobile;
    }

    async getAddress() {
        const data = await this.allInformation();
        return {
            city: data.city,
            zip: data.zip,
            regionName: data.regionName,
            regionCode: data.regionCode,
            countryName: data.currenyName,
            countryCode: data.countryCode,
        }
    }

    getRequestOptions() {
        return {
            uri: this.apiEndpoint,
            json: true
        };
    }
}

exports.initialise = function (config) {
    return new initialise(config);
}

// let h = new IPDetails("86.18.231.242");
// h.allInformation().then(d => console.log(d));
