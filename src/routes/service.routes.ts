import { Router } from "express";
import { createCart } from "../controller/create_cart.controller";
import { deleteCart } from "../controller/delete_cart.controller";
import { getCartByUserId } from "../controller/get_cart.controller";
import { updateCart } from "../controller/update_cart.controller";

const router = Router()

router.get("/carts/:userId", getCartByUserId)

router.post("/create-cart", createCart)

router.post("/update-cart/:userId", updateCart)

router.delete("/delete-cart/:userId", deleteCart)

export default router