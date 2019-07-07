import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'http://ontimeserver.cloudno.de',
    users: [],
    devices: [],
    gamers: []
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
    },
    addGamer(state,gamer){
      state.gamers.push(gamer);
    },
    deleteAction(state,id){
      let i = state.gamers.findIndex(g=>{
        return g.user._id == id.user;
      })
      let j = state.gamers[i].actions.findIndex(a=>{
        return a._id == id.action;
      })
      state.gamers[i].actions.splice(j,1);
    }
  },
  actions: {
    async getUsers({state,commit}){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.get(`${state.host}/users/`,{ headers: { 'Authorization': 'Bearer '+ token }});
        commit('setUsers',res.data.users);
      }
      catch(err){
        throw(err);
      }
    },
    async createUser({state,commit},user){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.post(`${state.host}/users/`,user,{ headers: { 'Authorization': 'Bearer '+ token }});
        commit('addUser',res.data.user);
      }
      catch(err){
        throw(err);
      }
    },
    async getDevices({state,commit}){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.get(`${state.host}/devices/`,{ headers: { 'Authorization': 'Bearer '+ token }});
        commit('setDevices',res.data.devices);
      }
      catch(err){
        throw(err);
      }
    },
    async createDevice({state,commit},device){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.post(`${state.host}/devices/`,device,{ headers: { 'Authorization': 'Bearer '+ token }});
        commit('addDevice',res.data.device);
      }
      catch(err){
        throw(err);
      }
    },
    async getGamers({state,dispatch,commit}){
      try{
        const token = localStorage.getItem('token')
        await dispatch('getUsers');
        state.gamers = [];
        state.users.map(async u=>{
            const res = await axios.get(`${state.host}/actions/${u._id}`,{ headers: { 'Authorization': 'Bearer '+ token }});
            commit('addGamer',res.data);
        })
      }
      catch(err){
        throw(err);
      }
    },
    async startAction({state},action){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.post(`${state.host}/actions/`,action,{ headers: { 'Authorization': 'Bearer '+ token }});
        return res.data;
      }
      catch(err){
        throw(err);
      }
    },
    async pauseAction({state},pause){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.post(`${state.host}/actions/pause`,pause,{ headers: { 'Authorization': 'Bearer '+ token }});
        return res.data;
      }
      catch(err){
        throw(err);
      }
    },
    async remainAction({state},remain){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.post(`${state.host}/actions/remain`,remain,{ headers: { 'Authorization': 'Bearer '+ token }});
        return res.data;
      }
      catch(err){
        throw(err);
      }
    },
    async stopAction({state},stop){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.post(`${state.host}/actions/stop`,stop,{ headers: { 'Authorization': 'Bearer '+ token }});
        return res.data;
      }
      catch(err){
        throw(err);
      }
    },
    async deleteAction({state,commit},id){
      try{
        const token = localStorage.getItem('token')
        await axios.delete(`${state.host}/actions/${id.action}`,{ headers: { 'Authorization': 'Bearer '+ token }});
        commit('deleteAction',id);
      }
      catch(err){
        throw(err);
      }
    },
    async authUser({state},user){
      try{
        const token = localStorage.getItem('token')
        const res = await axios.post(`${state.host}/users/auth`,user,{ headers: { 'Authorization': 'Bearer '+ token }});
        if(res.data.token)
          localStorage.setItem('token',res.data.token);
        else
          throw new Error(res.data.error)
      }
      catch(err){
        throw(err);
      }
    }
  }
})
