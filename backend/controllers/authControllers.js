const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/tokenCreate");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const formidable = require("formidable");
const productModel = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
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
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };

  seller_register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const getUser = await sellerModel.findOne({ email });
      console.log(
        "🚀 ~ authControllers ~ seller_register= ~ getUser:",
        getUser
      );
      if (getUser) {
        responseReturn(res, 409, { error: "Email already exists!" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 9),
          loginMethod: "manually",
        });
        await sellerCustomerModel.create({
          myId: seller.id,
        });
        const token = await createToken({
          id: seller.id,
          role: seller.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, {
          message: "Seller registered successfully.",
          token,
        });
      }
    } catch (error) {
      console.error("Error while seller register: ", error);
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const admin = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: admin });
      } else {
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      console.error("Error while getting user info: ", error);
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };

  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
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
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };

  profile_image_upload = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, _, files) => {
      if (err) {
        responseReturn(res, 400, { error: "Something error occured!" });
      }

      let { image } = files;

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        const result = await cloudinary.uploader.upload(image?.[0]?.filepath, {
          folder: "profile",
        });
        if (result) { 
          await sellerModel.findByIdAndUpdate(req?.id, {
            image: result?.url,
          });
          const userInfo = await sellerModel.findById(req?.id);
          responseReturn(res, 201, {
            message: "Profile image uploaded suucessfully.",
            userInfo
          });
        } else {
          responseReturn(res, 400, {
            message: "Image upload failed!",
          });
        }
      } catch (error) {
        console.error("Error occured while profile image upload: ", error);
        responseReturn(res, 500, { error: "Internal server error!" });
      }
    });
  };
}

module.exports = new authControllers();
