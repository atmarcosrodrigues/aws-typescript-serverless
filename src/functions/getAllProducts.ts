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
      try {
        const Products = await productService.getAllProducts();
  
        return formatJSONResponse(200, Products);
      } catch (err) {
        return formatJSONResponse(400, err);
      }
    }
  );
  