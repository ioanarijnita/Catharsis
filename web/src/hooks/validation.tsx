import { useState } from "react";

export enum EmailErrors {
    SUCCESS = "",
    EMPTY = "Email address is required.",
    INVALID = "Enter a valid email address."
}

export enum PasswordErrors {
    SUCCESS = "",
    EMPTY = "Password cannot be empty.",
    FEW_CHARACTERS = "Password must be 5 characters or longer.",
    INVALID = "The email address or password do not match. Please try again."
}

export function useValidation() {
    const passwordRequirements = ["At least 5 characters", "One lowercase letter", "One uppercase letter", "One number", "One special character (~#!”£$%^&^*()-_+=)"];
    const [requirementsValidation, setRequirementsValidation] = useState(passwordRequirements);

    const lowerCaseExpresion = /(.*[a-z].*)/;
    const upperCaseExpresion = /(.*[A-Z].*)/;
    const isDigitExpression = /[0-9]/;
    const specialCharExpression = /[~!@#£$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const emailExpression: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const signInExpressions = {
        emailExpression: emailExpression,
        lowerCaseExpresion: lowerCaseExpresion,
        upperCaseExpresion: upperCaseExpresion,
        isDigitExpression: isDigitExpression,
        specialCharExpression: specialCharExpression
    }

    const createPasswordValidation = (password: string) => {
        const conditions = [password.length >= 5, lowerCaseExpresion.test(password), upperCaseExpresion.test(password), isDigitExpression.test(password), specialCharExpression.test(password)];
        passwordRequirements.forEach((item, index) => {
            if (conditions[index]) {
                if (requirementsValidation.includes(item)) {
                    requirementsValidation.splice(requirementsValidation.indexOf(item), 1);
                }
            } else {
                if (!requirementsValidation.includes(item)) {
                    requirementsValidation.push(item);
                }
            }
        })
        setRequirementsValidation([...requirementsValidation]);
    }

    return {
        passwordRequirements,
        requirementsValidation,
        createPasswordValidation,
        signInExpressions
    }
}
