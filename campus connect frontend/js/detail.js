renderChrome("jobs.html");
const id = Number(new URLSearchParams(location.search).get("id"));
const job = JOBS.find(j => j.id === id), root = document.getElementById("detailRoot");
if(!job){
  root.innerHTML = '<div class="card empty" style="margin:2rem 0"><h1>Job not found</h1><p>This opening may have been removed.</p><a class="btn" href="jobs.html">Back to jobs</a></div>';
} else {
  document.title = job.title + " | CampusConnect";
  root.innerHTML = `
   <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> › <a href="jobs.html">Jobs</a> › <span aria-current="page">${esc(job.title)}</span></nav>
   <div class="detail">
    <article class="card">
      <span class="tag type">${esc(job.type)}</span>
      <h1>${esc(job.title)}</h1><p class="company">${esc(job.company)} · ${esc(job.location)}</p>
      <div class="tags" style="margin:.8rem 0">${job.skills.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
      <h2>About the role</h2><p>${esc(job.description)}</p>
      <h2>Responsibilities</h2><ul>${job.responsibilities.map(r => `<li>${esc(r)}</li>`).join("")}</ul>
      <h2>Eligibility</h2><ul>${job.eligibility.map(r => `<li>${esc(r)}</li>`).join("")}</ul>
    </article>
    <aside class="card apply-box" aria-label="Apply">
      <h2 style="margin-top:0">Job summary</h2>
      <p class="meta">💰 <strong>${esc(job.salary)}</strong></p>
      <p class="meta">📍 ${esc(job.location)}</p>
      <p class="meta">⏰ Deadline: <strong>${fmtDate(job.deadline)}</strong></p>
      <button class="btn" id="applyBtn" type="button" style="width:100%"></button>
      <p class="meta" id="note" style="margin-bottom:0"></p>
    </aside>
   </div>`;
  const btn = document.getElementById("applyBtn"), note = document.getElementById("note");
  function sync(){
    if(Apps.has(job.id)){ btn.textContent = "Applied ✓"; btn.disabled = true; note.innerHTML = 'Track it on your <a href="dashboard.html">dashboard</a>.'; }
    else { btn.textContent = "Apply now"; btn.disabled = false; note.textContent = Auth.user() ? "Your saved profile will be shared with the recruiter." : "You need to log in before applying."; }
  }
  btn.addEventListener("click", () => {
    if(!Auth.user()){ location.href = "login.html?next=" + encodeURIComponent("job.html?id=" + job.id); return; }
    if(Apps.add(job.id)){ toast("Application submitted successfully!"); }
    sync();
  });
  sync();
}
