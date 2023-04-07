import Transfer from './Transfer'
const components = {
  Transfer
}

export default {
  install(app,options){
    for (const comp in components) {
      app.component(comp,components[comp])
    }
  }
}