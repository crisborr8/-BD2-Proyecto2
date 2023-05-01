const express = require('express');
const router = new express.Router();

const hospital = require('../controllers/hospital')


router.post('/reporte', hospital.getReports);
router.post('/insertar', hospital.insert)

router.get('/getPacientes/:pag', hospital.getPatients)
router.get('/getHabitaciones', hospital.getRooms)

module.exports = router



