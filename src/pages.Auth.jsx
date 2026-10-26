import { useState } from 'react';
import { Link } from 'react-router-dom';

function getUsers() {
  try { return JSON.parse(localStorage.getItem('ssk-users')) || []; }
  catch { return []; }
}

function AuthShell({ children, heading, subheading, mode }) {
  return (
    <div className="auth-screen">
      <div className="auth-aside">
        <div className="auth-brand"><div className="brand-mark">S<span>K</span></div><span>Student Survival Kit</span></div>
        <div className="auth-hero">
          <span className="eyebrow">YOUR CAMPUS COMPANION</span>
          <h1>Make student life<br /><em>a little easier.</em></h1>
          <p>Study smarter, stay organized, keep track of your goals, and make the most of campus life.</p>
          <div className="auth-feature-list"><span>✓ Study and productivity tools</span><span>✓ Simple student calculators</span><span>✓ Campus resources in one place</span></div>
        </div>
        <div className="auth-aside-bottom">A practical project built with React.</div>
      </div>
      <div className="auth-main">
        <div className="auth-card">
          <div className="auth-card-icon">✦</div>
          <span className="eyebrow">WELCOME {mode === 'signup' ? 'ABOARD' : 'BACK'}</span>
          <h2>{heading}</h2><p className="muted auth-subtitle">{subheading}</p>
          {children}
          <div className="auth-switch">{mode === 'signup' ? <>Already have an account? <Link to="/login">Log in</Link></> : <>New here? <Link to="/signup">Create an account</Link></>}</div>
          <div className="auth-demo-note">Demo project notice: account details are saved only in this browser and this is not secure production authentication.</div>
        </div>
      </div>
    </div>
  );
}

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const user = getUsers().find(item => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!user) { setError('We could not find that account. Create an account first or use Demo Login.'); return; }
    onLogin({ name: user.name, email: user.email });
  }

  function demoLogin() {
    onLogin({ name: 'Demo Student', email: 'demo@student.local' });
  }

  return (
    <AuthShell mode="login" heading="Welcome back" subheading="Log in to open your student workspace.">
      <form className="form-stack" onSubmit={submit}>
        <label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Password<input required type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} /></label>
        {error && <div className="alert alert-error">{error}</div>}
        <button className="button button-primary button-wide" type="submit">Log in <span>→</span></button>
      </form>
      <div className="auth-divider"><span>or</span></div>
      <button className="button button-secondary button-wide" type="button" onClick={demoLogin}>Continue with Demo Student</button>
    </AuthShell>
  );
}

export function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (password.length < 6) { setError('Use at least 6 characters for this demo password.'); return; }
    const users = getUsers();
    if (users.some(item => item.email.toLowerCase() === email.trim().toLowerCase())) { setError('An account with this email already exists. Please log in.'); return; }
    const nextUser = { name: name.trim(), email: email.trim(), password };
    localStorage.setItem('ssk-users', JSON.stringify([...users, nextUser]));
    onSignup({ name: nextUser.name, email: nextUser.email });
  }

  return (
    <AuthShell mode="signup" heading="Create your account" subheading="Set up your workspace in just a moment.">
      <form className="form-stack" onSubmit={submit}>
        <label>Full name<input required minLength="2" autoComplete="name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} /></label>
        <label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Password<input required minLength="6" type="password" autoComplete="new-password" placeholder="At least 6 characters" value={password} onChange={e => setPassword(e.target.value)} /></label>
        {error && <div className="alert alert-error">{error}</div>}
        <button className="button button-primary button-wide" type="submit">Create account <span>→</span></button>
      </form>
    </AuthShell>
  );
}
