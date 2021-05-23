<template>
  <v-container>
    <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">BORRA PRODUCTO</h1>       
      </v-col>     
    </v-row>
    
    <form v-on:submit.prevent="regresarLista()">
        <v-container>
            <v-row>

              <v-col cols="12" md="3">
                <v-text-field v-model="producto.id"
                        label="id"
                        outlined
                        disabled 
                        
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="producto.descripcion"
                        label="Descripción"
                        outlined
                        disabled  
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">  
                <v-text-field
                        v-model="producto.costo"        
                        label="Costo"
                        type="number"                
                        prefix="$"
                        outlined
                        disabled        
                    ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">       
                 <v-text-field
                        v-model="producto.precio"        
                        label="Precio"
                        type="number"                
                        prefix="$"
                        outlined
                        disabled        
                    ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">   
                    <v-text-field
                        v-model="producto.stock"        
                        label="Stock"
                        type="number"
                        outlined
                        disabled        
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
                    

           </v-row>
           <v-row>
         
              <v-col cols="12" md="3"> 

                    <v-card-actions>
                       <v-btn color="warning" class="mr-4" v-on:click.prevent="borraProducto()">Confirmar</v-btn>  
                       <v-btn color="warning" class="mr-4" v-on:click.prevent="regresarLista()">Salir</v-btn>      
                    </v-card-actions>
                    
              </v-col>
           
           </v-row>
        </v-container>
   </form>
      
  </v-container>
</template>

<script>

// link hacia ruta de apirest
let url = 'http://localhost:3000/api/productos/'
let url2 = 'http://localhost:3000/api/imagenes/';


import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name:'Borra_producto',
    
    mounted(){
       this.consultaInf()
      
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
          imagen_nombre:null,
          imagen:null
        },
        wimagen_url:null,
        wimagen_nombre:null
      }
    },

    methods:{
     consultaInf() {
       console.log('parametros.....',this.$route.params)
       this.producto.id = this.$route.params.id;
       console.log('xxxxxxxxxxxxxx  ', this.producto.id)
      
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

     borraProducto(){            
            axios.delete(url+this.producto.id)
            .then(()=>{
                    Swal.fire({
                             title: 'Producto borrado',
                             icon: 'success',
                             showConfirmButton: false,
                             timer: 2500
                                                })
                    var router =  this.$router;
                    router.push('/productos'); 
            })
            .catch(function(error){
                console.log(error);
            });    
        },

     regresarLista(){
         var router =  this.$router;
         router.push('/productos'); 
      
     }
    }
}
</script>