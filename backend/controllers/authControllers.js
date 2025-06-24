const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/tokenCreate");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin._id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          });
          responseReturn(res, 200, {
            token,
            message: "Login success",
          });
        } else {
          responseReturn(res, 400, { error: "Entered wrong password!" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found!" });
      }
    } catch (error) {
      console.error("Error while admin login: ", error);
      responseReturn(res, 500, { error: error.message });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === 'admin') {
        const user = await adminModel.findById(id);
        return responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("seller info");
      }
    } catch (error) {
      console.error("Error while getting user info: ", error);
    }  
  }
}

module.exports = new authControllers();
