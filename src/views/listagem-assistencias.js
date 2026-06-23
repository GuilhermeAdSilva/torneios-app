import React from 'react';

import Card from '../components/card';
import '../custom.css';

import api from '../config/axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/gols`;

function ListagemAssistencias() {
  const [dados, setDados] = React.useState([]);
  const [dadosOriginais, setDadosOriginais] = React.useState([]);
  const [competicaoSelecionada, setCompeticaoSelecionada] = React.useState(null);
  const [ranking, setRanking] = React.useState([]);

  const [tipoBusca, setTipoBusca] = React.useState('jogador');
  const [termoBusca, setTermoBusca] = React.useState('');

  function gerarRanking(nomeCompeticao) {
    const golsDaCompeticao = dadosOriginais.filter(
      (dado) => dado.nomeTorneio === nomeCompeticao
    );

    const mapa = {};

    golsDaCompeticao.forEach((item) => {
      const idGarçom = item.idJogadorAssistencia;

      if (!idGarçom) return;

      if (!mapa[idGarçom]) {
        mapa[idGarçom] = {
          idJogadorAssistencia: item.idJogadorAssistencia,
          nomeJogadorAssistencia: item.nomeJogadorAssistencia,
          totalAssistencias: 0,
        };
      }

      mapa[idGarçom].totalAssistencias += 1;
    });

    const rankingOrdenado = Object.values(mapa).sort(
      (a, b) => b.totalAssistencias - a.totalAssistencias
    );

    setRanking(rankingOrdenado);
  }

  function handleClickEst(nomeCompeticao) {
    if (competicaoSelecionada === nomeCompeticao) {
      limparFiltros();
      return;
    }

    const filtrados = dadosOriginais.filter(
      (dado) => dado.nomeTorneio === nomeCompeticao
    );

    setDados(filtrados);
    setCompeticaoSelecionada(nomeCompeticao);
    gerarRanking(nomeCompeticao);
  }

  function aplicarBusca(valor, tipo) {
    let lista = [...dadosOriginais];

    if (competicaoSelecionada) {
      lista = lista.filter(
        (dado) => dado.nomeTorneio === competicaoSelecionada
      );
    }

    if (!valor) {
      setDados(lista);
      return;
    }

    const filtrados = lista.filter((dado) => {
      if (tipo === 'jogador') {
        return dado.nomeJogadorAssistencia
          ?.toLowerCase()
          .includes(valor.toLowerCase());
      }

      return dado.nomeTorneio
        ?.toLowerCase()
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

  React.useEffect(() => {
    api.get(baseURL).then((response) => {
      // Filtra para garantir que só apareçam na lista os gols que REALMENTE possuem assistência
      const apenasComAssistencia = response.data.filter(
        (gol) => gol.idJogadorAssistencia !== null && gol.nomeJogadorAssistencia !== null
      );
      setDados(apenasComAssistencia);
      setDadosOriginais(apenasComAssistencia);
    });
  }, []);

  return (
    <div className="container">
      <Card title="Listagem de Assistências">
        <div className="row">
          <div className="col-lg-12">

            <div className="row mb-4">
              <div className="col-md-3">
                <select
                  className="form-control"
                  value={tipoBusca}
                  onChange={(e) => {
                    setTipoBusca(e.target.value);
                    aplicarBusca(termoBusca, e.target.value);
                  }}
                >
                  <option value="jogador">Quem deu a Assistência</option>
                  <option value="competicao">Competição</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Pesquisar por ${tipoBusca === 'jogador' ? 'nome do jogador' : 'nome da competição'}`}
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

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Jogador da Assistência</th>
                  <th>Competição</th>
                  <th>Autor do Gol Beneficiado</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((dado) => (
                  <tr key={dado.id}>
                    <td style={{ fontWeight: '500' }}>{dado.nomeJogadorAssistencia}</td>
                    <td
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontWeight:
                          competicaoSelecionada === dado.nomeTorneio
                            ? 'bold'
                            : 'normal',
                      }}
                      onClick={() => handleClickEst(dado.nomeTorneio)}
                    >
                      {dado.nomeTorneio || 'Sem Competição'}
                    </td>
                    <td className="text-muted" style={{ fontSize: '0.95rem' }}>
                      {dado.nomeJogadorGol}
                    </td>
                  </tr>
                ))}
                {dados.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      Nenhuma assistência encontrada com os filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {competicaoSelecionada && ranking.length > 0 && (
              <div className="mt-5">
                <h4 className="text-success">
                  Líderes de Assistências — {competicaoSelecionada}
                </h4>

                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>#</th>
                      <th>Jogador</th>
                      <th style={{ width: '20%' }}>Total de Assistências</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((jogador, index) => (
                      <tr key={jogador.idJogadorAssistencia}>
                        <td>{index + 1}º</td>
                        <td>{jogador.nomeJogadorAssistencia}</td>
                        <td style={{ fontWeight: 'bold' }}>{jogador.totalAssistencias}</td>
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

export default ListagemAssistencias;