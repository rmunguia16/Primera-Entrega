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
    let cart = JSON.parse(fs.readFileSync(path.resolve(__dirname,cartFile),"utf-8")).Cart;
    const product = req.body;
    if (product.id == null) {};
    fs.writeFileSync(cartFile, JSON.stringify({"Products":Cart}));
    res.send({ status:"sucess" ,message: "Producto añadido." });
});

router.put("/:cid", (req, res) => {
    // Update user in req.body at id
});

router.delete("/:cid", (req, res) => {
    // Delete user in req.body at id
});

export default router; // Permite que otros archivos puedan importar este archivo