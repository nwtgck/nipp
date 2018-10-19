/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
/* global module */
/* global inject */

(function () {
    "use strict";

    describe('ua-device-detector client tests', function () {
        describe('loading module in pure JS', function () {
            it('should load into window', function () {
                expect(window.uaDeviceDetector).toBeDefined();
                expect(window.uaDeviceDetector.parseUserAgent).toBeDefined();
                expect(window.uaDeviceDetector.BROWSERS).toBeDefined();
                expect(window.uaDeviceDetector.DEVICES).toBeDefined();
                expect(window.uaDeviceDetector.OS).toBeDefined();
            });
        });

        describe('loading module in angular', function () {
            var uaDeviceDetector;
            beforeEach(function () {
                module("uaDeviceDetector");
                inject(["uaDeviceDetector", function (_uaDeviceDetector) {
                    uaDeviceDetector = _uaDeviceDetector;
                }]);
            });

            it('should have service', function () {
                expect(uaDeviceDetector).toBeDefined();
                expect(uaDeviceDetector.parseUserAgent).toBeDefined();
                expect(uaDeviceDetector.BROWSERS).toBeDefined();
                expect(uaDeviceDetector.DEVICES).toBeDefined();
                expect(uaDeviceDetector.OS).toBeDefined();
            });
        });

        describe("with empty user-agent", function () {
            it("should read empty", function () {
                var deviceInfo = window.uaDeviceDetector.parseUserAgent("");
                expect(deviceInfo.raw.userAgent).toBe("");
            });
        });

        describe("with dummy user-agent", function () {
            it("should read dummy", function () {
                var deviceInfo = window.uaDeviceDetector.parseUserAgent("dummy");
                expect(deviceInfo.raw.userAgent).toBe("dummy");
            });
        });

        describe("with user-agent", function () {
            function describeUserAgent(userAgent, os, os_version, browser, browser_version, device, isMobile, isTablet, isDesktop, extras) {
                describe(userAgent, function () {
                    it("should detect os = " + os, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.os).toBe(os);
                    });
                    it("should detect os version = " + os_version, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.os_version).toBe(os_version);
                    });
                    it("should detect browser = " + browser, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.browser).toBe(browser);
                    });
                    it("should detect browser version= " + browser_version, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.browser_version).toBe(browser_version);
                    });
                    it("should detect device = " + device, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.device).toBe(device);
                    });
                    it("should have isMobile = " + isMobile, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.isMobile()).toBe(isMobile);
                    });
                    it("should have isTablet = " + isTablet, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.isTablet()).toBe(isTablet);
                    });
                    it("should have isDesktop = " + isDesktop, function () {
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent);
                        expect(deviceInfo.isDesktop()).toBe(isDesktop);
                    });
                    if (!!extras) {
                        extras.apply(null, [window.uaDeviceDetector, userAgent]);
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
                        var deviceInfo = window.uaDeviceDetector.parseUserAgent(userAgent,
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
