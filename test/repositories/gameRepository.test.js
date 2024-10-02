import gameRepository from '../../src/repositories/gameRepository.js';

describe('GameRepository', () => {
  beforeEach(() => {
    gameRepository.resetGames();  // Limpia el estado de los juegos antes de cada prueba
  });

  it('Debe obtener todos los videojuegos correctamente', () => {
    const games = gameRepository.getAllGames();
    expect(games).toEqual([]);  // Inicialmente debe estar vacío
  });

  it('Debe agregar un videojuego correctamente', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
    gameRepository.addGame(game);  // Ejecuta el método real
    const result = gameRepository.getAllGames();
    expect(result).toContain(game);  // Verifica que el juego fue agregado
  });

  it('Debe obtener un videojuego por ID', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
    gameRepository.addGame(game);
    const result = gameRepository.getGameById('1');
    expect(result).toEqual(game);  // Verifica que se obtuvo el videojuego correcto
  });

  it('Debe lanzar un error si el videojuego no existe al obtener por ID', () => {
    expect(() => gameRepository.getGameById('999')).toThrow('Videojuego no encontrado');
  });

  it('Debe actualizar un videojuego correctamente', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
    gameRepository.addGame(game);
    const updatedFields = { nombre: 'FIFA 22' };
    gameRepository.updateGame('1', updatedFields);  // Actualiza el juego
    const updatedGame = gameRepository.getGameById('1');
    expect(updatedGame.nombre).toBe('FIFA 22');  // Verifica que el nombre fue actualizado
  });

  it('Debe lanzar un error si el videojuego no existe al actualizar', () => {
    const updatedFields = { nombre: 'FIFA 22' };
    expect(() => gameRepository.updateGame('999', updatedFields)).toThrow('Videojuego no encontrado para actualizar');
  });

  it('Debe eliminar un videojuego correctamente', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
    gameRepository.addGame(game);
    gameRepository.deleteGame('1');  // Elimina el juego
    const result = gameRepository.getAllGames();
    expect(result).not.toContain(game);  // Verifica que el juego fue eliminado
  });

  it('Debe lanzar un error si el videojuego no existe al eliminar', () => {
    expect(() => gameRepository.deleteGame('999')).toThrow('Videojuego no encontrado para eliminar');
  });

  it('Debe vender un videojuego si hay suficiente stock', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
    gameRepository.addGame(game);  // Agrega el juego real
    gameRepository.sellGame('1', 5);  // Ejecuta la venta
    const updatedGame = gameRepository.getGameById('1');
    expect(updatedGame.cantidad).toBe(5);  // Verifica que el stock se reduce
  });

  it('Debe lanzar un error si no hay suficiente stock', () => {
    const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 3 };
    gameRepository.addGame(game);  // Agrega el juego real
    expect(() => gameRepository.sellGame('1', 5)).toThrow('No hay suficiente cantidad de este videojuego en stock');
  });
});
