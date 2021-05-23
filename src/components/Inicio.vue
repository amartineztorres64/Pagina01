cd..
<template>
    <v-container>
        <v-row class="text-center">

        <v-col cols="12">
            <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"/>
        </v-col>

        <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">Single Page Application</h1>
        </v-col>   

        </v-row>
        <v-row class="text-center">
        <v-col class="mb-4">
            <h1 class="display-5 font-weight-bold mb-3">Vue.Js + Vuetify</h1>       
            <h1 class="display-5 font-weight-bold mb-3">CLI y ROUTER</h1>       
            <h1 class="display-5 font-weight-bold mb-3">API Rest con JS</h1> 
        </v-col>
        </v-row>
        <v-row class="text-center">
           <v-col cols="12" md="4">
              <h4>Mixins {{contador}}</h4>
           </v-col>
           <v-col cols="12" md="4">
              <v-btn color="info" class="mr-4" v-on:click="contador=incrementar(contador)">Sumar</v-btn> 
           </v-col>
           <v-col cols="12" md="4">
              <v-btn color="green" class="mr-4" v-on:click="contador=decrementar(contador)">Restar</v-btn> 
           </v-col>
        </v-row>

        <v-row class="text-center">

<!--       llamado a funcion global del proyecto-->

           <v-col cols="12" md="4">
               <h5>Método global {{this.$metodoGlobal(150,100)}}</h5>
           </v-col>

<!--       llamado a variable global del proyecto-->           

           <v-col cols="12" md="4">
               <h5>Variable global {{this.$variable+10000}}</h5>
           </v-col>

<!--       Se hace uso de las propiedades de un objeto global definido en el proyecto-->           

           <v-col cols="12" md="4">
               <h5>Objeto global {{this.$propiedades.doble(50)}}</h5>
           </v-col>
        </v-row>

<!--    uso de libreria de componentes externos  -->        

        <v-row class="text-center">

           <v-col cols="12" md="4">
               <h5>libreria Externa</h5>
               <ButtonComponent buttonText="Comp_ext_1"></ButtonComponent>
           </v-col>

           <v-col cols="12" md="4">
               <h5>libreria Externa</h5>
               <OtherButtonComponent buttonText="Comp_ext_2"></OtherButtonComponent>
           </v-col> 

           <v-col cols="12" md="4">
               <h5>libreria externa</h5>
               <TercerBoton buttonText="Comp_ext_Vuetify" colorB="blue"></TercerBoton>
           </v-col> 

           <v-col cols="12" md="4">
               <h5>Componente Interno Vuetify</h5>
               <Tboton buttonText="Comp_int_Vuetify" colorB="purple"></Tboton>
           </v-col> 

           <v-col cols="12" md="4">
               <h5>Componente Interno Estandar</h5>
               <BotonStd buttonText="Comp_int_Std" :colorB="$Estilos($estilo_sel)"></BotonStd>
           </v-col> 
           
           
        </v-row>

    </v-container>
</template>

<script>

import {Mismixins} from '../plugins/Mismixins.js'

import Tboton from '../components/Tboton'     // se importa componente para ser utilizado desde componente
import BotonStd from '../components/BotonStd'     // se importa componente para ser utilizado desde componente

export default {
    name:'Inicio',
    data() {
       return {
          contador: 0
              }
    },
    components:{Tboton, BotonStd},      // se define componente para ser utilizado
    mixins:[Mismixins],
    mounted () {
       console.log("Al momento de montar ", this.$Estilos(this.$estilo_sel));
     
    }
    

}
</script>