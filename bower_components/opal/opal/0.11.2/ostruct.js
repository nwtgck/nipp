/* Generated by Opal 0.11.2 */
Opal.modules["ostruct"] = function(Opal) {
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send, $range = Opal.range;

  Opal.add_stubs(['$each_pair', '$new_ostruct_member', '$[]=', '$-', '$[]', '$to_sym', '$>', '$length', '$raise', '$new', '$end_with?', '$!=', '$enum_for', '$is_a?', '$==', '$instance_variable_get', '$===', '$eql?', '$dup', '$to_n', '$hash', '$attr_reader', '$__send__', '$singleton_class', '$delete', '$respond_to?', '$define_singleton_method', '$__id__', '$class', '$any?', '$+', '$join', '$map', '$inspect']);
  return (function($base, $super, $parent_nesting) {
    function $OpenStruct(){};
    var self = $OpenStruct = $klass($base, $super, 'OpenStruct', $OpenStruct);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_OpenStruct_initialize_2, TMP_OpenStruct_$$_3, TMP_OpenStruct_$$$eq_4, TMP_OpenStruct_method_missing_5, TMP_OpenStruct_each_pair_6, TMP_OpenStruct_$eq$eq_8, TMP_OpenStruct_$eq$eq$eq_9, TMP_OpenStruct_eql$q_10, TMP_OpenStruct_to_h_11, TMP_OpenStruct_to_n_12, TMP_OpenStruct_hash_13, TMP_OpenStruct_delete_field_14, TMP_OpenStruct_new_ostruct_member_17, TMP_OpenStruct_inspect_19;

    def.table = nil;
    
    
    Opal.defn(self, '$initialize', TMP_OpenStruct_initialize_2 = function $$initialize(hash) {
      var TMP_1, self = this;

      if (hash == null) {
        hash = nil;
      }
      
      self.table = $hash2([], {});
      if ($truthy(hash)) {
        return $send(hash, 'each_pair', [], (TMP_1 = function(key, value){var self = TMP_1.$$s || this, $writer = nil;
          if (self.table == null) self.table = nil;
if (key == null) key = nil;if (value == null) value = nil;
        
          $writer = [self.$new_ostruct_member(key), value];
          $send(self.table, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];}, TMP_1.$$s = self, TMP_1.$$arity = 2, TMP_1))
        } else {
        return nil
      };
    }, TMP_OpenStruct_initialize_2.$$arity = -1);
    
    Opal.defn(self, '$[]', TMP_OpenStruct_$$_3 = function(name) {
      var self = this;

      return self.table['$[]'](name.$to_sym())
    }, TMP_OpenStruct_$$_3.$$arity = 1);
    
    Opal.defn(self, '$[]=', TMP_OpenStruct_$$$eq_4 = function(name, value) {
      var self = this, $writer = nil;

      
      $writer = [self.$new_ostruct_member(name), value];
      $send(self.table, '[]=', Opal.to_a($writer));
      return $writer[$rb_minus($writer["length"], 1)];
    }, TMP_OpenStruct_$$$eq_4.$$arity = 2);
    
    Opal.defn(self, '$method_missing', TMP_OpenStruct_method_missing_5 = function $$method_missing(name, $a_rest) {
      var self = this, args, $writer = nil;

      var $args_len = arguments.length, $rest_len = $args_len - 1;
      if ($rest_len < 0) { $rest_len = 0; }
      args = new Array($rest_len);
      for (var $arg_idx = 1; $arg_idx < $args_len; $arg_idx++) {
        args[$arg_idx - 1] = arguments[$arg_idx];
      }
      
      if ($truthy($rb_gt(args.$length(), 2))) {
        self.$raise(Opal.const_get_relative($nesting, 'NoMethodError').$new("" + "undefined method `" + (name) + "' for #<OpenStruct>", name))};
      if ($truthy(name['$end_with?']("="))) {
        
        if ($truthy(args.$length()['$!='](1))) {
          self.$raise(Opal.const_get_relative($nesting, 'ArgumentError').$new("wrong number of arguments (0 for 1)"))};
        
        $writer = [self.$new_ostruct_member(name['$[]']($range(0, -2, false))), args['$[]'](0)];
        $send(self.table, '[]=', Opal.to_a($writer));
        return $writer[$rb_minus($writer["length"], 1)];;
        } else {
        return self.table['$[]'](name.$to_sym())
      };
    }, TMP_OpenStruct_method_missing_5.$$arity = -2);
    
    Opal.defn(self, '$each_pair', TMP_OpenStruct_each_pair_6 = function $$each_pair() {
      var TMP_7, self = this, $iter = TMP_OpenStruct_each_pair_6.$$p, $yield = $iter || nil;

      if ($iter) TMP_OpenStruct_each_pair_6.$$p = null;
      
      if (($yield !== nil)) {
        } else {
        return self.$enum_for("each_pair")
      };
      return $send(self.table, 'each_pair', [], (TMP_7 = function(pair){var self = TMP_7.$$s || this;
if (pair == null) pair = nil;
      return Opal.yield1($yield, pair);}, TMP_7.$$s = self, TMP_7.$$arity = 1, TMP_7));
    }, TMP_OpenStruct_each_pair_6.$$arity = 0);
    
    Opal.defn(self, '$==', TMP_OpenStruct_$eq$eq_8 = function(other) {
      var self = this;

      
      if ($truthy(other['$is_a?'](Opal.const_get_relative($nesting, 'OpenStruct')))) {
        } else {
        return false
      };
      return self.table['$=='](other.$instance_variable_get("@table"));
    }, TMP_OpenStruct_$eq$eq_8.$$arity = 1);
    
    Opal.defn(self, '$===', TMP_OpenStruct_$eq$eq$eq_9 = function(other) {
      var self = this;

      
      if ($truthy(other['$is_a?'](Opal.const_get_relative($nesting, 'OpenStruct')))) {
        } else {
        return false
      };
      return self.table['$==='](other.$instance_variable_get("@table"));
    }, TMP_OpenStruct_$eq$eq$eq_9.$$arity = 1);
    
    Opal.defn(self, '$eql?', TMP_OpenStruct_eql$q_10 = function(other) {
      var self = this;

      
      if ($truthy(other['$is_a?'](Opal.const_get_relative($nesting, 'OpenStruct')))) {
        } else {
        return false
      };
      return self.table['$eql?'](other.$instance_variable_get("@table"));
    }, TMP_OpenStruct_eql$q_10.$$arity = 1);
    
    Opal.defn(self, '$to_h', TMP_OpenStruct_to_h_11 = function $$to_h() {
      var self = this;

      return self.table.$dup()
    }, TMP_OpenStruct_to_h_11.$$arity = 0);
    
    Opal.defn(self, '$to_n', TMP_OpenStruct_to_n_12 = function $$to_n() {
      var self = this;

      return self.table.$to_n()
    }, TMP_OpenStruct_to_n_12.$$arity = 0);
    
    Opal.defn(self, '$hash', TMP_OpenStruct_hash_13 = function $$hash() {
      var self = this;

      return self.table.$hash()
    }, TMP_OpenStruct_hash_13.$$arity = 0);
    self.$attr_reader("table");
    
    Opal.defn(self, '$delete_field', TMP_OpenStruct_delete_field_14 = function $$delete_field(name) {
      var self = this, sym = nil;

      
      sym = name.$to_sym();
      
      try {
        self.$singleton_class().$__send__("remove_method", sym, "" + (sym) + "=")
      } catch ($err) {
        if (Opal.rescue($err, [Opal.const_get_relative($nesting, 'NameError')])) {
          try {
            nil
          } finally { Opal.pop_exception() }
        } else { throw $err; }
      };;
      return self.table.$delete(sym);
    }, TMP_OpenStruct_delete_field_14.$$arity = 1);
    
    Opal.defn(self, '$new_ostruct_member', TMP_OpenStruct_new_ostruct_member_17 = function $$new_ostruct_member(name) {
      var TMP_15, TMP_16, self = this;

      
      name = name.$to_sym();
      if ($truthy(self['$respond_to?'](name))) {
        } else {
        
        $send(self, 'define_singleton_method', [name], (TMP_15 = function(){var self = TMP_15.$$s || this;
          if (self.table == null) self.table = nil;

        return self.table['$[]'](name)}, TMP_15.$$s = self, TMP_15.$$arity = 0, TMP_15));
        $send(self, 'define_singleton_method', ["" + (name) + "="], (TMP_16 = function(x){var self = TMP_16.$$s || this, $writer = nil;
          if (self.table == null) self.table = nil;
if (x == null) x = nil;
        
          $writer = [name, x];
          $send(self.table, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];}, TMP_16.$$s = self, TMP_16.$$arity = 1, TMP_16));
      };
      return name;
    }, TMP_OpenStruct_new_ostruct_member_17.$$arity = 1);
    var ostruct_ids;;
    
    Opal.defn(self, '$inspect', TMP_OpenStruct_inspect_19 = function $$inspect() {
      var TMP_18, self = this, result = nil;

      
      
      var top = (ostruct_ids === undefined),
          ostruct_id = self.$__id__();
    ;
      
      return (function() { try {
      
      result = "" + "#<" + (self.$class());
      
        if (top) {
          ostruct_ids = {};
        }
        if (ostruct_ids.hasOwnProperty(ostruct_id)) {
          return result + ' ...>';
        }
        ostruct_ids[ostruct_id] = true;
      ;
      if ($truthy(self.table['$any?']())) {
        result = $rb_plus(result, " ")};
      result = $rb_plus(result, $send(self.$each_pair(), 'map', [], (TMP_18 = function(name, value){var self = TMP_18.$$s || this;
if (name == null) name = nil;if (value == null) value = nil;
      return "" + (name) + "=" + (value.$inspect())}, TMP_18.$$s = self, TMP_18.$$arity = 2, TMP_18)).$join(", "));
      result = $rb_plus(result, ">");
      return result;
      } finally {
        
        if (top) {
          ostruct_ids = undefined;
        }
      
      }; })();;
    }, TMP_OpenStruct_inspect_19.$$arity = 0);
    return Opal.alias(self, "to_s", "inspect");
  })($nesting[0], null, $nesting)
};
