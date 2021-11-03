  
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
      { path: '/categoria/:id/', url: 'pages/categoria.html',  },
     
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var db = firebase.firestore();
var colCategorias = db.collection("categorias");
var colProductos = db.collection("productos");
var colUsuarios = db.collection("usuarios");


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
            listaProductos += ''+doc.data().imagen+'';
            listaProductos += `<h3> $`+doc.data().precio+`</h3>`;
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
  
  
  
  console.log("creando categorias");
  dameUnID = "1";   datos = { categoria: "Comestibles", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "2";   datos = { categoria: "Infusiones", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "3";   datos = { categoria: "Conservas", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "4";   datos = { categoria: "Enlatados", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "5";   datos = { categoria: "Envasados", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "6";   datos = { categoria: "Aderezos", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "7";   datos = { categoria: "Galletas", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "8";   datos = { categoria: "Golosinas", grupo: "Almacen" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "9";   datos = { categoria: "Aperitivos", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "10";   datos = { categoria: "Gaseosas", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);
  
  dameUnID = "11";   datos = { categoria: "Jugos", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "12";   datos = { categoria: "Licores", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "13";   datos = { categoria: "Champagnes", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "14";   datos = { categoria: "Vinos de Mesa", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "15";   datos = { categoria: "Whisky", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "16";   datos = { categoria: "Sidras", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "17";   datos = { categoria: "Energizantes", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "18";   datos = { categoria: "Cervezas", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "19";   datos = { categoria: "Aguas Saborizadas", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "20";   datos = { categoria: "Aguas Minerales", grupo: "Bebidas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "21";   datos = { categoria: "Carnicería", grupo: "Alimentos Frescos" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "22";   datos = { categoria: "Verdulería", grupo: "Alimentos Frescos" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "23";   datos = { categoria: "Fiambrería", grupo: "Alimentos Frescos" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "24";   datos = { categoria: "Panadería", grupo: "Alimentos Frescos" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "25";   datos = { categoria: "Lacteos", grupo: "Alimentos Frescos" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "26";   datos = { categoria: "Pastas", grupo: "Alimentos Frescos" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "27";   datos = { categoria: "Congelados", grupo: "Alimentos Frescos" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "28";   datos = { categoria: "Perfumeria", grupo: "Perfumería y Limpieza" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "29";   datos = { categoria: "Limpieza", grupo: "Perfumería y Limpieza" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "30";   datos = { categoria: "Alimentos", grupo: "Mascotas" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "31";   datos = { categoria: "Hogar", grupo: "Bazar" };
  colCategorias.doc(dameUnID).set(datos);

  dameUnID = "32";   datos = { categoria: "Fiestas", grupo: "Otras Categorías" };
  colCategorias.doc(dameUnID).set(datos);


console.log("creando productos");

dameUnID = "1001";   datos = { nombre: "Fideos Coditos knorr", precio: 57.80, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "1" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1002";   datos = { nombre: "Te La Virginia x25 unid.", precio: 25, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "2" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1003";   datos = { nombre: "Atun Lomito Al Natural Bahía", precio: 90, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "3" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1004";   datos = { nombre: "Tomate Perita Noel", precio: 63, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "4" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1005";   datos = { nombre: "Aceitunas Vanoli dp x300", precio: 38, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "5" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1006";   datos = { nombre: "Savora Original x250", precio: 65, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "6" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1007";   datos = { nombre: "Vainillas Lara x300", precio: 70, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "7" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1008";   datos = { nombre: "Gomas Fantasia Misky x 1Kg", precio: 130, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "8" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1009";   datos = { nombre: "Fernet Branca x 1 Lt.", precio: 949, imagen: 'img/ofertas/oferta1.jpg',
 enOferta: 0, destado: 1, codCategoria: "9" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1010";   datos = { nombre: "Manaos de Uva - 2.25", precio: 99, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 1, destado: 0, codCategoria: "10" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1011";   datos = { nombre: "Jugo en Polvo Tang Naranja", precio: 33, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 1, destado: 1, codCategoria: "11" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1012";   datos = { nombre: "Licor Tia Maria Cream", precio: 850, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "12" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1013";   datos = { nombre: "Champagne Baron B", precio: 2500, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 1, destado: 1, codCategoria: "13" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1014";   datos = { nombre: "Vino Rutini Cabernet-Malbec", precio: 1050, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "14" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1015";   datos = { nombre: "Whisky Jack Daniel´s", precio: 4500, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "15" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1016";   datos = { nombre: "Sidra Real", precio: 250, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "16" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1017";   datos = { nombre: "Red Bull x250", precio: 110, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "17" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1018";   datos = { nombre: "Patagonia Amber Lager x473cc", precio: 180, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "18" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1019";   datos = { nombre: "Baggio Fresh Pera", precio: 84, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "19" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1020";   datos = { nombre: "Agua Villavicencio 2 lts", precio: 80, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "20" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1021";   datos = { nombre: "Asado Costilla x500 grs", precio: 425, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "21" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1022";   datos = { nombre: "Cebolla x 1kg", precio: 100, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "22" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1023";   datos = { nombre: "Queso Barra x 150 grs", precio: 100, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "23" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1024";   datos = { nombre: "Pan x 150grs", precio: 25, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "24" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1025";   datos = { nombre: "Leche La Serenisima Entera x 1 Lt", precio: 115, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "25" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1026";   datos = { nombre: "Ravioles HDT x500 grs", precio: 350, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "26" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1027";   datos = { nombre: "Hamburguesa Super Paty", precio: 100, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "27" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1028";   datos = { nombre: "Papel Higienico Felpita x30 mts", precio: 60, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "28" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1029";   datos = { nombre: "Limpiador Poett x900 cc Lavanda", precio: 89, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "29" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1030";   datos = { nombre: "Dog Chow x21 kg", precio: 1500, imagen: '/img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "30" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1031";   datos = { nombre: "Termo Lumilagro", precio: 900, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "31" };
colProductos.doc(dameUnID).set(datos);

dameUnID = "1032";   datos = { nombre: "Pan Dulce Fantoche con chips", precio: 150, imagen: 'img/ofertas/oferta1.jpg',
  enOferta: 0, destado: 1, codCategoria: "32" };
colProductos.doc(dameUnID).set(datos);



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