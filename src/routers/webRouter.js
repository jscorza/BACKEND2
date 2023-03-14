import { Router } from 'express';

export const webRouter = Router();

webRouter.use((req,res,next)=>{
    
    next()
})
webRouter.get('/products', (req, res) => { res.json(['productos']); });
webRouter.get('/carts', (req, res) => { res.json; });
