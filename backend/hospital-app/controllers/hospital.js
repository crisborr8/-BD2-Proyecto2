const status = require('http-status')
const hospital = require('../db_apis/hospital_mysql')

const hospital_cassandra = require("../db_apis/hospital_cassandra");


const insert = async function (req, res, next) {
    return new Promise(async (resolve, reject) => {
        try {
            let result

            switch (req.body.base) {
                case "mysql":
                    switch (req.body.tipo_registro) {
                        case 1:
                            result = await hospital.insertLog_Activity(req.body)
                            break;
                        case 2:
                            result = await  hospital.insertLog_Room(req.body)
                            break;
                        default:
                            let e = new Error("mala elección de insersión chavo :v")
                            e.statusRes = status.BAD_REQUEST
                            next(e)
                            return
                    }
                    break;
                case "cassandra":
                    switch (req.body.tipo_registro) {
                        case 1:
                            result = await hospital_cassandra.insertLog_Activity(req.body)
                            break;
                        case 2:
                            result = await  hospital_cassandra.insertLog_Room(req.body)
                            break;
                        default:
                            let e = new Error("mala elección de insersión chavo :v")
                            e.statusRes = status.BAD_REQUEST
                            next(e)
                            return
                    }
                    break;
                case "mongo":
                    let emongo = new Error("aun no implementado papu :v")
                    emongo.statusRes = status.BAD_REQUEST
                    next(emongo)
                    return
                default:
                    let e = new Error("mala elección de base chavo :v")
                    e.statusRes = status.BAD_REQUEST
                    next(e)
                    return

            }
            res.status(status.OK).json(result)
        } catch (e) {
            reject(e)
        }
    }).catch(err => {
        next(err)
    })
}


const getReports = async function (req, res, next) {
    return new Promise(async (resolve, reject) => {
        try {
            let rows = []
            switch (req.body.base) {
                case "mysql":
                    switch (req.body.reporte) {
                        case 1:
                            rows = await hospital.getQuery1()
                            break;
                        case 2:
                            rows = await hospital.getQuery2()
                            break;
                        case 3:
                            rows = await hospital.getQuery3()
                            break;
                        case 4:
                            rows = await hospital.getQuery4()
                            break;
                        case 5:
                            rows = await hospital.getQuery5()
                            break
                        case 6:
                            rows = await hospital.getQuery6()
                            break
                        case 7:
                            rows = await hospital.getQuery7()
                            break
                        case 8:
                            rows = await hospital.getQuery8()
                            break
                        case 9:
                            rows = await hospital.getQuery9()
                            break;
                        default:
                            let e = new Error("mala elección de reporte  chavo :v")
                            e.statusRes = status.BAD_REQUEST
                            next(e)
                            return

                    }
                break;
                case "cassandra":
                    switch (req.body.reporte) {
                        case 1:
                            rows = await hospital_cassandra.getQuery1()
                            break;
                        case 2:
                            rows = await  hospital_cassandra.getQuery2()
                            break;
                        case 3:
                            rows = await  hospital_cassandra.getQuery3()
                            break;
                        case 4:
                            rows = await  hospital_cassandra.getQuery4()
                            rows = rows.reverse()
                            rows = rows.slice(0, 5)
                            break;
                        case 5:
                            rows = await  hospital_cassandra.getQuery4()
                            rows = rows.slice(0, 5)
                            break
                        case 6:
                            rows = await  hospital_cassandra.getQuery6()
                            rows = rows.reverse()
                            rows = rows.slice(0, 5)
                            break
                        case 7:
                            rows = await  hospital_cassandra.getQuery6()
                            rows = rows.slice(0, 5)
                            break
                        case 8:
                            rows = await  hospital_cassandra.getQuery8()
                            break
                        case 9:
                            rows = await  hospital_cassandra.getQuery9()
                            break
                        default:
                            let e = new Error("mala elección de reporte  chavo :v")
                            e.statusRes = status.BAD_REQUEST
                            next(e)
                            return
                    }
                    break;

                case "mongo":
                    let emongo = new Error("aun no implementado papu :v")
                    emongo.statusRes = status.BAD_REQUEST
                    next(emongo)
                    return

                default:
                    let e = new Error("mala elección de base chavo :v")
                    e.statusRes = status.BAD_REQUEST
                    next(e)
                    return

            }
            res.status(status.OK).json(rows)
        } catch (e) {
            reject(e)
        }
    }).catch(err => {
        next(err)
    })

}

const getRooms = async function (req, res, next) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await hospital.getRooms()
            res.status(status.OK).json(rows)
        } catch (e) {
            reject(e)
        }
    }).catch(err => {
        next(err)
    })
}

const getPatients = async function (req, res, next) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await hospital.getPatients(req.params.pag)
            res.status(status.OK).json(rows)
        } catch (e) {
            reject(e)
        }
    }).catch(err => {
        next(err)
    })
}


module.exports.getReports = getReports
module.exports.insert = insert

module.exports.getRooms = getRooms
module.exports.getPatients = getPatients

