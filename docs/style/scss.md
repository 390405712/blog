# SCSS使用方法
```scss
  /* 当变量使用*/
$blue: #1875e7;
div {
  color: blue;
}

$side: left;
.rounded {
  border-#{side}-radius: 5px;
}

/*计算功能*/
$var: 4;
body {
  margin: (14px/2);
  top: 50px+100px;
  right: $var * 10%;
}

/*嵌套*/
div {
  hi {
    color: $blue;
  }
}

/*属性嵌套*/
p {
  border: {
    color: $blue;
    width: $var;
  }
}

/*继承*/
.class1 {
  border: 1px solid gainsboro;
}

.class2 {
  @extend .class1;
  font-size: 18px;
}

/* mixin 可应用于写兼容*/
@mixin rounded-corners($argus) {
  -moz-border-radius: 1px * $argus !important;
  -webkit-border-radius: 1px * $argus !important;
  border-radius: 1px * $argus !important;
}

.no-rounded {
  @include rounded-corners(0)
}

/* if 条件语句*/
p {
  @if 1+1==2 {
    background-color: #00BCD4
  } @else {
    background-color: rebeccapurple;
  }
}

/* 遍历的用法*/
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid hotpink;
  }
}

$i: 6;
@while $i>0 {
  .item-#{$i} {
    width: 2em * $i;
    $i: $i-2;
  }
}

@each $member in a, b, c, d {
  .#{$member} {
    background-image: url("/img/img#{$member}.jpg");
  }
}

$m-white: white;
$m-black: black;
$m-green: green;
$m-red: red;

@each $c-name, $color in (c-white, $m-white),
        (c-black, $m-black),
        (c-red, $m-red),
        (c-green, $m-green), {
  .#{$c-name} {
    color: $color;
  }
}
//使用：class=".c-black"

/* 自定义函数*/
@function double($n){
  @return $n*2
}
#sidebar{
  width: double(5px);
}
```

- 有些Sass 之类的预处理器无法正确解析 >>>。可以使用 /deep/ 操作符( >>> 的别名)

```html
<style scoped>
  外层 >>> 第三方组件 {
      样式
  }

  /deep/  第三方组件 {
      样式
  }
</style>
```
