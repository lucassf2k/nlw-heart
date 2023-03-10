import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/api';

type TUser = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type TAuthContextData = {
  user: TUser | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as TAuthContextData);

type TAuthProvider = {
  children: ReactNode;
};

type TAuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
};

export function AuthProvider(props: TAuthProvider) {
  const [user, setUser] = useState<TUser | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=e1320ef09085a95fb3b0`;

  async function signIn(githubCode: string) {
    const response= await api.post<TAuthResponse>('/authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<TUser>('/profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;

    const hashHithubCode = url.includes('?code=');

    if (hashHithubCode) {
      const [urlwithoutCode, githubCpde] = url.split('?code=');

      window.history.pushState({}, '', urlwithoutCode);

      signIn(githubCpde);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}