import gameService from '../../src/services/gameService';
import gameRepository from '../../src/repositories/gameRepository';

jest.mock('../../src/repositories/gameRepository');  // Mockea el repositorio

describe('GameService', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Limpia todos los mocks antes de cada prueba
    
  });

  it('Debe obtener todos los videojuegos correctamente', () => {
    const games = [{ id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 }];
    gameRepository.getAllGames.mockReturnValue(games);  // Simula el comportamiento del repositorio

    const result = gameService.getAllGames();
    expect(gameRepository.getAllGames).toHaveBeenCalled();  // Verifica que se llamó al mock
    expect(result).toBe(games);  // Verifica que los datos devueltos son correctos
  });

  it('Debe obtener un videojuego por ID', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
    gameRepository.getGameById.mockReturnValue(game);

    const result = gameService.getGameById('1');

    expect(gameRepository.getGameById).toHaveBeenCalledWith('1');
    expect(result).toBe(game);  // Verifica que se obtuvo el videojuego correcto
  });

  it('Debe agregar un videojuego correctamente', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };

    gameService.addGame(game);

    expect(gameRepository.addGame).toHaveBeenCalledWith(game);  // Verifica que el método mock fue llamado
  });

  it('Debe actualizar un videojuego correctamente', () => {
    const updatedFields = { nombre: 'FIFA 22' };

    gameService.updateGame('1', updatedFields);

    expect(gameRepository.updateGame).toHaveBeenCalledWith('1', updatedFields);  // Verifica que el videojuego fue actualizado
  });

  it('Debe eliminar un videojuego correctamente', () => {
    gameService.deleteGame('1');

    expect(gameRepository.deleteGame).toHaveBeenCalledWith('1');  // Verifica que el videojuego fue eliminado
  });

  it('Debe vender un videojuego correctamente', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
    gameRepository.getGameById.mockReturnValue(game);  // Simula el juego

    gameService.sellGame('1', 5);

    expect(gameRepository.sellGame).toHaveBeenCalledWith('1', 5);  // Verifica que se llamó correctamente
  });
  
  it('Debe lanzar un error si no hay suficiente stock', () => {
    // Define a game with insufficient stock
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 3 };
    gameRepository.getGameById.mockReturnValue(game);
  
    // Mock sellGame to throw an error when called
    gameRepository.sellGame.mockImplementation(() => {
      throw new Error('No hay suficiente cantidad de este videojuego en stock');
    });
  
    // Expect the service method to throw the same error
    expect(() => gameService.sellGame('1', 5)).toThrow('No hay suficiente cantidad de este videojuego en stock');
  });
  
  
});
