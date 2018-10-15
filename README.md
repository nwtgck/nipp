# Nipp
<img src="images/nipp-logo.svg" width="100">

Mini Application Hosted on URL <https://nipp.cf/>  
Nipp is inspired by [itty.bitty](https://github.com/alcor/itty-bitty).

![Nipp Word Count](demo_images/nipp_word_count.gif)

## Features
* 🎒 **Portable**
  - Application is hosted only on URL!
* ⚡ **Real-time response**
  - All computation is done on client!
* ☁️ **No-server side execution**
  - Nipp site is static hosted.
  - [nipp.cf](https://nipp.cf) is just custom domain of [nwtgck.github.io/nipp](http://nwtgck.github.io/nipp).
  - Your code are not sent to the web server
  - [PWA] - Progressive Web Apps

## Quick Start

Try on <https://nipp.cf/#Simple_Word_Count//K9YrLsjJLNFQV1DX1CvOrEoFAA==>, which counts the number of words!  
Then, you can create your own apps!

## Example Apps
* Text Length: <https://nipp.cf/#Text_Length//K9YrzqxKBQA=>
* Word Count: <https://nipp.cf/#Simple_Word_Count//K9YrLsjJLNFQV1DX1CvOrEoFAA==>
* Tetris: [https://nipp.cf/#Tetris/es2017/bU9bTttAF...]
* Summer Wars World Clock: [https://nipp.cf/#/es2017/1Y9va1vJFcZfR59...]

(NOTE: The original source of World Clock is located at <https://shimz.me/blog/d3-js/4360>. Thank you very much, SHIMIZU-san!)

## Ruby

Default language of Nipp is [Ruby] because [Ruby] makes us comfortable to write program!  
Nipp is highly powered by [Opal], which is a transpiler to JavaScript. Thank you very much, [Opal] project!

[Ruby]: https://www.ruby-lang.org
[Opal]: https://opalrb.com

## Also JavaScript Not Only Ruby

Nipp is not only for Ruby. JavaScript is also available. Here is Tetris on Nipp!
![Nipp Tetris](demo_images/nipp_tetris.gif)

Try on [https://nipp.cf/#Tetris/es2017/bU9bTttAF...]
The Tetris program is from an Japanese article - 
[Commentary of Only 565 Bytes Tetris Programming](https://zapanet.info/blog/item/1125).

## URL Structure

Here is a structure of Nipp URL.  
nipp.cf/#`<Page Title>`/`<Options>`/`<Compressed Code>`

* `<Page Title>` is title of your app
* `<Options>` can be `es2017`, `lzma`, `es2017,lzma`, `lzma,es2017` or etc.
* `<Compressed Code>` is code compressed by deflate (no header, no checksum) or LZAM for now and encode it by Base64

Note that `<Page Title>`, `<Options>` and <`Compressed Code`> are under URL fragment `#`. This means your code is not send to Nipp web server!


## [PWA] - Progressive Web Apps

Nipp runs even offline! Note that Nipp is available in flight mode ✈️.

![Nipp PWA](demo_images/nipp_pwa.gif)

## Logo

<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


[PWA]: https://developers.google.com/web/progressive-web-apps


<!-- Tetris -->
[https://nipp.cf/#Tetris/es2017/bU9bTttAF...]: https://nipp.cf/#Tetris/es2017/bU9bTttAFP3PKk4sFXnwTJqE8DQGOWmlSilSJPiAWPMR4oliMHZkJlSIILGDLqJLq7qPnnFEKKKWrue+zuM+TCqUiJCW0+WdKWxrWpmJNV9z4yrfW3gibDRmy2Jqs7LAlS/w1AC/WVnBHxCZpPwNobBzoCWmLNoSGZ9eiEwpbGMY1vPODk45DyI0x8kcARaMVOOITbVp+oMk00QvCIwdqrfL7Gxi562qXBapv8BnxEJowZUIfW6Hb4aaFiungR61mj6J0RPY2oI/d8KpoFqfsIHErLYd1VbbtIpj53jm1sZJ7OxR4jJxIs4XhYJAO2edtV42g29YNo3AU9157c7oof9vc2Mv5363e0A1pUKB9cXuBMd7+8b9DuT8Ju/ar1+i9iVUty2xJ9Fx+aHEDiudWIKCwOIT9jUUehLc6khYFns4hYpxBNX5QKtD5PTGkyPsig9jd15O0lggh4pQ59hGc5zkOvywbvJ781/n9WEjBLw6CCRu4KhYxSGUusEJE4FxcqM54EPTsd4QPW+yeY1pvDVr3oygc4bnhchwjG6vHeIyydZkfFYRgiCrrXOKFbdO0O0eCKybqxX8c0ftHV9XJ56QqKua4hTen5+/PBzB+/3y4q1vLltZUZjq28XZ91o7wEhSalc7qntjL7I7Uy6tfyVxeMhjRqLx3EjL6fLOFLZ1XaaPLW7F1lbZ9dIa3yuLoXn8Uv4oPAlvGJkHt3drHgdlapyf99jJYmGKdDDP8tQvOb2kiWTsfn3+Ykanq7XEnJlhDBmWMWK0Ja58Ef4F

<!-- Word Clock -->
[https://nipp.cf/#/es2017/1Y9va1vJFcZfR59...]: https://nipp.cf/#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
