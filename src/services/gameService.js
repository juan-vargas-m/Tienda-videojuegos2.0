import gameRepository from '../repositories/gameRepository.js';

class GameService {
  getAllGames() {
    return gameRepository.getAllGames();
  }

  getGameById(id) {
    return gameRepository.getGameById(id);
  }

  addGame(game) {
    gameRepository.addGame(game);
  }

  updateGame(id, updatedGame) {
    gameRepository.updateGame(id, updatedGame);
  }

  deleteGame(id) {
    gameRepository.deleteGame(id);
  }

  sellGame(id, quantity) {
    gameRepository.sellGame(id, quantity);
  }
}

export default new GameService();
