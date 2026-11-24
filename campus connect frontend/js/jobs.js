renderChrome("jobs.html");
const q = document.getElementById("q"), loc = document.getElementById("loc"), res = document.getElementById("results");
[...new Set(JOBS.map(j => j.location))].sort().forEach(l => loc.insertAdjacentHTML("beforeend", `<option>${esc(l)}</option>`));
function render(){
  const term = q.value.trim().toLowerCase();
  const types = [...document.querySelectorAll('input[name="type"]:checked')].map(c => c.value);
  const list = JOBS.filter(j =>
    (!term || [j.title, j.company, ...j.skills].join(" ").toLowerCase().includes(term)) &&
    (!types.length || types.includes(j.type)) && (!loc.value || j.location === loc.value));
  document.getElementById("count").textContent = `${list.length} of ${JOBS.length} jobs shown`;
  res.innerHTML = list.length ? list.map(j => `
   <article class="card job">
     <div class="job-top"><div><h2 style="margin:0;font-size:1.2rem">${esc(j.title)}</h2><p class="company">${esc(j.company)}</p></div>
       <span class="tag type">${esc(j.type)}</span></div>
     <p class="meta">📍 ${esc(j.location)} &nbsp;·&nbsp; 💰 ${esc(j.salary)} &nbsp;·&nbsp; ⏰ Apply by ${fmtDate(j.deadline)}</p>
     <div class="tags">${j.skills.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
     <div><a class="btn btn-sm" href="job.html?id=${j.id}" aria-label="View details for ${esc(j.title)}">View details</a>
     ${Apps.has(j.id) ? '<span class="badge s-applied" style="margin-left:.6rem">Applied ✓</span>' : ""}</div>
   </article>`).join("") : '<p class="empty card">No jobs match your filters. Try clearing them.</p>';
}
document.getElementById("searchForm").addEventListener("submit", e => { e.preventDefault(); render(); });
q.addEventListener("input", render); loc.addEventListener("change", render);
document.querySelectorAll('input[name="type"]').forEach(c => c.addEventListener("change", render));
document.getElementById("reset").addEventListener("click", () => { q.value = ""; loc.value = ""; document.querySelectorAll('input[name="type"]').forEach(c => c.checked = false); render(); });
render();
