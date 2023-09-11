import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Igor",
        lastName: "Silva",
        email: "igor@email.com",
        password: "1234",
      },
      {
        firstName: "Bruno",
        lastName: "Silva",
        email: "bruno@email.com",
        password: "1234",
      },
    ];
  }
}
