// userController.test.js
import userController from '../../src/controllers/userController.js';
import userService from '../../src/services/userService.js';

// Mockeamos el userService
jest.mock('../../src/services/userService.js');


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); // Permite el encadenamiento
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  const mockRequest = (data) => {
    return data;
  };

  
  describe('UserController', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
    });
  
    describe('getAllUsers', () => {
      it('debe devolver todos los usuarios correctamente', () => {
        // Datos simulados
        const users = [{ id: '1', nombre: 'Juan', apellido: 'Pérez' }];
  
        // Mock del método getAllUsers del servicio
        userService.getAllUsers.mockReturnValue(users);
  
        // Objetos req y res simulados
        const req = mockRequest();
        const res = mockResponse();
  
        // Llamamos al método del controlador
        userController.getAllUsers(req, res);
  
        // Verificamos que se llamó al servicio correctamente
        expect(userService.getAllUsers).toHaveBeenCalled();
  
        // Verificamos que res.json fue llamado con los datos correctos
        expect(res.json).toHaveBeenCalledWith(users);
      });
    });
    
    describe('getUserById', () => {
        it('debe devolver un usuario si existe', () => {
          const user = { id: '1', nombre: 'Juan', apellido: 'Pérez' };
          userService.getUserById.mockReturnValue(user);
    
          const req = mockRequest({ params: { id: '1' } });
          const res = mockResponse();
    
          userController.getUserById(req, res);
    
          expect(userService.getUserById).toHaveBeenCalledWith('1');
          expect(res.json).toHaveBeenCalledWith(user);
        });
    
        it('debe devolver un status 404 si el usuario no existe', () => {
          userService.getUserById.mockReturnValue(undefined);
    
          const req = mockRequest({ params: { id: '999' } });
          const res = mockResponse();
    
          userController.getUserById(req, res);
    
          expect(userService.getUserById).toHaveBeenCalledWith('999');
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith('Usuario no encontrado');
        });
      });

      describe('addUser', () => {
        it('debe agregar un usuario correctamente', () => {
          const newUser = { id: '2', nombre: 'María', apellido: 'García' };
          const req = mockRequest({ body: newUser });
          const res = mockResponse();
    
          userController.addUser(req, res);
    
          expect(userService.addUser).toHaveBeenCalledWith(newUser);
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.send).toHaveBeenCalledWith('Usuario agregado');
        });
      });

      describe('updateUser', () => {
        it('debe actualizar un usuario correctamente', () => {
          const updatedFields = { nombre: 'Juan Carlos' };
          const req = mockRequest({ params: { id: '1' }, body: updatedFields });
          const res = mockResponse();
    
          userController.updateUser(req, res);
    
          expect(userService.updateUser).toHaveBeenCalledWith('1', updatedFields);
          expect(res.send).toHaveBeenCalledWith('Usuario actualizado');
        });
      });
      
      describe('deleteUser', () => {
        it('debe eliminar un usuario correctamente', () => {
          const req = mockRequest({ params: { id: '1' } });
          const res = mockResponse();
    
          userController.deleteUser(req, res);
    
          expect(userService.deleteUser).toHaveBeenCalledWith('1');
          expect(res.send).toHaveBeenCalledWith('Usuario eliminado');
        });
      });
    });
    