const { pool } = require('./utils/dbConnection.js')
const bcrypt = require('bcrypt');


async function obtenerUsuarios(email) {

    const result = await pool.query(
        "SELECT id, email, rol, lenguage FROM usuarios WHERE email = $1",
        [email]
    );

    if (result.rowCount === 0) {
        throw {
            code: 404,
            message: "Usuario no encontrado"
        };
    }

    return result.rows[0];
}

async function verificarCredenciales(email, password) {
    const result = await pool.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
    );

    if (!result.rowCount) {
        throw {
            code: 404,
            message: "No existe un usuario con ese email."
        };
    }

    const user = result.rows[0];

    const passwordCorrecta = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordCorrecta) {
        throw {
            code: 401,
            message: "Error, contraseña incorrecta."
        };
    }
}


async function postUsuario(email, password, rol, lenguage) {
  try {

    const hashedPassword = bcrypt.hashSync(password, 10)

    const result = await pool.query(
      `INSERT INTO usuarios (email, password, rol, lenguage)
        VALUES ($1, $2, $3, $4)`,
      [email, hashedPassword,rol, lenguage],
    );
    return "Usuario creado con éxito";
  } catch (error) {
    return "Error creando al usuario: " + error.message;
  }
}


module.exports = {
    obtenerUsuarios,
    postUsuario,
    verificarCredenciales
};