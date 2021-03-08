/*Se requiere definir variables para los siguientes valores (para poder utilizarlas luego):
•	Nombre de la tienda
•	Nombre de producto 1
•	Nombre de producto 2
•	Precio de producto 1
•	Precio de producto 2
•	Código de descuento */

let nombreTienda = "Bummer";



var cliente = {
    nombre : {},
    email: {},
    dni: {},
    edad: {},
}

var producto1 = {
    nombre : "Remera",
    precio: 100,
    unidadesVendidas: 0,
}

var producto2 = {
    nombre : "Pantalon",
    precio: 200,
    unidadesVendidas: 0,
}

var venta = {
    total : 0,
    numeroDeCuotas : 0,
    montoDeCadaCuota : 0,
}



//1. Mostrar un saludo de bienvenida y solicitar el nombre, email, DNI y fecha de nacimiento del cliente.
//Se debe validar que el cliente sea mayor de 18 años, el nombre no supere un largo de 30 caracteres y el email sea válido.

function saludar() {
    alert(`Hola, bienvenido a la tienda de ${nombreTienda}!`)
    validarNombre();
}

function validarNombre() {

    nombreIngresado = prompt("Ingresa tu nombre: ");
    if (nombreIngresado === "" ) {
        alert ("Por favor, completa tu nombre");
        validarNombre();
        return false;
    }
    if (cliente.nombre.length > 30) {
        alert("Tu nombre no puede exceder los 30 caracteres")
        validarNombre();
        return false;
    }
    else {
        cliente.nombre = nombreIngresado;
        validarFechaNac();
        return true;
    }
    
}

function validarFechaNac() {

    let fechaNac = prompt("Ingresa tu fecha de nacimiento (YYYY/MM/DD): ");
    cliente.edad = getAge(fechaNac);
    if (cliente.edad < 18) {
        alert("Debes tener más de 18 años para ingresar");
        return false;
    }
    else {
        validarEmail();
        return true;
    }
}


function validarEmail() {
    let emailIngresado = prompt("Ingresa tu email: ");
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailIngresado)) {
        cliente.email = emailIngresado;
        solicitarDni();
        return true;
    }
    else {
        alert("La direccion ingresada es invalida");
        validarEmail()
    }
}

function solicitarDni() {
    cliente.dni = prompt("Ingresa tu DNI: ");
    mostrarProductosPromocion();
}



function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/*2. Mostrarle los productos en promoción (2 productos).
3. Preguntarle si quiere comprar el producto 1.
a. Si responde "SI" preguntar cuántas unidades va a llevar
4. Preguntarle si quiere comprar el producto 2.
a. Si responde "SI" preguntar cuántas unidades va a llevar */

function mostrarProductosPromocion() {
    alert(`El producto ${producto1.nombre} está en promoción!`);
    alert(`El producto ${producto2.nombre} está en promoción!`);
    ofrecerProductos();
}

function ofrecerProductos() {
    let respuestaCliente1 = prompt(`¿Desea comprar el producto ${producto1.nombre}?`);
    if (respuestaCliente1.toUpperCase() === "SI") {
        producto1.unidadesVendidas = parseInt(prompt("¿Cuántas unidades?"));
    }

    let respuestaCliente2 = prompt(`¿Desea comprar el producto ${producto2.nombre}?`);
    if (respuestaCliente2.toUpperCase() === "SI") {
        producto2.unidadesVendidas = parseInt(prompt("¿Cuántas unidades?"));
    }

    if (respuestaCliente1.toUpperCase() === "SI" || respuestaCliente2.toUpperCase() === "SI") {
        mostrarDetalleDeCompra()
    }

}

/* 5. Mostrar el detalle de la compra con:
      - subtotales de cada producto (precio x cantidad) 
      - total (suma de subtotales)
   6. Preguntar si desea abonar con tarjeta de crédito.
      a. Si responde "SI" preguntar en cuántas cuotas desea abonar 
   7. Mostrar el detalle de la compra con:
      - subtotales de cada producto (precio x cantidad)
      - total (suma de subtotales)
      - si abona con tarjeta, cantidad de cuotas y monto de cada cuota a pagar */

function mostrarDetalleDeCompra() {
    subtotal1 = producto1.precio * producto1.unidadesVendidas;
    subtotal2 = producto2.precio * producto2.unidadesVendidas;
    venta.total = subtotal1 + subtotal2;

    
    if (producto1.unidadesVendidas > 0) {
        var mensajeCompraProd1 =
        `Elegiste comprar ${producto1.unidadesVendidas} unidades de ${producto1.nombre} con un precio de $${producto1.precio} por unidad. El subtotal sería $${subtotal1}`;
        alert(mensajeCompraProd1);
    }      
    if (producto2.unidadesVendidas > 0) {
        var mensajeCompraProd2 = 
        `Elegiste comprar ${producto2.unidadesVendidas} unidades de ${producto2.nombre} con un precio de $${producto2.precio} por unidad. El subtotal sería $${subtotal2}`;
        alert (mensajeCompraProd2);        
    }
    var mensajeCompraTotal = `El total sería  $${venta.total}`;
    alert(mensajeCompraTotal);    
    
    preguntarFormaDePago();
}

function preguntarFormaDePago() {
    let respuestaCliente = prompt("¿Desea pagar con tarjeta de crédito?");
    if (respuestaCliente.toUpperCase() === "SI") {
        venta.numeroDeCuotas = parseInt(prompt("¿En cuántas cuotas?"));
    }

    venta.montoDeCadaCuota = (venta.total / venta.numeroDeCuotas).toFixed(2);
    alert (`Abonas ${venta.total} en ${venta.numeroDeCuotas} cuotas de $${venta.montoDeCadaCuota}`);

    validarCodigoDescuento();

}

/*
8. Preguntar si tiene un código de descuento.
      - si la respuesta es "SÍ", pedir que ingrese el código
      - mostrar si el código ingresado es correcto o incorrecto
   9. Mostrar el detalle de la compra con:
      - subtotales de cada producto (precio x cantidad) 
      - total (suma de subtotales)
      - si tiene código y lo ingresó bien, mostrar el descuento y el total final
      - si abona con tarjeta, cantidad de cuotas y monto de cada cuota a pagar
   10. Mostrar un saludo de despedida.  */


function validarCodigoDescuento() {
    codigoDescuentoValido = 12345;
    descuento = 15;
    totalConDescuento = (venta.total * (1 - descuento/100)).toFixed(2);
    montoDeCuotaConDescuento = (totalConDescuento / venta.numeroDeCuotas).toFixed(2);

    respuestaCliente = prompt("¿Tiene un código de descuento?");
    if (respuestaCliente.toUpperCase() === "SI") {
        codigoDescuentoCliente = parseInt(prompt("Ingrese su código de descuento"));
        if (codigoDescuentoCliente !== codigoDescuentoValido) {
            alert(`El código de descuento ${codigoDescuentoCliente} no es válido`)
            alert(`No tenes un descuento, abonas ${venta.total} en ${venta.numeroDeCuotas} cuotas de $${venta.montoDeCadaCuota}`);

        }
        else {
            alert(`El código de descuento ${codigoDescuentoCliente} es válido`);
            alert(`Tenes un descuento de ${descuento}%, abonas $${totalConDescuento} en ${venta.numeroDeCuotas} cuotas de $${montoDeCuotaConDescuento}`)
        }
    }
    saludoDespedida();
}

function saludoDespedida() {
    alert("Muchas gracias por tu compra!");
}