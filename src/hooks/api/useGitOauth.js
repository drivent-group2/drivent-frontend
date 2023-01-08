import * as gitApi from '../../services/gitApi';
import useAsync from '../useAsync';

export default function useGitSignup() {
  const { loading: gitSingupLoading, error: gitSingupError, act: gitSingup } = useAsync(() => gitApi.gitAuth, false);
  return { gitSingupLoading, gitSingupError, gitSingup };
}
