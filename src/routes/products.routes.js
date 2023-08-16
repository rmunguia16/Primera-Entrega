import fs from 'fs';
import { Router } from 'express';
import uploader	 from '../services/uploader.js';
import path from 'path';
import __dirname from "../utils.js";

const productsFile = '../products.json';

const router = Router();

const products = [];

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post('/', uploader.single("image"), (req, res) => {
    const product = req.body;
    products.push(product);
    res.send({ status: 'success', message: 'product created.' });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const product = req.body;
    products[id] = product;
    res.send({ status: 'success', message: 'product updated.' });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    products.splice(id, 1);
    res.send({ status: 'success', message: 'product deleted.' });
});

export default router;