// ===== 站内数据（案件档案 & 人事名录）=====
// 后续扩展剧情线索时，直接在这两个数组里增删条目即可

const CASES = [
  { id: "c-1965-01", year: 1965, code: "AAA-65-01", title: "俄亥俄州谷仓异常燃烧事件", status: "已结案" },
  { id: "c-1971-01", year: 1971, code: "AAA-71-01", title: "雾松镇集体失忆事件", status: "已结案" },
  { id: "c-1978-01", year: 1978, code: "AAA-78-01", title: "洛克波特矿井失踪案", status: "未结案" },
  { id: "c-1989-01", year: 1989, code: "AAA-89-01", title: "黑松湖渔船异常返航事件", status: "已结案" },
  { id: "c-1993-01", year: 1993, code: "AAA-93-01", title: "第七区实验室通讯中断事件", status: "机密" },
  { id: "c-1997-01", year: 1997, code: "AAA-97-01", title: "深渊坐标测绘计划", status: "进行中" }
];

const PERSONNEL = [
  { id: "p-01", name: "艾伦·卡特", position: "局长", status: "在职" },
  { id: "p-02", name: "玛格丽特·陈", position: "副局长", status: "在职" },
  { id: "p-03", name: "王守成", position: "高级特工", status: "失踪" },
  { id: "p-04", name: "林嘉树", position: "特工", status: "在职" },
  { id: "p-05", name: "托马斯·里德", position: "档案管理员", status: "已离职" },
  { id: "p-06", name: "苏菲·贝尔", position: "现场分析员", status: "已离职" }
];

// ===== 模糊搜索（跨案件档案与人事名录）=====
function normalize(s) {
  return String(s).toLowerCase().trim();
}

function searchAll(rawQuery) {
  const q = normalize(rawQuery);
  if (!q) return [];

  const results = [];

  CASES.forEach(c => {
    const haystack = normalize(c.title + " " + c.code + " " + c.year);
    if (haystack.includes(q)) {
      results.push({
        type: "案件",
        label: c.title,
        meta: c.code + " · " + c.year + "年 · " + c.status,
        url: "cases.html#" + c.id
      });
    }
  });

  PERSONNEL.forEach(p => {
    const haystack = normalize(p.name + " " + p.position + " " + p.status);
    if (haystack.includes(q)) {
      results.push({
        type: "人员",
        label: p.name,
        meta: p.position + " · " + p.status,
        url: "personnel.html#" + p.id
      });
    }
  });

  return results;
}

function doSearch() {
  const input = document.getElementById("q");
  const resultBox = document.getElementById("result");
  const q = input.value.trim();

  if (q.length === 0) {
    resultBox.textContent = "> 请输入检索关键词";
    return;
  }

  const results = searchAll(q);

  if (results.length === 0) {
    resultBox.textContent = "> 未找到匹配结果";
    return;
  }

  resultBox.innerHTML = "> 找到 " + results.length + " 条匹配结果：<br>" +
    results.map(r =>
      '<div class="search-result-item">[' + r.type + '] <a href="' + r.url + '">' + r.label + '</a> — ' + r.meta + '</div>'
    ).join("");
}
