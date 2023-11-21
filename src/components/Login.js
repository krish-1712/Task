import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from "formik";
import './Login.css';


const userSchemaValidation = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(8)
  })

const Login = () => {


      
  let navigate=useNavigate()


  const {handleSubmit,handleChange, errors,touched, values}=useFormik({
    initialValues :{
        email:"",
        password:"",
    },
    validationSchema : userSchemaValidation,
    onSubmit:async(values)=>{
      try {
        let res = await axios.post(`https://www.melivecode.com/api/login`, values);
        console.log(res); 
        toast.success(res.data.message);
        sessionStorage.setItem('token', res.data.token);
        console.log(res.data.token)
        sessionStorage.setItem('userId', res.data.userId);
        console.log('userId', res.data.userId)

        navigate('/delete');
      } catch (error) {
        toast.error(error.response.data.message);
      }

    }
  })

  return (
    <div className='login-wrapper'> 
    <h1 style={{"textAlign":"center","marginTop":"30px"}}>Login Here!</h1>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3">
  <Form.Label className='hat' style={{marginRight:"210px", marginTop:"10px"}}>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email address" className="email"  name="email"  value={values.email}
           onChange={handleChange}/>
  {touched.email && errors.email ? <p style={{color:"crimson"}}>{errors.email}</p>:""}
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label className='hat1' style={{marginRight:"235px"}}>Password</Form.Label>
  <Form.Control type="password" placeholder="Enter the Password" className="password"  name="password"  value={values.password}
           onChange={handleChange}/>
  {touched.password && errors.password ? <p style={{color:"crimson"}}>{errors.password}</p>:""}
</Form.Group>
<br></br>
<Button variant="primary" type='submit' className='sub'  style={{marginRight:"235px"}}>
  Submit
</Button> <br></br>
</Form>

</div>

  );
};

export default Login;



