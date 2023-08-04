# lmneuquen-games

# Visualizacion
Los juegos pueden probarse en el siguiente enlace:
[Link a los juegos](https://fulgorastudio.github.io/lmn-games/)


## Integrar los juegos en la web.
Los 4 juegos tienen que ir dentro de una etiqueta main en el sitio web. En el caso de que la etiqueta main no esté disponible debe ser colocado en un div con una identificador unico y modificar el archivo CSS para que las sentencias asociadas a la etiqueta main pasen al id del nuevo contenedor.

Los juegos buscarán adaptarse a su contenedor, aunque se recomienda reservar un espacio full-screen para una mejor disposicion de los elementos del juego.

Todos los archivos de cada juego se encuentran dentro de su carpeta.
- Trucha Ipu -> endlessRunner
- Extinto -> hangman
- Memoria -> memory-game
- Sud ocu -> sudoku

### El HTML de los juegos.
Todo el contenido que se encuentra dentro de las etiquetas BODY debe ser insertado en la web. En el caso de que la etiqueta <main> ya esté siendo utilizada se deberá sustituir por una etiqueta <div> con un nuevo id. Dicho id debe ser referenciado en los estilos de la hoja de estilos, sustituyendo "main" por "#ID_COLOCADO".
Tambien es importante incluir todos los recursos solicitados mediante la etiqueta <link> en el header, ya que esto incluye la hoja de estilos, tipografias, etc.
Por ultimo, el resto de los archivos deben permanecer en el mismo directorio donde se encuentra el archivo de la aplicacion, ya que los juegos utilizan rutas relativas a la posicion del archivo principal (NOMBRE_JUEGO.html).
