import express,{ Router } from 'express';
import { randomUUID } from 'crypto'
import Product from '../components/product.js';
import { ProductsManager } from '../manager/productsManager.js';


export const productsRouter = Router();
productsRouter.use(express.json()); // Agregar este middleware antes de la ruta POST
const path = './src/files/products.json'
const productManager = new ProductsManager(path)

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await productManager.getProducts()
        if(pet.query["limit"]){
            res.json(products.slice(0,pet.query["limit"]))
            
    
        }else{
            
            res.json(products)
        }

    } catch (error) {
        next(error)
    }
})

productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const prod = await productManager.getProductById(req.params.pid)
        res.json(prod)
    } catch (error) {
        next(error)
    }
})



productsRouter.post('/', async (req, res, next) => {
  try {
    const product = new Product({
        id: randomUUID(),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        code: req.body.code,
        stock: req.body.stock,
        category: req.body.category,
        status: req.body.status
      });;
    const prod = await productManager.addProduct(product);
    res.status(200).send(JSON.stringify(prod));
  } catch (error) {
    next(error);
  }
});

productsRouter.put('/:pid', async (req, res, next) => {
    let newProd
    try {
        newProd = new Product({
            id: req.params.pid,
            ...req.body
        })
    } catch (error) {
        next(error)
        return
    }

    try {
        const replacedProd = await productManager.replaceProduct(req.params.pid, newProd)
        res.json(newProd)
    } catch (error) {
        next(error)
    }
})

productsRouter.delete('/:pid', async (req, res, next) => {
    try {
        const del = await productManager.deleteProduct(req.params.pid)
        res.json(del)
        // res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})
