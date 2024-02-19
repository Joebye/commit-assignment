import { useEffect, useState } from "react";
import User from "../model/User";
import { Subscription } from "rxjs";
import { userService } from "../config/service-config";


export function useSelectorUsers() {
    const [users, setUsers] = useState<User[]>([])
useEffect(() => {
    const subscription: Subscription = userService.getUsers().
    subscribe({
        next(userArray: User[] | string) {
            let errorMess: string = '';
            if (typeof userArray === 'string') {
                errorMess = userArray
            } else {
                setUsers(userArray);
            }
        }
    });
   return () => subscription.unsubscribe();
}, []);
return users;

}