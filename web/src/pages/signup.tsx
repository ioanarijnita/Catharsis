import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import './signup.scss';
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailErrors, useValidation } from "../hooks/validation";
import { AuthentificationModal } from "./modals/auth-modal";
import { ErrorHelper } from "../components/error-helper";
import { RegInfo } from "./login";
import { useAuthService } from "../contexts/auth-context";
import { Header } from "../components/header";

export function SignUpPage() {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [isPasswordValidationError, setIsPasswordValidationError] = useState<boolean>();
    const { passwordRequirements, requirementsValidation, createPasswordValidation, signInExpressions } = useValidation();
    const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm<RegInfo>();
    const auth = useAuthService();

    const onSubmit: SubmitHandler<RegInfo> = async (regInfo) => {
        if (!!requirementsValidation.length) return;
        auth.signup(regInfo);
    }

    useEffect(() => {
        const password = getValues("password");
        createPasswordValidation(password);
        if (isPasswordValidationError !== undefined) {
            setIsPasswordValidationError(!!requirementsValidation.length);
        }
    }, [watch("password")])

    return <div>
        <Header />
        <div className='container'>
            <AuthentificationModal>
                <div className="contentBox">
                    <span className="title">Sign up to have more functionalities</span>
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
                            label='Create Password'
                            variant="outlined"
                            id="password"
                            type={passwordVisibility ? "text" : "password"}
                            {...register("password", {
                                required: true,
                            })}
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
                        {isPasswordValidationError && <ErrorHelper helperText="Password must be:" />}
                        <p className={isPasswordValidationError ? "password" : "error-password"}>
                            {!isPasswordValidationError ? "Password must be:" : ""}
                            {passwordRequirements?.map(item => <li
                                key={item}
                                className={requirementsValidation?.includes(item) && !isPasswordValidationError ? "main-li" :
                                    requirementsValidation.includes(item) && isPasswordValidationError ? "error-li" : "gray-li"
                                }
                            >{item}</li>
                            )}
                        </p>
                        <br />
                        <Button type="submit" variant="contained" onClick={() => setIsPasswordValidationError(!!requirementsValidation.length)}>SIGN UP</Button>
                    </form>
                </div>
            </AuthentificationModal>
        </div >
    </div >
}
