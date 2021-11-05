  
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
      {path: '/categoria/:id/', url: 'pages/categoria.html',},
     
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
   $$('#agregar1').on('click', fnAgregaProducto);

})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  crearCategorias();

})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="carrito"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
   $$('#confirmar').on('click', fnConfirmarPedido)
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
            listaProductos += `<div class="col-50"><h4>`+doc.data().nombre+`</h4> <br>`;
            listaProductos += `<img src=`+doc.data().imagen+`>`;
            listaProductos += `<h3> $`+doc.data().precio+`</h3> <br>`;
            listaProductos += `<div class="block-strong">
            <button class="boton col button button-fill" id="agregar1" onClick="fnAgregaProducto(n,p)">Agregar a carrito</button>
            </div></div>`;
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
  $$('#volver').on('click', fnVolverInicio);
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#registro').on('click', fnNuevoUsuario)
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="mispedidos"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="sucursales"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="iniciar"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#inSes').on('click', fnIngresoUsuario);
})





/*Mis Funciones*/

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

dameUnID = "1041";   datos = { nombre: "Fideos Mostachol knorr", precio: 57.80, imagen: 'img/ofertas/oferta1.jpg',
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


function fnAgregaProducto(f,n,p) {
    var f= db.collection("productos").document("id").get("imagen");
    var n= db.collection("productos").document("id").get("nombre");
    var p= db.collection("productos").document("id").get("precio");
    
  foto = f;
  producto = n;
  precio = p;
  cantidad = 1;

  $$('#foto').append(foto);
  $$('#descripcion').append(producto + "<br>");
  $$('#cantidad').append(cantidad+= + "<br>");
  $$('#precUnit').append(precio + "<br>");
  $$('#precTotal').append(cantidad * precio + "<br>");


  canTotal = parseInt($$('#totalArt').text());
  canTotal+= parseInt(cantidad);
  $$('#totalArt').text(canTotal);

  pesosTotal = parseInt($$('#totalPesos').text());
  pesosTotal+= parseInt((cantidad * precio));
  $$('#totalPesos').text(pesosTotal);


}

function fnNuevoUsuario() {

     email = $$('#mail').val();
     password = $$('#passw').val();
     nombre = $$('#nombre').val();
     apellido = $$('#apellido').val();
     cel = $$('#telefono').val();
     fecha = $$('#fecnac').val();
     direccion = $$('#direccion').val();
  
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Usuario creado. Agregar datos a la base de datos
          
          var datosUsuario = {
              nombre: nombre,
              apellido: apellido,
              telefono: cel,
              nacimiento: fecha,
              direccion: direccion,
              tipoUsuario: "Usuario"
          }
  
          colUsuarios.doc(email).set(datosUsuario)
              .then(function() {     // .then((docRef) => {
                console.log("BD OK!");
              mainView.router.navigate('/iniciar/');

              })
              .catch(function(error) {     // .catch((error) => {
                console.log("Error: " + error);
              });
  
        })
        .catch((error) => {   // error en AUTH
          var errorCode = error.code;
          var errorMessage = error.message;
  
          console.error(errorCode);
          console.error(errorMessage);
  
          if (errorCode == "auth/email-already-in-use") {
              console.error("el mail ya esta usado");
              $$('#mail').html("el mail ya esta usado");
          }
  
          // ..
        });
  
  
  
  }
  


function fnIngresoUsuario() {
  
  var email = $$('#mailLog').val();
  var password = $$('#passwLog').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        console.log("Bienvenid@!!! " + email);
        // traer los datos de la base de datos de ESTE usuario en particular

        docRef = coleccionUsuarios.doc(email)

            docRef.get(user).then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    nombre = doc.data().nombre;
                    apellido = doc.data().apellido;
                    tipoUsuario = doc.data().tipoUsuario;


                    if (tipoUsuario == "Usuario") {
                        console.log("anda para Usuario");
                         mainView.router.navigate('/index/');
                         fnSacaBoton()
                    } else {
                        console.log("vamos para el admin");
                    }

                } else {
                    // doc.data() will be undefined in this case
                    console.log("Debes registrarte para iniciar sesión");
                    mainView.router.navigate('/registro/');
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });


      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode);
            console.error(errorMessage);
            $$('#mailLog').html(errorMessage);
      });  
}

function fnSacaBoton() {
  $$('#ocultar').removeClass('visible').addClass('oculto');
}

function fnConfirmarPedido() {
  envio = $$('#envio').val();
  pago = $$('#pago').val();
  
  $$('#Rfoto').append($$('#foto').val());
  $$('#Rdescripcion').append($$('#descripcion').val());
  $$('#Rcantidad').append($$('#cantidad').val());
  $$('#RprecUnit').append($$('#precUnit').val());
  $$('#RprecTotal').append($$('#precTotal').val());
  $$('#RtotalArt').html($$('#totalArt').val());
  $$('#RtotalPesos').html($$('#totalPesos').val());
  $$('#envioR').html(envio);
  $$('#pagoR').html(pago);

  mainView.router.navigate('/resumen/');

}

function fnVolverInicio() {
  $$('#foto').text("");
  $$('#Rfoto').text("");
  $$('#descripcion').text("");
  $$('#Rdescripcion').text("");
  $$('#cantidad').text("");
  $$('#Rcantidad').text("");
  $$('#precUnit').text("");
  $$('#RprecUnit').text("");
  $$('#precTotal').text("");
  $$('#RprecTotal').text("");
  $$('#totalArt').text(0);
  $$('#RtotalArt').text(0);
  $$('#totalPesos').text(0);
  $$('#RtotalPesos').text(0);
  $$('#envio').text("");
  $$('#envioR').text("");
  $$('#pago').text("");
  $$('#pagoR').text("");
  
  mainView.router.navigate('/index/');

}