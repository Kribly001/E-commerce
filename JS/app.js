//*************************** */
// Alerta boton de compra
//USO DE TERNARIO Y SWETTALERT
//*************************** */
let totals = 0;
const alerta = document.getElementById("buttonSweet")
alerta.addEventListener("click", () => {
  (totals >= 1000.00) ? purchaseCompleted(): emptyCartAlert();
})

function emptyCartAlert() {
  Swal.fire({
    title: 'Error',
    text: 'El carrito esta vacio',
    imageUrl: 'https://www.fuegoyamana.com/wp-content/uploads/2017/06/carrito-abandono-ANIMADO.gif',
    imageWidth: 400,
    imageHeight: 200,
    confirmButtonText: 'Agregar Productos',
    imageAlt: 'Carrito Vacio',
    backdrop: ` rgba(255,0,0,0.4)`
  })
}

function purchaseCompleted() {
  Swal.fire({
    title: 'Gracias por Confiar!',
    text: 'Su compra se completo con exito y esta en camino',
    imageUrl: 'https://www.cristaldemar.com.ar/wp-content/uploads/2020/05/envio.gif',
    imageWidth: 400,
    imageHeight: 200,
    confirmButtonText: 'Aceptar',
    imageAlt: 'Compra en camino',
    backdrop: ` rgba(0,0,123,0.4)`
  })
}
//------------------------------------------------------------
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

//*************************** */
//OBTENER VALORES
//*************************** */
function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      updateShoppingCartTotal();
      return;
    }
  }

  //*************************** */
  //CREACION ELEMENTO HTML DONDE SE MOSTRARA EL CARRITO
  //*************************** */
  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img height="150" width="150" src=${itemImage} class="shopping-cart-image">
                  <h6 class=" textCarrito shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="textCarrito item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
  dateLocal(itemImage, itemTitle, itemPrice);
}

//*************************** */
//GUARDAR DATOS EN LOCALSTORAGE
//*************************** */
function dateLocal(productImage, productTitle, productPrice) {
  let lst = [1, 2, 3]; // los datos que sean
  lst = [{
    imagen: productImage,

    titulo: productTitle,

    precio: productPrice
  }];
  let datos_existentes = localStorage.getItem('producto');
  datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
  datos_existentes.push(lst);
  localStorage.setItem('producto', JSON.stringify(datos_existentes));

}

//*************************** */
//MOSTRAR DATOS DE LOCALSTORAGE
//*************************** */

// let dateLocal=JSON.parse(localStorage.getItem("producto"));
// console.log(dateLocal)
// let body = ''
// for(let i=0; i < lst.length; i++){
//       body += `<h1> ${lst[i].imagen} <h1>
//       <FONT COLOR="navy"> ${lst[i].titulo}</FONT>`
//       document.getElementById('dateLocal').innerHTML = body;
// }

// function getLocal(){
//   let dateLocal=JSON.parse(localStorage.getItem("producto"));

//   console.log(dateLocal)
// let body = ''
//       body += `<h1> ${datos[1].imagen} <h1>
//       <FONT COLOR="navy"> ${datos[1].titulo}</FONT>`
//       document.getElementById('dateLocal').innerHTML = body;
//}

//*************************** */
//CALCULO TOTAL DE CARRITO $..
//*************************** */
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(0)}$`;
  totals = total;
}

//***************************** */
//BOTON REMOVER PRODUCTOS
//***************************** */
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  // localStorage.removeItem('producto');
  updateShoppingCartTotal();
}

//***************************** */
//AGREGAR PRODUCTOS EN CARRITO Y VALOR 0 O MENOR NO TOLERADO
//***************************** */
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

//**************************** */
//BOTON DE COMPRA 
//**************************** */
function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}

//**************************** */
//FORMULARIO DE PEDIDO DE PRODUCTOS
//**************************** */
const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_m6rk9rf';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Enviar';
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Formulario enviado correctamente ¡Gracias!'
        })
      }, (err) => {
        btn.value = 'Enviar';
        alert(JSON.stringify(err));
      });
    cleanForm();
  });

//LIMPIAR FORM AL ENVIAR
function cleanForm() {
  document.getElementById('form').reset();
}

//*************************** */
//UTILIZACION DE FETCH
//*************************** */
let endpoint='https://openexchangerates.org/api/latest.json?app_id=30e579961f0e4fe0a00b2676cc9aff25'
fetch(endpoint)
.then((response) =>response.json ())
.then((data) => mostrarData(data))
.catch(e => console.log(e))

const mostrarData = (data) => {
  console.log(data)
  let body =''
  body +=`<table class="table">
  <thead class="thead-light">
    <tr>
    <th scope="col">Valor de Dolar al dia</th>
      <th scope="col">$ ${data.rates.ARS}</th>
    </tr>
  </thead> 
  <table>`
  document.getElementById('data').innerHTML = body;
}
