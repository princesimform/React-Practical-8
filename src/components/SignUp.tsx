import { ErrorMessage, Field, Formik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./../assets/HomeProfile.png";
import { validationSchemaSignup } from "./validationSchema";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import {
  signUpInitialValuesTypes,
  userDataType,
} from "./interface/interfaceList";
import { sha256 } from "crypto-hash";

import { useDispatch } from "react-redux";
import { userActions, userLoginActions } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { Rootstate } from "../redux/store";
const initialValues: signUpInitialValuesTypes = {
  profile: "",
  name: "",
  email: "",
  phone_no: "",
  password: "",
  confirm_password: "",
};

function SignUp() {
  const { loginUser } = useSelector((state: Rootstate) => state.userLoginSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Profileimage, setProfileImage] = useState<string>("");
  const [CustomErrorMessage, setCustomErrorMessage] = useState<string>("");
  const onImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", function (e) {
        setProfileImage(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(event.target.files[0]);
      setFieldValue("profile", event.target.files[0]);
    }
  };

  useEffect(() => {
    if (loginUser != null) {
      navigate("/welcome", { replace: true });
    }
  }, []);

  const handleSubmit = async (values: signUpInitialValuesTypes) => {
    const reqData: userDataType = { isLogin: true, ...values };
    reqData.profile = Profileimage;
    const hasPassword = await sha256(reqData.password);
    reqData.password = hasPassword;

    try {
      dispatch(userActions.signUpUser(reqData));
      dispatch(
        userLoginActions.loginUser({
          email: reqData.email,
          password: reqData.password,
        })
      );
      navigate("/welcome");
    } catch (error: unknown) {
      if (error instanceof Error) setCustomErrorMessage(error.message);
      setTimeout(() => {
        setCustomErrorMessage("");
      }, 2000);
    }
  };

  const handleReset = (handleReset: Function) => {
    handleReset();
    setProfileImage("");
  };

  return (
    <div className='bg-faebd8'>
      <div className='align-items-center justify-content-center container auth-container  pt-5 pt-sm-5 pt-md-0'>
        <div className='shadow p-3 mb-5 bg-white rounded'>
          <div className='row'>
            <div className='col-md-5 m-auto'>
              <div className='sign-up-container'>
                <h1 className=''>SignUp</h1>
                <div className='text-center'>
                  {Profileimage && (
                    <img
                      height='40'
                      width='40'
                      alt='preview image'
                      src={JSON.parse(Profileimage)}
                    />
                  )}
                </div>
                <div>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchemaSignup}
                  >
                    {({
                      values,
                      handleSubmit,
                      setFieldValue,
                      resetForm,
                      errors,
                    }) => (
                      <form
                        action=''
                        method='post '
                        className='mt-3'
                        onSubmit={handleSubmit}
                      >
                        <div className='form-group text-center '>
                          <Field
                            type='file'
                            className=''
                            id='userProfileInput'
                            name='profile'
                            value={undefined}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              onImageChange(event, setFieldValue)
                            }
                          />
                          <ErrorMessage
                            name='profile'
                            component='p'
                            className='text-danger'
                          />
                          <label
                            className='cursor-pointer'
                            htmlFor='userProfileInput'
                          >
                            Photo +
                          </label>
                        </div>
                        <InputField
                          type='text'
                          name='name'
                          label='Name'
                          hasValidate={true}
                          hasError={errors.name}
                        />

                        <InputField
                          type='email'
                          name='email'
                          label='Email address'
                          hasValidate={true}
                          hasError={errors.email}
                        />
                        {CustomErrorMessage != "" ? (
                          <p className='text-danger'>{CustomErrorMessage}</p>
                        ) : (
                          <></>
                        )}

                        <InputField
                          type='number'
                          name='phone_no'
                          label='Phone No.'
                          hasValidate={true}
                          hasError={errors.phone_no}
                        />

                        <InputField
                          type='password'
                          name='password'
                          label='Password'
                          hasValidate={true}
                          hasError={errors.password}
                        />

                        <InputField
                          type='password'
                          name='confirm_password'
                          label='Confirm Password'
                          hasValidate={true}
                          hasError={errors.confirm_password}
                        />

                        <button type='submit' className='btn btn-primary my-4 '>
                          Submit
                        </button>
                        <button
                          type='reset'
                          value='Reset'
                          className='btn btn-danger my-4 mx-4 '
                          onClick={() => handleReset(resetForm)}
                          disabled={values == initialValues ? true : false}
                        >
                          Reset
                        </button>
                      </form>
                    )}
                  </Formik>
                  <p>
                    Already Register <Link to='/login'>login</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-7 m-auto'>
              <img className='user-profile-img' src={UserProfile} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
