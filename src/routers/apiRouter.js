import express, { Router } from 'express';
import { cartsRouter } from './cartsRouter.js';
import { productsRouter } from './productsRouter.js';


export const apiRouter = Router();

apiRouter.use(express.json())  // extrae cuepro de peticion, lo guarda en body
                                            // este router va a usar estas funcioalidades de q si viene algo por aca lo extraigo en el campo body 
apiRouter.use(express.urlencoded({extended: true}))// ve la url q le llega, agarra el query string y lo parsea y lo guarda en el body. 
apiRouter.use('/products',productsRouter)
apiRouter.use('/carts',cartsRouter)








