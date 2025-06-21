# 🛍️ API REST - Gestión de Productos

Esta API permite gestionar productos de una tienda simulada utilizando Node.js y Express.  
Los datos se almacenan en un archivo `productos.json` como si fuera una base de datos.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- ES Modules (`"type": "module"`)
- JSON como persistencia de datos
- `fs` para lectura/escritura de archivos

---

## 📁 Estructura del proyecto

```
API_Tarea/
├── controllers/
│   └── controller_productos.js
├── routes/
│   └── routes_productos.js
├── data/
│   └── productos.json
├── index.js
├── package.json
└── README.md
```

---

## 🛠️ Instrucciones para ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/api-productos.git
cd api-productos
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Ejecuta el servidor en modo desarrollo

Si estás usando Node.js versión 18 o superior:

```bash
npm run dev
```

> Este comando usa `node --watch index.js` para reiniciar automáticamente al guardar cambios.

---

## 🌐 Endpoints disponibles

| Método | Ruta                     | Descripción                       |
| ------ | ------------------------ | --------------------------------- |
| GET    | `/productos`             | Listar todos los productos        |
| GET    | `/productos/:id`         | Obtener un producto por su ID     |
| GET    | `/productos/disponibles` | Listar solo productos disponibles |
| POST   | `/productos`             | Agregar un nuevo producto         |
| PUT    | `/productos/:id`         | Actualizar un producto existente  |
| DELETE | `/productos/:id`         | Eliminar un producto por su ID    |

---

## ✅ Validaciones

- El `id` debe ser único y enviado manualmente.
- El `nombre` es obligatorio.
- El `precio` debe ser mayor a 0.
- La `descripcion` debe tener al menos 10 caracteres.
- El campo `disponible` debe ser booleano (`true` o `false`).

---

## 📬 Recomendación

Usa [Postman](https://www.postman.com/) o [VSCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) para probar los endpoints.

---

## 💬 Autor

Proyecto realizado por Saubdy Lucía Ramírez – Ingeniería en Sistemas 💻
