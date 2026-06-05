import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';

function CadastroResultados() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL3}/resultados`;

  const [id, setId] = useState('');
  const [golsCasa, setGolsCasa] = useState('');
  const [golsVisitante, setGolsVisitante] = useState('');
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setGolsCasa('');
      setGolsVisitante('')
    } else {
      setId(dados.id);
      setGolsCasa(dados.golsCasa);
      setGolsVisitante(dados.golsVisitante);
    }
  }

  async function salvar() {
    let data = { id, golsCasa, golsVisitante };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Resultado cadastrado com sucesso!`);
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
          mensagemSucesso(`Resultado alterado com sucesso!`);
          navigate(`/cadastro-resultado`);
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
      setGolsCasa(dados.golsCasa);
      setGolsVisitante(dados.golsVisitante);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Resultado'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label="equipe01: *" htmlFor="inputGolsCasa">
                <input
                  type="number"
                  id="inputGolsCasa"
                  value={golsCasa}
                  className="form-control"
                  name="golsCasa"
                  onChange={(e) => setGolsCasa(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="equipe02: *" htmlFor="inputGolsVisitante">
                <input
                  type="number"
                  id="inputGolsVisitante"
                  value={golsVisitante}
                  className="form-control"
                  name="golsVisitante"
                  onChange={(e) => setGolsVisitante(e.target.value)}
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

export default CadastroResultados;
