import{a as c,f as p}from"./CeQ0Fui8.js";import{R as u}from"./lxLLZh2g.js";import{w as n,g as h}from"./-v_Lc1Yp.js";import{l,s as f}from"./BvfZsH8o.js";import{D as m}from"./BMQSWMDQ.js";import{R as g}from"./DcCN1BeL.js";const e={layout:"runbook",title:"0002 · Duplicate reports share a verified cause",owner:"michalkoscallegro",status:"accepted",reviewed:"2026-11-12",signature:"michalkoscallegro / GitHub Copilot (gpt-6.1-sol)"},{layout:R,title:D,owner:C,status:O,reviewed:S,signature:v}=e;var w=p(`<h2>Context</h2> <p>The desk serves multiple products. Normalized subjects identify similar wording, not a
shared failure. <a href="/kb/incidents/4471-follow-up">The #4471 follow-up</a> shows that the old rule
merged two defects into one known ticket and hid the second fix.</p> <h2>Decision</h2> <p>This decision supersedes <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>; that accepted
record remains unchanged.</p> <p>Read the report and identify the affected product, tenant’s authoritative configuration,
entry point, reproduction, and failure mechanism. Merge only when the evidence supports
the same cause within the relevant product. Record the evidence and retain each original
report ID. Subjects and browser-derived intake tags are search hints, not merge keys.</p> <p>For sched-prod date reports in this export, use the existing <code>causeOf</code> and <code>sameCause</code> functions with <code>tenantOf</code>: day-first booking-v3 form reports are hint, while other
day-first entry points are parser. These rules describe this incident, not every product
or every future date defect.</p> <p>Missing tenant information, unsupported failure paths, and contradictory accounts need
investigation. Keep them separate until there is evidence; never infer equality from two
unknown causes. A new verified cause gets its own issue.</p> <h2>Running examples</h2> <!> <p>The examples cover identical subjects with different causes and different subjects with
the same cause. Unknown tenants do not match even when their subjects are identical.
The <a href="/kb/triage/dedupe">current triage page</a> is the desk’s entry point for this rule.</p> <h2>Consequences</h2> <p>Triage requires reading and checking configuration. It avoids hiding a second defect
behind a known ticket. Count reports once by ID, preserve contrary evidence, and separate
receipt time from merge time when reviewing an incident.</p> <!>`,1);function b(i,o){const s=l(o,["children","$$slots","$$events","$$legacy"]);u(i,f(()=>s,()=>e,{children:(a,y)=>{var t=w(),r=n(h(t),16);m(r,{});var d=n(r,8);g(d,{get signature(){return v}}),c(a,t)},$$slots:{default:!0}}))}const q=Object.freeze(Object.defineProperty({__proto__:null,default:b,metadata:e},Symbol.toStringTag,{value:"Module"}));export{q as _,b as a};
