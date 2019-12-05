# MVC框架
## jQuery实现todo-list
```html
<input type="text" id="input"/>
<button id="btn">add</button>
<ul id="list"></ul>

<script>
  $('#btn').click(function() {
    $('#list').append($('<li>' + $('#input').val() + '</li>'))
    $('#input').val('')
  })
</script>
```
## vue实现todo-list
```html
<input type="text" v-model="input"/>
<button @click="add">add</button>
<ul>
  <li v-for="(item, index) in list" :key="index">{{item}}</li>
</ul>
<script>
export default {
  data(){
    return{
      input:'',
      list:[]
    }
  },
  methods:{
    add(){
      this.list.push(this.title);
      this.title = '';
    }
  }
}
</script>
```

