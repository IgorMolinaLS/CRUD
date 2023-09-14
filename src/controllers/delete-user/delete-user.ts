import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";
import { badRequest, ok, serverError } from "../helpers";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    const id = httpRequest?.params?.id;

    try {
      if (!id) {
        return badRequest("Missing user Id");
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

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
