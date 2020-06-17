# APLICACIÓN PARA ALMACENAR DATOS DE PERSONAS
 En la presente aplicación, el BackEnd está Laravel v6 y el FrontEnd está Angular v9.

##INSTALACIÓN
 Al clonar o descargar la app, asegúrese de colocar la carpeta PEOPLE-APP en la raíz del servidor web. 
 Para instalarla y ejecutarla se debe hacer:

##BACKEND
 Para crear la base de datos, se debe editar el archivo ".env" que está dentro de PEOPLE-APP > Laravel, con la configuación del servidor Apache y el MySql Local. En consola se debe digitar: ```php artisan migrate```.

##FRONTEND
 Lo ideal es colocar los archivos en la raiz del servidor __Fuera de la carpeta PEOPLE-APP__, o crear un subdominio (host virtual en caso de servidor local), y seguir los siguientes pasos:
    * Ir a la carpeta en la ruta PEOPLE-APP > Angular > dist.
    * Abrir la carpeta Angular
    * Copiar y pegar los archivos de la carpeta en la raíz del servidor o en la carpeta del subdominio (host virtual)
    * Ejecutar el archivo **index.html** en el navegador
 

