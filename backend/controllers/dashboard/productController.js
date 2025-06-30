const formidable = require("formidable");
const productModel = require("../../models/productModel");
const cloudinary = require("cloudinary").v2;
const { responseReturn } = require("../../utils/response");
class productController {
  add_product = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 400, { error: "Something error occured!" });
      }
      console.log("🚀 ~ productController ~ form.parse ~ files:", files);
      console.log("🚀 ~ productController ~ form.parse ~ fields:", fields);
      let {
        name,
        description,
        price,
        stock,
        discount,
        brand,
        category,
        shopName,
      } = fields;
      let { images } = files;

      name = name?.[0]?.trim();
      const slug = name.toLowerCase().split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        let allImageUrls = [];

        for (let i = 0; i < images?.length; i++) {
          const result = await cloudinary.uploader.upload(images[i]?.filepath, {
            folder: "products",
          });
          allImageUrls.push(result.url);
        }

        const product = await productModel.create({
          sellerId: req.id,
          name,
          slug,
          category: category?.[0].trim(),
          brand: brand?.[0].trim(),
          price: parseInt(price?.[0]),
          stock: parseInt(stock?.[0]),
          discount: parseInt(discount?.[0]),
          description: description?.[0].trim(),
          shopName: shopName?.[0].trim(),
          images: allImageUrls,
        });
        responseReturn(res, 201, { message: "Product added suucessfully." });
      } catch (error) {
        console.error("Error occured while add product: ", error);
        responseReturn(res, 500, { error: "Internal server error!" });
      }
    });
  };

  get_products = async (req, res) => {
    const { page, searchValue, perPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(perPage) * (parseInt(page) - 1);

    try {
      let products, totalProducts;
      if (searchValue) {
        products = await productModel
          .find({
            $text: {
              $search: searchValue,
            },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parseInt(perPage))
          .sort({ createdAt: -1 });
        totalProducts = await productModel
          .find({
            $text: {
              $search: searchValue,
            },
            sellerId: id,
          })
          .countDocuments();
      } else if (searchValue === "" && page && perPage) {
        products = await productModel
          .find({
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parseInt(perPage))
          .sort({ createdAt: -1 });
        totalProducts = await productModel.find({}).countDocuments();
      }
      responseReturn(res, 200, { totalProducts, products });
    } catch (error) {
      console.error("Error occured while fetch products: ", error);
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };

  get_product = async (req, res) => {
    const { productId } = req.params;
    const { id } = req;
    console.log(
      "🚀 ~ productController ~ get_product= ~ productId:",
      productId
    );
    try {
      const product = await productModel.findOne({
        _id: productId,
        sellerId: id,
      });
      console.log("🚀 ~ productController ~ get_product= ~ product:", product);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.error("Error occured while fetch single product: ", error);
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };

  update_product = async (req, res) => {
    let { name, description, discount, price, brand, stock, category } =
      req.body;
    const { productId } = req.params;

    name = name?.trim();
    const slug = name.toLowerCase().split(" ").join("-");

    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        slug,
        description,
        discount,
        price,
        brand,
        stock,
        category,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: "Product updated successfully.",
      });
    } catch (error) {
      console.error("Error occured while update product: ", error);
      responseReturn(res, 500, { error: "Internal server error!" });
    }
  };

  update_product_image = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      if (error) {
        responseReturn(res, 400, { error: "Something error occured!" });
      }
      const { oldImage } = fields;
      const { productId } = req.params;
      const { newImage } = files;

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        const result = await cloudinary.uploader.upload(
          newImage?.[0]?.filepath,
          {
            folder: "products",
          }
        );
        console.log("🚀 ~ productController ~ form.parse ~ result:", result);
        if (result) {
          let { images } = await productModel.findById(productId);
          console.log("🚀 ~ productController ~ form.parse ~ images:", images);
          console.log(
            "🚀 ~ productController ~ form.parse ~ oldImage:",
            oldImage
          );
          const index = images.findIndex((image) => image === oldImage[0]);
          console.log("🚀 ~ productController ~ form.parse ~ index:", index);
          images[index] = result.url;

          await productModel.findByIdAndUpdate(productId, {
            images,
          });

          const product = await productModel.findById(productId);
          console.log(
            "🚀 ~ productController ~ form.parse ~ product:",
            product
          );
          responseReturn(res, 200, {
            product,
            message: "Product image updated successfully.",
          });
        } else {
          responseReturn(res, 400, { error: "Image upload failed!" });
        }
      } catch (error) {
        console.error("Error occured while update product image: ", error);
        responseReturn(res, 500, { error: "Internal server error!" });
      }
    });
  };
}

module.exports = new productController();
