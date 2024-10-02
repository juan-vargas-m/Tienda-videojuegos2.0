// src/controllers/userController.js

import userService from '../services/userService.js';

class UserController {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Obtener todos los usuarios
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuarios obtenida correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  getAllUsers(req, res) {
    res.json(userService.getAllUsers());
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Obtener un usuario por ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del usuario a obtener
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Usuario obtenido correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuario no encontrado
   */
  getUserById(req, res) {
    const user = userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Agregar un nuevo usuario
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: Usuario agregado correctamente
   *       500:
   *         description: Error al agregar el usuario
   */
  addUser(req, res) {
    const { id, nombre, apellido } = req.body;
    userService.addUser({ id, nombre, apellido });
    res.status(201).send('Usuario agregado');
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Actualizar un usuario existente
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del usuario a actualizar
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *               apellido:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuario actualizado correctamente
   *       404:
   *         description: Usuario no encontrado
   */
  updateUser(req, res) {
    const updatedFields = req.body; // Solo los campos que se desean actualizar
    userService.updateUser(req.params.id, updatedFields);
    res.send('Usuario actualizado');
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Eliminar un usuario
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del usuario a eliminar
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Usuario eliminado correctamente
   *       404:
   *         description: Usuario no encontrado
   */
  deleteUser(req, res) {
    userService.deleteUser(req.params.id);
    res.send('Usuario eliminado');
  }
}

export default new UserController();

