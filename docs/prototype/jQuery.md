# jQuery
## 简单使用
```html
<p>tag p 1</p>
<p>tag p 2</p>
<p>tag p 3</p>
<div id="div1">
  <p>tap p in div</p>
</div>

<script type="text/javascript" src="./jquery.js"></script>
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
//jquery.js
(function(window) {
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector)
  }
  
  var init = jQuery.fn.init = function(selector) {
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector));
    
    var i,len = dom ? dom.length : 0;
    for(i = 0; i < len; i++){
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || ''
  }
  
  jQuery.fn = jQuery.prototype = {
    constructor:jQuery,
    css: function(key, value) {
      alert('css')
    },
    html: function(value) {
      return 'html'
    }
  }
  
  init.prototype = jQuery.fn;
  window.$ = jQuery()
})(window)
```
