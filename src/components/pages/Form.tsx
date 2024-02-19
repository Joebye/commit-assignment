import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import User from "../../model/User";
import { userService } from "../../config/service-config";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";
import { useSelectorUser } from "../../redux/store";

   
const Form: React.FC = () => {
   
    const regexPassword = /^(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{6,12}$/;
   
    const [user, setUser] = useState<User|undefined>();

    const [isErrorConfPass, setIsErrConfPass] = useState(true);
    
    const dispatch = useDispatch();
    const usRed = useSelectorUser();
    console.log('userRedux:', usRed);
    
   
         async function onSubmitFn (event: any) {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const inputedName: string = data.get("username") as string;
            const inputedPhoneNum: string = data.get("phonenumber") as string
            const inputedPass: string = data.get('password') as string;
            const confPass: string = data.get('confPassword') as string;

           
            if (regexPassword.test(inputedPass) && inputedPass == confPass) {

                let newUser: User = {
                    username: inputedName,
                    phonenumber: inputedPhoneNum,
                    password: confPass
                }

                setUser(newUser);
                setIsErrConfPass(false);
                await userService.addUser(newUser);
                dispatch(userActions.set(newUser));
                event.target.reset();
               
            } else {
                setIsErrConfPass(true);
            }

      }

        function onResetFn() {
            setUser(user);
        }

        
    return (
        
    <Box component='form'
     onSubmit={onSubmitFn}
     onReset={onResetFn} 
    sx={{
      
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "20vw",
      gap: "15px",
      mt: '1vh',
      ml: '1vw'
    }}
  >
    <TextField
    name="username"
      size="small"
      type="text"
      required
      fullWidth
      label="User Name"
      inputProps={{maxLength: 32}}
   
    />
    <TextField
    name="phonenumber"
      type="number"  
      size="small"
      required
      fullWidth
      label="Phone Number"
      onInput={(e: any)=> {e.target.value= Math.max(0, parseInt(e.target.value)).toString().slice(0,10)}}
     helperText= {"Enter your phone number upto to 10 numbers"}
      />

    <TextField
    name="password"
      size="small"
      type="text"
      required
      fullWidth
      label="Password"
      helperText={
       "Enter your password including 6-12 chars (at least one capital case letter and special char)"}
      />

      <TextField
    name="confPassword"
      size="small"
      type="password"
      required
      fullWidth
      label="Confirm Password"
      helperText={isErrorConfPass ? "" : "Password confirmed"}
      />  

    
    <Button
    type="submit"
    size="medium"
      variant="contained"
      color="primary"
    
    >
      Submit
    </Button>
    </Box>
    
    )
      }
    



export default Form;