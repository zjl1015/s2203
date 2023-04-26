<template>
  <i>
    {{ size }}
    {{ color }}
    <!-- <slot></slot> -->
  </i>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type {Props as PropsI} from './interface'
// 运行时声明
// const props = defineProps({
//   size:{
//     type:[String,Number],
//     required:true
//   },
//   color:{
//     type:String
//   }
// })



interface Props {
  size:string | number,
  color?:string
}
// const props2 = defineProps<{size:string | number,color?:string}>()
// const props3 = defineProps<Props>()
// // 基于类型的声明
// const props = withDefaults(defineProps<{size:string | number,color?:string}>(),{
//   size:15,
//   color:'#ff00ff'
// })

const props4 = withDefaults(defineProps<PropsI>(),{
  size:40,
  color:'#ffff00'
})

const style = computed(()=>{

})
</script>