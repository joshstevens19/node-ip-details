'use strict';
const request = require("request-promise");

class initialise {
    // made it handle a config so we can easily extend this to support other requests
    // from the community
    constructor(config) {
        this.config = config;
        const supportedLangaguges = ["en", "de", "es", "pt-BR", "fr", "ja", "zh-CN", "ru"];
        if (!this.config.ip && !this.config.ips) {
            return new Error("A ip or ips addresses needs to be defined");
        }

        if (this.config.languageCode) {
            if (!supportedLangaguges.includes(this.config.languageCode)) {
                return new Error(`${this.config.languageCode} is not supported`);
            }
        } else {
            this.config.languageCode = supportedLangaguges[0];
        }

        if (this.config.ip) {
            this.apiEndpoint = `http://ip-api.com/json/${this.config.ip}?fields=520191&lang=${this.config.languageCode}`;
            this.batchRequest = false;
        } else if (this.config.ips && Array.isArray(this.config.ips)) {
            this.batchEndpoint = "http://ip-api.com/batch";
            this.batchRequest = true;
        }
    }
    
    async allInformation() {
        try {
            if (!this.batchRequest) {
                const options = {                   
                    uri: this.apiEndpoint,
                    json: true                 
                }

                const data = await request(options);

                const information = this.buildDefaultInformation(data);
                information.ipAddress = this.config.ip;
                information.proxy = data.proxy;
                information.mobile = data.mobile;

                return information;
            } else {
                let ipAddresses = [];
                for (let i = 0; i < this.config.ips.length; i++) {
                    ipAddresses.push({
                        query: this.config.ips[i]
                    })
                }

                const options = {
                    uri: this.batchEndpoint,
                    method: "POST",
                    body: JSON.stringify(ipAddresses),
                };

                console.log(options);

                const data = JSON.parse(await request(options));

                let results = [];
                for (let d = 0; d < data.length; d++) {
                    results.push(this.buildDefaultInformation(data[d]));
                }

                return results;
            }
        } catch(error) {
            throw {
                errorMessage: error.message,
                query: error.query,
            }
        }
    }

    buildDefaultInformation(ipDetails) {
        return {
            city: ipDetails.city,
            regionName: ipDetails.regionName,
            regionCode: ipDetails.region,
            countryName: ipDetails.country,
            countryCode: ipDetails.countryCode,
            latitude: ipDetails.lat,
            longitude: ipDetails.lon,
            internetProvider: ipDetails.org,       
            query: ipDetails.query,
            timezone: ipDetails.timezone,
            zip: ipDetails.zip,
        };
    }

    async getLatitudeAndLongitude() {
        const data = await this.allInformation();
        if (!this.batchRequest) {
            return this.buildLatitudeAndLongitude(data);
        } else {
            let results = [];
            for (let d = 0; d < data.length; d++) {
                results.push(this.buildLatitudeAndLongitude(data[d]));
            }

            return results;
        }
    }

    buildLatitudeAndLongitude(data) {
        return {
            latitude: data.latitude,
            longitude: data.longitude,
        }
    }

    async getTimezone() {
        const data = await this.allInformation();
        if (!this.batchRequest) {
            return data.timezone;
        } else {
            let timezones = [];
            for (let d = 0; d < data.length; d++) {
                timezones.push({
                    timezone: data[s].timezone,
                    query: data[d].query,
                });
            }

            return timezones;
        }
    }

    async getInternetProvider() {
        const data = await this.allInformation();
        if (!this.batchRequest) {
            return data.internetProvider;
        } else {
            let providers = [];
            for (let d = 0; d < data.length; d++) {
                providers.push({
                    provider: data[s].provider,
                    query: data[d].query,
                });
            }

            return providers;
        }
    }

    async isOnProxy() {
        if (!this.batchRequest) {
            return (await this.allInformation()).proxy;
        } else {
            throw new Error("Batch requests do not support proxy information.");
        }
    }

    async isOnMobile() {
        if (!this.batchRequest) {
            return (await this.allInformation()).mobile;
        } else {
            throw new Error("Batch requests do not support mobile information.");
        }
    }

    async getAddress() {
        const data = await this.allInformation();
        if (!this.batchRequest) {
            return this.buildAddressDetails(data);
        } else {
            let addresses = [];
            for (let d = 0; d < data.length; d++) {
                let address = this.buildAddressDetails(data[d]);
                address.query = data[d].query;
                addresses.push(address);
            }

            return addresses;
        }
    }

    buildAddressDetails(data) {
        return {
            city: data.city,
            zip: data.zip,
            regionName: data.regionName,
            regionCode: data.regionCode,
            countryName: data.currenyName,
            countryCode: data.countryCode,
        }
    }
}

exports.initialise = function (config) {
    return new initialise(config);
}
