import createDynamoDBClient from "../db";
import ProductService from "./productService";

const { PRODUCT_TABLE } = process.env;

const productService = new ProductService(createDynamoDBClient(), PRODUCT_TABLE);

export default productService;
