import { user_cart_model, UserDataModel } from "../model";
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

export async function createCart(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { userId } = req.body;

  try {
    const user = await UserDataModel.findOne({ where: { id_user: userId } });
    if (!user) {
      return res
        .status(404)
        .json(status404NotFound("user", `Assigned user (${userId}) doesn't exist`));
    }
    const newCart = await new model({ userId: userId }).save();
    return res
      .status(200)
      .json(
        status201Created(
          newCart,
          resourceName,
          "New user cart has been successfully created"
        )
      );
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}
