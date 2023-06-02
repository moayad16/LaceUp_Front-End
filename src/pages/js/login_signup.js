import { useState } from 'react';
import "../css/login_signup.css"
import Login from '../../components/js/loginForm';
import Signup from '../../components/js/signup';
import "animate.css";

function Login_sign(){

    const [funcPos, setFuncPos] = useState({
        funciton: 'login',
        pos: {
            left: '0px',
        }
    });

    function funcSelector() {
        console.log("switched");

        if(funcPos.funciton === 'login'){
            setFuncPos({
              funciton: "signup",
              pos: {
                left: "50%",
              }
            });
        }else{
            setFuncPos({
              funciton: "login",
              pos: {
                left: 0,
              }
            });
        }

    }


    return (
      <div className="form_cont ">
        <h1 className="logo animate__animated animate__fadeInDown">LaceUp</h1>
        <div className="form_box animate__animated animate__fadeInUp">
          <div className="cover_pic">
            <img
              style={{
                left: funcPos.pos.left,
              }}
              src={require("../../images/fotor_2023-3-27_23_8_27.png")}
              alt="cover_logo"
            />
          </div>
          <div className="right_col">
            <Login selector={funcSelector} />
          </div>
          <div className="left_col">
            <Signup selector={funcSelector} />
          </div>
        </div>
      </div>
    );
}


export default Login_sign;