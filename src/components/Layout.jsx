import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

const groups = [
  {
    title: 'Workspace',
    links: [
      { to: '/', icon: '⌂', label: 'Dashboard' },
      { to: '/study', icon: '📚', label: 'Study Hub' },
      { to: '/pomodoro', icon: '⏱️', label: 'Pomodoro Timer' },
      { to: '/books', icon: '📖', label: 'Book Library' },
      { to: '/todo', icon: '☑️', label: 'To-Do List' },
      { to: '/planner', icon: '🗓️', label: 'Study Planner' },
    ],
  },
  {
    title: 'Student Tools',
    links: [
      { to: '/budget', icon: '₹', label: 'Budget Calculator' },
      { to: '/attendance', icon: '📊', label: 'Attendance' },
      { to: '/cgpa', icon: '🎓', label: 'CGPA Calculator' },
      { to: '/events', icon: '🎟️', label: 'Events & Clubs' },
      { to: '/food', icon: '🍱', label: 'Campus Food Guide' },
      { to: '/packing', icon: '🎒', label: 'Packing Checklist' },
      { to: '/team-finder', icon: '🤝', label: 'Team Finder' },
    ],
  },
  {
    title: 'Campus & Support',
    links: [
      { to: '/transport', icon: '🚌', label: 'Transport' },
      { to: '/campus', icon: '🗺️', label: 'Campus Map' },
      { to: '/lost-found', icon: '🔎', label: 'Lost & Found' },
      { to: '/emergency', icon: '🆘', label: 'Emergency Support' },
      { to: '/reviews', icon: '⭐', label: 'Reviews & Feedback' },
      { to: '/assistant', icon: '💬', label: 'Student Assistant' },
    ],
  },
];

export function Layout({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const filteredGroups = useMemo(() => groups.map(group => ({
    ...group,
    links: group.links.filter(link => link.label.toLowerCase().includes(query.toLowerCase())),
  })).filter(group => group.links.length), [query]);
  const currentTitle = groups.flatMap(group => group.links).find(link => link.to === location.pathname)?.label || 'Student Survival Kit';

  return (
    <div className="app-shell">
      {menuOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark">S<span>K</span></div>
          <div><strong>Student Survival Kit</strong><small>Campus life, organized.</small></div>
        </div>
        <div className="nav-search"><span>⌕</span><input aria-label="Filter navigation" placeholder="Find a tool..." value={query} onChange={e => setQuery(e.target.value)} /></div>
        <nav className="side-nav">
          {filteredGroups.map(group => (
            <div className="nav-group" key={group.title}>
              <p className="nav-group-title">{group.title}</p>
              {group.links.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                  <span className="nav-icon">{link.icon}</span><span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
          {!filteredGroups.length && <p className="muted nav-empty">No matching tools.</p>}
        </nav>
        <div className="sidebar-bottom">
          <div className="profile-mini"><div className="avatar">{(user?.name || 'S').slice(0, 1).toUpperCase()}</div><div className="profile-copy"><strong>{user?.name || 'Student'}</strong><small>Student account</small></div><button className="icon-button" title="Log out" onClick={onLogout}>↪</button></div>
          <div className="eval-badge"><span className="status-dot" /> React Edition · Evaluations 1 + 2</div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
          <div className="breadcrumbs"><span>Student Survival Kit</span><b>/</b><strong>{currentTitle}</strong></div>
          <div className="topbar-right"><span className="today-label">Your student workspace</span><div className="avatar avatar-small">{(user?.name || 'S').slice(0, 1).toUpperCase()}</div></div>
        </header>
        <div className="page-content"><Outlet /></div>
        <footer className="site-footer">Built with React · JSX · React Router · Hooks · Local Storage <span>Student Survival Kit</span></footer>
      </main>
    </div>
  );
}
