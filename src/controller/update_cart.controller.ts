import { user_cart_model } from "../model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import {
  status200Ok,
  status201Created,
  status400BadRequest,
  status401Unauthorized,
  status404NotFound,
  status500InternalServerError,
} from "../utils/methods/httpResponses";
import { Request, Response } from "express";

const model = user_cart_model;
const resourceName = "userCart";

export async function updateCart(req: any, res: Response<GenericServiceResponse |GenericServiceErrorResponse>){
  const {userId} = req.params
  const payload: [IPayload] = req.body.payload

  if(!payload){
    return res.status(400).json(status400BadRequest("Cart's payload is necessary"))
  }

  try {
    console.log(payload)
    const userCart = await model.findOneAndUpdate({userId: userId}, {selectedProducts: payload}, {new: true, runValidators:true})
    if(!userCart){
      return res.status(404).json(status404NotFound(resourceName, "User cart has not found"))
    }
    return res.status(200).json(status200Ok(userCart, resourceName, "", true))

  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }
}

interface IPayload {
  globalProductId: number,
  individualProductId: number,
  quantity: number
}