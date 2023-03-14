import fs from 'fs/promises'

export class CartsManager {
    #carts
    #path


    constructor(path) {
        this.#path = path
        this.#carts = []
    }

    async #leer() {
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#carts = JSON.parse(json)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#carts, null, 2)
        await fs.writeFile(this.#path, nuevoJson)
    }

    async getCarts() {
        await this.#leer()
        return this.#carts
    }

    async getCartProductsById(id) {
        await this.#leer();
        const cart = this.#carts.find(c => c.id == id);
    
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
    
        const products = cart.products;
    
        return products;
    }

    async addCart(cart) {
        await this.#leer();
        this.#carts.push(cart);
        await this.#escribir();
        return cart;
      }

    
      async addProductCartId(cid, pid) {
        try {
          await this.#leer();
      
          // Buscar el carrito por su id
          const cartIndex = this.#carts.findIndex((cart) => cart.id === cid);
          if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
          }
      
          // Buscar el producto por su id
          const productIndex = this.#carts[cartIndex].products.findIndex(
            (product) => product.id === pid
          );
      
          if (productIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar su cantidad
            this.#carts[cartIndex].products[productIndex].quantity++;
          } else {
            // Si el producto no está en el carrito, agregarlo
            this.#carts[cartIndex].products.push({ id: pid, quantity: 1 });
          }
      
          await this.#escribir();
      
          return this.#carts[cartIndex];
        } catch (error) {
          throw new Error(`No se pudo agregar el producto al carrito: ${error}`);
        }
      }
}