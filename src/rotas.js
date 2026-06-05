import Home from './views/home';



import ListagemEquipes from './views/listagem-equipes';
import CadastroEquipes from './views/cadastro-equipes';
import VisualizarEquipes from './views/visualizar-equipes';

import ListagemInscricoes from './views/listagem-inscricoes';
import CadastroInscricoes from './views/cadastro-inscricoes';
import ProcurarInscricoes from './views/procurar-inscricoes';

import ListagemJogadores from './views/listagem-jogadores';
import CadastroJogadores from './views/cadastro-jogadores';
import VisualizarJogadores from './views/visualizar-jogadores';

import Login from './views/login';

import ListagemTorneios from './views/listagem-torneios';
import CadastroTorneios from './views/cadastro-torneios'
import VisualizarTorneios from './views/visualizar-torneios';

import ListagemEscalacoes from './views/listagem-escalacoes';

import CadastroGols from './views/cadastro-gols';
import ListagemGols from './views/listagem-gols';

import ListagemPartidas from './views/listagem-partidas';
import CadastroPartidas from './views/cadastro-partidas';
import VisualizarPartidas from './views/visualizar-partidas';


import ListagemResultados from './views/listagem-resultados';


import ListagemRodadas from './views/listagem-rodadas';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Estatisticas from './views/estatisticas';
import ListagemVermelhos from './views/listagem-cartoes-vermelhos';
import CadastroVermelhos from './views/cadastro-cartoes-vermelhos';

import ListagemJogadoresEquipe from './views/listagem-jogadores-equipe';
import CadastrojogadoresEquipe from './views/cadastro-jogadores-equipe';
import CadastroResultados from './views/cadastro-resultado';


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />

        <Route path="/home" element={<Home />} />


        <Route path="/listagem-equipes" element={<ListagemEquipes />} />
        <Route path="/cadastro-equipes/:idParam?" element={<CadastroEquipes />} />
        <Route path="/visualizar-equipes/:idParam?" element={<VisualizarEquipes />} />

        <Route path="/estatisticas" element={<Estatisticas />} />

        <Route path="/listagem-inscricoes" element={<ListagemInscricoes />} />
        <Route path="/cadastro-inscricoes/:idParam?" element={<CadastroInscricoes />} />
         <Route path="/procurar-inscricoes/:idParam?" element={<ProcurarInscricoes />} />

        <Route path="/listagem-jogadores" element={<ListagemJogadores />} />
        <Route path="/cadastro-jogadores/:idParam?" element={<CadastroJogadores />} />
        <Route path="/visualizar-jogadores/:idParam?" element={<VisualizarJogadores />} />

        <Route path="/login" element={<Login />} />

        <Route path="/listagem-torneios" element={<ListagemTorneios />} />
        <Route path="/cadastro-torneios/:idParam?" element={<CadastroTorneios />} />
        <Route path="/visualizar-torneios/:idParam?" element={<VisualizarTorneios />} />

        <Route path="/listagem-gols" element={<ListagemGols />} />
        <Route path="/cadastro-gols/:idParam?" element={<CadastroGols />} />

        <Route path="/listagem-cartoes-vermelhos" element={<ListagemVermelhos />} />
        <Route path="/cadastro-cartoes-vermelhos/:idParam?" element={<CadastroVermelhos />} />

        <Route path="/listagem-escalacoes" element={<ListagemEscalacoes />} />

        <Route path="/listagem-partidas" element={<ListagemPartidas />} />
        <Route path="/cadastro-partidas" element={<CadastroPartidas />} />
        <Route path="/visualizar-partidas" element={<VisualizarPartidas />} />

        <Route path="/listagem-resultados" element={<ListagemResultados />} />

        <Route path="/listagem-jogadores-equipe/:idEquipe" element={<ListagemJogadoresEquipe />} />
        <Route path="/cadastro-jogadores-equipe/:idEquipe" element={<CadastrojogadoresEquipe />} />

        <Route path="/cadastro-resultados/:idParam?" element={<CadastroResultados />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;