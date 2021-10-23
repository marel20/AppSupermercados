  
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
      {path: '/carrito/', url: 'pages/carrito.html',},
      {path: '/index/', url: 'index.html',},
      {path: '/busqueda/', url: 'pages/busqueda.html',},
      {path: '/categorias/', url: 'pages/categorias.html',},
      {path: '/cuenta/', url: 'pages/cuenta.html',},
      {path: '/resumen/', url: 'pages/resumen.html',},
      {path: '/iniciar/', url: 'pages/iniciar.html',},
      {path: '/sucursales/', url: 'pages/sucursales.html',},
      {path: '/contacto/', url: 'pages/contacto.html',},
      {path: '/registro/', url: 'pages/registro.html',},
      {path: '/aderezos/', url: 'pages/aderezos.html',},
      {path: '/aguas/', url: 'pages/aguas.html',},
      {path: '/aguassab/', url: 'pages/aguassab.html',},
      {path: '/alimentos/', url: 'pages/alimentos.html',},
      {path: '/aperitivos/', url: 'pages/aperitivos.html',},
      {path: '/carniceria/', url: 'pages/carniceria.html',},
      {path: '/cervezas/', url: 'pages/cervezas.html',},
      {path: '/champagnes/', url: 'pages/champagnes.html',},
      {path: '/comestibles/', url: 'pages/comestibles.html',},
      {path: '/congelados/', url: 'pages/congelados.html',},
      {path: '/conservas/', url: 'pages/conservas.html',},
      {path: '/energ/', url: 'pages/energ.html',},
      {path: '/enlatados/', url: 'pages/enlatados.html',},
      {path: '/envasados/', url: 'pages/envasados.html',},
      {path: '/fiambreria/', url: 'pages/fiambreria.html',},
      {path: '/fiestas/', url: 'pages/fiestas.html',},
      {path: '/galletas/', url: 'pages/galletas.html',},
      {path: '/gaseosas/', url: 'pages/gaseosas.html',},
      {path: '/golosinas/', url: 'pages/golosinas.html',},
      {path: '/hogar/', url: 'pages/hogar.html',},
      {path: '/infusiones/', url: 'pages/infusiones.html',},
      {path: '/jugos/', url: 'pages/jugos.html',},
      {path: '/lacteos/', url: 'pages/lacteos.html',},
      {path: '/licores/', url: 'pages/licores.html',},
      {path: '/limpieza/', url: 'pages/limpieza.html',},
      {path: '/panaderia/', url: 'pages/panaderia.html',},
      {path: '/pastas/', url: 'pages/pastas.html',},
      {path: '/perfumeria/', url: 'pages/perfumeria.html',},
      {path: '/sidras/', url: 'pages/sidras.html',},
      {path: '/verduleria/', url: 'pages/verduleria.html',},
      {path: '/vmesa/', url: 'pages/vmesa.html',},
      {path: '/whisky/', url: 'pages/whisky.html',},
      {path: '/correa/', url: 'https://www.google.com/maps/place/Supermercado+Supersol/@-32.8470326,-61.255107,15z/data=!4m5!3m4!1s0x0:0xe31fd14d6ca6fb8a!8m2!3d-32.8470326!4d-61.255107',},
      {path: '/cañada/', url: 'https://www.google.com/maps/place/SUPERSOL+AUTOSERVICIO/@-32.8166565,-61.3977192,17z/data=!4m5!3m4!1s0x0:0x72a815a1c9aaa56c!8m2!3d-32.8170938!4d-61.3987901',},
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
