

<h1  style="text-align:center" > <font color="red">npm start</font> para levantar el programa </h1> 

---

<h3  style="text-align:center" >----> TESTING <---</h3> 


   Desafío "Primera práctica de integración sobre tu ecommerce": 
   En este trabajo debemos hacer la conexión de nuestro proyecto con una base de datos: 
   Utilizaremos Mongo y mongoose para agregar el modelo de persistencia a nuestro proyecto
   Debemos crear una base de datos llamada "ecommerce" dentro de Mongodb Atlas, crear sus colecciones "carts", "messages", "products" y sus respectivos schemas 
   Debemos separar los managers de fileSystem de los managers de Mongodb en una sola carpeta "dao". Dentro de dao, agregar también una carpeta "models" donde vivirán los esquemas de Mongodb<br>
1. Creé la carpeta "dao" con las subcarpetas solicitadas
2. Creé el archivo ".env" para ocultar contraseñas
3. Modifiqué "app.js" para hacer la conexión con la base de datos e incluyo la nueva vista del chat
4. Modifiqué "views" para hacer una vista que contenga el chat
5. Se implemento persistencia de datos de MongoDB para el almacenamiento de productos, carritos y mensajes del chat.

  
6. #### Endpoints activos en el proyecto:

| METHOD              | ROUTE |
| :---------------- | :------: | 
| GET GET POST DELETE       |   <localhost:8080/realtimeproducts>  |
| GET            |    <localhost:8080/home>   | 
| GET GET POST DELETE    |  <localhost:8080/chat>   | 
| GET  |  <localhost:8080/api/products/:pid>   | 
| GET  |  <localhost:8080/api/products/:limit?>    | 
| POST  |  <localhost:8080/api/products>   | 
| POST |  <localhost:8080/api/products/many>   | 
| PUT DELETE |  <localhost:8080/api/products/:id>   |
| GET DELETE  |  <localhost:8080/api/cart/:cid>   |
| GET POST |  <localhost:8080/api/cart>   |
| POST |  <localhost:8080/api/cart/:cid/product/:pid>  |



<br>

> 
> #### NAVEGADOR: 
>
> 
>> :bulb: localhost:8080/realtimeproducts ----> para el socket de actualización en tiempo real  <br> 
>> :bulb: localhost:8080/chat ----> para el Chat con persistencia en MongoDB  <br> 
>>:bulb: localhost:8080/api/products ----> para el endpoint de manipulación de productos en la base de datos  <br> 
>>:bulb: localhost:8080/api/cart ----> para el endpoint de manipulación de carritos en la base de datos  <br> 
---

<h3  style="text-align:center" >----> PREVIOS <---</h3> 

> #### RUTAS:<br>
>
>> :bulb: localhost:8080/realtimeproducts ----> para el socket de actualización en tiempo real  <br> 
>>
>> :bulb: localhost:8080/home ----> para la vista de todos los productos en la tienda  <br>
>> 
>> :bulb: localhost:8080/ ----> Saludo
  
---


<h3  style="text-align:center" >----> PREVIOS <---</h3> 

#### 1. PRODUCTS

Método GET http://localhost:8080/api/products/  --> listado de todos los productos<br>
Método GET http://localhost:8080/api/products?limit=# --> Listado de productos con limite de registros<br>
Método GET http://localhost:8080/api/products/:pid --> Devuelve aquel producto que coincida con el ID<br>
Método DELETE http://localhost:8080/api/products/:pid ---> borra item de la base de datos<br>
Método PUT  http://localhost:8080/api/products/:pid ---> modifica el producto de la base de datos<br>
Método POST http://localhost:8080/api/products/ --> volcando un producto en el body lo agrega a la BD, el método solo valida que no haya campos nullishv y que el codigo de producto no este repetido <br>
<br>

Dummy JSON ---> PARA PROBAR RUTA POST http://localhost:8080/api/products/<br>
 {
  "title": "Batatas Fritas",
  "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
  "price": 33824,
  "thumbnail": "/et/ultrices/posuere/cubilia/curae/donec.json",
  "code": "MA8755",
  "stock": 286,
  "status": true
 } <br>
<br>

#### 2. CART<br>

Método POST http://localhost:8080/api/cart --> Crea un carrito nuevo<br>
Método GET http://localhost:8080/api/cart/:cartId --> Devuelve contenido de carrito según ID<br>
Método POST http://localhost:8080/api/cart/:cartId/product/:productId --> Agrega productos al carrito de acuerdo al Id de carrito y producto a agregar.<br>
Método DELETE http://localhost:8080/api/cart/:cartId --> borra el carrito de la base de datos<br>

