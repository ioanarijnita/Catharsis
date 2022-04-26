import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function updateOnChangeText<S>([state, setState]: [S, Dispatch<SetStateAction<S>>], key: keyof S, withValidation?: (value: string) => void) {
    return {
        value: state[key],
        onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
            setState({ ...state, [key]: event.target.value });
            if (withValidation) {
                withValidation(event.target.value);
            }
        }
    };
}
