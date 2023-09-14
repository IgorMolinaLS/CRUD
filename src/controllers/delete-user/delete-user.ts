import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteUserController, IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    const id = httpRequest?.params?.id;

    try {
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user Id",
        };
      }

      const userId = await MongoClient.db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      if (!userId) {
        return {
          statusCode: 500,
          body: "Id not found",
        };
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
