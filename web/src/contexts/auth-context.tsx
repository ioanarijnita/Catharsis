import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectAsync } from "../hooks/async-effect";
import { PasswordErrors } from "../hooks/validation";
import { User } from "../models/user";
import StoreDataService from "../services/user";

type AuthContext = ReturnType<typeof useAuth>
const AuthContext = createContext<AuthContext>(null!);

export function useAuthService() {
    return useContext(AuthContext);
}

function useAuth() {
    const [loginInfo, setLoginInfo] = useState<User>();
    const nav = useNavigate();
    const signup = async (user: User) => {
        try {
            const users = await getUsers();
            const newUser = {...user, id: users.length}
            StoreDataService.create(newUser).then((res) => console.log("s:", res.data));
            nav("/login");
        } catch (e) {
            console.log(e)
        }
    }

    const login = async (user: User) => {
        try {
            const users = await getUsers();
            await StoreDataService.login({ ...user, userId: users.filter(dbUsers => dbUsers.email === user.email).map(u => u.id).pop() });
            setLoginInfo(user);
            localStorage.setItem("userPayload", JSON.stringify(user));
            if (user.email !== "admin@admin.com") {
                nav("/");
            } else {
                nav("/admin");
            }
            return PasswordErrors.SUCCESS;
        } catch (e) {
            console.log(e);
            return PasswordErrors.INVALID;
        }
    }

    const getUsers = async () => {
        const users = await StoreDataService.findAll();
        const data: User[] = users.data;
        return data;
    }

    const logout = () => {
        setLoginInfo(undefined);
        localStorage.removeItem("userPayload");
    }

    return useMemo(() => ({
        signup,
        login,
        getUsers,
        loginInfo,
        setLoginInfo,
        logout
    }), [loginInfo])
}

export function AuthContextProvider(props: { children: JSX.Element }) {
    const authService = useAuth();
    return <AuthContext.Provider value={authService}>
        {props.children}
    </AuthContext.Provider>
}
