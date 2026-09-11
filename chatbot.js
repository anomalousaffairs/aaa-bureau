let chatGreeted = false;

function openChatPanel() {
  document.getElementById("chat-widget").classList.add("open");
  document.getElementById("chat-bubble-min").classList.remove("show");
}
function minimizeChat() {
  document.getElementById("chat-widget").classList.remove("open");
  document.getElementById("chat-bubble-min").classList.add("show");
}
function restoreChat() {
  openChatPanel();
  ensureGreeting();
}

function addBotMessage(text) {
  const body = document.getElementById("chat-body");
  const msg = document.createElement("div");
  msg.className = "chat-msg bot";
  msg.innerHTML = '<span class="bubble">' + text + '</span>';
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}
function addUserMessage(text) {
  const body = document.getElementById("chat-body");
  const msg = document.createElement("div");
  msg.className = "chat-msg user";
  msg.innerHTML = '<span class="bubble">' + text + '</span>';
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}
function setChatOptions(options) {
  const box = document.getElementById("chat-options");
  if (!options || options.length === 0) {
    box.style.display = "none";
    box.innerHTML = "";
    return;
  }
  box.style.display = "flex";
  box.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.onclick = opt.onClick;
    box.appendChild(btn);
  });
}

function ensureGreeting() {
  if (chatGreeted) return;
  chatGreeted = true;
  setTimeout(() => {
    addBotMessage("您好，欢迎光临超级幸运大转盘，有什么可以帮您？");
    setChatOptions([
      { label: "咨询商品", onClick: onAskProduct },
      { label: "其他问题", onClick: onOtherQuestions }
    ]);
  }, 300);
}

function onAskProduct() {
  addUserMessage("咨询商品");
  setChatOptions([]);
  setTimeout(() => {
    addBotMessage("您可以点击首页商品卡片上的“立即抢购”按钮进行抢购。还有其他可以帮您的吗？");
    setChatOptions([
      { label: "没有了", onClick: onNoMoreHelp },
      { label: "我想看看其他商品", onClick: onWantOtherProducts }
    ]);
  }, 500);
}

function onOtherQuestions() {
  addUserMessage("其他问题");
  setChatOptions([]);
  setTimeout(() => {
    addBotMessage("好的，请问还有其他可以帮您的吗？");
    setChatOptions([
      { label: "没有了", onClick: onNoMoreHelp },
      { label: "我想看看其他商品", onClick: onWantOtherProducts }
    ]);
  }, 500);
}

function onNoMoreHelp() {
  addUserMessage("没有了");
  setChatOptions([]);
  setTimeout(() => {
    addBotMessage("好的，祝您生活愉快。");
    setTimeout(() => {
      setChatOptions([
        { label: "咨询商品", onClick: onAskProduct },
        { label: "其他问题", onClick: onOtherQuestions }
      ]);
    }, 400);
  }, 500);
}

function onWantOtherProducts() {
  addUserMessage("我想看看其他商品");
  setChatOptions([]);
  setTimeout(() => {
    addBotMessage("其他商品为特殊渠道商品，请先验证您的专属凭证号：");
    document.getElementById("chat-verify-row").style.display = "flex";
  }, 500);
}

function submitVerifyCode() {
  const input = document.getElementById("chat-verify-input");
  const code = input.value.trim();
  if (!code) return;
  addUserMessage(code);
  input.value = "";

  if (isValidCode(code)) {
    document.getElementById("chat-verify-row").style.display = "none";
    setTimeout(() => {
      addBotMessage("验证通过，正在为您跳转……");
      localStorage.setItem("dm_session", JSON.stringify({ code: code.toUpperCase(), at: Date.now() }));
      setTimeout(() => {
        window.location.href = "darkmarket.html";
      }, 1200);
    }, 500);
  } else {
    setTimeout(() => {
      addBotMessage("凭证无效，请重试。");
    }, 500);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const bubble = document.getElementById("chat-bubble-min");
  if (bubble) bubble.classList.add("show");
});
