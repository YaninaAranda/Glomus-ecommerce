$('nav.nav-class').css({'background-color':'#143642', 'height': '100px'})
$('button').css({'padding': '0.5vw', 'background-color':'#143642', 'color': 'white', 'border-radius': '1px'})

//* Función para el Ingreso - Modal *//
let registroAbrir = document.getElementById('botonRegistro');
let registroCerrar = document.getElementById('aceptar');


let contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
let modalDatos = document.getElementsByClassName('modal-datos')[0]


registroAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
registroCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
modalDatos.addEventListener('click',(e)=> {
    e.stopPropagation()
})
contenedorModal.addEventListener('click', ()=> {
    registroCerrar.click()
})

//* MOSTRAR IDENTIDAD EN NAVEGADOR *//
let btn = document.getElementById("aceptar");
    
    btn.addEventListener('click', () => {
        let usuario = document.getElementById("nombre").value;
        let sexo = document.getElementById("sexo").value;
        let acumuladorHola = ``;
        let auxiliar;
        if ((sexo) == `f` || (sexo) == `F` ){
            auxiliar = 'Bienvenida a Glomus';
        } else if ((sexo) == `m` || (sexo) == `M`){
            auxiliar = 'Bienvenido a Glomus';
        } else if ((sexo) == `x` || (sexo) == `X`){
            auxiliar ='Bienvenidx a Glomus';
        } else {
            auxiliar =`Ingrese identidad válida`;
        }
        acumuladorHola += `<h5 class="ingresar"> Hola ${usuario}! ${auxiliar}</h5>`;
        
        $('.ingresar').replaceWith(acumuladorHola);
    })  

let totalCarrito = 0;
let catalogo = [];

//*Constructor para productos *//
class modelo{
    constructor (id, imagen, nombre, detalle, precio, stock){
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.detalle = detalle;
        this.precio = precio;
        this.stock = stock;
    }
}

let lenga = new modelo(0, '/imagenes/modeloLenga.jpg','Modelo LENGA', 'Velador cubo nórdico, incluye lámpara vintage', 1500, 4);
let acacia = new modelo(1, '/imagenes/modeloAcacia.jpg','Modelo ACACIA', 'Maceta cubo nórdica', 400, 2);
let calden = new modelo(2, '/imagenes/modeloCalden.jpg','Modelo CALDÉN', 'Maceta cuadrada, ideal para suculentas o aromáticas', 400, 1);
let maiten = new modelo(3, '/imagenes/modeloMaiten.jpg','Modelo MAITÉN', 'Maceta rectangular, ideal para suculentas o aromáticas', 600, 1);
let cipres = new modelo(4, '/imagenes/modeloCipres.jpg','Modelo CIPRÉS', 'Perchero rústico con ganchos metálicos', 500, 1);
let alamo = new modelo(5, '/imagenes/modeloAlamo.jpg','Modelo ÁLAMO', 'Portamaceta nórdico, incluye maceta de plástico nº18', 1500, 1);
let ambay = new modelo(6, '/imagenes/modeloAmbay.jpg','Modelo AMBAY', 'Minimaceta doble', 400, 1);
let nogal = new modelo(7, '/imagenes/modeloNogal.jpg','Modelo NOGAL', 'Organizador multipróposito', 1500, 1);
let ombu = new modelo(8, '/imagenes/modeloOmbu.jpg','Modelo OMBÚ', 'Soporte para auriculares', 600, 1);
catalogo.push(lenga);
catalogo.push(acacia);
catalogo.push(calden);
catalogo.push(maiten);
catalogo.push(cipres);
catalogo.push(alamo);
catalogo.push(ambay);
catalogo.push(nogal);
catalogo.push(ombu);

//* Card de productos *//
function printCatalogo(catalogo){
let acumulador = ``;

    catalogo.forEach(elementCatalogo => {
    
    acumulador +=  `<div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
        <a href="#"><img class="card-img-top" src= "${elementCatalogo.imagen}" alt=""></a>
        <div class="card-body">
            <h4 class="card-title">
                <a href="#">${elementCatalogo.nombre}</a>
            </h4>
            <h5>$${elementCatalogo.precio}</h5>
            <p class="card-text">${elementCatalogo.detalle}</p>
        </div>
        <div class="card-footer">
        <button onclick='agregarAlCarrito(${elementCatalogo.precio}, ${elementCatalogo.stock})'>Agregar</button>
        </div>
        </div>
    </div> `;  
    })
    return $('#productos').html(acumulador);
    
}
printCatalogo(catalogo);
$('button').css({'backgroundColor':'#143642', 'color': 'white', 'padding':'0.2em 1em'})

//* Condicional para precargar datos en Storage *//
let carrito = [];
let valorDelCarritoEnStorage = JSON.parse(localStorage.getItem('carrito'));

if(valorDelCarritoEnStorage == null){

    carrito = carritoEnLocalStorage
}else{
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
console.log(carrito)


//* Función agregar al carrito *//
function agregarAlCarrito(precio, stock){
    let tieneStock = validarStock(stock);
    if (tieneStock){
    totalCarrito += precio;

    localStorage.getItem('catalogo', catalogo);
    localStorage.catalogo = JSON.stringify(catalogo)
    console.log(`Se agrego un nuevo producto al carrito. El total es: $${totalCarrito}`);
    }
    else{
    console.log(`No hay stock`);
    }
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
function validarStock(stock){
    return stock > 0;
} 

//* cálculo del envio *//


function costoEnvio(){
    let elegirZona = document.getElementById("ubicación").value
    let aux;
    if ((elegirZona) == `zo` || (elegirZona) == `ZO` ){
        aux = `El costo de envío es $ ` + 400;
    } else if ((elegirZona) == `ze` || (elegirZona) == `ZE`){
        aux = `El costo de envío es $ ` + 600;
    } else if ((elegirZona) == `zn` || (elegirZona) == `ZN`){
        aux = `El costo de envío es $ ` + 800;
    } else if ((elegirZona) == `zs` || (elegirZona) == `ZS`){
        aux = `El costo de envío es $ ` + 600;
    } else if ((elegirZona) == `caba` || (elegirZona) == `CABA`){
        aux = `El costo de envío es $ ` + 600;
    } else {
        aux =`No hacemos envíos en esa zona`;
    }
    $('#envio').html(aux)
    
}

//*función para ordenar productos *//

let ordenamiento = document.getElementById("filter");

ordenamiento.addEventListener("click",function(e){
    e.stopPropagation();
    e.preventDefault();

    switch(ordenamiento.value){
        case '1':
            ordenA();
            break;
        case '2':
            ordenZ();
        break;    
        case '3':
            ordenMenos();
            break;
        case '4':
            ordenMas();
        break;   
    }
})

function ordenA() {

    catalogo.sort(function (o1,o2) {
        let aux1 = removerAcentos(o1.nombre);
        let aux2 = removerAcentos(o2.nombre);
            if (aux1 > aux2) {
            return 1;
            } else if (aux1 < aux2) {
            return -1;
            } 
            return 0;
            });
    return printCatalogo(catalogo);
}

function ordenZ() {
    
    catalogo.sort(function (o1,o2) {
        let aux1 = removerAcentos(o1.nombre);
        let aux2 = removerAcentos(o2.nombre);
            if (aux1 < aux2) {
            return 1;
            } else if (aux1 > aux2) {
            return -1;
            } 
            return 0;
            });
    return printCatalogo(catalogo);
    }

function ordenMenos() {

    catalogo.sort(function (o1,o2) {
        if (o1.precio > o2.precio) {
        return 1;
        } else if (o1.precio < o2.precio) {
        return -1;
        } 
        return 0;
    });
    return printCatalogo(catalogo);  
}

function ordenMas() {
    
    catalogo.sort(function (o1,o2) {
        if (o1.precio < o2.precio) {
        return 1;
        } else if (o1.precio > o2.precio) {
        return -1;
        } 
        return 0;
    });
    return printCatalogo(catalogo);  
}

function removerAcentos(string){
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 


//* uso de DOM para desafío 8 *//

$('em:last').append(`<br>¡Sé parte del cambio!`).css({'color':'#143642', 'fontWeight': 'bolder' })


//* FORMULARIO DE COMPRA - desafio 9 *//
let nombre = "";
let apellido = "";
let direccion= "";
let telefono= "";
let email= "";
const formulario = document.getElementById("formularioCompra")

let input1  = document.getElementById("nombre");
let input2  = document.getElementById("direccion");
input1.onkeyup   = () => {console.log("keyUp")};
input2.onkeydown = () => {console.log("keyDown")};

formulario.addEventListener("submit", function(e){
    e.preventDefault()
    formulario.classList.add("was-validated")
    document.getElementById("nombre").value= nombre
    document.getElementById("direccion").value = direccion 
    if(formulario.checkValidity()===false){
        return false
    } else{
    resumen ()
    mostrarResumen ()
    }
})

document.getElementById("botonEnviar").addEventListener('click', enviarDatos);

function enviarDatos(event){
    console.log('se envio formulario');
    console.log(event);
    console.log(event.target.value);
} 


//* creación de Menúes y Submenúes (DESAFIO 9 COMPLEMENTARIO) *//
let titulos = new Array();
let enlaces = new Array();

titulos[0] = new Array("Quienes somos");
enlaces[0] = new Array("#");

titulos[1] = new Array("Decoración", "Iluminación", "Jardín");
enlaces[1] = new Array("#", "#", "#");

//arrays para guardar elementos de la lista y submenús:
let menu= new Array();
let submenu= new Array();

window.onload = function() {
    for (i=0;i<titulos.length;i++) {

        menu[i]=document.getElementById("menuNav"+i);

        menu[i].innerHTML+="<div id='submenuNav"+i+"'></div>"

        submenu[i]=document.getElementById('submenuNav'+i);

    for (j=0;j<titulos[i].length;j++) {
        submenu[i].innerHTML += "<p><a href='"+enlaces[i][j]+"'>"+titulos[i][j]+"</a></p>";
        }
        menu[i].style.position="relative";
        submenu[i].style.position="absolute";
        submenu[i].style.top="100%";
        submenu[i].style.width="100%";
        submenu[i].style.left="10px";
        submenu[i].style.backgroundColor="#343a4080";
        submenu[i].style.font="0.8em Merriweather, serif";
        submenu[i].style.color="white"
        submenu[i].style.padding="1rem 1rem 0.5rem";
        submenu[i].style.display="none";	
    }

    /* uso de eventos onmouseover - onmouseout*/
    
    for (i=0;i<titulos.length;i++) {
        menu[i].onmouseover = ver;
        menu[i].onmouseout = ocultar;
        } 
}
        function ver() {
            muestra=this.getElementsByTagName("div")[0];
            muestra.style.display="block";
            }

    function ocultar() {
            oculta=this.getElementsByTagName("div")[0];
            oculta.style.display="none";
            }


/*             function filtrarPorRemeras(categoriaAFiltrar) {
                let productosFiltrados = productos.filter((element) => {
                  return element.category == "Remeras";
                });
                let acumulador = ``;
                productosFiltrados.forEach((element) => {
                  acumulador += `<h1>${element.name}</h1>`;
                });
                $("#root").html(acumulador);
              }
              function filtrarPorZapas() {
                let productosFiltrados = productos.filter(
                  (element) => element.category == "Zapas"
                );
                let acumulador = ``;
                productosFiltrados.forEach((element) => {
                  acumulador += `<h1>${element.name}</h1>`;
                });
                $("#root").html(acumulador);
              }

*/


  // Mostrar card :)
  // Mostrar el total de lo agregado al carrito :(
  // Mostrar los productos agregados al carrito :(
  // El boton de agregar al carrito en la card del producto :/
  // Borrar producto del carrito
  // Pagar con mercadopago 
