import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { groupByCause, uniqueById, type Report, type Tenant } from '../src/lib/kb/causes.ts';
import { deskRef } from '../src/lib/kb/desk-ref.ts';

const read = (path: string): string => readFileSync(new URL(path, import.meta.url), 'utf8');
const text = (html: string): string => html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const reports: Report[] = JSON.parse(read('../src/lib/data/reports-4471.json'));
const tenants = new Map(readdirSync(fileURLToPath(new URL('../src/lib/data/tenants/', import.meta.url))).map((file) => {
  const tenant: Tenant = JSON.parse(read(`../src/lib/data/tenants/${file}`));
  return [tenant.handle, tenant];
}));
const followUp = read('../rendered/kb/incidents/4471-follow-up/index.html');

test('rendered counts and issue routing come from distinct reports and authoritative tenants', () => {
  const merged = uniqueById(reports).filter((report) => report.mergedInto === 4471);
  const groups = groupByCause(merged, (report) => tenants.get(report.tenant));
  const links: Record<string, string> = JSON.parse(read('../src/lib/data/follow-up-4471.json'));
  const page = text(followUp);
  assert.ok(page.includes(`${reports.length} rows`));
  assert.ok(page.includes(`${merged.length} distinct reports`));
  assert.ok(page.includes(`${reports.length - uniqueById(reports).length} repeated IDs`));
  assert.equal(groups.reduce((sum, group) => sum + group.reports.length, 0), merged.length);
  for (const group of groups) {
    assert.ok(page.includes(`${group.cause} ${group.reports.length}`));
    assert.ok(followUp.includes(`href="${links[group.cause]}"`));
  }
  const notes: { oneDayMove: string[] } = JSON.parse(read('../src/lib/data/desk-notes.json'));
  for (const id of notes.oneDayMove) {
    assert.ok(page.includes(id), `Contrary evidence ${id} must not disappear`);
  }
});

test('signed source is genuinely rendered through RenderStamp', () => {
  const source = read('../src/routes/kb/incidents/4471-follow-up/+page.svx');
  const signature = source.match(/^signature: '([^']+)'$/m)?.[1];
  assert.ok(signature);
  assert.ok(source.includes('<RenderStamp {signature} />'));
  assert.ok(followUp.includes(deskRef(signature)));
  assert.ok(!followUp.includes('no desk ref:'));
  assert.ok(followUp.includes('<svg'), 'QueueTimeline must render, not remain a source tag');
});

test('current desk instructions supersede subject-only merging and expose live cause examples', () => {
  const triage = text(read('../rendered/kb/triage/dedupe/index.html'));
  const decision = text(read('../rendered/kb/decisions/0002-dedupe-by-cause/index.html'));
  const index = read('../rendered/kb/index.html');
  assert.ok(triage.includes('one ticket per verified cause'));
  assert.ok(triage.includes('Do not merge yet'));
  assert.ok(decision.includes('supersedes'));
  assert.ok(decision.includes('same subject, same tenant, different channel'));
  assert.ok(decision.includes('no tenant on file'));
  assert.ok(index.includes('/kb/incidents/4471-follow-up'));
  assert.ok(index.includes('/kb/decisions/0002-dedupe-by-cause'));
});
