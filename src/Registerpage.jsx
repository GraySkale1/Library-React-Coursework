import React from "react";
import { useForm } from "react-hook-form";
import "./Registerpage.css";

function Register() {
    const { // form variables to define
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
        const existingUser = localStorage.getItem(data.username);
        if (existingUser) {
            alert("Username is already registered!");
        } else {
            const userData = {
                username: data.username,
                password: data.password,
                privilege : 1
            };
            localStorage.setItem(data.username, JSON.stringify(userData));
            alert(data.username + " has been successfully registered");
        }
    };

    return (
        <>
            <h2>Student Signup</h2>

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

                <input type="submit" onClick={onSubmit} style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
}

export default Register;