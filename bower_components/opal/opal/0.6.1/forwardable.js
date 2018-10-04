/* Generated by Opal 0.6.1 */
(function($opal) {
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module;

  $opal.add_stubs(['$each', '$respond_to?', '$def_instance_delegator', '$include?', '$start_with?', '$to_s', '$define_method', '$__send__', '$to_proc', '$instance_variable_get', '$def_single_delegator', '$define_singleton_method']);
  (function($base) {
    var self = $module($base, 'Forwardable');

    var def = self._proto, $scope = self._scope;

    def.$instance_delegate = function(hash) {
      var $a, $b, TMP_1, self = this;

      return ($a = ($b = hash).$each, $a._p = (TMP_1 = function(methods, accessor){var self = TMP_1._s || this, $a, $b, TMP_2;
if (methods == null) methods = nil;if (accessor == null) accessor = nil;
      if ((($a = methods['$respond_to?']("each")) !== nil && (!$a._isBoolean || $a == true))) {
          } else {
          methods = [methods]
        };
        return ($a = ($b = methods).$each, $a._p = (TMP_2 = function(method){var self = TMP_2._s || this;
if (method == null) method = nil;
        return self.$def_instance_delegator(accessor, method)}, TMP_2._s = self, TMP_2), $a).call($b);}, TMP_1._s = self, TMP_1), $a).call($b);
    };

    def.$def_instance_delegators = function(accessor, methods) {
      var $a, $b, TMP_3, self = this;

      methods = $slice.call(arguments, 1);
      return ($a = ($b = methods).$each, $a._p = (TMP_3 = function(method){var self = TMP_3._s || this, $a;
if (method == null) method = nil;
      if ((($a = ["__send__", "__id__"]['$include?'](method)) !== nil && (!$a._isBoolean || $a == true))) {
          return nil;};
        return self.$def_instance_delegator(accessor, method);}, TMP_3._s = self, TMP_3), $a).call($b);
    };

    def.$def_instance_delegator = function(accessor, method, ali) {
      var $a, $b, TMP_4, $c, TMP_5, self = this;

      if (ali == null) {
        ali = method
      }
      if ((($a = accessor.$to_s()['$start_with?']("@")) !== nil && (!$a._isBoolean || $a == true))) {
        return ($a = ($b = self).$define_method, $a._p = (TMP_4 = function(args){var self = TMP_4._s || this, block, $a, $b;
args = $slice.call(arguments, 0);
          block = TMP_4._p || nil, TMP_4._p = null;
        return ($a = ($b = self.$instance_variable_get(accessor)).$__send__, $a._p = block.$to_proc(), $a).apply($b, [method].concat(args))}, TMP_4._s = self, TMP_4), $a).call($b, ali)
        } else {
        return ($a = ($c = self).$define_method, $a._p = (TMP_5 = function(args){var self = TMP_5._s || this, block, $a, $b;
args = $slice.call(arguments, 0);
          block = TMP_5._p || nil, TMP_5._p = null;
        return ($a = ($b = self.$__send__(accessor)).$__send__, $a._p = block.$to_proc(), $a).apply($b, [method].concat(args))}, TMP_5._s = self, TMP_5), $a).call($c, ali)
      };
    };

    $opal.defn(self, '$delegate', def.$instance_delegate);

    $opal.defn(self, '$def_delegators', def.$def_instance_delegators);

    $opal.defn(self, '$def_delegator', def.$def_instance_delegator);
        ;$opal.donate(self, ["$instance_delegate", "$def_instance_delegators", "$def_instance_delegator", "$delegate", "$def_delegators", "$def_delegator"]);
  })(self);
  return (function($base) {
    var self = $module($base, 'SingleForwardable');

    var def = self._proto, $scope = self._scope;

    def.$single_delegate = function(hash) {
      var $a, $b, TMP_6, self = this;

      return ($a = ($b = hash).$each, $a._p = (TMP_6 = function(methods, accessor){var self = TMP_6._s || this, $a, $b, TMP_7;
if (methods == null) methods = nil;if (accessor == null) accessor = nil;
      if ((($a = methods['$respond_to?']("each")) !== nil && (!$a._isBoolean || $a == true))) {
          } else {
          methods = [methods]
        };
        return ($a = ($b = methods).$each, $a._p = (TMP_7 = function(method){var self = TMP_7._s || this;
if (method == null) method = nil;
        return self.$def_single_delegator(accessor, method)}, TMP_7._s = self, TMP_7), $a).call($b);}, TMP_6._s = self, TMP_6), $a).call($b);
    };

    def.$def_single_delegators = function(accessor, methods) {
      var $a, $b, TMP_8, self = this;

      methods = $slice.call(arguments, 1);
      return ($a = ($b = methods).$each, $a._p = (TMP_8 = function(method){var self = TMP_8._s || this, $a;
if (method == null) method = nil;
      if ((($a = ["__send__", "__id__"]['$include?'](method)) !== nil && (!$a._isBoolean || $a == true))) {
          return nil;};
        return self.$def_single_delegator(accessor, method);}, TMP_8._s = self, TMP_8), $a).call($b);
    };

    def.$def_single_delegator = function(accessor, method, ali) {
      var $a, $b, TMP_9, $c, TMP_10, self = this;

      if (ali == null) {
        ali = method
      }
      if ((($a = accessor.$to_s()['$start_with?']("@")) !== nil && (!$a._isBoolean || $a == true))) {
        return ($a = ($b = self).$define_singleton_method, $a._p = (TMP_9 = function(args){var self = TMP_9._s || this, block, $a, $b;
args = $slice.call(arguments, 0);
          block = TMP_9._p || nil, TMP_9._p = null;
        return ($a = ($b = self.$instance_variable_get(accessor)).$__send__, $a._p = block.$to_proc(), $a).apply($b, [method].concat(args))}, TMP_9._s = self, TMP_9), $a).call($b, ali)
        } else {
        return ($a = ($c = self).$define_singleton_method, $a._p = (TMP_10 = function(args){var self = TMP_10._s || this, block, $a, $b;
args = $slice.call(arguments, 0);
          block = TMP_10._p || nil, TMP_10._p = null;
        return ($a = ($b = self.$__send__(accessor)).$__send__, $a._p = block.$to_proc(), $a).apply($b, [method].concat(args))}, TMP_10._s = self, TMP_10), $a).call($c, ali)
      };
    };

    $opal.defn(self, '$delegate', def.$single_delegate);

    $opal.defn(self, '$def_delegators', def.$def_single_delegators);

    $opal.defn(self, '$def_delegator', def.$def_single_delegator);
        ;$opal.donate(self, ["$single_delegate", "$def_single_delegators", "$def_single_delegator", "$delegate", "$def_delegators", "$def_delegator"]);
  })(self);
})(Opal);

//# sourceMappingURL=/__opal_source_maps__/forwardable.js.map
;
