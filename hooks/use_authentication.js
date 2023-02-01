import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { auth } from '../config/firebase';

const authentication = auth;

export function useAuthentication() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(authentication, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user
  };
}