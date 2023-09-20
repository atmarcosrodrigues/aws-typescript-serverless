import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Product from "../../models/Product";

class ProductService {
  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async getAllProduct(): Promise<Product[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Product[];
  }

  async createProduct(product: Product): Promise<Product> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: product,
      })
      .promise();

    return product;
  }


}

export default ProductService;
