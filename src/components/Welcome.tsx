import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rootstate } from "../redux/store";
import Header from "./Header";
function Welcome() {
  const { loginUser } = useSelector((state: Rootstate) => state.userLoginSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser == null) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
      <Header />
      {loginUser != null ? (
        <>
          <div className='container mt-4  p-3 d-flex justify-content-center d-block'>
            <div className='bg-faebd8 card p-4 shadow p-3   rounded'>
              <div className=' image d-flex flex-column justify-content-center align-items-center'>
                <div className=' '>
                  <img
                    src={JSON.parse(loginUser!.profile)}
                    height='100'
                    width='100'
                    className='rounded-circle border border-warning border-2'
                  />
                </div>
                <span className='text-left mt-3'>
                  <p className='name  mt-3'>
                    <span> Name : </span> {loginUser!.name}
                  </p>
                  <p className='idd '>
                    <span> Email : </span> {loginUser!.email}
                  </p>
                  <p className='idd1'>
                    <span> Phone No : </span> {loginUser!.phone_no}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className=' container p-3 d-flex justify-content-center d-block'>
            <div className='bg-faebd8 card px-4 shadow p-3  rounded'>
              <span>
                Hello <span className='fw-bold'> {loginUser!.name} </span>, you
                are registered with the email id -
                <span className='fw-bold'> {loginUser!.email} </span> and phone
                number -{" "}
                <span className='fw-bold'> {loginUser!.phone_no} </span>
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Welcome;
