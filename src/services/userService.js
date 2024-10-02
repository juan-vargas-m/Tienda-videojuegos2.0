import  userRepository from '../repositories/userRepository.js';

class UserService {
  getAllUsers() {
    return userRepository.getAllUsers();
  }

  getUserById(id) {
    return userRepository.getUserById(id);
  }

  addUser(user) {
    userRepository.addUser(user);
  }

  updateUser(id, updatedUser) {
    userRepository.updateUser(id, updatedUser);
  }

  deleteUser(id) {
    userRepository.deleteUser(id);
  }
}

export default new UserService();
