/* Generated by Opal 0.11.1 */
Opal.modules["nashorn/io"] = function(Opal) {
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $send = Opal.send, $gvars = Opal.gvars, $writer = nil;
  if ($gvars.stdout == null) $gvars.stdout = nil;
  if ($gvars.stderr == null) $gvars.stderr = nil;

  Opal.add_stubs(['$write_proc=', '$-']);
  
  
  $writer = [function(s){print(s)}];
  $send($gvars.stdout, 'write_proc=', Opal.to_a($writer));
  $writer[$rb_minus($writer["length"], 1)];;
  
  $writer = [function(s){print(s)}];
  $send($gvars.stderr, 'write_proc=', Opal.to_a($writer));
  return $writer[$rb_minus($writer["length"], 1)];;
};

/* Generated by Opal 0.11.1 */
Opal.modules["nashorn/file"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;

  return (function($base, $super, $parent_nesting) {
    function $File(){};
    var self = $File = $klass($base, $super, 'File', $File);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_File_read_1, TMP_File_file$q_2, TMP_File_readable$q_3;

    
    Opal.defs(self, '$read', TMP_File_read_1 = function $$read(path) {
      var self = this;

      
        var Paths = Java.type('java.nio.file.Paths');
        var Files = Java.type('java.nio.file.Files');
        var lines = Files.readAllLines(Paths.get(path), Java.type('java.nio.charset.StandardCharsets').UTF_8);
        var data = [];
        lines.forEach(function(line) { data.push(line); });
        return data.join("\n");
      
    }, TMP_File_read_1.$$arity = 1);
    Opal.defs(self, '$file?', TMP_File_file$q_2 = function(path) {
      var self = this;

      
      var Files = Java.type('java.nio.file.Files');
      return Files.exists(path) && Files.isRegularFile(path);
    
    }, TMP_File_file$q_2.$$arity = 1);
    return Opal.defs(self, '$readable?', TMP_File_readable$q_3 = function(path) {
      var self = this;

      
      var Files = Java.type('java.nio.file.Files');
      return Files.exists(path) && Files.isReadable(path);
    
    }, TMP_File_readable$q_3.$$arity = 1);
  })($nesting[0], null, $nesting)
};

/* Generated by Opal 0.11.1 */
Opal.modules["nashorn"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;

  Opal.add_stubs(['$require']);
  
  (function($base, $parent_nesting) {
    var $Nashorn, self = $Nashorn = $module($base, 'Nashorn');

    var def = self.$$proto, $nesting = [self].concat($parent_nesting);

    nil
  })($nesting[0], $nesting);
  self.$require("nashorn/io");
  return self.$require("nashorn/file");
};
