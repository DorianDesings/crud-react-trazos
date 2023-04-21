const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const controller = {};

// Obtener todos los usuarios
controller.allUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) {
      console.log(err);

      return res.status(500).send('Error al leer el archivo de usuarios');
    }
    res.send(JSON.parse(data));
  });
};

// Obtener un usuario por id
controller.userById = (req, res) => {
  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err)
      return res.status(500).send('Error al leer el archivo de usuarios');

    const users = JSON.parse(data);
    const user = users.find(user => user.userId === req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
  });
};

// Crear un usuario nuevo
controller.createUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res.status(500).send('Error al leer el archivo de usuarios');

    const users = JSON.parse(data);

    const userExist = users.some(user => user.email === req.body.email);

    if (userExist)
      return res.status(409).send('Ya existe un usuario con ese email');

    const newUser = {
      userId: v4(),
      name: req.body.name,
      email: req.body.email
    };

    users.push(newUser);

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err)
        return res.status(500).send('Error al guardar el archivo de usuarios');

      res.send('Nuevo usuario creado');
    });
  });
};

controller.updateUser = (req, res) => {
  console.log(req.body);
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res.status(500).send('Error al leer el archivo de usuarios');

    const users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.userId === req.params.id);

    const user = users[userIndex];

    if (!user) return res.status(404).send('Usuario no encontrado');

    const patchedUser = { ...user, ...req.body };

    users[userIndex] = patchedUser;

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err)
        return res.status(500).send('Error al guardar el archivo de usuarios');

      return res.status(201).send({ message: 'Usuario actualizado' });
    });
  });
};

controller.deleteUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res.status(500).send('Error al leer el archivo de usuarios');

    let users = JSON.parse(data);

    const userIndex = users.findIndex(user => user.userId === req.params.id);

    if (userIndex === -1) return res.status(404).send('Usuario no encontrado');

    users.splice(userIndex, 1);

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err)
        return res.status(500).send('Error al guardar el archivo de usuarios');

      return res
        .status(201)
        .send({ message: `Usuario con ID ${req.params.id} eliminado` });
    });
  });
};

module.exports = controller;
