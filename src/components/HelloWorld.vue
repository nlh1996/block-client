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
  computed: {
    ws: function() { return this.$store.state.ws }
  },
  data() {
    return {
      sendmsg: '',
    }
  },
  mounted() {
    // 接收到消息时触发  
    this.ws.onmessage = (res) => { 
      this.sendmsg = JSON.parse(res.data).message
    } 
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
