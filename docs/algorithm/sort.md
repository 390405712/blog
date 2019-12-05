# 排序
## 冒泡排序1
```js
function bubbleSort(arr) {
  var arr = arr;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {
        var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
      }
    }
  }
  return arr;
}
```
## 冒泡排序2
```js
function bubbleSort2(arr) {
  var arr = arr;
  var i = arr.length-1;
  while ( i> 0) {
    var pos= 0;
    for (var j= 0; j< i; j++){
      if (arr[j]> arr[j+1]) {
        pos= j;
        var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
      }
    }
    i= pos;
  }
  return arr;
}
```

## 冒泡排序3
```js
function bubbleSort3(arr) {
  var arr = arr;
  var low = 0;
  var high= arr.length-1;
  var tmp,j;
  while (low < high) {
    for (j= low; j< high; j++){ //正向冒泡,找到最大者
      if (arr[j]> arr[j+1]) {
        tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
      }
    }
    high--;//修改high值, 前移一位
    for (j=high; j>low; j--){ //反向冒泡,找到最小者
      if (arr[j]<arr[j-1]) {
        tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
      }
    }
    low++;//修改low值,后移一位
  }
  return arr;
}
```

## 选择排序
```js
function selectionSort(arr) {
  var arr = arr;
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {     //寻找最小的数
        minIndex = j;                 //将最小数的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
```

## 插入排序
```js
function insertionSort(arr) {
  var arr = arr;
  for (var i = 1; i < arr.length; i++) {
    var key = arr[i];
    var j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```

## 希尔排序
```js
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1;
  while (gap < len / 3) {          //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}
```
## 归并排序
```js
function mergeSort(arr) {  //采用自上而下的递归方法
  var len = arr.length;
  if(len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right){
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length)
    result.push(left.shift());
  while (right.length)
    result.push(right.shift());
  return result;
}
```

## 快速排序一
```js
function quickSort(arr, left, right) {
  var len = arr.length,
    partitionIndex,
    left = typeof left != 'number' ? 0 : left,
    right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}
function partition(arr, left, right) {     //分区操作
  var pivot = left,                      //设定基准值（pivot）
    index = pivot + 1;
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
};
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
```

## 堆排序
```js
function heapSort(array) {
  //建堆
  var heapSize = array.length, temp;
  for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(array, i, heapSize);
  }
  //堆排序
  for (var j = heapSize - 1; j >= 1; j--) {
    temp = array[0];
    array[0] = array[j];
    array[j] = temp;
    heapify(array, 0, --heapSize);
  }
  return array;
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
  var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
  if (l < len && arr[l] > arr[largest]) {
    largest = l;
  }
  if (r < len && arr[r] > arr[largest]) {
    largest = r;
  }
  if (largest != x) {
    temp = arr[x];
    arr[x] = arr[largest];
    arr[largest] = temp;
    heapify(arr, largest, len);
  }
}
```

## 计数排序
```js
function countingSort(array,maxValue) {
var bucket = new Array(maxValue+1),
  sortedIndex = 0,
  arrLen = arr.length,
  bucketLen = maxValue + 1;

for (var i = 0; i < arrLen; i++) {
  if (!bucket[arr[i]]) {
    bucket[arr[i]] = 0;
  }
  bucket[arr[i]]++;
}

for (var j = 0; j < bucketLen; j++) {
  while(bucket[j] > 0) {
    arr[sortedIndex++] = j;
    bucket[j]--;
  }
}
return arr;
}
```

## 桶排序
```js
function bucketSort(array, bucketSize) {
  if (arr.length === 0) {
    return arr;
  }

  var i;
  var minValue = arr[0];
  var maxValue = arr[0];
  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];                //输入数据的最小值
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];                //输入数据的最大值
    }
  }

  //桶的初始化
  var DEFAULT_BUCKET_SIZE = 5;            //设置桶的默认数量为5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  //利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  arr.length = 0;
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);                      //对每个桶进行排序，这里使用了插入排序
    for (var j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }

  return arr;
}
```
## 基数排序
```js
function radixSort(arr, maxDigit) {
  var mod = 10;
  var dev = 1;
  var counter = [];
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for(var j = 0; j < arr.length; j++) {
      var bucket = parseInt((arr[j] % mod) / dev);
      if(counter[bucket]== null) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    var pos = 0;
    for(var j = 0; j < counter.length; j++) {
      var value = null;
      if(counter[j]!=null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}
```

## 按奇偶排序数组
- 输入[4,2,5,7]
- 输出[5,2,7,4]
```js
export default arr => {
  arr.sort((a,b) => {a-b});
  let sortArr = [];
  let odd = 1; //奇数
  let even = 0; //偶数
  arr.forEach(item => {
    if(item%2 === 1){
      sortArr[odd] = item
      odd += 2
    } else {
      sortArr[even] = item
      even += 2
    }
  })
  return sortArr
}
```

