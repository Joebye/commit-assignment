import { preProcessFile } from "typescript";
import User from "../../model/User";
import UserService from "./UserService";
import { Observable, Subscriber } from "rxjs";

const SERVER_NOT_AVILABLE = 'Server is unavailable, repeat later on'

export default class UserServiceRest implements UserService {
    private urlService: string;
    private observable: Observable<User[] | string> | undefined;
    private subscriber: Subscriber<User[] | string> | undefined;

    constructor(baseUrl: string) {
        this.urlService = `http://${baseUrl}`
    }
    

    async addUser(user: User): Promise<User|string> {
        try {
            let res: User|string;
            const response = await fetch(`${this.urlService}/addform`,
            {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });
        res = await response.json();
        return res;
        } catch (error) {
            return prompt(SERVER_NOT_AVILABLE)!;
        }
    }

    getUsers(): Observable<string | User[]> {
        this.observable = new Observable<User[] | string> (subscriber => {
            this.subscriber = subscriber;
            this.subscriberNext();
        });
        return this.observable;
    }
    private subscriberNext(): void {
        fetchAllUsers(`${this.urlService}/listusers`).then(users => {
            this.subscriber?.next(users);
        }).catch(error => this.subscriber?.next(error))
    }

}

async function fetchAllUsers(url: string): Promise<User[] | string> {
    const response = await fetch(url, {});
    return response.json();
    
}