// ===== 站内数据（案件档案 & 人事名录）=====
// 后续扩展剧情线索时，直接在这两个数组里增删条目即可

const CASES = [
  { id: "c-1965-08-03", year: 1965, code: "A650803O2", title: "俄亥俄州谷仓异常燃烧事件", status: "已结案" },
  { id: "c-1971-01-19", year: 1971, code: "A710119F4", title: "雾松镇集体失忆事件", status: "已结案" },
  { id: "c-1978-12-12", year: 1978, code: "A781212R8", title: "洛克波特矿井失踪案", status: "未结案" },
  { id: "c-1989-09-22", year: 1989, code: "A890922B1", title: "黑松湖渔船异常返航事件", status: "已结案" },
  { id: "c-1993-06-23", year: 1993, code: "A930623L71", title: "第七区实验室通讯中断事件", status: "机密" },
  { id: "c-1997-04-11", year: 1997, code: "A970411M212", title: "深渊坐标测绘计划", status: "进行中" },
  { id: "c-1962-03-17", year: 1962, code: "A620317K3", title: "缅因州林区无名尸体事件", status: "已结案" },
  { id: "c-1967-10-29", year: 1967, code: "A671029C7", title: "密西西比河逆流事件", status: "已结案" },
  { id: "c-1970-05-06", year: 1970, code: "A700506N5", title: "哈特福德居民集体梦游事件", status: "已结案" },
  { id: "c-1974-08-21", year: 1974, code: "A740821T2", title: "阿什顿公路重复循环事件", status: "未结案" },
  { id: "c-1976-11-03", year: 1976, code: "A761103V9", title: "怀俄明州废弃观测站事件", status: "机密" },
];

// 示例：{ id: "PF-4187", name: "埃利斯·卡特", position: "局长", status: "在职", photo: "photos/pf-4187.jpg" }
const PERSONNEL = [
{ id: "PF-4187", name: "埃利斯·卡特", position: "局长", status: "在职", photo: "photo/PF-4187.jpeg" },
{ id: "PF-0632", name: "玛格丽特·陈", position: "副局长", status: "在职" },
{ id: "PF-7714", name: "凯瑟琳·格雷", position: "总法律顾问", status: "不明" },
{ id: "PF-2958", name: "霍华尔·克雷吉", position: "监督特别探员", status: "在职" },
{ id: "PF-6403", name: "科妮莉亚·安", position: "调查部助理局长", status: "在职" },
{ id: "PF-1826", name: "塔伯·戈德史密斯", position: "情报部助理局长", status: "退役" },
{ id: "PF-5039", name: "艾萨克·阿德拉", position: "高级特工", status: "不明" },
{ id: "PF-8471", name: "诺拉·邓肯", position: "高级特工", status: "遗失" },
{ id: "PF-3264", name: "柳藤祈", position: "高级特工", status: "不明" },
{ id: "PF-9157", name: "巴顿", position: "高级特工", status: "遗失" },
{ id: "PF-2741", name: "优拉·罗伯茨", position: "特工", status: "在职" },
{ id: "PF-6085", name: "博格·托兰", position: "特工", status: "在职" },
{ id: "PF-4392", name: "珀瑟诺斯·奥德里克", position: "特工", status: "在职" },
{ id: "PF-1578", name: "奥利弗·瓦利斯", position: "特工", status: "在职" },
{ id: "PF-7246", name: "肯特·达尔文", position: "特工", status: "在职" },
{ id: "PF-3619", name: "托马斯·里德", position: "档案管理员", status: "离职" },
{ id: "PF-8823", name: "苏菲·贝尔", position: "现场分析员", status: "离职" },
{ id: "PF-5904", name: "马修·霍尔登", position: "异常研究主管", status: "遗失" },
{ id: "PF-0648", name: "艾琳·沃克", position: "异常物证管理员", status: "退役" }
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
