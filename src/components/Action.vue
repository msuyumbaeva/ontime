<template>
    <div class="action table-responsive" >
        <table class="table table-bordered table-sm">
            <thead>
                <tr>
                <th scope="col">Начало</th>
                <th scope="col">Устройство</th>
                <th scope="col">Планируемая длительность</th>
                <th scope="col">Планируемое время окончания</th>
                <th scope="col">Длительность</th>
                <th scope="col">Время окончания</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="a in gamer.actions" :key="a._id">
                <td>{{dateFormat(a.createdDate)}}</td>
                <td>{{a.device.name}}</td>
                <td>{{convertSeconds(a.planPeriod)}}</td>   
                <td>{{dateFormat(a.planStopDate)}}</td>          
                <td>{{convertSeconds(a.factPeriod)}}</td>             
                <td>{{dateFormat(a.stoppedDate)}}</td>
                <td>
                    <button type="button" class="btn btn-success btn-sm" @click="showPauses(a.pauses)">
                    ...
                    </button>
                </td>
                
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'action',
    props: {
        gamer: Object
    },
    data(){
        return{
            isSend : false
        }
    },
    methods:{
        dateFormat(d){
            let date = d.split('.')
            return date[0].replace('T',' ')
        },
        convertSeconds(s){
            const h = parseInt(s/3600);
            let m = s%3600/60;
            m < 10 ? m+='0' : '';
            return h + ':' + m ;
        },
        showPauses(pauses){
            if(!this.isSend){
                pauses.map(p=>{
                    p.passedTime = this.convertSeconds(p.passedTime);
                    p.pauseTime = this.dateFormat(p.pauseTime);
                    p.leftTime = this.convertSeconds(p.leftTime);
                    p.remainTime = this.dateFormat(p.remainTime);
                    p.duration = this.convertSeconds(p.duration);
                })
                this.isSend = true;
            }
            this.$emit('showModal',pauses)
        }
    }
}
</script>


