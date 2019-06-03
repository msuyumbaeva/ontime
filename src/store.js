import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'http://localhost:3000',
    users: [],
    devices: []
  },
  mutations: {
    setUsers(state,users){
      state.users = users;
    },
    addUser(state,user){
      state.users.push(user);
    },
    setDevices(state,devices){
      state.devices = devices;
    },
    addDevice(state,device){
      state.devices.push(device);
    }
  },
  actions: {
    async getUsers({state,commit}){
      try{
        const res = await axios.get(`${state.host}/users/`);
        commit('setUsers',res.data.users);
      }
      catch(err){
        throw(err);
      }
    },
    async createUser({state,commit},user){
      try{
        const res = await axios.post(`${state.host}/users/`,user);
        commit('addUser',res.data.user);
      }
      catch(err){
        throw(err);
      }
    },
    async getDevices({state,commit}){
      try{
        const res = await axios.get(`${state.host}/devices/`);
        commit('setDevices',res.data.devices);
      }
      catch(err){
        throw(err);
      }
    },
    async createDevice({state,commit},device){
      try{
        const res = await axios.post(`${state.host}/devices/`,device);
        commit('addDevice',res.data.device);
      }
      catch(err){
        throw(err);
      }
    }
  }
})
