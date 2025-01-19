import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import  axios  from 'axios';


const SocialLogin = () => {
    const {handleGoogleSignIn}=useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignup = () =>{
        handleGoogleSignIn().then(result =>{
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                photoUrl: result.user?.photoURL,
                role:"employee",
                bank_account_no: '1234',
                salary: '124444',
                designation: 'Sales-man',
            }
            axios.post(`${import.meta.env.VITE_API_URL}/users/${userInfo.email}`, userInfo).then(res => {
                navigate('/');
            }).catch(error => {
                console.error("There was an error posting the data:", error);
            });
        })
    }

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