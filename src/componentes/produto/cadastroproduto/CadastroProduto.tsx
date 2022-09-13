import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { busca, buscaId, post, put } from '../../../sevices/Services';
import Fornecedor from '../../../models/Fornecedor';
import Produto from '../../../models/Produto';
import './CadastroProduto.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function CadastroProduto() {

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [fornecedor, setFornecedor] = useState<Fornecedor>({
        id: 0,
        nome: ''
    })

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: '',
        preco: 0,
        fornecedor: null
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
        setProduto({
            ...produto,
            fornecedor: fornecedor
        })
    }, [fornecedor])

    useEffect(() => {
        getFornecedor()
        if (id !== undefined) {
            findByIdProduto(id)
        }
    }, [id])

    async function getFornecedor() {
        await busca("/fornecedor", setFornecedores, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdProduto(id: string) {
        await buscaId(`produto/${id}`, setProduto, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedProduto(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            fornecedor: fornecedor
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {

            await put(`/produto`, produto, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Produto atualizado com sucesso",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })

        } else {

            await post(`/produto`, produto, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Produto cadastrado com sucesso",{
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
        back()
    }

    function back() {
        navigate('/produto')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro de Produto</Typography>

                <TextField
                    value={produto.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                    id="nome" label="nome" variant="outlined"
                    name="nome" margin="normal" fullWidth
                />

                <TextField
                    value={produto.preco}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                    id="preco" label="preco" name="preco" variant="outlined"
                    margin="normal" fullWidth
                />

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Fornecedor </InputLabel>

                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"

                        onChange={(e) => buscaId(`/fornecedor/${e.target.value}`, setFornecedor, {
                            headers: {
                                'Authorization': token
                            }
                        })}
                    >

                        {
                            fornecedores.map(item => (
                                <MenuItem value={item.id}>{item.nome}</MenuItem>
                            ))
                        }

                    </Select>
                    <FormHelperText>Escolha um fornecedor para o produto</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroProduto;