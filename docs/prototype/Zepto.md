# Zepto
## 简单使用
```html
<p>tag p 1</p>
<p>tag p 2</p>
<p>tag p 3</p>
<div id="div1">
  <p>tap p in div</p>
</div>

<script type="text/javascript" src="./zepto.js"></script>
<script type="text/javascript">
  var $p = $('p')
  $p.css('color','red');
  console.log($p.html())
  
  var $div1 = $('#div1')
  $div1.css('color','blue');
  console.log($div1.html());
</script>
```
## 如何使用原型
```js
//zepto.js
(function(window) {
  var zepto = {}
  
  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++){
      this[i] = dom[i]
    }
    this.length = len;
    this.selector = selector || ''
  }
  
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }
  
  zepto.init = function(selector) {
    var slice = Array.prototype.slice()
    var dom = slice.call(document.querySelectorAll(selector))
    return zepto.Z(dom, selector)
  }
  
  var $ = function(selector) {
      return zepto.init(selector)
  }
  
  $.fn = {
    constructor : zepto.Z,
    css: function(key, value) {
      alert('css')
    },
    html: function(value) {
      return 'html'
    }
  }
  
  zepto.Z.prototype = Z.prototype = $.fn;
  window.$ = $;
})(window)
```


