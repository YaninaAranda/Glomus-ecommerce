//* Bienvenida
let usuario = prompt(`Ingresa tu nombre`);
let sexo = prompt(`Indique su sexo. "F" para femenino, "M" para masculino", "X" para otros`);
let identidad = validarIdentidad();
let acumuladorHola = ``;
let catalogo = [];
let totalCarrito = 0;


acumuladorHola += `<h3>Hola ${usuario}!</h3>
<p>${identidad}</p>`;

document.getElementById("bienvenida").innerHTML = acumuladorHola ;



function validarIdentidad(){
    let auxiliar;
    if ((sexo) == `f` || (sexo) == `F` ){
        auxiliar = 'Bienvenida a Glomus';
    } else if ((sexo) == `m` || (sexo) == `M`){
        auxiliar = 'Bienvenida a Glomus';
    } else if ((sexo) == `x` || (sexo) == `X`){
        auxiliar ='Bienvenida a Glomus';
    } else {
        auxiliar =`Ingrese identidad válida`;
    }
    return auxiliar;
}
validarIdentidad() 



//*Constructor para productos *//
class modelo{
    constructor (imagen, nombre, detalle, precio, stock){
        this.imagen = imagen;
        this.nombre = nombre;
        this.detalle = detalle;
        this.precio = precio;
        this.stock = stock;
    }
}

let lenga = new modelo('/imagenes/modeloLenga.jpg','Modelo LENGA', 'Velador cubo nórdico, incluye lámpara vintage', 1500, 4);
let acacia = new modelo('/imagenes/modeloAcacia.jpg','Modelo ACACIA', 'Maceta cubo nórdica', 400, 2);
let calden = new modelo('/imagenes/modeloCalden.jpg','Modelo CALDÉN', 'Maceta cuadrada, ideal para suculentas o aromáticas', 400, 1);
let maiten = new modelo('/imagenes/modeloMaiten.jpg','Modelo MAITÉN', 'Maceta rectangular, ideal para suculentas o aromáticas', 600, 1);
let cipres = new modelo('/imagenes/modeloCipres.jpg','Modelo CIPRÉS', 'Perchero rústico con ganchos metálicos', 500, 1);
let alamo = new modelo('/imagenes/modeloAlamo.jpg','Modelo ÁLAMO', 'Portamaceta nórdico, incluye maceta de plástico nº18', 1500, 1);
let ambay = new modelo('/imagenes/modeloAmbay.jpg','Modelo AMBAY', 'Minimaceta doble', 400, 1);
let nogal = new modelo('/imagenes/modeloNogal.jpg','Modelo NOGAL', 'Organizador multipróposito', 1500, 1);
let ombu = new modelo('/imagenes/modeloOmbu.jpg','Modelo OMBÚ', 'Soporte para auriculares', 600, 1);
catalogo.push(lenga);
catalogo.push(acacia);
catalogo.push(calden);
catalogo.push(maiten);
catalogo.push(cipres);
catalogo.push(alamo);
catalogo.push(ambay);
catalogo.push(nogal);
catalogo.push(ombu);
console.log (catalogo);


//* Card de productos *//

let acumulador = ``;

for(let i = 0; i < catalogo.length; i++){
    console.log("valor del i:"+i)
acumulador +=  `<div class="col-lg-4 col-md-6 mb-4">
<div class="card h-100">
    <a href="#"><img class="card-img-top" src= "${catalogo[i].imagen}" alt=""></a>
    <div class="card-body">
        <h4 class="card-title">
            <a href="#">${catalogo[i].nombre}</a>
        </h4>
        <h5>$${catalogo[i].precio}</h5>
        <p class="card-text">${catalogo[i].detalle}</p>
    </div>
    <div class="card-footer">
    <button onclick="agregarAlCarrito(${catalogo[i].precio}, ${catalogo[i].stock})">Agregar</button>
    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
    </div>
    </div>
</div> `;   
}

document.getElementById("productos").innerHTML = acumulador;



//* Función agregar al carrito *//
function agregarAlCarrito(precio, stock){
    let tieneStock = validarStock(stock > 0);
    if (tieneStock){
    totalCarrito += precio;
    
    console.log(`Se agrego un nuevo producto al carrito. El total es: ${totalCarrito}`);
    alert(`El producto fue agregado exitosamente`);
    }
    else{
    console.log(`No hay stock`);
    }
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




  // Mostrar card :)
  // Mostrar el total de lo agregado al carrito :(
  // Mostrar los productos agregados al carrito :(
  // El boton de agregar al carrito en la card del producto :/
  // Borrar producto del carrito
  // Pagar con mercadopago o paypal