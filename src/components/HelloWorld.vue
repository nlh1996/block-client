<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" name="" v-model="sendmsg" placeholder="请输入你想发送的内容">
    <button class="btn" @click="send">挖一下</button>
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
      ws: {},
    }
  },
  mounted() {
    this.ws = new WebSocket('ws://127.0.0.1:3000')
    // 连接打开时触发
    this.ws.onopen = () => {  
      console.log("Connection open ...") 
    }
    // 接收到消息时触发  
    this.ws.onmessage = (res) => { 
      this.sendmsg = JSON.parse(res.data).message
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
      //this.ws.send(this.sendmsg)
      this.ws.send(JSON.stringify({msg: this.sendmsg}))
      this.sendmsg = ''
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
