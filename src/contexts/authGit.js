import { createContext, useState } from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../services/firebaseConfig';
import useSignUpSignInWithGit from '../hooks/api/useOauthGit';

const provider = new GithubAuthProvider();

export const AuthGitContext = createContext({});

export function AuthGitProvider({ children }) {
  const { signUpSignIn } = useSignUpSignInWithGit();
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  async function signInGit() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
      sessionStorage.setItem('@AuthFirebase:token', token);
      sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));

      await signUpSignIn(user.email);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    }
  }

  return <AuthGitContext.Provider value={{ signInGit, signed: !!user }}>{children}</AuthGitContext.Provider>;
}
