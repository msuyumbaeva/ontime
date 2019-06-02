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
    startTimer(time){
        localStorage.setItem('period', time);
        this.isStarted = true;
    },
    stopTimer(){
      this.isStarted = false;
      localStorage.removeItem('startTime');
      localStorage.removeItem('period');
      localStorage.removeItem('timeLeft');
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
