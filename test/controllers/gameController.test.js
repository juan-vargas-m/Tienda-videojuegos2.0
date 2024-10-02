import gameController from '../../src/controllers/gameController.js';
import gameService from '../../src/services/gameService.js';

// Mockeamos el gameService
jest.mock('../../src/services/gameService.js');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); // Para permitir el encadenamiento
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  const mockRequest = (data) => {
    return data;
  };

  
  describe('GameController', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
    });
  
    describe('getAllGames', () => {
      it('debe devolver todos los videojuegos correctamente', () => {
        // Datos simulados
        const games = [{ id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 }];
  
        // Mock del método getAllGames del servicio
        gameService.getAllGames.mockReturnValue(games);
  
        // Objetos req y res simulados
        const req = mockRequest();
        const res = mockResponse();
  
        // Llamamos al método del controlador
        gameController.getAllGames(req, res);
  
        // Verificamos que se llamó al servicio correctamente
        expect(gameService.getAllGames).toHaveBeenCalled();
  
        // Verificamos que res.json fue llamado con los datos correctos
        expect(res.json).toHaveBeenCalledWith(games);
      });
  
      it('debe manejar errores y devolver un status 500', () => {
        // Simulamos un error en el servicio
        gameService.getAllGames.mockImplementation(() => {
          throw new Error('Error en el servicio');
        });
  
        const req = mockRequest();
        const res = mockResponse();
  
        gameController.getAllGames(req, res);
  
        expect(gameService.getAllGames).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error al obtener los videojuegos');
      });
    });
    
    describe('getGameById', () => {
        it('debe devolver un videojuego si existe', () => {
          const game = { id: '1', nombre: 'FIFA 21', consola: 'PS4', cantidad: 10 };
          gameService.getGameById.mockReturnValue(game);
    
          const req = mockRequest({ params: { id: '1' } });
          const res = mockResponse();
    
          gameController.getGameById(req, res);
    
          expect(gameService.getGameById).toHaveBeenCalledWith('1');
          expect(res.json).toHaveBeenCalledWith(game);
        });
    
        it('debe manejar errores y devolver un status 404 si no se encuentra el videojuego', () => {
          gameService.getGameById.mockImplementation(() => {
            throw new Error('Videojuego no encontrado');
          });
    
          const req = mockRequest({ params: { id: '999' } });
          const res = mockResponse();
    
          gameController.getGameById(req, res);
    
          expect(gameService.getGameById).toHaveBeenCalledWith('999');
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith('Videojuego no encontrado');
        });
      });
      
      describe('addGame', () => {
        it('debe agregar un videojuego correctamente', () => {
          const newGame = { id: '2', nombre: 'Call of Duty', consola: 'Xbox', cantidad: 5 };
          const req = mockRequest({ body: newGame });
          const res = mockResponse();
    
          gameController.addGame(req, res);
    
          expect(gameService.addGame).toHaveBeenCalledWith(newGame);
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.send).toHaveBeenCalledWith('Videojuego agregado');
        });
    
        it('debe manejar errores y devolver un status 500', () => {
          gameService.addGame.mockImplementation(() => {
            throw new Error('Error al agregar');
          });
    
          const newGame = { id: '2', nombre: 'Call of Duty', consola: 'Xbox', cantidad: 5 };
          const req = mockRequest({ body: newGame });
          const res = mockResponse();
    
          gameController.addGame(req, res);
    
          expect(gameService.addGame).toHaveBeenCalledWith(newGame);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error al agregar el videojuego');
        });
      });
      
      describe('updateGame', () => {
        it('debe actualizar un videojuego correctamente', () => {
          const updatedFields = { nombre: 'FIFA 22' };
          const req = mockRequest({ params: { id: '1' }, body: updatedFields });
          const res = mockResponse();
    
          gameController.updateGame(req, res);
    
          expect(gameService.updateGame).toHaveBeenCalledWith('1', updatedFields);
          expect(res.send).toHaveBeenCalledWith('Videojuego actualizado');
        });
    
        it('debe manejar errores y devolver un status 404 si no se encuentra el videojuego', () => {
          gameService.updateGame.mockImplementation(() => {
            throw new Error('Videojuego no encontrado');
          });
    
          const updatedFields = { nombre: 'FIFA 22' };
          const req = mockRequest({ params: { id: '999' }, body: updatedFields });
          const res = mockResponse();
    
          gameController.updateGame(req, res);
    
          expect(gameService.updateGame).toHaveBeenCalledWith('999', updatedFields);
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith('Videojuego no encontrado');
        });
      });

      describe('deleteGame', () => {
        it('debe eliminar un videojuego correctamente', () => {
          const req = mockRequest({ params: { id: '1' } });
          const res = mockResponse();
    
          gameController.deleteGame(req, res);
    
          expect(gameService.deleteGame).toHaveBeenCalledWith('1');
          expect(res.send).toHaveBeenCalledWith('Videojuego eliminado');
        });
    
        it('debe manejar errores y devolver un status 404 si no se encuentra el videojuego', () => {
          gameService.deleteGame.mockImplementation(() => {
            throw new Error('Videojuego no encontrado');
          });
    
          const req = mockRequest({ params: { id: '999' } });
          const res = mockResponse();
    
          gameController.deleteGame(req, res);
    
          expect(gameService.deleteGame).toHaveBeenCalledWith('999');
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith('Videojuego no encontrado');
        });
      });
      
      describe('sellGame', () => {
        it('debe realizar una venta correctamente', () => {
          const req = mockRequest({ params: { id: '1' }, body: { cantidad: 2 } });
          const res = mockResponse();
      
          gameController.sellGame(req, res);
      
          expect(gameService.sellGame).toHaveBeenCalledWith('1', 2); // Ahora el id viene de los params
          expect(res.send).toHaveBeenCalledWith('Venta realizada');
        });
      
        it('debe devolver un status 409 si no hay suficiente stock', () => {
          gameService.sellGame.mockImplementation(() => {
            throw new Error('No hay suficiente cantidad de este videojuego en stock');
          });
      
          const req = mockRequest({ params: { id: '1' }, body: { cantidad: 5 } });
          const res = mockResponse();
      
          gameController.sellGame(req, res);
      
          expect(gameService.sellGame).toHaveBeenCalledWith('1', 5); // Ahora el id viene de los params
          expect(res.status).toHaveBeenCalledWith(409);
          expect(res.send).toHaveBeenCalledWith('No hay suficiente cantidad de este videojuego en stock');
        });
      
        it('debe devolver un status 404 si el videojuego no se encuentra', () => {
          gameService.sellGame.mockImplementation(() => {
            throw new Error('Videojuego no encontrado');
          });
      
          const req = mockRequest({ params: { id: '999' }, body: { cantidad: 1 } });
          const res = mockResponse();
      
          gameController.sellGame(req, res);
      
          expect(gameService.sellGame).toHaveBeenCalledWith('999', 1); // Ahora el id viene de los params
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith('Videojuego no encontrado');
        });
      });
      
    });
    
