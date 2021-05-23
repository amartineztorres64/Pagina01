<template>
  
  <v-container>
    <meta charset="utf-8">
    <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">EDICIÓN DE PRODUCTOS</h1>       
      </v-col>     
    </v-row>
    
    <form>
        <v-container>
            <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="producto.id"
                            label="Id"
                            outlined
                            disabled  
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="producto.descripcion"
                            label="Descripción"
                            outlined
                            required   
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">  
                    <v-text-field
                            v-model="producto.costo"        
                            label="Costo"
                            type="number"                
                            prefix="$"
                            outlined
                            required        
                        ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">       
                     <v-text-field
                            v-model="producto.precio"        
                            label="Precio"
                            type="number"                
                            prefix="$"
                            outlined
                            required        
                        ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">   
                        <v-text-field
                            v-model="producto.stock"        
                            label="Stock"
                            type="number"
                            outlined
                            required        
                        ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">   
                        <v-text-field
                            v-model="producto.fecha_alta"        
                            label="Fecha alta"
                            outlined
                            disabled
                                  
                        ></v-text-field>
                  </v-col>
              </v-row>

              <v-row>
                    
                    <v-col id="view" cols="12" md="6"> 
                      <div> 
                         <img :src="wimagen_url" alt="Imagen" style="min-height: 200px;  max-height:200px"> 
                      </div>  
                    </v-col>
                    <v-col cols="12" md="3">
                       <v-text-field v-model="wimagen_nombre" label="Archivo c/imagen" outlined disabled >{{wimagen_nombre}}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="1">
                       <h6>ACTUAL</h6>
                    </v-col>

               </v-row>


              <v-row>                  
                  <v-col cols="12" md="6">
                    <v-file-input v-model="producto.imagen" type="file" v-on:change="cambiaImagen()" accept=".jpg,.png" outlined show-size placeholder="Seleccione nueva imagen Producto">{{producto.imagen}}</v-file-input>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field v-model="producto.imagen_nombre" label="Archivo c/imagen" outlined disabled >{{producto.imagen_nombre}}</v-text-field>
                  </v-col>

                  <v-col cols="12" md="1">
                       <h6>NUEVO</h6>
                  </v-col>

                  <v-col cols="12" md="2">
                  <!-- boton para borrar articulos -->
                    <v-tooltip top>  
                       <template v-slot:activator="{on}">
                         <v-btn class="error" dark small fab v-on:click="borraImagen()" v-on="on"><v-icon>mdi-delete-forever</v-icon></v-btn>
                       </template>
                       <span>Eliminar imagen</span>  
                    </v-tooltip>
                  </v-col>
              </v-row>

              <v-col cols="12" md="3"> 

                    <v-card-actions>
                       <v-btn color="warning" class="mr-4" v-on:click.prevent="guardarProducto()">Guardar</v-btn>  
                       <v-btn color="warning" class="mr-4" v-on:click.prevent="ignorarCambio()">Salir</v-btn>      
                    </v-card-actions>
                    
              </v-col>
          
        </v-container>
   </form>
      
  </v-container>
</template>

<script>

// link hacia ruta de apirest

let url = 'http://localhost:3000/api/productos/'

let url2 = 'http://localhost:3000/api/imagenes/';

// fecha para registro de alta


var hoy =new Date();
   
   var wFecha=hoy.getFullYear()+'-'
     
   if ((hoy.getMonth()+1)<10) {
      wFecha = wFecha + '0' + (hoy.getMonth()+1)+'-'
   } else {
      wFecha = wFecha + (hoy.getMonth()+1)+'-'
   }
   
   if (hoy.getDate().toString().length === 1) {
      wFecha=wFecha+'0'+hoy.getDate();
   } else {
      wFecha=wFecha+hoy.getDate();
   }


import axios from 'axios';

import Swal from 'sweetalert2'

export default {
    name:'Editar_producto',
    mounted(){
      
      this.producto.id = this.$route.params.id;
      
      console.log('parametros.....',this.$route.params)
      
      axios.get(url+this.producto.id)

      .then(r =>{
        
          this.producto = r.data[0];

          this.wimagen_nombre = r.data[0].imagen_nombre;
          this.wimagen_url=url2 + this.wimagen_nombre
        
        })
        .catch(function(error){
        console.log(error);
        });


    },


    data(){
      return{
        id:null,
        producto:{
          id:'',
          descripcion:'',
          costo:'',
          precio:'',
          stock:'',
          fecha_alta:'',
          imagen_nombre:'',
          imagen:null
        },
          wimagen_url:null,
          wimagen_nombre:null
          
          
      }
    },

    methods:{
     guardarProducto(){
         var router =  this.$router;
         let parametros = {id:this.producto.id, descripcion:this.producto.descripcion,
                                  costo:this.producto.costo,
                                  precio:this.producto.precio,
                                  stock:this.producto.stock,
                                  imagen_nombre:this.producto.imagen_nombre,
                                  fecha_alta:wFecha}

        
        axios.put(url+this.producto.id,parametros)

        .then(function(){
           Swal.fire({
                             title: 'Producto Modificado',
                             icon: 'success',
                             showConfirmButton: false,
                             timer: 2500
                                                })
           router.push('/productos'); 
        })
        .catch(function(error){
        console.log(error);
        });
      },
    
    ignorarCambio(){
         var router =  this.$router;         
         router.push('/productos'); 
        
    },

    cambiaImagen(){
       if (this.producto.imagen) {
          this.producto.imagen_nombre = this.producto.imagen.name;
         
      }
    },
    borraImagen(){
      this.producto.imagen=null;
      this.producto.imagen_nombre=null;
    } 
  }
}
</script>