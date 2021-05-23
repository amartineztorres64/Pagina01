// porciones de codigo a insertar en componentes, se define como una constante que contiene un objeto a insertar
// se definen metodos a ser insertados en componentes, no e lo mismo que compartir funciones globales.

export const Mismixins={
    methods: {
        incrementar: function (numerobase) {
             return (numerobase=numerobase+1)                     
        },
        decrementar: function (numerobase) {
            return (numerobase=numerobase-1)
        },
    }
}