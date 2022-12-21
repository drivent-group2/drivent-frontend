import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignUp() {
  const {
    loading: signInLoading,
    error: signInError,
    act: signIn
  } = useAsync(authApi.signIn);

  return {
    signInLoading,
    signInError,
    signIn
  };
}
