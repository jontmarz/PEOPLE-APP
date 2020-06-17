# APLICACIÓN PARA ALMACENAR DATOS DE PERSONAS
 En la presente aplicación, el BackEnd está Laravel v6 y el FrontEnd está Angular v9.

## INSTALACIÓN
 Al clonar o descargar la app, asegúrese de colocar la carpeta PEOPLE-APP en la raíz del servidor web. 
 Para instalarla y ejecutarla se debe hacer:

## BACKEND
 Para crear la base de datos, se debe editar el archivo ".env" que está dentro de PEOPLE-APP > Laravel, con la configuación del servidor Apache y el MySql Local. En consola se debe digitar: ```php artisan migrate```.

## FRONTEND
 Lo ideal es colocar los archivos en la raiz del servidor __Fuera de la carpeta PEOPLE-APP__, o crear un subdominio (host virtual en caso de servidor local), y seguir los siguientes pasos:
    *Ir a la carpeta en la ruta PEOPLE-APP > Angular > dist.
    *Abrir la carpeta Angular
    *Copiar y pegar los archivos de la carpeta en la raíz del servidor o en la carpeta del subdominio (host virtual)
    *Ejecutar el archivo **index.html** en el navegador
 
 ## FUNCIONALIDAD
La funcionalidad de la aplicación es muy simple, está creada para agrgar datos de personas, listar, editar y eliminar los datos de los mismos.
    -Tiene un portal administrativo, para que solo tenga acceso personas registradas.
    -Puede registrarse para tener acceso al portal administrativo
    -Al ingresar, va a encontrar el listado de personas agregadas, en la última celda de cada fila hay dos botones "Edición" y "Eliminar"
    -Al final de la tabla hay dos botones "Agregar Nuevo" y "Exportar"
    -Al hacer clic sobre el botón "Agregar Nuevo", se despliega un formulario para agregar una nueva persona.
        -Existe una característica especial en el formulario. Si el campo "Tipo de identificación" es "CC", el campo "número de documento" solo recibe datos numéricos. En cambio, Si el campo "Tipo de Identificación es "CE" o "Passport" el campo "Numero de Identificación" recibe datos alfanuméricos
        -Los demás campos tienen sus restricciones, por ejemplo, el campo 'email' solo recibe datos de correo electrónico.
    -Al hacer clic sobre el botón "editar". Se abre un modal con el formulario y los datos de la persona  a la cual e va a editar y permite realizar las respectivas ediciones.
    - Al hacer clic sobre el botón "eliminar". Se abre un modal para eliminar el registro elegido
    - Al hacer clic sobre el botón "Exportar" se exportan los datos a un archivo CSV que puede guardarse en el disco duro.

### Fin
