//hacer array de productos

const productos = [
    { id: 1, nombre: "manzanas", precio: 200, icon: "🍎" },
    { id: 2, nombre: "bananas", precio: 300, icon: "🍌" },
    { id: 3, nombre: "peras", precio: 400, icon: "🍐" }
]

let carrito = [];

//renderizar los productos

const stock = document.getElementById("stock")

let listaProductos = "";
productos.forEach((producto) => {
    listaProductos += `
            <div  class="cards">
                <b>${producto.nombre}</b><br>
                <p>${producto.icon}</p>
                <p>Unitario: $ ${producto.precio}</p>
                <button id="${producto.id}" onclick="comprar(${producto.id})">Comprar</button>              
            </div>
        `;
});


stock.innerHTML = listaProductos

//enviar al carrito

function comprar(id) {
    //primero encontrar al producto que coincide con el id del botón
    let productoElegido = productos.find(el => el.id == id)
    console.log(productoElegido)
    //luego ver si ya está en carrito o no
    if (carrito.some(el => el.id == id)) {

        //encontrar el índice del productoElegido
        let indice = carrito.findIndex(el => el.id == id)
        //agregar cantidad en ese
        carrito[indice].cantidad += 1
        //calcular precioTotal
        carrito[indice].precioTotal = carrito[indice].cantidad * carrito[indice].precio
        //alert("el producto ya está en el carrito")
        console.log("existe")



    } else {

        console.log("no existe")
        //construir un nuevo objeto con cantidad
        const nuevoObjetoACarrito = {
            id: productoElegido.id,
            nombre: productoElegido.nombre,
            icon: productoElegido.icon,
            precio: productoElegido.precio,
            cantidad: 1,
            precioTotal: parseInt(productoElegido.precio)
            //el precioTotal arranca con el valor unitario parseado porque luego hay que multiplicarlo

        }

        //luego pushearlo al carrito
        carrito.push(nuevoObjetoACarrito)
        console.log(carrito)
    }
    renderCarrito(carrito)
    //calcular total
    calcularTotal()
}

//renderizar carrito

function renderCarrito(cart) {
    console.log(cart)
    const carro = document.getElementById("carro")

    let listaProductosCarrito = "";
    cart.forEach((producto) => {
        listaProductosCarrito += `
            <div  class="cards">
                <b>${producto.nombre}</b><br>
                <p>${producto.icon}</p><br>
                <p>Unitario: $ ${producto.precio}</p>
                <div class="counter">
                <button onclick="restar(${producto.id})">➖</button>
                <p class="numero">${producto.cantidad}</p><br>
                <button onclick="sumar(${producto.id})">➕</button>
                </div>
                <p>Total ${producto.nombre}: $ ${producto.precioTotal}</p>
                <button id="btn${producto.id}" onclick="eliminar(${producto.id})">❌</button>              
            </div>
        `;
    });


    carro.innerHTML = listaProductosCarrito
    console.log("anda")
}

//botones del carrito X

function eliminar(id) {
    console.log(id)
    //filtramos los que no coinciden con el id del click
    let nuevoCarrito = carrito.filter(el => el.id !== id)
    console.log(nuevoCarrito)
    //igualar carrito a nuevoCarrito
    carrito = [...nuevoCarrito]
    //borramos el carrito de la pantalla
    carro.innerHTML = "<p>Carrito Vacío</p>";
    //renderizamos de nuevo
    renderCarrito(nuevoCarrito)
    console.log(carrito)

    calcularTotal()
}

//botones del carrito + y -

function sumar(id) {
    console.log("anda sumar")
    //sumo cantidades
    carrito[carrito.findIndex(el => el.id == id)].cantidad += 1
    //sumo precioTotal
    carrito[carrito.findIndex(el => el.id == id)].precioTotal = carrito[carrito.findIndex(el => el.id == id)].cantidad * carrito[carrito.findIndex(el => el.id == id)].precio

    renderCarrito(carrito)
    calcularTotal()
}

function restar(id) {
    console.log("anda restar")

    //uso el condicional para que no baje la cantidad a números negativos
    if (carrito[carrito.findIndex(el => el.id == id)].cantidad > 0) {
        carrito[carrito.findIndex(el => el.id == id)].cantidad -= 1

        //resto precioTotal
        carrito[carrito.findIndex(el => el.id == id)].precioTotal = carrito[carrito.findIndex(el => el.id == id)].cantidad * carrito[carrito.findIndex(el => el.id == id)].precio


        renderCarrito(carrito)
        calcularTotal()
    }
}

//botón de vaciar carrito

function vaciar() {
    console.log("vaciar")
    carrito = []
    renderCarrito(carrito)
    calcularTotal()

}

//cálculo total

function calcularTotal() {
    const totalCarrito = carrito.map(item => item.precioTotal).reduce((prev, curr) => prev + curr, 0);
    console.log(totalCarrito)
    let total = document.getElementById("total")
    total.innerText = `Total a pagar: $ ${totalCarrito}`
}
calcularTotal()