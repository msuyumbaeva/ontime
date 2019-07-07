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
                <td>{{formatDate(a.createdDate)}}</td>
                <td>{{a.device.name}}</td>
                <td>{{convertSeconds(a.planPeriod)}}</td>   
                <td>{{formatDate(a.planStopDate)}}</td>          
                <td>{{convertSeconds(a.factPeriod)}}</td>             
                <td>{{formatDate(a.stoppedDate)}}</td>
                <td>
                    <button type="button" class="btn btn-success btn-sm" @click="showPauses(a.pauses)">
                    ...
                    </button>
                    <button v-if="isAdmin" type="button" class="btn btn-danger btn-sm" @click="$emit('deleteAction',{user:gamer.user._id,action:a._id})">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </td>     
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
    name: 'action',
    props: {
        gamer: Object
    },
    methods:{
        formatDate(d){
            if(d){
                let date = d.split('.')
                return date[0].replace('T',' ')
            }
            else return ''
        },
        convertSeconds(s){
            if(s){
                const h = parseInt(s/3600);
                let m = parseInt(s%3600/60);
                let sec = (s%3600)%60;
                m < 10 ? m='0'+m : '';
                sec < 10 ? sec='0'+sec : '';
                return h + ':' + m + ':' + sec;
            } 
            else return ''
        },
        showPauses(pauses){
            this.$emit('showModal',pauses)
        },
        isAdmin(){
            const token = jwtDecode(localStorage.token);
            return token.role === 'Админ';
        }
    }
}
</script>


