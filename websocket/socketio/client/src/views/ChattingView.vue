<template>
  <div>chatting</div>
 </template>

 <script setup>
 import { io } from "socket.io-client";
 import {useRouter} from 'vue-router'
 const router = useRouter()
 console.log("router=>",router);
 const socket = io("http://localhost:3000",{
   query:{
     username:router.currentRoute.value.query.username
   }
 })
 socket.on('connect',()=>{
   console.log("client connect");
 })
 socket.on('disconnect',()=>{
   console.log("client disconnect");
 })
 </script>
 