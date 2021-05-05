//* Bienvenida
let usuario = prompt(`Ingresa tu nombre`);
let sexo = prompt(`Indique su sexo. "F" para femenino, "M" para masculino", "X" para otros`);
let identidad = validarIdentidad();
let totalCarrito = 0;
let catalogo = [];

let bienvenida = document.getElementById('bienvenida')

bienvenida.innerText = `¡Hola ${usuario}! ${identidad}`;
localStorage.setItem('bienvenida', usuario);
localStorage.setItem('bienvenida', identidad);

function validarIdentidad(){
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
    return auxiliar;
}
validarIdentidad() 

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
        <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        </div>
        </div>
    </div> `;  
    })
    return document.getElementById("productos").innerHTML = acumulador;
}
printCatalogo(catalogo);

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
    alert(`El producto fue agregado exitosamente`);
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
    let elegirZona = prompt(`Ingrese su ubicación: Zona Oeste (ZO), Zona Este (ZE), Zona Norte (ZN), Zona Sur (ZS), CABA`);
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
    document.getElementById("envio").innerHTML = aux;
}


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
/* agrego párrafo */
const parrafo = document.createElement('p');

/* agrego texto */
parrafo.textContent = `¡Sé parte del cambio!`;

/* Agrego clases */
parrafo.classList.add('change_color', 'formatos_btn', 'center', 'small');

const divParrafo = document.querySelector('.parrafo');
divParrafo.appendChild(parrafo);

//* CARRITO AGREGADO *//
function carritoAgregado (){
    alert 
}

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
    alert(`Muchas gracias por su compra, en breve le estaremos enviando sus productos.`)
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
        submenu[i].style.font="normal 0.8em Oswald";
        submenu[i].style.color="white"
        submenu[i].style.padding="0.2em 1em";
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







  // Mostrar card :)
  // Mostrar el total de lo agregado al carrito :(
  // Mostrar los productos agregados al carrito :(
  // El boton de agregar al carrito en la card del producto :/
  // Borrar producto del carrito
  // Pagar con mercadopago 
