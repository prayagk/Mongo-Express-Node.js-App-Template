const userModel = require('../models/users');

const signUp = async (name, email) => {
  try {
    const user = new userModel.users({ name, email });
    const result = await user.save();
    return result._id;
  } catch (error) {
    return false;
  }
}

module.exports = { signUp }
