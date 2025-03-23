import { ApiError } from "utils/api-errors";


export async function registerUser(userData: {
    email: string;
    confirmPassword: string;
    password: string;
    firstName: string;
    lastName: string;
}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-up`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            confirm_password: userData.confirmPassword,
            first_name: userData.firstName,
            last_name: userData.lastName,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(data.message || "Registration failed.", data?.errors ?? {});
    }

    return data;
}

export async function loginUser(email: string, password: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(data.message || 'Login failed', data?.errors ?? {});
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function logoutUser(accessToken: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-out`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`, // include token if required
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Logout failed');
        }

        return data;
    } catch (error: any) {
        throw new Error(error?.message || 'Something went wrong during logout.');
    }
}



