import request from "request-promise";
const request = request("request-promise");

export class IPGeolocation {
    constructor(ipAddress) {
        if(!ipAddress) {
            throw new Error("A IP address needs to be defined");
        }

        this.IPAddress = ipAddress;
        this.apiEndpoint = `http://ip-api.com/json/${this.IPAddress}?fields=520191`;
    }

    async allInformation() {
        const data = await request(this.getRequestOptions());
        return {
            ipAddress: this.IPAddress,
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
            postalCode: data.zip,
            region: data.regionName,
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

let h = new IPGeolocation("86.18.231.242");
h.allInformation().then(d => console.log(d));
