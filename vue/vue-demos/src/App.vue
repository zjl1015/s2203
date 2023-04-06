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
        phone_name:'红米 40 pro',
        disabled:false
      },
      {
        id:6,
        phone_name:'红米P40 pro',
        disabled:true
      },
      {
        id:7,
        phone_name:'红米P40 pro',
        disabled:false
      },
      {
        id:8,
        phone_name:'红米Mate xs2 pro',
        disabled:false
      }
    ]
  },
  {
    title:'Iphone',
    data:[
      {
        id:9,
        phone_name:'Iphone  40 pro',
        disabled:false
      },
      {
        id:10,
        phone_name:'Iphone P40 pro',
        disabled:true
      },
      {
        id:11,
        phone_name:'Iphone P40 pro',
        disabled:false
      },
      {
        id:12,
        phone_name:'Iphone Mate xs2 pro',
        disabled:false
      }
    ]
  }
]
</script>
<template>
  <div>
    <transfer :data="data" right-title="已选择机型"></transfer>
  </div>
</template>
<style scoped>

</style>