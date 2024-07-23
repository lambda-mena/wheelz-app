# Wheelz
Wheelz es un sistema de renta de carros con el objetivo de brindar a los usuarios la posibilidad de navegar, visualizar y alquilar carros disponibles en distintas ciudades de Colombia.

Por otro lado, el aplicativo permite a los administradores, gestionar los carros, tipos de cobertura y a los demás usuarios para brindarles soporte.
## Alcance
Para el Hackathon hemos determinado cómo alcance la implementación del Panel de Administrador de WheelZ.
Las funcionalidades que se buscan implementar en el MVP son:
- El Administrador puede iniciar sesión.
- El Administrador puede gestionar los usuarios registrados y crearlos.
- El Administrador puede gestionar los vehiculos registrados y añadirlos.
- El Administrador puede gestionar las reservas registradas y crearlas.
## Información tecnica
- [Frontend](/react-client/README.md)
- [Backend](https://github.com/EdBigpun/wheelz-api)
## Cómo ejecutar el proyecto
### Requisitos previos
Es necesario tener estas dependencias instaladas en su computadora antes de correr el proyecto de manera local.
- Node.js v20.15
### Guía paso a paso
#### Iniciar el cliente (React) en local
Para iniciar el cliente en local, basta con entrar en su carpeta, ya sea desde un explorador de archivos o en la misma terminal usando el comando:
```bash
cd react-client
```
Antes de iniciar el cliente, tenemos que asegurarnos que tenemos las dependencias del cliente instaladas, para esto ejecutaremos el comando:
```bash
npm install
```
Ahora, podríamos simplemente iniciar el proyecto
en su entorno de desarrollo, ejecutando el siguiente
comando en la terminal.
```bash
npm run dev
```
Con esto, enhorabuena haz iniciado el cliente de react en [localhost](http://localhost:5173)

#### Para conectar con una API local
#### Opción 1
Lo unico necesario para cambiar hacia donde se dirige el cliente para interactuar con la API
[wheelz-api](https://github.com/EdBigpun/wheelz-api) es cambiar los valores del archivo [.env](/react-client/.env)
hacia algo por ejemplo:
```bash
VITE_BACKEND_HOST=http://localhost:8080
```
#### Opción 2
Simplemente eliminar el archivo .env al fin y al cabo el cliente
hara fallback intentandose conectar a una API desplegada localmente.