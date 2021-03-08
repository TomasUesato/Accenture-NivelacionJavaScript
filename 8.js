/*Crear un script que permita el ingreso de valores 
para cargar un array y espere 3 segundos por cada carga,
 debe utilizar Promise para procesar el resultado: 
 error si no se cargó un valor en el array y 
 un mensaje de ejecución correcta junto con 
 los valores del array en caso contrario. */

var valores = [];

 function ingresarValores(numero) {
     return new Promise(function(resolve, reject) {
         setTimeout(() => {
             if(typeof numero !== 'number') {
                reject("Error: el valor no es un número");
             }else {                 
                 valores.push(numero);
                 resolve();
         }
        }, 3000);
     })
 }

 ingresarValores(4)
    .then(obj => {
        console.log(valores)
    })
    .catch(err => console.error(err));
