import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { verify2FA } from '../store/ducks/login/services';
import { getToken, getUser } from '../services/auth';
import { ApplicationState } from '../models';

interface Use2FAValidationHook {
  isValid: boolean;
  hasError: boolean;
  loading: boolean;
}

const use2FAValidation = (token: string, isLogin: boolean) => {
  const [hook, setHook] = useState<Use2FAValidationHook>({
    isValid: false,
    hasError: false,
    loading: false,
  });

  const { login } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    (async () => {
      const jwt = getToken();
      const currentUser = getUser();
      setHook({ isValid: false, hasError: false, loading: false });

      // Workaround when 2FA at login page
      if (isLogin) {
        setHook({
          isValid: login.data.authenticated,
          loading: login.isAuthenticating,
          hasError: !!login.error,
        });
      } else {
        if (!token || (token && token.length < 6) || !jwt || !currentUser) return;

        setHook({ isValid: false, hasError: false, loading: true });

        try {
          // If succeeded, the token is valid
          await verify2FA(currentUser.id, token, jwt);
          setHook({ isValid: true, hasError: false, loading: false });
        } catch (err) {
          // Otherwise, the token is invalid
          setHook({ isValid: false, hasError: true, loading: false });
        }
      }
    })();
  }, [token, login.data.authenticated, login.isAuthenticating, login.error, isLogin]);

  return hook;
};

export { use2FAValidation };
