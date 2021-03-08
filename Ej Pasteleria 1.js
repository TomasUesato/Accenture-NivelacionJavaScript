class Empresa {
    constructor(nombre, saludo) {
      this.nombre = nombre;
      this.saludo = saludo;
    }
}

empresas = [new Empresa ("Mercado Libre", "Saludos!"), new Empresa ("Accenture", "Saludos cordiales"), new Empresa ("Globant", "Abrazo!")];


function saludar () {
    let nombreEmpresa = prompt("Ingresa el nombre de la empresa");

    if (verificarNombreEmpresa(nombreEmpresa, empresas) === true) {
        elegirSaludo(nombreEmpresa);
    }
    else {
        let userConfirm = confirm("Estas seguro que el nombre ingresado es correcto?");
        if (userConfirm === true) {
            console.log("Adios");
        } else {
            saludar()
        }
    }
}




function elegirSaludo (nombreEmpresa) {
    for (let i = 0; i < empresas.length; i++) {
        if (nombreEmpresa.toUpperCase() === (empresas[i].nombre).toUpperCase()) {
            console.log(`El saludo correcto para utilizar con la empresa ${empresas[i].nombre} es "${empresas[i].saludo}" `);
    }
}
}


function verificarNombreEmpresa(empresa, empresas) {

    for (let i = 0; i < empresas.length; i++) {
        if (empresa.toUpperCase() === (empresas[i].nombre).toUpperCase()) {
            return true;
        }
    }
    return false;
}

saludar();