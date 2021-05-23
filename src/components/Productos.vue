<template>
    
    <v-container class="contenedor">
    <v-row class="text-center ">      
      <v-col class="mb-0 mt-0">
        <h2 class="display-2 font-weight-bold my-0 py-0">
          Listado de Productos
        </h2>       
      </v-col>        
    </v-row>
    <v-row class="my-0 py-0">
    <v-col class="mb-0 mt-0">
       <v-btn :to="{name:'Crear_producto'}" class="mx-2" fab dark small color="indigo">
         <v-icon dark>mdi-plus</v-icon>
       </v-btn>
    </v-col>
    </v-row>
    <v-row class="text-center">
    <v-col cols="12" class="my-0">
        <v-simple-table fixed-header class="elevation-3">
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-center">ID</th>
            <th class="text-center">Descripción</th>
            <th class="text-center">Costo</th>
            <th class="text-center">Precio</th>
            <th class="text-center">Stock</th>
            <th class="text-center">Fecha_alta</th>
            <th class="text-center">imagen_nombre</th>
            <th class="text-center">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="articulo in productos" :key="articulo.id">
                <td>{{articulo.id}}</td>
                <td>{{articulo.descripcion[0].toUpperCase()+articulo.descripcion.slice(1)}}</td>
                <td>{{articulo.costo}}</td>
                <td>{{articulo.precio}}</td>
                <td>{{articulo.stock}}</td>
                <td>{{articulo.fecha_alta.slice(0,10)}}</td>
                <td>{{articulo.imagen_nombre}}</td>
                <td>
                    <v-tooltip top>
                      <template v-slot:activator="{on}">  
                        <v-btn :to="{name:'Consulta_producto', params:{idProd:articulo.id}}" fab small color="success" v-on="on"><v-icon>mdi-view-list</v-icon>
                        </v-btn>
                      </template>
                      <span>Consulta Detalle</span> 
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{on}">  
                        <v-btn :to="{name:'Editar_producto', params:{id:articulo.id}}" fab small color="primary" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
                      </template>
                      <span>Editar</span> 
                    </v-tooltip>  
                    <v-tooltip top>
                      <template v-slot:activator="{on}">
                        <v-btn :to="{name:'Borra_producto', params:{id:articulo.id}}" fab small color="error" v-on="on"><v-icon>mdi-delete</v-icon></v-btn>
                      </template>
                      <span>Borrar</span> 
                    </v-tooltip>  
                </td>
            </tr>
         </tbody>   
        </template>
        </v-simple-table>
    </v-col>
    </v-row>
    <!-- ventana de diálogo para eliminar registros -->
    <!--<v-dialog v-model="dialog" max-width="350">
        <v-card>
            <v-card-title class="headline">¿Desea eliminar el registro?</v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn @click="dialog = false">Cancelar</v-btn>
                <v-btn @click="confirmarBorrado(id)" color="error">Aceptar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->
    <!-- componente snackbar para mostrar mensaje de eliminación -->
    <!--<v-snackbar v-model="snackbar" color="success"> {{textsnack}}
        <template v-slot:action="{attrs}">
            <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
        </template>
    </v-snackbar>  -->
    </v-container>

</template>

<script>

let url = 'http://localhost:3000/api/productos/'

console.log('Dentro de productos.................................')

import axios from 'axios';

console.log('Dentro de productos.................................')

export default {
    name:'Productos',
    mounted(){
        this.obtenerProductos();
    },
    data(){
        return{            
            dialog:false,
            productos:null,
            id:null,
            snackbar:false,
            textsnack:'¡Registro Eliminado!'
        }
    },
    methods:{
        obtenerProductos(){
            axios.get(url)
            .then(r => {
                console.log('datos ',r.data)
                this.productos = r.data;
                console.log(this.productos);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
}
</script>

<style scope>
    .contenedor {
            background-color: #0000FF;
            max-width: 80%;
                } 
</style>