import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import Produto from '../../../models/Produto';
import './ListaProduto.css';
import { busca } from '../../../sevices/Services';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaProduto() {

  const [produto, setProduto] = useState<Produto[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == '') {
      toast.error("Você precisa estar logado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      })
      navigate('/login')
    }
  }, [token])

  async function getProduto() {
    await busca("/produto", setProduto, {
      headers: {
        'Authorization': token
      }
    })
  }
  useEffect(() => {
    getProduto()
  }, [produto.length])

  return (
    <Box>
      <Box m={12} >

        <Link to={`/formularioProduto`} className="text-decorator-none" >
          <Box mx={1} className="center">
            <Button variant="contained" size='small' color="primary" >
              Cadastrar Novo Produto
            </Button>
          </Box>
        </Link>



        <Box display='flex' >

          {
            produto.map(produto => (
              <Box m={2} >
                <Card variant="outlined">
                  <CardContent>

                    <Typography color="textSecondary" gutterBottom>
                      {produto.fornecedor?.nome}
                    </Typography>

                    <Typography variant="h5" component="h2">
                      {produto.nome}
                    </Typography>

                    <Typography variant="body2" component="p">
                      {produto.preco}
                    </Typography>

                    <Typography variant="body2" component="p">
                    </Typography>

                  </CardContent>

                  <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5}>

                      <Link to={`/formularioProduto/${produto.id}`} className="text-decorator-none" >
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            Atualizar
                          </Button>
                        </Box>
                      </Link>

                      <Link to={`/deletarProduto/${produto.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" size='small' color="secondary">
                            Deletar
                          </Button>
                        </Box>
                      </Link>

                    </Box>
                  </CardActions>

                </Card>
              </Box>

            ))
          }
        </Box>
      </Box>
    </Box>
  )

}
export default ListaProduto;