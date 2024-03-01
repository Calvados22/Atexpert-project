import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            console.log("Logged In");
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            history.push("/");
            swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "Username or passowrd does not exists",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        });

        if (response.status === 201) {
            history.push("/login");
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const updateUserProfile = async (updatedData) => {
        try {
            const response = await fetch("http://localhost:8000/api/update-profile/", {
                method: "PUT", // or 'POST' depending on your backend API
                headers: {
                    "Authorization": `Bearer ${authTokens.access}`, // Include authorization token
                    // Add other headers if required
                    "Accept": "application/json"
                },
                body: updatedData, // FormData object containing updated profile data
            });
            const data = await response.json();
            if (response.ok) {
                // Update user state or perform any necessary actions upon successful update
                console.log("Profile updated successfully:", data);
                // Example: Update user state if response includes updated user data
                setUser(data.user);
                // Show success message to the user
                swal.fire({
                    title: "Profile Updated Successfully",
                    icon: "success",
                });
            } else {
                // Handle error response
                console.error("Failed to update profile:", data);
                // Show error message to the user
                swal.fire({
                    title: "Failed to Update Profile",
                    text: data.message || "An error occurred while updating your profile.",
                    icon: "error",
                });
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error("Error updating profile:", error);
            // Show error message to the user
            swal.fire({
                title: "Error",
                text: "An error occurred while updating your profile. Please try again later.",
                icon: "error",
            });
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/login");
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
