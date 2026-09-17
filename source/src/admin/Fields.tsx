import { useState, useRef } from 'react';
import { Upload, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { api, imageField, type Doc } from './api';
import type { Field } from './schema';

const input =
  'w-full px-4 py-3 bg-white border border-rule rounded-[3px] text-[15px] text-ink ' +
  'focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors';

/** Rich text is stored as Sanity blocks; the dashboard edits it as plain paragraphs. */
export function blocksToText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((b) => {
      const block = b as { children?: { text?: string }[] };
      return (block.children ?? []).map((c) => c.text ?? '').join('');
    })
    .join('\n\n');
}

export function textToBlocks(text: string) {
  return text
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para, i) => ({
      _key: `p${i}`,
      _type: 'block',
      style: 'normal',
      children: [{ _key: `s${i}`, _type: 'span', text: para }],
    }));
}

export function FieldInput({
  field, value, doc, onChange,
}: {
  field: Field;
  value: unknown;
  doc: Doc;
  onChange: (name: string, v: unknown) => void;
}) {
  if (field.showWhen && !doc[field.showWhen]) return null;

  const id = `f-${field.name}`;

  return (
    <div className="mb-7">
      <label htmlFor={id} className="block text-[13px] font-semibold text-ink mb-1.5">
        {field.label}
        {field.required && <span className="text-gold-ink ml-1" aria-hidden="true">*</span>}
      </label>
      {field.help && <p className="text-[12.5px] text-muted mb-2.5 leading-relaxed">{field.help}</p>}

      {(() => {
        switch (field.kind) {
          case 'textarea':
            return (
              <textarea id={id} rows={4} className={cn(input, 'resize-y')}
                placeholder={field.placeholder}
                value={String(value ?? '')}
                onChange={(e) => onChange(field.name, e.target.value)} />
            );

          case 'richtext':
            return (
              <>
                <textarea id={id} rows={12} className={cn(input, 'resize-y leading-relaxed')}
                  value={blocksToText(value)}
                  onChange={(e) => onChange(field.name, textToBlocks(e.target.value))} />
                <p className="text-[12px] text-faint mt-1.5">Leave a blank line between paragraphs.</p>
              </>
            );

          case 'number':
            return (
              <input id={id} type="number" className={input}
                value={value === undefined || value === null ? '' : String(value)}
                onChange={(e) => onChange(field.name, e.target.value === '' ? undefined : Number(e.target.value))} />
            );

          case 'date':
            return (
              <input id={id} type="date" className={input}
                value={String(value ?? '')}
                onChange={(e) => onChange(field.name, e.target.value)} />
            );

          case 'select':
            return (
              <select id={id} className={input}
                value={String(value ?? '')}
                onChange={(e) => onChange(field.name, e.target.value)}>
                <option value="">—</option>
                {field.options?.map((o) => <option key={o} value={o}>{o || '—'}</option>)}
              </select>
            );

          case 'toggle':
            return (
              <button type="button" role="switch" aria-checked={Boolean(value)} id={id}
                onClick={() => onChange(field.name, !value)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-[3px] border w-full text-left transition-colors',
                  value ? 'border-gold bg-gold/10' : 'border-rule bg-white hover:border-ink/30',
                )}>
                <span className={cn(
                  'w-10 h-6 rounded-full flex items-center px-0.5 shrink-0 transition-colors',
                  value ? 'bg-gold justify-end' : 'bg-rule justify-start',
                )}>
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </span>
                <span className="text-[14px] font-medium text-ink">{value ? 'Yes' : 'No'}</span>
              </button>
            );

          case 'tags':
            return <TagsInput value={(value as string[]) ?? []} onChange={(v) => onChange(field.name, v)} />;

          case 'image':
            return <ImageInput value={value} onChange={(v) => onChange(field.name, v)} />;

          case 'list':
            return (
              <ListInput field={field} value={(value as Doc[]) ?? []}
                onChange={(v) => onChange(field.name, v)} />
            );

          default:
            return (
              <input id={id} type="text" className={input}
                placeholder={field.placeholder}
                value={String(value ?? '')}
                onChange={(e) => onChange(field.name, e.target.value)} />
            );
        }
      })()}
    </div>
  );
}

/* ------------------------------------------------------------------- tags */

function TagsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2.5">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-2 bg-cream text-ink text-[13px] px-3 py-1.5 rounded-[3px]">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))}
              aria-label={`Remove ${tag}`} className="text-muted hover:text-ink">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" className={input} value={draft}
          placeholder="Type and press Enter"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
        <button type="button" onClick={add} className="btn-outline shrink-0">Add</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ image */

function ImageInput({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const current = value as { alt?: string; credit?: string; asset?: { _ref?: string } } | undefined;
  const [previewUrl, setPreviewUrl] = useState<string>('');

  async function pick(file: File) {
    setBusy(true); setError('');
    try {
      const { assetId, url } = await api.upload(file);
      setPreviewUrl(url);
      onChange(imageField(assetId, current?.alt ?? '', current?.credit ?? ''));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setBusy(false);
    }
  }

  const has = Boolean(current?.asset?._ref);

  return (
    <div className="border border-rule rounded-[3px] bg-white p-4">
      {has || previewUrl ? (
        <div className="flex gap-4 items-start">
          <div className="w-28 h-28 bg-paper rounded-[3px] overflow-hidden shrink-0">
            {previewUrl && <img src={previewUrl} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1 space-y-3">
            <input type="text" className={input} placeholder="Describe the photograph (required)"
              value={current?.alt ?? ''}
              onChange={(e) => onChange({ ...(current ?? {}), alt: e.target.value })} />
            <input type="text" className={input} placeholder="Caption strip, e.g. OCHF Photography — …"
              value={current?.credit ?? ''}
              onChange={(e) => onChange({ ...(current ?? {}), credit: e.target.value })} />
            <div className="flex gap-2">
              <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline">
                Replace photo
              </button>
              <button type="button" onClick={() => { onChange(undefined); setPreviewUrl(''); }}
                className="btn-outline text-[#A81E17]">
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => fileRef.current?.click()} disabled={busy}
          className="w-full py-10 flex flex-col items-center gap-2 text-muted hover:text-ink transition-colors">
          {busy
            ? <Loader2 className="w-6 h-6 animate-spin" />
            : <Upload className="w-6 h-6" />}
          <span className="text-[14px] font-medium">{busy ? 'Uploading…' : 'Choose a photograph'}</span>
          <span className="text-[12px] text-faint">JPG or PNG, up to 12MB</span>
        </button>
      )}

      {error && <p className="text-[13px] text-[#A81E17] mt-3">{error}</p>}

      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) pick(f); e.target.value = ''; }} />
    </div>
  );
}

/* ------------------------------------------------------------------- list */

function ListInput({
  field, value, onChange,
}: {
  field: Field; value: Doc[]; onChange: (v: Doc[]) => void;
}) {
  const update = (i: number, name: string, v: string) => {
    const next = [...value];
    next[i] = { ...next[i], [name]: v };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {value.map((row, i) => (
        <div key={String(row._key ?? i)} className="border border-rule rounded-[3px] bg-white p-4">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] uppercase tracking-[0.14em] text-faint">Item {i + 1}</span>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))}
              aria-label="Remove item" className="text-muted hover:text-[#A81E17]">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {field.subFields?.map((sf) => (
              sf.kind === 'textarea' ? (
                <textarea key={sf.name} rows={2} className={cn(input, 'resize-y')} placeholder={sf.label}
                  value={String(row[sf.name] ?? '')}
                  onChange={(e) => update(i, sf.name, e.target.value)} />
              ) : (
                <input key={sf.name} type="text" className={input} placeholder={sf.label}
                  value={String(row[sf.name] ?? '')}
                  onChange={(e) => update(i, sf.name, e.target.value)} />
              )
            ))}
          </div>
        </div>
      ))}

      <button type="button"
        onClick={() => onChange([...value, { _key: `k${Date.now().toString(36)}` }])}
        className="btn-outline w-full">
        <Plus className="w-4 h-4" /> Add another
      </button>
    </div>
  );
}
