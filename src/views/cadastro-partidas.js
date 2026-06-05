import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function CadastroPartidas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL3}/partidas`;

  const [id, setId] = useState('');
  const [idAssociacaoMandante, setIdAssociacaoMandante] = useState(0);
  const [idAssociacaoVisitante, setIdAssociacaoVisitante] = useState(0);
  const [idArbitroPrincipal, setIdArbitroPrincipal] = useState(0);
  const [idArbitroBandeirinhaA, setIdArbitroBandeirinhaA] = useState(0);
  const [idArbitroBandeirinhaB, setIdArbitroBandeirinhaB] = useState(0);
  const [idQuartoArbitro, setIdQuartoArbitro] = useState(0);
  const [idResultado, setIdResultado] = useState(0);
  const [idEdicaoTorneio, setIdEdicaoTorneio] = useState(0);
  const [idRodada, setIdRodada] = useState(0);
  const [nomeAssociacaoMandante, setNomeAssociacaoMandante] = useState('');
  const [nomeAssociacaoVisitante, setNomeAssociacaoVisitante] = useState('');
  const [nomeArbitroPrincipal, setNomeArbitroPrincipal] = useState('');
  const [nomeArbitroBandeirinhaA, setNomeArbitroBandeirinhaA] = useState('');
  const [nomeArbitroBandeirinhaB, setNomeArbitroBandeirinhaB] = useState('');
  const [nomeQuartoArbitro, setNomeQuartoArbitro] = useState('');
  const [nomeEdicaoTorneio, setNomeEdicaoTorneio] = useState('');
  const [numeroRodada, setNumeroRodada] = useState('');
  const [local, setLocal] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdAssociacaoMandante(1);
      setNomeAssociacaoMandante("");
      setIdAssociacaoVisitante(2);
      setNomeAssociacaoVisitante("");
      setIdArbitroPrincipal(1);
      setNomeArbitroPrincipal("");
      setIdArbitroBandeirinhaA(2);
      setNomeArbitroBandeirinhaA("");
      setIdArbitroBandeirinhaB(3);
      setNomeArbitroBandeirinhaB("");
      setIdQuartoArbitro(1);
      setNomeQuartoArbitro("");
      setIdResultado(1);
      setIdEdicaoTorneio(1);
      setNomeEdicaoTorneio("");
      setIdRodada(1);
      setNumeroRodada("");
      setLocal("");
    } else {
      setId(dados.id);
      setIdAssociacaoMandante(dados.idAssociacaoMandante);
      setNomeAssociacaoMandante(dados.nomeAssociacaoMandante);
      setIdAssociacaoVisitante(dados.idAssociacaoVisitante);
      setNomeAssociacaoVisitante(dados.nomeAssociacaoVisitante);
      setIdArbitroPrincipal(dados.idArbitroPrincipal);
      setNomeArbitroPrincipal(dados.nomeArbitroPrincipal);
      setIdArbitroBandeirinhaA(dados.idArbitroBandeirinhaA);
      setNomeArbitroBandeirinhaA(dados.nomeArbitroBandeirinhaA);
      setIdArbitroBandeirinhaB(dados.idArbitroBandeirinhaB);
      setNomeArbitroBandeirinhaB(dados.nomeArbitroBandeirinhaB);
      setIdQuartoArbitro(dados.idQuartoArbitro);
      setNomeQuartoArbitro(dados.nomeQuartoArbitro);
      setIdResultado(dados.idResultado);
      setIdEdicaoTorneio(dados.idEdicaoTorneio);
      setNomeEdicaoTorneio(dados.nomeEdicaoTorneio);
      setIdRodada(dados.idRodada);
      setNumeroRodada(dados.numeroRodada);
      setLocal(dados.local);
    }
  }

  async function salvar() {
    let data = { id, idAssociacaoMandante, nomeAssociacaoMandante, idAssociacaoVisitante, nomeAssociacaoVisitante, idArbitroPrincipal, nomeArbitroPrincipal, idArbitroBandeirinhaA, nomeArbitroBandeirinhaA, idArbitroBandeirinhaB, nomeArbitroBandeirinhaB, idQuartoArbitro, nomeQuartoArbitro, idResultado, idEdicaoTorneio, nomeEdicaoTorneio, idRodada, numeroRodada, local};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Partida cadastrada com sucesso!`);  
          navigate(`/listagem-partidas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Partida alterada com sucesso!`);
          navigate(`/listagem-partidas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setIdAssociacaoMandante(dados.idAssociacaoMandante);
      setNomeAssociacaoMandante(dados.nomeAssociacaoMandante);
      setIdAssociacaoVisitante(dados.idAssociacaoVisitante);
      setNomeAssociacaoVisitante(dados.nomeAssociacaoVisitante);
      setIdArbitroPrincipal(dados.idArbitroPrincipal);
      setNomeArbitroPrincipal(dados.nomeArbitroPrincipal);
      setIdArbitroBandeirinhaA(dados.idArbitroBandeirinhaA);
      setNomeArbitroBandeirinhaA(dados.nomeArbitroBandeirinhaA);
      setIdArbitroBandeirinhaB(dados.idArbitroBandeirinhaB);
      setNomeArbitroBandeirinhaB(dados.nomeArbitroBandeirinhaB);
      setIdQuartoArbitro(dados.idQuartoArbitro);
      setNomeQuartoArbitro(dados.nomeQuartoArbitro);
      setIdResultado(dados.idResultado);
      setIdEdicaoTorneio(dados.idEdicaoTorneio);
      setNomeEdicaoTorneio(dados.nomeEdicaoTorneio);
      setIdRodada(dados.idRodada);
      setNumeroRodada(dados.numeroRodada);
      setLocal(dados.local);
    }
  }

  const [dadosEquipes, setDadosEquipes] = React.useState(null);
  const [dadosEdicoesTorneios, setDadosEdicoesTorneios] = React.useState(null);
  
  useEffect(() => {
    axios.get(`${BASE_URL2}/equipes`).then((response) => {
      setDadosEquipes(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL2}/EdicoesTorneios`).then((response) => {
      setDadosEdicoesTorneios(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosEquipes) return null
  if (!dadosEdicoesTorneios) return null

  return (
    <div className='container'>
      <Card title={`Cadastrar partida`}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
    
              <FormGroup label='Equipe Mandante: *' htmlFor='selectEquipe'>
                <select
                  className='form-select'
                  id='selectEquipe'
                  name='idEquipe1'
                  value={idAssociacaoMandante}
                  onChange={(e) => setIdAssociacaoMandante(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosEquipes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

               <FormGroup label='Equipe Visitante: *' htmlFor='selectEquipe'>
                <select
                  className='form-select'
                  id='selectEquipe'
                  name='idEquipe2'
                  value={idAssociacaoVisitante}
                  onChange={(e) => setIdAssociacaoVisitante(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosEquipes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

               <FormGroup label='Local: *' htmlFor='inputLocal'>
                <input
                  type = "text"
                  className='form-control'
                  id='inputLocal'
                  name='local'
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroPartidas;
