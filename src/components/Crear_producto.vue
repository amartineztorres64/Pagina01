<template>
    <v-container>
     <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">ALTA DE PRODUCTOS</h1>       
      </v-col>     
    </v-row>
    
  
        <form>
        <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="producto.descripcion"
                        label="Descripción"
                        outlined
                        required   
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
                        label="Fecha ult/mod"
                        outlined
                        disabled
                              
                    ></v-text-field>
              </v-col>
          </v-row>  

          <v-row>
                  
                  <v-col cols="12" md="6">
                    <v-file-input v-model="producto.imagen" type="file" v-on:change="cambiaImagen()" 
                    accept=".jpg,.png" outlined show-size prepend-icon="mdi-card-search" placeholder="Selecciona imagen de Producto">{{producto.imagen}}</v-file-input>
                  </v-col>

                  <v-col cols="12" md="5">
                    <v-text-field v-model="producto.imagen_nombre" label="Archivo c/imagen" outlined disabled >{{producto.imagen_nombre}}</v-text-field>
                  </v-col>

                  <v-col cols="12" md="1">
                  <!-- boton para borrar articulos -->
                    <v-tooltip top>  
                       <template v-slot:activator="{on}">
                         <v-btn class="error" dark small fab v-on:click="borraImagen()" v-on="on"><v-icon>mdi-delete-forever</v-icon></v-btn>
                       </template>
                       <span>Eliminar imagen</span>  
                    </v-tooltip>
                  </v-col>   

          </v-row>

          <v-row>
                  <v-col id="view" cols="12" md="6"> 
                      <div> 
                         <img :src="wimagen" alt="Imagen" style="min-height: 200px;  max-height:200px"> 
                      </div>  
                    </v-col>
          </v-row>

                     
          <v-row>
              <v-col cols="12" md="3"> 
                    <v-card-actions>
                        <v-btn color="warning" class="mr-4" v-on:click.prevent="guardarProducto()">Guardar</v-btn>    
                        <v-btn color="warning" class="mr-4" v-on:click.prevent="ignorarCambio()">Ignorar</v-btn>
                        <v-btn color="warning" class="mr-4" v-on:click.prevent="salir()">Salir</v-btn>     
                    </v-card-actions>
              </v-col>
          </v-row>
        </v-container>
        </form>
    
    

    </v-container>
</template>


<script>

// links hacia ruta de apirest
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

// acceso a BD  
import axios from 'axios';

//gestion de alertas
import Swal from 'sweetalert2'

export default {
    name:'Crear_producto',
    data(){
        return{
                producto:{
                descripcion:null,
                costo:0,
                precio:0,
                stock:0,
                fecha_alta:wFecha,
                imagen:null,
                imagen_nombre:null                
                        },
                wimagen:null
        };
    },
    methods:{
        guardarProducto(){
          if (this.producto.descripcion === null) {
            Swal.fire({
                        title: 'Debe proporcionar descripción',
                        icon: 'error'
                      })
          }
          else {
          
          let parametros = {descripcion:this.producto.descripcion,
                                  costo:this.producto.costo,
                                  precio:this.producto.precio,
                                  stock:this.producto.stock,
                                  imagen_nombre:this.producto.imagen_nombre,
                                  fecha_alta:this.producto.fecha_alta}
                    
          axios.post(url,parametros)
           .then(()=>{
   
               if (this.producto.imagen) {                                     
                  const fd = new FormData();
                  fd.append('archivo',this.producto.imagen,this.producto.imagen.name);                                        axios.post(url2, fd);                                     
               }    
               this.wimagen = url2+this.producto.imagen_nombre;
               Swal.fire({
                             title: 'Producto Creado',
                             icon: 'success',
                             showConfirmButton: false,
                             timer: 2500
                                                })
           })
           .catch(function(error){
              console.log(error);
           });
           }
        },

        ignorarCambio(){
         this.producto.descripcion=null;
         this.producto.costo=0;
         this.producto.precio=0;
         this.producto.stock=0;
         this.producto.imagen=null;
         this.producto.imagen_nombre=null;
         this.wimagen=null
        
        },

        salir(){
         var router =  this.$router;         
         router.push('/productos'); 
        
        },
       
        cambiaImagen() {

                if (this.producto.imagen) {
                       if (this.producto.imagen_nombre !== this.producto.imagen.name) {
                          this.producto.imagen_nombre = this.producto.imagen.name;
                       }
                }
                
                              
        },

        borraImagen(){
          this.producto.imagen = null;
        }
    }
}
</script>