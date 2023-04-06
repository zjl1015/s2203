

function countDown(time,ele) {
  const [minutes, seconds] = time.split(':');
  let remainingTime = (parseInt(minutes) * 60) + parseInt(seconds);
  const interval = setInterval(() => {
    remainingTime--;
    var result = ''
    if (remainingTime < 0) {
      const minutes = String(Math.floor(Math.abs(remainingTime) / 60)).padStart(2, '0');
      const seconds = String(Math.floor(Math.abs(remainingTime) % 60)).padStart(2, '0');
      result = `-${minutes}:${seconds}`
    } else {
      const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
      const seconds = String(Math.floor(remainingTime % 60)).padStart(2, '0');
      result = `${minutes}:${seconds}`
    }
    ele.innerHTML = result
  }, 1000);
}


window.addEventListener('DOMContentLoaded',()=>{
  const countDownEle = document.querySelector('#count-down')
  countDown('08:00',countDownEle)
})

// // 用户右键菜单
window.addEventListener('contextmenu',(event)=>{
  event.preventDefault()
  window.electronApi.showCustomMenu()
})

document.querySelector('#count-down').addEventListener('contextmenu',(event)=>{
  console.log("123");
  event.preventDefault()
})
