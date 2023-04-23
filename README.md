# Getting started

1) Clonar repositorio WEJYCBack.
2) Hacer `npm i` en la consola.
3) Correr en la terminal `nodemon server.js` (si es que tienen instalado nodemon, sino hacerlo como de costumbre).
4) Instalar mySql si no está instalado.
5) Instalar alguna GUI como ser TablePlus.
6) Crear base de datos llamada "wejyc". Seleccionar utf8mb4_unicode_ci.
7) Crear tabla "users" con las columnas id(BIGINIT, autoincremental, PK), email(VARCHAR, longitud 100), password(VARCHAR, longitud 150).
8) Usar insomnia (o el de su preferencia) y usar la ruta `http://localhost:8000/register` (o el puerto que se esté usando) y en el body incluir el json: {"email" : "x", "password" : "y"}, cambiando x e y por los valores de preferencia.
