import { Link, useNavigate} from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import authFunctions from "../services/apiAuth"
import { useState } from "react"

export default function SignUpPage() {

  const [form, setForm] = useState({name: "", email: "", password: ""});
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value});
  }
  function handleLogin(e){

    e.preventDefault();

    if(form.password !== confirmPassword){
      alert("Preencha corretamente os campos de senha para efetuar o cadastro");
      return;
    }
    authFunctions.signUp(form)
    .then((res) => {
      console.log(res.data);
      navigate("/");
    })
    .catch((error) => alert(error.response.data.message))
  }
  return (
    <SingUpContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
        placeholder="Nome"
        name = "name"
        value={form.name}
        onChange={handleForm}
        type="text"
        required/>
        <input placeholder="E-mail"
        type="email"
        name="email"
        value={form.email}
        onChange={handleForm}
        required/>
        <input
        placeholder="Senha"
        name="password"
        value={form.password}
        type="password"
        onChange={handleForm}
        autoComplete="new-password"
        required/>
        <input
        placeholder="Confirme a senha"
        value={confirmPassword}
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        required/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
