<template>
    <div class="timer">
        <div class="circle" style="margin-bottom: 22px">
            <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(110,110)">
                    <circle r="100" class="e-c-base"/>
                    <g transform="rotate(-90)">
                        <circle r="100" class="e-c-progress" ref="progressBar" :class="{timeout: timeLeft < 0}"/>
                        <g id="e-pointer" ref="pointer">
                            <circle cx="100" cy="0" r="8" class="e-c-pointer" :class="{timeout: timeLeft < 0}"/>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        <div class="controlls">
            <div class="display-remain-time" ref="displayOutput">{{displayTime}}</div>
            <button id="pause" :class="{pause: isStarted && !isPaused ,play: !isStarted || isPaused,}" @click="pauseTimer"></button>
        </div>
        <button class="btn btn-success my-2 my-sm-0" type="submit" @click="stopTimer">Stop</button>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
let length = Math.PI * 2 * 100;

export default {
    name:'Timer',
    mounted(){
        this.$refs.progressBar.style.strokeDasharray = length;
        this.wholeTime = localStorage.getItem('period');
        if(localStorage.getItem('timeLeft')){
            this.timeLeft = localStorage.getItem('timeLeft');
            this.isStarted = this.isPaused = true;
            this.update();
        }
        else{
            this.remainTime = localStorage.getItem('remainTime');
            this.pauseTimer();
        }
    },
    beforeDestroy(){
        this.$refs.progressBar.style.strokeDasharray = null;
    },
    computed:{
        displayTime(){
            let hours = parseInt(this.timeLeft / 3600);
            let minutes = parseInt(this.timeLeft % 3600/60);
            let seconds = (this.timeLeft % 3600)%60;
            return `${hours < 0 ? '-' : ''}${Math.abs(hours) < 10 ? '0' : ''}${Math.abs(hours)}:${minutes < 0 ? '-' : ''}${Math.abs(minutes) < 10 ? '0' : ''}${Math.abs(minutes)}:${seconds < 0 ? '-' : ''}${Math.abs(seconds) < 10 ? '0' : ''}${Math.abs(seconds)}`;
        }
    },
    methods:{
        update() {
            var offset = - length - length * this.timeLeft / (this.wholeTime);
            this.$refs.progressBar.style.strokeDashoffset = offset; 
            this.$refs.pointer.style.transform = `rotate(${360 * this.timeLeft / (this.wholeTime)}deg)`; 
        },
        timer (){ 
            this.timeLeft = Math.round((this.remainTime - Date.now()) / 1000);
            this.update();            
            this.intervalTimer = setInterval(()=>{
                this.timeLeft = Math.round((this.remainTime - Date.now()) / 1000);
                this.update();
            }, 1000);
        },
        pauseTimer(){
            if(this.isStarted === false){
                if(!localStorage.getItem('startTime')){
                    localStorage.setItem('startTime',new Date());
                    this.remainTime = Date.now() + (this.wholeTime * 1000);
                    localStorage.setItem('remainTime', this.remainTime);
                }
                this.timer();
                this.isStarted = true;                
            }else if(this.isPaused){
                this.remainTime = Date.now() + (this.timeLeft * 1000);
                localStorage.setItem('remainTime', this.remainTime);
                this.timer();
                this.isPaused = this.isPaused ? false : true
                localStorage.removeItem('timeLeft');
            }else{
                clearInterval(this.intervalTimer);
                localStorage.setItem('timeLeft', this.timeLeft);
                this.isPaused = this.isPaused ? false : true
            }
        },
        stopTimer(){
            clearInterval(this.intervalTimer);
            this.$emit('stopTimer');
        }
    },
    data(){
        return{
            intervalTimer:null,
            timeLeft:null,
            wholeTime : 5,// manage this to set the whole time 
            isPaused : false,
            isStarted : false,
            remainTime : Date.now()
        }
    }
}
</script>

<style scoped>

.controlls {
  position: relative;
  top: -85px;
  margin-top: -150px;
  text-align: center;
}

.display-remain-time {
  font-family: 'Roboto';
  font-weight: 100;
  font-size: 50px;
  color: var(--primary-color);
}

#pause {
  outline: none;
  background: transparent;
  border: none;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  position: relative;
}

.play::before {
  display: block;
  content: "";
  position: absolute;
  top: 8px;
  left: 16px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 22px solid var(--primary-color);
  text-align: center;
}

.pause::after {
  content: "";
  position: absolute;
  top: 8px;
  left: 18px;
  width: 15px;
  height: 30px;
  background-color: transparent;
  border-radius: 1px;
  border: 5px solid var(--primary-color);
  border-top: none;
  border-bottom: none;
}

#pause:hover { opacity: 0.8; }

.e-c-base {
  fill: none;
  stroke: #B6B6B6;
  stroke-width: 4px
}

.e-c-progress {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 4px;
  transition: stroke-dashoffset 0.7s;
}

.timeout {
    stroke: var(--dancer-color) !important;
}

.e-c-pointer {
  fill: #FFF;
  stroke: var(--primary-color);
  stroke-width: 2px;
}

#e-pointer { transition: transform 0.7s; }
</style>


