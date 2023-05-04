const mysqlDataBase = require("../services/mysql")
const status = require('http-status')


// -- Total de pacientes que llegan a la clínica por edad catalogados por las siguientes categoría
const query1 = `
(select count(*) as valor, 'pediátrico' as dato
 from Paciente
 where edad >= 0
   and edad < 18)
union
(
    select count(*) as valor, 'mediana_edad' as dato
    from Paciente
    where edad >= 18
      and edad <= 60)
union
(
    select count(*) as valor, 'geriátrico' as dato
    from Paciente
    where edad > 60
)`

// -- Cantidad de pacientes que pasan por cada habitación
const query2 = `
select count(pacientes) as valor, Temp.id_Habitacion, H.habitacion as dato
from (
         select PACIENTE_idPaciente                                                'pacientes',
                HABITACION_idHabitacion                                         as 'id_habitacion',
                date_format(str_to_date(timestampx, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y') as 'fecha'
         from Log_actividad) as Temp
         inner join Habitacion H on Temp.id_habitacion = H.idHabitacion
group by id_habitacion, H.habitacion
order by H.habitacion
;
`
// -- Cantidad de pacientes que llegan a la clínica, agrupados por género
const query3 = `
select count(idPaciente) as valor
     , P.genero as dato
from Log_actividad
         join Paciente P on P.idPaciente = Log_actividad.PACIENTE_idPaciente
group by P.genero;
`
// -- Top 5 edades más atendidas en la clínica
const query4 = `
select count(Pacientes) as valor, edad as dato
from (
         select PACIENTE_idPaciente                                                'Pacientes',
                P.edad
         from Log_actividad
                  inner join Paciente P on Log_actividad.PACIENTE_idPaciente = P.idPaciente
     ) as Temp
group by dato 
order by valor desc
limit 5
;`

// -- Top 5 edades menos atendidas en la clínica
const query5 = `
select count(Pacientes) as valor, edad as dato
from (
         select PACIENTE_idPaciente                                                'Pacientes',
                P.edad
         from Log_actividad
                  inner join Paciente P on Log_actividad.PACIENTE_idPaciente = P.idPaciente
     ) as Temp
group by dato
order by valor
limit 5
`

// -- Top 5 habitaciones más utilizadas
const query6 = `
select count(Pacientes) as valor, id_habitacion, habitacion as dato
from (
         select PACIENTE_idPaciente                                                'Pacientes',
                HABITACION_idHabitacion                                         as 'id_habitacion',
                H.habitacion
         from Log_actividad
                  join Habitacion H on H.idHabitacion = Log_actividad.HABITACION_idHabitacion
     ) as Temp
group by id_habitacion, dato
order by valor desc
limit 5
`
// -- Top 5 habitaciones menos utilizadas
const query7 = `
select count(Pacientes) as valor, id_habitacion, habitacion as dato
from (
         select PACIENTE_idPaciente                                                'Pacientes',
                HABITACION_idHabitacion                                         as 'id_habitacion',
                H.habitacion
         from Log_actividad
                  join Habitacion H on H.idHabitacion = Log_actividad.HABITACION_idHabitacion
     ) as Temp
group by id_habitacion, dato
order by valor
limit 5
`
// -- Día con más pacientes en la clínica

const query8 = `
SELECT date_format(str_to_date(L.timestampx, '%Y-%m-%d %H:%i:%s'), '%m-%d-%Y') AS dato,
       COUNT(L.PACIENTE_idPaciente)                                            AS valor
FROM Log_actividad AS L
         JOIN Paciente AS p
              ON p.idPaciente = L.PACIENTE_idPaciente
GROUP BY dato
ORDER BY valor DESC
LIMIT 1;
`

const query9 = `
select * from Log_Habitacion
order by  timestampx desc
limit  15
`

const insertLog_RoomQ = `
insert into Log_Habitacion(idHabitacion, statusx, timestampx)
values (?, ?, ? )
`

const insertLog_ActivityQ = `
insert into Log_actividad(actividad, HABITACION_idHabitacion, PACIENTE_idPaciente, timestampx)
values ( ?, ?, ?, ?);
`
async function insertLog_Room(log_room) {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(insertLog_RoomQ,
                    [log_room.id_habitacion, log_room.descripcion,
                        log_room.fecha  ])
                resolve( { "status" : true })
            } catch (e) {
                e.statusRes = status.BAD_REQUEST
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}

async function insertLog_Activity(log_activity) {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(insertLog_ActivityQ,
                    [ log_activity.descripcion, log_activity.id_habitacion,
                    log_activity.id_paciente, log_activity.fecha])
                resolve( { "status" : true })
            } catch (e) {
                e.statusRes = status.BAD_REQUEST
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}



async function getQuery1() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query1)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}

async function getQuery2() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query2)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}

async function getQuery3() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query3)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}

async function getQuery4() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query4)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}

async function getQuery5() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query5)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}
async function getQuery6() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query6)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}



async function getQuery7() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query7)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}

async function getQuery8() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query8)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}

async function getQuery9() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(query9)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}



const getPatieentsQ = `
select idPaciente as id_paciente, genero, edad
from Paciente
limit `

const getRoomsQ = `
select idHabitacion as id_habitacion , habitacion from Habitacion
order by id_habitacion ;
`

async function getPatients(page){
    return new Promise(async (resolve, reject) => {
        if (isNaN(Number.parseInt(page))){
            let e = new  Error("La pagina debe ser un numero papu :v" + page.toString())
            e.statusRes = status.BAD_REQUEST
            reject( e )
        }
        page = Number.parseInt(page)
        if (page === 0){
            page = 1
        }
        page = (page - 1) * 50
            try {
                const rows = await mysqlDataBase.simpleExecute(getPatieentsQ + page  + " , 50;" )
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })

}

async function getRooms() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await mysqlDataBase.simpleExecute(getRoomsQ)
                resolve(rows [0])
            } catch (e) {
                reject(e)
            }
        }
    ).catch(error => {
        throw  error
    })
}


module.exports.getQuery1 = getQuery1
module.exports.getQuery2 = getQuery2
module.exports.getQuery3 = getQuery3
module.exports.getQuery4 = getQuery4
module.exports.getQuery5 = getQuery5
module.exports.getQuery6 = getQuery6
module.exports.getQuery7 = getQuery7
module.exports.getQuery8 = getQuery8
module.exports.getQuery9 = getQuery9

module.exports.getPatients = getPatients
module.exports.getRooms = getRooms


module.exports.insertLog_Activity = insertLog_Activity
module.exports.insertLog_Room = insertLog_Room

