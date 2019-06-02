<template>
    <div class="timepicker">
        <i class="fas fa-chevron-up" @click="plus"></i>
        <div class="number">{{formatValue}}</div>
        <i class="fas fa-chevron-down" @click="minus"></i>
    </div>
</template>

<script>
export default {
    name:'TimePicker',
    props:{
        value: {
            type: Number,
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: Number,
        type: String
    },
    data(){
        return {
            num: 0
        }
    },
    computed: {
        formatValue() {
            if(this.num<10)
                return '0'+this.num.toString();
            else
                return this.num;
        }
    },
    methods:{
        plus(){
            this.num++;
            if(this.num>this.max)
                this.num = this.min;
            this.$emit('updateTime',{type: this.type, value: this.num})
        },
        minus(){
            this.num--;
            if(this.num<this.min)
                this.num = this.max;
            this.$emit('updateTime',{type: this.type, value: this.num})
        }
    },
    mounted(){
        this.num = this.value;
    }
}
</script>


<style scoped>
.timepicker{
    font-size: 50px;
}
input{
    width:100px;
}
</style>

