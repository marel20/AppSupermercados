  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/carrito/', url: 'carrito.html',},
      {path: '/index/', url: 'index.html',},
      {path: '/busqueda/', url: 'busqueda.html',},
      {path: '/categorias/', url: 'categorias.html',},
      {path: '/cuenta/', url: 'cuenta.html',},
      {path: '/resumen/', url: 'resumen.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);

})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="carrito"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    $$('#suma').on('click', fnSumar);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="busqueda"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="categorias"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="cuenta"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="resumen"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name=""]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name=""]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

})




/*Mis Funciones*/

function fnSumar() {
  console.log('entramos en sumar')
  objeto = $$('#descripcion').val();
  cantidad = $$('#cantidad').val();
  precio = $$('#unitario').val();

  $$('#col1').append(objeto + "<br>");
  $$('#col2').append(cantidad + "<br>");
  $$('#col3').append(precio + "<br>");
  $$('#col4').append(cantidad * precio + "<br>");
  
  canTotal = parseInt($$('#totalArt').text());
  canTotal+= parseInt(cantidad);
  $$('#totalArt').text(canTotal);

  pesosTotal = parseInt($$('#totalPesos').text());
  pesosTotal+= parseInt((cantidad * precio));
  $$('#totalPesos').text(pesosTotal);



}
