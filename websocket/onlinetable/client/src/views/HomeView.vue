<template>
 <div>
  <p>{{ statusText }}</p>
  <table border="1" align="center" width="300" v-table-click="state">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Score</th>
    </tr>
    <tr v-for="(item,index) in state.userList" align="center">
      <td>{{ item.id }}</td>
      <td :data-index="index" data-field="name">
        <span>{{ item.name }}</span>
      </td>
      <td :data-index="index" data-field="age">
        <span>{{ item.age }}</span>
      </td>
      <td :data-index="index" data-field="score">
        <span>{{ item.score }}</span>
      </td>
    </tr>
  </table>
 </div>
</template>
<script setup>
import io from 'socket.io-client'
import { computed, reactive } from 'vue';
import vTableClick from '@/directives/tableClick.js'
const socket = io('http://localhost:3000')
const state = reactive({
  userList:[],
  field:'',
  index:-1,
  socket:socket,
  status:false
})
const statusText = computed(()=>{
  return state.status?'正在编辑中...':''
})
socket.on('loadData',(data)=>{
  // console.log(data);
  state.userList = data
})
socket.on('changeInput',({index,value,field})=>{
  state.userList.forEach((item,idx)=>{
    if(index == idx){
      item[field] = value
    }
    return item
  })
})

socket.on('changeStatus',(status)=>{
  state.status = status
})
</script>
<style>
td{
  position: relative;
}
</style>
