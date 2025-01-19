import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SocialLogin = () => {
    const { handleGoogleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignup = async () => {
        try {
            const result = await handleGoogleSignIn();
            console.log("Google Sign-In Result:", result);

            if (result.user) {
                console.log("User Info:", result.user);
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    role: "employee",
                    bank_account_no: '1234',
                    salary: '124444',
                    designation: 'Sales-man',
                };

                const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/${userInfo.email}`, userInfo);
                console.log("User successfully created:", res.data);
                navigate('/');
            } else {
                console.error("User object is not available.");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignup} className="btn">
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
