// src/routes/gameRoutes.js

import express from 'express';
import gameController from '../controllers/gameController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Operaciones relacionadas con videojuegos
 */

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
router.get('/', gameController.getAllGames.bind(gameController));

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
router.get('/:id', gameController.getGameById.bind(gameController));

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
router.post('/', gameController.addGame.bind(gameController));

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
router.put('/:id', gameController.updateGame.bind(gameController));

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
router.delete('/:id', gameController.deleteGame.bind(gameController));

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
router.post('/:id/sell', gameController.sellGame.bind(gameController));

export default router;
