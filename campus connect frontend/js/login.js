renderChrome("login.html");
let mode = "login";
const $ = id => document.getElementById(id);
function setMode(m){
  mode = m;
  $("tabLogin").setAttribute("aria-selected", m === "login");
  $("tabReg").setAttribute("aria-selected", m === "register");
  $("nameWrap").hidden = m === "login";
  $("submitBtn").textContent = m === "login" ? "Login" : "Create account";
  $("formTitle").textContent = m === "login" ? "Welcome back" : "Create your account";
  ["errName","errEmail","errPass"].forEach(i => $(i).textContent = "");
}
$("tabLogin").addEventListener("click", () => setMode("login"));
$("tabReg").addEventListener("click", () => setMode("register"));
$("authForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("name").value.trim(), email = $("email").value.trim(), pass = $("password").value;
  let ok = true;
  $("errName").textContent = $("errEmail").textContent = $("errPass").textContent = "";
  if(mode === "register" && name.length < 2){ $("errName").textContent = "Please enter your full name."; ok = false; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ $("errEmail").textContent = "Enter a valid email address."; ok = false; }
  if(pass.length < 6){ $("errPass").textContent = "Password must be at least 6 characters."; ok = false; }
  if(!ok) return;
  const display = name || email.split("@")[0].replace(/[._]/g, " ");
  Auth.login({name: display.replace(/\b\w/g, c => c.toUpperCase()), email, role: $("role").value});
  const next = new URLSearchParams(location.search).get("next");
  location.href = next && /^[\w.\-?=&%]+$/.test(next) ? next : "dashboard.html";
});
