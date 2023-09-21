import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import middify from "../core/middify";
  import formatJSONResponse from "../core/formatJsonResponse";
  import productService from "../database/services";
  
  export const handler: Handler = middify(
    async (
      event: APIGatewayEvent,
      context: Context
    ): Promise<APIGatewayProxyResult> => {
      const productId: string = event.pathParameters.productId;
      try {
        const Products = await productService.deleteProduct(productId);
  
        return formatJSONResponse(200, Products);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );
  