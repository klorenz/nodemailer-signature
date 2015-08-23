fs = require 'fs'

signature = (options) ->
  signatureManager = new SignatureManager options
  (options, done) ->
    signatureManager.compile options, done

class SignatureManager
  constructor: (signature) ->
    if typeof signature is "object"
      {@signature, @signatureFile, @applyTo, @separator} = signature
    else
      @signature = signature
      @signatureFile = null

      if fs.existsSync @signature
        @signatureFile = @signature
        @signature = null

    @applyTo ?=
      markdown: (text, signature) ->
        text + @separator + signature

      html: (text, signature) ->
        text + @separator + signature

      text: (text, signature) ->
        text + @separator + signature

  compile: (mail, done) ->
    options = mail.data
    if options.signature
      signature = options.signature

    else
      if @signatureFile
        signature = fs.readSync @signatureFile
      else
        signature = @signature

    if typeof signature is "object"
      for key, value of signature
        continue if key not of options

        if value instanceof Function
          options[key] = value.call this, options[key]

        else
          options[key] += @separator + value

    else
      for key, value of @applyTo
        continue if key not of options
        options[key] = @applyTo[key] options[key], signature

    done()

module.exports = {signature, SignatureManager}
