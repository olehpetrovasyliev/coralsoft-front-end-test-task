import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginFailure, loginStart, loginSuccess } from "../store/slices/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { FC, useEffect } from "react";

interface SignInFormData {
    email: string;
    password: string;
}

const SignInPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
 	const loginError = useAppSelector((state) => state.auth.error);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        mode: "onTouched",
        defaultValues: { email: "", password: "" },
    });

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        dispatch(loginStart());

       
            if (data.email === "test@test.test" && data.password === "password") {
                dispatch(
                    loginSuccess({
                        email: data.email,
                        name: data.email.split("@")[0],
                        id: crypto.randomUUID(),
                        role: "user",
                    })
                );
            } else {
				dispatch(loginFailure("User not found"));

            }
     
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
					{loginError && <p className="text-red-500 text-center mb-4">{loginError}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 flex justify-center items-center text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
				
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;