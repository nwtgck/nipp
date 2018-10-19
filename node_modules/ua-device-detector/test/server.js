/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
/* global require */

(function () {
    "use strict";

    var common = require("./common");
    
    describe('ua-device-detector server tests', function () {
        var uaDeviceDetector = require('../ua-device-detector.js');

        it('should load', function () {
            expect(uaDeviceDetector).toBeDefined();
            expect(uaDeviceDetector.parseUserAgent).toBeDefined();
            expect(uaDeviceDetector.BROWSERS).toBeDefined();
            expect(uaDeviceDetector.DEVICES).toBeDefined();
            expect(uaDeviceDetector.OS).toBeDefined();
        });

        describe("with empty user-agent", function () {
            it("should read empty", function () {
                var deviceInfo = uaDeviceDetector.parseUserAgent("");
                expect(deviceInfo.raw.userAgent).toBe("");
            });
        });

        describe("with dummy user-agent", function () {
            it("should read dummy", function () {
                var deviceInfo = uaDeviceDetector.parseUserAgent("dummy");
                expect(deviceInfo.raw.userAgent).toBe("dummy");
            });
        });

        describe("with user-agent", function () {
            function describeUserAgent(userAgent, os, os_version, browser, browser_version, device, isMobile, isTablet, isDesktop, extras) {
                describe(userAgent, function () {
                    it("should detect os = " + os, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.os).toBe(os);
                    });
                    it("should detect os version = " + os_version, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.os_version).toBe(os_version);
                    });
                    it("should detect browser = " + browser, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.browser).toBe(browser);
                    });
                    it("should detect browser version= " + browser_version, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.browser_version).toBe(browser_version);
                    });
                    it("should detect device = " + device, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.device).toBe(device);
                    });
                    it("should have isMobile = " + isMobile, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.isMobile()).toBe(isMobile);
                    });
                    it("should have isTablet = " + isTablet, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.isTablet()).toBe(isTablet);
                    });
                    it("should have isDesktop = " + isDesktop, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.isDesktop()).toBe(isDesktop);
                    });
                    if (!!extras) {
                        extras.apply(null, [uaDeviceDetector, userAgent]);
                    }
                });
            }

            common.USER_AGENTS_TESTS.forEach(function (test) {
                describeUserAgent.apply(null, test);
            });
        });

        describe("with custom detection", function () {
            function describeUserAgent(description, userAgent, customDetectorRE, expected) {
                describe("with " + description, function () {
                    it("should detect custom detector to be " + expected, function () {
                        var deviceInfo = uaDeviceDetector.parseUserAgent(userAgent,
                            [
                                { name: "Custom_UA_Entry", re: customDetectorRE }
                            ]);
                        expect(deviceInfo.custom["Custom_UA_Entry"]).toBe(expected);
                    });
                });
            }

            common.CUSTOM_DETECTION_TESTS.forEach(function (test) {
                describeUserAgent.apply(null, test);
            });
        });
    });
})();
