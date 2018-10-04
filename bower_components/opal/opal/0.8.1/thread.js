/* Generated by Opal 0.8.1 */
Opal.modules["thread"] = function(Opal) {
  Opal.dynamic_require_severity = "warning";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2;

  Opal.add_stubs(['$allocate', '$core_initialize!', '$current', '$fail', '$[]', '$coerce_key_name', '$[]=', '$key?', '$keys', '$private', '$coerce_to!', '$public', '$clear', '$empty?', '$size', '$shift', '$push', '$each', '$to_proc', '$locked?', '$lock', '$unlock']);
  (function($base, $super) {
    function $ThreadError(){};
    var self = $ThreadError = $klass($base, $super, 'ThreadError', $ThreadError);

    var def = self.$$proto, $scope = self.$$scope;

    return nil;
  })(self, $scope.get('StandardError'));
  (function($base, $super) {
    function $Thread(){};
    var self = $Thread = $klass($base, $super, 'Thread', $Thread);

    var def = self.$$proto, $scope = self.$$scope;

    def.fiber_locals = def.thread_locals = nil;
    Opal.defs(self, '$current', function() {
      var $a, self = this;
      if (self.current == null) self.current = nil;

      if ((($a = self.current) !== nil && (!$a.$$is_boolean || $a == true))) {
        } else {
        self.current = self.$allocate();
        self.current['$core_initialize!']();
      };
      return self.current;
    });

    Opal.defs(self, '$list', function() {
      var self = this;

      return [self.$current()];
    });

    def.$initialize = function(args) {
      var self = this;

      args = $slice.call(arguments, 0);
      return self.$fail($scope.get('NotImplementedError'), "Thread creation not available");
    };

    def['$[]'] = function(key) {
      var self = this;

      return self.fiber_locals['$[]'](self.$coerce_key_name(key));
    };

    def['$[]='] = function(key, value) {
      var self = this;

      return self.fiber_locals['$[]='](self.$coerce_key_name(key), value);
    };

    def['$key?'] = function(key) {
      var self = this;

      return self.fiber_locals['$key?'](self.$coerce_key_name(key));
    };

    def.$keys = function() {
      var self = this;

      return self.fiber_locals.$keys();
    };

    def.$thread_variable_get = function(key) {
      var self = this;

      return self.thread_locals['$[]'](self.$coerce_key_name(key));
    };

    def.$thread_variable_set = function(key, value) {
      var self = this;

      return self.thread_locals['$[]='](self.$coerce_key_name(key), value);
    };

    def['$thread_variable?'] = function(key) {
      var self = this;

      return self.thread_locals['$key?'](self.$coerce_key_name(key));
    };

    def.$thread_variables = function() {
      var self = this;

      return self.thread_locals.$keys();
    };

    self.$private();

    def['$core_initialize!'] = function() {
      var self = this;

      self.thread_locals = $hash2([], {});
      return self.fiber_locals = $hash2([], {});
    };

    def.$coerce_key_name = function(key) {
      var self = this;

      return $scope.get('Opal')['$coerce_to!'](key, $scope.get('String'), "to_s");
    };

    self.$public();

    return (function($base, $super) {
      function $Queue(){};
      var self = $Queue = $klass($base, $super, 'Queue', $Queue);

      var def = self.$$proto, $scope = self.$$scope, TMP_1;

      def.storage = nil;
      def.$initialize = function() {
        var self = this;

        return self.$clear();
      };

      def.$clear = function() {
        var self = this;

        return self.storage = [];
      };

      def['$empty?'] = function() {
        var self = this;

        return self.storage['$empty?']();
      };

      def.$size = function() {
        var self = this;

        return self.storage.$size();
      };

      Opal.defn(self, '$length', def.$size);

      def.$pop = function(non_block) {
        var $a, self = this;

        if (non_block == null) {
          non_block = false
        }
        if ((($a = self['$empty?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
          if (non_block !== false && non_block !== nil) {
            self.$fail($scope.get('ThreadError'), "Queue empty")};
          self.$fail($scope.get('ThreadError'), "Deadlock");};
        return self.storage.$shift();
      };

      Opal.defn(self, '$shift', def.$pop);

      Opal.defn(self, '$deq', def.$pop);

      def.$push = function(value) {
        var self = this;

        return self.storage.$push(value);
      };

      Opal.defn(self, '$<<', def.$push);

      Opal.defn(self, '$enq', def.$push);

      return (def.$each = TMP_1 = function() {
        var $a, $b, self = this, $iter = TMP_1.$$p, block = $iter || nil;

        TMP_1.$$p = null;
        return ($a = ($b = self.storage).$each, $a.$$p = block.$to_proc(), $a).call($b);
      }, nil) && 'each';
    })(self, null);
  })(self, null);
  Opal.cdecl($scope, 'Queue', (($scope.get('Thread')).$$scope.get('Queue')));
  return (function($base, $super) {
    function $Mutex(){};
    var self = $Mutex = $klass($base, $super, 'Mutex', $Mutex);

    var def = self.$$proto, $scope = self.$$scope, TMP_2;

    def.locked = nil;
    def.$initialize = function() {
      var self = this;

      return self.locked = false;
    };

    def.$lock = function() {
      var $a, self = this;

      if ((($a = self.locked) !== nil && (!$a.$$is_boolean || $a == true))) {
        self.$fail($scope.get('ThreadError'), "Deadlock")};
      self.locked = true;
      return self;
    };

    def['$locked?'] = function() {
      var self = this;

      return self.locked;
    };

    def['$owned?'] = function() {
      var self = this;

      return self.locked;
    };

    def.$try_lock = function() {
      var $a, self = this;

      if ((($a = self['$locked?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
        return false
        } else {
        self.$lock();
        return true;
      };
    };

    def.$unlock = function() {
      var $a, self = this;

      if ((($a = self.locked) !== nil && (!$a.$$is_boolean || $a == true))) {
        } else {
        self.$fail($scope.get('ThreadError'), "Mutex not locked")
      };
      self.locked = false;
      return self;
    };

    return (def.$synchronize = TMP_2 = function() {
      var $a, self = this, $iter = TMP_2.$$p, $yield = $iter || nil;

      TMP_2.$$p = null;
      self.$lock();
      try {
      return $a = Opal.yieldX($yield, []), $a === $breaker ? $a : $a
      } finally {
      self.$unlock()
      };
    }, nil) && 'synchronize';
  })(self, null);
};
