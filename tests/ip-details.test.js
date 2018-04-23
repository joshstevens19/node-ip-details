const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const ipdetails = require("../lib/ip-details");

chai.use(chaiHttp);
const expect = chai.expect;

describe("ip details error", () => {
    it("should error due to no config supplied", done => {
        try {
            const ipInitialised = ipdetails.initialise();
        } catch(error) {
            expect(error, "A config file should be supplied");
            done();
        }
    });

    it("should error due to no `ip` or `ips` supplied", done => {
        try {
            const ipInitialised = ipdetails.initialise();
        } catch(error) {
            expect(error, "A ip or ips addresses needs to be defined");
            done();
        }
    });

    it("should error due to `ips` supplied is over 100", done => {
        let i = 1;
        let arrayTest = [];
        while(i < 102) {
            arrayTest.push("1.1.1.1");
            i++;
        }

        try {
            const ipInitialised = ipdetails.initialise({ips: arrayTest});
        } catch(error) {
            expect(error, "You can only do a batch request of a maximum of 100 ips");
            done();
        }
    });
});

describe("ip details tests in default", () => {
    const ipInitialised = ipdetails.initialise({
        ip: "1.1.1.1"
    });
    it("should return all information based on ip address 1.1.1.1", done => {
        ipInitialised.allInformation()
            .then(results => {
                expect(results.query, "1.1.1.1");
                expect(results.city, "Research");
                expect(results.regionName, "Victoria");
                expect(results.regionCode, "VIC");
                expect(results.countryName, "Australia");
                expect(results.countryCode, "AU");
                expect(results.latitude, -37.7);
                expect(results.longitude, 145.1833);
                expect(results.mobile, false);
                expect(results.internetProvider, "APNIC Pty");
                expect(results.proxy, false);
                expect(results.timezone, "Australia/Melbourne");
                expect(results.zip, "3095");
                done();
            })
            .catch(done);
    });

    it("should return the correct latitude and longitude based on ip address 1.1.1.1", done => {
        ipInitialised.getLatitudeAndLongitude()
            .then(results => {
                expect(results.latitude, -37.7);
                expect(results.longitude, 145.1833);
                done();
            })
            .catch(done);
    });

    it("should return the correct timezone based on ip address 1.1.1.1", done => {
        ipInitialised.getTimezone()
            .then(results => {
                expect(results.timezone, "Australia/Melbourne");
                done();
            })
            .catch(done);
    });

    it("should return the correct internet provider based on ip address 1.1.1.1", done => {
        ipInitialised.getInternetProvider()
            .then(results => {
                expect(results.internetProvider, "APNIC Pty");
                done();
            })
            .catch(done);
    });

    it("should return a boolean if the ip address is on a proxy server based on ip address 1.1.1.1", done => {
        ipInitialised.isOnProxy()
            .then(result => {
                expect(result, false);
                done();
            })
            .catch(done);
    });

    it("should return a boolean if the ip address is on a mobile based on ip address 1.1.1.1", done => {
        ipInitialised.isOnMobile()
            .then(result => {
                expect(result, false);
                done();
            })
            .catch(done);
    });

    it("should return the address based on ip address 1.1.1.1", done => {
        ipInitialised.getAddress()
            .then(results => {
                expect(results.city, "Research");
                expect(results.regionName, "Victoria");
                expect(results.regionCode, "VIC");
                expect(results.countryName, "Australia");
                expect(results.countryCode, "AU");
                expect(results.zip, "3095");
                done();
            })
            .catch(done);
    });
});

describe("batch ips details tests in default", () => {
    const ipsInitialised = ipdetails.initialise({
        ips: ["1.1.1.1", "8.8.8.8"]
    });
    it("should return all information based on ip address 1.1.1.1 and 8.8.8.8", done => {
        ipsInitialised.allInformation()
            .then(results => {
                for (let ips = 0; ips < results.length; ips++) {
                    if (results.query === "1.1.1.1") {
                        expect(results.query, "1.1.1.1");
                        expect(results.city, "Research");
                        expect(results.regionName, "Victoria");
                        expect(results.regionCode, "VIC");
                        expect(results.countryName, "Australia");
                        expect(results.countryCode, "AU");
                        expect(results.latitude, -37.7);
                        expect(results.longitude, 145.1833);
                        expect(results.internetProvider, "APNIC Pty");;
                        expect(results.timezone, "Australia/Melbourne");
                        expect(results.zip, "3095");
                    } else if (results.query === "8.8.8.8") {
                        expect(results.query, "8.8.8.8");
                        expect(results.city, "Mountain View");
                        expect(results.regionName, "California");
                        expect(results.regionCode, "CA");
                        expect(results.countryName, "United States");
                        expect(results.countryCode, "US");
                        expect(results.latitude, 37.4229);
                        expect(results.longitude, -122.085);
                        expect(results.internetProvider, "Google");
                        expect(results.timezone, "America/Los_Angeles");
                        expect(results.zip, "");
                    }
                }
                done();
            })
            .catch(done);
    });

    it("should return the correct latitude and longitude based on ip address 1.1.1.1 and 8.8.8.8", done => {
        ipsInitialised.getLatitudeAndLongitude()
            .then(results => {
                for (let ips = 0; ips < results.length; ips++) {
                    if (results.ipAddress === "1.1.1.1") {
                        expect(results.latitude, -37.7);
                        expect(results.longitude, 145.1833);
                    } else if (results.ipAddress === "8.8.8.8") {
                        expect(results.latitude, 37.4229);
                        expect(results.longitude, -122.085);
                    }
                }
                done();
            })
            .catch(done);
    });

    it("should return the correct timezone based on ip address 1.1.1.1 and 8.8.8.8", done => {
        ipsInitialised.getTimezone()
            .then(results => {
                for (let ips = 0; ips < results.length; ips++) {
                    if (results.ipAddress === "1.1.1.1") {
                        expect(results.timezone, "Australia/Melbourne");
                    } else if (results.ipAddress === "8.8.8.8") {
                        expect(results.timezone, "America/Los_Angeles");
                    }
                }
                done();
            })
            .catch(done);
    });

    it("should return the correct internet provider based on ip address 1.1.1.1 and 8.8.8.8", done => {
        ipsInitialised.getInternetProvider()
            .then(results => {
                for (let ips = 0; ips < results.length; ips++) {
                    if (results.ipAddress === "1.1.1.1") {
                        expect(results.internetProvider, "APNIC Pty");
                    } else if (results.ipAddress === "8.8.8.8") {
                        expect(results.internetProvider, "Google");
                    }
                }
                expect(results.internetProvider, "APNIC Pty");
                done();
            })
            .catch(done);
    });

    it("should return the address based on ip address 1.1.1.1 and 8.8.8.8", done => {
        ipsInitialised.getAddress()
            .then(results => {
                for (let ips = 0; ips < results.length; ips++) {
                    if (results.ipAddress === "1.1.1.1") {
                        expect(results.city, "Research");
                        expect(results.regionName, "Victoria");
                        expect(results.regionCode, "VIC");
                        expect(results.countryName, "Australia");
                        expect(results.countryCode, "AU");
                        expect(results.zip, "3095");
                    } else if (results.ipAddress === "8.8.8.8") {
                        expect(results.city, "Mountain View");
                        expect(results.regionName, "California");
                        expect(results.regionCode, "CA");
                        expect(results.countryName, "United States");
                        expect(results.countryCode, "US");
                        expect(results.zip, "");
                    }
                }
                done();
            })
            .catch(done);
    });
});
