# Opal CDN distribution

## URL scheme

    //cdn.opalrb.com/opal/<VERSION>/opal.js
    //cdn.opalrb.com/opal/<VERSION>/opal.min.js
    //cdn.opalrb.com/opal/<VERSION>/opal.min.js.gz

Where `<VERSION>` is the desired version number or `current`, examples:

    //cdn.opalrb.com/opal/0.10.1/opal.js
    //cdn.opalrb.com/opal/0.9.4/date.min.js
    //cdn.opalrb.com/opal/current/base64.min.js.gz


## Embedding in your HTML

```html
<!doctype html>
<html>
<head>
  <script src="http://cdn.opalrb.com/opal/current/opal.min.js"></script>
  <script src="http://cdn.opalrb.com/opal/current/native.min.js"></script>
  <script src="http://cdn.opalrb.com/opal/current/opal-parser.min.js"></script>
  <script type="text/javascript">Opal.load('opal-parser')</script>
  <script type="text/javascript">Opal.load('native')</script>
</head>
<body>
  <script type="text/ruby">
  #<![CDATA[
    puts 'Hello from the console!'
    $$[:document].write %{
<!doctype html>
<html>
<head>
  <style>body{font-family:sans-serif;font-weight:100;}</style>
</head>
<body>
<h1 id="opal_cdn_distribution">Opal CDN distribution</h1>

<h2 id="url_scheme">URL scheme</h2>

<pre><code>//cdn.opalrb.com/opal/&lt;VERSION&gt;/opal.js
//cdn.opalrb.com/opal/&lt;VERSION&gt;/opal.min.js
//cdn.opalrb.com/opal/&lt;VERSION&gt;/opal.min.js.gz
</code></pre>

<p>Where <code>&lt;VERSION&gt;</code> is the desired version number or <code>current</code>, examples:</p>

<pre><code>//cdn.opalrb.com/opal/0.10.1/opal.js
//cdn.opalrb.com/opal/0.9.4/date.min.js
//cdn.opalrb.com/opal/current/base64.min.js.gz
</code></pre>

<h2 id="license">License</h2>

<p>See <a href="http://example.com/">http://opalrb.com</a>.</p>
</body>
</html>
    }
  #]]>
  </script>
</body>
</html>
```

## Updating

### Opal

From the `opal` dir, assuming there's a checkout of the `gh-pages` branch of `opal-cdn` in the `cdn/` folder:

    $ rake dist DIR=cdn/opal/0.7.0.dev
    $ rake dist DIR=cdn/opal/master

### External libraries

    $ opal-build -ropal/browser browser     > cdn/external/0.6.2/opal-browser-0.2.0.beta1.js
    $ opal-build -ropal-jquery  opal-jquery > cdn/external/0.6.2/opal-jquery-0.2.0.js


## License

See [http://opalrb.com](http://opalrb.com).

