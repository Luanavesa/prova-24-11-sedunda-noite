import { useEffect, useState } from 'react';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || '/chamado/listar');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || '/chamado/listar');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case '/chamado/listar':
        return <ListarPage />;
      case '/chamado/cadastrar':
        return <CadastrarPage />;
      case '/chamado/alterar':
        return <AlterarPage />;
      case '/chamado/naoresolvido':
        return <NaoResolvidoPage />;
      case '/chamado/abertos':
        return <AbertosPage />;
      case '/chamado/resolvidos':
        return <ResolvidosPage />;
      default:
        return <ListarPage />;
    }
  };

  return (
    <>
      <nav>
        <h1>Gerenciamento de Chamados</h1>
        <a href="#/chamado/listar">Listar Todos</a>
        <a href="#/chamado/cadastrar">Cadastrar</a>
        <a href="#/chamado/alterar">Alterar Status</a>
        <a href="#/chamado/abertos">Abertos</a>
        <a href="#/chamado/naoresolvido">Não Resolvidos</a>
        <a href="#/chamado/resolvidos">Resolvidos</a>
      </nav>
      <div className="page">
        {renderPage()}
      </div>
    </>
  );
}

// Listar Page
function ListarPage() {
  const [chamados, setChamados] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/chamado/listar')
      .then(res => res.json())
      .then(data => setChamados(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Todos os Chamados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(c => (
            <tr key={c.ChamadoId}>
              <td>{c.ChamadoId.substring(0, 8)}...</td>
              <td>{c.Descricao}</td>
              <td>
                <span className={`status-badge status-${c.Status.toLowerCase().replace(' ', '-')}`}>
                  {c.Status}
                </span>
              </td>
              <td>{new Date(c.CriadoEm).toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// Cadastrar Page
function CadastrarPage() {
  const [descricao, setDescricao] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/api/chamado/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Descricao: descricao })
    })
      .then(res => {
        if (res.ok) {
          setMessage('Chamado cadastrado!');
          setDescricao('');
        } else {
          setMessage('Erro ao cadastrar');
        }
      })
      .catch(() => setMessage('Erro ao cadastrar'));
  };

  return (
    <>
      <h2>Cadastrar Novo Chamado</h2>
      <form onSubmit={handleSubmit}>
        <label>Descrição do Problema:</label>
        <textarea
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          placeholder="Descreva o problema..."
          required
        />
        <button type="submit">Cadastrar Chamado</button>
        {message && <p className={message.includes('✅') ? 'success' : 'error'}>{message}</p>}
      </form>
    </>
  );
}

// Alterar Page
function AlterarPage() {
  const [chamados, setChamados] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const loadChamados = () => {
    fetch('http://localhost:5000/api/chamado/naoresolvido')
      .then(res => res.json())
      .then(data => setChamados(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadChamados();
  }, []);

  const handleAlterar = (chamadoId: string) => {
    fetch('http://localhost:5000/api/chamado/alterar', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ChamadoId: chamadoId })
    })
      .then(res => {
        if (res.ok) {
          setMessage('Status alterado!');
          loadChamados();
        } else {
          setMessage('Erro ao alterar');
        }
      })
      .catch(() => setMessage('Erro ao alterar'));
  };

  return (
    <>
      <h2>Alterar Status de Chamado</h2>
      {message && <p className={message.includes('✅') ? 'success' : 'error'}>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status Atual</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(c => (
            <tr key={c.ChamadoId}>
              <td>{c.ChamadoId.substring(0, 8)}...</td>
              <td>{c.Descricao}</td>
              <td>
                <span className={`status-badge status-${c.Status.toLowerCase().replace(' ', '-')}`}>
                  {c.Status}
                </span>
              </td>
              <td>
                <button className="alterar-btn" onClick={() => handleAlterar(c.ChamadoId)}>
                  Avançar Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// Abertos Page
function AbertosPage() {
  const [chamados, setChamados] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/chamado/abertos')
      .then(res => res.json())
      .then(data => setChamados(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Chamados Abertos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(c => (
            <tr key={c.ChamadoId}>
              <td>{c.ChamadoId.substring(0, 8)}...</td>
              <td>{c.Descricao}</td>
              <td>
                <span className="status-badge status-aberto">
                  {c.Status}
                </span>
              </td>
              <td>{new Date(c.CriadoEm).toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// NaoResolvido Page
function NaoResolvidoPage() {
  const [chamados, setChamados] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/chamado/naoresolvido')
      .then(res => res.json())
      .then(data => setChamados(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Chamados Não Resolvidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(c => (
            <tr key={c.ChamadoId}>
              <td>{c.ChamadoId.substring(0, 8)}...</td>
              <td>{c.Descricao}</td>
              <td>
                <span className={`status-badge status-${c.Status.toLowerCase().replace(' ', '-')}`}>
                  {c.Status}
                </span>
              </td>
              <td>{new Date(c.CriadoEm).toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// Resolvidos Page
function ResolvidosPage() {
  const [chamados, setChamados] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/chamado/resolvidos')
      .then(res => res.json())
      .then(data => setChamados(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Chamados Resolvidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map(c => (
            <tr key={c.ChamadoId}>
              <td>{c.ChamadoId.substring(0, 8)}...</td>
              <td>{c.Descricao}</td>
              <td>
                <span className="status-badge status-resolvido">
                  {c.Status}
                </span>
              </td>
              <td>{new Date(c.CriadoEm).toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
