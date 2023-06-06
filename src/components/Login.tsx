import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./../assets/HomeProfile.png";
import InputField from "./InputField";
import { Formik, Field, ErrorMessage } from "formik";
import { validationSchemaLogin } from "./validationSchema";
import { loginInitialValuesTypes } from "./interface/interfaceList";
import { useDispatch, useSelector } from "react-redux";
import { userLoginActions, userLoginSlice } from "../redux/userSlice";
import { useNavigate, redirect } from "react-router-dom";
import { sha256 } from "crypto-hash";
import { Rootstate } from "../redux/store";
const initialValues: loginInitialValuesTypes = {
  email: "",
  password: "",
};

function Login() {
  const { loginUser } = useSelector((state: Rootstate) => state.userLoginSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [CustomErrorMessage, setCustomErrorMessage] = useState<string>("");
  useEffect(() => {
    if (loginUser != null) {
      navigate("/welcome", { replace: true });
    }
  }, []);

  const handleSubmit = async (values: loginInitialValuesTypes) => {
    const hasPassword = await sha256(values.password);
    const reqData: loginInitialValuesTypes = {
      email: values.email,
      password: hasPassword,
    };

    try {
      dispatch(userLoginActions.loginUser(reqData));
      navigate("/welcome");
    } catch (error: unknown) {
      if (error instanceof Error) setCustomErrorMessage(error.message);
      setTimeout(() => {
        setCustomErrorMessage("");
      }, 2000);
    }

    dispatch(userLoginActions.loginUser(values));
  };

  return (
    <>
      <div className='bg-faebd8'>
        <div className='align-items-center justify-content-center container auth-container  pt-5 pt-sm-5 pt-md-0  '>
          <div className='shadow p-3 mb-5 bg-white rounded'>
            <div className='row'>
              <div className='col-md-5 m-auto'>
                <div className='login-container'>
                  <h1 className=''>Login</h1>
                  <div>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                      validationSchema={validationSchemaLogin}
                    >
                      {({ values, handleSubmit }) => (
                        <form
                          action=''
                          method='post '
                          className='mt-3'
                          onSubmit={handleSubmit}
                        >
                          <InputField
                            type='email'
                            name='email'
                            label='Email address'
                            hasValidate={true}
                          />

                          <InputField
                            type='password'
                            name='password'
                            label='Password'
                            hasValidate={true}
                          />

                          {CustomErrorMessage != "" ? (
                            <p className='text-danger'>{CustomErrorMessage}</p>
                          ) : (
                            <></>
                          )}

                          <button
                            type='submit'
                            className='btn btn-primary my-4 '
                          >
                            Submit
                          </button>
                        </form>
                      )}
                    </Formik>
                    <p>
                      Don't Have Account ? <Link to='/sign-up'>Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-7 m-auto'>
                <img
                  className='login-user-profile-img'
                  src={UserProfile}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
