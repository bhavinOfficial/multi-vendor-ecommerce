const categoryModel = require("../../models/categoryModel");
const formidable = require("formidable");
const returnResponse = require("../../utils/response");
const cloudinary = require("cloudinary").v2;

class categoryController {
    add_category = async (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                returnResponse(res, 400, { error: "Something error occured!" })
            }
            console.log("🚀 ~ categoryController ~ form.parse ~ files:", files);
            console.log("🚀 ~ categoryController ~ form.parse ~ fields:", fields);
            let { image } = files;
            let { name } = fields;

            name = name.totrim();
            const slug = name.toLowerCase().split(" ").join("-");

            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true
            });
            
            try {
                const result = await cloudinary.uploader.upload(image.filepath, {
                    folder: 'categories'
                });
                
                if (result) {
                    const category = await categoryModel.create({
                        name,
                        slug,
                        image: result.url
                    });

                    returnResponse(res, 201, { category, message: "Category added successfully." })
                } else {
                    returnResponse(res, 400, { error: "Image upload failed!" })
                }
            } catch (error) {
                returnResponse(res, 500, { error: "Internal server error!" })
            }

        })
    };

    get_categories = async (req, res) => {
        console.log("olj");
    };
}   

module.exports = new categoryController();