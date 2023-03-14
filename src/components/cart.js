import { randomUUID } from 'crypto'

export default class Cart{
    constructor( products = [] ){
        this.id = `cart${randomUUID()}`

        this.products = products
    }
}