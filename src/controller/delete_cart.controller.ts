import { user_cart_model} from "../model";
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

export async function deleteCart(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>){
  const {userId} = req.params

  if(!userId){
    return res.status(400).json(status400BadRequest(`Invalid userId param (${userId})`))
  }

  try {
    const deletedCart = await model.findOneAndDelete({userId: userId})
    if(!deletedCart){
      return res.status(404).json(status404NotFound(resourceName, "Invalid userId consulted"))
    }
    return res.status(200).json(status200Ok(deletedCart, resourceName, "", false, true))

  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))

  }
}