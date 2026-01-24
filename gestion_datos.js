const producto = {
    producto1:{ 
        id: '1',
        nombre: 'manzana',
        precio: '1500'
    },
    producto2: {
        id: '2',
        nombre: 'portatil',
        precio: '2000000'
    },
    producto3: {
        id: '3',
        nombre: 'remolacha',
        precio: '1200'
    }
}

const set = new Set([1,2,3,2,4,5,3,6]);
console.log(set);

set.add(8);

console.log(set.has(7));

set.delete(6);

console.log(set)
for (let e of set) {
    console.log(e)
}

const productosMap = new Map();

productosMap.set("Frutas", producto.producto1);
productosMap.set("Tecnología", producto.producto2);
productosMap.set("Tuberculos", producto.producto3);

productosMap.forEach((prod,categoria)=>{
    console.log(`Categoría: ${categoria}, ID: ${prod.id}, Nombre: ${prod.nombre}, Precio: ${prod.precio}`)
})

function validarProducto(prod) { 
    if (!prod.id || isNaN(prod.id)) { return false; }
     if (!prod.nombre || typeof prod.nombre !== "string") { return false; } 
     if (!prod.precio || isNaN(prod.precio)) { return false; } 
     return true; 
    }