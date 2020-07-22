# 可视化

## 地图
### 请求内容格式
```js
const request = {
  url:'/visual/test', // 获取统计图数据的地址
  methods:POST,
  header:{
    Content-type:'application/json',
    access_token: null, // 验证用
    check_info: null  // 验证用
  },
  body:{ // 以下参数无值则为null
    sortField:1, // 排序 1升序 2降序
    startDate:'2019-01-01', // 开始日期
    endDate:'2019-12-31', // 结束日期
    yearField: 2019, // 年范围
    fyField:320000, // 法院值
    ayField:0, // 案由值
    mapFyField:['123'] // 地图法院checkbox组的值
  }
}
```

### 响应内容格式
```js
const reponse = {
  code:0,
  data: {
    chartsData: [
      { name: '南京市', value: '100' },
      { name: '无锡市', value: '100' },
      { name: '徐州市', value: '100' },
      { name: '常州市', value: '100' },
      { name: '苏州市', value: '100' },
      { name: '南通市', value: '100' },
      { name: '连云港市', value: '100' },
      { name: '淮安市', value: '100' },
      { name: '盐城市', value: '100' },
      { name: '扬州市', value: '100' },
      { name: '镇江市', value: '100' },
      { name: '泰州市', value: '100' },
      { name: '宿迁市', value: '100' }
    ]
  }
}
```

## 折线图、堆叠折线图
### 请求内容格式
```js
const request = {
  url:'/visual/test', // 获取统计图数据的地址
  methods:POST,
  header:{
    Content-type:'application/json',
    access_token: null, // 验证用
    check_info: null  // 验证用
  },
  body:{ // 以下参数无值则为null
    sortField:1, // 排序 1升序 2降序
    startDate:'2019-01-01', // 开始日期
    endDate:'2019-12-31', // 结束日期
    yearField: 2019, // 年范围
    fyField:320000, // 法院值
    ayField:0, // 案由值
    mapFyField:['123'] // 地图法院checkbox组的值
  }
}
```

### 响应内容格式
```js
const reponse = {
  code:0,
  data: {
    chartsName: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], // 折线图x轴数据
    chartsData: [ // 折线图y轴数据
      {
        name: '受理',
        data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 133],
      },
      {
        name: '新收',
        data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150, 199],
      },
      {
        name: '审结',
        data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122, 142],
      },
      {
        name: '未结',
        data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122, 142],
      }
    ]
  }
}
```

## 柱形图、堆叠柱形图
### 请求内容格式
```js
const request = {
  url:'/visual/test', // 获取统计图数据的地址
  methods:POST,
  header:{
    Content-type:'application/json',
    access_token: null, // 验证用
    check_info: null  // 验证用
  },
  body:{ // 以下参数无值则为null
    sortField:1, // 排序 1升序 2降序
    startDate:'2019-01-01', // 开始日期
    endDate:'2019-12-31', // 结束日期
    yearField: 2019, // 年范围
    fyField:320000, // 法院值
    ayField:0, // 案由值
    mapFyField:['123'] // 地图法院checkbox组的值
  }
}
```

### 响应内容格式
```js
const reponse = {
  code:0,
  data: {
    chartsName: ['高院', '南京', '镇江', '盐城', '宿迁', '苏州', '徐州'], // 柱形图x轴数据
    chartsData: [ // 柱形图y轴数据
      {
        name: '受理',
        data: [320, 332, 301, 334, 390, 366, 386],
      },
      {
        name: '新收',
        data: [220, 182, 191, 234, 290, 532, 763],
      },
      {
        name: '审结',
        data: [220, 182, 191, 234, 290, 532, 763],
      },
      {
        name: '未结',
        data: [220, 182, 191, 234, 290, 532, 763],
      }
    ]
  }
}
```

## 极坐标柱形图
### 请求内容格式
```js
const request = {
  url:'/visual/test', // 获取统计图数据的地址
  methods:POST,
  header:{
    Content-type:'application/json',
    access_token: null, // 验证用
    check_info: null  // 验证用
  },
  body:{ // 以下参数无值则为null
    sortField:1, // 排序 1升序 2降序
    startDate:'2019-01-01', // 开始日期
    endDate:'2019-12-31', // 结束日期
    yearField: 2019, // 年范围
    fyField:320000, // 法院值
    ayField:0, // 案由值
    mapFyField:['123'] // 地图法院checkbox组的值
  }
}
```

### 响应内容格式
```js
const reponse = {
  code:0,
  data: {
    chartsName: ['高院', '南京', '镇江', '盐城', '宿迁', '南通', '苏州', '徐州', '连云港', '淮安'], // 极坐标柱形图x轴数据
    chartsData: [ // 极坐标柱形图y轴数据
      {
        name: '受理',
        data: [100, 332, 200, 334, 390, 500, 386, 334, 390, 500],
      }
    ]
  }
}
```

## 饼图
### 请求内容格式
```js
const request = {
  url:'/visual/test', // 获取统计图数据的地址
  methods:POST,
  header:{
    Content-type:'application/json',
    access_token: null, // 验证用
    check_info: null  // 验证用
  },
  body:{ // 以下参数无值则为null
    sortField:1, // 排序 1升序 2降序
    startDate:'2019-01-01', // 开始日期
    endDate:'2019-12-31', // 结束日期
    yearField: 2019, // 年范围
    fyField:320000, // 法院值
    ayField:0, // 案由值
    mapFyField:['123'] // 地图法院checkbox组的值
  }
}
```

### 响应内容格式
```js
const reponse = {
  code:0,
  data: {
    chartsName: ['9-12个月', '12-18个月', '18个月-3年', '3年以上'], // 饼图x轴数据
    chartsData: [  // 饼图y轴数据
      { value: 16, name: '9-12个月' },
      { value: 22, name: '12-18个月' },
      { value: 14, name: '18个月-3年' },
      { value: 30, name: '3年以上' }
    ]
  }
}
```

## 表格暂不做