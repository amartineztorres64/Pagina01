<template>
      <v-app>
       <v-navigation-drawer 
        v-model="drawer"
        absolute
        temporary
        app clipped
        >
        <v-list>
          <v-list-item :to="{path: '/inicio'}">
            <v-list-item-action >
              <v-icon>mdi-{{ icons[0] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item> 

          <v-list-item :to="{path: '/login'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[1] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item> 

            
          <v-list-item :to="{path: '/productos'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[2] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>ABC de productos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :to="{path: '/compras'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[3] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Carrito de compras</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          
          <v-list-item :to="{path: '/contacto'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[4] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Contacto</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
     
      <v-card class="mx-auto mt-0 overflow-hidden" height="100%" width="100%">

          <v-system-bar color="deep-purple darken-4"></v-system-bar> 

          <v-app-bar class="deep-purple accent-4 white--text mt-0">
              <v-app-bar-nav-icon @click="drawer=true" class="white--text"></v-app-bar-nav-icon>
              <v-toolbar-title>                
                  <v-list-item :to="{path: '/'}">             
                  <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"         
                    :to="{path: '/'}"   
                    />
                  
                  </v-list-item>
              </v-toolbar-title>
                                          
              <v-spacer></v-spacer>

              <h6>Usuario : {{this.$store.state.Iduser}}</h6>

              <v-btn class="ml-2" v-if="$store.state.signedUp" outlined @click="cancelaLogin()">
                  <v-icon color="white" class="ml-2">mdi-logout</v-icon>
              </v-btn>

          </v-app-bar> 

          <v-main>
            <v-container style="min-width:1600px; max-width:1600px;">
                <router-view></router-view> 
            </v-container>
          </v-main>  
          
      </v-card>   
      
    </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      drawer: false,
      Iduser:'',
      signedUp:false,
      icons: ['home','account','view-list','cart-plus','email']
    }),
     
   methods:{
       cancelaLogin(){
         this.$store.state.signedUp=false;  
         this.$store.state.Iduser='User'; 
         var router =  this.$router;
         console.log('las variables de router ',this.$router.currentRoute.fullPath)
         if (this.$router.currentRoute.fullPath !== '/inicio') {
            router.push('/inicio');   
         }
       }
   }

    
  }
</script>