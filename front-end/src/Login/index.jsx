import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import { LoginStyle } from './style';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill, RiSpam2Fill } from "react-icons/ri";
import { RxPaperPlane } from "react-icons/rx";
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const defaultValid = {
        isValidemail : true,
        isValidPassword : true,
    }
    const [isValidInput, setIsValidInput] = useState(defaultValid)
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsValidInput(defaultValid);
        if(!email && !password){
            setIsValidInput({isValidemail: false, isValidPassword: false});
            toast.error("Please enter your username and password complete.");
            return;
        }
        if(!email){
            setIsValidInput({...defaultValid, isValidemail: false});
            toast.error("Please enter your username.");
            return;
        }
        if(!password){
            setIsValidInput({...defaultValid, isValidPassword: false});
            toast.error("Please enter your password.");
            return;
        }
        const dangerousCharacters = /['"<>`]/;
        if (dangerousCharacters.test(email) && dangerousCharacters.test(password)) {
            toast.error('Invalid input: Input contains dangerous characters');
        }else{
            setEmail(email.trim());
            setPassword(password.trim());
            const credentials = { email, password };
            await authApi.login(credentials).then((res)=>{
                if (res.status == 400) {
                    navigate('/login', { state: res.data });
                } else if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                }
            });
        }
    }

    return (
        <LoginStyle>
            <Container className="d-flex justify-content-center align-items-center">
                <Row
                    lg={10}
                    className="w-50 h-80 bg-dark-secondary rounded-3 box-shadow-primary border border-2 border-dark"
                >
                    <Col
                        sm={12}
                        md={12}
                        lg={6}
                        className="text-light d-flex flex-column justify-content-center align-items-center flex-grow-1 rounded-3 bc-primary"
                    >

                        <Row className="text-center justify-content-center ">
                            <p className="loginTitle">
                                <span>Login</span>
                                <br/><br/>
                                Sign in to your account
                            </p>
                        </Row>
                        <div>
                            <form onSubmit={handleSubmit}>
                               <div className={isValidInput.isValidemail ? "inputWithIcon" : "inputUnValid inputWithIcon"}>
                                  <FaRegUserCircle idName="iconUser" className={isValidInput.isValidemail ? 'inputIcon' : 'unValid'}/>
                                  <input placeholder='Username' type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <br/>

                                <div className={isValidInput.isValidPassword ? "inputWithIcon" : "inputUnValid inputWithIcon"}>
                                  <RiLockPasswordFill idName="iconPass" className={isValidInput.isValidPassword ? 'inputIcon' : 'unValid'}/>
                                  <input placeholder='Password' type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <br />
                                <div className="justify-content-center align-items-center text-center"> 
                                   <button className="loginSubmit" type="submit">
                                       <RxPaperPlane className="iconSubmit" />
                                   </button>
                                </div>
                               
                            </form>                          
                        </div>
                    </Col>
                </Row>
            </Container>
        </LoginStyle>
    );
};

export default Login;
