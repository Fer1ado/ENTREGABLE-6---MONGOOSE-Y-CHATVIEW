import { Router } from "express";
import CartManager from "../dao/filesystem/cartManager.js"
import { MongoCartManager } from "../dao/db/cartManager.js";

const cartRoute = Router();
const carro = new CartManager()

cartRoute.get("/:cid", async(req, res)=>{
    const cid = req.params.cid
    res.send(await MongoCartManager.getCarrito(cid))
})

cartRoute.get("/", async(req, res)=>{
    const cid = req.params.cid
    res.send(await MongoCartManager.findAll(cid))
})

cartRoute.post("/",async (req, res) => {
    const cart = res.send(await MongoCartManager.createCart());
})


cartRoute.post("/:cid/product/:pid",async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid
    res.send(await MongoCartManager.addCartProd(cid,pid));
   
})

cartRoute.delete("/:cid", async(req, res)=>{
    const cid = req.params.cid
    res.send(await MongoCartManager.deleteCart(cid))
})


export default cartRoute