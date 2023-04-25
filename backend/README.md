# Backend

## Comandos para levantar redis en docker

```cmd
sudo docker run -d --name redis-server -p 6379:6379 redis/redis-stack-server:latest
sudo docker exec -it redis-server redis-cli

ver logs en redis
- select 1
- lrange logs 0 -1
```

1. /reporte
body: 
  -base -> un string que dice que base de datos se esta consultando
  -reporte -> un int que dice que reporte se consulta (1,2,3..,8)
response:
  - un array con la siguiente forma
    [
        {
        data: "aqui el dato 1",
        valor: 33
        }, {
        data: "aqui el dato 2",
          valor: 43
         }
    ]

2. /insertar
body:
  -base <string>
  -tipo_registro <int, 0 para log actividad y 1 para log habitacion>
  -id_habitacion <int >
  -id_paciente <int>
  -descripcion <string>
response:
  - si si se pudo o nel papa v:


3. /get_habitacion
body:
  -base <string>
response:
  -un array con el id_habitacion y el nombre de la habitacion


4. /get_paciente
body:
  -base <string>
response:
  -un array con el id_paciente y el nombre del paciente