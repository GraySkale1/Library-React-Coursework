import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

function Login() {
    const { // Initalises form
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const userData = JSON.parse(localStorage.getItem(data.username)); // gets username and password from local storage
        if (userData) {
            if (userData.password === data.password) {
                alert(userData.username + " You Are Successfully Logged In");
            } else {
                alert("Username or Password is not matching with our record");
            }
        } else {
            alert("Username or Password is not matching with our record");
        }
    };

    return (
        <>
            <h2>Login Form</h2>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="username"
                    {...register("username", { required: true })}
                    placeholder="Username"
                />
                {errors.username && <span style={{ color: "red" }}>*Username* is mandatory</span>}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}

                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
}

export default Login;