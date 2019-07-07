<template>
  <div class="home">
    <Navbar/>
    <div class="homecontent">
      <StartForm v-if="!isStarted" @startTimer="startTimer" />
      <Timer v-else @stopTimer="stopTimer"/> 
    </div>
     
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import StartForm from '@/components/StartForm.vue'
import Timer from '@/components/Timer.vue'
export default {
  name: 'home',
  components: {
    Navbar,
    StartForm,
    Timer
  },
  data(){
    return{
      isStarted: false
    }
  },
  methods:{
    startTimer(obj){
        localStorage.setItem('period', obj.time);
        localStorage.setItem('device', obj.device);
        this.isStarted = true;
    },
    stopTimer(){
      this.isStarted = false;
      localStorage.removeItem('startTime');
      localStorage.removeItem('period');
      localStorage.removeItem('timeLeft');
      localStorage.removeItem('remainTime');
      localStorage.removeItem('device');
      localStorage.removeItem('actionId');
      localStorage.removeItem('pauseId');
    }
  },
  mounted(){
    if(localStorage.getItem('startTime'))
      this.isStarted = true;
  }
}
</script>

<style>
.homecontent{
    margin:5% auto;
    text-align: center;
    font-size: 25px;
}
</style>
