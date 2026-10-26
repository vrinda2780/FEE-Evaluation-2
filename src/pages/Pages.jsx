import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, makeId, useLocalStorage } from '../utils.js';

function PageHeading({ eyebrow = 'STUDENT WORKSPACE', title, description, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="heading-action">{action}</div>}</div>;
}

function Card({ title, subtitle, className = '', children, action }) {
  return <section className={`panel ${className}`}><div className="panel-header"><div>{title && <h2>{title}</h2>}{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>;
}

function StatCard({ icon, label, value, note, tone = 'blue' }) {
  return <div className="stat-card"><div className={`stat-icon stat-${tone}`}>{icon}</div><div><p>{label}</p><strong>{value}</strong>{note && <small>{note}</small>}</div></div>;
}

function EmptyState({ title = 'Nothing here yet', detail = 'Add an item to get started.' }) {
  return <div className="empty-state"><div>✦</div><strong>{title}</strong><p>{detail}</p></div>;
}

function TextField({ label, value, onChange, placeholder, type = 'text', min, max, step, required = false }) {
  return <label className="field-label">{label}<input type={type} value={value} onChange={onChange} placeholder={placeholder} min={min} max={max} step={step} required={required} /></label>;
}

const quickLinks = [
  { to: '/study', icon: '📚', title: 'Study Hub', text: 'Notes, links and revision resources', tone: 'lavender' },
  { to: '/todo', icon: '☑️', title: 'My Tasks', text: 'Keep assignments on track', tone: 'mint' },
  { to: '/attendance', icon: '📊', title: 'Attendance', text: 'Check your current percentage', tone: 'peach' },
  { to: '/budget', icon: '₹', title: 'Budget', text: 'See where your money goes', tone: 'sky' },
  { to: '/planner', icon: '🗓️', title: 'Planner', text: 'Upcoming tests and deadlines', tone: 'rose' },
  { to: '/assistant', icon: '💬', title: 'Student Assistant', text: 'Get quick project tips', tone: 'butter' },
];

export function Dashboard({ user }) {
  const [tasks] = useLocalStorage('ssk-todos', []);
  const [planner] = useLocalStorage('ssk-planner', []);
  const [registered] = useLocalStorage('ssk-registered-events', []);
  const pendingTasks = tasks.filter(task => !task.done).length;
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  const upcoming = planner.filter(item => item.date && item.date >= new Date().toISOString().slice(0, 10)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return <>
    <PageHeading eyebrow="YOUR STUDENT DASHBOARD" title={`Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, ${(user?.name || 'Student').split(' ')[0]} 👋`} description={`${today} · Here's your space to study, plan, and reset.`} />
    <section className="hero-banner"><div className="hero-text"><span className="hero-pill"><span className="status-dot" /> YOUR CAMPUS COMPANION</span><h2>Everything you need.<br /><em>One student-friendly space.</em></h2><p>Build a better routine, keep an eye on deadlines, and make student life feel more manageable.</p><Link to="/planner" className="button button-light">Plan your week <span>→</span></Link></div><div className="hero-graphic"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-book">📚</div><span className="floating-chip chip-one">✦ Focus</span><span className="floating-chip chip-two">✓ To-do</span><span className="floating-chip chip-three">☕ Break</span></div></section>
    <div className="stats-grid"><StatCard icon="☑️" label="Open tasks" value={pendingTasks} note={`${tasks.length} total tasks`} tone="mint" /><StatCard icon="🗓️" label="Upcoming deadlines" value={upcoming.length} note="Next items in your planner" tone="blue" /><StatCard icon="🎟️" label="Events joined" value={registered.length} note="Saved on this device" tone="peach" /><StatCard icon="⚡" label="Student toolkit" value="18 tools" note="Study, campus and planning" tone="lavender" /></div>
    <div className="section-row"><div><h2>Quick access</h2><p>Pick up where you left off.</p></div><span className="subtle-label">MADE FOR STUDENT LIFE</span></div>
    <div className="quick-grid">{quickLinks.map(item => <Link key={item.to} to={item.to} className="quick-card"><div className={`quick-icon ${item.tone}`}>{item.icon}</div><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="quick-arrow">↗</span></Link>)}</div>
    <div className="dashboard-bottom-grid"><Card title="Coming up next" subtitle="From your assignment & exam timeline" action={<Link to="/planner" className="text-link">View planner →</Link>}>{upcoming.length ? <div className="timeline-list">{upcoming.map(item => <div className="timeline-item" key={item.id}><div className="timeline-date"><b>{new Date(`${item.date}T00:00:00`).getDate()}</b><small>{new Date(`${item.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short' })}</small></div><div className="timeline-copy"><strong>{item.title}</strong><p>{item.type || 'Deadline'} · {formatDate(item.date)}</p></div><span className="tiny-badge">{item.type || 'Task'}</span></div>)}</div> : <EmptyState title="Your week is open" detail="Add a test, assignment, or reminder in the Study Planner." />}</Card><Card title="A little reminder" subtitle="Small habits count"><div className="reminder-card"><div className="reminder-emoji">🌱</div><h3>Progress over perfection.</h3><p>Choose one small task, focus for 25 minutes, and give yourself a short break. You do not need to finish everything at once.</p><Link to="/pomodoro" className="text-link">Start a focus session →</Link></div></Card></div>
  </>;
}

const studyResources = [
  { name: 'MDN Web Docs', type: 'Web development', detail: 'HTML, CSS and JavaScript documentation', url: 'https://developer.mozilla.org/' },
  { name: 'React Learn', type: 'React', detail: 'Learn components, props, state and hooks', url: 'https://react.dev/learn' },
  { name: 'freeCodeCamp', type: 'Practice', detail: 'Guided programming lessons and projects', url: 'https://www.freecodecamp.org/learn/' },
  { name: 'GeeksforGeeks', type: 'Computer science', detail: 'Programming notes and interview practice', url: 'https://www.geeksforgeeks.org/' },
  { name: 'NPTEL', type: 'Courses', detail: 'Engineering and computer science courses', url: 'https://nptel.ac.in/' },
  { name: 'GitHub Skills', type: 'Practice', detail: 'Interactive Git and GitHub learning paths', url: 'https://skills.github.com/' },
];
const sampleNotes = [
  { subject: 'Data Structures', title: 'Arrays and time complexity', detail: 'Revision checklist: indexing, traversal, insert, delete and complexity.' },
  { subject: 'Web Development', title: 'HTML, CSS and DOM', detail: 'Review semantic elements, selectors, events and DOM updates.' },
  { subject: 'Java Programming', title: 'OOP quick revision', detail: 'Classes, objects, constructors, inheritance, polymorphism and encapsulation.' },
  { subject: 'Mathematics', title: 'Matrices and linear systems', detail: 'Practice rank, echelon form, inverse and solving linear equations.' },
];

export function StudyHub() {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('All');
  const subjects = ['All', ...new Set(sampleNotes.map(item => item.subject))];
  const notes = sampleNotes.filter(item => (subject === 'All' || item.subject === subject) && `${item.subject} ${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase()));
  const resources = studyResources.filter(item => `${item.name} ${item.type} ${item.detail}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <PageHeading title="Study Hub" description="A simple place for revision notes, useful learning websites, and study routines." />
    <div className="notice-banner"><span>💡</span><div><strong>Quick tip</strong><p>Search by subject or topic. The notes below are starter examples; replace them with your course's official notes and previous-year questions.</p></div></div>
    <div className="toolbar"><div className="search-box"><span>⌕</span><input placeholder="Search subjects, notes or resources..." value={query} onChange={e => setQuery(e.target.value)} /></div><select aria-label="Filter subject" value={subject} onChange={e => setSubject(e.target.value)}>{subjects.map(item => <option key={item}>{item}</option>)}</select></div>
    <Card title="Revision notes" subtitle="Sample revision prompts you can personalize"><div className="resource-grid">{notes.map(item => <article className="resource-card" key={item.title}><div className="resource-card-top"><span className="mini-icon">📝</span><span className="tag">{item.subject}</span></div><h3>{item.title}</h3><p>{item.detail}</p><button className="text-button" onClick={() => window.alert(`${item.title}\n\n${item.detail}\n\nReplace this sample with your course notes or a PDF link.`)}>Open note overview ↗</button></article>)}</div>{!notes.length && <EmptyState title="No notes match" detail="Try another search or select All subjects." />}</Card>
    <Card title="Useful learning resources" subtitle="External websites to support your learning"><div className="resource-grid">{resources.map(item => <article className="resource-card" key={item.name}><div className="resource-card-top"><span className="mini-icon">🌐</span><span className="tag tag-green">{item.type}</span></div><h3>{item.name}</h3><p>{item.detail}</p><a className="text-link" href={item.url} target="_blank" rel="noreferrer">Visit resource ↗</a></article>)}</div>{!resources.length && <EmptyState title="No resources match" detail="Try a broader search term." />}</Card>
  </>;
}

export function Pomodoro() {
  const [minutes, setMinutes] = useLocalStorage('ssk-pomodoro-minutes', 25);
  const [secondsLeft, setSecondsLeft] = useState(Number(minutes) * 60);
  const [running, setRunning] = useState(false);
  const [sessionCount, setSessionCount] = useLocalStorage('ssk-focus-sessions', 0);
  const [sessionDone, setSessionDone] = useState(false);
  useEffect(() => { if (!running) return undefined; const id = setInterval(() => setSecondsLeft(current => { if (current <= 1) { clearInterval(id); setRunning(false); setSessionDone(true); setSessionCount(count => count + 1); return 0; } return current - 1; }), 1000); return () => clearInterval(id); }, [running, setSessionCount]);
  function changeMinutes(delta) { if (running) return; const next = Math.max(1, Math.min(180, Number(minutes) + delta)); setMinutes(next); setSecondsLeft(next * 60); setSessionDone(false); }
  function reset() { setRunning(false); setSecondsLeft(Number(minutes) * 60); setSessionDone(false); }
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  const progress = 100 - (secondsLeft / (Number(minutes) * 60 || 1)) * 100;
  return <>
    <PageHeading title="Pomodoro Timer" description="Focus on one task, then take a proper break." />
    <div className="pomodoro-layout"><Card title="Focus session" subtitle="Set your study time before starting" className="pomodoro-panel"><div className="pomodoro-face"><div className="pomodoro-ring" style={{ '--progress': `${progress}%` }}><div className="pomodoro-inner"><span className="pomodoro-label">{secondsLeft === 0 ? 'SESSION COMPLETE' : running ? 'FOCUS TIME' : 'READY WHEN YOU ARE'}</span><strong>{mm}:{ss}</strong><span className="pomodoro-sub">{running ? 'Stay with one task' : 'One thing at a time'}</span></div></div></div><div className="minute-adjust"><button className="button button-secondary" disabled={running} onClick={() => changeMinutes(-1)}>− 1 min</button><span>{minutes} minute session</span><button className="button button-secondary" disabled={running} onClick={() => changeMinutes(1)}>+ 1 min</button></div><div className="button-row center-row"><button className="button button-primary" onClick={() => { if (secondsLeft === 0) reset(); setRunning(true); setSessionDone(false); }}>{running ? 'Running…' : '▶ Start focus'}</button><button className="button button-secondary" onClick={() => setRunning(false)} disabled={!running}>Pause</button><button className="button button-ghost" onClick={reset}>Reset</button></div>{sessionDone && <div className="alert alert-success">Nice work! Your focus session is complete. Take a short break.</div>}<p className="small-note">The timer runs while this page is open. Changing the duration resets the current timer.</p></Card><div className="pomodoro-side"><div className="focus-summary"><div className="stat-icon stat-lavender">✦</div><span className="muted">Completed sessions</span><strong>{sessionCount}</strong><p>Your completed focus sessions are saved in this browser.</p></div><Card title="How to use it" subtitle="Keep your next step clear"><ol className="numbered-tips"><li><span>01</span><div><strong>Choose one task</strong><p>Pick something specific you can work on now.</p></div></li><li><span>02</span><div><strong>Focus without switching</strong><p>Keep notifications and distractions away.</p></div></li><li><span>03</span><div><strong>Take a break</strong><p>Stand up, drink some water, and reset.</p></div></li></ol></Card></div></div>
  </>;
}

const booksData = [
  { id: 'b1', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', category: 'Web Development', level: 'Beginner-friendly', url: 'https://eloquentjavascript.net/' },
  { id: 'b2', title: 'You Don’t Know JS Yet', author: 'Kyle Simpson', category: 'JavaScript', level: 'Intermediate', url: 'https://github.com/getify/You-Dont-Know-JS' },
  { id: 'b3', title: 'Think Python', author: 'Allen B. Downey', category: 'Python', level: 'Beginner', url: 'https://allendowney.github.io/ThinkPython/' },
  { id: 'b4', title: 'Pro Git', author: 'Scott Chacon and Ben Straub', category: 'Tools', level: 'All levels', url: 'https://git-scm.com/book/en/v2' },
  { id: 'b5', title: 'Operating Systems: Three Easy Pieces', author: 'Remzi and Andrea Arpaci-Dusseau', category: 'Computer Science', level: 'Intermediate', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
  { id: 'b6', title: 'The Rust Programming Language', author: 'Steve Klabnik and Carol Nichols', category: 'Programming', level: 'Beginner to intermediate', url: 'https://doc.rust-lang.org/book/' },
];

export function BookLibrary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useLocalStorage('ssk-book-favorites', []);
  const [showFavorites, setShowFavorites] = useState(false);
  const categories = ['All', ...new Set(booksData.map(book => book.category))];
  const books = booksData.filter(book => (category === 'All' || book.category === category) && (!showFavorites || favorites.includes(book.id)) && `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query.toLowerCase()));
  function toggleFavorite(id) { setFavorites(list => list.includes(id) ? list.filter(item => item !== id) : [...list, id]); }
  return <>
    <PageHeading title="Book Library" description="Keep useful books and free technical reading links close by." action={<span className="tag tag-green">{favorites.length} saved</span>} />
    <div className="toolbar"><div className="search-box"><span>⌕</span><input placeholder="Search title, author or topic..." value={query} onChange={e => setQuery(e.target.value)} /></div><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter book category">{categories.map(item => <option key={item}>{item}</option>)}</select><button className={`button ${showFavorites ? 'button-primary' : 'button-secondary'}`} onClick={() => setShowFavorites(!showFavorites)}>♥ Favorites</button></div>
    <div className="book-grid">{books.map((book, index) => <article className="book-card" key={book.id}><div className={`book-cover cover-${index % 5}`}><span>STUDENT<br />LIBRARY</span><b>{book.title.split(' ').slice(0, 3).join(' ')}</b><small>OPEN READING</small></div><div className="book-details"><span className="tag">{book.category}</span><h3>{book.title}</h3><p className="muted">{book.author}</p><small>{book.level}</small><div className="book-actions"><a href={book.url} target="_blank" rel="noreferrer" className="button button-primary button-small">Read free ↗</a><button className={`heart-button ${favorites.includes(book.id) ? 'heart-active' : ''}`} onClick={() => toggleFavorite(book.id)} aria-label={favorites.includes(book.id) ? 'Remove favorite' : 'Add favorite'}>{favorites.includes(book.id) ? '♥' : '♡'}</button></div></div></article>)}</div>
    {!books.length && <EmptyState title="No books found" detail={showFavorites ? 'Save a book with the heart button to see it here.' : 'Try a different title or category.'} />}
  </>;
}

const expenseFields = [
  { key: 'rent', label: 'Hostel / Rent', color: '#8b8cf5' },
  { key: 'food', label: 'Food & Groceries', color: '#4ab99a' },
  { key: 'travel', label: 'Travel', color: '#f4ad68' },
  { key: 'study', label: 'Books & Study', color: '#69a7e8' },
  { key: 'misc', label: 'Other expenses', color: '#df83a0' },
];
const emptyBudget = { income: 15000, rent: 6000, food: 3000, travel: 1200, study: 500, misc: 800 };
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);

export function BudgetCalculator() {
  const [budget, setBudget] = useLocalStorage('ssk-budget', emptyBudget);
  const totalExpenses = expenseFields.reduce((sum, item) => sum + Math.max(0, Number(budget[item.key]) || 0), 0);
  const left = (Number(budget.income) || 0) - totalExpenses;
  function update(key, raw) { setBudget(current => ({ ...current, [key]: raw === '' ? '' : Math.max(0, Number(raw) || 0) })); }
  return <>
    <PageHeading title="Budget Calculator" description="Plan your monthly spending and check what remains." />
    <div className="budget-summary-grid"><div className="budget-summary-card"><span>Monthly income / allowance</span><strong>{money(budget.income)}</strong><small>Your starting amount</small></div><div className="budget-summary-card"><span>Total expenses</span><strong>{money(totalExpenses)}</strong><small>Across {expenseFields.length} categories</small></div><div className={`budget-summary-card ${left < 0 ? 'summary-negative' : 'summary-positive'}`}><span>{left < 0 ? 'Over budget by' : 'Money remaining'}</span><strong>{money(Math.abs(left))}</strong><small>{left < 0 ? 'Expenses exceed income' : 'Available after expenses'}</small></div></div>
    <div className="two-column-layout"><Card title="Monthly budget" subtitle="Update the values to recalculate"><div className="form-stack"><TextField label="Monthly income / allowance (₹)" type="number" min="0" value={budget.income} onChange={e => update('income', e.target.value)} />{expenseFields.map(item => <TextField key={item.key} label={`${item.label} (₹)`} type="number" min="0" value={budget[item.key]} onChange={e => update(item.key, e.target.value)} />)}<button className="button button-ghost align-start" onClick={() => setBudget(emptyBudget)}>Reset sample budget</button></div></Card><Card title="Expense breakdown" subtitle="Visual share of your total spending"><div className="budget-breakdown"><div className="donut-wrap"><div className="donut" style={{ background: `conic-gradient(${expenseFields.map((item, i) => { const prev = expenseFields.slice(0, i).reduce((s, e) => s + Math.max(0, Number(budget[e.key]) || 0), 0); const start = totalExpenses ? prev / totalExpenses * 100 : 0; const end = totalExpenses ? (prev + Math.max(0, Number(budget[item.key]) || 0)) / totalExpenses * 100 : 0; return `${item.color} ${start}% ${end}%`; }).join(', ') || '#e8edf5 0 100%'})` }}><div><strong>{money(totalExpenses)}</strong><small>Total spent</small></div></div></div><div className="legend-list">{expenseFields.map(item => { const amount = Math.max(0, Number(budget[item.key]) || 0); const percent = totalExpenses ? amount / totalExpenses * 100 : 0; return <div className="legend-row" key={item.key}><span className="legend-dot" style={{ background: item.color }} /><span>{item.label}</span><strong>{money(amount)}</strong><small>{Math.round(percent)}%</small></div>; })}</div></div><div className="budget-tip"><span>💡</span><p>{left < 0 ? 'Try reducing a category or updating your monthly allowance so the plan fits your actual budget.' : 'Keep a small buffer for unexpected travel, study materials, or other costs.'}</p></div></Card></div>
  </>;
}

export function AttendanceCalculator() {
  const [attendedRaw, setAttendedRaw] = useState('36');
  const [totalRaw, setTotalRaw] = useState('42');
  const attended = Math.max(0, Number(attendedRaw) || 0);
  const total = Math.max(0, Number(totalRaw) || 0);
  const valid = total > 0 && attended <= total;
  const percent = valid ? attended / total * 100 : 0;
  const target = 75;
  const extraNeeded = valid && percent < target ? Math.ceil((target * total / 100 - attended) / (1 - target / 100)) : 0;
  const canMiss = valid && percent >= target ? Math.max(0, Math.floor(attended / (target / 100) - total + 1e-9)) : 0;
  return <>
    <PageHeading title="Attendance Calculator" description="Check your attendance and estimate how many classes you need to attend." />
    <div className="two-column-layout attendance-layout"><Card title="Your attendance" subtitle="Enter the number of classes attended and conducted"><div className="form-stack"><TextField label="Classes attended" type="number" min="0" value={attendedRaw} onChange={e => setAttendedRaw(e.target.value)} /><TextField label="Total classes conducted" type="number" min="0" value={totalRaw} onChange={e => setTotalRaw(e.target.value)} /><div className="input-help">Use whole numbers. Attended classes cannot exceed total classes.</div></div>{!valid && <div className="alert alert-error">Enter valid values with total classes greater than zero.</div>}</Card><Card title="Attendance result" subtitle="Minimum target is set to 75%"><div className="attendance-result"><div className={`attendance-circle ${valid && percent >= target ? 'attendance-safe' : 'attendance-low'}`}><div><strong>{valid ? `${percent.toFixed(1)}%` : '—'}</strong><small>Current</small></div></div><div className="progress-area"><div className="progress-labels"><span>0%</span><strong>Target: 75%</strong><span>100%</span></div><div className="progress-track"><div className={`progress-fill ${percent >= target ? 'fill-good' : 'fill-warning'}`} style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} /></div></div></div>{valid && <div className="attendance-advice-grid"><div className="advice-box"><span>{percent >= target ? '✦' : '→'}</span><strong>{percent >= target ? `${canMiss} class${canMiss === 1 ? '' : 'es'}` : `${extraNeeded} class${extraNeeded === 1 ? '' : 'es'}`}</strong><p>{percent >= target ? 'Estimated additional classes you can miss and still remain at 75%, assuming no other classes are held.' : 'Consecutive classes you need to attend to reach 75%, assuming every next class is attended.'}</p></div><div className="advice-box advice-soft"><span>📌</span><strong>{Math.max(0, total - attended)} missed</strong><p>Classes not attended so far.</p></div></div>}</Card></div><div className="notice-banner"><span>ℹ️</span><div><strong>Important</strong><p>This is a mathematical estimate. Your university may have subject-wise rules, rounding policies, or minimum requirements that differ.</p></div></div>
  </>;
}

const defaultSubjects = [
  { id: 's1', name: 'Mathematics', grade: 9, credits: 4 },
  { id: 's2', name: 'Programming', grade: 8, credits: 4 },
  { id: 's3', name: 'Electronics', grade: 8, credits: 3 },
];

export function CgpaCalculator() {
  const [subjects, setSubjects] = useLocalStorage('ssk-cgpa-subjects', defaultSubjects);
  const creditsTotal = subjects.reduce((sum, item) => sum + Math.max(0, Number(item.credits) || 0), 0);
  const pointsTotal = subjects.reduce((sum, item) => sum + Math.max(0, Math.min(10, Number(item.grade) || 0)) * Math.max(0, Number(item.credits) || 0), 0);
  const cgpa = creditsTotal ? pointsTotal / creditsTotal : 0;
  function update(id, key, value) { setSubjects(list => list.map(item => item.id === id ? { ...item, [key]: value } : item)); }
  function addSubject() { setSubjects(list => [...list, { id: makeId(), name: '', grade: 8, credits: 3 }]); }
  return <>
    <PageHeading title="CGPA Calculator" description="Estimate your CGPA using grade points and subject credits." />
    <div className="cgpa-hero"><div><span className="eyebrow">WEIGHTED AVERAGE</span><p>Estimated CGPA</p><strong>{cgpa.toFixed(2)}<small> / 10</small></strong></div><div className="cgpa-gauge"><div className="gauge-track"><div className="gauge-fill" style={{ width: `${Math.min(100, cgpa * 10)}%` }} /></div><div className="gauge-labels"><span>0</span><span>5</span><span>10</span></div><small>{subjects.length} subjects · {creditsTotal} total credits</small></div></div>
    <Card title="Subjects and grade points" subtitle="Grade points must be between 0 and 10; credits must be positive" action={<button className="button button-primary button-small" onClick={addSubject}>＋ Add subject</button>}><div className="table-wrap"><table className="data-table"><thead><tr><th>Subject</th><th>Grade point</th><th>Credits</th><th>Weighted points</th><th></th></tr></thead><tbody>{subjects.map(item => <tr key={item.id}><td><input className="table-input subject-input" value={item.name} placeholder="Subject name" onChange={e => update(item.id, 'name', e.target.value)} /></td><td><input className="table-input" type="number" min="0" max="10" value={item.grade} onChange={e => update(item.id, 'grade', e.target.value)} /></td><td><input className="table-input" type="number" min="0" value={item.credits} onChange={e => update(item.id, 'credits', e.target.value)} /></td><td><strong>{(Math.min(10, Math.max(0, Number(item.grade) || 0)) * Math.max(0, Number(item.credits) || 0)).toFixed(1)}</strong></td><td><button className="delete-button" onClick={() => setSubjects(list => list.filter(entry => entry.id !== item.id))} aria-label={`Remove ${item.name}`}>×</button></td></tr>)}</tbody></table></div><div className="table-footer"><span>Sum of weighted points: <strong>{pointsTotal.toFixed(1)}</strong></span><button className="button button-ghost button-small" onClick={() => setSubjects(defaultSubjects)}>Reset example</button></div></Card><div className="notice-banner"><span>📘</span><div><strong>Formula</strong><p>CGPA = Σ (grade point × credit) ÷ Σ credits. This calculator is an estimate; use your university's official grading rules.</p></div></div>
  </>;
}

export function TodoList() {
  const [tasks, setTasks] = useLocalStorage('ssk-todos', []);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Assignment');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  function addTask(event) { event.preventDefault(); if (!title.trim()) return; setTasks(list => [{ id: makeId(), title: title.trim(), category, dueDate, done: false, createdAt: new Date().toISOString() }, ...list]); setTitle(''); setDueDate(''); }
  const filtered = tasks.filter(task => (filter === 'All' || (filter === 'Completed' ? task.done : !task.done)) && `${task.title} ${task.category}`.toLowerCase().includes(query.toLowerCase()));
  const completed = tasks.filter(task => task.done).length;
  return <>
    <PageHeading title="To-Do List" description="Capture the small things before they become last-minute stress." action={<span className="tag tag-green">{completed}/{tasks.length} completed</span>} />
    <div className="two-column-layout todo-layout"><Card title="Add a task" subtitle="Assignments, exams, errands or reminders"><form className="form-stack" onSubmit={addTask}><TextField label="Task title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Finish React assignment" required /><label className="field-label">Category<select value={category} onChange={e => setCategory(e.target.value)}><option>Assignment</option><option>Exam</option><option>Personal</option><option>Project</option><option>Other</option></select></label><TextField label="Due date (optional)" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /><button className="button button-primary" type="submit">＋ Add task</button></form></Card><Card title="Your tasks" subtitle="Saved in this browser"><div className="task-toolbar"><div className="search-box"><span>⌕</span><input placeholder="Find a task..." value={query} onChange={e => setQuery(e.target.value)} /></div><select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter tasks"><option>All</option><option>Open</option><option>Completed</option></select></div>{filtered.length ? <div className="task-list">{filtered.map(task => <div className={`task-item ${task.done ? 'task-done' : ''}`} key={task.id}><button className={`check-circle ${task.done ? 'checked' : ''}`} onClick={() => setTasks(list => list.map(item => item.id === task.id ? { ...item, done: !item.done } : item))} aria-label={task.done ? 'Mark as open' : 'Mark as completed'}>{task.done ? '✓' : ''}</button><div className="task-copy"><strong>{task.title}</strong><div className="task-meta"><span className="tag">{task.category}</span>{task.dueDate && <small>Due {formatDate(task.dueDate)}</small>}</div></div><button className="delete-button" onClick={() => setTasks(list => list.filter(item => item.id !== task.id))} aria-label="Delete task">×</button></div>)}</div> : <EmptyState title="No tasks in this view" detail="Add a task or change the filter to find it." />}<div className="task-footer"><span>{tasks.filter(t => !t.done).length} tasks left</span>{tasks.some(t => t.done) && <button className="text-button" onClick={() => setTasks(list => list.filter(item => !item.done))}>Clear completed</button>}</div></Card></div>
  </>;
}

const eventData = [
  { id: 'e1', title: 'Web Development Workshop', category: 'Workshop', date: '2026-11-05', time: '2:00 PM', place: 'Innovation Lab', desc: 'Build a small responsive web page and review front-end fundamentals.', icon: '💻' },
  { id: 'e2', title: 'Coding Sprint', category: 'Hackathon', date: '2026-11-12', time: '10:00 AM', place: 'Project Space', desc: 'Work in a team on a small problem-solving challenge.', icon: '⚡' },
  { id: 'e3', title: 'Photography Walk', category: 'Club', date: '2026-11-16', time: '4:00 PM', place: 'Campus Courtyard', desc: 'Join a relaxed walk, learn composition, and meet other students.', icon: '📸' },
  { id: 'e4', title: 'Resume Review Meetup', category: 'Career', date: '2026-11-20', time: '1:00 PM', place: 'Seminar Room', desc: 'Practice presenting projects and get feedback on your resume.', icon: '🧑‍💻' },
  { id: 'e5', title: 'AI/ML Student Discussion', category: 'Club', date: '2026-11-26', time: '3:00 PM', place: 'Discussion Room', desc: 'Share learning resources and beginner project ideas.', icon: '🤖' },
  { id: 'e6', title: 'Open Mic Evening', category: 'Social', date: '2026-12-02', time: '5:00 PM', place: 'Activity Hall', desc: 'A casual event for music, poetry, stories, and performances.', icon: '🎤' },
];

export function EventsClubs() {
  const [registrations, setRegistrations] = useLocalStorage('ssk-registered-events', []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const events = eventData.filter(item => (category === 'All' || item.category === category) && `${item.title} ${item.category} ${item.desc}`.toLowerCase().includes(query.toLowerCase()));
  function toggle(id) { setRegistrations(list => list.includes(id) ? list.filter(item => item !== id) : [...list, id]); }
  return <>
    <PageHeading title="Events & Clubs" description="Find sample workshops, meetups, and student activities." action={<span className="tag tag-green">{registrations.length} joined</span>} />
    <div className="notice-banner"><span>📅</span><div><strong>Sample event board</strong><p>These entries are sample project data, not confirmed university events. Replace dates, venues and registration details with official information.</p></div></div>
    <div className="toolbar"><div className="search-box"><span>⌕</span><input placeholder="Search events or clubs..." value={query} onChange={e => setQuery(e.target.value)} /></div><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter event category">{['All', ...new Set(eventData.map(item => item.category))].map(item => <option key={item}>{item}</option>)}</select></div>
    <div className="event-grid">{events.map((item, index) => <article className="event-card" key={item.id}><div className={`event-visual event-visual-${index % 4}`}><span className="event-icon">{item.icon}</span><span className="event-category">{item.category}</span><span className="event-day">{new Date(`${item.date}T00:00:00`).getDate()}<small>{new Date(`${item.date}T00:00:00`).toLocaleDateString(undefined, { month: 'short' })}</small></span></div><div className="event-card-body"><h3>{item.title}</h3><p>{item.desc}</p><div className="event-meta"><span>◷ {item.time}</span><span>⌖ {item.place}</span></div><button className={`button ${registrations.includes(item.id) ? 'button-secondary' : 'button-primary'} button-wide`} onClick={() => toggle(item.id)}>{registrations.includes(item.id) ? '✓ Registered · Undo' : 'Register interest →'}</button></div></article>)}</div>{!events.length && <EmptyState title="No events match" detail="Try another search or select All categories." />}
  </>;
}

export function Transport() {
  const [distance, setDistance] = useState('8');
  const [mode, setMode] = useState('Bike taxi');
  const rates = { 'Bike taxi': 10, Auto: 18, Cab: 24 };
  const base = { 'Bike taxi': 15, Auto: 25, Cab: 45 };
  const fare = (Number(distance) || 0) * rates[mode] + base[mode];
  const routes = [
    { icon: '🚌', title: 'Campus shuttle', desc: 'Check the official campus transport notice for active routes and timings.', label: 'Verify schedule' },
    { icon: '🚉', title: 'Railway station', desc: 'Compare train timings and transport connections before leaving.', label: 'Plan connection' },
    { icon: '🚕', title: 'Local ride', desc: 'Use a licensed ride provider and confirm the destination before travel.', label: 'Ride safety' },
  ];
  return <>
    <PageHeading title="Transport" description="Keep your commute options and estimated travel costs in one place." />
    <div className="notice-banner"><span>ℹ️</span><div><strong>Demo data</strong><p>Transport timings and fares vary. This page does not use a live transport API; confirm current routes, schedules, and fares with the official provider.</p></div></div>
    <div className="feature-card-grid">{routes.map(route => <article className="feature-card" key={route.title}><div className="feature-card-icon">{route.icon}</div><h3>{route.title}</h3><p>{route.desc}</p><span className="tag">{route.label}</span></article>)}</div>
    <div className="two-column-layout"><Card title="Quick fare estimator" subtitle="Illustrative estimate, not a live quote"><div className="form-stack"><label className="field-label">Travel mode<select value={mode} onChange={e => setMode(e.target.value)}>{Object.keys(rates).map(item => <option key={item}>{item}</option>)}</select></label><TextField label="Distance (km)" type="number" min="0" step="0.5" value={distance} onChange={e => setDistance(e.target.value)} /><div className="fare-result"><span>Estimated one-way fare</span><strong>{money(fare)}</strong><small>Example base fare + per-kilometre rate</small></div></div></Card><Card title="Before you leave" subtitle="A quick commute checklist"><div className="checklist-simple"><p>✓ Confirm the latest bus or shuttle timing.</p><p>✓ Keep your student ID and travel essentials ready.</p><p>✓ Share your trip details with someone you trust when needed.</p><p>✓ Leave extra time for traffic and campus entry.</p></div><a className="button button-secondary" href="https://www.google.com/maps" target="_blank" rel="noreferrer">Open Maps ↗</a></Card></div>
  </>;
}

const campusPlaces = [
  { name: 'Library', icon: '📚', description: 'Quiet study space and academic resources' },
  { name: 'Cafeteria', icon: '🍱', description: 'Food and refreshment area' },
  { name: 'Academic Blocks', icon: '🏫', description: 'Classrooms, labs and faculty offices' },
  { name: 'Medical Room', icon: '🩺', description: 'First-aid or campus health support' },
  { name: 'Student Activity Area', icon: '🎭', description: 'Clubs, meetups and events' },
  { name: 'Bus / Shuttle Stop', icon: '🚌', description: 'Transport pickup and drop-off' },
];

export function CampusMap() {
  const [query, setQuery] = useState('');
  const places = campusPlaces.filter(place => `${place.name} ${place.description}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <PageHeading title="Campus Map" description="Find common campus facilities and open directions in a map service." />
    <div className="campus-map-banner"><div className="campus-map-copy"><span className="eyebrow">FIND YOUR WAY</span><h2>Know where you’re going.</h2><p>This is a directory-style starter map. Add official building pins or an approved campus map embed for a real deployment.</p><a className="button button-light" href="https://www.google.com/maps" target="_blank" rel="noreferrer">Open map service ↗</a></div><div className="map-art" aria-hidden="true"><div className="map-block block-a">A</div><div className="map-block block-b">B</div><div className="map-block block-c">C</div><div className="map-road road-a"/><div className="map-road road-b"/><div className="map-pin">●</div><div className="map-label">YOU ARE HERE</div></div></div>
    <div className="toolbar"><div className="search-box"><span>⌕</span><input placeholder="Search a campus location..." value={query} onChange={e => setQuery(e.target.value)} /></div></div>
    <div className="place-grid">{places.map(place => <article className="place-card" key={place.name}><span className="place-icon">{place.icon}</span><div><h3>{place.name}</h3><p>{place.description}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} university campus`)}`} className="text-link" target="_blank" rel="noreferrer">Search directions ↗</a></div></article>)}</div>
    <div className="notice-banner"><span>📍</span><div><strong>Update before presenting</strong><p>The blocks and facilities shown here are generic examples and are not exact building pins. Replace them with verified locations for your campus.</p></div></div>
  </>;
}

export function LostFound() {
  const [posts, setPosts] = useLocalStorage('ssk-lost-found-posts', [
    { id: 'lf1', title: 'Blue water bottle', type: 'Found', description: 'Found near a classroom. Owner can identify the sticker.', contact: 'Report to campus reception', date: '2026-10-20' },
    { id: 'lf2', title: 'Black notebook', type: 'Lost', description: 'Has handwritten class notes inside.', contact: 'Contact the person who posted this in the demo', date: '2026-10-22' },
  ]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Lost');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [filter, setFilter] = useState('All');
  function submit(event) { event.preventDefault(); if (!title.trim() || !description.trim()) return; setPosts(list => [{ id: makeId(), title: title.trim(), type, description: description.trim(), contact: contact.trim() || 'Please use the official campus lost-and-found desk', date: new Date().toISOString().slice(0, 10) }, ...list]); setTitle(''); setDescription(''); setContact(''); }
  const filtered = posts.filter(post => filter === 'All' || post.type === filter);
  return <>
    <PageHeading title="Lost & Found" description="Post a lost or found item and help it find its owner." />
    <div className="notice-banner"><span>🔐</span><div><strong>Protect your privacy</strong><p>Do not post passwords, student IDs, full addresses, or sensitive personal information. For valuable items, use the official campus desk.</p></div></div>
    <div className="two-column-layout"><Card title="Create a listing" subtitle="Only share the details needed to identify the item"><form className="form-stack" onSubmit={submit}><TextField label="Item name" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Black umbrella" required /><label className="field-label">Listing type<select value={type} onChange={e => setType(e.target.value)}><option>Lost</option><option>Found</option></select></label><label className="field-label">Description<textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} placeholder="Where and when was it seen? Avoid sensitive details." required /></label><TextField label="Safe contact method (optional)" value={contact} onChange={e => setContact(e.target.value)} placeholder="e.g. Ask at the campus desk" /><button className="button button-primary" type="submit">＋ Post listing</button></form></Card><Card title="Community listings" subtitle={`${filtered.length} listing(s) in this view`}><div className="filter-pills">{['All', 'Lost', 'Found'].map(item => <button key={item} className={`filter-pill ${filter === item ? 'filter-pill-active' : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</div>{filtered.length ? <div className="lost-list">{filtered.map(post => <article className="lost-item" key={post.id}><div className={`lost-type ${post.type === 'Found' ? 'lost-found' : ''}`}>{post.type === 'Found' ? '✓' : '?'}</div><div className="lost-copy"><div className="lost-title-row"><h3>{post.title}</h3><span className={`tag ${post.type === 'Found' ? 'tag-green' : 'tag-orange'}`}>{post.type}</span></div><p>{post.description}</p><small>{formatDate(post.date)} · {post.contact}</small></div>{!['lf1', 'lf2'].includes(post.id) && <button className="delete-button" onClick={() => setPosts(list => list.filter(item => item.id !== post.id))} aria-label="Delete listing">×</button>}</article>)}</div> : <EmptyState title="No listings in this view" detail="Try another filter or add a new listing." />}</Card></div>
  </>;
}

export function EmergencySupport() {
  const support = [
    { icon: '📞', title: 'India emergency response', detail: '112', note: 'Use for an immediate emergency.', href: 'tel:112', main: true },
    { icon: '🩺', title: 'Campus medical room', detail: 'Add official campus number', note: 'Replace with a verified number before presentation.', href: null },
    { icon: '🛡️', title: 'Campus security', detail: 'Add official security number', note: 'Use your institution’s verified contact information.', href: null },
    { icon: '🏥', title: 'Nearest hospital', detail: 'Search a local hospital', note: 'Choose a nearby facility and verify its details.', href: 'https://www.google.com/maps/search/hospital+near+me' },
  ];
  return <>
    <PageHeading title="Emergency Support" description="Keep important support routes visible and easy to find." />
    <div className="emergency-alert"><span>🆘</span><div><strong>Immediate danger or urgent medical emergency?</strong><p>Contact local emergency services now. In India, dial 112 for emergency assistance.</p></div><a className="button button-danger" href="tel:112">Call 112</a></div>
    <div className="support-grid">{support.map(item => <article className={`support-card ${item.main ? 'support-main' : ''}`} key={item.title}><span className="support-icon">{item.icon}</span><h3>{item.title}</h3><strong>{item.detail}</strong><p>{item.note}</p>{item.href && <a className="text-link" href={item.href} target={item.href.startsWith('tel:') ? undefined : '_blank'} rel="noreferrer">{item.href.startsWith('tel:') ? 'Call now ↗' : 'Open resource ↗'}</a>}</article>)}</div>
    <div className="notice-banner"><span>✅</span><div><strong>Before using this page in real life</strong><p>Confirm all campus-specific numbers with official university sources. This project cannot verify your campus medical-room or security contacts.</p></div></div>
  </>;
}

export function Reviews() {
  const [reviews, setReviews] = useLocalStorage('ssk-reviews', []);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const average = reviews.length ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length : 0;
  function submit(event) { event.preventDefault(); if (!message.trim()) return; setReviews(list => [{ id: makeId(), name: name.trim() || 'Student', rating: Number(rating), message: message.trim(), date: new Date().toISOString().slice(0, 10) }, ...list]); setName(''); setRating(5); setMessage(''); }
  return <>
    <PageHeading title="Reviews & Feedback" description="Share what works well and what could be improved." />
    <div className="review-summary"><div className="review-average"><strong>{average ? average.toFixed(1) : '—'}</strong><span className="star-row">{'★'.repeat(Math.round(average))}{'☆'.repeat(5 - Math.round(average))}</span><small>{reviews.length} review(s) submitted on this device</small></div><div><h3>Your feedback shapes the next version.</h3><p className="muted">Use this simple form to test React forms, state updates, and local storage.</p></div></div>
    <div className="two-column-layout"><Card title="Write a review" subtitle="Be kind and specific"><form className="form-stack" onSubmit={submit}><TextField label="Name (optional)" value={name} onChange={e => setName(e.target.value)} placeholder="Your display name" /><label className="field-label">Rating<select value={rating} onChange={e => setRating(Number(e.target.value))}><option value="5">5 — Excellent</option><option value="4">4 — Good</option><option value="3">3 — Okay</option><option value="2">2 — Needs work</option><option value="1">1 — Poor</option></select></label><label className="field-label">Your feedback<textarea rows="4" required value={message} onChange={e => setMessage(e.target.value)} placeholder="What would make the Student Survival Kit better?" /></label><button className="button button-primary" type="submit">Submit feedback</button></form></Card><Card title="Recent feedback" subtitle="Stored locally in this browser">{reviews.length ? <div className="review-list">{reviews.map(item => <article className="review-item" key={item.id}><div className="review-avatar">{item.name.slice(0, 1).toUpperCase()}</div><div className="review-copy"><div className="review-head"><strong>{item.name}</strong><span className="star-row">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</span></div><p>{item.message}</p><small>{formatDate(item.date)}</small></div><button className="delete-button" onClick={() => setReviews(list => list.filter(review => review.id !== item.id))} aria-label="Delete review">×</button></article>)}</div> : <EmptyState title="No feedback yet" detail="Be the first to share a review." />}</Card></div>
  </>;
}

const assistantResponses = [
  { test: /attendance|75|class/i, response: 'Open Attendance from Student Tools. Enter attended classes and total classes to estimate your percentage and classes needed to reach the 75% target.' },
  { test: /cgpa|grade|credit|gpa/i, response: 'Use the CGPA Calculator. Enter each subject’s grade point and credits; the app calculates the weighted average. Check your university’s official grading rules.' },
  { test: /budget|money|expense|saving|rent/i, response: 'Open Budget Calculator and enter your monthly allowance plus rent, food, travel, study and other expenses. Your remaining amount updates automatically.' },
  { test: /react|jsx|component|props|state|hook/i, response: 'A good React revision order is JSX → functional components → props → useState → events → conditional rendering → lists with map() → useEffect → React Router → Local Storage.' },
  { test: /study|exam|focus|pomodoro|revision/i, response: 'Pick one small topic, study for 25 minutes, and take a short break. Add exams and assignment dates in Study Planner so they are visible on your dashboard.' },
  { test: /event|club|hackathon|workshop/i, response: 'Check Events & Clubs for sample event cards. The current entries are demo data, so verify all actual dates and registration details with official campus notices.' },
  { test: /lost|found|item/i, response: 'Use Lost & Found to create a listing, but never share passwords, student IDs, full addresses, or other sensitive information. Use the official campus desk for valuable items.' },
  { test: /emergency|medical|security|hospital/i, response: 'For an immediate emergency in India, dial 112. Campus-specific medical and security phone numbers in this project need to be replaced with verified official contacts.' },
  { test: /hello|hi|hey/i, response: 'Hey! I can point you to the Study Hub, CGPA, Attendance, Budget, Planner, and other Student Survival Kit tools. What are you working on?' },
];

export function StudentAssistant() {
  const [messages, setMessages] = useLocalStorage('ssk-assistant-chat', [{ id: 'welcome', role: 'assistant', text: 'Hi! I’m the Student Assistant demo. Ask about attendance, CGPA, study planning, budget, React topics, events, or campus support.' }]);
  const [input, setInput] = useState('');
  function send(event) { event.preventDefault(); if (!input.trim()) return; const text = input.trim(); const match = assistantResponses.find(item => item.test.test(text)); const answer = match?.response || 'I’m a simple keyword-based demo, so I may not know that yet. Try asking about attendance, CGPA, budget, React, study planning, events, or emergency support.'; setMessages(list => [...list, { id: makeId(), role: 'user', text }, { id: makeId(), role: 'assistant', text: answer }]); setInput(''); }
  return <>
    <PageHeading title="Student Assistant" description="A lightweight chatbot demo for common student questions." />
    <div className="chat-layout"><div className="chat-card"><div className="chat-header"><div className="assistant-avatar">✦</div><div><strong>Student Assistant</strong><small><span className="status-dot" /> Ready to help · keyword-based demo</small></div><button className="icon-button" onClick={() => setMessages([{ id: makeId(), role: 'assistant', text: 'Chat cleared. What student topic can I help you with?' }])} title="Clear chat">↻</button></div><div className="chat-messages">{messages.map(item => <div className={`chat-line ${item.role === 'user' ? 'chat-line-user' : ''}`} key={item.id}><div className="chat-bubble">{item.text}</div></div>)}</div><form className="chat-input-row" onSubmit={send}><input aria-label="Message the assistant" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a student question..." /><button className="button button-primary" type="submit">Send ↗</button></form></div><div className="chat-side"><h3>Try asking</h3><p className="muted">Select a prompt to fill the chat box.</p>{['How do I calculate attendance?', 'Explain React hooks', 'How can I manage my budget?', 'Help me plan for exams', 'What should I do in an emergency?'].map(prompt => <button className="prompt-chip" key={prompt} onClick={() => setInput(prompt)}>{prompt}<span>↗</span></button>)}<div className="notice-banner"><span>🤖</span><div><strong>Not an AI API</strong><p>This prototype matches keywords to predefined responses. It does not connect to an external AI model.</p></div></div></div></div>
  </>;
}

export function Planner() {
  const [items, setItems] = useLocalStorage('ssk-planner', []);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Assignment');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('Upcoming');
  function submit(event) { event.preventDefault(); if (!title.trim() || !date) return; setItems(list => [{ id: makeId(), title: title.trim(), type, date, notes: notes.trim(), done: false }, ...list].sort((a, b) => a.date.localeCompare(b.date))); setTitle(''); setDate(''); setNotes(''); }
  const today = new Date().toISOString().slice(0, 10);
  const filtered = items.filter(item => filter === 'All' || (filter === 'Done' ? item.done : (!item.done && item.date >= today))).sort((a, b) => a.date.localeCompare(b.date));
  const daysUntil = dateString => Math.ceil((new Date(`${dateString}T00:00:00`).getTime() - new Date(`${today}T00:00:00`).getTime()) / 86400000);
  return <>
    <PageHeading eyebrow="EVALUATION 2 · REACT FEATURE" title="Study Planner" description="Plan exams, assignments and important dates in one timeline." />
    <div className="two-column-layout planner-layout"><Card title="Add to your timeline" subtitle="Your next deadline will also appear on Dashboard"><form className="form-stack" onSubmit={submit}><TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Java practical exam" required /><label className="field-label">Type<select value={type} onChange={e => setType(e.target.value)}><option>Assignment</option><option>Exam</option><option>Project</option><option>Presentation</option><option>Personal reminder</option></select></label><TextField label="Date" type="date" min={today} value={date} onChange={e => setDate(e.target.value)} required /><label className="field-label">Notes (optional)<textarea rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Topics to revise, room details, etc." /></label><button className="button button-primary" type="submit">＋ Add deadline</button></form></Card><Card title="Your timeline" subtitle={`${filtered.length} item(s)`}><div className="filter-pills">{['Upcoming', 'All', 'Done'].map(item => <button key={item} className={`filter-pill ${filter === item ? 'filter-pill-active' : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</div>{filtered.length ? <div className="planner-timeline">{filtered.map(item => { const days = daysUntil(item.date); return <article className={`planner-entry ${item.done ? 'planner-entry-done' : ''}`} key={item.id}><div className="planner-entry-mark">{item.type === 'Exam' ? '🎓' : item.type === 'Project' ? '💻' : '📝'}</div><div className="planner-entry-copy"><div className="planner-entry-top"><span className="tag">{item.type}</span><small>{formatDate(item.date)}</small></div><h3>{item.title}</h3>{item.notes && <p>{item.notes}</p>}<span className={`days-pill ${days < 0 ? 'days-past' : days <= 3 ? 'days-soon' : ''}`}>{item.done ? 'Completed' : days < 0 ? `${Math.abs(days)} day(s) ago` : days === 0 ? 'Due today' : `${days} day(s) to go`}</span></div><div className="planner-actions"><button className="check-circle" onClick={() => setItems(list => list.map(entry => entry.id === item.id ? { ...entry, done: !entry.done } : entry))} title="Mark complete">{item.done ? '✓' : ''}</button><button className="delete-button" onClick={() => setItems(list => list.filter(entry => entry.id !== item.id))} aria-label="Delete deadline">×</button></div></article>; })}</div> : <EmptyState title="Your timeline is clear" detail="Add an exam or assignment date to get started." />}</Card></div>
  </>;
}

const defaultPacking = [
  { id: 'p1', label: 'Student ID / access card', category: 'Essentials', done: false },
  { id: 'p2', label: 'Phone and charger', category: 'Essentials', done: false },
  { id: 'p3', label: 'Laptop and charger', category: 'Study', done: false },
  { id: 'p4', label: 'Notebook and pens', category: 'Study', done: false },
  { id: 'p5', label: 'Water bottle', category: 'Daily', done: false },
  { id: 'p6', label: 'Wallet / travel card', category: 'Essentials', done: false },
  { id: 'p7', label: 'Headphones', category: 'Study', done: false },
  { id: 'p8', label: 'Umbrella / weather layer', category: 'Daily', done: false },
  { id: 'p9', label: 'Any medication you normally need', category: 'Personal', done: false },
  { id: 'p10', label: 'Keys', category: 'Essentials', done: false },
];

export function PackingChecklist() {
  const [items, setItems] = useLocalStorage('ssk-packing-checklist', defaultPacking);
  const [custom, setCustom] = useState('');
  const [filter, setFilter] = useState('All');
  const done = items.filter(item => item.done).length;
  const categories = ['All', ...new Set(items.map(item => item.category))];
  const visible = items.filter(item => filter === 'All' || item.category === filter);
  function addItem(event) { event.preventDefault(); if (!custom.trim()) return; setItems(list => [...list, { id: makeId(), label: custom.trim(), category: 'Custom', done: false }]); setCustom(''); }
  return <>
    <PageHeading eyebrow="EVALUATION 2 · REACT FEATURE" title="Packing Checklist" description="A reusable checklist for class days, study sessions or trips." action={<span className="tag tag-green">{done}/{items.length} checked</span>} />
    <Card title="Before you head out" subtitle="Tick each item as you pack"><div className="packing-progress"><div className="progress-track"><div className="progress-fill fill-good" style={{ width: `${items.length ? done / items.length * 100 : 0}%` }} /></div><strong>{items.length ? Math.round(done / items.length * 100) : 0}% ready</strong></div><form className="inline-add-form" onSubmit={addItem}><input value={custom} onChange={e => setCustom(e.target.value)} placeholder="Add a custom item..." aria-label="Custom packing item" /><button className="button button-primary" type="submit">＋ Add item</button></form><div className="filter-pills">{categories.map(item => <button key={item} className={`filter-pill ${filter === item ? 'filter-pill-active' : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="packing-grid">{visible.map(item => <label className={`packing-item ${item.done ? 'packing-item-done' : ''}`} key={item.id}><input type="checkbox" checked={item.done} onChange={() => setItems(list => list.map(entry => entry.id === item.id ? { ...entry, done: !entry.done } : entry))} /><span className="packing-check">{item.done ? '✓' : ''}</span><span className="packing-label">{item.label}<small>{item.category}</small></span>{!defaultPacking.some(original => original.id === item.id) && <button className="delete-button" type="button" onClick={event => { event.preventDefault(); setItems(list => list.filter(entry => entry.id !== item.id)); }} aria-label="Remove custom item">×</button>}</label>)}</div><div className="table-footer"><span>{items.length - done} item(s) left to check</span><button className="text-button" onClick={() => setItems(defaultPacking)}>Reset checklist</button></div></Card>
  </>;
}

const foodData = [
  { id: 'f1', name: 'Dal + Rice', category: 'Meal', diet: 'Vegetarian', price: 60, note: 'Simple everyday meal', icon: '🍛' },
  { id: 'f2', name: 'Veg Sandwich', category: 'Snack', diet: 'Vegetarian', price: 45, note: 'Quick between-class option', icon: '🥪' },
  { id: 'f3', name: 'Rajma Chawal', category: 'Meal', diet: 'Vegetarian', price: 70, note: 'Filling lunch option', icon: '🍲' },
  { id: 'f4', name: 'Egg Roll', category: 'Snack', diet: 'Egg', price: 65, note: 'A portable snack', icon: '🌯' },
  { id: 'f5', name: 'Fruit Bowl', category: 'Snack', diet: 'Vegetarian', price: 50, note: 'Light refreshment', icon: '🍎' },
  { id: 'f6', name: 'Paneer Wrap', category: 'Meal', diet: 'Vegetarian', price: 80, note: 'More substantial meal', icon: '🌮' },
  { id: 'f7', name: 'Tea / Coffee', category: 'Drink', diet: 'Vegetarian', price: 20, note: 'Small study break', icon: '☕' },
  { id: 'f8', name: 'Noodles', category: 'Meal', diet: 'Vegetarian', price: 55, note: 'Quick hot meal', icon: '🍜' },
];

export function FoodGuide() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('100');
  const [favorites, setFavorites] = useLocalStorage('ssk-food-favorites', []);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const foods = foodData.filter(item => (category === 'All' || item.category === category) && item.price <= Number(maxPrice || 0) && (!onlyFavorites || favorites.includes(item.id)) && `${item.name} ${item.note} ${item.diet}`.toLowerCase().includes(query.toLowerCase()));
  function toggle(id) { setFavorites(list => list.includes(id) ? list.filter(item => item !== id) : [...list, id]); }
  return <>
    <PageHeading eyebrow="EVALUATION 2 · REACT FEATURE" title="Campus Food Guide" description="Browse sample student-friendly food options and set a rough spending limit." />
    <div className="notice-banner"><span>🍱</span><div><strong>Sample prices for demo only</strong><p>Items, availability, dietary information and prices are examples. Replace them with the actual campus menu and current prices.</p></div></div>
    <div className="toolbar food-toolbar"><div className="search-box"><span>⌕</span><input placeholder="Search food..." value={query} onChange={e => setQuery(e.target.value)} /></div><select value={category} onChange={e => setCategory(e.target.value)} aria-label="Food category">{['All', 'Meal', 'Snack', 'Drink'].map(item => <option key={item}>{item}</option>)}</select><label className="price-filter">Max ₹ <input aria-label="Maximum price" type="number" min="0" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} /></label><button className={`button ${onlyFavorites ? 'button-primary' : 'button-secondary'}`} onClick={() => setOnlyFavorites(!onlyFavorites)}>♥ Saved</button></div>
    <div className="food-grid">{foods.map(item => <article className="food-card" key={item.id}><div className="food-visual"><span>{item.icon}</span><button className={`heart-button ${favorites.includes(item.id) ? 'heart-active' : ''}`} onClick={() => toggle(item.id)} aria-label="Toggle food favorite">{favorites.includes(item.id) ? '♥' : '♡'}</button></div><div className="food-info"><div className="food-title-row"><h3>{item.name}</h3><strong>{money(item.price)}</strong></div><p>{item.note}</p><div className="food-tags"><span className="tag">{item.category}</span><span className="tag tag-green">{item.diet}</span></div></div></article>)}</div>{!foods.length && <EmptyState title="No food items match" detail="Raise the max price or change the category or search." />}
  </>;
}

const sampleTeams = [
  { id: 't1', title: 'Student productivity web app', skills: ['React', 'CSS', 'UI design'], mode: 'Looking for teammates', description: 'Build practical tools for students and learn React in a small team.', owner: 'Demo Student' },
  { id: 't2', title: 'Beginner AI/ML mini project', skills: ['Python', 'Machine Learning', 'Research'], mode: 'Study group', description: 'Find a manageable dataset and build a small model with clear documentation.', owner: 'Student Group' },
  { id: 't3', title: 'Campus event finder', skills: ['JavaScript', 'API', 'Design'], mode: 'Project idea', description: 'Create a searchable directory of verified student events.', owner: 'Campus Builders' },
];

export function TeamFinder() {
  const [teams, setTeams] = useLocalStorage('ssk-team-listings', sampleTeams);
  const [query, setQuery] = useState('');
  const [skill, setSkill] = useState('All');
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('React, HTML, CSS');
  const [mode, setMode] = useState('Looking for teammates');
  const [description, setDescription] = useState('');
  const allSkills = ['All', ...new Set(teams.flatMap(team => team.skills))];
  const filtered = teams.filter(team => (skill === 'All' || team.skills.includes(skill)) && `${team.title} ${team.skills.join(' ')} ${team.description} ${team.owner}`.toLowerCase().includes(query.toLowerCase()));
  function submit(event) { event.preventDefault(); if (!title.trim() || !description.trim()) return; setTeams(list => [{ id: makeId(), title: title.trim(), skills: skills.split(',').map(item => item.trim()).filter(Boolean), mode, description: description.trim(), owner: 'You' }, ...list]); setTitle(''); setDescription(''); }
  return <>
    <PageHeading eyebrow="EVALUATION 2 · REACT FEATURE" title="Team Finder" description="Share project ideas and find classmates with complementary interests." />
    <div className="notice-banner"><span>🤝</span><div><strong>Community demo board</strong><p>Listings are stored locally in your browser and are not shared with other students. A production version would need a backend and moderation.</p></div></div>
    <div className="two-column-layout"><Card title="Post a project idea" subtitle="Describe the type of teammate or skills you need"><form className="form-stack" onSubmit={submit}><TextField label="Project title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Campus navigation app" required /><TextField label="Skills (comma-separated)" value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Python, design" /><label className="field-label">Post type<select value={mode} onChange={e => setMode(e.target.value)}><option>Looking for teammates</option><option>Study group</option><option>Project idea</option><option>Hackathon team</option></select></label><label className="field-label">Description<textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} placeholder="What would you like to build or learn together?" required /></label><button className="button button-primary" type="submit">＋ Publish listing</button></form></Card><Card title="Project board" subtitle={`${filtered.length} listing(s)`}><div className="search-box full-search"><span>⌕</span><input placeholder="Search projects or skills..." value={query} onChange={e => setQuery(e.target.value)} /></div><div className="filter-pills skill-pills">{allSkills.map(item => <button key={item} className={`filter-pill ${skill === item ? 'filter-pill-active' : ''}`} onClick={() => setSkill(item)}>{item}</button>)}</div>{filtered.length ? <div className="team-list">{filtered.map(team => <article className="team-card" key={team.id}><div className="team-card-head"><div className="team-badge">{team.title.slice(0, 1).toUpperCase()}</div><span className="tag">{team.mode}</span></div><h3>{team.title}</h3><p>{team.description}</p><div className="skill-tag-list">{team.skills.map(item => <span className="skill-tag" key={item}>{item}</span>)}</div><div className="team-card-foot"><small>Posted by {team.owner}</small>{team.owner === 'You' && <button className="text-button" onClick={() => setTeams(list => list.filter(item => item.id !== team.id))}>Remove</button>}</div></article>)}</div> : <EmptyState title="No projects found" detail="Try another skill or publish a new project idea." />}</Card></div>
  </>;
}
