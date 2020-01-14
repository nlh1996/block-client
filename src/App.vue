<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import axios from './http/index'
export default {
  beforeMount() {
    if(window.WebSocket) {
      let ws = new WebSocket('ws://127.0.0.1:3000')
      let ws2 = new WebSocket('ws://127.0.0.1:3000')
      this.$store.commit('conn', ws)
      this.$store.commit('conn2', ws2)
      // 连接打开时触发
      ws.onopen = () => {  
        console.log("Connection open ...") 
      }
      ws.onclose = () => {
        console.log('Connection close !!!')
      }
    }else {
      alert("很抱歉，当前浏览器不支持websocket!")
    }
  },
  // 关闭连接 
  beforeDestroy() {
    this.$store.state.ws.close()
    this.$store.state.ws2.close()
  },
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
