import fs from 'fs';

class Product {
    constructor(id, title, description, code, price, status, stock, category, thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail || undefined;
    }
};

const objectKeys = ["id", "title", "description", "code", "price", "status", "stock", "category", "thumbnail"]
const cartKeys = ["id", "quantity"]
const cartFormat ={
    "Cart":{
        "id":null,
        "products":[]
    }
}
const productFormat ={
    "Products":[]
}

class ProductManager {

    constructor(path,type,id) {
        this.productList = [];
        this.path = path;
        this.type = type;
        this.id = id || undefined;
    }


    getProducts() {
        this.productList = [];
        if (fs.existsSync(this.path)) {
            if (this.type=="Products"){
                let products = JSON.parse(fs.readFileSync(this.path, "utf-8")).Products;}
            else if (this.type=="Cart"){
                let products = JSON.parse(fs.readFileSync(this.path, "utf-8")).Cart.products;}
            else{
                return({
                    "status": "Failure",
                    "message": "No se encontro prodcutos porque el tipo no es correcto"
                });
            }
            if (products != undefined) products.forEach(element => this.productList.push(element));
        }
        return this.productList;
    };


    getProductsById(id) {
        this.getProducts();
        let productById = this.productList.find(element => element.id == id);
        if (productById == undefined) {
            console.log("No existe el producto " + id);
            return({
                "status": "Failure",
                "message": "No se encontro el producto"
            });
        } else {
            return productById;
        }
    };


    addProduct(product) {
        this.getProducts();
        if (product.thumbnail == undefined || updateProduct.thumbnail == null) product.thumbnail = "Sin imagen";
        if (this.type=="Cart"){
            if (Object.keys(product).toString() != cartKeys.toString()) {
                console.log("No se puede agregar, porque el producto no tiene las propiedades necesarias");
                return({
                    "status": "Failure",
                    "message": "No se pudo agregar el producto"
                });
            }
        } else{
            if (Object.keys(product).toString() != objectKeys.toString()) {
                console.log("No se puede agregar, porque el producto no tiene las propiedades necesarias");
                return({
                    "status": "Failure",
                    "message": "No se pudo agregar el producto"
                });
            }
        };
        let flag = true;
        this.productList.forEach(element => {
            if (flag != false) {
                if (element.code == product.code) {
                    console.log("No se puede agregar, porque el producto ya existe");
                    flag = false;
                }
            }
        });
        if (flag) {
            if (type =="Products") product.id = Date.now();
            this.productList.push(product);
            try{
                if (this.type=="Products"){
                    let jsonProdcuts = productFormat;
                    jsonProdcuts.Products = this.productList;
                    fs.writeFileSync(this.path, JSON.stringify(jsonProdcuts));
                }   else if (this.type=="Cart"){
                    let jsonCart = cartFormat;
                    jsonCart.id = this.id;
                    jsonCart.Cart.products = this.productList;
                    fs.writeFileSync(this.path, JSON.stringify(jsonCart));}
                else{
                    return(
                    {
                        "status": "Failure",
                        "message": "No se pudo agregar el producto porque el tipo no es correcto"
                    });
                }
                console.log("Producto agregado correctamente");
                return({
                    "id": product.id,
                    "title": product.title,
                    "status": "Success",
                    "message": "Producto agregado correctamente"
                });
            }
            catch(err) {
                console.log("Error al escribir el archivo:\n" + err + "\n");
                return({
                    "status": "Failure",
                    "message": "No se pudo agregar el producto"
                })
            };
        } else{
            return({
                "status": "Failure",
                "message": "No se pudo agregar el producto, porque ya existe"
            });
        }
    };


    updateProduct(id, product) {
        let updateProduct = product;
        updateProduct.id = id;
        if (updateProduct.thumbnail == undefined || updateProduct.thumbnail == null) {
            updateProduct.thumbnail = "Sin imagen";
        };
        this.getProducts();
        if (Object.keys(updateProduct).toString() != objectKeys.toString()) {
            console.log("No se puede agregar, porque el producto no tiene las propiedades necesarias");
            return;
        };


        let productIndex = this.productList.findIndex(element => element.id == id);
        console.log(this.productList[productIndex]);
        if (productIndex == -1) {
            console.log("No existe el producto " + id);
            return({
                "status": "Failure",
                "message": "No se pudo agregar el producto, porque ya existe"
            });
        } else {
            this.productList[productIndex] = updateProduct;
        };
        try{
            if (this.type=="Products"){
                let jsonProdcuts = productFormat;
                jsonProdcuts.Products = this.productList;
                fs.writeFileSync(this.path, JSON.stringify(jsonProdcuts));
            }   else if (this.type=="Cart"){
                let jsonCart = cartFormat;
                jsonCart.id = this.id;
                jsonCart.Cart.products = this.productList;
                fs.writeFileSync(this.path, JSON.stringify(jsonCart));}
            else{
                return(
                {
                    "status": "Failure",
                    "message": "No se pudo agregar el producto porque el tipo no es correcto"
                });
            }
            console.log("Producto actualizado correctamente");
            return({
                "id": product.id,
                "title": product.title,
                "status": "Success",
                "message": "Producto actualizado correctamente"
            })
        }
        catch(err) {
            console.log("Error al escribir el archivo:\n" + err + "\n");
            return({
                "status": "Failure",
                "message": "No se pudo actualizar el producto"
            });
        };

    };


    deleteProduct(id) {
        this.getProducts();
        let productIndex = this.productList.findIndex(element => element.id == id);
        if (productIndex == -1) {
            console.log("No existe el producto " + id);
            return({
                "status": "Failure",
                "message": "No existe el producto"
            });
        } else {
            this.productList.splice(productIndex, 1);
        }
        try{
            if (this.type=="Products"){
                let jsonProdcuts = productFormat;
                jsonProdcuts.Products = this.productList;
                fs.writeFileSync(this.path, JSON.stringify(jsonProdcuts));
            }   else if (this.type=="Cart"){
                let jsonCart = cartFormat;
                jsonCart.id = this.id;
                jsonCart.Cart.products = this.productList;
                fs.writeFileSync(this.path, JSON.stringify(jsonCart));}
            else{
                return(
                {
                    "status": "Failure",
                    "message": "No se pudo agregar el producto porque el tipo no es correcto"
                });
            }
            console.log("Producto borrado correctamente");
            return({
                "id": id,
                "status": "Success",
                "message": "Producto borrado correctamente"
            })
        }
        catch(err) {
            console.log("Error al escribir el archivo:\n" + err + "\n");
            return({
                "status": "Failure",
                "message": "Error al borrar el producto"
            });
        };
    };
};

export default {ProductManager, Product} ;