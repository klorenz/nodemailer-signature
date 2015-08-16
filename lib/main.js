// Generated by CoffeeScript 1.9.1
(function() {
  var SignatureManager, signature;

  signature = function(options) {
    var signatureManager;
    signatureManager = new SignatureManager(options);
    return function(options, done) {
      return signatureManager.compile(options, done);
    };
  };

  SignatureManager = (function() {
    function SignatureManager(signature) {
      if (typeof signature === "object") {
        this.signature = signature.signature, this.signatureFile = signature.signatureFile, this.applyTo = signature.applyTo, this.separator = signature.separator;
      } else {
        this.signature = signature;
        this.signatureFile = null;
        if (fs.existsSync(this.signature)) {
          this.signatureFile = this.signature;
          this.signature = null;
        }
      }
      if (this.applyTo == null) {
        this.applyTo = {
          markdown: function(text, signature) {
            return text + this.separator + signature;
          },
          html: function(text, signature) {
            return text + this.separator + signature;
          },
          text: function(text, signature) {
            return text + this.separator + signature;
          }
        };
      }
    }

    SignatureManager.prototype.compile = function(options, done) {
      var key, ref, results, results1, value;
      if (options.signature) {
        signature = options.signature;
      } else {
        if (this.signatureFile) {
          signature = fs.readSync(this.signatureFile);
        } else {
          signature = this.signature;
        }
      }
      if (typeof signature === "object") {
        results = [];
        for (key in signature) {
          value = signature[key];
          if (!(key in options)) {
            continue;
          }
          if (value instanceof Function) {
            results.push(options[key] = value.call(this, options[key]));
          } else {
            results.push(options[key] += this.separator + value);
          }
        }
        return results;
      } else {
        ref = this.applyTo;
        results1 = [];
        for (key in ref) {
          value = ref[key];
          if (!(key in options)) {
            continue;
          }
          results1.push(options[key] = this.applyTo(options[key], signature));
        }
        return results1;
      }
    };

    return SignatureManager;

  })();

  module.exports = {
    signature: signature,
    SignatureManager: SignatureManager
  };

}).call(this);