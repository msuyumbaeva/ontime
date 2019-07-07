<template>
    <div class="auth-form col-md-4 mx-auto" style="margin-top: 10%">
        <div class="alert alert-danger" role="alert" v-if="error">
            {{error}}
        </div>
        <div class="form-group">
            <label >Логин</label>
            <input type="text" class="form-control" placeholder="Логин" v-model="user.name">
        </div>
        <div class="form-group">
            <label>Пароль</label>
            <input type="password" class="form-control" placeholder="Пароль" v-model="user.password">
        </div>
        <button type="submit" class="btn btn-success" @click="auth">Войти</button>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return{
            user: {
                name: '',
                password: ''
            },
            error: ''
        }
    },
    methods:{
        auth(){
            this.$store.dispatch('authUser',this.user)
            .then(()=>{
                this.$router.replace({path: this.$route.query.redirect || '/'})
            })
            .catch(err=>{
                this.error = err.message;
                this.user.name = '';
                this.user.password = '';
            })
        }
    }
}
</script>

