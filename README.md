# imageup <img src="https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png" align="right" height="165">
Bounce Up Image Sizes Based on Screen Width

## Use
### Example 1
Mobile first image which doubles as mirage style image until hi-res image is loaded. `noscript` safe and no changes are made if the screen width is less than the first breakpoint.

```html
<img src='img/320/sample.jpg'>
<script src="imageup.js"></script>
<script>
    ImageUp({
        init: 1,        // truthy to set these values as the default configuration
        debug: 1,       // truthy to log element changes, in the form: element#id.attribute value
        tag:  'img',    // img is the default if tag is undefined
        attr: 'src',    // src is the default if attr is undefined
        ref:  '/320/',  // {src} is the default if ref undefined
        640:  '/640/',  // break point and associated value to replace the ref '{src}' in the tag.attr (ex: img.src)
        1280: '/1280/'  // example medium screen
    }
    ImageUp({ tag: 'body',    attr: 'defaultBackgroundImg' }); // apply to special page background image using the other
    ImageUp({ tag: 'article', attr: 'customBackgroundImg'  }); // apply to special article background images
</script>
```

#### Example 2
Don't double loading images. Note every breekpoint is needed

```html
<img data-src='img/{src}/sample.jpg'>
<script src="imageup.js"></script>
<script>
  ImageUp({ 1: 'small', 640: 'medium', 1280, 'large' }); // use words instead of numbers in the path
</script>
```

#### Example 3
Detect what image size was applied

```html
<script>
  var size = ImageUp({ 1: 'small', 640: 'medium', 1280, 'large' });
  console.log(size) // undefined if no match, 1, 640, 1280 depending upon the device screen width
</script>
```

## How it works
- If the screen width falls within a break point:
  - For each page element that is of the `tag` type:
    - If there is a matching `attr` tag or `data-` `attr` tag:
      - Replace the `ref` value in the element attribute with the associated break point string

## License: MIT
