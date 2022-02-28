import React, { Dispatch, SetStateAction } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import loginIcon from "../../images/user.svg";
import "./login.scss";
import uiImg from "../../images/ui.svg";

function Login({setView}:{setView: Dispatch<SetStateAction<number>>}) {
  return (
    <div id="login-container">
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3 left">
              <img className="icon-img" src={loginIcon} alt='loginIcon'/>
              <h5>Login</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button style={{width:"100%"}} variant="primary btn-block" className="btn-margin">
                Login
              </Button>
              <Button onClick={() => setView(1)} style={{width:"100%"}} variant="primary btn-block">
                Back To Home
              </Button>
            </Form>
          </Col>
          
          <Col lg={8} md={6} sm={12}><img className="w-100 right" src={uiImg} alt="Icon"/></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
