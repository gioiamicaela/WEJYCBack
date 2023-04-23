const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const customQuery = require('../dbSetup');

module.exports = {
  getToken: async (req, res) => {
    customQuery(
      `SELECT * FROM users 
     WHERE email = "${req.body.email}" 
     `,
      async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const user = result[0];
          const compare = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (compare) {
            const token = jwt.sign(
              { email: req.body.email },
              process.env.JWT_SECRET
            );
            res.json({ token, userId: user.id });
          } else {
            return res.status(403).send('Incorrect credentials.');
          }
        }
      }
    );
  },

  handleRegister: (req, res) => {
    // Verificar si el correo electrónico ya está registrado
    customQuery(
      `SELECT * FROM users 
     WHERE email = "${req.body.email}"`,
      async (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results[0]);

        // Si el correo electrónico ya está registrado, mostrar un mensaje de error
        if (results.length > 0) {
          res.status(400).send('That user already exists!');
        } else {
          // Insertar la información del usuario en la tabla de usuarios
          const salt = await bcrypt.genSalt(10);
          const password = await bcrypt.hash(req.body.password, salt);
          const email = req.body.email;

          customQuery(
            `INSERT INTO users (email, password) VALUES ("${email}","${password}")`,
            (err, result) => {
              if (err) throw err;
              console.log('1 record inserted');
              return res.status(200).send('1 record inserted!');
            }
          );
        }
      }
    );
  },
};
