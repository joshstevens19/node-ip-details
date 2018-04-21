const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const ipdetails = require("../lib/ipdetails");
const ipInitialised = ipdetails.initialise({ip: "1.1.1.1"});

chai.use(chaiHttp);
const expect = chai.expect;

describe("ip details tests", () => {
    it("should return all information based on ip address 1.1.1.1", done => {
        ipInitialised.allInformation()
                     .then(results => {
                        expect(results.ipAddress, "1.1.1.1");
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
