const express = require('express')
const cors = require('cors')
const jwt = require("jsonwebtoken");
const { checkConnection, pool } = require('./utils/dbConnection')
const { obtenerUsuarios,postUsuario,verificarCredenciales } = require('./user.controller.js')

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3000, async () => {
    console.log('Servidor 3000')
    const hora = await checkConnection()
    console.log('Hora de la base de datos:', hora)
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/usuarios", async (req, res) => {

    const token = req.header("Authorization")?.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "LLAVE_SECRETA");
        const email = decoded.email;
        const usuario = await obtenerUsuarios(email);
        res.json([usuario]);

    } catch (error) {
        res.status(error.code || 500).send(error.message);

    }
});


app.post("/usuarios", async(req, res)=>{
  const {  email , password, rol , lenguage   } = req.body
  try {
    let result = await postUsuario(email , password, rol , lenguage )
    res.send(result)
  } catch (error) {
    res.send("Error enviando usuario: " + error.message)
  }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        await verificarCredenciales(email, password);
        const token = jwt.sign(
            { email, fecha: Date.now(), nombreApp: "softjobs" },
            "LLAVE_SECRETA"
        );
        res.json({ token });
    } catch (error) {
        res.status(error.code || 500).send(error.message);
    }
});