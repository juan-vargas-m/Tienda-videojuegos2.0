// src/controllers/gameController.js

import gameService from '../services/gameService.js';

class GameController {
  /**
   * @swagger
   * /games:
   *   get:
   *     summary: Obtener todos los videojuegos
   *     tags: [Games]
   *     responses:
   *       200:
   *         description: Lista de videojuegos obtenida correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Game'
   */
  getAllGames(req, res) {
    try {
      const games = gameService.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).send('Error al obtener los videojuegos');
    }
  }

  /**
   * @swagger
   * /games/{id}:
   *   get:
   *     summary: Obtener un videojuego por ID
   *     tags: [Games]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del videojuego a obtener
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Videojuego obtenido correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Game'
   *       404:
   *         description: Videojuego no encontrado
   */
  getGameById(req, res) {
    try {
      const game = gameService.getGameById(req.params.id);
      res.json(game);
    } catch (error) {
      res.status(404).send(error.message); // 404 cuando no se encuentra
    }
  }

  /**
   * @swagger
   * /games:
   *   post:
   *     summary: Agregar un nuevo videojuego
   *     tags: [Games]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Game'
   *     responses:
   *       201:
   *         description: Videojuego agregado correctamente
   *       500:
   *         description: Error al agregar el videojuego
   */
  addGame(req, res) {
    try {
      const { id, nombre, consola, cantidad } = req.body;
      gameService.addGame({ id, nombre, consola, cantidad });
      res.status(201).send('Videojuego agregado');
    } catch (error) {
      res.status(500).send('Error al agregar el videojuego');
    }
  }

  /**
   * @swagger
   * /games/{id}:
   *   put:
   *     summary: Actualizar un videojuego existente
   *     tags: [Games]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del videojuego a actualizar
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
   *               consola:
   *                 type: string
   *               cantidad:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Videojuego actualizado correctamente
   *       404:
   *         description: Videojuego no encontrado
   */
  updateGame(req, res) {
    try {
      const updatedFields = req.body;
      gameService.updateGame(req.params.id, updatedFields);
      res.send('Videojuego actualizado');
    } catch (error) {
      res.status(404).send(error.message); // 404 cuando no se encuentra
    }
  }

  /**
   * @swagger
   * /games/{id}:
   *   delete:
   *     summary: Eliminar un videojuego
   *     tags: [Games]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del videojuego a eliminar
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Videojuego eliminado correctamente
   *       404:
   *         description: Videojuego no encontrado
   */
  deleteGame(req, res) {
    try {
      gameService.deleteGame(req.params.id);
      res.send('Videojuego eliminado');
    } catch (error) {
      res.status(404).send(error.message); // 404 cuando no se encuentra
    }
  }

  /**
 * @swagger
 * /games/{id}/sell:
 *   post:
 *     summary: Vender una cantidad de un videojuego
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del videojuego a vender
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad a vender
 *             required:
 *               - cantidad
 *     responses:
 *       200:
 *         description: Venta realizada correctamente
 *       409:
 *         description: No hay suficiente stock
 *       404:
 *         description: Videojuego no encontrado
 */

  sellGame(req, res) {
    const { id } = req.params; // Obtener el ID desde la URL
    const { cantidad } = req.body; // Obtener la cantidad desde el cuerpo de la solicitud

    try {
      gameService.sellGame(id, cantidad);
      res.send('Venta realizada');
    } catch (error) {
      if (error.message === 'No hay suficiente cantidad de este videojuego en stock') {
        res.status(409).send(error.message); // 409 Conflict cuando no hay suficiente stock
      } else {
        res.status(404).send(error.message); // 404 cuando el videojuego no se encuentra
      }
    }
  }
}

export default new GameController();
