<template>
  <div class="tracking">
    <Navbar />
    <div class="col-lg-11 mx-auto">
      <div class="card" v-for="g in gamers" :key="g.user._id">
        <div class="card-header">
              {{g.user.name}}
        </div>

          <div class="card-body">
            <Action :gamer="g" @showModal="showModal"/>
          </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Паузы</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Прошло</th>
                        <th scope="col">Начало</th>
                        <th scope="col">Длительность</th>
                        <th scope="col">Конец</th>
                        <th scope="col">Осталось</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in pauses" :key="p._id">
                        <td>{{p.passedTime}}</td>
                        <td>{{p.pauseTime}}</td>                         
                        <td>{{p.duration}}</td>  
                        <td>{{p.remainTime}}</td>          
                        <td>{{p.leftTime}}</td>                                 
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>



<script>
import Navbar from '@/components/Navbar.vue'
import Action from '@/components/Action.vue'
export default {
  name:'tracking',
  components: {
    Navbar,
    Action
  },
  computed: {
    gamers(){
      return this.$store.state.gamers
    }
  },
  data(){
    return{
      pauses: []
    }
  },
  methods:{
    getGamers(){
      this.$store.dispatch('getGamers')
        .catch(err=>{
          console.error(err);
        }) 
    },
    showModal(p){
      this.pauses = p
      $('#exampleModal').modal('show')
    }
  },
  mounted(){
    this.getGamers()
  }
}
</script>
