import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Product from "../../models/Product";

class ProductService {
  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Product[];
  }
  
  async getProduct(productId: string): Promise<Product> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { productId },
      })
      .promise();

    return result.Item as Product;
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

  async updateProduct(ProductId: string, partialProduct: Partial<Product>): Promise<Product> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { ProductId },
        UpdateExpression:
          "set #title = :title, description = :description, active = :active",
        ExpressionAttributeNames: {
          "#title": "title",
        },
        ExpressionAttributeValues: {
          ":title": partialProduct.title,
          ":description": partialProduct.description,
          ":active": partialProduct.active,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as Product;
  }
  async deleteProduct(productId: string) {
    return this.docClient
      .delete({
        TableName: this.tableName,
        Key: { productId },
      })
      .promise();
  }

}

export default ProductService;
