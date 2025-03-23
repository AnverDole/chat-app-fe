"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import FormSingleLayout from "components/layouts/form-single-layout";
import LdsRollerLoader from "components/loaders/lds-roller/lds-roller";
import { useState } from "react";
import { registerUser } from "services/authService";
import { ApiError } from "utils/api-errors";
import { useRouter } from "next/navigation";
import { useAuth } from "context/auth-context";
import User from "interfaces/user";
import { GuestRoute } from "route-guards/guest-route";

interface FormErrors {
    email?: string,
    password?: string,
    confirm_password?: string,
    first_name?: string,
    last_name?: string,
}

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    const router = useRouter();
    const auth = useAuth();


    const register = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLoading) return;

        setErrors({});
        setIsLoading(true);

        try {
            const response = await registerUser({
                email,
                password,
                confirmPassword,
                firstName,
                lastName
            });

            console.log(response);

            toast.success("Account created successfully!");
            console.log("Register success:", response);

            const user: User = {
                id: response.id,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                profile_picture: response?.profile_picture,
            }
            auth.login(user, response.access_token);


            router.push('/'); // redirect to dashboard

        } catch (err: any) {
            if (err instanceof ApiError) {
                setErrors(err.errors)
                console.log(err.errors);
            }
            console.error("Register error:", err.message);
            toast.error(err.message || "Registration failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GuestRoute>
            <div className="p-4">
                <FormSingleLayout>
                    <div className="mb-2">
                        <h1 className="mt-2 fw-bold">Sign Up</h1>
                        <p className="mt-2 text-muted">Create an account to start chatting.</p>
                    </div>

                    <form onSubmit={register} className="position-relative w-100" style={{ maxWidth: "400px" }}>
                        {isLoading && (
                            <div className="position-absolute d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 5, left: 0, right: 0, top: 0, bottom: 0 }}>
                                <LdsRollerLoader />
                            </div>
                        )}

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${errors?.first_name ? 'is-invalid' : ''}`}
                                id="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="firstName">First Name</label>
                            {errors?.first_name && <div className="invalid-feedback">{errors?.first_name}</div>}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${errors?.last_name ? 'is-invalid' : ''}`}
                                id="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            {errors?.last_name && <div className="invalid-feedback">{errors?.last_name}</div>}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email address</label>
                            {errors?.email && <div className="invalid-feedback">{errors?.email}</div>}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                            {errors?.password && <div className="invalid-feedback">{errors?.password}</div>}
                        </div>

                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className={`form-control ${errors?.confirm_password ? 'is-invalid' : ''}`}
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            {errors?.confirm_password && <div className="invalid-feedback">{errors?.confirm_password}</div>}
                        </div>

                        <button type="submit" className="btn btn-success w-100 py-2">Create Account</button>
                        <Link href="/auth/sign-in" className="btn btn-light w-100 py-2 mt-2">I already have an account</Link>
                    </form>
                </FormSingleLayout>
            </div>
        </GuestRoute>
    );
}
