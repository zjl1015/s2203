<script setup>
const data = [
  {
    title:'华为',
    data:[
      {
        id:1,
        phone_name:'Mate 40 pro',
        disabled:false
      },
      {
        id:2,
        phone_name:'P40 pro',
        disabled:true
      },
      {
        id:3,
        phone_name:'P40 pro',
        disabled:false
      },
      {
        id:4,
        phone_name:'Mate xs2 pro',
        disabled:false
      }
    ]
  },
   {
    title:'小米',
    data:[
      {
        id:5,
        phone_name:'红米pro',
        disabled:false
      },
      {
        id:6,
        phone_name:'红米 pro1',
        disabled:true
      },
      {
        id:7,
        phone_name:'红米pro2',
        disabled:false
      },
      {
        id:8,
        phone_name:'红米pro3',
        disabled:false
      }
    ]
  },
  {
    title:'Iphone',
    data:[
      {
        id:9,
        phone_name:'Iphone15',
        disabled:false
      },
      {
        id:10,
        phone_name:'Iphone16',
        disabled:true
      },
      {
        id:11,
        phone_name:'Iphone17',
        disabled:false
      },
      {
        id:12,
        phone_name:'Iphone18',
        disabled:false
      }
    ]
  }
]
import Test from './views/Test.vue';
</script>
<template>
  <div>
    <!-- <transfer :data="data" right-title="已选择机型"></transfer> -->
    <!-- <Transfer :data="data" right-title="已选机型"></Transfer> -->
    <Test></Test>
  </div>
</template>
<style scoped>

</style>