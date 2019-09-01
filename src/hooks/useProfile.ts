import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from '../store/ducks/customer/services';
import { alert, toggleLoader } from '../store/ducks/app/actions';

const initialProfile = {
  loading: false,
  data: '',
};

const useProfile = (cpf: string) => {
  const [hook, setHook] = useState(initialProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!cpf) return setHook(initialProfile);

      try {
        dispatch(toggleLoader(true));
        setHook({ loading: true, data: '' });
        const profile = await getProfile(cpf);

        return setHook(profile ? { loading: false, data: profile } : initialProfile);
      } catch (err) {
        dispatch(
          alert({
            className: 'bg-danger',
            text: 'Could not load investment profile.',
          }),
        );
      } finally {
        dispatch(toggleLoader(false));
      }
    })();
  }, [cpf, dispatch]);

  return hook;
};

export { useProfile };
