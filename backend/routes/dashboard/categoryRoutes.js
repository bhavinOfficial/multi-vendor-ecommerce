const router = require("express").Router();
const categoryControllers = require("../../controllers/dashboard/categoryController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post("/category-add", authMiddleware, categoryControllers.add_category);
router.get("/categories-get", authMiddleware, categoryControllers.get_categories);

module.exports = router;
