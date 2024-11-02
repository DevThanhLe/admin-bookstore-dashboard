import React, { useContext, useEffect, useState } from 'react';
import Logo from '../../assets/images/logo.png'
import { MyContext } from '../../App';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import { LoginApi } from "../../services/AuthService"
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    

    const context = useContext(MyContext)

    useEffect(() => {
        context.setIsHideSidebarAndHeader(true);
    },[context]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
          navigate("/Dashboard");
        }
      }, [navigate]);

    const handleLogin = async (e) => {
        
        e.preventDefault();
        
        if (!username || !password) {
            toast.warning("Email/Password is required !");
            return;
        }
        
        try 
        {
            let res = await LoginApi(username, password);
            // console.log(res); // Kiểm tra dữ liệu trả về
            // let jwt_decode = jwtDecode(res.data.token);
            const author = res.data.role;
            // console.log(author)
            
            if (author === "Admin") 
            {
                window.localStorage.setItem("token", res.data.token);
                navigate("/Dashboard");
                toast.success("Login success");
            } 
            else 
            {
                toast.warning("Account is not Admin");
            }
        } 
        catch (error) 
        {
            if (error.response && error.response.status === 401) {
                toast.error("Username/Password is wrong");
            } 
            else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };
        

    return(
        <div>
            <section className='loginSection'>
                <div className='loginBox'>
                    <div className='logo text-center'>
                        <img className='loginLogo' src={Logo} alt='bookStore-logo' width='60px'/>
                        <h5 className='mt-3 fw-bold text-white'>Login to BookStore's Dashboard</h5>
                    </div>

                    <div className='wrapper card border'>
                        <form>

                            <div className='form-group mb-4 position-relative'>
                                <span className='icon'><FaUser/></span>
                                <input type='text' className='form-control' placeholder='enter your username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>

                            <div className='form-group mb-4 position-relative'>
                                <span className='icon'><RiLockPasswordFill/></span>
                                <input type='password' className='form-control' placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <div className='form-group mb-3 position-relative'>
                                {/* <Link to={'/Dashboard'}> */}
                                    <Button className='btn-blue w-100 btn-big' onClick={handleLogin}>Sign In</Button>
                                {/* </Link> */}
                            </div>

                            <div className='form-group position-relative text-center'>
                                <Link to={'/Forgot-password'} className='link'>Forgot password ?</Link>
                            </div>

                        </form>

                        <ToastContainer/>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;