import fs from 'fs';
import { Router } from 'express';
import path from 'path';
import __dirname from "../utils.js";
import PM from '../../productManager.js';
import utils from '../utils.js';

const cartFile = '../cart.json';
const productsFile = '../products.json';

let cart = new PM.ProductManager(path.resolve(__dirname,cartFile),"Cart");
let products = new PM.ProductManager(path.resolve(__dirname,productsFile), "Products");

const router = Router();

router.get("/", (req, res) => {
    res.send(cart.getProducts());
});

router.get("/:cid", (req, res) => {
    res.send(cart.getProductsById(req.params.cid));
});

router.post("/", (req, res) => {
    let newCart = PM.cartFormat;
    newCart.Cart.id = Date.now();
    fs.writeFileSync(path.resolve(__dirname,cartFile), JSON.stringify(newCart));
    res.send({ status: 'success', message: 'cart created.', id: newCart.Cart.id});
});

router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
    let product = products.getProductsById(pid);
    if (product.status != "Failure" || cart.status != "Failure"){
        let answer = cart.addProduct({"id":pid,"quantity":req.body.quantity},cid);
        res.send(answer);
    }
    else{
        res.send({
            "status": "Failure",
            "message": "No se encontro el producto o el carrito"
        });
    }
});

router.put("/:cid", (req, res) => {
    // Update user in req.body at id
});

router.delete("/:cid", (req, res) => {
    // Delete user in req.body at id
});

export default router; // Permite que otros archivos puedan importar este archivo