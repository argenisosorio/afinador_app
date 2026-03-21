- En el medidor hacer que las variables en /cuerdas/4/cuatro sean reactivas, si
el valor cambia en el backend deben cambiar en la app.

El json que se va a recibir del API será:

{
  "data":{
    "order":1,
    "frequency":210.0,
    "note":"A"
  }
}

-Las notas que se van a recibir son:
    -Nota A (LA)
    -Nota D (RE)
    -Nota F = F# (Fa#)
    -Nota B (Si)

-El rango de los valores máximos y mínimos (minFrequency y maxFrequency) es de
10 por arriba y 10 por debajo de la frecuencia ideal por lo cual dependiendo
de la nota recibida del API la app sabrá cual es la frecuencia ideal y los
rangos, para nota A la frecuencia idea es 220.

- En las vista de /cuerdas /cuerdas/4 y /cuerdas/4/cuatro agreagrar clases
responsivas o media queries para hacer que se vean bien en modo mobile.

- En /cuerdas/4/cuatro incorporar las imágenes de las cuerdas según el prototipo
y además deben ser reactivas en base al valor recibido del API.
