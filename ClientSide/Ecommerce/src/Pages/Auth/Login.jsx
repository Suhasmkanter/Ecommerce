'use client'
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoginFormControls } from '../../components/config/index'
import { useDispatch, useSelector } from "react-redux";
import { LoginUsers } from "@/ReduxToolkit/Auth-slice/Index";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
function Login() {
  const { toast } = useToast()
  const LoginState = useSelector(state => state.Auth)



  const navigate = useNavigate()



  const dispatch = useDispatch()

  const initialstate = {
    password: '',
    email: '',

  }
  const [formdata, setformdata] = useState(initialstate)
  function HandleSubmitEvent(e) {
    dispatch(LoginUsers(formdata))?.then((result) => {
      if (result) {
        toast({ title: result.payload.message })
        navigate('/shop')


      } else {
        navigate('/Register')
        toast({

          title: result.payload.message,
          variant: "destructive"
        })
      }


      (result);

    }).catch((err) => {
      (err);

    });
  }
  return <div className="w-full h-full border-2 flex flex-col p-4 justify-center items-center border-black ">
    <h1 className="text-5xl font-bold mb-2 "> Sign in to Your Login </h1>
    <h5>If you are a  New User  <Link to={'/Register'} className="underline">Regiser Please</Link> </h5>
    <Form formdata={formdata} Buttontext={'Sign In'} Submitevent={HandleSubmitEvent} FormControlsinputrender={LoginFormControls} setformdata={setformdata}></Form>

  </div>;
}

export default Login;
