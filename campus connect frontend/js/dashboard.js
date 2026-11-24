Auth.require();
renderChrome("dashboard.html");
const user = Auth.user();
if(user){
  document.getElementById("hello").textContent = `Welcome, ${user.name} 👋`;
  const apps = Apps.all(), count = s => apps.filter(a => a.status === s).length;
  document.getElementById("kpis").innerHTML = [["Applications", apps.length],["Shortlisted", count("Shortlisted")],["Selected", count("Selected")],["Open jobs", JOBS.length]]
    .map(([l, v]) => `<div class="card kpi"><strong>${v}</strong>${l}</div>`).join("");
  const fields = [!!user.name, !!user.email, apps.length > 0, false];
  const pct = Math.round(fields.filter(Boolean).length / fields.length * 100);
  document.getElementById("profileWrap").innerHTML = `<div class="card"><h2 style="margin-top:0">Profile completeness: ${pct}%</h2>
    <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Profile completeness"><div style="width:${pct}%"></div></div>
    <p class="meta">${esc(user.email)} · ${esc(user.role)} · Upload your resume to reach 100% (coming in Week 3).</p></div>`;
  const rows = apps.map(a => { const j = JOBS.find(x => x.id === a.jobId); if(!j) return "";
    return `<tr><td><a href="job.html?id=${j.id}">${esc(j.title)}</a></td><td>${esc(j.company)}</td><td>${fmtDate(a.date)}</td><td><span class="badge s-${a.status.toLowerCase()}">${esc(a.status)}</span></td></tr>`; }).join("");
  document.getElementById("appsWrap").innerHTML = apps.length
    ? `<div class="table-wrap"><table><caption class="visually-hidden">Your job applications</caption><thead><tr><th scope="col">Job</th><th scope="col">Company</th><th scope="col">Applied on</th><th scope="col">Status</th></tr></thead><tbody>${rows}</tbody></table></div>`
    : '<div class="card empty"><p>You have not applied to any job yet.</p><a class="btn" href="jobs.html">Browse jobs</a></div>';
  const open = JOBS.filter(j => !Apps.has(j.id)).slice(0, 3);
  document.getElementById("reco").innerHTML = open.map(j => `<article class="card"><span class="tag type">${esc(j.type)}</span><h3>${esc(j.title)}</h3><p class="company">${esc(j.company)}</p><a class="btn btn-outline btn-sm" href="job.html?id=${j.id}">View details</a></article>`).join("");
}
