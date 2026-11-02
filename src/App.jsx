import { useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Bot, CalendarClock,
  Check, CheckCircle2, ChevronDown, CircleHelp, Clock3, Command,
  FileText, Filter, LayoutDashboard, Menu, MoreHorizontal, Play,
  Plus, Search, Settings2, ShieldCheck, Sparkles, Users, Workflow,
  X, Zap, Pause, RefreshCw, Mail, MessageSquare, Database, Globe,
  ChevronRight, PanelLeftClose, SlidersHorizontal
} from 'lucide-react';

const initialAutomations = [
  { id: 1, name: 'New lead follow-up', detail: 'Send a welcome email when a lead is added', icon: Mail, color: 'violet', trigger: 'New form submission', runs: 248, success: '98.8%', updated: '2 min ago', active: true },
  { id: 2, name: 'Appointment reminders', detail: 'Remind customers 24 hours before a booking', icon: CalendarClock, color: 'blue', trigger: 'Appointment scheduled', runs: 186, success: '99.4%', updated: '18 min ago', active: true },
  { id: 3, name: 'Support ticket routing', detail: 'Assign new tickets to the right team', icon: MessageSquare, color: 'mint', trigger: 'New support ticket', runs: 92, success: '97.8%', updated: '42 min ago', active: true },
  { id: 4, name: 'Weekly report delivery', detail: 'Compile metrics and email a weekly summary', icon: FileText, color: 'amber', trigger: 'Every Monday · 9:00 AM', runs: 31, success: '100%', updated: 'Yesterday', active: false },
];

const initialActivity = [
  { id: 1, title: 'New lead follow-up', note: 'Welcome email sent to alex.morgan@example.com', time: '2 min ago', status: 'Success', icon: Mail, color: 'violet' },
  { id: 2, title: 'Appointment reminder', note: 'Reminder delivered to Jordan Lee', time: '18 min ago', status: 'Success', icon: CalendarClock, color: 'blue' },
  { id: 3, title: 'Support ticket routing', note: 'Ticket #TK-2048 assigned to Support', time: '42 min ago', status: 'Success', icon: MessageSquare, color: 'mint' },
  { id: 4, title: 'Weekly report delivery', note: 'Automation is paused and waiting for its schedule', time: 'Yesterday', status: 'Paused', icon: FileText, color: 'amber' },
];

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Automations', icon: Workflow, count: '4' },
  { label: 'Clients', icon: Users },
  { label: 'Activity', icon: Activity },
];

function App() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [activity, setActivity] = useState(initialActivity);
  const [activeNav, setActiveNav] = useState('Overview');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [newName, setNewName] = useState('');
  const [newTrigger, setNewTrigger] = useState('New form submission');

  const activeCount = automations.filter(a => a.active).length;
  const filteredAutomations = useMemo(() => automations.filter(a => {
    const matchesQuery = `${a.name} ${a.detail} ${a.trigger}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || (filter === 'Active' ? a.active : !a.active);
    return matchesQuery && matchesFilter;
  }), [automations, query, filter]);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(''), 2800);
  }

  function toggleAutomation(id) {
    const target = automations.find(a => a.id === id);
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
    notify(`${target.name} ${target.active ? 'paused' : 'activated'} · Demo action`);
  }

  function runAutomation(item) {
    const stamp = { id: Date.now(), title: item.name, note: 'Manual test run completed successfully · Demo event', time: 'Just now', status: 'Success', icon: item.icon, color: item.color };
    setActivity(prev => [stamp, ...prev].slice(0, 5));
    setAutomations(prev => prev.map(a => a.id === item.id ? { ...a, runs: a.runs + 1, updated: 'Just now' } : a));
    notify(`${item.name} test run completed`);
  }

  function createAutomation(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const created = { id: Date.now(), name: newName.trim(), detail: 'Custom workflow created in demo mode', icon: Zap, color: 'violet', trigger: newTrigger, runs: 0, success: '—', updated: 'Just now', active: true };
    setAutomations(prev => [created, ...prev]);
    setNewName('');
    setShowNew(false);
    setActiveNav('Automations');
    notify('New automation created · Demo mode');
  }

  const pageTitle = activeNav === 'Overview' ? 'Good afternoon, Alex' : activeNav;
  const pageSubtitle = activeNav === 'Overview' ? "Here's what's happening across your workflows today." : `Manage your ${activeNav.toLowerCase()} in one place.`;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${showMobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><span>N</span></div>
          <div className="brand-name">NEXORA<span>.</span><small>AUTOMATION</small></div>
          <button className="icon-button sidebar-close" onClick={() => setShowMobileNav(false)} aria-label="Close menu"><X size={18}/></button>
        </div>
        <div className="workspace-switch">
          <div className="workspace-avatar">N</div>
          <div className="workspace-copy"><strong>Nexora Workspace</strong><small>Business plan</small></div>
          <ChevronDown size={15} className="muted-icon"/>
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav className="main-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            return <button key={item.label} className={`nav-item ${activeNav === item.label ? 'selected' : ''}`} onClick={() => { setActiveNav(item.label); setShowMobileNav(false); }}>
              <Icon size={18}/><span>{item.label}</span>{item.count && <em>{automations.length}</em>}
            </button>;
          })}
        </nav>
        <div className="nav-label tools-label">TOOLS</div>
        <nav className="main-nav">
          <button className={`nav-item ${activeNav === 'Integrations' ? 'selected' : ''}`} onClick={() => setActiveNav('Integrations')}><Database size={18}/><span>Integrations</span><span className="soon-dot"/></button>
          <button className={`nav-item ${activeNav === 'Settings' ? 'selected' : ''}`} onClick={() => setActiveNav('Settings')}><Settings2 size={18}/><span>Settings</span></button>
        </nav>
        <div className="sidebar-spacer"/>
        <div className="upgrade-card">
          <div className="upgrade-icon"><Sparkles size={16}/></div>
          <strong>Make work flow.</strong>
          <p>Connect your tools and remove repetitive tasks.</p>
          <button onClick={() => notify('Integrations are coming soon in this demo')}>Explore integrations <ArrowUpRight size={14}/></button>
        </div>
        <div className="profile-row">
          <div className="profile-avatar">AM</div>
          <div className="profile-copy"><strong>Alex Morgan</strong><small>Workspace admin</small></div>
          <MoreHorizontal size={18} className="muted-icon"/>
        </div>
      </aside>

      {showMobileNav && <button className="mobile-scrim" onClick={() => setShowMobileNav(false)} aria-label="Close navigation"/>}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setShowMobileNav(true)} aria-label="Open menu"><Menu size={19}/></button>
            <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14}/><strong>{activeNav}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="system-status"><span className="status-pulse"/> All systems operational</div>
            <button className="icon-button notification-button" onClick={() => notify('You are all caught up')} aria-label="Notifications"><Bell size={18}/><i/></button>
            <div className="top-avatar">AM</div>
          </div>
        </header>

        <div className="content-wrap">
          <div className="page-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"/> CONTROL CENTER <span className="demo-tag">DEMO ENVIRONMENT</span></div>
              <h1>{pageTitle}<span className="heading-period">.</span></h1>
              <p>{pageSubtitle}</p>
            </div>
            <div className="heading-actions">
              <button className="secondary-button" onClick={() => notify('Report export is a preview feature')}><FileText size={16}/> Export report</button>
              <button className="primary-button" onClick={() => setShowNew(true)}><Plus size={17}/> New automation</button>
            </div>
          </div>

          {activeNav === 'Overview' || activeNav === 'Automations' ? <>
            <section className="metrics-grid">
              <MetricCard label="Total executions" value="1,284" change="12.8%" trend="up" note="vs. last 30 days" icon={Activity} tone="violet" chart="bars" />
              <MetricCard label="Active automations" value={String(activeCount).padStart(2, '0')} change={`${activeCount} running`} trend="flat" note="of 4 workflows" icon={Workflow} tone="blue" chart="dots" />
              <MetricCard label="Success rate" value="98.6%" change="0.6%" trend="up" note="vs. last 30 days" icon={ShieldCheck} tone="mint" chart="line" />
              <MetricCard label="Time saved" value="42.5h" change="8.4h" trend="up" note="estimated this month" icon={Clock3} tone="amber" chart="clock" />
            </section>

            <section className="dashboard-grid">
              <div className="panel automation-panel">
                <div className="panel-header">
                  <div><div className="panel-title-row"><h2>Automations</h2><span className="count-pill">{automations.length}</span></div><p>Your workflows, all in one place.</p></div>
                  <button className="text-button" onClick={() => setActiveNav('Automations')}>View all <ArrowUpRight size={14}/></button>
                </div>
                <div className="toolbar">
                  <div className="search-box"><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search automations..."/></div>
                  <div className="filter-wrap"><SlidersHorizontal size={14}/><select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter automations"><option>All</option><option>Active</option><option>Paused</option></select><ChevronDown size={13}/></div>
                </div>
                <div className="automation-list">
                  {filteredAutomations.length ? filteredAutomations.map(item => <AutomationRow key={item.id} item={item} onToggle={toggleAutomation} onRun={runAutomation}/>) : <div className="empty-state"><Search size={22}/><strong>No workflows found</strong><span>Try another search or filter.</span></div>}
                </div>
                <div className="panel-footer"><span>Showing {filteredAutomations.length} of {automations.length} automations</span><button onClick={() => setShowNew(true)}>Create workflow <Plus size={14}/></button></div>
              </div>

              <div className="right-column">
                <div className="panel activity-panel">
                  <div className="panel-header compact"><div><h2>Recent activity</h2><p>Latest workflow events.</p></div><button className="icon-button small" onClick={() => notify('Activity is up to date')} aria-label="Refresh activity"><RefreshCw size={15}/></button></div>
                  <div className="activity-list">
                    {activity.slice(0, 4).map(event => { const Icon = event.icon; return <div className="activity-item" key={event.id}>
                      <div className={`activity-icon ${event.color}`}><Icon size={15}/></div>
                      <div className="activity-copy"><strong>{event.title}</strong><p>{event.note}</p><span>{event.time}</span></div>
                      <span className={`activity-status ${event.status === 'Success' ? 'success' : 'paused'}`}>{event.status === 'Success' ? <CheckCircle2 size={12}/> : <Pause size={11}/>}</span>
                    </div>; })}
                  </div>
                  <button className="panel-bottom-link" onClick={() => setActiveNav('Activity')}>View activity log <ArrowUpRight size={14}/></button>
                </div>
                <div className="insight-card">
                  <div className="insight-top"><div className="insight-icon"><Sparkles size={16}/></div><span>WORKFLOW INSIGHT</span><MoreHorizontal size={17}/></div>
                  <h3>Small tasks.<br/><em>Big momentum.</em></h3>
                  <p>Your automations are estimated to save your team over <strong>42 hours</strong> this month.</p>
                  <div className="insight-progress"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
                  <div className="insight-bottom"><span>MONTHLY TIME SAVED</span><strong>42.5h <ArrowUpRight size={14}/></strong></div>
                </div>
              </div>
            </section>

            <section className="bottom-strip">
              <div className="bottom-strip-icon"><Zap size={17}/></div>
              <div><strong>Ready to connect your tools?</strong><p>Bring your apps together and let your workflows do the busywork.</p></div>
              <button onClick={() => setActiveNav('Integrations')}>Browse integrations <ArrowUpRight size={14}/></button>
            </section>
          </> : <SecondaryPage name={activeNav} onCreate={() => setShowNew(true)} onNotify={notify}/ >}

          <footer className="page-footer"><span>© 2026 NEXORA AUTOMATION</span><span><span className="footer-dot"/> Demo workspace · Sample data only</span><button onClick={() => notify('Help center preview') }><CircleHelp size={14}/> Help center</button></footer>
        </div>
      </main>

      {showNew && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setShowNew(false)}><form className="modal" onSubmit={createAutomation}>
        <div className="modal-head"><div><span className="modal-kicker">WORKFLOW BUILDER</span><h2>Create automation</h2><p>Set up a new workflow in your demo workspace.</p></div><button type="button" className="icon-button" onClick={() => setShowNew(false)} aria-label="Close"><X size={18}/></button></div>
        <label className="field-label">Automation name<input autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Customer welcome sequence" required/></label>
        <label className="field-label">Trigger<select value={newTrigger} onChange={e => setNewTrigger(e.target.value)}><option>New form submission</option><option>New appointment booked</option><option>New support ticket</option><option>Schedule-based trigger</option></select></label>
        <div className="modal-note"><ShieldCheck size={16}/><span>This creates a local demo workflow only. No external service will be contacted.</span></div>
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowNew(false)}>Cancel</button><button className="primary-button" type="submit"><Plus size={16}/> Create workflow</button></div>
      </form></div>}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  );
}

function MetricCard({ label, value, change, trend, note, icon: Icon, tone, chart }) {
  return <div className="metric-card"><div className="metric-top"><span>{label}</span><div className={`metric-icon ${tone}`}><Icon size={17}/></div></div><div className="metric-value">{value}</div><div className="metric-bottom"><span className={`metric-change ${trend}`} >{trend === 'up' ? <ArrowUpRight size={13}/> : <Check size={12}/>} {change}</span><span>{note}</span></div><div className={`metric-decoration ${chart}`} aria-hidden="true">{chart === 'bars' ? Array.from({length: 9}, (_, i) => <i key={i} style={{height: `${24 + ((i * 17) % 43)}%`}}/>) : chart === 'dots' ? Array.from({length: 9}, (_, i) => <i key={i}/>) : chart === 'line' ? <svg viewBox="0 0 120 34" preserveAspectRatio="none"><path d="M0 28 C12 26 14 12 27 18 S43 30 55 17 S74 18 83 11 S103 15 120 2"/></svg> : <Clock3 size={49}/>}</div></div>;
}

function AutomationRow({ item, onToggle, onRun }) {
  const Icon = item.icon;
  return <div className="automation-row"><div className={`automation-icon ${item.color}`}><Icon size={18}/></div><div className="automation-main"><div className="automation-name-line"><strong>{item.name}</strong><span className={`status-label ${item.active ? 'active' : 'paused'}`}><i/>{item.active ? 'Active' : 'Paused'}</span></div><p>{item.detail}</p><div className="automation-meta"><span><Zap size={12}/>{item.trigger}</span><span><Activity size={12}/>{item.runs} runs</span><span><CheckCircle2 size={12}/>{item.success}</span></div></div><div className="automation-last"><span>LAST RUN</span><strong>{item.updated}</strong></div><div className="row-actions"><button className="run-button" disabled={!item.active} onClick={() => onRun(item)} title={item.active ? 'Run test' : 'Activate this workflow first'}><Play size={13}/></button><button className={`toggle ${item.active ? 'on' : ''}`} onClick={() => onToggle(item.id)} aria-label={item.active ? 'Pause automation' : 'Activate automation'}><i/></button></div></div>;
}

function SecondaryPage({ name, onCreate, onNotify }) {
  const config = {
    Clients: { icon: Users, title: 'Your client space', text: 'Keep customer relationships and workflow ownership organized.', items: [['BrightNest Cleaning Co.','Cleaning services','3 workflows'],['Northstar Studio','Creative agency','2 workflows'],['Summit Property Group','Property management','1 workflow']] },
    Activity: { icon: Activity, title: 'Activity timeline', text: 'A clear history of what your workflows have been doing.', items: [['New lead follow-up','Email delivered successfully','2 min ago'],['Appointment reminders','Customer notification sent','18 min ago'],['Support ticket routing','Ticket assigned to Support','42 min ago'],['Weekly report delivery','Workflow paused','Yesterday']] },
    Integrations: { icon: Database, title: 'Connect your toolkit', text: 'Integrations are presented as product previews in this demo.', items: [['Email & communication','Connect email and messaging tools','Coming soon'],['Scheduling & calendars','Keep bookings and reminders in sync','Coming soon'],['CRM & databases','Keep customer records up to date','Coming soon']] },
    Settings: { icon: Settings2, title: 'Workspace preferences', text: 'Demo workspace settings and profile details.', items: [['Workspace name','Nexora Workspace','Demo'],['Notifications','Workflow status updates','Enabled'],['Security','Sample data environment','Protected']] },
  };
  const data = config[name] || config.Integrations;
  const Icon = data.icon;
  return <section className="secondary-page"><div className="secondary-hero"><div className="secondary-hero-icon"><Icon size={23}/></div><div><h2>{data.title}</h2><p>{data.text}</p></div>{name === 'Automations' && <button className="primary-button" onClick={onCreate}><Plus size={16}/> New automation</button>}</div><div className="secondary-list">{data.items.map((item, i) => <div className="secondary-list-row" key={item[0]}><div className="secondary-list-icon"><Icon size={17}/></div><div><strong>{item[0]}</strong><p>{item[1]}</p></div><span>{item[2]}</span><ChevronRight size={16}/></div>)}</div><div className="secondary-hint"><Sparkles size={17}/><span>This is an interactive portfolio demo. Connectors and customer data are not connected to live services.</span><button onClick={() => onNotify('Thanks for exploring NEXORA Automation')}>Got it</button></div></section>;
}

export default App;
