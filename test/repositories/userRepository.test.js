import userRepository from '../../src/repositories/userRepository.js';  // Importa la instancia, no la clase

describe('UserRepository', () => {
  beforeEach(() => {
    userRepository.getAllUsers().length = 0;  // Limpia la lista de usuarios antes de cada prueba
  });

  it('Debe agregar un usuario correctamente', () => {
    const user = { id: '1', nombre: 'Juan', apellido: 'Pérez' };
    userRepository.addUser(user);  // Ejecuta el método real
    const result = userRepository.getAllUsers();
    expect(result).toContain(user);  // Verifica que el usuario fue agregado
  });

  it('Debe obtener un usuario por ID', () => {
    const user = { id: '1', nombre: 'Juan', apellido: 'Pérez' };
    userRepository.addUser(user);
    const result = userRepository.getUserById('1');
    expect(result).toEqual(user);  // Verifica que el usuario obtenido es el correcto
  });

  it('Debe actualizar un usuario correctamente', () => {
    const user = { id: '1', nombre: 'Juan', apellido: 'Pérez' };
    userRepository.addUser(user);
    userRepository.updateUser('1', { nombre: 'Carlos' });
    const updatedUser = userRepository.getUserById('1');
    expect(updatedUser.nombre).toBe('Carlos');  // Verifica que el campo nombre fue actualizado
  });
  it('Debe intentar actualizar un usuario que no existe', () => {
    userRepository.updateUser('999', { nombre: 'Carlos' });
    const result = userRepository.getUserById('999');
    expect(result).toBeUndefined();  // Verifica que no se encuentra el usuario
  });
  

  it('Debe eliminar un usuario correctamente', () => {
    const user = { id: '1', nombre: 'Juan', apellido: 'Pérez' };
    userRepository.addUser(user);
    userRepository.deleteUser('1');
    const result = userRepository.getUserById('1');
    expect(result).toBeUndefined();  // Verifica que el usuario fue eliminado
  });
  it('Debe intentar eliminar un usuario que no existe', () => {
    userRepository.deleteUser('999');
    const result = userRepository.getUserById('999');
    expect(result).toBeUndefined();  // Verifica que no se encuentra el usuario
  });
  

  it('Debe lanzar undefined si el usuario no existe', () => {
    const result = userRepository.getUserById('999');
    expect(result).toBeUndefined();  // Verifica que no se encuentra el usuario
  });
});
