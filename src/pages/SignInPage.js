import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import {useContext, useState} from "react"
import { AuthContext } from "../contexts/AuthContext"
import authFunctions from "../services/apiAuth"
import { useNavigate } from 'react-router-dom'

export default function SignInPage() {

  const {setToken} = useContext(AuthContext);
  const [form, setForm] = useState({email: "", password: ""});
  const navigate = useNavigate();

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value});
  }
  
  function handleLogin(e){

    e.preventDefault();

    authFunctions.login(form)
    .then((res) => {
      setToken(res.data);
      localStorage.setItem("token", res.data);
      navigate("/home");
    })
    .catch((error) => alert(error.response.data.message))
  }
  return (
    <SingInContainer>
      <form onSubmit={handleLogin}> 
        <MyWalletLogo />
        <input
        placeholder="E-mail"
        type="email"
        name="email"
        value={form.email}
        onChange={handleForm}
        required />
        <input
        placeholder="Senha"
        type="password"
        autocomplete="new-password"
        name="password"
        value={form.password}
        onChange={handleForm}
        required/>
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
