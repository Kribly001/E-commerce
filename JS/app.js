let namevisit = prompt("Ingresa tu nombre");
while (namevisit === "") {
    alert("No ingreso su nombre");
    namevisit = prompt("Ingresa tu nombre");
}
alert("Bienvenido " + namevisit + " disfruta tu estadia aqui, para saber el precio del producto presiona la imagen");

function saberprecio(number) {
    let valor;
    let compra = prompt("Su precio es $" + number + " desea compra el producto? SI o NO");
    if (compra == "SI") {
        alert("Compra finalizada pronto le llegara por correo")
    } else if (compra == "NO") {
        alert("No se completo la compra")
    } else {
        alert("No se ingreso un valor valido");
    }
    return compra;
}