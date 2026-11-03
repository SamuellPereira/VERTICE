
import {
  ShieldCheck,
  LayoutDashboard,
  ArrowLeftRight,
  AlertTriangle,
  Users,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  ShieldAlert,
  CircleCheck,
  Clock3,
  MoreHorizontal,
  Zap,
  Eye,
  Menu,
} from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useState } from 'react';
import './App.css';

const chartData = [
  { time: '08h', transactions: 120 },
  { time: '09h', transactions: 180 },
  { time: '10h', transactions: 145 },
  { time: '11h', transactions: 290 },
  { time: '12h', transactions: 230 },
  { time: '13h', transactions: 350 },
  { time: '14h', transactions: 280 },
  { time: '15h', transactions: 420 },
  { time: '16h', transactions: 380 },
  { time: '17h', transactions: 510 },
];

const transactions = [
  { id: 'TRX-82941', name: 'Carlos Mendes', initials: 'CM', type: 'Pix enviado', value: 'R$ 850,00', time: '15:42:08', status: 'Aprovada', risk: 'Baixo' },
  { id: 'TRX-82940', name: 'Mariana Costa', initials: 'MC', type: 'Pix recebido', value: 'R$ 2.450,00', time: '15:41:52', status: 'Em análise', risk: 'Alto' },
  { id: 'TRX-82939', name: 'Rafael Oliveira', initials: 'RO', type: 'Transferência', value: 'R$ 5.200,00', time: '15:41:21', status: 'Bloqueada', risk: 'Crítico' },
  { id: 'TRX-82938', name: 'Ana Beatriz', initials: 'AB', type: 'Pix enviado', value: 'R$ 120,00', time: '15:40:59', status: 'Aprovada', risk: 'Baixo' },
  { id: 'TRX-82937', name: 'Lucas Ferreira', initials: 'LF', type: 'Pix enviado', value: 'R$ 3.800,00', time: '15:40:12', status: 'Em análise', risk: 'Médio' },
];

const alerts = [
  { title: 'Transação fora do padrão', description: 'Mariana Costa • R$ 2.450,00', level: 'Alto', time: 'Há 2 min' },
  { title: 'Dispositivo não reconhecido', description: 'Rafael Oliveira • Novo acesso', level: 'Crítico', time: 'Há 5 min' },
  { title: 'Frequência de transações elevada', description: 'Carlos Mendes • 8 operações', level: 'Médio', time: 'Há 12 min' },
];

function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [period, setPeriod] = useState('Hoje');
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Transações', icon: ArrowLeftRight },
    { name: 'Alertas', icon: AlertTriangle },
    { name: 'Clientes', icon: Users },
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon"><ShieldCheck size={25} /></div>
          <div>
            <h1>VÉRTICE</h1>
            <span>FRAUD INTELLIGENCE</span>
          </div>
        </div>

        <div className="workspace">
          <div className="workspace-avatar">V</div>
          <div className="workspace-info">
            <strong>Vértice Financial</strong>
            <span>Ambiente de demonstração</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <span className="nav-label">MENU PRINCIPAL</span>

        <nav>
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? 'active' : ''}`}
              onClick={() => {
                setActivePage(name);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} />
              <span>{name}</span>
              {name === 'Alertas' && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={19} />
            <span>Configurações</span>
          </button>
          <div className="user-profile">
            <div className="user-avatar">SP</div>
            <div className="user-info">
              <strong>Samuel Pereira</strong>
              <span>Administrador</span>
            </div>
            <MoreHorizontal size={19} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)}>
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>{activePage}</strong>
          </div>
          <div className="topbar-actions">
            <div className="system-status">
              <span className="live-dot" />
              Sistemas operacionais
            </div>
            <button className="icon-button" aria-label="Pesquisar"><Search size={19} /></button>
            <button className="icon-button notification-button" aria-label="Notificações">
              <Bell size={19} />
              <span />
            </button>
            <div className="top-avatar">SP</div>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="eyebrow"><Activity size={14} /> CENTRAL DE MONITORAMENTO</div>
              <h2>Visão geral</h2>
              <p>Acompanhe a atividade financeira e identifique riscos em tempo real.</p>
            </div>
            <div className="heading-actions">
              <span className="demo-tag">DEMO ENVIRONMENT</span>
              <button className="period-select" onClick={() => setPeriod(period === 'Hoje' ? 'Últimos 7 dias' : 'Hoje')}>
                {period} <ChevronDown size={15} />
              </button>
            </div>
          </section>

          <section className="metrics-grid">
            <MetricCard title="Transações processadas" value="24.891" change="+12,8%" icon={<ArrowLeftRight />} positive />
            <MetricCard title="Transações aprovadas" value="23.742" change="95,4%" icon={<CircleCheck />} positive />
            <MetricCard title="Alertas identificados" value="187" change="+8,2%" icon={<ShieldAlert />} />
            <MetricCard title="Valor sob análise" value="R$ 42,8 mil" change="12 pendentes" icon={<Clock3 />} />
          </section>

          <section className="dashboard-grid">
            <div className="panel chart-panel">
              <div className="panel-heading">
                <div>
                  <h3>Volume de transações</h3>
                  <p>Movimentações processadas ao longo do dia</p>
                </div>
                <button className="icon-button"><MoreHorizontal size={20} /></button>
              </div>
              <div className="chart-legend">
                <span className="legend-dot" /> Transações processadas
              </div>
              <div className="chart-area">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#12d8e8" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="#12d8e8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#617184" tickLine={false} axisLine={false} />
                    <YAxis stroke="#617184" tickLine={false} axisLine={false} width={35} />
                    <Tooltip contentStyle={{ background: '#142434', border: '1px solid #263d50', borderRadius: 10, color: '#fff' }} />
                    <Area type="monotone" dataKey="transactions" stroke="#12d8e8" strokeWidth={2.5} fill="url(#chartGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="panel security-panel">
              <div className="panel-heading">
                <div>
                  <h3>Índice de segurança</h3>
                  <p>Eficiência geral do monitoramento</p>
                </div>
                <ShieldCheck size={20} className="cyan-icon" />
              </div>
              <div className="security-score">
                <div className="score-ring">
                  <div>
                    <strong>98,2</strong>
                    <span>/ 100</span>
                  </div>
                </div>
              </div>
              <div className="security-status">
                <span className="live-dot" />
                Nível de segurança excelente
              </div>
              <div className="security-details">
                <div><span>Operações aprovadas</span><strong>95,4%</strong></div>
                <div><span>Alertas em análise</span><strong>12</strong></div>
                <div><span>Bloqueios preventivos</span><strong>23</strong></div>
              </div>
            </div>
          </section>

          <section className="lower-grid">
            <div className="panel transactions-panel">
              <div className="panel-heading">
                <div>
                  <h3>Transações recentes</h3>
                  <p>Últimas movimentações recebidas pela plataforma</p>
                </div>
                <button className="text-button" onClick={() => setActivePage('Transações')}>Ver todas <ArrowUpRight size={15} /></button>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>CLIENTE</th>
                      <th>TIPO</th>
                      <th>VALOR</th>
                      <th>STATUS</th>
                      <th>RISCO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>
                          <div className="client-cell">
                            <div className="client-avatar">{tx.initials}</div>
                            <div><strong>{tx.name}</strong><span>{tx.id}</span></div>
                          </div>
                        </td>
                        <td>{tx.type}</td>
                        <td className="value-cell">{tx.value}</td>
                        <td><StatusBadge status={tx.status} /></td>
                        <td><RiskBadge risk={tx.risk} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel alerts-panel">
              <div className="panel-heading">
                <div>
                  <h3>Alertas recentes</h3>
                  <p>Eventos que exigem atenção</p>
                </div>
                <span className="alert-counter">03</span>
              </div>
              <div className="alerts-list">
                {alerts.map((alert, index) => (
                  <div className="alert-item" key={index}>
                    <div className={`alert-icon ${alert.level.toLowerCase()}`}>
                      <AlertTriangle size={17} />
                    </div>
                    <div className="alert-info">
                      <strong>{alert.title}</strong>
                      <span>{alert.description}</span>
                      <small>{alert.time}</small>
                    </div>
                    <RiskBadge risk={alert.level} />
                  </div>
                ))}
              </div>
              <button className="all-alerts-button" onClick={() => setActivePage('Alertas')}>Acessar central de alertas <ArrowUpRight size={15} /></button>
            </div>
          </section>

          <footer>
            <span>© 2026 VÉRTICE Financial Intelligence</span>
            <span><Zap size={13} /> Plataforma demonstrativa • Dados fictícios</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, change, icon, positive }: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <div className="panel metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <div className="metric-icon">{icon}</div>
      </div>
      <strong className="metric-value">{value}</strong>
      <div className={`metric-change ${positive ? 'positive' : ''}`}>
        {positive && <ArrowUpRight size={14} />}
        {change}
        <span>{positive ? ' em relação ao período anterior' : ''}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className = status === 'Aprovada' ? 'approved' : status === 'Bloqueada' ? 'blocked' : 'pending';
  return <span className={`status-badge ${className}`}>{status}</span>;
}

function RiskBadge({ risk }: { risk: string }) {
  return <span className={`risk-badge ${risk.toLowerCase()}`}>{risk}</span>;
}

export default App;
