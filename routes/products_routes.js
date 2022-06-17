import express from "express";
import checkAuth from "../middleware/auth_middleware.js";
import {
    getProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/products_routes_controller.js";

const productRoutes = express.Router();

// route for get and post products
productRoutes.route("/").get(checkAuth, getProducts).post(checkAuth, addProduct);
// route for get, put and delete product
productRoutes.route("/:id").get(checkAuth, getOneProduct).put(checkAuth, updateProduct).delete(checkAuth, deleteProduct);

export default productRoutes;