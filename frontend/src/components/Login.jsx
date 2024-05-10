import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthUser } from "../Slices/userSlice";
function Login() {

  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleForm = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(inputVal),
      })
      const data = await res.json();
      console.log(data)

      if(data.status >= 400) throw new Error(data.message);

      toast.success(`${data.message}`, {
        position: "top-right",
      })

      dispatch(setAuthUser(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      
      navigate("/")
      
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`, {
        position: "top-right",
      });
    }

    // setInputVal({
    //   username: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className=" w-[300px] h-fit sm:w-[450px]  border shadow-md rounded-lg p-5">
        <h1 className="text-2xl font-bold text-center p-4">Login</h1>
        <form
          action=""
          className=" mt-2 flex flex-col justify-center gap-3"
          onSubmit={handleForm}
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              name="username"
              required
              placeholder="Username"
              value={inputVal.username}
              onChange={(e) =>
                setInputVal({ ...inputVal, username: e.target.value })
              }
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              name="email"
              required
              value={inputVal.email}
              placeholder="Email"
              onChange={(e) =>
                setInputVal({ ...inputVal, email: e.target.value })
              }
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              required
              value={inputVal.password}
              onChange={(e) =>
                setInputVal({ ...inputVal, password: e.target.value })
              }
            />
          </label>

          <button type="submit" className="btn btn-info text-white text-xl">
            Submit
          </button>
        </form>
        <div className="p-2 text-lg text-center">
          Don't have an account ?{" "}
          <span
            className=" text-info underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
           signup
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
