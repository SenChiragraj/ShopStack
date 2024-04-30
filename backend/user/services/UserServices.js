import UserRepository from "../data/repository/UserRepository.js";
import ErrorClass from "../errors/api-handler.js";
import generateToken from '../middleware/generateToken.js'

import bcrypt from 'bcrypt';

export default class UserService {

  constructor() {
    this.repository = new UserRepository();
    this.error = new ErrorClass();
  }

  async Login(userInfo) {
  const { email, password } = userInfo;

  const user = await this.repository.FindUser(email);
  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(user, isValidPassword);
    if (isValidPassword) {
      return {
        user : user,
        token: generateToken(user._id),
      };
    } else {
      return this.error.Api_Error('Wrong Password');
    }
  } else {
    return this.error.Api_Error('User not found');
  }
}

  async Register(userInfo) {
    const { email } = userInfo;
    try {
      let existingUser = await this.repository.FindUser(email);
      if (existingUser)
        return this.error.Api_Error(400, 'User already exists');

      const newUser = await this.repository.CreateUser(userInfo);
      if (newUser) {
        const token = generateToken(newUser._id);
        return ({
          user: newUser,
          token
        });
      }
      else {
        return this.error.Api_Error('Error in creating a new user');
      }
    } catch (error){
      return this.error.Api_Error(error.message);
    }
  };

  async getAll() {
    try {
      let user = await this.repository.GetAllUser();
      if (user)
        return user;
      else
        return this.error.Api_Error(400, 'Cannot fetch');
    } catch (err) {
      return this.error.Api_Error(400, 'Error', err);
    }
  }



}