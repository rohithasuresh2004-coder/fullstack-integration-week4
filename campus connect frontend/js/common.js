// Shared helpers: storage, auth (mock), header/footer, toast, mobile menu.
const Store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
const Auth = {
  user(){ return Store.get("cc_user", null); },
  login(u){ Store.set("cc_user", u); },
  logout(){ try{ localStorage.removeItem("cc_user"); }catch(e){} },
  require(){ if(!Auth.user()){ location.href = "login.html?next=" + encodeURIComponent(location.pathname.split("/").pop() + location.search); } }
};
const Apps = {
  all(){ return Store.get("cc_apps", []); },
  has(id){ return Apps.all().some(a => a.jobId === id); },
  add(id){
    const list = Apps.all();
    if(list.some(a => a.jobId === id)) return false;
    list.push({jobId:id, status:"Applied", date:new Date().toISOString().slice(0,10)});
    Store.set("cc_apps", list); return true;
  }
};
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function fmtDate(d){ return new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); }
function toast(msg){
  let t = document.getElementById("toast");
  if(!t){ t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600);
}
function renderChrome(active){
  const u = Auth.user();
  const links = [["index.html","Home"],["jobs.html","Jobs"]];
  if(u) links.push(["dashboard.html","Dashboard"]);
  const items = links.map(([h,t]) => `<li><a href="${h}"${h===active?' aria-current="page"':''}>${t}</a></li>`).join("")
    + (u ? `<li><button class="btn btn-light btn-sm" id="logoutBtn" type="button">Logout (${esc(u.name.split(" ")[0])})</button></li>`
         : `<li><a class="btn btn-light btn-sm" href="login.html">Login / Register</a></li>`);
  document.getElementById("header").innerHTML = `
   <a class="skip-link" href="#main">Skip to main content</a>
   <header class="site-header"><div class="container nav">
     <a class="brand" href="index.html" aria-label="CampusConnect home">Campus<span>Connect</span></a>
     <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Toggle menu">☰ Menu</button>
     <nav aria-label="Main navigation"><ul class="nav-links" id="navLinks">${items}</ul></nav>
   </div></header>`;
  document.getElementById("footer").innerHTML = `<footer class="site-footer"><div class="container">© 2026 CampusConnect · Placement & Internship Portal · Built with HTML, CSS and JavaScript</div></footer>`;
  const tg = document.getElementById("navToggle"), nl = document.getElementById("navLinks");
  tg.addEventListener("click", () => { const o = nl.classList.toggle("open"); tg.setAttribute("aria-expanded", o); });
  const lo = document.getElementById("logoutBtn");
  if(lo) lo.addEventListener("click", () => { Auth.logout(); location.href = "index.html"; });
}
