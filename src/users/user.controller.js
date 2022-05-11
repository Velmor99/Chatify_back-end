const bcrypt = require("bcrypt");
const userModel = require("./user.model");
const { ObjectId } = require("mongodb");

class UserController {
  async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(409).send({ message: "User is already exist" });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const createUser = await userModel.create({
        email,
        password: hashPassword,
        username,
      });
      const createdUser = await userModel.findOne({ email });
      return res.send({
        user: {
          email: createdUser.email,
          username: createdUser.username,
          theme: createdUser.theme,
          img: createdUser.img,
          privacy: createdUser.privacy,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.send("user not found").status(404);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.send({ message: "Wrong password" }).status(401);
      }
      res.send({
        user: {
          email: user.email,
          username: user.username,
          theme: user.theme,
          img: user.img,
          privacy: user.privacy,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
