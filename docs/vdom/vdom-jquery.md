# jquery渲染原理
## 用jQuery实现渲染
```js
var data = [
   {
     name:'张三',
     age:20,
     address:'北京'
   },
   {
     name:'李四',
     age:21,
     address:'上海'
   },
   {
     name:'张三',
     age:22,
     address:'广州'
   }
]

$('#btn').click(function() {
  data[1].age = 30;
  data[2].address = '深圳'
  render(data)
})

function render(data) {
 var $container = $('#container')
  //清空
  $container.html('')
  
  var $table = $('<table>')
  //拼接
  $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'))
  data.forEach(function(item) {
    $table.append($('<tr><td>'+ item.name + '</td><td>' + item.age + '</td><td>' + item.address + '</td></tr>'))
  })
  //最后渲染
  $container.append($table)
}
```
## jquery渲染的缺点
- DOM 操作是“昂贵”的，js 运行效率高
- 尽量减少 DOM 操作，而不是“推倒重来”
- 项目越复杂，影响就越严重
- vdom 即可解决这个问题

```js
var div = document.createElement('div')
var item,result = ''
for(item in div){
  result += ' | ' + item
}
console.log(result);

// | align | title | lang | translate | dir | dataset | hidden | tabIndex | accessKey | 
// draggable | spellcheck | autocapitalize | contentEditable | isContentEditable | inputMode | 
// offsetParent | offsetTop | offsetLeft | offsetWidth | offsetHeight | style | innerText | 
// outerText | oncopy | oncut | onpaste | onabort | onblur | oncancel | oncanplay | oncanplaythrough | 
// onchange | onclick | onclose | oncontextmenu | oncuechange | ondblclick | ondrag | ondragend | 
// ondragenter | ondragleave | ondragover | ondragstart | ondrop | ondurationchange | onemptied | 
// onended | onerror | onfocus | oninput | oninvalid | onkeydown | onkeypress | onkeyup | onload | 
// onloadeddata | onloadedmetadata | onloadstart | onmousedown | onmouseenter | onmouseleave | 
// onmousemove | onmouseout | onmouseover | onmouseup | onmousewheel | onpause | onplay | onplaying | 
// onprogress | onratechange | onreset | onresize | onscroll | onseeked | onseeking | onselect | 
// onstalled | onsubmit | onsuspend | ontimeupdate | ontoggle | onvolumechange | onwaiting | onwheel | 
// onauxclick | ongotpointercapture | onlostpointercapture | onpointerdown | onpointermove | onpointerup | 
// onpointercancel | onpointerover | onpointerout | onpointerenter | onpointerleave | onselectstart | 
// onselectionchange | nonce | click | focus | blur | namespaceURI | prefix | localName | tagName | id | 
// className | classList | slot | attributes | shadowRoot | assignedSlot | innerHTML | outerHTML | 
// scrollTop | scrollLeft | scrollWidth | scrollHeight | clientTop | clientLeft | clientWidth | 
// clientHeight | attributeStyleMap | onbeforecopy | onbeforecut | onbeforepaste | onsearch | 
// previousElementSibling | nextElementSibling | children | firstElementChild | lastElementChild | 
// childElementCount | onfullscreenchange | onfullscreenerror | onwebkitfullscreenchange | 
// onwebkitfullscreenerror | setPointerCapture | releasePointerCapture | hasPointerCapture | 
// hasAttributes | getAttributeNames | getAttribute | getAttributeNS | setAttribute | setAttributeNS | 
// removeAttribute | removeAttributeNS | hasAttribute | hasAttributeNS | toggleAttribute | 
// getAttributeNode | getAttributeNodeNS | setAttributeNode | setAttributeNodeNS | removeAttributeNode | 
// closest | matches | webkitMatchesSelector | attachShadow | getElementsByTagName | getElementsByTagNameNS | getElementsByClassName | 
// insertAdjacentElement | insertAdjacentText | insertAdjacentHTML | requestPointerLock | getClientRects | 
// getBoundingClientRect | scrollIntoView | scroll | scrollTo | scrollBy | scrollIntoViewIfNeeded | 
// animate | computedStyleMap | before | after | replaceWith | remove | prepend | append | querySelector | 
// querySelectorAll | requestFullscreen | webkitRequestFullScreen | webkitRequestFullscreen | part | 
// createShadowRoot | getDestinationInsertionPoints | ELEMENT_NODE | ATTRIBUTE_NODE | TEXT_NODE | 
// CDATA_SECTION_NODE | ENTITY_REFERENCE_NODE | ENTITY_NODE | PROCESSING_INSTRUCTION_NODE | COMMENT_NODE | 
// DOCUMENT_NODE | DOCUMENT_TYPE_NODE | DOCUMENT_FRAGMENT_NODE | NOTATION_NODE | 
// DOCUMENT_POSITION_DISCONNECTED | DOCUMENT_POSITION_PRECEDING | DOCUMENT_POSITION_FOLLOWING | 
// DOCUMENT_POSITION_CONTAINS | DOCUMENT_POSITION_CONTAINED_BY | DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | 
// nodeType | nodeName | baseURI | isConnected | ownerDocument | parentNode | parentElement | childNodes | 
// firstChild | lastChild | previousSibling | nextSibling | nodeValue | textContent | hasChildNodes | 
// getRootNode | normalize | cloneNode | isEqualNode | isSameNode | compareDocumentPosition | contains | 
// lookupPrefix | lookupNamespaceURI | isDefaultNamespace | insertBefore | appendChild | replaceChild | 
// removeChild | addEventListener | removeEventListener | dispatchEvent
```



