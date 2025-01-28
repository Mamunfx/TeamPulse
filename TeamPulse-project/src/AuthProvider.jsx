import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.init";
import { 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import axios from "axios";
import LoadingState from "./Components/LoadingState";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const notify = (message) =>
    toast.success(message, {
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

  const notifyError = (message) =>
    toast.error(message, {
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

  const createNewUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      notify("Signed up and logged in!");

      // Fetch user data after registration
      await fetchUserData(userCredential.user.email);

      // Create JWT Token
      await createJWTToken(userCredential.user.email);

      return userCredential;
    } catch (error) {
      notifyError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      notify("Logged in!");

      // Fetch user data after login
      await fetchUserData(userCredential.user.email);

      // Create JWT Token
      await createJWTToken(userCredential.user.email);

      return userCredential;
    } catch (error) {
      notifyError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      notify("Logged out");

      // Delete JWT Token
      await deleteJWTToken();
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      notify("Google login successful");

      // Fetch user data after Google login
      await fetchUserData(result.user.email);

      // Create JWT Token
      await createJWTToken(result.user.email);

      return result.user;
    } catch (error) {
      notifyError("Google sign-in failed");
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profile) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, profile);
      notify("Profile updated!");
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (email) => {
    try {
      console.log(`Fetching user data for email: ${email}`);
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${email.toLowerCase()}`, // Convert to lowercase
        { withCredentials: true }
      );
      console.log("User data response:", userResponse.data);

      if (userResponse.data) {
        setUserData(userResponse.data);
      } else {
        console.log("No user data found");
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      notifyError(error.message);
    }
  };

  const createJWTToken = async (email) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/JWT`,
        { email: email.toLowerCase() }, // Convert to lowercase
        { withCredentials: true }
      );
      console.log("JWT token created");
    } catch (error) {
      console.error("Error creating JWT token:", error);
      notifyError(error.message);
    }
  };

  const deleteJWTToken = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      console.log("JWT token deleted");
    } catch (error) {
      console.error("Error deleting JWT token:", error);
      notifyError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await createJWTToken(currentUser.email.toLowerCase()); // Convert to lowercase
        await fetchUserData(currentUser.email.toLowerCase()); // Convert to lowercase
      } else {
        setUser(null);
        setUserData(null);
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
    updateUserProfile,
    userData,
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