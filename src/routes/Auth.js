import React, { useState } from "react"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  //onChange의 설정은 내가 input에 입력한 값들을 도대로 저장시킨다. value을 받아오는 것
  const onChange = (event) => {
    // event로 부터 {name, value}을 받아옵니다. => 구조분해할당
    // target : 변경이 일어난 부분, target 안에 name(input 네임)과 value(키보드를 통해 입력된 값)가 들어있다.
    const {target : {name, value}} = event;

    if(name === "email") {
      //name과 email이 값으면 value={email}이 setemail안에 들어간다
      setEmail(value)
    } else if (name === "password") {
      //name과 password이 값으면 value={password}이 setPassword안에 들어간다
      setPassword(value);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data
      const auth = getAuth()
      if(newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        } else {
        data = await signInWithEmailAndPassword(auth, email, password);
        }
    console.log (data);
  } catch(error) {
      setError(error.message);
  }
  };

  const toggleAccount = () => setNewAccount(prev => !prev)
  
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
    <form onSubmit={onSubmit}>

      <input 
      name="email"
      type="email" 
      placeholder="이메일을 입력해주세요."  
      value={email}
      onChange={onChange}
      required 
      />

      <input 
      name="password"
      type="password" 
      placeholder="비밀번호를 입력해주세요."
      value={password}
      onChange={onChange}  
      required />

      <input type="submit" value={newAccount ? "새 계정 만들기" : "로그인"}/>
      {error}
    </form>
    <span onClick={toggleAccount}>{newAccount ? "로그인" : "새 계정 만들기"}</span>
    <div>
      <button onClick={onSocislClick} name="google">Google로 간편 로그인</button>
      <button onClick={onSocislClick} name="github">GitHub로 간편 로그인</button>
    </div> 
  </div>
)
};

export default Auth;