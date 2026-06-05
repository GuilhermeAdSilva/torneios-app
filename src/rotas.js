import Home from './views/home';

import ListagemArbitros from './views/listagem-arbitros';
import CadastroArbitros from './views/cadastro-arbitros';
import VisualizarArbitros from './views/visualizar-arbitros';

import ListagemAssociacoesEsportivas from './views/listagem-associacoes-esportivas';
import CadastroAssociacoesEsportivas from './views/cadastro-associacoes-esportivas';
import VisualizarAssociacoesEsportivas from './views/visualizar-associacoes-esportivas';

import ListagemCompeticoes from './views/listagem-competicoes';
import CadastroCompeticoes from './views/cadastro-competicoes';
import VisualizarCompeticoes from './views/visualizar-competicoes';

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

import ListagemPresidentes from './views/listagem-presidentes';
import CadastroPresidentes from './views/cadastro-presidentes';
import VisualizarPresidentes from './views/visualizar-presidentes';

import ListagemTecnicos from './views/listagem-tecnicos';
import CadastroTecnicos from './views/cadastro-tecnicos';
import VisualizarTecnicos from './views/visualizar-tecnicos';

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
import ListagemAssistencias from './views/listagem-assistencias';
import CadastroAssistencias from './views/cadastro-assistencias';
import ListagemAmarelos from './views/listagem-cartoes-amarelos';
import CadastroAmarelos from './views/cadastro-cartoes-amarelos';
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

        <Route path="/listagem-arbitros" element={<ListagemArbitros />} />
        <Route path="/cadastro-arbitros/:idParam?" element={<CadastroArbitros />} />
        <Route path="/visualizar-arbitros/:idParam?" element={<VisualizarArbitros />} />

        <Route path="/listagem-associacoes-esportivas" element={<ListagemAssociacoesEsportivas />} />
        <Route path="/cadastro-associacoes-esportivas/:idParam?" element={<CadastroAssociacoesEsportivas />} />
        <Route path="/visualizar-associacoes-esportivas/:idParam?" element={<VisualizarAssociacoesEsportivas />} />

        <Route path="/listagem-competicoes" element={<ListagemCompeticoes />} />
        <Route path="/cadastro-competicoes/:idParam?" element={<CadastroCompeticoes />} />
        <Route path="/visualizar-competicoes/:idParam?" element={<VisualizarCompeticoes />} />

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

        <Route path="/listagem-presidentes" element={<ListagemPresidentes />} />
        <Route path="/cadastro-presidentes/:idParam?" element={<CadastroPresidentes />} />
        <Route path="/visualizar-presidentes/:idParam?" element={<VisualizarPresidentes />} />

        <Route path="/listagem-tecnicos" element={<ListagemTecnicos />} />
        <Route path="/cadastro-tecnicos/:idParam?" element={<CadastroTecnicos />} />
        <Route path="/visualizar-tecnicos/:idParam?" element={<VisualizarTecnicos />} />

        <Route path="/listagem-torneios" element={<ListagemTorneios />} />
        <Route path="/cadastro-torneios/:idParam?" element={<CadastroTorneios />} />
        <Route path="/visualizar-torneios/:idParam?" element={<VisualizarTorneios />} />

        <Route path="/listagem-assistencias" element={<ListagemAssistencias />} />
        <Route path="/cadastro-assistencias/:idParam?" element={<CadastroAssistencias />} />

        <Route path="/listagem-gols" element={<ListagemGols />} />
        <Route path="/cadastro-gols/:idParam?" element={<CadastroGols />} />

        <Route path="/listagem-cartoes-amarelos" element={<ListagemAmarelos />} />
        <Route path="/cadastro-cartoes-amarelos/:idParam?" element={<CadastroAmarelos />} />

        <Route path="/listagem-cartoes-vermelhos" element={<ListagemVermelhos />} />
        <Route path="/cadastro-cartoes-vermelhos/:idParam?" element={<CadastroVermelhos />} />

        <Route path="/listagem-escalacoes" element={<ListagemEscalacoes />} />

        <Route path="/listagem-partidas" element={<ListagemPartidas />} />
        <Route path="/cadastro-partidas" element={<CadastroPartidas />} />
        <Route path="/visualizar-partidas" element={<VisualizarPartidas />} />

        <Route path="/listagem-resultados" element={<ListagemResultados />} />
        <Route path="/listagem-rodadas" element={<ListagemRodadas />} />

        <Route path="/listagem-jogadores-equipe/:idEquipe" element={<ListagemJogadoresEquipe />} />
        <Route path="/cadastro-jogadores-equipe/:idEquipe" element={<CadastrojogadoresEquipe />} />

        <Route path="/cadastro-resultados/:idParam?" element={<CadastroResultados />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;