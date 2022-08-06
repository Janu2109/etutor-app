import { Dispatch, SetStateAction, useState } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import loginIcon from "../../images/user.svg";
import "./sign.scss";
import uiImg from "../../images/register.svg";
import { toast, ToastContainer } from "react-toastify";
import validator from 'validator'
import axios from "../../types/axios";

function SignUp({setView}:{setView: Dispatch<SetStateAction<number>>}) {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [idnumber, setIdnumber] = useState<any>(0);
  const [city, setCity] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorCode, setErrorCode] = useState<number>(0);

  function SignUp(){
    setErrorCode(0);
    var error = 0;
    var emptyString = "";
    if (email !== '' && validator.isEmail(email)) {
      setErrorCode(0)
    } else {
     toast.error('Invalid Email');
     setErrorCode(2);
     error = 2;
    }
    if(error !== 2 && username === emptyString || password === emptyString || firstname === emptyString || lastname === emptyString || idnumber === 0 || city === emptyString || email === emptyString){
        toast.error("All fields are required");
        setErrorCode(2);
        error = 2;
    }
    else if(idnumber.length < 13|| idnumber.length > 13){
      toast.error("Id number length not correct");
      setErrorCode(2);
      error = 2;
    }
    else if(idnumber.length > 12 && idnumber.length < 14){
      if (validator.isStrongPassword(password, {
        minLength: 0, minLowercase: 0,
        minUppercase: 1, minNumbers: 1, minSymbols: 0
      })) 
      {
        setErrorCode(0);
      } else {
        setErrorCode(2);
        error = 2;
        toast.error('Password requires uppercase and numbers')
      }
    }
    if(error !== 2){
      axios.post(`api/user/register?userName=${username}&password=${password}&firstName=${firstname}&lastName=${lastname}&idNo=${idnumber}&city=${city}&email=${email}`)
      .then(() => {
        toast.success('User Registered');
      })
      .catch(() => {
        toast.error('Error Adding User');
      })
    }
  }

  return (
    <div id="signup-container">
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3 left">
              <img className="icon-img" src={loginIcon} alt='loginIcon'/>
              <h5>Sign Up</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="UserName" onChange={(e) => setUsername(e.currentTarget.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="First Name" onChange={(e) => setFirstname(e.currentTarget.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="Last Name" onChange={(e) => setLastname(e.currentTarget.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="ID Number" onChange={(e) => setIdnumber(e.target.value as any)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="City Of Residence" onChange={(e) => setCity(e.currentTarget.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="email" placeholder="Email Address" onChange={(e) => setEmail(e.currentTarget.value)}/>
              </Form.Group>
              <Button style={{width:"100%"}} variant="primary btn-block" className="btn-margin" onClick={() => SignUp()}>
                Register
              </Button>
              <Button onClick={() => setView(1)} style={{width:"100%"}} variant="primary btn-block">
                Back To Home
              </Button>
            </Form>
          </Col>
          
          <Col lg={8} md={6} sm={12}><img className="w-100 right" src={uiImg} alt="Icon"/></Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
