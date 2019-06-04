<template>
  <div class="users">
    <Navbar />
      <div class="col-sm-10 col-lg-7 mx-auto">
        <h4 class="mb-4">Пользователи</h4>
        <div class="form-row">
          <div class="form-group col-md-4">
            <input type="text" class="form-control" placeholder="Логин" v-model="user.name">
          </div>
          <div class="form-group col-md-3">
            <input type="password" class="form-control" placeholder="Пароль" v-model="user.password">
          </div>
          <div class="form-group col-md-3">
            <select id="inputState" class="form-control" v-model="user.role">
              <option selected>Игрок</option>
              <option>Админ</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <button type="submit" class="btn btn-success" @click="addUser">Добавить</button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Имя</th>
              <th scope="col">Роль</th>
              <th scope="col">Дата создания</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u._id">
              <td>{{u._id}}</td>
              <td>{{u.name}}</td>
              <td>{{u.role}}</td>
              <td>{{dateFormat(u.createdDate)}}</td>
            </tr>
          </tbody>
        </table>

        <h4 class="mb-4">Девайсы</h4>
        <div class="form-row">
          <div class="form-group col-md-4">
            <input type="text" class="form-control" placeholder="Наименование" v-model="device.name">
          </div>
          <div class="form-group col-md-2">
            <button type="submit" class="btn btn-success" @click="addDevice">Добавить</button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Наименование</th>
              <th scope="col">Дата создания</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in devices" :key="d._id">
              <td>{{d._id}}</td>
              <td>{{d.name}}</td>
              <td>{{dateFormat(d.createdDate)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name:'users',
  components: {
    Navbar
  },
  computed: {
    users(){
      return this.$store.state.users;
    },
    devices(){
      return this.$store.state.devices;
    } 
  },
  mounted(){
    this.getUsers();
    this.getDevices();
  },
  data(){
    return{
      user:{
        name: '',
        password: '',
        role: 'Игрок'
      },
      device: {name: ''}
    }
  },
  methods:{
    dateFormat(d){
      let date = d.split('.')
      return date[0].replace('T',' ')
    },
    getUsers(){
      this.$store.dispatch('getUsers')
        .catch(err=>{
          console.error(err);
        }) 
    },
    addUser(){
      this.$store.dispatch('createUser',this.user)
        .then(()=> this.user = {
          name: '',
          password: '',
          role: 'Игрок'
        })
        .catch(err=>{
          console.error(err);
        }) 
    },
    getDevices(){
      this.$store.dispatch('getDevices')
        .catch(err=>{
          console.error(err);
        }) 
    },
    addDevice(){
      this.$store.dispatch('createDevice',this.device)
        then(()=>this.device = {name: ''})
        .catch(err=>{
          console.error(err);
        }) 
    }
  }
}
</script>
