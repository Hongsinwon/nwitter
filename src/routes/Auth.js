import React from "react"; 
import AuthForm from "components/AuthForm"
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth = () => {

  const onSocislClick = async (event) => {
    const {target:{name}} = event;
    const auth = getAuth();
    let provider;
    if(name === "google") {
      provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result); 
      // const token = credential.accessToken;
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
    }
  }
  return (
  <div>
    <AuthForm />
    <div>
      <button onClick={onSocislClick} name="google">Google로 간편 로그인</button>
      <button onClick={onSocislClick} name="github">GitHub로 간편 로그인</button>
    </div> 
  </div>
)
};

export default Auth;