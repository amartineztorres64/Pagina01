// libreria de funciones compartidas en el proyecto (plugin con funciones a compartir)
// se crea un archivo .js dentro la carpeta plugins
// Dentro del proyecto que utilizará las funciones, se hace el import de la librería de funciones
// Dentro del proyecto que utilizará las funciones, se incluye  Vue.use (librería de funciones)

export default {
    install(Vue) {


// variable global 
       Vue.prototype.$variable = 15500;
       Vue.prototype.$estilo_sel = 6;


// propiedad global
       Vue.prototype.$propiedades = {
            doble: (numero) => numero * 2,
            triple: (numero) => numero * 3,
            cuadruple: (numero) => numero * 4,
            quintuple: (numero) => numero * 5
        }


//   metodo global   
        Vue.prototype.$metodoGlobal = function (numero1, numero2) {
            
            return (numero1+numero2)

        };

        Vue.prototype.$Estilos = function ($estilo_sel) {
            console.log("entrando a rutina compartida ",$estilo_sel)
            var sel_color;
            switch($estilo_sel) {
                case 1:
                   sel_color="yellow";
                   break;
                case 2:
                   sel_color="red";
                   break;
                case 3:
                   sel_color="green";
                   break;
                case 4:
                   sel_color="blue";
                   break;
                case 5:
                   sel_color="purple";
                   break;
                case 6:
                   sel_color="pink";   
                   break;
            }
            
            return (sel_color)

        };


    }
}