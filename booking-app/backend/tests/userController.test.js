const userController = require('../controllers/userController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/User'); // Mock the User model
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('userController', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      // Mock the User model's constructor and save method
      const mockUser = { _id: '123', username: 'testUser', save: jest.fn() };
      mockUser.save.mockResolvedValue(mockUser); // Ensure save resolves with mockUser
      User.mockImplementation(() => mockUser);

      const req = { body: { username: 'testUser', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "User created successfully", userId: '123' });
    });
  });

  // Test for getAllUsers
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      User.find.mockResolvedValue([{ username: 'User1' }, { username: 'User2' }]);
      const req = {};
      const res = { json: jest.fn() };

      await userController.getAllUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ username: 'User1' })]));
    });
  });

  // Test for deleteUser
  describe('deleteUser', () => {
    it('should delete a user', async () => {
      User.findByIdAndDelete.mockResolvedValue({ _id: '123', username: 'userToDelete' });

      const req = { params: { id: '123' } };
      const res = { json: jest.fn() };

      await userController.deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'User successfully deleted' });
    });
  });

  describe('userController', () => {
    // Test for getAllUsers with expected failure
    describe('getAllUsers', () => {
      it('should fail to return all users due to database error', async () => {
        User.find.mockRejectedValue(new Error('Database error')); // Simulate a database error
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
        await userController.getAllUsers(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500); // Expecting an Internal Server Error status
      });
    });
  
    // Test for deleteUser with expected failure
    describe('deleteUser', () => {
      it('should fail to delete a user because user does not exist', async () => {
        User.findByIdAndDelete.mockResolvedValue(null); // Simulate user not found
        const req = { params: { id: 'nonExistentUserId' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
        await userController.deleteUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404); // Expecting a Not Found status
      });
    });
  });
});
