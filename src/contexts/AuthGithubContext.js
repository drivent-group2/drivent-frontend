import { createContext, useState } from 'react';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from '../services/firebaseApi';
import useGitSignup from '../hooks/api/useGitOauth';

const provider = new GithubAuthProvider();

const AuthGithubContext = createContext({});
export default AuthGithubContext;

export function GitAuthProvider({ children }) {
  const { signUpSignIn } = useGitSignup();
  const auth = getAuth(app);
  const [gitUser, setGitUser] = useState(null);

  async function singInGithub() {
    signInWithPopup(auth, provider);
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setGitUser(user);
      sessionStorage.setItem('@AuthFirebase:token', token);
      sessionStorage.setItem('@AuthFirebase:token', JSON.stringify(user));
      await signUpSignIn(user.email);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    }
  }
  return (
    <AuthGithubContext.Provider value={{ singInGithub, signed: !!gitUser, gitUser }}>
      {children}
    </AuthGithubContext.Provider>
  );
}
