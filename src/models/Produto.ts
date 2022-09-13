import Fornecedor from "./Fornecedor";

interface Produto{
    id: number
    nome: string
    preco: number
    fornecedor?: Fornecedor | null
}

export default Produto;