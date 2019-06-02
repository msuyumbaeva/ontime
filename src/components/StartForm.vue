<template>
    <div class="startform">
        <table class="timeblock">
            <tr>
                <td>Часы</td>
                <td></td>
                <td>Минуты</td>
            </tr>
            <tr>
                <td><TimePicker :value="Number('1')" :max="Number(23)" @updateTime="updateTime" type="h"/></td>
                <td>:</td>
                <td><TimePicker :max="Number(59)" @updateTime="updateTime" type="m"/></td>
            </tr>
        </table> 
        <button class="btn btn-success my-2 my-sm-0" type="submit" @click="$emit('startTimer',hours*3600+minutes*60)">Start</button>      
    </div>
</template>

<script>
import TimePicker from "./TimePicker";
export default {
  name: 'StartForm',
  components: {
    TimePicker
  },
  data(){
      return{
          minutes: 0,
          hours: 1
      }
  },
  methods:{
    updateTime(item){
        if(item.type == 'h')
            this.hours = item.value;
        else 
            if(item.type == 'm')
                this.minutes = item.value;
    }
  }
}
</script>

<style scoped>
.startform{
    height: 316px;
    padding: 5px 0;
}
.timeblock
{
    margin:auto;
    text-align: center;
    font-size: 25px;
    margin:15px auto 30px auto;
}
td:first-child,td:last-child
{
    width: 150px;
}
</style>
