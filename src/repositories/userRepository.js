const users = [];

class UserRepository {
  getAllUsers() {
    return users;
  }

  getUserById(id) {
    return users.find((user) => user.id === id);
  }

  addUser(user) {
    users.push(user);
  }

  updateUser(id, updatedFields) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      // Actualizar solo los campos proporcionados
      users[index] = { ...users[index], ...updatedFields };
    }
  }

  deleteUser(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }
}

export default new UserRepository();
