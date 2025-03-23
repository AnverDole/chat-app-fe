"use client"

import Link from "next/link";
import toast from "react-hot-toast";
import FormSingleLayout from "components/layouts/form-single-layout";
import LdsRollerLoader from "components/loaders/lds-roller/lds-roller";
import { useState } from "react";
import { loginUser } from "services/authService";
import { useAuth } from "context/auth-context";
import { useRouter } from "next/navigation";
import { GuestRoute } from "route-guards/guest-route";
import { ApiError } from "utils/api-errors";
import User from "interfaces/user";

interface FormErrors {
    email?: string,
    password?: string,
}

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    const router = useRouter();
    const auth = useAuth(); 

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading)
            return;

        setIsLoading(true);

        try {
            const response = await loginUser(email, password);

            const user: User = {
                id: response.id,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                profile_picture: response?.profile_picture,
            }
            auth.login(user, response.access_token);


            router.push('/'); // redirect to dashboard

            toast.success("Logged in successfully!");
            console.log('Login success:', user);

        } catch (err: any) {
            if (err instanceof ApiError) {
                setErrors(err?.errors)
            }
            toast.error(err.message || "Login failed.");
            console.error('Login error:', err.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <GuestRoute>
            <div className="p-4">

                <FormSingleLayout>
                    <div className="mb-2">
                        <h1 className="mt-2 fw-bold">Sign In</h1>
                        <p className="mt-2 text-muted">Welcome back! Please login to continue.</p>
                    </div>

                    <form onSubmit={login} className="position-relative w-100" style={{ maxWidth: "400px" }}>
                        {isLoading && <div className="position-absolute d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 5, left: 0, right: 0, top: 0, bottom: 0 }}>
                            <LdsRollerLoader />
                        </div>}

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="email">Email address</label>
                            {errors?.email && <div className="invalid-feedback">{errors?.email}</div>}
                        </div>

                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            {errors?.password && <div className="invalid-feedback">{errors?.password}</div>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 py-2" >Login</button>
                        <Link href={"/auth/sign-up"} className="btn btn-light w-100 py-2 mt-2">Create an account?</Link>

                    </form>

                </FormSingleLayout>
            </div>
        </GuestRoute>
    );
}