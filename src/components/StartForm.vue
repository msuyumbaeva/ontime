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
        <div class="form-group col-6 col-sm-3 mx-auto my-4">
            <select id="inputState" class="form-control" v-model="device">
              <option v-for="d in devices" :key="d._id" :value="d._id">{{d.name}}</option>
            </select>
        </div>
        <button class="btn btn-success my-2 my-sm-0" type="submit" @click="$emit('startTimer',{time:hours*3600+minutes*60,device:device})">Start</button>
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
          hours: 1,
          device: 0
      }
  },
  methods:{
    updateTime(item){
        if(item.type == 'h')
            this.hours = item.value;
        else 
            if(item.type == 'm')
                this.minutes = item.value;
    },
    getDevices(){
      this.$store.dispatch('getDevices')
      .then(()=>{
          if(this.devices.length>0)
            this.device = this.devices[0]._id;
      })
        .catch(err=>{
          console.error(err);
        }) ;
    }
  },
  computed: {
    devices(){
      return this.$store.state.devices;
    } 
  },
  mounted(){
      this.getDevices();
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
