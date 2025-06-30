const router = require("express").Router();
const productControllers = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post("/product-add", authMiddleware, productControllers.add_product);
router.get("/products-get", authMiddleware, productControllers.get_products);
router.get(
  "/product-get/:productId",
  authMiddleware,
  productControllers.get_product
);
router.put(
  "/product-update/:productId",
  authMiddleware,
  productControllers.update_product
);
router.put(
  "/product-image-update/:productId",
  authMiddleware,
  productControllers.update_product_image
);

module.exports = router;
