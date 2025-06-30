const categoryModel = require("../../models/categoryModel");
const formidable = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;

class categoryController {
  add_category = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 400, { error: "Something error occured!" });
      }
      let { image } = files;
      let { name } = fields;

      name = name?.[0]?.trim();

      const slug = name.toLowerCase().split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        const result = await cloudinary.uploader.upload(image?.[0]?.filepath, {
          folder: "categories",
        });

        if (result) {
          const category = await categoryModel.create({
            name,
            slug,
            image: result.url,
          });

          responseReturn(res, 201, {
            category,
            message: "Category added successfully.",
          });
        } else {
          responseReturn(res, 400, { error: "Image upload failed!" });
        }
      } catch (error) {
        console.error("Error occured while add category: ", error);
        responseReturn(res, 500, { error: "Internal server error!" });
      }
    });
  };

  get_categories = async (req, res) => {
    const { page, searchValue, perPage } = req.query;
    try {
      let skipPage;
      if (page && perPage) {
        skipPage = parseInt(perPage) * (parseInt(page) - 1);
      }
      let categories, totalCategories;
      if (searchValue && page && perPage) {
        categories = await categoryModel
          .find({
            $text: {
              $search: searchValue,
            },
          })
          .skip(skipPage)
          .limit(parseInt(perPage))
          .sort({ createdAt: -1 });
        totalCategories = await categoryModel
          .find({
            $text: {
              $search: searchValue,
            },
          })
          .countDocuments();
      } else if (searchValue === "" && page && perPage) {
        categories = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(parseInt(perPage))
          .sort({ createdAt: -1 });
        totalCategories = await categoryModel.find({}).countDocuments();
      } else {
        categories = await categoryModel.find({}).sort({ createdAt: -1 });
        totalCategories = await categoryModel.find({}).countDocuments();
      }
      responseReturn(res, 200, { totalCategories, categories });
    } catch (error) {
      console.error("Error occured while fetching category: ", error);
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };
}

module.exports = new categoryController();
