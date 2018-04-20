
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const ipGeolocation = require("../lib/ip-geolocation");
import { IPGeolocation } from './ip-geolocation';

chai.use(chaiHttp);
const expect = chai.expect;

describe("IP geolocation tests", () => {
    it("should return data based on your IP", done => {
        new IPGeolocation("86.18.231.242").allInformation().then(x => done());
    });
});
