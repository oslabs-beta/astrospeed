import React, { useState } from "react";
//axious is library downloaded to use HTTP requests most common to the backend
import axios from "axios";
//CSS styles import from frontend folder
import styles from "./styles.module.css";

//Functional component
const Login = () => {
  const [data, setData] = useState({
    //useState is a REACT built-in method with two elements, one that is the value,
    //the other is a function to set that value. [data] is defined as useState values of empty strings;
    // firstName: "", NOT NEEDED FOR LOGIN
    // lastName: "", NOT NEEDED FOR LOGIN
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); //error, in this case, is an empty string

  const handleChange = ({ currentTarget: input }) => {
    //{currentTarget:input} is default in the input field. When input field gets changed, it will give you information of what was triggered, whats new value, etc.
    console.log("I am current target!!!:", input);
    setData({ ...data, [input.name]: input.value }); //updating data from the state. In this case, as user types in every keystroke, it will change data set in useState
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("I AM INSIDE SUBMIT")
    try {
      const url = "http://localhost:8000/api/auth";
      axios
        .post(url, data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // const { data: res } = await axios.post(url, data); //data is object. This post request will send all of our data from the state{first, last, etc} to the backend.
      // console.log("line 30 i am here");
      // localStorage.setItem("token", res.data);
      // localStorage.setItem("email", data.email);
      // console.log("I am LOCAL STORAGE.setitem", localStorage);
      // //window.location = "/";
      // console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <div className={styles.form_container}>
            <h1>Login to Your Account</h1>

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.green_btn}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <h1>New Here?</h1>
          <a href="/signup">
            <button type="button" className={styles.white_btn}>
              Sign-Up
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
