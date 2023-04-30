const cassandra_db = require('../services/cassandra')
const status = require('http-status')


const query1_1 = `
select edad, count(*) from
Paciente
where edad >=0 and edad < 18
group by edad
allow filtering;
`
const query1_2 = `
select edad, count(*) from
Paciente
where edad >= 18 and edad <= 60
group by edad
allow filtering;
`

const query1_3 = `
select edad, count(*) from
Paciente
where edad > 60
group by edad
allow filtering;
`

const query2 = `
select  sum(cantidad) as valor,  Habitacion as dato
from Actividad_Habitacion
group by Habitacion
`

const query3 = `
select genero as dato , sum(cantidad)  as valor
from Actividad_Genero
group by Genero
`

const query4 = `
select sum(cantidad) as valor,  edad as dato
from actividad_edad
group by edad
`

const query6 = `
select sum(cantidad) as valor, Habitacion as dato
from actividad_habitacion
group by Habitacion 
`

const query8 = `
select Fecha as dato, sum(cantidad) as valor
from  Paciente_Fecha
group by  Fecha;
`

const query9 = `
select * from log_habitacion;
`


const insert_activity1 = `
update Actividad_Edad set cantidad = cantidad + 1 where edad = ?;
`

const insert_activity2 = `
update Actividad_Genero set cantidad = cantidad + 1 where genero = ?; 
`

const insert_activity3 = `
update  actividad_habitacion set cantidad = cantidad + 1 where fecha = ? and habitacion = ? ;
`

const insert_activity4 = `
update  paciente_fecha set cantidad = cantidad + 1 where  fecha = ?; 
`

const insert_room_log = `
insert into log_habitacion (idHabitacion, timestampx, status)
values (?, ?, ?)
`

async function insertLog_Activity(activity){
    return new Promise(async (resolve, reject) => {
            try {
                await cassandra_db.executeQuery(insert_activity1, [ activity.edad ])
                await cassandra_db.executeQuery(insert_activity2, [ activity.genero ])
                await cassandra_db.executeQuery(insert_activity3, [ activity.fecha,
                    activity.habitacin ])
                await cassandra_db.executeQuery(insert_activity4, [ activity.fecha])
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

async function insertLog_Room(log_room){
    return new Promise(async (resolve, reject) => {
            try {
                await cassandra_db.executeQuery(insert_room_log, [ log_room.id_habitacion,
                    log_room.fecha , log_room.descripcion ])
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





async function getQuery2() {
    return new Promise(async (resolve, reject) => {
            try {
                const rows = await cassandra_db.executeQuery(query2)
                rows.sort((a, b) =>  (a.dato > b.dato) ? 1 : ((b.dato > a.dato) ? -1 : 0))
                rows.forEach((row) => {
                    row.valor = Number.parseInt(row.valor)
                } )
                resolve( rows)
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
                const rows = await cassandra_db.executeQuery(query4)
                rows.forEach((row) => {
                    row.valor = Number.parseInt(row.valor)
                } )
                rows.sort((a, b) =>  (a.valor > b.valor) ? 1 : ((b.valor > a.valor) ? -1 : 0))
                resolve( rows)
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
                const rows = await cassandra_db.executeQuery(query6)
                rows.forEach((row) => {
                    row.valor = Number.parseInt(row.valor)
                } )
                rows.sort((a, b) =>  (a.valor > b.valor) ? 1 : ((b.valor > a.valor) ? -1 : 0))
                resolve( rows)
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
                const rows = await cassandra_db.executeQuery(query8)
                rows.forEach((row) => {
                    row.valor = Number.parseInt(row.valor)
                } )
                rows.sort((a, b) =>  (a.valor > b.valor) ? 1 : ((b.valor > a.valor) ? -1 : 0))
                rows.reverse()
                resolve( rows.slice(0,1))
            } catch (e) {
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
                const rows_pediatrico = await cassandra_db.executeQuery(query1_1)
                const rows_mediana_edad = await cassandra_db.executeQuery(query1_2)
                const rows_geriatrico = await cassandra_db.executeQuery(query1_3)
                let suma_pediatrico = 0
                let row
                for (const rowsPediatricoKey in rows_pediatrico) {
                    suma_pediatrico += rows_pediatrico[rowsPediatricoKey].count.low
                }

                let suma_mediana = 0
                for (const rowsMedianaKey in rows_mediana_edad) {
                    suma_mediana += rows_mediana_edad[rowsMedianaKey].count.low
                }

                let suma_geriatrico = 0
                for (const rowsGeriatricoKey in rows_geriatrico) {
                    suma_geriatrico += rows_geriatrico[rowsGeriatricoKey].count.low
                }
                resolve( [ { valor: suma_pediatrico, dato: "pediátrico" },
                    { valor: suma_mediana, dato: "mediana_edad" },
                    { valor : suma_geriatrico, dato: "geriátrico"}])
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
                const rows = await cassandra_db.executeQuery(query3)
                rows.forEach((row) => {
                    row.valor = Number.parseInt(row.valor)
                } )
                resolve( rows)
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
                const rows = await cassandra_db.executeQuery(query9)
                resolve( rows)
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
module.exports.getQuery6 = getQuery6
module.exports.getQuery8 = getQuery8
module.exports.getQuery9 = getQuery9

module.exports.insertLog_Activity = insertLog_Activity
module.exports.insertLog_Room = insertLog_Room
