import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import productos from '../data/productos.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productosFilePath = path.join(__dirname, '../data/productos.json');

const saveProducts = () => {
    fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
}

export const getAll = (req, res) => {
    res.json(productos);
}

export const getDisponibles = (req, res) => {
    const disponibles = productos.filter(prod => prod.disponible);
    res.json(disponibles);
}

export  const getById  = (req, res) => {
   
    const { id } = req.params;
    const producto = productos.find(prod => prod.id === id);

    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(producto)
}

export const createProduct = (req, res) => {
    const {id, nombre, precio, descripcion, disponible, fecha_ingreso} = req.body

    const errors = [];
    if (!id || typeof id !== 'string') {
        errors.push('El ID es requerido y debe ser una cadena de texto');
    }

    if (!nombre || typeof nombre !== 'string') {
        errors.push('El nombre es requerido y debe ser una cadena de texto');
    }

    if (precio === undefined || typeof precio !== 'number' || precio <= 0) {
        errors.push('El precio es requerido y debe ser un número mayor a 0');
    }

    if (!descripcion || typeof descripcion !== 'string' || descripcion.length < 10) {
        errors.push('La descripción es requerida y debe tener al menos 10 caracteres');     
    }

    if (productos.find(prod => prod.id === id)) {
        return res.status(400).json({ 
            message: 'El ID ya existe' 
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false,
            message: 'Datos inválidos: ' + errors.join(', ') 
        });
    }

    const validDate = fecha_ingreso && !isNaN(new Date(fecha_ingreso).getTime()); 
    const date = validDate ? new Date(fecha_ingreso).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    const newProduct = { 
        id, 
        nombre, 
        precio, 
        descripcion, 
        disponible: disponible ?? false,
        fecha_ingreso: date
    }
    
    productos.push(newProduct);
    try { 
        saveProducts();
        res.status(201).json({
            success: true,
            message: 'Producto creado correctamente',
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al crear el producto',
            error: error.message
        });
    }
}

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const updates =req.body;

    const productIndex = productos.findIndex(prod => prod.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ 
            success: false,
            message: 'Producto no encontrado' 
        });
    }

    const erros = [];

    if (updates.nombre !== undefined && typeof updates.nombre !== 'string') {
        erros.push('El nombre debe ser una cadena de texto');
    }

    if (updates.precio !== undefined) {
        if (typeof updates.precio !== 'number' || updates.precio <= 0) {
            erros.push('El precio debe ser un número mayor a 0 y numerico');
        }
    }

    if (updates.descripcion !== undefined && updates.descripcion.length < 10) {
        erros.push('La descripción debe tener al menos 10 caracteres');
    }

    if (erros.length > 0) {
        return res.status(400).json({ 
            success: false,
            message: 'Datos inválidos: ' + erros.join(', ') 
        });
    }

    const updatedProduct= {
        ...productos[productIndex],
        ...updates,
        fecha_ingreso: productos[productIndex].fecha_ingreso // Mantener la fecha de ingreso original
    };

    productos[productIndex] = updatedProduct;
    
    try{
        saveProducts(productos);
        res.json({
            success: true,
            message: 'Producto actualizado correctamente',
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
}

export const deleteProduct = (req, res) => {
    const { id } = req.params;

    const productIndex = productos.findIndex(prod => prod.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ 
            message: 'Producto no encontrado' 
        });
    }

    productos.splice(productIndex, 1);
    saveProducts();

    res.json({
        message: 'Producto eliminado correctamente',
    });
}