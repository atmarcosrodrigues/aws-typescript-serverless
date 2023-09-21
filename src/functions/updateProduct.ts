import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import middify from "../core/middify";
  import formatJSONResponse from "../core/formatJsonResponse";
  import productService from "../database/services";
  import UpdateProduct from "../dtos/updateProductDto";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent & UpdateProduct,
      context: Context
    ): Promise<APIGatewayProxyResult> => {
      const productId: string = event.pathParameters.productId;
      const { body } = event;
      try {
        const Products = await productService.updateProduct(productId, body);
  
        return formatJSONResponse(200, Products);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );
  