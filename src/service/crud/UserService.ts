import { Observable } from "rxjs";
import User from "../../model/User";

export default interface UserService {
    addUser(user: User): Promise<User|string>;
    getUsers(): Observable<User[] | string>;
}