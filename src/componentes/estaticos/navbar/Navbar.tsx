import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';

import './Navbar.css'

function Navbar() {

    let history = useNavigate()

    const dispatch = useDispatch()

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        })
        history("/login")
    }

    var navBarComponent

    if (token !== "") {
        navBarComponent =
            <AppBar className='cor' position="static">
                <Toolbar variant="dense">
                    <Box mx={10} >
                        <Typography variant="h5" color="inherit">
                            Tech Test
                        </Typography>
                    </Box>

                    <Box id='nav'>

                        <Link to="/produto" className="text-decorator-none">
                            <Box mx={2} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Produtos
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/formularioProduto" className="text-decorator-none">
                            <Box mx={2} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Cadastrar Produto
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/fornecedor" className="text-decorator-none">
                            <Box mx={2} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Fornecedores
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/formularioFornecedor" className="text-decorator-none">
                            <Box mx={2} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Cadastrar Fornecedor
                                </Typography>
                            </Box>
                        </Link>

                        <Box mx={2} className='cursor' onClick={goLogout}>
                            <Typography variant="h6" color="inherit">
                                Logout
                            </Typography>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
    }

    return (
        <>
            {navBarComponent}
        </>
    )
}

export default Navbar