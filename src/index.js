import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
const productsFile = '../products.json';
const cartFile = '../products.json';

const app = express();

app.use(express.urlencoded({extended: true}));


app.get('/products', (req, res) => {
    let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,productsFile),"utf-8")).Products;
    let id = req.params;
    console.log("El id solicitado es"+id);
    let limit = req.query.limit;
    if (limit == undefined) {
        res.send(products)
    }
    else {
        let productLimit = [];
        for (let i = 0; i < limite; i++) {
            productLimit.push(products[i]);
        }
        res.send(productLimit);
    }
});


app.get('/products/:id', (req, res) => {
    let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,productsFile),"utf-8")).Products;
    const { id } = req.params;
    console.log("El id solicitado es "+id);

    const product = function () {
        let busqueda = products.find(element => element.id == id);
        if (busqueda == undefined) {
            console.log("No existe el producto "+id);
            return undefined;
        } else {
            
            return busqueda;
        }
    }();

    product == undefined ? res.send("No existe el producto "+id) : res.send(product);
});

app.post('/products', (req, res) => {
    let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,productsFile),"utf-8")).Products;
    let id = req.params;
    console.log("El id solicitado es"+id);
    let limit = req.query.limit;
    if (limit == undefined) {
        res.send(products)
    }
    else {
        let productLimit = [];
        for (let i = 0; i < limite; i++) {
            productLimit.push(products[i]);
        }
        res.send(productLimit);
    }
});


app.get('/cart', (req, res) => {
    let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,productsFile),"utf-8")).Products;
    let id = req.params;
    console.log("El id solicitado es"+id);
    let limit = req.query.limit;
    if (limit == undefined) {
        res.send(products)
    }
    else {
        let productLimit = [];
        for (let i = 0; i < limit; i++) {
            productLimit.push(products[i]);
        }
        res.send(productLimit);
    }
});


app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

// Path: src\app.js