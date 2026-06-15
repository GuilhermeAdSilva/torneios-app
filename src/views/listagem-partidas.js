import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/partidas`;

function ListagemPartidas() {
  const navigate = useNavigate();

  const [dados, setDados] = React.useState([]);

  const cadastrar = () => {
    navigate('/cadastro-partidas');
  };

  const editar = (id) => {
    navigate(`/cadastro-partidas/${id}`);
  };

  const adicionarResultado = (id) => {
    navigate(`/cadastro-partidas-resultado/${id}`);
  };

  async function excluir(id) {
    try {
      await axios.delete(`${baseURL}/${id}`);

      mensagemSucesso('Partida excluída com sucesso!');

      setDados((dadosAntigos) =>
        dadosAntigos.filter((dado) => dado.id !== id)
      );
    } catch (error) {
      mensagemErro('Erro ao excluir partida');
    }
  }

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar partidas');
      });
  }, []);

  return (
    <div className="container">
      <Card title="Listagem de Partidas">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={cadastrar}
              >
                Nova Partida
              </button>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Torneio</th>
                    <th>Mandante</th>
                    <th>Placar</th>
                    <th>Visitante</th>
                    <th>Status</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {dados.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Nenhuma partida cadastrada
                      </td>
                    </tr>
                  )}

                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nomeTorneio}</td>

                      <td>{dado.nomeEquipeMandante}</td>

                      <td>
                        {dado.status === 'FINALIZADA' || dado.status === 'AO_VIVO'
                          ? `${dado.golsMandante ?? 0} x ${dado.golsVisitante ?? 0}`
                          : '-'}
                      </td>

                      <td>{dado.nomeEquipeVisitante}</td>

                      <td>{dado.status}</td>

                      <td>
                        <Stack
                          spacing={1}
                          direction="row"
                          justifyContent="center"
                        >
                          {dado.status !== 'FINALIZADA' && (
                            <IconButton
                              aria-label="resultado"
                              onClick={() =>
                                adicionarResultado(dado.id)
                              }
                            >
                              <SportsSoccerIcon />
                            </IconButton>
                          )}

                          {dado.status !== 'FINALIZADA' && (
                            <IconButton
                              aria-label="editar"
                              onClick={() => editar(dado.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}

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

export default ListagemPartidas;