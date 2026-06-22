import React from 'react';

import Card from '../components/card';

import { UserPlus } from 'lucide-react';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from '../config/axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/equipes`;

function ListagemEquipes() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-equipes`);
  };

  const editar = (id) => {
    navigate(`/cadastro-equipes/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await api
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Equipe excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a equipe`);
      });
  }

  React.useEffect(() => {
    api.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Equipes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Equipe
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Jogadores</th>
                    <th scope='col'>Adicionar jogador</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td><a href= {`/visualizar-equipes/${dado.id}`}>{dado.nome}</a></td>
                      <td><a href= {`/listagem-jogadores-equipe/${dado.id}`}>Ver Jogadores</a></td>
                      <td><a href={`/cadastro-jogadores-equipe/${dado.id}`}><UserPlus /></a></td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row' justifyContent={'center'}>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemEquipes;
