/* Crear un script que genere un numero al azar entre 0 y 2, 
debe utilizar Promise para procesar el resultado: 
un error si el numero generado es 0 
y un mensaje de ejecución correcta en caso contrario. */

var generarNumeroRandom = function() {
    var numeroRandom = Math.floor(Math.random() * 3);
    if (numeroRandom == 0)
        throw new Error("Error");
    return "Ejecución correcta";
}

new Promise (function(resolve, reject) {
    setTimeout(function() {
        try {
            var numeroCorrecto = generarNumeroRandom()
            resolve(numeroCorrecto);
        } catch (err) {
            reject(err);
        }
    }, 2000);
})
.catch(console.log)
.then(console.log);