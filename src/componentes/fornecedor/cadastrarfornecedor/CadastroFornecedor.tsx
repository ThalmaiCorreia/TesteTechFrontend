import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { buscaId, post, put } from '../../../sevices/Services';
import Fornecedor from '../../../models/Fornecedor';
import "./CadastroFornecedor.css";
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CadastroFornecedor() {

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [fornecedor, setFornecedor] = useState<Fornecedor>({
        id: 0,
        nome: ''
    })

    useEffect(() => {
        if (token === "") {
            toast.error("Você precisa estar logado",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
                        navigate("/login")
        }
    }, [token])

    
    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        await buscaId(`/fornecedor/${id}`, setFornecedor, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setFornecedor({
            ...fornecedor,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        // Se o ID for diferente de indefinido tente Atualizar
        if (id !== undefined) {

            // TRY: Tenta executar a atualização 
            try {
                await put(`/fornecedor`, fornecedor, setFornecedor, {
                    headers: {
                        'Authorization': token
                    }
                })

                toast.success("Fornecedor atualizado com sucesso",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })
            // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
            } catch (error) {
                console.log(`Error: ${error}`)
                toast.error("Erro, por favor verifique a quantidade minima de caracteres",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })
            }

        // Se o ID for indefinido, tente Cadastrar
        } else {

            // TRY: Tenta executar o cadastro
            try {
                await post(`/fornecedor`, fornecedor, setFornecedor, {
                    headers: {
                        'Authorization': token
                    }
                })
                
                toast.success("Fornecedor cadastrado com sucesso",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })            
            // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
            } catch (error) {
                console.log(`Error: ${error}`)
                toast.error("Erro, por favor verifique a quantidade minima de caracteres",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })
            }
        }
        
        back()
    }

    function back() {
        navigate('/fornecedor')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro de fornecedor</Typography>
                <TextField
                    value={fornecedor.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="nome"
                    label="nome"
                    variant="outlined"
                    name="nome"
                    margin="normal"
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroFornecedor;