import { useState } from "react";
// import {Signupuser} from "../auth/authService";

function Signup(setAuth){
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
     const [confirmpassword , setconfirmPassword] = useState("");

    const handleSignup = async ()=>{
        if(!username || !password){
            alert("all Fields are required");
            return;
        }
        if(password!==confirmpassword){
            alert("Password don't match")
            return;
        }


        try {
            await Signupuser(username,password);
            setAuth(true);
        } catch (error) {
            alert("Signup Failed ");
        }
    };

   return(
        <div>

            <h2>Signup</h2>
            <input
            type="text"
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)  }
            />

            <br/><br/>
            
            <input
            type="password"
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
            <br/><br/>


            <input
            type="password"
            placeholder="confirm password"
            onChange={(e)=>setconfirmPassword(e.target.value)}
            />
            <br/><br/>


            <button onClick={handleSignup}>Signup</button>

        </div>
    
    );



}

export default Signup;