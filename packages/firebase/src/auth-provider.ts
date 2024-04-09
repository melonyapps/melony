import { IdentityProps } from "@melony/core";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { Auth, getAuth, signInWithPopup, signOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

class AuthClient {
  private _auth: Auth;

  constructor(auth: Auth) {
    this._auth = auth;
  }

  login = ({ onSuccess }: { onSuccess: (user: any) => void }) => {
    signInWithPopup(this._auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();

        localStorage.setItem("token", token);

        onSuccess(user);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  getIdToken = async () => {
    const idToken = await this._auth.currentUser?.getIdToken();
    return idToken || "";
  };

  private getSignedInUser = (): Promise<IdentityProps | undefined> => {
    return new Promise((resolve, reject) => {
      const auth = this._auth;

      if (auth.currentUser) {
        return resolve({
          _id: auth.currentUser?.uid,
          email: auth.currentUser?.email || "",
          displayName: auth.currentUser?.displayName || "",
          avatar: auth.currentUser?.photoURL || "",
        });
      }

      const unsubscribe = onAuthStateChanged(this._auth, async (user) => {
        unsubscribe();

        if (user) {
          const token = await user.getIdToken();

          localStorage.setItem("token", token);

          return resolve({
            _id: user?.uid || "",
            email: user?.email || "",
            displayName: user?.displayName || "",
            avatar: user?.photoURL || "",
          });
        } else {
          localStorage.removeItem("token");
          return resolve(undefined); // if reject, react-query will attempt several times so we dont need it
        }
      });
    });
  };

  getIdentity = async (): Promise<IdentityProps | undefined> => {
    return this.getSignedInUser();
  };

  logout = async ({ onSuccess }: { onSuccess: () => void }) => {
    try {
      await signOut(this._auth);

      localStorage.removeItem("token");

      onSuccess();
    } catch (err) {}
  };

  checkAuth = async () => {
    return this.getSignedInUser();
  };
}

export const authProvider = (config: FirebaseOptions) => {
  initializeApp(config);

  const auth = getAuth();

  const fireAuthClient = new AuthClient(auth);

  return {
    login: fireAuthClient.login,
    logout: fireAuthClient.logout,
    getIdentity: fireAuthClient.getIdentity,
    checkAuth: fireAuthClient.checkAuth,
  };
};
