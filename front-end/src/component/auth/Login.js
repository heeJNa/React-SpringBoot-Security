import React,{useState} from "react";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import './login.css'
import axios from "axios";
import {onLogin} from "./LoginLogic";

const Login = () => {

    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");

    const emailHandler = (e) => {
        e.preventDefault();
        SetEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        e.preventDefault();
        SetPassword(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        {onLogin(Email,Password)}
    }

    return (
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={emailHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={passwordHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button type="submit" className={"login-btn"}>Login</Button>
            </Form>
    )
}

export default Login