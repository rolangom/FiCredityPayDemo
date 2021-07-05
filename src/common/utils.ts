import React from "react";
import firebase from "firebase";

export function ellipsify(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) : str
}

export function useUser() {
  const [user, setUser] = React.useState<firebase.User|null>(firebase.auth().currentUser);
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => setUser(user));
    return unsubscribe;
  }, []);
  return user;
}
