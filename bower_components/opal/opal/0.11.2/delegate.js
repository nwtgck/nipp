/* Generated by Opal 0.11.2 */
Opal.modules["delegate"] = function(Opal) {
  var TMP_DelegateClass_5, self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;

  Opal.add_stubs(['$__setobj__', '$__getobj__', '$respond_to?', '$__send__', '$to_proc']);
  
  (function($base, $super, $parent_nesting) {
    function $Delegator(){};
    var self = $Delegator = $klass($base, $super, 'Delegator', $Delegator);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_Delegator_initialize_1, TMP_Delegator_method_missing_2;

    
    
    Opal.defn(self, '$initialize', TMP_Delegator_initialize_1 = function $$initialize(obj) {
      var self = this;

      return self.$__setobj__(obj)
    }, TMP_Delegator_initialize_1.$$arity = 1);
    return (Opal.defn(self, '$method_missing', TMP_Delegator_method_missing_2 = function $$method_missing(m, $a_rest) {
      var self = this, args, $iter = TMP_Delegator_method_missing_2.$$p, block = $iter || nil, target = nil;

      var $args_len = arguments.length, $rest_len = $args_len - 1;
      if ($rest_len < 0) { $rest_len = 0; }
      args = new Array($rest_len);
      for (var $arg_idx = 1; $arg_idx < $args_len; $arg_idx++) {
        args[$arg_idx - 1] = arguments[$arg_idx];
      }
      if ($iter) TMP_Delegator_method_missing_2.$$p = null;
      
      target = self.$__getobj__();
      if ($truthy(target['$respond_to?'](m))) {
        return $send(target, '__send__', [m].concat(Opal.to_a(args)), block.$to_proc())
        } else {
        return $send(self, Opal.find_super_dispatcher(self, 'method_missing', TMP_Delegator_method_missing_2, false), [m].concat(Opal.to_a(args)), block.$to_proc())
      };
    }, TMP_Delegator_method_missing_2.$$arity = -2), nil) && 'method_missing';
  })($nesting[0], Opal.const_get_relative($nesting, 'BasicObject'), $nesting);
  (function($base, $super, $parent_nesting) {
    function $SimpleDelegator(){};
    var self = $SimpleDelegator = $klass($base, $super, 'SimpleDelegator', $SimpleDelegator);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_SimpleDelegator___getobj___3, TMP_SimpleDelegator___setobj___4;

    def.delegate_sd_obj = nil;
    
    
    Opal.defn(self, '$__getobj__', TMP_SimpleDelegator___getobj___3 = function $$__getobj__() {
      var self = this;

      return self.delegate_sd_obj
    }, TMP_SimpleDelegator___getobj___3.$$arity = 0);
    return (Opal.defn(self, '$__setobj__', TMP_SimpleDelegator___setobj___4 = function $$__setobj__(obj) {
      var self = this;

      return (self.delegate_sd_obj = obj)
    }, TMP_SimpleDelegator___setobj___4.$$arity = 1), nil) && '__setobj__';
  })($nesting[0], Opal.const_get_relative($nesting, 'Delegator'), $nesting);
  return (Opal.defn(Opal.Object, '$DelegateClass', TMP_DelegateClass_5 = function $$DelegateClass(superklass) {
    var self = this;

    return Opal.const_get_relative($nesting, 'SimpleDelegator')
  }, TMP_DelegateClass_5.$$arity = 1), nil) && 'DelegateClass';
};
