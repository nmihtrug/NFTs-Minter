import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../assets/mattock.svg';
import { LoginStyle } from './style';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordFill, RiSpam2Fill } from "react-icons/ri";
import { RxPaperPlane } from "react-icons/rx";
import './Login.scss';

const Login = () => {

    return (
        <LoginStyle>
            <Container className="d-flex justify-content-center align-items-center">
                <Row
                    lg={10}
                    className="h-80 p-50 bg-dark-secondary rounded-3 box-shadow-primary border border-2 border-dark"
                >
                    
                    <Col
                        sm={12}
                        md={12}
                        lg={6}
                        className="text-light d-flex flex-column justify-content-center align-items-center flex-grow-1 rounded-3"
                    >
                        <Row className="logoLogin">
                            <img className="logo-img" src={logo} alt="logo" />
                        </Row>
                        
                        <Row className="text-center justify-content-center">
                            <p className="loginTitle">
                                <span className="fs-0">Welcome to NFTs Minter</span>
                            </p>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <p className="loginContent">Connect to your wallet</p>
                            <a className="loginSubmit" href='#' type="submit">
                                        <RxPaperPlane className="iconSubmit" />
                            </a>
                        </Row>
                        
                    </Col>
                </Row>
            </Container>
        </LoginStyle>
    );
};

export default Login;
