import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Check, Loader2, LogOut, Plus, Trash2, AlertCircle, ExternalLink,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { api, type Doc } from './api';
import { sections, getSection, type Section } from './schema';
import { FieldInput } from './Fields';

/**
 * OCHF dashboard.
 *
 * Deliberately plain: tiles → list → form. No document/dataset vocabulary, no
 * draft state machine — one "Save" that means the website now shows this.
 */

export default function AdminApp() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    api.me().then((r) => setSignedIn(r.signedIn)).catch(() => setSignedIn(false));
  }, []);

  if (signedIn === null) {
    return (
      <div className="min-h-screen grid place-items-center bg-paper">
        <Loader2 className="w-6 h-6 animate-spin text-muted" />
      </div>
    );
  }

  if (!signedIn) return <Login onDone={() => setSignedIn(true)} />;

  return (
    <div className="min-h-screen bg-paper">
      <Header onSignOut={() => api.logout().then(() => setSignedIn(false))} />
      <main className="max-w-[1000px] mx-auto px-6 py-10">
        <Routes>
          <Route index element={<Home />} />
          <Route path=":section" element={<ListRoute />} />
          <Route path=":section/new" element={<EditRoute />} />
          <Route path=":section/:id" element={<EditRoute />} />
        </Routes>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ chrome */

function Header({ onSignOut }: { onSignOut: () => void }) {
  return (
    <header className="bg-ink text-white">
      <div className="max-w-[1000px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[20px] font-bold">OCHF</span>
          <span className="text-[13px] text-white/50">Content dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer"
            className="text-[13px] text-white/70 hover:text-white flex items-center gap-1.5 transition-colors">
            View website <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button onClick={onSignOut}
            className="text-[13px] text-white/70 hover:text-white flex items-center gap-1.5 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- login */

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      await api.login(password);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-paper px-6">
      <form onSubmit={submit} className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <p className="font-serif text-[26px] font-bold text-ink">OCHF</p>
          <p className="text-[14px] text-muted mt-1">Content dashboard</p>
        </div>

        <label htmlFor="pw" className="block text-[13px] font-semibold text-ink mb-2">Password</label>
        <input id="pw" type="password" autoFocus autoComplete="current-password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-rule rounded-[3px] text-[15px]
                     focus:border-gold focus:ring-1 focus:ring-gold outline-none" />

        {error && (
          <p role="alert" className="flex items-start gap-2 text-[13px] text-[#A81E17] mt-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
          </p>
        )}

        <button type="submit" disabled={busy || !password} className="btn-gold w-full mt-5 disabled:opacity-50">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------- home */

/* Route wrappers translate the URL into the props the views already expect. */

function ListRoute() {
  const { section = '' } = useParams();
  const nav = useNavigate();
  return (
    <ListView
      sectionKey={section}
      onBack={() => nav('/admin')}
      onEdit={(id) => nav(id ? `/admin/${section}/${encodeURIComponent(id)}` : `/admin/${section}/new`)}
    />
  );
}

function EditRoute() {
  const { section = '', id } = useParams();
  const nav = useNavigate();
  const s = getSection(section);
  return (
    <EditView
      sectionKey={section}
      id={id}
      onBack={() => nav(s?.singleton ? '/admin' : `/admin/${section}`)}
    />
  );
}

function Home() {
  const nav = useNavigate();
  const onOpen = (key: string) => {
    const s = getSection(key);
    // Singletons have nothing to list — go straight into the form.
    nav(s?.singleton ? `/admin/${key}/${s.type}` : `/admin/${key}`);
  };

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [pending, setPending] = useState(0);

  useEffect(() => {
    Promise.all(sections.map((s) => api.list(s.type).then((r) => [s.key, r.docs] as const).catch(() => [s.key, []] as const)))
      .then((pairs) => {
        setCounts(Object.fromEntries(pairs.map(([k, docs]) => [k, docs.length])));
        const figures = pairs.find(([k]) => k === 'figures')?.[1] ?? [];
        setPending(figures.filter((d) => d.status !== 'verified').length);
      });
  }, []);

  return (
    <>
      <h1 className="text-[30px] mb-2">What would you like to update?</h1>
      <p className="text-[15px] text-muted mb-9">
        Changes appear on the website as soon as you save.
      </p>

      {pending > 0 && (
        <div className="flex items-start gap-3 bg-cream border border-gold/30 rounded-[3px] p-4 mb-8">
          <AlertCircle className="w-5 h-5 text-gold-ink shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-semibold text-ink">
              {pending} impact {pending === 1 ? 'figure needs' : 'figures need'} checking
            </p>
            <p className="text-[13px] text-muted mt-0.5">
              These show as a blank line on the website until you enter the number and mark it verified.
            </p>
            <button onClick={() => onOpen('figures')} className="link-arrow mt-2">Review them →</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((s) => (
          <button key={s.key} onClick={() => onOpen(s.key)}
            className="text-left bg-white border border-rule rounded-[3px] p-6 hover:border-gold
                       hover:shadow-[0_2px_12px_-4px_rgba(14,26,43,0.15)] transition-all group">
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-[18px] group-hover:text-gold-ink transition-colors">{s.title}</h2>
              {!s.singleton && counts[s.key] !== undefined && (
                <span className="text-[13px] text-faint tabular-nums">{counts[s.key]}</span>
              )}
            </div>
            <p className="text-[13px] text-muted leading-relaxed">{s.blurb}</p>
          </button>
        ))}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------- list */

function ListView({
  sectionKey, onBack, onEdit,
}: { sectionKey: string; onBack: () => void; onEdit: (id?: string) => void }) {
  const section = getSection(sectionKey);
  const [docs, setDocs] = useState<Doc[] | null>(null);

  const load = useCallback(() => {
    if (!section) return;
    api.list(section.type).then((r) => setDocs(r.docs)).catch(() => setDocs([]));
  }, [section]);

  useEffect(() => { load(); }, [load]);

  if (!section) return <p className="text-[15px] text-muted">That section doesn't exist.</p>;

  async function remove(id: string, label: string) {
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    await api.remove(id);
    load();
  }

  return (
    <>
      <button onClick={onBack} className="link-arrow mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> All sections
      </button>

      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[28px]">{section.title}</h1>
          <p className="text-[14px] text-muted mt-1.5 max-w-[52ch]">{section.blurb}</p>
        </div>
        <button onClick={() => onEdit(undefined)} className="btn-gold shrink-0">
          <Plus className="w-4 h-4" /> {section.addLabel ?? 'Add'}
        </button>
      </div>

      {docs === null ? (
        <Loader2 className="w-5 h-5 animate-spin text-muted" />
      ) : docs.length === 0 ? (
        <div className="border border-dashed border-rule rounded-[3px] p-12 text-center">
          <p className="text-[15px] text-muted">Nothing here yet.</p>
        </div>
      ) : (
        <ul className="border-t border-rule">
          {docs.map((d) => {
            const title = String(d[section.titleField] ?? 'Untitled');
            const sub = section.subtitleField ? String(d[section.subtitleField] ?? '') : '';
            const hidden = d.published === false;
            const unverified = section.key === 'figures' && d.status !== 'verified';

            return (
              <li key={String(d._id)} className="border-b border-rule">
                <div className="flex items-center gap-4 py-4">
                  <button onClick={() => onEdit(String(d._id))} className="flex-1 text-left group min-w-0">
                    <span className="block text-[15.5px] font-medium text-ink group-hover:text-gold-ink transition-colors truncate">
                      {title}
                    </span>
                    {sub && <span className="block text-[13px] text-muted truncate mt-0.5">{sub}</span>}
                  </button>

                  {unverified && (
                    <span className="text-[11px] uppercase tracking-[0.12em] text-gold-ink bg-cream px-2.5 py-1 rounded-[3px] shrink-0">
                      Needs checking
                    </span>
                  )}
                  {hidden && (
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted bg-paper border border-rule px-2.5 py-1 rounded-[3px] shrink-0">
                      Hidden
                    </span>
                  )}

                  <button onClick={() => remove(String(d._id), title)}
                    aria-label={`Delete ${title}`}
                    className="text-faint hover:text-[#A81E17] transition-colors shrink-0 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

/* -------------------------------------------------------------------- edit */

function EditView({
  sectionKey, id, onBack,
}: { sectionKey: string; id?: string; onBack: () => void }) {
  const section = getSection(sectionKey) as Section;
  const [doc, setDoc] = useState<Doc | null>(id ? null : { _type: section.type });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(id)
      .then((r) => setDoc(r.doc ?? { _id: id, _type: section.type }))
      .catch(() => setDoc({ _id: id, _type: section.type }));
  }, [id, section.type]);

  const change = (name: string, value: unknown) => {
    setDoc((d) => ({ ...(d ?? {}), [name]: value }));
    setSaved(false);
  };

  async function save() {
    if (!doc) return;
    const missing = section.fields.filter(
      (f) => f.required && !String(doc[f.name] ?? '').trim(),
    );
    if (missing.length) {
      setError(`Please fill in: ${missing.map((f) => f.label).join(', ')}`);
      return;
    }

    setSaving(true); setError('');
    try {
      // Fix the id before the first attempt. If the connection drops mid-save and she
      // presses Save again, it updates this record rather than creating a second one.
      const stableId = doc._id ?? `${section.type}-${Date.now().toString(36)}`;
      setDoc((d) => ({ ...(d ?? {}), _id: stableId }));

      const result = await api.save({ ...doc, _id: stableId, _type: section.type });
      setDoc(result.doc);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  }

  if (!doc) {
    return <Loader2 className="w-5 h-5 animate-spin text-muted" />;
  }

  return (
    <>
      <button onClick={onBack} className="link-arrow mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> {section.singleton ? 'All sections' : section.title}
      </button>

      <h1 className="text-[28px] mb-8">
        {section.singleton ? section.title : id ? `Edit ${section.title.toLowerCase()}` : section.addLabel}
      </h1>

      <div className="bg-paper">
        {section.fields.map((f) => (
          <FieldInput key={f.name} field={f} value={doc[f.name]} doc={doc} onChange={change} />
        ))}
      </div>

      {error && (
        <p role="alert" className="flex items-start gap-2 text-[13.5px] text-[#A81E17] mb-4">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
        </p>
      )}

      <div className="sticky bottom-0 bg-paper border-t border-rule py-4 flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-gold disabled:opacity-50">
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button onClick={onBack} className="btn-outline">Cancel</button>

        {saved && (
          <span className="flex items-center gap-1.5 text-[13.5px] text-[#1F5C46]">
            <Check className="w-4 h-4" /> Saved — the website is updated
          </span>
        )}
      </div>
    </>
  );
}
