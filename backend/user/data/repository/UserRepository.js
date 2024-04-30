import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'

export default class UserRepository {

  async FindUser(email) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async CreateUser(userInfo) {
    try {
      const { name, email, password, pic } = userInfo;
      const hashed = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashed,
        pic,
      });
      return newUser;

    } catch (error) {
      console.log('Create User :', error);
    }
  }

  async GetAllUser() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log('Get All User :', error);
    }
  }
}