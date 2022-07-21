// Alerta boton de compra
//USO DE TERNARIO Y SWETTALERT
let totales=0;
const alerta=document.getElementById("buttonSweet")
alerta.addEventListener("click", () =>{
(totales >= 1000.00)? compraCompletada() : carritovacioAlert();
})

function carritovacioAlert(){
  Swal.fire({
    title: 'Error',
    text: 'El carrito esta vacio',
    imageUrl:'https://www.fuegoyamana.com/wp-content/uploads/2017/06/carrito-abandono-ANIMADO.gif',
    imageWidth: 400,
    imageHeight:200,
    confirmButtonText: 'Aceptar',
    imageAlt:'Carrito Vacio'
  })
}

function compraCompletada(){
  Swal.fire({
    title: 'Gracias por Confiar!',
    text: 'Su compra se completo con exito y esta en camino',
    imageUrl:'https://www.cristaldemar.com.ar/wp-content/uploads/2020/05/envio.gif',
    imageWidth: 400,
    imageHeight:200,
    confirmButtonText: 'Aceptar',
    imageAlt:'Compra en camino'
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

  let lst = [1, 2, 3]; // los datos que sean
  lst = [{
    imagen: itemImage,

    titulo: itemTitle,

    precio: itemPrice
  }];

  // localStorage.getItem() devuelve null si la clave no existe
  let datos_existentes = localStorage.getItem('producto');
  datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);

  datos_existentes.push(lst);
  // o
  // datos_existentes.push(datos: datosDeCadaProductoRecuperado});

  localStorage.setItem('producto', JSON.stringify(datos_existentes));

}


function updateShoppingCartTotal() {
  let total=0 ;
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
  totales=total;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}