import fs from 'fs';
import { Router } from "express";
import path from 'path';
import __dirname from "../utils.js";

const cartFile = '../cart.json';

const router = Router(); // Para poder redirigir a otras rutas

const cart = [];

router.get("/", (req, res) => {
    let cart = JSON.parse(fs.readFileSync(path.resolve(__dirname,cartFile),"utf-8")).Cart;
    res.send(cart)
});

router.post("/", (req, res) => {
    // Create user in req.body
    const product = req.body;
    cart.push(product);
    res.send({ status:"sucess" ,message: "Producto añadido." });
});

router.put("/:id", (req, res) => {
    // Update user in req.body at id
});

router.delete("/:id", (req, res) => {
    // Delete user in req.body at id
    id = req.params.id;
    cart.splice(id, 1);
});

export default router; // Permite que otros archivos puedan importar este archivo