import axios from "axios";

function addOperation (body, type, config){
    const promise = axios.post(`${process.env.REACT_APP_BASE_URL}/new-operation/${type}`, body, config);
    return promise;
}
function getOperation (config){
    const promise = axios.get(`${process.env.REACT_APP_BASE_URL}/operations`, config);
    return promise;
}
const TransactionsFunc = {addOperation, getOperation};

export default TransactionsFunc;