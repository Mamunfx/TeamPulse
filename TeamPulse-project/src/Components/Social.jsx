import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {handleGoogleSignIn}=useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignup = () =>{
        handleGoogleSignIn()
        .then(result =>{
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                photoUrl: result.user?.photoURL,
                role:"employee",
                bank_account_no: '1234',
                salary: '124444',
                designation: 'Sales-man',
            }
            console.log(userInfo);
            // axiosPublic.post('/users', userInfo)
            // .then(res =>{
            //     console.log(res.data);
            //     navigate('/');
            // })
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