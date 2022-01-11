import React from "react"; 
import AuthForm from "components/AuthForm"
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


//* 로그인 페이지 */
//AuthForm => 
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
  <div className="login">
    <h1 className="logo"><FontAwesomeIcon icon={faTwitter} /></h1>
    <AuthForm />
    <div className="authBtns">
      <button onClick={onSocislClick} name="google" className="authBtn"><FontAwesomeIcon icon={faGoogle} /> Google로 간편 로그인</button>
      <button onClick={onSocislClick} name="github" className="authBtn"><FontAwesomeIcon icon={faGithub} /> GitHub로 간편 로그인</button>
    </div> 
  </div>
)
};

export default Auth;