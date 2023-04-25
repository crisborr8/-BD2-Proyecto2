const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
//const responseTime = requiere("response-time")

const Router = require('./App.router');

app.use("/", Router);

app.get('/', async(req, res) => {
    res.send({"message": "Hola Mundo"})
})

app.listen(port, () => {
    console.log(`Backend listo en el puerto ${port}`)
}) 