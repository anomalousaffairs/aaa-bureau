// ===== 登录状态管理 =====
// 注意：这是纯前端静态站点，账号密码写在这里意味着任何人查看源代码都能看到。
// 对ARG解谜来说这通常是故意的（"查看源代码"本身就是线索），但不具备真正的安全性。

const ACCOUNTS = [
  { username: "p.audriac4392", password: "4392#Jsor0102" },
  { username: "i.yanato3264", password: "cowkitty339" }
];

function login(username, password) {
  const account = ACCOUNTS.find(a => a.username === username && a.password === password);
  if (!account) return false;
  localStorage.setItem("aaa_session", JSON.stringify({ username: account.username }));
  return true;
}

function logout() {
  localStorage.removeItem("aaa_session");
  window.location.href = "index.html";
}

function getCurrentUser() {
  const raw = localStorage.getItem("aaa_session");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function requireLogin() {
  if (!isLoggedIn()) {
    const here = window.location.pathname.split("/").pop() + window.location.search;
    window.location.href = "login.html?redirect=" + encodeURIComponent(here);
  }
}

function renderAuthStatus() {
  const el = document.getElementById("auth-status");
  if (!el) return;
  const user = getCurrentUser();
  if (user) {
    el.innerHTML = '欢迎！<span class="auth-username">' + user.username + '</span> &nbsp;|&nbsp; <a href="#" onclick="logout(); return false;">退出登录</a>';
  } else {
    el.innerHTML = '未登录 &nbsp;|&nbsp; <a href="login.html">内部登录</a>';
  }
}

document.addEventListener("DOMContentLoaded", renderAuthStatus);
