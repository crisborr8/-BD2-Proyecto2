# Enpoints

## Tipo `GET`: 

### `/GetHabitaciones`: 
Devuelve un JSON con todas la habitaciones con el formato:

```json
[
    {
        "id_habitacion": 1,
        "habitacion": "Sala de examenes 1"
    },
    {
        "id_habitacion": 2,
        "habitacion": "Sala de examenes 2"
    }
]
```

### `/GetHabitaciones/<Pagina>`:
Devuelve un JSON con todos los pacientes de forma paginada en bloque de 50 elementos con el formato:
```json
[
    {
        "id_paciente": 100000,
        "edad": 95,
        "genero": "Otro"
    },
    {
        "id_paciente": 100001,
        "edad": 40,
        "genero": "Femenino"
    }
]
```
* Si la paǵina no existe devolverá un array vacío `[]`


## Tipo `POST`

### `/reporte`:
Este endpoint de tipo post recibe el siguiente formato:

```json
{
    "base": "mysql",
    "reporte": 7

}
```
* Donde base puede ser: `mysql` `cassandra` `mongo`

Y devuelve los reporte con el siguiete formato: 

```json
[
    {
        "valor": 538,
        "id_habitacion": 15,
        "dato": "Estación de revisión 4"
    },
    {
        "valor": 980,
        "id_habitacion": 9,
        "dato": "Sala de procedimientos 4"
    },
    {
        "valor": 1288,
        "id_habitacion": 14,
        "dato": "Estación de revisión 3"
    },
    {
        "valor": 1352,
        "id_habitacion": 8,
        "dato": "Sala de procedimientos 3"
    },
    {
        "valor": 1387,
        "id_habitacion": 4,
        "dato": "Sala de examenes 4"
    }
]
```
* Donde `valor` y `dato` siempre estan presentes, excepto en la consulta 9

### `/insertar`:
Este enpoint recibe 2 tipos de entrdas

Para log Actividades
```json
{
  "base": "cassandra",
  "tipo_registro": 0,
  "id_paciente": 10,
  "edad": 10,
  "fecha": "2021-06-01 19:50:03",
  "habitacion": "Sala de Operaciones",
  "id_habitacion": 10,
  "genero": "Otro",
  "descripcion": "Alguna descripcion"
}
```

Para log Habitacion
```json
{
  "base": "cassandra",
  "tipo_registro": 1,  
  "fecha": "2021-06-01 19:50:03",
  "habitacion": "Sala de Operaciones",
  "id_habitacion": 10,  
  "descripcion": "Alguna descripcion"
}
```

La respuesta es 
```json
{
    "status": true
}
```
ó en caso de fallo: 
```json
{
    "status": false,
    "error": "Error: Cannot add or update a child row: a foreign key constraint fails (`BD2_P1`.`Log_Habitacion`, CONSTRAINT `Log_Habitacion_Habitacion_idHabitacion_fk` FOREIGN KEY (`idHabitacion`) REFERENCES `Habitacion` (`idHabitacion`) ON DELETE CASCADE ON UPDATE CASCADE)"
}
```

