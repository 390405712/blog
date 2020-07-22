# VScode插件配置

## 项目包依赖
```json
devDependencies: {
  "babel-eslint": "^10.0.3",
  "eslint": "^5.16.0",
  "eslint-plugin-prettier": "^3.1.1",
  "eslint-plugin-vue": "^5.0.0",
}
```

## IDE插件
- Vetur // Vue语法格式化
- Vue 2 Snippets // Vue语法片段
- ESLint // js语法检查
- Prettier - Code formatter // 代码美化
- HTML Snippets // html语法片段
- JavaScript (ES6) code snippets // es6语法片段
- JavaScript Snippet Pack // es5语法片段
- koroFileHeader // 文件页眉、函数注释模板

## setting.json配置
```json
{
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // 格式化插件的配置
  "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
          // 属性强制折行对齐
          "wrap_attributes": "force-aligned"
      }
  },
  // 保存时eslint自动修复错误
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "html",
    "vue",
  ],
  "fileheader.customMade": {"Author":"作者名","Date":"Do not edit","LastEditors":"修改者名字","LastEditTime":"Do not edit","Description":"文件描述","FilePath":"Do not edit"}, // 头部注释
  "fileheader.cursorMode": {"description":"","param":"key 注释","return":""},// 函数注释
  "fileheader.configObj": {
    "autoAdd": false, // 自动添加头部注释开启才能自动添加
    "autoAlready": false, // 默认开启
    "prohibitAutoAdd": [ "json", "md", "js" ], // 禁止.json .md文件，自动添加头部注释
    "autoAddLine": 1, // 默认文件超过100行就不再自动添加头部注释
    "showErrorMessage": false // 默认不显示错误通知 用于debugger
  },
}
```


# WebStorm插件配置

## 项目包依赖
```json
devDependencies: {
  "babel-eslint": "^10.0.3",
  "eslint": "^5.16.0",
  "eslint-plugin-prettier": "^3.1.1",
  "eslint-plugin-vue": "^5.0.0",
}
```

## IDE插件
- eslint
- prettier

## setting配置
![avatar](https://pic.downk.cc/item/5e8fda30504f4bcb0424b7d9.png)
![avatar](https://pic.downk.cc/item/5e8fda30504f4bcb0424b7e1.png)
![avatar](https://pic.downk.cc/item/5e8fda30504f4bcb0424b7d4.png)
