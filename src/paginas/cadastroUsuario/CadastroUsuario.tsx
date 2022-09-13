import React, {useState, useEffect, ChangeEvent} from 'react';
import {Grid, Box, Typography, Button, TextField} from '@material-ui/core';
import {Link, useNavigate } from 'react-router-dom';
import User from '../../models/User';
import {cadastroUsuario} from '../../sevices/Services';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

function CadastroUsuario() {

let navigate = useNavigate();
const [confirmarSenha, setConfirmarSenha] = useState<String>('')
const [users, setUsers] = useState<User>(
    {
        id: 0,
        user: '',
        password: ''
    })
const [userResult, setUserResult] = useState<User>(
    {
        id: 0,
        user: '',
        password: ''
    })

    useEffect(() => {
        if (userResult.id !== 0) {
            navigate('/login')
        }
    }, [userResult])


    function updatedModel(e: ChangeEvent<HTMLInputElement>){
        setUsers({
            ...users,
            [e.target.name]: e.target.value
        })
    }

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
}

async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        // Estrutura Condicional que verifica se as senhas batem e se a Senha tem mais de 8 caracteres
        if (confirmarSenha === users.password && users.password.length >= 8) {

            //Tenta executar o cadastro
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, users, setUserResult)
                toast.success("Usuário cadastrado com sucesso.",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })
            //Se houver erro, pegue o Erro e retorna uma msg
            } catch (error) {
                console.log(`Error: ${error}`)
                
                //Pode modificar a msg de acordo com o erro 
                toast.error("Usuário já existente",{
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
        else if (confirmarSenha !== users.password && users.password.length >= 8){
            toast.error("Erro ao confirmar senha. Tente novamente",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })

            setUsers({ ...users, password: "" }) // Reinicia o campo de Senha
            setConfirmarSenha("")           // Reinicia o campo de Confirmar Senha
        }
        
        else {
            toast.error("Insira no miníno 8 caracteres na senha.",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })

            setUsers({ ...users, password: "" }) // Reinicia o campo de Senha
            setConfirmarSenha("")           // Reinicia o campo de Confirmar Senha
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={cadastrar}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto1'>Cadastrar</Typography>
                        <TextField value={users.user} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='user' label='email' variant='outlined' name='user' margin='normal' fullWidth />
                        <TextField value={users.password} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='password' label='password' variant='outlined' name='password' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirm password' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                           <Link to='/login' className='text-decorator-none'>
                            <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                           </Link> 
                                <Button type='submit' variant='contained' color='primary'>
                                    Cadastrar
                                </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>

        </Grid>
    );
}

export default CadastroUsuario;