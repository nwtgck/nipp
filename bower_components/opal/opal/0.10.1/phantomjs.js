/* Generated by Opal 0.10.1 */
Opal.modules["phantomjs"] = function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var $a, $b, self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$write_proc=', '$tty=', '$+', '$[]=']);
  Opal.exit = function(status) { callPhantom(['exit', status]); };
  (($a = [function(str){callPhantom(['stdout', str])}]), $b = $scope.get('STDOUT'), $b['$write_proc='].apply($b, $a), $a[$a.length-1]);
  (($a = [function(str){callPhantom(['stderr', str])}]), $b = $scope.get('STDERR'), $b['$write_proc='].apply($b, $a), $a[$a.length-1]);
  (($a = [true]), $b = $scope.get('STDOUT'), $b['$tty='].apply($b, $a), $a[$a.length-1]);
  (($a = [true]), $b = $scope.get('STDERR'), $b['$tty='].apply($b, $a), $a[$a.length-1]);
  Opal.cdecl($scope, 'ARGV', $rb_plus($scope.get('ARGV'), JSON.parse(callPhantom(['argv']))));
  
  var env = JSON.parse(callPhantom(['env']));

  Object.keys(env).forEach(function(key) {
    $scope.get('ENV')['$[]='](key, env[key])
  });

};
