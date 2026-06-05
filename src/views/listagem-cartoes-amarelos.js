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
import { BASE_URL4 } from '../config/axios';

const baseURL = `${BASE_URL4}/amarelos`;

function ListagemAmarelos() {
  const navigate = useNavigate();

  const [dados, setDados] = React.useState([]);
  const [dadosOriginais, setDadosOriginais] = React.useState([]);
  const [competicaoSelecionada, setCompeticaoSelecionada] = React.useState(null);
  const [ranking, setRanking] = React.useState([]);

  const [tipoBusca, setTipoBusca] = React.useState('jogador');
  const [termoBusca, setTermoBusca] = React.useState('');

  const cadastrar = () => {
    navigate('/cadastro-cartoes-amarelos');
  };

  const editar = (id) => {
    navigate(`/cadastro-cartpes-amarelos/${id}`);
  };

  function gerarRanking(nomeCompeticao) {
    const amarelosDaCompeticao = dadosOriginais.filter(
      (dado) => dado.nomeCompeticao === nomeCompeticao
    );

    const mapa = {};

    amarelosDaCompeticao.forEach((item) => {
      const idJogador = item.idJogador;

      if (!mapa[idJogador]) {
        mapa[idJogador] = {
          idJogador: item.idJogador,
          nomeJogador: item.nomeJogador,
          totalAmarelos: 0,
        };
      }

      mapa[idJogador].totalAmarelos += 1;
    });

    const rankingOrdenado = Object.values(mapa).sort(
      (a, b) => b.totalAmarelos - a.totalAmarelos
    );

    setRanking(rankingOrdenado);
  }

  function handleClickEst(nomeCompeticao) {
    if (competicaoSelecionada === nomeCompeticao) {
      limparFiltros();
      return;
    }

    const filtrados = dadosOriginais.filter(
      (dado) => dado.nomeCompeticao === nomeCompeticao
    );

    setDados(filtrados);
    setCompeticaoSelecionada(nomeCompeticao);
    gerarRanking(nomeCompeticao);
  }

  function aplicarBusca(valor, tipo) {
    let lista = [...dadosOriginais];

    if (competicaoSelecionada) {
      lista = lista.filter(
        (dado) => dado.nomeCompeticao === competicaoSelecionada
      );
    }

    if (!valor) {
      setDados(lista);
      return;
    }

    const filtrados = lista.filter((dado) => {
      if (tipo === 'jogador') {
        return dado.nomeJogador
          .toLowerCase()
          .includes(valor.toLowerCase());
      }

      return dado.nomeCompeticao
        .toLowerCase()
        .includes(valor.toLowerCase());
    });

    setDados(filtrados);
  }

  function limparFiltros() {
    setDados(dadosOriginais);
    setCompeticaoSelecionada(null);
    setRanking([]);
    setTermoBusca('');
  }

  async function excluir(id) {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Cartão amarelo excluído com sucesso!');

      const novosDados = dados.filter((dado) => dado.id !== id);
      setDados(novosDados);
      setDadosOriginais(
        dadosOriginais.filter((dado) => dado.id !== id)
      );
    } catch (error) {
      mensagemErro('Erro ao excluir cartão amarelo');
    }
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
      setDadosOriginais(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Card title="Listagem de Amarelos">
        <div className="row">
          <div className="col-lg-12">

            <div className="row mb-3">
              <div className="col-md-3">
                <select
                  className="form-control"
                  value={tipoBusca}
                  onChange={(e) => {
                    setTipoBusca(e.target.value);
                    aplicarBusca(termoBusca, e.target.value);
                  }}
                >
                  <option value="jogador">Jogador</option>
                  <option value="competicao">Competição</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Pesquisar por ${tipoBusca}`}
                  value={termoBusca}
                  onChange={(e) => {
                    setTermoBusca(e.target.value);
                    aplicarBusca(e.target.value, tipoBusca);
                  }}
                />
              </div>

              <div className="col-md-3">
                <button
                  className="btn btn-secondary w-100"
                  onClick={limparFiltros}
                >
                  Limpar filtros
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-warning mb-3"
              onClick={cadastrar}
            >
              Novo Amarelo
            </button>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Competição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((dado) => (
                  <tr key={dado.id}>
                    <td>{dado.nomeJogador}</td>
                    <td
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontWeight:
                          competicaoSelecionada === dado.nomeCompeticao
                            ? 'bold'
                            : 'normal',
                      }}
                      onClick={() =>
                        handleClickEst(dado.nomeCompeticao)
                      }
                    >
                      {dado.nomeCompeticao}
                    </td>
                    <td>
                      <Stack spacing={1} direction="row" justifyContent="center">
                        <IconButton onClick={() => editar(dado.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => excluir(dado.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {competicaoSelecionada && ranking.length > 0 && (
              <div className="mt-5">
                <h4>
                  Jogadores com mais amarelos — {competicaoSelecionada}
                </h4>

                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Jogador</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((jogador, index) => (
                      <tr key={jogador.idJogador}>
                        <td>{index + 1}</td>
                        <td>{jogador.nomeJogador}</td>
                        <td>{jogador.totalAmarelos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemAmarelos;