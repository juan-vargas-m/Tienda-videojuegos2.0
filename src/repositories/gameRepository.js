const games = [];

class GameRepository {
  getAllGames() {
    return games;
  }

  getGameById(id) {
    const game = games.find((game) => game.id === id);
    if (!game) {
      throw new Error('Videojuego no encontrado.');  // Manejo de excepción cuando no se encuentra
    }
    return game;
  }
  resetGames() {
    games.length = 0;  // Limpia el array de juegos
  }
  addGame(game) {
    games.push(game);
  }

  updateGame(id, updatedFields) {
    const index = games.findIndex((game) => game.id === id);
    if (index === -1) {
      throw new Error('Videojuego no encontrado para actualizar.');  // Manejo de excepción cuando no se encuentra
    }
    games[index] = { ...games[index], ...updatedFields };
  }

  deleteGame(id) {
    const index = games.findIndex((game) => game.id === id);
    if (index === -1) {
      throw new Error('Videojuego no encontrado para eliminar.');  // Manejo de excepción cuando no se encuentra
    }
    games.splice(index, 1);
  }

  sellGame(id, quantity) {
    const game = this.getGameById(id);
    if (game.cantidad >= quantity) {
      game.cantidad -= quantity;
    } else {
      throw new Error('No hay suficiente cantidad de este videojuego en stock');
    }
  }
  

  
}

export default new GameRepository();
