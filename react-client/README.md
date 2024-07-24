# Frontend - React
## Recursos Importantes
 - [Flujo de Usuario](https://miro.com/app/board/uXjVKz8u70Y=/?share_link_id=154811904389)
 - [Prototipo de Baja Fidelidad](https://excalidraw.com/#json=wXPGmyg7HxQ4vM_wotbcW,zgiogbS1UEAUdiBJYViz8Q)
## Mobile First
Para crear el aplicativo de la manera más responsiva posible, lo mejor será iniciar con una metodología Mobile First, creando las vistas pensandolas primero para moviles, y luego se adaptaran para otras resoluciones de tipo tablets u ordenador.
## Tecnologías Usadas
### CSS
- TailwindCSS
### JS
- Axios
- Flowbite-React
## Justificación de Tecnologias
### [TailwindCSS](https://tailwindcss.com/)
TailwindCSS te permite manipular los estilos de las etiquetas de HTML con precisión, aparte de que no te toca salirte del HTML para crear archivos css, por otro lado TailwindCSS es usado en proyectos de gran escala por su acoplamiento tan sencillo a la metodología "Mobile First", por otro lado las clases de tailwind te permite hacer modificaciones y actuar cómo si estuvieras usando CSS Vanilla en vez de su framework, por otro lado TailwindCSS cuenta con multiples complementos cómo es Flowbite para integrar components ya hechos por otros desarrolladores que usan Tailwind y aumentar mucho más la velocidad del proceso de creación de UI.
### [Flowbite-React](https://flowbite-react.com/)
Flowbite-react es una Libreria UI que esta construida sobre TailwindCSS y sus principios, también cabe aclarar que estamos usando la versión de react, ya que al estar trabajando sobre react, nos brindará de primera manera componentes listos para ser usados con features cómo compatibilidad con modo oscuro, modificación al tema principal y otras configuraciones, cómo también la opción de integrar plugins cómo graficos para un futuro pivoteo ya que en este caso contamos con usuarios de tipo administrativo que en el futuro podrían estar interesados en tener graficos para visualizar y analizar la parte administrativa del aplicativo con mayor facilidad.
### [Axios](https://axios-http.com/docs/intro)
Tiene compatibilidad con los modulos de XMLHttpRequest y con el modulo http de node.js, logrando que se pueda usar con facilidad desde un entorno de navegador cómo también sin el, por otro lado Axios nos permite simplificar las configuraciones para enviar distintos tipos de serializaciones en el cuerpo de la petición, sea esta JSON, FormData o URL encoded form, por otro lado tiene soporte incluido que protege contra vulnerabilidades XSRF, puede cancelar peticiones, soporte la API de promesas entre otras cosas.