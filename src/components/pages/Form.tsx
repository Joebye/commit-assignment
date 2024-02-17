import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import User from "../../model/User";

    const initialUser: User = {
        userName: "",
        phoneNumber: "",
        password: ""
    }


const Form: React.FC = () => {
    const regexPhoneNum = /^[0-9]{0,10}$/;
   const regexPassword = /^(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{6,12}$/;
   
    const [user, setUser] = useState<User>(initialUser);

    const [isErrorConfPass, setIsErrConfPass] = useState(true);
    

    function handlerUserName(event: any) {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    function handlerPhoneNum (event:any) {
        const phoneNum: string = event.target.value;
        
        if (regexPhoneNum.test(phoneNum)) {
            const userCopy = {...user};
            userCopy.phoneNumber = phoneNum;
            setUser(userCopy);
         }
            
        }



         const onSubmitFn = (event: any) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const inputedPass: string = data.get('password') as string;
            const confPass: string = data.get('confPassword') as string;
            if (regexPassword.test(inputedPass) && inputedPass == confPass) {
                const userCopy = {... user};
                userCopy.password = confPass;
                setUser(userCopy);
                setIsErrConfPass(false);
                event.target.reset();
                console.log(userCopy);
            } else {
                setIsErrConfPass(true);
            }

        
            
        }

        function onResetFn() {
            setUser(initialUser);
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
    name="userName"
      size="small"
      type="text"
      required
      fullWidth
      label="User Name"
      inputProps={{maxLength: 32}}
      onChange={handlerUserName}
    />
    <TextField
    name="phoneNumber"
      type="number"  
      size="small"
      required
      fullWidth
      label="Phone Number"
      inputProps={{pattern: `${regexPhoneNum}`}}
      onChange= {handlerPhoneNum}
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
     // onChange={handlerConfirmPassword}
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