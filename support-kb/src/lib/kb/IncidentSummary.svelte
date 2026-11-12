<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { causeOf, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const unique = uniqueById(reports as Report[]);
  const merged = unique.filter((r) => r.mergedInto === 4471);
  const mismatches = merged.filter((r) => r.meta.intakeTag !== causeOf(r, tenantOf(r)));
  const unresolved = merged.filter((r) => notes.oneDayMove.includes(r.id));
  const firstReceived = merged.map((r) => r.receivedAt.slice(0, 10)).sort()[0];
  const firstMerged = merged.flatMap((r) => r.mergedAt ? [r.mergedAt.slice(0, 10)] : []).sort()[0];
  const waiting = merged.filter((r) => r.receivedAt.slice(0, 10) < firstMerged);
</script>

<p>
  The export contains <strong>{reports.length} rows</strong>, but only
  <strong>{merged.length} distinct reports</strong> merged into #4471:
  <strong>{reports.length - unique.length} repeated IDs</strong> are export overlap, not extra reports.
  Intake tags disagree with tenant/channel classification for <strong>{mismatches.length} reports</strong>.
</p>

<p>
  Reports started on <strong>{firstReceived}</strong>; merging started on
  <strong>{firstMerged}</strong>, with <strong>{waiting.length} reports</strong> received before that day.
  The July merge spike is the desk clearing a backlog, not evidence that the defect started in July.
  The timeline below separates receipt from merge time.
</p>

<h3>Contrary evidence remains open</h3>
<p>
  The desk noted <strong>{unresolved.length} reports</strong> describing a one-day move or timing
  discrepancy. Tenant/channel classification files them under parser, but that is not proof
  that a month/day fix explains their text. Preserve these reports, reproduce their original
  input and timezone context, and reclassify only if evidence establishes another cause.
  They remain counted once, not as a speculative third incident.
</p>
<table>
  <thead><tr><th>Report</th><th>Tenant / channel</th><th>Original account</th></tr></thead>
  <tbody>
    {#each unresolved as r (r.id)}
      <tr><td><code>{r.id}</code></td><td>{r.tenant} / {r.channel}</td><td>{r.body}</td></tr>
    {/each}
  </tbody>
</table>
