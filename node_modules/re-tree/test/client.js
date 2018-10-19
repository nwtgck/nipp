/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
/* global module */
/* global inject */

(function () {
    "use strict";

    describe('re-tree client tests', function () {
        describe('loading module in pure JS', function () {
            it('should load into window', function () {
                expect(window.reTree).toBeDefined();
                expect(window.reTree.test).toBeDefined();
                expect(window.reTree.exec).toBeDefined();
            });
        });

        describe('loading module in angular', function () {
            var reTree;
            beforeEach(function () {
                module("reTree");
                inject(["reTree", function (_reTree) {
                    reTree = _reTree;
                }]);
            });

            it('should have service', function () {
                expect(reTree).toBeDefined();
                expect(reTree.test).toBeDefined();
                expect(reTree.exec).toBeDefined();
            });
        });
    });
})();
