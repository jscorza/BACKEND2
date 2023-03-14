import { Router } from 'express';
import Cart from '../components/cart.js';
import { CartsManager } from '../manager/cartsManager.js';
import { productsRouter } from './productsRouter.js';



export const cartsRouter = Router();

const path = './src/files/carts.json'
const cartsManager = new CartsManager(path)

cartsRouter.get('/:cid', async (req, res,next) => { 
    try {
        const prods = await cartsManager.getCartProductsById(req.params.cid)
        res.json(prods)
    } catch (error) {
        next(error)
    }
    

});

cartsRouter.get('/', (req, res,next) => { 
    try {
        const prods = cartsManager.getCarts()
        res.json(prods)

    } catch (error) {
        next(error)
    }
    

});

cartsRouter.post('/', async (req, res,next)   => {
    try {
        const cart = new Cart()
        const up = await cartsManager.addCart(cart)
        res.json(cart)
    } catch (error) {
        next(error)
    }

});


cartsRouter.post('/:cid/product/:pid', async (req, res,next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        
        const prod = await cartsManager.addProductCartId(cid,pid)
        res.json(prod)


    } catch (error) {
        next(error)
    }

});




