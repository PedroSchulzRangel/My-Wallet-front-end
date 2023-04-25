import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import TransactionsFunc from "../services/apiTransactions"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import {AuthContext} from "../contexts/AuthContext"

export default function TransactionsPage() {
  
  const navigate = useNavigate();
  const {tipo} = useParams();
  const [form, setForm] = useState({value: "", description: ""});
  const {token} = useContext(AuthContext);
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  function handleForm(e){
    setForm({...form, [e.target.name]: e.target.value});
  }

  function saveOperation(e){
    
    e.preventDefault();
    
    TransactionsFunc.addOperation(form, tipo, config)
    .then((res) => {
      console.log(res.data);
      navigate("/home");
    })
    .catch((error) => {
      alert(error.response.data);
      navigate("/");
    })
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={saveOperation}>
        <input
        placeholder="Valor"
        type="text"
        name="value"
        value={form.value}
        onChange={handleForm}
        required
        />
        <input
        placeholder="Descrição"
        type="text"
        name="description"
        value={form.description}
        onChange={handleForm}
        required />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
