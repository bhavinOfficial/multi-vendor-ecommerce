const router = require("express").Router();
const productControllers = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post("/product-add", authMiddleware, productControllers.add_product);
// router.get("/categories-get", authMiddleware, productControllers.get_categories);

module.exports = router;
