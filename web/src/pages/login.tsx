import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import './login.scss';
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthentificationModal } from "./modals/auth-modal";
import { EmailErrors, PasswordErrors, useValidation } from "../hooks/validation";
import { ErrorHelper } from "../components/error-helper";
import { useAuthService } from "../contexts/auth-context";
import { Header } from "../components/header";
import { useNavigate } from "react-router-dom";

export type RegInfo = {
    email: string,
    password: string,
    name: string
}

export function LoginPage() {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<RegInfo>();
    const { signInExpressions } = useValidation();
    const auth = useAuthService();
    const nav = useNavigate();

    const onSubmit: SubmitHandler<RegInfo> = async (data) => {
        const login = await auth.login(data);
        if (login === PasswordErrors.INVALID) {
            setError("password", { type: "validate" });
        }
        auth.login(data);
    }

    return <div>
        <Header />
        <div className='box-container'>
            <AuthentificationModal>
                <div className="content-box">
                    <span className="header">Welcome back!</span>
                    <p className="details">
                        Log in into account
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            error={!!errors.email}
                            variant="outlined"
                            id="outlined-error-helper-text"
                            label="Email"
                            {...register("email", { required: true, pattern: signInExpressions.emailExpression })}
                            inputProps={{ style: { fontSize: 17 } }}
                            style={{ marginTop: 23 }}
                        />
                        {errors.email && errors.email.type === "required" && <ErrorHelper helperText={EmailErrors.EMPTY} />}
                        {errors.email && errors.email.type === "pattern" && <ErrorHelper helperText={EmailErrors.INVALID} />}
                        <TextField
                            error={!!errors.password}
                            label='Password'
                            variant="outlined"
                            type={passwordVisibility ? "text" : "password"}
                            {...register("password", { required: true, minLength: 5 })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setPasswordVisibility(!passwordVisibility)}
                                        >
                                            {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{ style: { fontSize: 17, fontFamily: !passwordVisibility ? "initial" : "" } }}
                            style={{ marginTop: 22 }}
                        />
                        {errors.password && errors.password.type === "required" && <ErrorHelper helperText={PasswordErrors.EMPTY} />}
                        {errors.password && errors.password.type === "minLength" && <ErrorHelper helperText={PasswordErrors.FEW_CHARACTERS} />}
                        {errors.password && errors.password.type === "validate" && <ErrorHelper helperText={PasswordErrors.INVALID} />}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <a onClick={() => nav("/signup")} style={{ color: "#2196f3", cursor: "pointer" }} >Don't have an account?</a>
                        </div>
                        <Button type="submit" variant="contained" style={{ marginTop: 16 }}>LOG IN</Button>
                    </form>
                </div>
            </AuthentificationModal>
        </div>
    </div>
}
