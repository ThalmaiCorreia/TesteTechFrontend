import React, { useState, useEffect, ChangeEvent } from 'react';
import {Grid, Box, Typography, TextField, Button} from '@material-ui/core';
import {Link, useNavigate} from 'react-router-dom'
import { login } from '../../sevices/Services';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';

function Login(){
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('')
    const[userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            user: '',
            password: ''
        }
        )

        function updatedModel(e: ChangeEvent<HTMLInputElement>){

            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }

        useEffect(() => {
            if (token != '') {
                dispatch(addToken(token))
                navigate('/formularioproduto')
            }
        }, [token])

        async function onSubmit(e: ChangeEvent<HTMLFormElement>){
            e.preventDefault();
            try{
                await login(`/usuarios/logar`, userLogin, setToken)

                toast.success("Usuário logado com sucesso",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })      
                  }catch(error){

                toast.error("Dados do usuário inconsistentes. Erro ao logar!",{
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
    
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6} >
                <Box paddingX={20} >
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto'>Entrar</Typography>                 
                        <TextField value={userLogin.user} onChange={(e:ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id='user' label='email' variant='outlined' name='user' margin='normal' fullWidth />
                        <TextField value={userLogin.password} onChange={(e:ChangeEvent<HTMLInputElement>)=> updatedModel(e)} id='password' label='password' variant='outlined' name='password' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center' >
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                        </Box>
                     </form>
                </Box>
                <Box display='flex' justifyContent='center' marginTop={2}>
                    <Box marginRight={1}>
                        <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                    </Box>
                    <Link to='/cadastro'>
                    <Typography variant='subtitle1' gutterBottom align='center' className='texto'>Cadastre-se</Typography>
                    </Link>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>
            </Grid>
        </Grid>
    );

}

export default Login;