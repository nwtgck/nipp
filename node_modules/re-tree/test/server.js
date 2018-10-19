/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
/* global require */

(function () {
    "use strict";

    describe('re-tree server tests', function () {
        var reTree = require('../re-tree.js');

        it('should load', function () {
            expect(reTree).toBeDefined();
            expect(reTree.test).toBeDefined();
            expect(reTree.exec).toBeDefined();
        });

        describe('test function', function () {
            describe('string expressions should handle as normal RegExp', function () {
                it('matches 1', function () {
                    var exp = "^\\d+$";
                    var str = "123456789";
                    var re = new RegExp(exp);
                    expect(reTree.test(str, exp)).toBeTruthy();
                });
                it('matches 2', function () {
                    var exp = "^\\d+$";
                    var str = "12345d6789";
                    var re = new RegExp(exp);
                    expect(reTree.test(str, exp)).toBeFalsy();
                });
                it('matches 3', function () {
                    var exp = "^\\w+$";
                    var str = "12345d6789";
                    var re = new RegExp(exp);
                    expect(reTree.test(str, exp)).toBeTruthy();
                });
            });

            describe('regex expressions should handle as normal RegExp', function () {
                it('matches 1', function () {
                    var exp = /^\d+$/;
                    var str = "123456789";
                    expect(reTree.test(str, exp)).toBeTruthy();
                });
                it('matches 2', function () {
                    var exp = /^\d+$/;
                    var str = "12345d6789";
                    expect(reTree.test(str, exp)).toBeFalsy();
                });
                it('matches 3', function () {
                    var exp = /^\w+$/;
                    var str = "12345d6789";
                    expect(reTree.test(str, exp)).toBeTruthy();
                });
            });

            describe('OR expressions', function () {
                it('should handle single length arrays',function(){
                    var regex = {or: [/^\d+$/]};
                    expect(reTree.test('123456789', regex)).toBeTruthy();
                    expect(reTree.test('12345d6789',regex)).toBeFalsy();
                });
                it('should handle two expressions',function(){
                    var regex = {or: [/^\d+$/,/^\w+$/]};
                    expect(reTree.test('123456789',regex)).toBeTruthy();
                    expect(reTree.test('12345d6789',regex)).toBeTruthy();
                    expect(reTree.test('123%45d6789',regex)).toBeFalsy();
                });
                it('should handle multiple expressions',function(){
                    var regex = {or: [/^\d+$/,/^\w+$/,/^[0-9a-z%]+$/]};
                    expect(reTree.test('123456789',regex)).toBeTruthy();
                    expect(reTree.test('12345d6789',regex)).toBeTruthy();
                    expect(reTree.test('123%45d6789',regex)).toBeTruthy();
                    expect(reTree.test('123%45d67&89',regex)).toBeFalsy();
                });
            });

            describe('AND expressions',function(){
                it('should handle single length arrays',function(){
                    var regex = {and: [/^\d+$/]};
                    expect(reTree.test('123456789', regex)).toBeTruthy();
                    expect(reTree.test('12345d6789',regex)).toBeFalsy();
                });
                it('should handle two expressions',function(){
                    var regex = {and: [/^\d+$/,/^\w+$/]};
                    expect(reTree.test('123456789', regex)).toBeTruthy();
                    expect(reTree.test('12345d6789',regex)).toBeFalsy();
                });
                it('should handle multiple expressions',function(){
                    var regex = {and: [/^\d+$/,/^\w+$/,/^[0-9a-z%]+$/]};
                    expect(reTree.test('123456789', regex)).toBeTruthy();
                    expect(reTree.test('12345d6789',regex)).toBeFalsy();
                    expect(reTree.test('123%45d6789',regex)).toBeFalsy();
                });
                it('should handle multiple expressions - no order',function(){
                    var regex = {and: [/^[0-9a-z%]+$/,/^\d+$/,/^\w+$/]};
                    expect(reTree.test('123456789', regex)).toBeTruthy();
                    expect(reTree.test('12345d6789',regex)).toBeFalsy();
                    expect(reTree.test('123%45d6789',regex)).toBeFalsy();
                });
            });

            describe('NOT expressions',function(){
                it('matches 1', function () {
                    var exp = {not:/^\d+$/};
                    var str = "123456789";
                    expect(reTree.test(str, exp)).toBeFalsy();
                });
                it('matches 2', function () {
                    var exp = {not:/^\d+$/};
                    var str = "12345d6789";
                    expect(reTree.test(str, exp)).toBeTruthy();
                });
                it('matches 3', function () {
                    var exp = {not:/^\w+$/};
                    var str = "12345d6789";
                    expect(reTree.test(str, exp)).toBeFalsy();
                });
            });

            describe('complex expressions',function(){
                it('should handle not - or',function(){
                    expect(reTree.test("12d",{not:{or:[/^\d+$/,/^[a-z]+$/]}})).toBeTruthy();
                    expect(reTree.test("12d",{not:{or:[/^\d+$/,/^\w+$/]}})).toBeFalsy();
                });
                it('should handle not - and',function(){
                    expect(reTree.test("12d",{not:{and:[/^\d+$/,/^[a-z]+$/]}})).toBeTruthy();
                    expect(reTree.test("12d",{not:{and:[/^[\da-z]+$/,/^\w+$/]}})).toBeFalsy();
                });
                it('should handle or - not',function(){
                    expect(reTree.test("12d",{or:[{not:/^\d+$/},/^[a-z]+$/]})).toBeTruthy();
                    expect(reTree.test("12d",{or:[/^\d+$/,{not:/^\w+$/}]})).toBeFalsy();
                });
                it('should handle or - and',function(){
                    expect(reTree.test("12d34",{or:[{and:[/12/,/34/]}]})).toBeTruthy();
                    expect(reTree.test("12d34",{or:[{and:[/12/,/134/]},/12/]})).toBeTruthy();
                    expect(reTree.test("12d34",{or:[{and:[/12/,/134/]}]})).toBeFalsy();
                });
                it('should handle and - or',function(){
                    expect(reTree.test("12d34",{and:[{or:[/12/,/ss/]},{or:[/d/,/a/]}]})).toBeTruthy();
                    expect(reTree.test("12d34",{and:[{or:[/122/,/ss/]},{or:[/d/,/a/]}]})).toBeFalsy();
                });
                it('should handle and - not',function(){
                    expect(reTree.test("12d34",{and:[{not:/123/},{not:/345/}]})).toBeTruthy();
                    expect(reTree.test("12d34",{and:[{not:/123/},{not:/34/}]})).toBeFalsy();
                });
            });
            
            describe('user agent use case',function(){
                it('should detect windows correctly',function(){
                    var re={and: [{or: [/\bWindows|(Win\d\d)\b/, /\bWin 9x\b/]}, {not: /\bWindows Phone\b/}]};
                    expect(reTree.test("Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",re)).toBeTruthy();
                    expect(reTree.test("Mozilla/5.0 (Win16; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",re)).toBeTruthy();
                    expect(reTree.test("Mozilla/5.0 (Windows 95; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",re)).toBeTruthy();
                    expect(reTree.test("Mozilla/5.0 (Win 9x 4.90; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",re)).toBeTruthy();
                    expect(reTree.test("Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",re)).toBeFalsy();
                });

                it('should detect chrome correctly',function(){
                    var re={and:[{or: [/\bChrome\b/, /\bCriOS\b/]},{not:/\bOPR\b/}]};
                    expect(reTree.test("Mozilla/5.0 (Windows NT 4.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",re)).toBeTruthy();
                    expect(reTree.test("Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",re)).toBeFalsy();
                    expect(reTree.test("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36 OPR/29.0.1795.47",re)).toBeFalsy();
                });
            });
        });


var re = {
    and: [
        {
            or: [
                /\bChrome\b/,
                /\bCriOS\b/
            ]
        },
        {not: /\bOPR\b/}
    ]
};


        describe('exec function',function(){
            it('should handle a single RE',function(){
                expect(reTree.exec("1234d5678",/^\d+([a-z]+)\d+$/)).toEqual(/^\d+([a-z]+)\d+$/.exec("1234d5678"));
            });
            it('should handle an array of a single RE',function(){
                expect(reTree.exec("1234d5678",[/^\d+([a-z]+)\d+$/])).toEqual(/^\d+([a-z]+)\d+$/.exec("1234d5678"));
            });
            it('should handle an array of a multiple RE',function(){
                expect(reTree.exec("1234d5678",[/^\d+a([a-z]+)\d+$/,/^\d+([a-z]+)\d+$/])).toEqual(/^\d+([a-z]+)\d+$/.exec("1234d5678"));
                expect(reTree.exec("1234d5678",[/^\d+a([a-z]+)\d+$/,/^\d+([a-z]+)\d+$/])).not.toEqual(/^\d+(a[a-z]+)\d+$/.exec("1234d5678"));
            });
            it('should handle an array of a multiple RE - no order',function(){
                expect(reTree.exec("1234d5678",[/^\d+([a-z]+)\d+$/,/^\d+a([a-z]+)\d+$/])).toEqual(/^\d+([a-z]+)\d+$/.exec("1234d5678"));
                expect(reTree.exec("1234d5678",[/^\d+([a-z]+)\d+$/,/^\d+a([a-z]+)\d+$/])).not.toEqual(/^\d+(a[a-z]+)\d+$/.exec("1234d5678"));
            });

            // Issue #5
            it('should handle AND expressions',function(){
                expect(reTree.exec("1234d5678",{and:[/2(.)/,/3/]})).toEqual(/2(.)/.exec("1234d5678"));
                expect(reTree.exec("1234d5678",{and:[/2(.)/,/9/]})).toEqual(null);
            });
            it('should handle OR expressions',function(){
                expect(reTree.exec("1234d5678",{or:[/2(.)/,/3/]})).toEqual(/2(.)/.exec("1234d5678"));
                expect(reTree.exec("1234d5678",{or:[/9(.)/,/3(.)/]})).toEqual(/3(.)/.exec("1234d5678"));
                expect(reTree.exec("1234d5678",{or:[/9(.)/,/10/]})).toEqual(null);
            });
            it('should handle NOT expressions',function(){
                expect(reTree.exec("1234d5678",{not:/9/})).toEqual([]);
                expect(reTree.exec("1234d5678",{not:/8/})).toEqual(null);
            });
            it('should handle complex expressions',function(){
                expect(reTree.exec("1234d5678",{and:[{or:[/2(.)/,/3/]},{not:/9/}]})).toEqual(/2(.)/.exec("1234d5678"));
                expect(reTree.exec("1234d5678",{and:[{or:[/2(.)/,/3/]},/9/]})).toEqual(null);
            });
        });
    });
})();
