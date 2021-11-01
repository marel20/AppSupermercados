  
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
      {path: '/mispedidos/', url: 'pages/mispedidos.html',},
      {path: '/contacto/', url: 'pages/contacto.html',},
      {path: '/registro/', url: 'pages/registro.html',} ,
      { path: '/categoria/:id/',        url: 'pages/categoria.html',  },
     
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var db = firebase.firestore();
var colCategorias = db.collection("categorias");
var colProductos = db.collection("productos");



// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
   // $$('#agregar1').on('click', fnSumar);

})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  crearCategorias();

})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="carrito"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
   // $$('#confirmar').on('click', fnResumen)
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="busqueda"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

})


$$(document).on('page:init', '.page[data-name="categoria"]', function (e, page) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  console.log('Pag. Categoria con id: ' + page.route.params.id );
  idCategoria = "" + page.route.params.id;
  

  listaProductos = '';

  colProductos.where("codCategoria", "==", idCategoria)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            listaProductos += `<h3>`+doc.data().nombre+`</h3>`;
            listaProductos += `<h3> $`+doc.data().precio+`</h3>`;
            listaProductos += `<p>`+doc.data().descripcion+`</p>`;
        });

        $$('#listaProductos').append(listaProductos);

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });



})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="categorias"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

/*
              <li class="accordion-item"><a class="item-content item-link" href="#">
                  <div class="item-inner">
                    <div class="item-title">Almacen</div>
                  </div>
                </a>
                <div class="accordion-item-content">
                  <div class="block categorias">
                        <a href="/comestibles/">Comestibles</a>  <br>
                        <a href="/infusiones/">Infusiones</a> <br>
                        <a href="/conservas/">Conservas</a> <br>
                        <a href="/enlatados/">Enlatados</a> <br>
                        <a href="/envasados/">Envasados</a> <br>
                        <a href="/aderezos/">Aderezos/Especies</a> <br>
                        <a href="/galletas/">Galletas</a> <br>
                        <a href="/golosinas/">Golosinas</a> <br>
                  </div>
                </div>
              </li>
*/


grupoActual = "";
inicio = 0;

txtMostrar = '';
  
  colCategorias.orderBy("grupo")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            if (grupoActual != doc.data().grupo ) {
              txtMostrar += `
                  <li class="accordion-item"><a class="item-content item-link" href="#">
                  <div class="item-inner">
                    <div class="item-title">`+doc.data().grupo+`</div>
                  </div>
                </a>
                <div class="accordion-item-content">
                  <div class="block categorias">
                      <a href="/categoria/`+doc.id+`/">`+doc.data().categoria+`</a>  <br>
              `;
              grupoActual = doc.data().grupo;

            } else {
              txtMostrar += `<a href="/categoria/`+doc.id+`/">`+doc.data().categoria+`</a>  <br>`
            }

             



            console.log(doc.id, " => ", doc.data().grupo , " / " , doc.data().categoria);

        });

        txtMostrar += `</div>
        </div>
        </li>`;

        $$('#listaCategorias').append(txtMostrar);

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });





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
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#registro').on('click', fnAutenticar)
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="iniciar"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
    $$('#inSes').on('click', fnIniciarSesion)
})




function crearCategorias() {
  
  
/*  
  console.log("creando categorias");
  dameUnID = "1";   datos = { categoria: "Gaseosas", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "2";   datos = { categoria: "Cervezas", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "3";   datos = { categoria: "Vinos", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "4";   datos = { categoria: "Papas fritas", grupo: "Copetin" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "5";   datos = { categoria: "Manies", grupo: "Copetin" };
  colCategorias.doc(dameUnID).set(datos);
*/

/*
console.log("creando productos");
dameUnID = "1001";   datos = { nombre: "Manaos de Uva - 2.25", precio: 99, imagen: '/img/manaos.jpg',
 descripcion: 'Uva super refrescante', enOferta: 1, destado: 0, codCategoria: "1" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1002";   datos = { nombre: "Coca-Cola - 2.25", precio: 139, imagen: '/img/coca.jpg',
 descripcion: 'Cola sin azucar', enOferta: 1, destado: 1, codCategoria: "1" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1003";   datos = { nombre: "Pepsi - 2.25", precio: 139, imagen: '/img/coca.jpg',
 descripcion: 'Cola sin azucar', enOferta: 0, destado: 1, codCategoria: "1" };
colProductos.doc(dameUnID).set(datos);

*/


  /*
  colCategorias.doc(dameUnID).set(datos)
  .then(function() {     // .then((docRef) => {
    console.log("OK!");
  })
  .catch(function(error) {     // .catch((error) => {
    console.log("Error: " + error);
  });
  */
}



/*Mis Funciones*/

function fnAutenticar() {
  mail = $$('#mail').val();
  contr = $$('#passw').val();
  contr2 = $$('#confpassw').val();
  nombre = $$('#nombre').val();
  apellido = $$('#apellido').val();
  cel = $$('#telefono').val();
  fecha = $$('#fecnac').val();
  direccion = $$('#direccion').val();

  if (contr == contr2) {
      console.log('Contraseñas correctas')
    firebase.auth().createUserWithEmailAndPassword(mail, contr)
      .then((userCredential) => {
        var user = userCredential.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('error'+ errorMessage);
      });
  }
  mainView.router.navigate('/iniciar/');

}

function fnIniciarSesion() {
  console.log('Inicie sesión');

  mailLog = $$('#mailLog').val();
  mailAut = firebase.auth();

    if (mailLog == mailAut) {
      console.log('coinciden los mails');
      mainView.router.navigate('/index/');
      $$('#inSes').on('click', fnSacaBoton)

    } else {
      alert('no coinciden los mails');
      mainView.router.navigate('/iniciar/');
    }
}

function fnSacaBoton() {
  $$('#ocultar').removeClass('visible').addClass('oculto');
}


/* {path: '/aderezos/', url: 'pages/aderezos.html',},
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
      */