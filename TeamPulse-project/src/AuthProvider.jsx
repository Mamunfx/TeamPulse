import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from "react";
import LoadingState from './Components/LoadingState';
import { auth } from './firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const notify = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user); 
        notify("Signed up and logged in!");
      })
      .catch(error => notifyError(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch(error => notifyError(error.message))
      .finally(() => {
        setLoading(false);
        notify("Logged in!");
      });
  };

  const logOut = () => {
    if (!user) {
      return;
    }
    setLoading(true);
    return signOut(auth)
      .catch(error => notifyError(error.message))
      .finally(() => {
        setLoading(false);
        notify('Logged out');
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then(result => {
        setUser(result.user);
        notify("Google login successful");
        return result.user;
      })
      .catch(error => {
        notifyError('Google sign-in failed');
        setUser(null);
        throw error; 
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile)
      .then(() => notify('Profile updated!'))
      .catch(error => notifyError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);

      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    handleGoogleSignIn,
    notify,
    notifyError,
    updateUserProfile
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
