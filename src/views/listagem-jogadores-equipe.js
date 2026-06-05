import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { BASE_URL5 } from '../config/axios';

const baseURL = `${BASE_URL5}/elenco`;

function ListagemJogadoresEquipe() {
  const navigate = useNavigate();
  const { idEquipe } = useParams();

  const [dados, setDados] = React.useState([]);
  const [nomeEquipe, setNomeEquipe] = React.useState('');

  async function excluir(id) {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Jogador removido da equipe com sucesso!');

      setDados(dados.filter((dado) => dado.id !== id));
    } catch (error) {
      mensagemErro('Erro ao remover jogador da equipe');
    }
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      const jogadoresEquipe = response.data.filter(
        (jogador) => jogador.idEquipe === Number(idEquipe)
      );

      setDados(jogadoresEquipe);

      if (jogadoresEquipe.length > 0) {
        setNomeEquipe(jogadoresEquipe[0].nomeEquipe);
      }
    });
  }, [idEquipe]);

  return (
    <div className="container">
      <Card title={`Jogadores da Equipe ${nomeEquipe || ''}`}>
        <div className="row">
          <div className="col-lg-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Jogadores</th>
                  <th className="text-center">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {dados.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center">
                      Nenhum jogador cadastrado nesta equipe
                    </td>
                  </tr>
                )}

                {dados.map((dado) => (
                  <tr key={dado.id}>
                    <td>{dado.nomeJogador}</td>
                    <td className="text-center">
                      <Stack direction="row" justifyContent="center">
                        <IconButton onClick={() => excluir(dado.id)}>
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
      </Card>
    </div>
  );
}

export default ListagemJogadoresEquipe;