Swal.fire('bienvenido a black market este catalogo solo es un ejemplo de los skins disponibles')
const clickBoton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];

clickBoton.forEach(btn => {
  btn.addEventListener('click', añadidoConExito);
});

function añadidoConExito(e) {
  const button = e.target;
  const item = button.closest('.card');
  const itemTitulo = item.querySelector('.card-title').textContent;
  const itemPrecio = parseFloat(item.querySelector('.precio').textContent.replace('$', ''));
  const itemImg = item.querySelector('.card-img-top').src;

  const nuevoItem = {
    title: itemTitulo,
    precio: itemPrecio,
    img: itemImg,
    cantidad: 1
  };

  addItemCarrito(nuevoItem);
  renderCarrito(); // Llamada a renderCarrito() después de agregar el elemento al carrito
}

function addItemCarrito(nuevoItem) {
  const alert = document.querySelector('.alert');

  setTimeout(function () {
    alert.classList.add('hide');
  }, 2000);
  alert.classList.remove('hide');

  const InputElemnto = tbody.getElementsByClassName('input__elemento');
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === nuevoItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = InputElemnto[i];
      inputValue.value++;
      carritoTotal();
      return null;
    }
  }

  carrito.push(nuevoItem);
}

function renderCarrito() {
  tbody.innerHTML = '';
  carrito.map((item, index) => {
    const tr = document.createElement('tr');
    tr.classList.add('ItemCarrito');
    const Content = `
      <th scope="row">${index + 1}</th>
      <td class="table__productos">
        <img src="${item.img}" alt="">
        <h6 class="title">${item.title}</h6>
      </td>
      <td class="table__price"><p>$${item.precio}</p></td>
      <td class="table__cantidad">
        <input type="number" min="1" value=${item.cantidad} class="input__elemento">
        <button class="delete btn btn-danger">x</button>
      </td>
    `;
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener('click', removerItemCarrito);
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad);
  });
  carritoTotal();
}

function carritoTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal');
  carrito.forEach((item) => {
    const precio = parseFloat(item.precio);
    const cantidad = parseInt(item.cantidad);
    console.log('Precio:', precio);
    console.log('Cantidad:', cantidad);
    Total += precio * cantidad;
  });

  itemCartTotal.innerHTML = `Total $${Total}`;
  addLocalStorage();
}

function removerItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  const alert = document.querySelector('.remove');

  setTimeout(function () {
    alert.classList.add('remove');
  }, 2000);
  alert.classList.remove('remove');

  tr.remove();
  carritoTotal();
}

function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      carritoTotal();
    }
  });
}

function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
}
const formularioCompra = document.getElementById('formularioCompra');
formularioCompra.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

  // Obtén los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const metodoPago = document.getElementById('metodoPago').value;

  // Realiza cualquier validación necesaria en los datos del formulario

  
  window.location.href = 'ruta-a-la-pagina-de-registro-y-opciones-de-pago.html';
});
Swal.fire('Any fool can use a computer')

const dolarElement = document.getElementById('dolar-value');


const apiKey = 'd01520091119437d3212ed90';


fetch(`https://api.exchangerate-api.com/v4/latest/USD?access_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    
    const dolarValue = data.rates.MXN; 

    
    const iconElement = document.createElement('i');
    iconElement.classList.add('fas', 'fa-dollar-sign');

    
    dolarElement.innerHTML = '';
    dolarElement.appendChild(iconElement);
    dolarElement.insertAdjacentText('beforeend', dolarValue);
  })
  .catch(error => {
    
    console.error('Error al obtener el valor del dólar:', error);
  });


