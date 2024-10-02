import userService from '../../src/services/userService';
import userRepository from '../../src/repositories/userRepository';

jest.mock('../../src/repositories/userRepository');  // Mockea el repositorio

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Limpia todos los mocks antes de cada prueba
  });

  it('Debe obtener todos los usuarios correctamente', () => {
    const users = [{ id: '1', nombre: 'Juan', apellido: 'Pérez' }];
    userRepository.getAllUsers.mockReturnValue(users);  // Simula el comportamiento del repositorio

    const result = userService.getAllUsers();
    expect(userRepository.getAllUsers).toHaveBeenCalled();  // Verifica que se llamó al mock
    expect(result).toBe(users);  // Verifica que los datos devueltos son correctos
  });

  it('Debe obtener un usuario por ID', () => {
    const user = { id: '1', nombre: 'Juan', apellido: 'Pérez' };
    userRepository.getUserById.mockReturnValue(user);

    const result = userService.getUserById('1');

    expect(userRepository.getUserById).toHaveBeenCalledWith('1');
    expect(result).toBe(user);  // Verifica que se obtuvo el usuario correcto
  });

  it('Debe agregar un usuario correctamente', () => {
    const user = { id: '1', nombre: 'Juan', apellido: 'Pérez' };

    userService.addUser(user);

    expect(userRepository.addUser).toHaveBeenCalledWith(user);  // Verifica que el método mock fue llamado
  });

  it('Debe actualizar un usuario correctamente', () => {
    const updatedFields = { nombre: 'Carlos' };

    userService.updateUser('1', updatedFields);

    expect(userRepository.updateUser).toHaveBeenCalledWith('1', updatedFields);  // Verifica que el usuario fue actualizado
  });

  it('Debe eliminar un usuario correctamente', () => {
    userService.deleteUser('1');

    expect(userRepository.deleteUser).toHaveBeenCalledWith('1');  // Verifica que el usuario fue eliminado
  });
});
