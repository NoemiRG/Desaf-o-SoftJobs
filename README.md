# Apoyo desafio Soft Jobs
# Desaf-o-SoftJobs


1. Clonar el repositorio
git clone https://github.com/NoemiRG/Desaf-o-SoftJobs.git


2. Instalar las dependencias

npm init-y
npm install express cors
npm i nodemon -D
npm install pg
npm install bcrypt


3. Crear la base de datos

Abrir PostgreSQL y ejecutar el siguiente script SQL:

CREATE DATABASE softjobs;
\c softjobs;
CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );
SELECT * FROM usuarios;

4. Configurar tu DB

Ingresar al archivo dbConnection.js y reemplazar por tus credenciales en PostgreSQL

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=softjobs



5. Levantar servidor

En una terminal "npm run dev" 
y en la otra "node index.js"

Ingresar al http://localhost:5173

