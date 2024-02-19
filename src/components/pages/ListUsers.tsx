import { Card, CardContent, Typography } from "@mui/material"
import { useSelectorUsers } from "../../hooks/hooks";
import User from "../../model/User";


const ListUsers: React.FC = () => {

     const users: User[] = useSelectorUsers();
     console.log(users);
    
    return (
        <div>
          {users.map((item, index) => (
            <Card key={index} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  User Name:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.username}
                </Typography>
                <Typography color="text.secondary">
                  Phone Number:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.phonenumber}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      );
}

export default ListUsers;