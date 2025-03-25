import Form from "@/components/common/Form";
import { RegisterFormControls } from "@/components/config";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoginUsers, RegisterOfUser } from "@/ReduxToolkit/Auth-slice/Index";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialstate = {
    username: '',
    password: '',
    email: '',
  }
  const [formdata, setformdata] = useState(initialstate)
  function HandleSubmitEvent(e) {
    dispatch(RegisterOfUser(formdata)).then((result) => {

      if (result.payload.success) {
        toast({ title: result.payload.message });
        navigate('/')
      }
      else {
        toast({ title: result.payload.message })
      }
    }).catch((err) => {

    });
  }
  return <div className="w-full h-full border-2 flex flex-col justify-center items-center border-black ">
    <h1 className="text-5xl font-bold mb-2 ">Create New Account </h1>
    <h5>If you have Already a account <Link to={'/'}>Login</Link> </h5>
    <Form formdata={formdata} Submitevent={HandleSubmitEvent} Buttontext={'Sign Up'} FormControlsinputrender={RegisterFormControls} setformdata={setformdata}></Form>

  </div>;
}

export default Register;
