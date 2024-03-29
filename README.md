# Nipp
<img src="doc_assets/nipp-logo.svg" width="100"> 

[![main](https://github.com/nwtgck/nipp/workflows/main/badge.svg)](https://github.com/nwtgck/nipp/actions?query=workflow%3Amain) [![CircleCI](https://circleci.com/gh/nwtgck/nipp.svg?style=shield)](https://circleci.com/gh/nwtgck/nipp)  
<a href="https://nipp.nwtgck.org"><img src="https://user-images.githubusercontent.com/9122190/28998409-c5bf7362-7a00-11e7-9b63-db56694522e7.png" alt="Launch now as Web App" height="48"></a>

Programmable portable App hosted on URL <https://nipp.nwtgck.org>  
Nipp is inspired by [itty.bitty](https://github.com/alcor/itty-bitty).

![Nipp Word Count](doc_assets/nipp_word_count.gif)

## Purpose
The main purpose is to **keep code safe in URL**. Even if the service is shutdown, the code stays alive in URL. You don't lose time and efforts to write a code. You can save a code as a bookmark easily.

## Features
* 🎒 **Portable**
  - Application is hosted only on URL!
* ⚡ **Real-time response**
  - All computation is done on client!
* ☁️ **No-server side execution**
  - Nipp site is static hosted.
  - Your code are not sent to the web server
  - [PWA] - Progressive Web Apps

## Quick Start

Try on <https://nipp.nwtgck.org/#Simple_Word_Count//K9YrLsjJLNFQV1DX1CvOrEoFAA==>, which counts the number of words!  
Then, you can create your own apps!

## Example Apps
* Text Length: <https://nipp.nwtgck.org/#Text_Length//K9YrzqxKBQA=>
* Word Count: <https://nipp.nwtgck.org/#Simple_Word_Count//K9YrLsjJLNFQV1DX1CvOrEoFAA==>
* Tetris: [https://nipp.nwtgck.org/#Tetris/es2017/bU/bSuNQF...]
* Summer Wars World Clock: [https://nipp.nwtgck.org/#/es2017/1Y9va1vJFcZfR59...]
* 2048 Game: [https://nipp.nwtgck.org/#/es2017,lzma/XQAAAAKyNg...]

(NOTE: The original source of World Clock is located at <https://shimz.me/blog/d3-js/4360>. Thank you very much, SHIMIZU-san!)  
(NOTE: The original source of 2048 Game is located at [gabrielecirulli/2048](https://github.com/gabrielecirulli/2048). Thank you very much, the creators!)

## Ruby

Default language of Nipp is [Ruby] because [Ruby] makes us comfortable to write program!  
Nipp is highly powered by [Opal], which is a transpiler to JavaScript. Thank you very much, [Opal] project!

[Ruby]: https://www.ruby-lang.org
[Opal]: https://opalrb.com

## Also JavaScript Not Only Ruby

Nipp is not only for Ruby. JavaScript is also available. Here is Tetris on Nipp!
![Nipp Tetris](doc_assets/nipp_tetris.gif)

Try on [https://nipp.nwtgck.org/#Tetris/es2017/bU/bSuNQF...]
The Tetris program is from an Japanese article - 
[Commentary of Only 565 Bytes Tetris Programming](https://zapanet.info/blog/item/1125).

## URL Structure

Here is a structure of Nipp URL.  
nwtgck.github.io/nipp/#`<Page Title>`/`<Options>`/`<Compressed Code>`

* `<Page Title>` is title of your app
* `<Options>` can be `es2017`, `lzma`, `es2017,lzma`, `lzma,es2017` or etc.
* `<Compressed Code>` is code compressed by deflate (no header, no checksum) or LZAM for now and encode it by Base64

Note that `<Page Title>`, `<Options>` and <`Compressed Code`> are under URL fragment `#`. This means your code is not send to Nipp web server!


### Options

- `es2017`: Use ES2017 (default: Ruby(Opal))
- `func_es2017`: Use ES2017 but evaluated by `(new Function(...))()` not `eval()`, so output is always empty but faster
- `lzma`: Compress code by using LZMA (default: deflate)
- `click_run`: Click to run not real-time evaluation
- `promise_wait`: Wait for Promise evaluation in output


## [PWA] - Progressive Web Apps

Nipp runs even offline! Note that Nipp is available in flight mode ✈️.

![Nipp PWA](doc_assets/nipp_pwa.gif)


## Examples of `promise_wait`

* Promise Example: [https://nipp.nwtgck.org/#Promise_Example/es2017,...]
* Get body by jQuery: [https://nipp.nwtgck.org/#Get_body_by_jQuery/es20...]
  - You can load any JavaScript from CDN

## Logo

<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


[PWA]: https://developers.google.com/web/progressive-web-apps


<!-- Tetris -->
[https://nipp.nwtgck.org/#Tetris/es2017/bU/bSuNQF...]: https://nipp.nwtgck.org/#Tetris/es2017/bU/bSuNQFH3vV6wGRnLMTqet9RqjpHVgoCMU9KE25KE2pzQak1JPFbGCfzAfMZ82zH/MOinWESewc/ZtXfbDeIESIdJysrzThWlMFnps9Ldc28p15o4SRIKuYCQYCgYCI5gJUkFPMBFkgqlgLsgFt4KLoPaYFWn52OiTtxnUatNlMTFZWeDKVXiugd+0XMDtcR6n/PXhY+cgIZtFkJFPJ0Dm+9hGP6jmrR2ccu6FqI/iGTzMGWmCIzb9TdPtxVlC9JzAyKI6u8zOx2bWWJTLInXn+IpIqURxJUSX28G7obrBymqgQ626S2J0FLa24M6scKqo1iWMd08r22FltUmrOLaOp3ZtFEfWHiWGsRWxvijkeYl11lrrZVO4mmVdKzxXnbfulB66/zY39nLut9sHVPP9QGF9sT3B8t6+c38AWb/xh/bbF/v7Ar/dFOwJWjY/FOywSmJDkOcZfMF+Ah8dAbdaAsNiD6fwIxzBb32iTQLk9MaTQ+yqT2N7Xk7SSCGHH6LKsY36KM6T4NO6zu/1f51Xhw3g8WrPE9zAUrGKAvj+DU6YKIzim4QDPjQdJRuil002qzC192bFmxF0wXCcABmO0e40AwzjbE3GZxXC87LKOqdYcesE7faBwrq5WsG9sNTO8fXixFGCqqooTuH8+fnLwRGc36+vzvrmspEVhV58vzz/UWl7GAildhNLda/NZXany6VxrwSHhzxmoGovtbScLO90YRrXZfrU4FZkzCK7XhrtOmXR109n5WPhCJx+qB/s3q1+6pWptn4+YsfzuS7S3izLU7fkdEgT8cj+uvxFjFY7SQQzZprRZxjGgNEUXLkq+As=

<!-- Word Clock -->
[https://nipp.nwtgck.org/#/es2017/1Y9va1vJFcZfR59...]: https://nipp.nwtgck.org/#/es2017/1Y9va1vJFcZfR59imGXZuUS+fyTb0R870CbOeiGB0A2YEgIZzcy9d+SrmcvMuZK9xi8iQwjsgtllWygJhaZQ+iY00L5omqZf5uJsPkbnSollWZJ3+7LDRZo553ee8zxxoRhIrVDfksJkdaRVpin30FENIaaVBWTRNuKaFQOhwGdGUBA7maheBFtmZA7Y6zra+tYwxzqZ6XMq5SrTS1U810kF5T7Nc6H4rVRmnFincVyr1eYJqZQwuw/u3XUqj2tbICETN/e0yTi6lWm2vxVMS7UtC4fVfwoDF6Kn+aFLcG1ATSJVB4X5Qbd2LaecS5VMn9dq10aSQ9pBURh+7rqpkEkKn57HNTtMKomPUHtzqvGJ2ggn7+PaVvBx8+Nurda3BKcAue0EAeOqb32W6YLHGTXCZ3oQ0D49CDLZswFvBk1/w2+6i9+3uI7iQjGQWhHvqIbQ/6A00AOhwIkEDT8KneK0sDaSkK5lmtFMWH8g1bI1CJFZAU0r1cGFFciCkQxw11XPG0Nq0Egqrkd7kqeAtlF7M+wuae8KmUz6G2H4UWGOssPENXnTtyITDAh2Bewt7MqN7ouJv3Y45ROhfW0g1YmheSoZ8c4HquPbKjC56DFA65cYo4GCIA/DOqq+R5faYKiy2YSY12nU59O5yuVZlsn8VypxFtrhVXGi1v9bHuf4U6C5TLHRCu5TSGd5cvcinj9LS2bX9lRlNt+jbP+Xj19wMT1upm8dglOA3HaCIJEW/ERCWvQKKwxz7oQCn+lBYFM5kN8UQfsGizY24xtxO2re2Gi5W2s9MHQUrPdEFG40m+ubMW21+Pp6izUa7ZCttzdb7c3mOmtFYaMX0uAuVXxArRW2clwZwHUUF2pq92PJQ0dTp+dmP2W2QBPhAtth4tM8F4oT7O6dBM+Hq04QlOM35cnT8uTf5fif5fiHs9O/N5r++tm//nI2/k/55Pty/O3cwETcpwCGYDBU2VibgbOHjQYKglTD7oWuo5FUXI/2JE8BBajhKg670NkVMpm1vKXmzl68Pnv3knz486m3ELNH2f49mldBp54uRM0ppHh+pDpT30cL9epgjjsoLhQDqRXx0HKqOkZAYdRk/323hyRC961W3tKB4/rybbHMsjWdUybh0C2OrsBcG3+2c3unfSfCKzALRu+LClRaiSXUsdd1tblyEJy9eH327iX58Ke/znsfUoNioxXcoznaRhZoInya50Jxgu0w6eQuNl7M61MAQ46WW+TOXVwoBlIr4qHlVHWMgMKoqYH7bhFJhO5brbylE8f15etimWVrOqdMwqHbHF2BuTb+7M7tVnT713gFZsHofVGBSiuxhDr2uq42/WYnCM5evD5797Ic/3D2/I8f3r4sn/yufPK8HH87hw2pQUXOKQi0jeJCMZBaEQ8dLaypSOmgsLvQMgIKo64er041LtF1FPqN7lIgN7ovJhrt0DcanC3yUNZR6L5H3s/NRK0VQ0vnYqMV3KeQOlO86SdC+7l7Ec+fKZKLhlbs71G2/8tlnMfVliqpezT3KYAhmOP6uThxun2rlbfCxCTM/Oh5vvnZhfHj2uqXFfCVAmGGNCNFzikI4tVRFJ5nmKOH1KABNYlUd0UMaBuNpOJ6tCd5CihAN7or6Ac6P4d3hUwmdBNdv1yKGosKIA7gt266tcoQyzTb/9Lootphh4lP81woTnCCvTm4Oj4FMASDocrG2gxwHU0fGQVBsLP0cBawPrP/yHWwh73uZQdBUJ48LcevyvGb8uTZh5Pv3v/hb+9PT3/68e1yo78RDJzPmelzu8Z1Vjo+WqhXB48khxR3EL4Rfo7ry5lUyCQFB42k4nq0J3kKKEBRuIKPZZZVkju3d9p3InwFtaZzyiQcOjr0GwvccRVmrhoE5cnTcvyqHL8pT569Pz396ce3c8CQGsQyzfYfiANA29P7l0YXuU/zXChOMLgO9haW+RTAkKPlZg+qPFG4KksVYCQV16M9yVNAAYqiVbG1gjUrvxFuJIrCq6iRkEkK1eaezji+Co3pQGaVC0yNpNkqNpNKrKWfZCN/YxUnAIRZszllUiUOXQWOtOEXsQXq2Ou62lw5CMqTp+X4VTl+U548e//8H+9//3oOsAK+Um7/kGYkLhQDqRXx0NGCOMs0238gDsAH90MGeiAUEM+PtRlQIF/s7nYGg461na+//sKbGLlgrI4irzZvs/onk5t7O9dVtRYEW5YZmQOyhm1jfHMrmL5vXm6lALntBAHjqm99Z67gcUaN8JkeBLRPD4JM9mwwten3bdDwo9BvfiysjSSkay4RzYT1B1I54uKyGtesmEz2ND/0pVLC7D64dxdto8e1LTtMKtb91h5PTKMhNci65vkYM4KC2MlE9SJ4qotdRAfbS3qu9HjSmF9K81wofiuVGSfWTf4X

<!-- 2048 Game -->
[https://nipp.nwtgck.org/#/es2017,lzma/XQAAAAKyNg...]: https://nipp.nwtgck.org/#/es2017,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 

<!-- Promise Example -->
[https://nipp.nwtgck.org/#Promise_Example/es2017,...]: https://nipp.nwtgck.org/#Promise_Example/es2017,promise_wait/y0stVwgoys/NLE7V0ChKLc7PKUvVUShKzUpNLtG0tavmUgCC4tSSkMzc1PzSEg0NuCAIQDVoKGWk5uTk6yiU5xflpCikAc2DGaqopGkNVl6ro2BkYGAA5NVqWgMA

<!-- Get body by jQuery -->
[https://nipp.nwtgck.org/#Get_body_by_jQuery/es20...]: https://nipp.nwtgck.org/#Get_body_by_jQuery/es2017,promise_wait/ZU/NSsQwEL73KYbiIQVNkL0p3YuIID2oxQeIySxNSZOaTF2K9N1N2roezCHJfH8zIwQ0Xmp4buEU/ADvb01xmpwi4x3YxLQqmJFYDKqC7wLSCUhTcODwDC/JYiIyFjB6+4XXiexRUQX1cVfno7yLBHFNghq0V9OAjrgKKAkfLeaKlZugrO4vxg3hqXmypfsf412eMZH7AH+CS5MOpeZyHNHph85YzTbr3mVJ71IUTMbZKWBVfdzGFgKanNy/ThjmFZJnaQhyv3ZNYGVHNMY7IZTXyPvPrOTKD2L73hz4gd/yaM3AB+N4H39XS+FPSPDh9QwdDXYFlXeR1jKtc8XKzJYVzwDbfQFpCm6zLFVGfwA=
