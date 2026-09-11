// ===== 暗网入口验证凭证 =====
// 每个玩家应拥有一个专属凭证号（例如线下发放、其他谜题解出等）。
// 在这里维护所有有效凭证，之后可以随时增删。
// 示例格式仅供参考，正式使用前请替换成你自己设计的凭证。

const VALID_CODES = [
  "AX-7734-QM",
  "AX-2951-LK",
  "AX-6603-TN"
];

function isValidCode(code) {
  return VALID_CODES.includes(String(code).trim().toUpperCase());
}
