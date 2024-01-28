import { useState } from "react";
import "./signin.module.css";
export default function SignIn() {
    const [username, setUsername] = useState("")
    const [pass, setpass] = useState("")
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlepassChange = (event) => {
        setpass(event.target.value);
    };
    return (
        <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="" className="sign-in-form">
              <h2 className="title" style={{fontFamily: "Poppins"}}>LOGIN</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" onChange={handleUsernameChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" onChange={handlepassChange} />
              </div>
              <input type="button" value="Login" className="btn solid" onClick={async () => {
                const req = await fetch('http://localhost:3000/signin', {
                    body: JSON.stringify({
                        username: username,
                        password: pass
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: "post"
                    });
                if(req.status != 200) {
                    alert('an error occured')
                    return
                }

                const json = await req.json()
                localStorage.setItem("token", json.token)
                window.location = "/"
              }} />
            </form>
  

          </div>
        </div>
      </div>
  
);

}