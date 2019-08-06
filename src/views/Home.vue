<template>
  <div class="home">
    <HelloWorld msg="Welcome to My Blockchain"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },

  beforeMount() {
    let ws = new WebSocket('ws://127.0.0.1:3000')
    this.$store.commit('conn', ws)
    // 连接打开时触发
    ws.onopen = () => {  
      console.log("Connection open ...") 
    }
    ws.onclose = () => {
      console.log('Connection close !!!')
    }
  },
  
  // 关闭连接 
  beforeDestroy() {
    this.$store.state.ws.close()
  },
}
</script>
