<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" name="" v-model="sendmsg" placeholder="请输入你想发送的内容">
    <button class="btn">开挖</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      sendmsg: '',
      ws: {}
    }
  },
  mounted() {
    this.ws = new WebSocket('ws://127.0.0.1:3000/ping')
    // 连接打开时触发
    this.ws.onopen = () => {  
      console.log("Connection open ...") 
    }
    // 接收到消息时触发  
    this.ws.onmessage = (evt) => { 
      console.log(evt) 
      this.msgList.push(evt.data)  
    } 
    this.ws.onclose = () => {
      console.log('Connection close !!!')
    }
  },
  // 关闭连接 
  beforeDestroy() {
    this.ws.close()
  },

  methods: {
    send() {
      this.ws.send(this.msg)
      //this.ws.send(JSON.stringify({msg: this.msg}))
      this.msg = ''
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 300px;
  padding: 5px;
}
.btn {
  margin-left: 10px;
  cursor: pointer;
}
</style>
