import React, { useState } from "react";
//Link is used to take user to new page- can be an attribute tag, etc.
//import { useNavigate } from "react-router-dom";
//axious is library downloaded to use HTTP requests most common to the backend
import axios from "axios";
//CSS styles import from frontend folder
import styles from "./styles.module.css";

//Functional component
const Signup = () => {
  const [data, setData] = useState({
    //useState is a REACT built-in method with two elements, one that is the value, the other is a function to set that value. [data] is defined as useState values of empty strings;
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); //error, in this case, is an empty string
  //const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    //{currentTarget:input} is default in the input field. When input field gets changed, it will give you information of what was triggered, whats new value, etc.
    console.log("I am current target!!!:", input);
    setData({ ...data, [input.name]: input.value }); //updating data from the state. In this case, as user types in every keystroke, it will change data set in useState
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/users";
      const { data: res } = await axios.post(url, data); //data is object. This post request will send all of our data from the state{first, last, etc} to the backend.
      history.push("/login");
      console.log(res.message);
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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back!</h1>
          <a href="/login">
            <button type="button" className={styles.white_btn}>
              Sign-In
            </button>
          </a>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input //html input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange} //onChange gets triggered when user interacts with input, in this case the text placeholder
              value={data.firstName} //every keystroke saves to value which we can use in input from handleChange function definition.
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
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
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
