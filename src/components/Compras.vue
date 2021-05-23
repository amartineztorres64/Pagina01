<template>

  <div id="app">
    <v-app>

    <div class="container-fluid teal lighten-5 contenedor">
       <div class="row mt-0 pt-0">
         <div class="col-12 col-md-3 py-0">
             <div class="input-group align-baseline"> 
               <input type="text" class="form-control m-0 p-0" maxlength="30" placeholder="producto" v-model="articulo" v-on:keyup.enter="productosDisponibles(articulo)">
               <v-btn  class="mt-2 ml-3" fab small color="white" v-on:click="productosDisponibles(articulo)">
                   <v-icon text="">mdi-magnify</v-icon>
               </v-btn>  
             </div> 
         </div>

         <div class="col-12 col-md-3 offset-5">
                <span><v-icon  large>mdi-cart-plus</v-icon></span> 
         </div>

        </div>

        <div class="row">
         <div class="col-12 col-md-8 pt-4" >
            <div class="row" id="cards" > 
              
              <div class="col-8 mb-2 col-md-2 px-2 py-1 mb-1" v-for="producto in this.productos" :key="producto.id" >
                   <div class="card grey lighten-5" style="height:260px;"  >
                      <img  :src="producto.imagen_nombre" alt="Imagen" class="img-card-top " style="min-height: 100px; max-height:100px">
                      <div class="card-body text-center">
                              <p class="small my-2" style="height:30px">{{producto.descripcion[0].toUpperCase()+producto.descripcion.slice(1)}}<p>
                              <p  class="my-2">$<span>{{producto.precio}}</span></p>
                              <button class="btn btn-outline-info btn-block btn-sm" v-on:click="itemsCarrito(producto.id,producto.descripcion,producto.precio)"><span class="small">Comprar</span></button>
                      </div>
                  </div>      
              </div>
             
            </div> 
         </div>

         <div class="col-12 col-md-4 pt-2"> 
            
           <table class="table table-sm table-hover table-responsive">
               <thead class="bg-info text-white">
                 <tr>
                     <th>Artículo</th>
                     <th>Cantidad</th>
                     <th>Precio</th>
                     <th>Acción</th>
                     <th>Total</th>
                 </tr>
                </thead>
               <tbody id="items">
               
                <tr class="text-primary" v-for="item in $store.state.carrito" :key="item.id"> 
                      <td class="text-capitalize small text-primary">{{item.descripcion}}</td>
                      <td class="small">{{item.cantidad}}</td>
                      <td class="small">$ <span>{{item.precio}}</span></td>
                      <td>
                         <button class="btn btn-info btn-sm small" v-on:click="afecta_cantidad_suma(item.id,item.descripcion,item.cantidad,item.precio)">
                         +
                        </button>
                         <button class="btn btn-danger btn-sm small" v-on:click="afecta_cantidad_resta(item.id,item.descripcion,item.cantidad,item.precio)">
                         -
                        </button>
                      </td>
                      <td  class="small">$ <span>{{item.cantidad*item.precio}}</span></td>
                </tr>
                                    
                </tbody>

                <tfoot v-show="this.$store.state.suma_items>0">
                  
                   <tr  class="text-primary">
                       <td class="font-weight-bold small">Total productos</td>
                       <td  class="small">{{this.$store.state.suma_items}}</td>
                       <td>
                          <button class="btn btn-danger btn-sm small" v-on:click="limpia_carrito()" id="vaciar-carrito">
                                 Vaciar todo
                          </button>
                       </td>
                       <td></td>
                       <td class="font-weight-bold small"> $ <span>{{this.$store.state.suma_total}}</span></td>
                  </tr>
                
                </tfoot>    
         
          </table>
        
              
        </div>  

      </div>

    </div>
    </v-app>
  </div>

</template>


<script>
  
  
  import axios from 'axios'
 
   
  export default {
      name:'Compras',  
      props: ['url', 'url2'],
      data: function() {
        return {            
                productos: [],
                producto:{
                    id: null,
                    descripcion:null,
                    costo:null,
                    precio:null,
                    stock:null,
                    imagen_nombre:null,
                    imagen: null,
                    fecha_alta:'',
                        },
                 articulo: null,
                  
                               
               }
      },
      
      mounted: function() {
                 
       this.productosDisponibles(this.articulo)
           

       },  
   

       methods:{   

            
            //extrae poductos de la BD
            //utiliza cliente de HTTP (AXIOS) para acceder a los registros de la tabla vía GET

            productosDisponibles:function(articulo){
              
               this.productos.splice(0);

               console.log(this.url);
               console.log(this.url2);

               axios.get(this.url)
               .then (response => {     // response contiene un objeto con todos los datos
      //             se almacena en el objeto productos la informCIÓN, PRODUCTOS ES UN OBJETO DE OBJETOS
                      console.log('numero de registros..........', response.data.length)
                      var reg = 0;
                     for (var i=0 ; i < response.data.length; i++)
                      {
                          
                            if (this.articulo===null) {   // no hay criterio de seleccion
                                 this.productos.push(response.data[i]);
                                 if (response.data[i].imagen_nombre !== null) {
                                   this.productos[i].imagen_nombre= this.url2 + this.productos[i].imagen_nombre
 //                                   console.log('nombre  ', this.productos[i].imagen_nombre)
                                 }                                         
                                 
                            } else {
                                if (response.data[i].descripcion.indexOf(articulo) === 0) { // verifica si coincide patron
                                   this.productos.push(response.data[i]);  
                                   if (response.data[i].imagen_nombre !== null) {
                                     this.productos[reg].imagen_nombre= this.url2 + this.productos[reg].imagen_nombre
//                                     console.log('nombre ref ', this.productos[reg].imagen_nombre)
                                   }    
                                   reg=reg+1;                  
                                } 
                            }
                         
                      }
                      console.log('productos........',this.productos)
                        
                })                     
            }, 

            
            itemsCarrito: function(id,descripcion,precio) {
              console.log('descripcion   ', descripcion)            
              this.$store.state.elementoCarrito = {
              id: id,
              descripcion: descripcion,
              precio: precio,
              cantidad: 1
                                                  }
 
//           si el elemento seleccionado ya existe en el elemento carrito se le incrementa en 1
             const indice = this.$store.state.carrito.findIndex(elemento => elemento.id === id);
             
             if (indice === -1) {                
                 this.$store.state.carrito.push(this.$store.state.elementoCarrito)} 
             else {
                 
                 this.$store.state.elementoCarrito.cantidad=this.$store.state.carrito[indice].cantidad + 1
                 this.$store.state.carrito.splice(indice,1,this.$store.state.elementoCarrito)
             }

             //activa total del carrito
             this.$store.state.activa_footer_carrito=true;

             // suma totales
             this.$store.state.suma_items=0;
             this.$store.state.suma_total=0;

             for (var i=0; i < this.$store.state.carrito.length; i++) {
                 this.$store.state.suma_items+=this.$store.state.carrito[i].cantidad;
                 this.$store.state.suma_total+=(this.$store.state.carrito[i].cantidad * this.$store.state.carrito[i].precio);
             }

                           
            }, 
            
            afecta_cantidad_suma: function (id,descripcion,cantidad,precio) {
               
                   this.$store.state.elementoCarrito = {
                      id: id,
                      descripcion: descripcion,
                      precio: precio,
                      cantidad: 1
                                                       }
 
                   const indice = this.$store.state.carrito.findIndex(elemento => elemento.id === id);             
                   this.$store.state.elementoCarrito.cantidad=this.$store.state.carrito[indice].cantidad + 1
                   this.$store.state.carrito.splice(indice,1,this.$store.state.elementoCarrito)
            
             //activa total del carrito
                   this.$store.state.activa_footer=true;

             // suma totales
                   this.$store.state.suma_items=0;
                   this.$store.state.suma_total=0;

                   for (var i=0; i < this.$store.state.carrito.length; i++) {
                     this.$store.state.suma_items+=this.$store.state.carrito[i].cantidad;
                     this.$store.state.suma_total+=(this.$store.state.carrito[i].cantidad * this.$store.state.carrito[i].precio);
                   }
               

              },

               afecta_cantidad_resta: function (id,descripcion,cantidad,precio) {
               
                   this.$store.state.elementoCarrito = {
                      id: id,
                      descripcion: descripcion,
                      precio: precio,
                      cantidad: 1
                                                       }
 
                   const indice = this.$store.state.carrito.findIndex(elemento => elemento.id === id);

                   if (this.$store.state.carrito[indice].cantidad > 1) {
                      this.$store.state.elementoCarrito.cantidad=this.$store.state.carrito[indice].cantidad -  1
                      this.$store.state.carrito.splice(indice,1,this.$store.state.elementoCarrito)
                   } else {
                      this.$store.state.carrito.splice(indice,1);
                     
                   }
                                
             // suma totales
                   this.$store.state.suma_items=0;
                   this.$store.state.suma_total=0;

                   for (var i=0; i < this.$store.state.carrito.length; i++) {
                     this.$store.state.suma_items+=this.$store.state.carrito[i].cantidad;
                     this.$store.state.suma_total+=(this.$store.state.carrito[i].cantidad * this.$store.state.carrito[i].precio);
                   }
                   if  (this.$store.state.suma_items === 0 ) {
                        this.$store.state.activa_footer=false
                   }

               },

              limpia_carrito: function() {
                           
                this.$store.state.carrito =[];
                this.$store.state.activa_footer=false;
                this.$store.state.suma_items=0;
                this.$store.state.suma_total=0; 
 
       
              
             }
   
          
                           
      }

  };
</script>


<style scoped>

  .contenedor {
           
   width: 100%;         
              } 

  .titulo {
    background-color: #0000FF;
  }

 

  .scrollProd {
    max-height: 70%;
    overflow-y: scroll;
  }

  
 

  </style>