import React, { useContext, useEffect } from 'react';
import Logo from '../../assets/images/logo.png'
import { MyContext } from '../../App';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Login = () => {

    const context = useContext(MyContext)

    useEffect(() => {
        context.setIsHideSidebarAndHeader(true);
    },[context]);


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
                                <input type='text' className='form-control' placeholder='enter your username'/>
                            </div>

                            <div className='form-group mb-4 position-relative'>
                                <span className='icon'><RiLockPasswordFill/></span>
                                <input type='password' className='form-control' placeholder='enter your password'/>
                            </div>

                            <div className='form-group mb-3 position-relative'>
                                <Link to={'/Dashboard'}>
                                    <Button className='btn-blue w-100 btn-big'>Sign In</Button>
                                </Link>
                            </div>

                            <div className='form-group position-relative text-center'>
                                <Link to={'/Forgot-password'} className='link'>Forgot password ?</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;