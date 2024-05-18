import { Router } from "express"
import productsDAO from '../dao/mongodb/productsDAO.js'

const productsdbRouter = Router()
const productsDaoInstance = new productsDAO()


// GET

productsdbRouter.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort } = req.query
        const user = req.session.user
        const firstName = user ? user.name : null
        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        
        res.render('productsdb', { firstName , ...result })
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})

/* productsdbRouter.get('/', async (req, res) => {
    try {
        // Verifica si el token de autenticación está presente en el encabezado de la solicitud
        const token = req.headers.authorization;

        if (!token) {
            // Si no se proporciona token, devuelve un error de no autorizado
            return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
        }

        // Verifica el token para validar la autenticación
        jwt.verify(token, 'clave_secreta', async (err, decoded) => {
            if (err) {
                // Si el token no es válido, devuelve un error de no autorizado
                return res.status(401).json({ message: 'Token de autenticación inválido' });
            }

            // Si el token es válido, obtén los productos y responde con los datos
            let { page = 1, limit = 10, sort } = req.query;
            const result = await productsDaoInstance.getAllProducts(page, limit, sort);
            res.json(result);
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}); */

/* productsdbRouter.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, sort } = req.query
        const firstName = req.session.user ? req.session.user.name : null
        const result = await productsDaoInstance.getAllProducts(page, limit, sort)
        
       
      res.render('productsdb', { firstName , ...result})
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
}) */

// POST
productsdbRouter.post("/", async (req, res) => {
    try {
        const newProduct = await productsDaoInstance.addProduct(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

// GET de detalle producto por id
productsdbRouter.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await productsDaoInstance.getProductById(productId)
        if (!product) {
            return res.status(404).send('Producto no encontrado')
        }

        res.render('productDetail', product)
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error)
        res.status(500).send('Error interno del servidor')
    }
})

// PUT
productsdbRouter.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const updatedProduct = await productsDaoInstance.updateProduct(productId, req.body)
        if (!updatedProduct) {
            return res.status(404).send("Producto no encontrado")
        }
        res.json(updatedProduct)
    } catch (error) {
        console.error("Error al actualizar el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

// DELETE
productsdbRouter.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const deletedProduct = await productsDaoInstance.deleteProduct(productId)
        if (!deletedProduct) {
            return res.status(404).send("Producto no encontrado")
        }
        res.json(deletedProduct)
    } catch (error) {
        console.error("Error al eliminar el producto:", error)
        res.status(500).send("Error interno del servidor")
    }
})

export default productsdbRouter
