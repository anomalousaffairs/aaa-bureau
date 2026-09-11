const VALID_CODES = [
  "AX-7734-QM",
  "AX-2951-LK",
  "GUEST"
];

function isValidCode(code) {
  return VALID_CODES.includes(String(code).trim().toUpperCase());
}
