import { Dispatch, SetStateAction, useState } from "react";
import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import loginIcon from "../../images/user.svg";
import "./login.scss";
import uiImg from "../../images/ui.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../types/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/userSlice";

function Login({ setView }: { setView: Dispatch<SetStateAction<number>> }) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ip ,setIP] = useState('');

  var emptyString = "";

  const LogHistory = async (userId: number) => {
    const res = await axios.get('https://geolocation-db.com/json/').then((res) => {
      axios.post(`api/loginhistory/new?userId=${userId}&ip=${res.data.IPv4}`);
    })
  }

  function Login() {
    if (username === emptyString) {
      toast.error("Username Required");
    } else if (password === emptyString) {
      toast.error("Password Required");
    } else {
      axios
        .get(`api/user/login?username=${username}&password=${password}`)
        .then((res) => {
          LogHistory(res.data.id);
          dispatch(login(res.data.id));
          if(res.data.isAdministrator === true){
            navigate("/admin/dashboard");
          }else if(res.data.isLecturer === true){
            navigate('/lecturer/dashboard');
          }else if(res.data.isStudent === true){
            navigate('/student');
          }
        })
        .catch(() => toast.error("Incorreect Login Details"));
    }
  }

  return (
    <div id="login-container">
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3 left">
            <img className="icon-img" src={loginIcon} alt="loginIcon" />
            <h5>Login</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  type="email"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                onClick={() => Login()}
                style={{ width: "100%" }}
                variant="primary btn-block"
                className="btn-margin"
              >
                Login
              </Button>
              <Button
                onClick={() => setView(1)}
                style={{ width: "100%" }}
                variant="primary btn-block"
              >
                Back To Home
              </Button>
            </Form>
          </Col>

          <Col lg={8} md={6} sm={12}>
            <img className="w-100 right" src={uiImg} alt="Icon" />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Login;
