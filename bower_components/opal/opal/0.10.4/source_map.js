/* Generated by Opal 0.10.4 */
Opal.modules["json"] = function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $hash2 = Opal.hash2, $klass = Opal.klass;

  Opal.add_stubs(['$new', '$push', '$[]=', '$[]', '$create_id', '$json_create', '$attr_accessor', '$create_id=', '$===', '$parse', '$generate', '$from_object', '$merge', '$to_json', '$responds_to?', '$to_io', '$write', '$to_s', '$to_a', '$strftime']);
  (function($base) {
    var $JSON, self = $JSON = $module($base, 'JSON');

    var def = self.$$proto, $scope = self.$$scope, $a, $b, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6, TMP_7;

    
    var $parse  = JSON.parse,
        $hasOwn = Opal.hasOwnProperty;

    function to_opal(value, options) {
      var klass, arr, hash, i, ii, k;

      switch (typeof value) {
        case 'string':
          return value;

        case 'number':
          return value;

        case 'boolean':
          return !!value;

        case 'null':
          return nil;

        case 'object':
          if (!value) return nil;

          if (value.$$is_array) {
            arr = (options.array_class).$new();

            for (i = 0, ii = value.length; i < ii; i++) {
              (arr).$push(to_opal(value[i], options));
            }

            return arr;
          }
          else {
            hash = (options.object_class).$new();

            for (k in value) {
              if ($hasOwn.call(value, k)) {
                (hash)['$[]='](k, to_opal(value[k], options));
              }
            }

            if (!options.parse && (klass = (hash)['$[]']($scope.get('JSON').$create_id())) != nil) {
              klass = Opal.get(klass);
              return (klass).$json_create(hash);
            }
            else {
              return hash;
            }
          }
        }
    };
  

    (function(self) {
      var $scope = self.$$scope, def = self.$$proto;

      return self.$attr_accessor("create_id")
    })(Opal.get_singleton_class(self));

    (($a = ["json_class"]), $b = self, $b['$create_id='].apply($b, $a), $a[$a.length-1]);

    Opal.defs(self, '$[]', TMP_1 = function(value, options) {
      var $a, self = this;

      if (options == null) {
        options = $hash2([], {});
      }
      if ((($a = $scope.get('String')['$==='](value)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return self.$parse(value, options)
        } else {
        return self.$generate(value, options)
      };
    }, TMP_1.$$arity = -2);

    Opal.defs(self, '$parse', TMP_2 = function $$parse(source, options) {
      var self = this;

      if (options == null) {
        options = $hash2([], {});
      }
      return self.$from_object($parse(source), options.$merge($hash2(["parse"], {"parse": true})));
    }, TMP_2.$$arity = -2);

    Opal.defs(self, '$parse!', TMP_3 = function(source, options) {
      var self = this;

      if (options == null) {
        options = $hash2([], {});
      }
      return self.$parse(source, options);
    }, TMP_3.$$arity = -2);

    Opal.defs(self, '$load', TMP_4 = function $$load(source, options) {
      var self = this;

      if (options == null) {
        options = $hash2([], {});
      }
      return self.$from_object($parse(source), options);
    }, TMP_4.$$arity = -2);

    Opal.defs(self, '$from_object', TMP_5 = function $$from_object(js_object, options) {
      var $a, $b, $c, self = this;

      if (options == null) {
        options = $hash2([], {});
      }
      ($a = "object_class", $b = options, ((($c = $b['$[]']($a)) !== false && $c !== nil && $c != null) ? $c : $b['$[]=']($a, $scope.get('Hash'))));
      ($a = "array_class", $b = options, ((($c = $b['$[]']($a)) !== false && $c !== nil && $c != null) ? $c : $b['$[]=']($a, $scope.get('Array'))));
      return to_opal(js_object, options.$$smap);
    }, TMP_5.$$arity = -2);

    Opal.defs(self, '$generate', TMP_6 = function $$generate(obj, options) {
      var self = this;

      if (options == null) {
        options = $hash2([], {});
      }
      return obj.$to_json(options);
    }, TMP_6.$$arity = -2);

    Opal.defs(self, '$dump', TMP_7 = function $$dump(obj, io, limit) {
      var $a, self = this, string = nil;

      if (io == null) {
        io = nil;
      }
      if (limit == null) {
        limit = nil;
      }
      string = self.$generate(obj);
      if (io !== false && io !== nil && io != null) {
        if ((($a = io['$responds_to?']("to_io")) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          io = io.$to_io()};
        io.$write(string);
        return io;
        } else {
        return string
      };
    }, TMP_7.$$arity = -2);
  })($scope.base);
  (function($base, $super) {
    function $Object(){};
    var self = $Object = $klass($base, $super, 'Object', $Object);

    var def = self.$$proto, $scope = self.$$scope, TMP_8;

    return (Opal.defn(self, '$to_json', TMP_8 = function $$to_json() {
      var self = this;

      return self.$to_s().$to_json();
    }, TMP_8.$$arity = 0), nil) && 'to_json'
  })($scope.base, null);
  (function($base) {
    var $Enumerable, self = $Enumerable = $module($base, 'Enumerable');

    var def = self.$$proto, $scope = self.$$scope, TMP_9;

    Opal.defn(self, '$to_json', TMP_9 = function $$to_json() {
      var self = this;

      return self.$to_a().$to_json();
    }, TMP_9.$$arity = 0)
  })($scope.base);
  (function($base, $super) {
    function $Array(){};
    var self = $Array = $klass($base, $super, 'Array', $Array);

    var def = self.$$proto, $scope = self.$$scope, TMP_10;

    return (Opal.defn(self, '$to_json', TMP_10 = function $$to_json() {
      var self = this;

      
      var result = [];

      for (var i = 0, length = self.length; i < length; i++) {
        result.push((self[i]).$to_json());
      }

      return '[' + result.join(', ') + ']';
    
    }, TMP_10.$$arity = 0), nil) && 'to_json'
  })($scope.base, null);
  (function($base, $super) {
    function $Boolean(){};
    var self = $Boolean = $klass($base, $super, 'Boolean', $Boolean);

    var def = self.$$proto, $scope = self.$$scope, TMP_11;

    return (Opal.defn(self, '$to_json', TMP_11 = function $$to_json() {
      var self = this;

      return (self == true) ? 'true' : 'false';
    }, TMP_11.$$arity = 0), nil) && 'to_json'
  })($scope.base, null);
  (function($base, $super) {
    function $Hash(){};
    var self = $Hash = $klass($base, $super, 'Hash', $Hash);

    var def = self.$$proto, $scope = self.$$scope, TMP_12;

    return (Opal.defn(self, '$to_json', TMP_12 = function $$to_json() {
      var self = this;

      
      var result = [];

      for (var i = 0, keys = self.$$keys, length = keys.length, key, value; i < length; i++) {
        key = keys[i];

        if (key.$$is_string) {
          value = self.$$smap[key];
        } else {
          value = key.value;
          key = key.key;
        }

        result.push((key).$to_s().$to_json() + ':' + (value).$to_json());
      }

      return '{' + result.join(', ') + '}';
    ;
    }, TMP_12.$$arity = 0), nil) && 'to_json'
  })($scope.base, null);
  (function($base, $super) {
    function $NilClass(){};
    var self = $NilClass = $klass($base, $super, 'NilClass', $NilClass);

    var def = self.$$proto, $scope = self.$$scope, TMP_13;

    return (Opal.defn(self, '$to_json', TMP_13 = function $$to_json() {
      var self = this;

      return "null";
    }, TMP_13.$$arity = 0), nil) && 'to_json'
  })($scope.base, null);
  (function($base, $super) {
    function $Numeric(){};
    var self = $Numeric = $klass($base, $super, 'Numeric', $Numeric);

    var def = self.$$proto, $scope = self.$$scope, TMP_14;

    return (Opal.defn(self, '$to_json', TMP_14 = function $$to_json() {
      var self = this;

      return self.toString();
    }, TMP_14.$$arity = 0), nil) && 'to_json'
  })($scope.base, null);
  (function($base, $super) {
    function $String(){};
    var self = $String = $klass($base, $super, 'String', $String);

    var def = self.$$proto, $scope = self.$$scope;

    return Opal.alias(self, 'to_json', 'inspect')
  })($scope.base, null);
  (function($base, $super) {
    function $Time(){};
    var self = $Time = $klass($base, $super, 'Time', $Time);

    var def = self.$$proto, $scope = self.$$scope, TMP_15;

    return (Opal.defn(self, '$to_json', TMP_15 = function $$to_json() {
      var self = this;

      return self.$strftime("%FT%T%z").$to_json();
    }, TMP_15.$$arity = 0), nil) && 'to_json'
  })($scope.base, null);
  return (function($base, $super) {
    function $Date(){};
    var self = $Date = $klass($base, $super, 'Date', $Date);

    var def = self.$$proto, $scope = self.$$scope, TMP_16, TMP_17;

    Opal.defn(self, '$to_json', TMP_16 = function $$to_json() {
      var self = this;

      return self.$to_s().$to_json();
    }, TMP_16.$$arity = 0);

    return (Opal.defn(self, '$as_json', TMP_17 = function $$as_json() {
      var self = this;

      return self.$to_s();
    }, TMP_17.$$arity = 0), nil) && 'as_json';
  })($scope.base, null);
};
/* Generated by Opal 0.10.4 */
Opal.modules["source_map/offset"] = function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;

  Opal.add_stubs(['$include', '$first', '$===', '$attr_reader', '$new', '$+', '$line', '$column', '$raise', '$class', '$-', '$zero?', '$==']);
  return (function($base) {
    var $SourceMap, self = $SourceMap = $module($base, 'SourceMap');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base, $super) {
      function $Offset(){};
      var self = $Offset = $klass($base, $super, 'Offset', $Offset);

      var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6;

      self.$include($scope.get('Comparable'));

      Opal.defs(self, '$new', TMP_1 = function($a_rest) {
        var $b, $c, $d, self = this, args, $iter = TMP_1.$$p, $yield = $iter || nil, $case = nil;

        var $args_len = arguments.length, $rest_len = $args_len - 0;
        if ($rest_len < 0) { $rest_len = 0; }
        args = new Array($rest_len);
        for (var $arg_idx = 0; $arg_idx < $args_len; $arg_idx++) {
          args[$arg_idx - 0] = arguments[$arg_idx];
        }
        TMP_1.$$p = null;
        return (function() {$case = args.$first();if ($scope.get('Offset')['$===']($case)) {return args.$first()}else if ($scope.get('Array')['$===']($case)) {return ($b = ($c = self, Opal.find_super_dispatcher(self, 'new', TMP_1, false, $Offset)), $b.$$p = null, $b).apply($c, Opal.to_a(args.$first()))}else {return ($b = ($d = self, Opal.find_super_dispatcher(self, 'new', TMP_1, false, $Offset)), $b.$$p = null, $b).apply($d, Opal.to_a(args))}})();
      }, TMP_1.$$arity = -1);

      Opal.defn(self, '$initialize', TMP_2 = function $$initialize(line, column) {
        var $a, self = this;

        return $a = [line, column], self.line = $a[0], self.column = $a[1], $a;
      }, TMP_2.$$arity = 2);

      self.$attr_reader("line");

      self.$attr_reader("column");

      Opal.defn(self, '$+', TMP_3 = function(other) {
        var self = this, $case = nil;

        return (function() {$case = other;if ($scope.get('Offset')['$===']($case)) {return $scope.get('Offset').$new($rb_plus(self.$line(), other.$line()), $rb_plus(self.$column(), other.$column()))}else if ($scope.get('Integer')['$===']($case)) {return $scope.get('Offset').$new($rb_plus(self.$line(), other), self.$column())}else {return self.$raise($scope.get('ArgumentError'), "can't convert " + (other) + " into " + (self.$class()))}})();
      }, TMP_3.$$arity = 1);

      Opal.defn(self, '$<=>', TMP_4 = function(other) {
        var $a, self = this, $case = nil, diff = nil;

        return (function() {$case = other;if ($scope.get('Offset')['$===']($case)) {diff = $rb_minus(self.$line(), other.$line());
        if ((($a = diff['$zero?']()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return $rb_minus(self.$column(), other.$column())
          } else {
          return diff
        };}else {return self.$raise($scope.get('ArgumentError'), "can't convert " + (other.$class()) + " into " + (self.$class()))}})();
      }, TMP_4.$$arity = 1);

      Opal.defn(self, '$to_s', TMP_5 = function $$to_s() {
        var self = this;

        if (self.$column()['$=='](0)) {
          return "" + (self.$line())
          } else {
          return "" + (self.$line()) + ":" + (self.$column())
        };
      }, TMP_5.$$arity = 0);

      return (Opal.defn(self, '$inspect', TMP_6 = function $$inspect() {
        var self = this;

        return "#<" + (self.$class()) + " line=" + (self.$line()) + ", column=" + (self.$column()) + ">";
      }, TMP_6.$$arity = 0), nil) && 'inspect';
    })($scope.base, null)
  })($scope.base)
};
/* Generated by Opal 0.10.4 */
Opal.modules["source_map/mapping"] = function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;

  Opal.add_stubs(['$require', '$line', '$generated', '$column', '$<<', '$source', '$original', '$name', '$class', '$inspect', '$new']);
  self.$require("source_map/offset");
  return (function($base) {
    var $SourceMap, self = $SourceMap = $module($base, 'SourceMap');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base, $super) {
      function $Mapping(){};
      var self = $Mapping = $klass($base, $super, 'Mapping', $Mapping);

      var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2;

      Opal.defn(self, '$to_s', TMP_1 = function $$to_s() {
        var $a, self = this, str = nil;

        str = "" + (self.$generated().$line()) + ":" + (self.$generated().$column());
        str['$<<']("->" + (self.$source()) + "@" + (self.$original().$line()) + ":" + (self.$original().$column()));
        if ((($a = self.$name()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          str['$<<']("#" + (self.$name()))};
        return str;
      }, TMP_1.$$arity = 0);

      return (Opal.defn(self, '$inspect', TMP_2 = function $$inspect() {
        var $a, self = this, str = nil;

        str = "#<" + (self.$class()) + " source=" + (self.$source().$inspect());
        str['$<<'](" generated=" + (self.$generated()) + ", original=" + (self.$original()));
        if ((($a = self.$name()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          str['$<<'](" name=" + (self.$name().$inspect()))};
        str['$<<'](">");
        return str;
      }, TMP_2.$$arity = 0), nil) && 'inspect';
    })($scope.base, $scope.get('Struct').$new("source", "generated", "original", "name"))
  })($scope.base);
};
/* Generated by Opal 0.10.4 */
Opal.modules["source_map/vlq"] = function(Opal) {
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $range = Opal.range, $hash2 = Opal.hash2;

  Opal.add_stubs(['$<<', '$-', '$split', '$inject', '$[]=', '$[]', '$each', '$<', '$+', '$-@', '$loop', '$&', '$>>', '$>', '$|', '$join', '$any?', '$shift', '$raise', '$==', '$map', '$encode', '$each_with_index', '$decode']);
  return (function($base) {
    var $SourceMap, self = $SourceMap = $module($base, 'SourceMap');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base) {
      var $VLQ, self = $VLQ = $module($base, 'VLQ');

      var def = self.$$proto, $scope = self.$$scope, $a, $b, TMP_1, TMP_4, TMP_5, TMP_8, TMP_11;

      Opal.cdecl($scope, 'VLQ_BASE_SHIFT', 5);

      Opal.cdecl($scope, 'VLQ_BASE', (1)['$<<']($scope.get('VLQ_BASE_SHIFT')));

      Opal.cdecl($scope, 'VLQ_BASE_MASK', $rb_minus($scope.get('VLQ_BASE'), 1));

      Opal.cdecl($scope, 'VLQ_CONTINUATION_BIT', $scope.get('VLQ_BASE'));

      Opal.cdecl($scope, 'BASE64_DIGITS', "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".$split(""));

      Opal.cdecl($scope, 'BASE64_VALUES', ($a = ($b = ($range(0, 64, true))).$inject, $a.$$p = (TMP_1 = function(h, i){var self = TMP_1.$$s || this;
if (h == null) h = nil;if (i == null) i = nil;
      h['$[]=']($scope.get('BASE64_DIGITS')['$[]'](i), i);
        return h;}, TMP_1.$$s = self, TMP_1.$$arity = 2, TMP_1), $a).call($b, $hash2([], {})));

      Opal.defs(self, '$encode', TMP_4 = function $$encode(ary) {
        var $a, $b, TMP_2, self = this, result = nil;

        result = [];
        ($a = ($b = ary).$each, $a.$$p = (TMP_2 = function(n){var self = TMP_2.$$s || this, $c, $d, TMP_3, vlq = nil;
if (n == null) n = nil;
        vlq = (function() {if ((($c = $rb_lt(n, 0)) !== nil && $c != null && (!$c.$$is_boolean || $c == true))) {
            return $rb_plus(((n['$-@']())['$<<'](1)), 1)
            } else {
            return n['$<<'](1)
          }; return nil; })();
          return (function(){var $brk = Opal.new_brk(); try {return ($c = ($d = self).$loop, $c.$$p = (TMP_3 = function(){var self = TMP_3.$$s || this, $e, digit = nil;

          digit = vlq['$&']($scope.get('VLQ_BASE_MASK'));
            vlq = vlq['$>>']($scope.get('VLQ_BASE_SHIFT'));
            if ((($e = $rb_gt(vlq, 0)) !== nil && $e != null && (!$e.$$is_boolean || $e == true))) {
              digit = digit['$|']($scope.get('VLQ_CONTINUATION_BIT'))};
            result['$<<']($scope.get('BASE64_DIGITS')['$[]'](digit));
            if ((($e = $rb_gt(vlq, 0)) !== nil && $e != null && (!$e.$$is_boolean || $e == true))) {
              return nil
              } else {
              
              Opal.brk(nil, $brk)
            };}, TMP_3.$$s = self, TMP_3.$$brk = $brk, TMP_3.$$arity = 0, TMP_3), $c).call($d)
          } catch (err) { if (err === $brk) { return err.$v } else { throw err } }})();}, TMP_2.$$s = self, TMP_2.$$arity = 1, TMP_2), $a).call($b);
        return result.$join();
      }, TMP_4.$$arity = 1);

      Opal.defs(self, '$decode', TMP_5 = function $$decode(str) {
        var $a, $b, self = this, result = nil, chars = nil, vlq = nil, shift = nil, continuation = nil, char$ = nil, digit = nil;

        result = [];
        chars = str.$split("");
        while ((($b = chars['$any?']()) !== nil && $b != null && (!$b.$$is_boolean || $b == true))) {
        vlq = 0;
        shift = 0;
        continuation = true;
        while (continuation !== false && continuation !== nil && continuation != null) {
        char$ = chars.$shift();
        if (char$ !== false && char$ !== nil && char$ != null) {
          } else {
          self.$raise($scope.get('ArgumentError'))
        };
        digit = $scope.get('BASE64_VALUES')['$[]'](char$);
        if ((digit['$&']($scope.get('VLQ_CONTINUATION_BIT')))['$=='](0)) {
          continuation = false};
        digit = digit['$&']($scope.get('VLQ_BASE_MASK'));
        vlq = $rb_plus(vlq, digit['$<<'](shift));
        shift = $rb_plus(shift, $scope.get('VLQ_BASE_SHIFT'));};
        result['$<<'](((function() {if (vlq['$&'](1)['$=='](1)) {
          return (vlq['$>>'](1))['$-@']()
          } else {
          return vlq['$>>'](1)
        }; return nil; })()));};
        return result;
      }, TMP_5.$$arity = 1);

      Opal.defs(self, '$encode_mappings', TMP_8 = function $$encode_mappings(ary) {
        var $a, $b, TMP_6, self = this;

        return ($a = ($b = ary).$map, $a.$$p = (TMP_6 = function(group){var self = TMP_6.$$s || this, $c, $d, TMP_7;
if (group == null) group = nil;
        return ($c = ($d = group).$map, $c.$$p = (TMP_7 = function(segment){var self = TMP_7.$$s || this;
if (segment == null) segment = nil;
          return self.$encode(segment)}, TMP_7.$$s = self, TMP_7.$$arity = 1, TMP_7), $c).call($d).$join(",")}, TMP_6.$$s = self, TMP_6.$$arity = 1, TMP_6), $a).call($b).$join(";");
      }, TMP_8.$$arity = 1);

      Opal.defs(self, '$decode_mappings', TMP_11 = function $$decode_mappings(str) {
        var $a, $b, TMP_9, self = this, mappings = nil;

        mappings = [];
        ($a = ($b = str.$split(";")).$each_with_index, $a.$$p = (TMP_9 = function(group, index){var self = TMP_9.$$s || this, $c, $d, TMP_10;
if (group == null) group = nil;if (index == null) index = nil;
        mappings['$[]='](index, []);
          return ($c = ($d = group.$split(",")).$each, $c.$$p = (TMP_10 = function(segment){var self = TMP_10.$$s || this;
if (segment == null) segment = nil;
          return mappings['$[]'](index)['$<<'](self.$decode(segment))}, TMP_10.$$s = self, TMP_10.$$arity = 1, TMP_10), $c).call($d);}, TMP_9.$$s = self, TMP_9.$$arity = 2, TMP_9), $a).call($b);
        return mappings;
      }, TMP_11.$$arity = 1);
    })($scope.base)
  })($scope.base)
};
/* Generated by Opal 0.10.4 */
Opal.modules["source_map/map"] = function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $hash2 = Opal.hash2, $range = Opal.range;

  Opal.add_stubs(['$require', '$include', '$from_hash', '$parse', '$[]', '$decode_vlq_mappings', '$new', '$each_with_index', '$+', '$each', '$>=', '$size', '$<<', '$decode_mappings', '$attr_reader', '$to_proc', '$build_vlq_string', '$compact', '$uniq', '$map', '$eql?', '$is_a?', '$class', '$==', '$mappings', '$filename', '$dup', '$any?', '$line', '$generated', '$last', '$source', '$original', '$name', '$empty?', '$bsearch', '$/', '$>', '$<', '$-', '$to_s', '$sources', '$names', '$inspect', '$protected', '$group_by', '$to_a', '$column', '$max', '$keys', '$encode_mappings']);
  self.$require("json");
  self.$require("source_map/offset");
  self.$require("source_map/mapping");
  self.$require("source_map/vlq");
  return (function($base) {
    var $SourceMap, self = $SourceMap = $module($base, 'SourceMap');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base, $super) {
      function $Map(){};
      var self = $Map = $klass($base, $super, 'Map', $Map);

      var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_5, TMP_6, TMP_7, TMP_8, TMP_9, TMP_10, TMP_11, TMP_12, TMP_13, TMP_14, TMP_16, TMP_18, TMP_19, TMP_20, TMP_21, TMP_25;

      def.mappings = def.string = def.sources = def.names = nil;
      self.$include($scope.get('Enumerable'));

      Opal.defs(self, '$from_json', TMP_1 = function $$from_json(json) {
        var self = this;

        return self.$from_hash($scope.get('JSON').$parse(json));
      }, TMP_1.$$arity = 1);

      Opal.defs(self, '$from_hash', TMP_2 = function $$from_hash(hash) {
        var self = this, str = nil, sources = nil, names = nil, mappings = nil;

        str = hash['$[]']("mappings");
        sources = hash['$[]']("sources");
        names = hash['$[]']("names");
        mappings = self.$decode_vlq_mappings(str, sources, names);
        return self.$new(mappings, hash['$[]']("file"));
      }, TMP_2.$$arity = 1);

      Opal.defs(self, '$decode_vlq_mappings', TMP_5 = function $$decode_vlq_mappings(str, sources, names) {
        var $a, $b, TMP_3, self = this, mappings = nil, source_id = nil, original_line = nil, original_column = nil, name_id = nil;

        if (sources == null) {
          sources = [];
        }
        if (names == null) {
          names = [];
        }
        mappings = [];
        source_id = 0;
        original_line = 1;
        original_column = 0;
        name_id = 0;
        ($a = ($b = $scope.get('VLQ').$decode_mappings(str)).$each_with_index, $a.$$p = (TMP_3 = function(group, index){var self = TMP_3.$$s || this, $c, $d, TMP_4, generated_column = nil, generated_line = nil;
if (group == null) group = nil;if (index == null) index = nil;
        generated_column = 0;
          generated_line = $rb_plus(index, 1);
          return ($c = ($d = group).$each, $c.$$p = (TMP_4 = function(segment){var self = TMP_4.$$s || this, $e, generated = nil, source = nil, original = nil, name = nil;
if (segment == null) segment = nil;
          generated_column = $rb_plus(generated_column, segment['$[]'](0));
            generated = $scope.get('Offset').$new(generated_line, generated_column);
            if ((($e = $rb_ge(segment.$size(), 4)) !== nil && $e != null && (!$e.$$is_boolean || $e == true))) {
              source_id = $rb_plus(source_id, segment['$[]'](1));
              original_line = $rb_plus(original_line, segment['$[]'](2));
              original_column = $rb_plus(original_column, segment['$[]'](3));
              source = sources['$[]'](source_id);
              original = $scope.get('Offset').$new(original_line, original_column);
              } else {
              return nil;
            };
            if ((($e = segment['$[]'](4)) !== nil && $e != null && (!$e.$$is_boolean || $e == true))) {
              name_id = $rb_plus(name_id, segment['$[]'](4));
              name = names['$[]'](name_id);};
            return mappings['$<<']($scope.get('Mapping').$new(source, generated, original, name));}, TMP_4.$$s = self, TMP_4.$$arity = 1, TMP_4), $c).call($d);}, TMP_3.$$s = self, TMP_3.$$arity = 2, TMP_3), $a).call($b);
        return mappings;
      }, TMP_5.$$arity = -2);

      Opal.defn(self, '$initialize', TMP_6 = function $$initialize(mappings, filename) {
        var $a, self = this;

        if (mappings == null) {
          mappings = [];
        }
        if (filename == null) {
          filename = nil;
        }
        return $a = [mappings, filename], self.mappings = $a[0], self.filename = $a[1], $a;
      }, TMP_6.$$arity = -1);

      self.$attr_reader("filename");

      Opal.defn(self, '$size', TMP_7 = function $$size() {
        var self = this;

        return self.mappings.$size();
      }, TMP_7.$$arity = 0);

      Opal.defn(self, '$[]', TMP_8 = function(i) {
        var self = this;

        return self.mappings['$[]'](i);
      }, TMP_8.$$arity = 1);

      Opal.defn(self, '$each', TMP_9 = function $$each() {
        var $a, $b, self = this, $iter = TMP_9.$$p, block = $iter || nil;

        TMP_9.$$p = null;
        return ($a = ($b = self.mappings).$each, $a.$$p = block.$to_proc(), $a).call($b);
      }, TMP_9.$$arity = 0);

      Opal.defn(self, '$to_s', TMP_10 = function $$to_s() {
        var $a, self = this;

        return ((($a = self.string) !== false && $a !== nil && $a != null) ? $a : self.string = self.$build_vlq_string());
      }, TMP_10.$$arity = 0);

      Opal.defn(self, '$sources', TMP_11 = function $$sources() {
        var $a, $b, $c, self = this;

        return ((($a = self.sources) !== false && $a !== nil && $a != null) ? $a : self.sources = ($b = ($c = self.mappings).$map, $b.$$p = "source".$to_proc(), $b).call($c).$uniq().$compact());
      }, TMP_11.$$arity = 0);

      Opal.defn(self, '$names', TMP_12 = function $$names() {
        var $a, $b, $c, self = this;

        return ((($a = self.names) !== false && $a !== nil && $a != null) ? $a : self.names = ($b = ($c = self.mappings).$map, $b.$$p = "name".$to_proc(), $b).call($c).$uniq().$compact());
      }, TMP_12.$$arity = 0);

      Opal.defn(self, '$==', TMP_13 = function(other) {
        var self = this;

        return self['$eql?'](other);
      }, TMP_13.$$arity = 1);

      Opal.defn(self, '$eql?', TMP_14 = function(other) {
        var $a, $b, self = this;

        return ($a = ($b = other['$is_a?'](self.$class()), $b !== false && $b !== nil && $b != null ?self.$mappings()['$=='](other.$mappings()) : $b), $a !== false && $a !== nil && $a != null ?self.$filename()['$=='](other.$filename()) : $a);
      }, TMP_14.$$arity = 1);

      Opal.defn(self, '$+', TMP_16 = function(other) {
        var $a, $b, TMP_15, self = this, mappings = nil, offset = nil;

        mappings = self.mappings.$dup();
        offset = (function() {if ((($a = self.mappings['$any?']()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return $rb_plus(self.mappings.$last().$generated().$line(), 1)
          } else {
          return 0
        }; return nil; })();
        ($a = ($b = other).$each, $a.$$p = (TMP_15 = function(m){var self = TMP_15.$$s || this;
if (m == null) m = nil;
        return mappings['$<<']($scope.get('Mapping').$new(m.$source(), $rb_plus(m.$generated(), offset), m.$original(), m.$name()))}, TMP_15.$$s = self, TMP_15.$$arity = 1, TMP_15), $a).call($b);
        return self.$class().$new(mappings, other.$filename());
      }, TMP_16.$$arity = 1);

      Opal.defn(self, '$|', TMP_18 = function(other) {
        var $a, $b, TMP_17, self = this, mappings = nil;

        if ((($a = self.$mappings()['$empty?']()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return other.$dup()};
        mappings = [];
        ($a = ($b = other).$each, $a.$$p = (TMP_17 = function(m){var self = TMP_17.$$s || this, om = nil;
if (m == null) m = nil;
        om = self.$bsearch(m.$original());
          if (om !== false && om !== nil && om != null) {
            } else {
            return nil;
          };
          return mappings['$<<']($scope.get('Mapping').$new(om.$source(), m.$generated(), om.$original(), om.$name()));}, TMP_17.$$s = self, TMP_17.$$arity = 1, TMP_17), $a).call($b);
        return self.$class().$new(mappings, other.$filename());
      }, TMP_18.$$arity = 1);

      Opal.defn(self, '$bsearch', TMP_19 = function $$bsearch(offset, from, to) {
        var $a, self = this, mid = nil;

        if (from == null) {
          from = 0;
        }
        if (to == null) {
          to = $rb_minus(self.$size(), 1);
        }
        mid = $rb_divide(($rb_plus(from, to)), 2);
        if ((($a = $rb_gt(from, to)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return (function() {if ((($a = $rb_lt(from, 1)) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
            return nil
            } else {
            return self['$[]']($rb_minus(from, 1))
          }; return nil; })()};
        if (offset['$=='](self['$[]'](mid).$generated())) {
          return self['$[]'](mid)
        } else if ((($a = $rb_lt(offset, self['$[]'](mid).$generated())) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return self.$bsearch(offset, from, $rb_minus(mid, 1))
        } else if ((($a = $rb_gt(offset, self['$[]'](mid).$generated())) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          return self.$bsearch(offset, $rb_plus(mid, 1), to)
          } else {
          return nil
        };
      }, TMP_19.$$arity = -2);

      Opal.defn(self, '$as_json', TMP_20 = function $$as_json() {
        var self = this;

        return $hash2(["version", "file", "mappings", "sources", "names"], {"version": 3, "file": self.$filename(), "mappings": self.$to_s(), "sources": self.$sources(), "names": self.$names()});
      }, TMP_20.$$arity = 0);

      Opal.defn(self, '$inspect', TMP_21 = function $$inspect() {
        var $a, $b, self = this, str = nil;

        str = "#<" + (self.$class());
        if ((($a = self.$filename()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          str['$<<'](" filename=" + (self.$filename().$inspect()))};
        if ((($a = self.$mappings()['$any?']()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
          str['$<<'](" mappings=" + (($a = ($b = self.$mappings()).$map, $a.$$p = "to_s".$to_proc(), $a).call($b).$inspect()))};
        str['$<<'](">");
        return str;
      }, TMP_21.$$arity = 0);

      self.$protected();

      self.$attr_reader("mappings");

      return (Opal.defn(self, '$build_vlq_string', TMP_25 = function $$build_vlq_string() {
        var $a, $b, TMP_22, $c, TMP_23, $d, self = this, source_id = nil, source_line = nil, source_column = nil, name_id = nil, by_lines = nil, sources_index = nil, names_index = nil, ary = nil;

        source_id = 0;
        source_line = 1;
        source_column = 0;
        name_id = 0;
        by_lines = ($a = ($b = self.mappings).$group_by, $a.$$p = (TMP_22 = function(m){var self = TMP_22.$$s || this;
if (m == null) m = nil;
        return m.$generated().$line()}, TMP_22.$$s = self, TMP_22.$$arity = 1, TMP_22), $a).call($b);
        sources_index = $scope.get('Hash')['$[]'](self.$sources().$each_with_index().$to_a());
        names_index = $scope.get('Hash')['$[]'](self.$names().$each_with_index().$to_a());
        ary = ($a = ($c = ($range(1, (((($d = by_lines.$keys().$max()) !== false && $d !== nil && $d != null) ? $d : 1)), false))).$map, $a.$$p = (TMP_23 = function(line){var self = TMP_23.$$s || this, $d, $e, TMP_24, $f, generated_column = nil;
if (line == null) line = nil;
        generated_column = 0;
          return ($d = ($e = (((($f = by_lines['$[]'](line)) !== false && $f !== nil && $f != null) ? $f : []))).$map, $d.$$p = (TMP_24 = function(mapping){var self = TMP_24.$$s || this, $f, group = nil;
if (mapping == null) mapping = nil;
          group = [];
            group['$<<']($rb_minus(mapping.$generated().$column(), generated_column));
            group['$<<']($rb_minus(sources_index['$[]'](mapping.$source()), source_id));
            group['$<<']($rb_minus(mapping.$original().$line(), source_line));
            group['$<<']($rb_minus(mapping.$original().$column(), source_column));
            if ((($f = mapping.$name()) !== nil && $f != null && (!$f.$$is_boolean || $f == true))) {
              group['$<<']($rb_minus(names_index['$[]'](mapping.$name()), name_id))};
            generated_column = mapping.$generated().$column();
            source_id = sources_index['$[]'](mapping.$source());
            source_line = mapping.$original().$line();
            source_column = mapping.$original().$column();
            if ((($f = mapping.$name()) !== nil && $f != null && (!$f.$$is_boolean || $f == true))) {
              name_id = names_index['$[]'](mapping.$name())};
            return group;}, TMP_24.$$s = self, TMP_24.$$arity = 1, TMP_24), $d).call($e);}, TMP_23.$$s = self, TMP_23.$$arity = 1, TMP_23), $a).call($c);
        return $scope.get('VLQ').$encode_mappings(ary);
      }, TMP_25.$$arity = 0), nil) && 'build_vlq_string';
    })($scope.base, null)
  })($scope.base);
};
/* Generated by Opal 0.10.4 */
Opal.modules["source_map/version"] = function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;

  return (function($base) {
    var $SourceMap, self = $SourceMap = $module($base, 'SourceMap');

    var def = self.$$proto, $scope = self.$$scope;

    Opal.cdecl($scope, 'VERSION', "0.0.2")
  })($scope.base)
};
/* Generated by Opal 0.10.4 */
Opal.modules["source_map"] = function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$require']);
  self.$require("source_map/map");
  self.$require("source_map/mapping");
  self.$require("source_map/offset");
  self.$require("source_map/version");
  return self.$require("source_map/vlq");
};
