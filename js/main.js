$('nav.nav-class').css({'padding-left': '10vw','background-color':'#143642','width':'100%','height': '100px', 'box-shadow':'0px 10px 20px #081418ce'}).slideDown(1000)
$('button').css({'padding': '0.5vw 1vw', 'background-color':'#143642', 'color': 'white', 'border-radius': '1px'})



/* VARIABLES GLOBALES*/
let registroAbrir = document.getElementById('botonRegistro');
let registroCerrar = document.getElementById('aceptar');
let contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
let modalDatos = document.getElementsByClassName('modal-datos')[0]
let btn = document.getElementById("aceptar");
const contenedorProductos = document.getElementById('productos')
const contenedorCarrito = document.getElementById('items')
const totalCarrito = document.getElementById("totalCarrito")
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const totalProductos = document.getElementById("totalProductos");
const storageCarrito = localStorage.getItem('carrito');
const storageIdentidad = localStorage.getItem('nombre');
const totalProductos_badge = document.getElementById("cantidad");
let carrito = [];
let catalogo = [];
let cantidad = 0;


//* PRIMER ACCIÓN DEL USUARIO: REGISTRARSE*//
if (storageIdentidad != null){
    usuario = [JSON.parse(storageIdentidad)];
}
//* Click y Registro a través de la creación de un Modal *//

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


//* Mostrar identidad en el navegador *//

    
    btn.addEventListener('click', () => {
        let usuario = document.getElementById("nombre").value;
        let sexo = document.getElementById("sexo").value; // se usará para obtener respuesta de bienvenida con un IF
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
        acumuladorHola += `<h5 class="ingresar"> ¡Hola ${usuario}! ${auxiliar}</h5>`;
        
        $('.ingresar').replaceWith(acumuladorHola);
    }) 


//* MOSTRAR CARDS *//

//* Petición AJAX: Utilizó datos Json estáticos y los traigo a las cards  *//
let obtenerProductos = async() =>{
    let response = await fetch ("./datos.json");
    let data = await response.json();

    catalogo = data
    printCatalogo(catalogo)
}
obtenerProductos()

//* Card de productos *//
function printCatalogo(catalogo){
    let acumulador= ``;
    
    catalogo.forEach((producto) => {

        acumulador +=  `<div class="cardStyle col-lg-4 col-md-6 mb-4"
        <div class=" card h-100">
        <a href="#"><img class="imgAnimate card-img-top" src= "${producto.imagen}" alt=""></a>
        <div class="card-body">
            <h4 class="card-title">
                <a href="#" class="card-title">${producto.nombre}</a>
            </h4>
            <h4 class="card-price">$${producto.precio}</h4>
            <p class="card-text">${producto.detalle}</p>
        </div>
        <div class="card-footer">
        <button class="card-style" onclick='agregarAlCarrito(${producto.id})'>Agregar</button>
        </div>
        </div>
    </div> `; 
    
    })
    return $('#productos').html(acumulador);
}
printCatalogo(catalogo);



//* Función agregar al carrito *//
function agregarAlCarrito(itemId){
    let itemEnCarrito = carrito.find(el => el.id == itemId)
    if (itemEnCarrito){
        itemEnCarrito.cantidad += 1
        
    } else{
        let {imagen, nombre, cantidad, precio, id} = catalogo.find( el => el.id == itemId )
        carrito.push({imagen: imagen, nombre: nombre, cantidad: 1, precio: precio, id: id})
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(itemId);
    actualizarCarrito()
}

function eliminarProducto(id) {
    let productoAEliminar = carrito.find( el => el.id == id )

    productoAEliminar.cantidad--

    if (productoAEliminar.cantidad == 0) {
        let indice = carrito.indexOf(productoAEliminar)
        carrito.splice(indice, 1)
    }

    console.log(carrito)
    actualizarCarrito()
}


//* Mostrar los productos elegidos en el submenú del boton Carrito *//


function actualizarCarrito() {
    let sumaCarrito = 0;
	let cantidadProductos = 0;
    contenedorCarrito.innerHTML=''

    carrito.forEach( (producto) => {
        const { imagen, nombre,  cantidad, precio, id } = producto;

		const row = document.createElement('tr');
		row.innerHTML= `<td><img src="${imagen}" width=70></td>
			<td>${nombre}</td>
			<td  class="cantidad-carrito" min="1" value="${cantidad}"></td>
			<td> <span class="precio">$${precio}</td>
			<td></td>
			<td><button onclick=eliminarProducto(${id}) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button></td>
            `
            contenedorCarrito.appendChild(row);
			cantidadProductos += cantidad;
			console.log(precio);
			sumaCarrito += (precio * cantidad);	
});
    totalCarrito.innerHTML = `$${sumaCarrito}`;
    totalProductos.innerHTML = `${cantidadProductos}`;
    totalProductos_badge.innerHTML = `${cantidadProductos}`;
};
actualizarCarrito()

if (storageCarrito != null){
    carrito = [JSON.parse(storageCarrito)];
}

carrito = JSON.parse(localStorage.getItem('items')) || [];

//* VACIAR CARRITO *//

btnVaciarCarrito.addEventListener('click', () => {
    totalCarrito.innerHTML = `$0`;
    totalProductos.innerHTML = `0`;
    totalProductos_badge.innerHTML = `0`;
    contenedorCarrito.innerHTML = null
});

//* Mostrar-Ocultar submenú para botón carrito *//
$(".submenu").on({
    'mouseover': function (e) {
        $(".submenu #carrito").slideDown('slow');
    },
    'mouseleave': function () {
        $(".submenu #carrito").slideUp('slow');
    }
})


//* FUNCIONES ACCESORIAS *//

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


//* asignando eventos a elementos del DOM con JQuery */

$(document).ready(function(){
    $("select").on({
        mouseenter: function(){
        $(this).css("background-color", "#14364238");
        },  
    });
});

//* Creación de Submenúes *//
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







  // Mostrar card :) 
  // Mostrar el total de lo agregado al carrito 
  // Mostrar los productos agregados al carrito 
  // El boton de agregar al carrito en la card del producto :)
  // Borrar producto del carrito :)
  // Pagar con mercadopago 
