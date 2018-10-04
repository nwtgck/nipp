/* Generated by Opal 0.10.3 */
Opal.modules["base64"] = function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;

  Opal.add_stubs(['$raise']);
  return (function($base) {
    var $Base64, self = $Base64 = $module($base, 'Base64');

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6;

    
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var encode, decode;

    // encoder
    // [https://gist.github.com/999166] by [https://github.com/nignag]
    encode = Opal.global.btoa || function (input) {
      var str = String(input);
      /* jshint ignore:start */
      for (
        // initialize result and counter
        var block, charCode, idx = 0, map = chars, output = '';
        // if the next str index does not exist:
        //   change the mapping table to "="
        //   check if d has no fractional digits
        str.charAt(idx | 0) || (map = '=', idx % 1);
        // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)
      ) {
        charCode = str.charCodeAt(idx += 3/4);
        if (charCode > 0xFF) {
          self.$raise($scope.get('ArgumentError'), "invalid character (failed: The string to be encoded contains characters outside of the Latin1 range.)");
        }
        block = block << 8 | charCode;
      }
      return output;
      /* jshint ignore:end */
    };

    // decoder
    // [https://gist.github.com/1020396] by [https://github.com/atk]
    decode = Opal.global.atob || function (input) {
      var str = String(input).replace(/=+$/, '');
      if (str.length % 4 == 1) {
        self.$raise($scope.get('ArgumentError'), "invalid base64 (failed: The string to be decoded is not correctly encoded.)");
      }
      /* jshint ignore:start */
      for (
        // initialize result and counters
        var bc = 0, bs, buffer, idx = 0, output = '';
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
          // and if not first of each 4 characters,
          // convert the first 8 bits to one ascii character
          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
      ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
      }
      return output;
      /* jshint ignore:end */
    };
  

    Opal.defs(self, '$decode64', TMP_1 = function $$decode64(string) {
      var self = this;

      return decode(string.replace(/\r?\n/g, ''));
    }, TMP_1.$$arity = 1);

    Opal.defs(self, '$encode64', TMP_2 = function $$encode64(string) {
      var self = this;

      return encode(string).replace(/(.{60})/g, "$1\n").replace(/([^\n])$/g, "$1\n");
    }, TMP_2.$$arity = 1);

    Opal.defs(self, '$strict_decode64', TMP_3 = function $$strict_decode64(string) {
      var self = this;

      return decode(string);
    }, TMP_3.$$arity = 1);

    Opal.defs(self, '$strict_encode64', TMP_4 = function $$strict_encode64(string) {
      var self = this;

      return encode(string);
    }, TMP_4.$$arity = 1);

    Opal.defs(self, '$urlsafe_decode64', TMP_5 = function $$urlsafe_decode64(string) {
      var self = this;

      return decode(string.replace(/\-/g, '+').replace(/_/g, '/'));
    }, TMP_5.$$arity = 1);

    Opal.defs(self, '$urlsafe_encode64', TMP_6 = function $$urlsafe_encode64(string) {
      var self = this;

      return encode(string).replace(/\+/g, '-').replace(/\//g, '_');
    }, TMP_6.$$arity = 1);
  })($scope.base)
};
