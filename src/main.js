// usando IMPORT
   import Vue from 'vue'
   import App from './App.vue'
   import vuetify from './plugins/vuetify';
   import Swal from 'sweetalert2'




// funciones globales de proyecto que serán compartidas  en el proyecto, utilizando vue.prototype, es una forma de operacion
// similar a Vuex. se pueden definir funciones y variables
   import funciones_compartidas from './plugins/funciones_compartidas';
//
// libreria externa de NPM, los componentes serán utilizados en el proyecto, se debe instalar antes con npm install srturo12
// se importa la libreria
   import *  as arturo21 from 'arturo21';

// importando vue-router
   import VueRouter from 'vue-router';

   import 'bootstrap/dist/css/bootstrap.min.css';
//   var bootstrap = require('bootstrap/dist/css/bootstrap.min.css')

Vue.config.productionTip = false

// importar componentes a utilizar
import Inicio from './components/Inicio'
import Login from './components/Login'
import Productos from './components/Productos'
import Crear_producto from './components/Crear_producto'
import Editar_producto from './components/Editar_producto'
import Borra_producto from './components/Borra_producto'
import Consulta_producto from './components/Consulta_producto'
import Compras from './components/Compras'
import Contacto from './components/Contacto'
// import Tboton from './components/Tboton'  Se importa componente y estará disponible  en todo el proyecto


// crear componentes a utilizar
Vue.component('Inicio',Inicio)
Vue.component('Login',Login)
Vue.component('Productos',Productos)
Vue.component('Crear_producto',Crear_producto)
Vue.component('Editar_producto',Editar_producto)
Vue.component('Borra_producto',Borra_producto)
Vue.component('Consulta_producto',Consulta_producto)
Vue.component('Compras',Compras)
Vue.component('Contacto',Contacto)
// Vue.component('Tboton',Tboton)      Se define componente para que esté  disponible en todo el proyecto

import Vuex from 'vuex';
 
// Vuex permite definir un entorno de trabajo global accesible desde todos los componentes, por ejemplo variables globales
// evita que todo se haga a través de parámetros (PROPs)


// se define el uso de la libreria
Vue.use({install: arturo21.install});

// Funciones a ser compartidas por los componentes
Vue.use(funciones_compartidas)   


//uso de Vuex para variables globales
Vue.use(Vuex);

const store = new Vuex.Store({
        state: {
          Iduser: 'User',
          userAccesos:[],

          modulo:null,
          funcionalidad:null,
          

          signedUp:false,
          activa_footer_carrito: false,
          elementoCarrito:{
                  id:null,
                  descripcion:null,
                  precio: null,
                  cantidad:null
          },
          carrito: [],
          suma_items:0,
          suma_total:0                  
         } 
          
 })


import axios from 'axios';
let url = 'http://localhost:3000/api/validaAcceso';  


    

 // valida accesos

async  function validaAccPuntual(usuario,modulo,funcionalidad) { 
               
               var  userInfo = {
                 id_usuario: usuario,
                 modulo: modulo,
                 funcionalidad: funcionalidad, 
                 autorizado: 1
               }
               
               const respuesta = await axios.get(url, { params: userInfo }) 
               
               return respuesta
                          
    }


    

//uso del VueRouter
Vue.use(VueRouter);

// se crean rutas

const routes= [
{path:'/', component: Inicio},
{path:'/inicio', component: Inicio},
{path:'/login', component: Login, name: 'Login', beforeEnter: (to,from,next) => {
                                           
                                           if (!store.state.signedUp) {
                                             next()

                                           } else {
                                             next({ path: '/inicio' })
                                           }
                                        }},
{path:'/productos', component:Productos, beforeEnter: (to,from,next) => {
                                            
                                            if (store.state.signedUp) {
                                               store.state.modulo='ventas';
                                               store.state.funcionalidad='abc de productos';  
                                               validaAccPuntual(store.state.Iduser,
                                                                        store.state.modulo,
                                                                        store.state.funcionalidad                                                                                                                         
                                                                        )
                                               .then(respuesta => {
                                                  console.log('decidiendo.........',respuesta.data.length )
                                                  if (respuesta.data.length==!0) {
                                                    next()
                                                  } else {
                                                    Swal.fire     ({
                                                    title: 'Acceso no permitido',
                                                    icon: 'error' })
                                                  }

                                               })                                  
                                               
                                               
                        
                                            }                                            
                                            else {
                                             next({ path: '/login' })
                                            }
                                        }},
{path:'/crear', component:Crear_producto, name: 'Crear_producto',
                                            beforeEnter: (to,from,next) => {
                                            if (store.state.signedUp) {
                                               store.state.modulo='ventas';
                                               store.state.funcionalidad='abc de productos-crear';  
                                               validaAccPuntual(store.state.Iduser,
                                                                        store.state.modulo,
                                                                        store.state.funcionalidad                                                                                                                         
                                                                        )
                                               .then(respuesta => {
                                                  console.log('decidiendo.........',respuesta.data.length )
                                                  if (respuesta.data.length==!0) {
                                                    next()
                                                  } else {
                                                    Swal.fire     ({
                                                    title: 'Acceso no permitido',
                                                    icon: 'error' })
                                                  }

                                               })                                  
                                               
                                               
                        
                                            }                                            
                                            else {
                                             next({ path: '/login' })
                                            }
                                           
                                        }},

{path:'/editar/:id', component:Editar_producto, name: 'Editar_producto',
                                            beforeEnter: (to,from,next) => {
                                            if (store.state.signedUp) {
                                               store.state.modulo='ventas';
                                               store.state.funcionalidad='abc de productos-editar';  
                                               validaAccPuntual(store.state.Iduser,
                                                                        store.state.modulo,
                                                                        store.state.funcionalidad                                                                                                                         
                                                                        )
                                               .then(respuesta => {
                                                  console.log('decidiendo.........',respuesta.data.length )
                                                  if (respuesta.data.length==!0) {
                                                    next()
                                                  } else {
                                                    Swal.fire     ({
                                                    title: 'Acceso no permitido',
                                                    icon: 'error' })
                                                  }

                                               })                                  
                                               
                                               
                        
                                            }                                            
                                            else {
                                             next({ path: '/login' })
                                            }
                                        }},
{path:'/borrar/:id', component:Borra_producto, name: 'Borra_producto',
                                            beforeEnter: (to,from,next) => {
                                            if (store.state.signedUp) {
                                               store.state.modulo='ventas';
                                               store.state.funcionalidad='abc de productos-borrar';  
                                               validaAccPuntual(store.state.Iduser,
                                                                        store.state.modulo,
                                                                        store.state.funcionalidad                                                                                                                         
                                                                        )
                                               .then(respuesta => {
                                                  console.log('decidiendo.........',respuesta.data.length )
                                                  if (respuesta.data.length==!0) {
                                                    next()
                                                  } else {
                                                    Swal.fire     ({
                                                    title: 'Acceso no permitido',
                                                    icon: 'error' })
                                                  }

                                               })                                  
                                               
                                               
                        
                                            }                                            
                                            else {
                                             next({ path: '/login' })
                                            }
                                            
                                        }},                                        
{path:'/consulta', component:Consulta_producto,name: 'Consulta_producto', 
                                           beforeEnter: (to,from,next) => {
                                           if (store.state.signedUp) {
                                               store.state.modulo='ventas';
                                               store.state.funcionalidad='abc de productos-consultar';  
                                               validaAccPuntual(store.state.Iduser,
                                                                        store.state.modulo,
                                                                        store.state.funcionalidad                                                                                                                         
                                                                        )
                                               .then(respuesta => {
                                                  console.log('decidiendo.........',respuesta.data.length )
                                                  if (respuesta.data.length==!0) {
                                                    next()
                                                  } else {
                                                    Swal.fire     ({
                                                    title: 'Acceso no permitido',
                                                    icon: 'error' })
                                                  }

                                               })                                  
                                               
                                               
                        
                                            }                                            
                                            else {
                                             next({ path: '/login' })
                                            } 
                                           
                                        }},             
   
{path:'/compras', component:Compras,
  props: {
      url: 'http://localhost:3000/api/productos/',
      url2:'http://localhost:3000/api/imagenes/'
  }, 
                                        beforeEnter: (to,from,next) => {
                                        if (store.state.signedUp) {
                                               store.state.modulo='ventas';
                                               store.state.funcionalidad='compras';  
                                               validaAccPuntual(store.state.Iduser,
                                                                        store.state.modulo,
                                                                        store.state.funcionalidad                                                                                                                         
                                                                        )
                                               .then(respuesta => {
                                                  console.log('decidiendo.........',respuesta.data.length )
                                                  if (respuesta.data.length==!0) {
                                                    next()
                                                  } else {
                                                    Swal.fire     ({
                                                    title: 'Acceso no permitido',
                                                    icon: 'error' })
                                                  }

                                               })                                  
                                               
                                               
                        
                                            }                                            
                                            else {
                                             next({ path: '/login' })
                                            } 
                                           
                                       
                                        
                                        }},
{path:'/contacto', component: Contacto, name:'arranque'},

]

// se crea instancia de VueRouter
const router = new VueRouter ({
	routes,
  mode: 'history'

})




new Vue({
  vuetify,
  store,
  router,  
  data: function() {
            
        return { 
                ejemplo:5

        }
   }, 
 
   render: h => h(App),
 

   mounted () {

      
//     this.ejemplo=15;
//     console.log('valores......', this.ejemplo);  // será accesible en un subcomponente con this.$root.ejemplo
//     ver ejemplo de uso en componente contacto esquema similar a VUEX
     
    }
 

}).$mount('#app')

