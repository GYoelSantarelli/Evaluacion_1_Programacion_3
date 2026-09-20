# Food Store -  (Evaluación 1 - Programación 3)

Este proyecto corresponde a la **Evaluación 1 de Programación 3** de la Tecnicatura Universitaria en Programación (UTN). Consiste en la evolución de la plataforma **Food Store**, transformándola en una aplicación web desarrollada con HTML5, CSS3, JavaScript y TypeScript, utilizando **Vite** como empaquetador de módulos.

##  Funcionalidades Implementadas

* **Catálogo de Productos**: Renderizado dinámico de tarjetas de comidas organizadas en una grilla responsiva.

* **Búsqueda en Tiempo Real**: Filtrado de productos por coincidencia de texto en el nombre.

* **Filtrado por Categorías**: Menú lateral que permite filtrar el catálogo por tipo de comida o restablecer la vista completa.

* **Carrito con Persistencia en LocalStorage**:

  * Agregar productos desde el catálogo guardándolos en `localStorage` bajo la clave `"cart"`.

  * Incremento automático de cantidad si el producto ya existe en el carrito.

* **Vista de Carrito e Importes**:

  * Muestreo detallado de productos: nombre, precio unitario, cantidad y subtotal.

  * Cálculo dinámico del total acumulado de la compra.

  * Mensaje informativo cuando el carrito se encuentra vacío.

##  Tecnologías Utilizadas

* **Lenguajes**: HTML5, CSS3, TypeScript.

* **Empaquetador de módulos**: Vite.

* **Gestor de Paquetes**: npm (compatible con pnpm).

##  Instrucciones para Ejecutar el Proyecto

### Requisitos Previos

Tener **Node.js** instalado en el sistema.

### Pasos para la instalación y ejecución

1. **Clonar o descomprimir el repositorio**: Ubícate en la carpeta raíz del proyecto:

   ```
   cd Santarelli_Yoel_Tp_TypeScript
   ```

2. **Instalar las dependencias**:

   ```
   npm install
   
   ```

   *(Nota: También puedes usar `pnpm install` si prefieres usar pnpm)*.

3. **Ejecutar el servidor de desarrollo**:

   ```
   npm run dev
   
   ```

4. **Acceder a la aplicación**:
   Abre tu navegador e ingresa a `http://localhost:5173`.

5. **Compilación para producción (Build)**:

   ```
   npm run build
   
   ```

## Video

Link:[ "Food Store" - Evaluación 1 - Programación 3](https://youtu.be/-4tlTUHolf4)
