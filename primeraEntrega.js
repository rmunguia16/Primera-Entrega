const fs = require("fs");

class ProjectManager {
    constructor() {
        this.products = [];
        this.path = "./productos.json";
    }
    getProducts() {
        if (fs.existsSync('./productos.json')){
            let productos = fs.readFileSync(this.path, "utf-8", (err, data) => {
                if (err) {
                    console.log("Error al leer el archivo");
                    return '';
                } else {
                    productos.forEach(element => {
                        this.products.push(element);
                    });
                }
            });
            return(this.products);
        }
    }
    addProduct(product) {
        let flag = true;
        this.products.forEach(element => {
            if (element.id == product.id) {
                console.log("No se puede agregar, porque el producto ya existe");
                flag = false;
            }
        });
        if (flag){
            this.products.push(product);
            fs.writeFileSync(this.path, JSON.stringify(this.products), (err) => {
                if (err) {
                    console.log("Error al escribir el archivo");
                } else {
                    console.log("Producto agregado correctamente");
                }
            });
        };
    };
    getProductsById(id) {
        let productById = this.products.find(element => element.id == id);
        if (productById == undefined) {
            console.log("No existe el producto "+id);
        } else {
            return productById;
        }
    }
    updateProduct(id, product) {
        let productById = this.products.find(element => element.id == id);
        if (productById == undefined) {
            console.log("No existe el producto "+id);
        } else {
            'Actualiza el producto'
        }
    }
};

const productManager = new ProjectManager();

let product = {
    id: productManager.products.length+1,
    title : "producto prueba",
    description : "Este es un producto prueba",
    price : 200,
    thumbnail : "Sin imagen",
    code : "abc123",
    stock : 25
};    

console.log("Lista de productos:");
productManager.addProduct(product);
console.log(productManager.getProducts());

let product2 = {
    id: productManager.products.length+1,
    title : "producto prueba",
    description : "Este es un producto prueba",
    price : 200,
    thumbnail : "Sin imagen",
    code : "abc123",
    stock : 25
};    

let productoModificado = (id)=> {
    return(
        {
            id: id,
            title : "producto nuevo",
            description : "Este es un producto modificado",
            price : 300,
            thumbnail : "Sin imagen",
            code : "159753",
            stock : 250
        }
    )
};    

productManager.addProduct(product2);
console.log(productManager.getProductsById(1)); // Devuelve el producto
console.log(productManager.getProducts()); // Devuelve el producto
productManager.getProductsById(-10); // Error del producto
productManager.updateProduct(1, productoModificado(1)); // Actualiza el producto