/* Generated by Opal 0.11.2 */
Opal.modules["rbconfig"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $hash2 = Opal.hash2;

  Opal.add_stubs(['$split', '$[]']);
  
  (function($base, $parent_nesting) {
    var $RbConfig, self = $RbConfig = $module($base, 'RbConfig');

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), versions = nil;

    
    versions = Opal.const_get_relative($nesting, 'RUBY_VERSION').$split(".");
    Opal.const_set($nesting[0], 'CONFIG', $hash2(["ruby_version", "MAJOR", "MINOR", "TEENY", "RUBY", "RUBY_INSTALL_NAME", "RUBY_SO_NAME", "target_os", "host_os", "PATH_SEPARATOR"], {"ruby_version": Opal.const_get_relative($nesting, 'RUBY_VERSION'), "MAJOR": versions['$[]'](0), "MINOR": versions['$[]'](1), "TEENY": versions['$[]'](2), "RUBY": Opal.const_get_relative($nesting, 'RUBY_ENGINE'), "RUBY_INSTALL_NAME": Opal.const_get_relative($nesting, 'RUBY_ENGINE'), "RUBY_SO_NAME": Opal.const_get_relative($nesting, 'RUBY_ENGINE'), "target_os": "ECMA-262", "host_os": "ECMA-262", "PATH_SEPARATOR": ":"}));
  })($nesting[0], $nesting);
  return Opal.const_set($nesting[0], 'RUBY_EXE', "bundle exec exe/opal");
};
