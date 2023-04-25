import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import {useNavigate} from "react-router-dom"
import {useState, useEffect, useContext} from "react"
import {AuthContext} from "../contexts/AuthContext"
import TransactionsFunc from "../services/apiTransactions"
import Transaction from "../components/Transaction"

export default function HomePage() {

const {token} = useContext(AuthContext);
const [transactions, setTransactions] = useState(undefined);
const [total, setTotal] = useState(0);
const navigate = useNavigate();
const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  }
} 
  useEffect(() => {
    
    TransactionsFunc.getOperation(config)
    .then((res) => {
      setTransactions(res.data);
    })
    .catch((error) => {
      alert(error.response.data);
      navigate("/");})
  }, []);

  console.log(transactions);

  function newInOperation(){
    navigate("/nova-transacao/entrada");
  }

  function newOutOperation(){
    navigate("/nova-transacao/saída");
  }
  function signOut(){
    navigate("/");
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {transactions?.name}</h1>
        <BiExit onClick={signOut}/>
      </Header>

      <TransactionsContainer>
        {transactions?
        transactions.list.map((t, index) => <ul><Transaction key={index} transactions ={t}/></ul>)
        : "Não há registros de entrada ou saída"}

         {transactions? 
        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>{total}</Value>
        </article>: ""}
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={newInOperation}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={newOutOperation}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`