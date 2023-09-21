import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import * as uuid from "uuid";
  import middify from "../core/middify";
  import formatJSONResponse from "../core/formatJsonResponse";
  import productService from "../database/services";
  import CreateProduct from "../dtos/createProductDto";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent & CreateProduct,
      context: Context
    ): Promise<APIGatewayProxyResult> => {
      const { title, description } = event.body;
  
      try {
        const productId: string = uuid.v4();
        const Product = await productService.createProduct({
          productId,
          title,
          description,
          active: true,
          createdAt: new Date().toISOString(),
        });
  
        return formatJSONResponse(201, Product);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );
  