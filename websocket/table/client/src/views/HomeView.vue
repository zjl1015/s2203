<template>
<div>
  <p>{{ statusText }}</p>
  <table border="1" width="300" align="center" v-table-click="state">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Score</th>
      <th>Age</th>
    </tr>
    <tr align="center" v-for="(item,index) in state.userList" :key="item.id">
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
import vTableClick from '@/directives/tableClick';
const socket = io('http://localhost:3000')
const state = reactive({
  userList :[],
  status:false,
  field:'',
  index:-1,
  socket:socket
})

const statusText = computed(()=>{
  return state.status?'正在编辑中...':''
})

socket.on('loadData',(data)=>{
  console.log(data);
  state.userList = data
})
socket.on('changeStatus',(status)=>{
  state.status = status
})

socket.on('changeInputValue',({index,field,value})=>{
  state.userList.forEach((item,idx)=>{
    if(index == idx){
      item[field] = value
    }
    return item
  })
})
</script>
<style>
td{
  position: relative;
}
</style>
