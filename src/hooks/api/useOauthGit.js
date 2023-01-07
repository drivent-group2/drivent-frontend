import useAsync from '../useAsync';

import * as gitApi from '../../services/gitApi';

export default function useSignUpSignInWithGit() {
  const {
    loading: signUpSignInLoading,
    error: ssignUpSignInError,
    act: signUpSignIn,
  } = useAsync(gitApi.gitAuth, false);

  return {
    signUpSignInLoading,
    ssignUpSignInError,
    signUpSignIn,
  };
}
