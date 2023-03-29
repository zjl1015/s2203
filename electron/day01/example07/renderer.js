
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process . Click to log the console'
const CLICK_MESSAGE = 'Notification clicked'

new Notification(NOTIFICATION_TITLE,{body:NOTIFICATION_BODY})
.onclick = ()=>document.getElementById('output').innerText = CLICK_MESSAGE