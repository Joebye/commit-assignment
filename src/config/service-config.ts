import UserService from "../service/crud/UserService";
import UserServiceRest from "../service/crud/UserServiceRest";

export const userService: UserService = new UserServiceRest('localhost:3500')