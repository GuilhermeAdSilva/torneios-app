import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/resultados`;

function ListagemResultados() {
  const navigate = useNavigate();

  const [dados, setDados] = React.useState([]);

  const cadastrar = () => {
    navigate('/cadastro-resultados');
  };

  const editar = (id) => {
    navigate(`/cadastro-resultados/${id}`);
  };

  async function excluir(id) {
    try {
      await axios.delete(`${baseURL}/${id}`);

      mensagemSucesso('Resultado excluído com sucesso!');

      setDados((dadosAntigos) =>
        dadosAntigos.filter((dado) => dado.id !== id)
      );
    } catch (error) {
      mensagemErro('Erro ao excluir o resultado');
    }
  }

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar resultados');
      });
  }, []);

  return (
    <div className="container">
      <Card title="Listagem de Resultados">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={cadastrar}
              >
                Novo Resultado
              </button>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Mandante</th>
                    <th className="text-center">Placar</th>
                    <th>Visitante</th>
                    <th className="text-center">Prorrogação</th>
                    <th className="text-center">Pênaltis</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {dados.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Nenhum resultado cadastrado
                      </td>
                    </tr>
                  )}

                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nomeEquipeMandante}</td>

                      <td className="text-center">
                        {dado.golsMandante} x {dado.golsVisitante}

                        {dado.penaltis &&
                          dado.penaltisMandante != null &&
                          dado.penaltisVisitante != null && (
                            <div style={{ fontSize: '12px' }}>
                              Pênaltis: {dado.penaltisMandante} x{' '}
                              {dado.penaltisVisitante}
                            </div>
                          )}
                      </td>

                      <td>{dado.nomeEquipeVisitante}</td>

                      <td className="text-center">
                        {dado.prorrogacao ? 'Sim' : 'Não'}
                      </td>

                      <td className="text-center">
                        {dado.penaltis ? 'Sim' : 'Não'}
                      </td>

                      <td>
                        <Stack
                          spacing={1}
                          direction="row"
                          justifyContent="center"
                        >
                          <IconButton
                            aria-label="editar"
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            aria-label="excluir"
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemResultados;