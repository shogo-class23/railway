const fs = require('fs');
const content = fs.readFileSync('railway.html', 'utf8');

// 簡易的な抽出（companiesオブジェクトの定義箇所を切り出し）
const startStr = 'const companies = {';
const endStr = '};';
const startIndex = content.indexOf(startStr) + startStr.length - 1;
// オブジェクトの終わりを波括弧の対応で探すのは複雑なので、
// 後の `let curComp = null;` の直前までを取得
const endIndex = content.indexOf('let curComp = null;');
const rawData = content.substring(startIndex, endIndex).trim().replace(/;$/, '');

// 実行環境でオブジェクトとして評価
const companies = eval('(' + rawData + ')');

const output = [];
for (const [cid, cdata] of Object.entries(companies)) {
    if (['nerika', 'private_railways', 'jr_lines'].includes(cid)) continue;
    
    output.push(`\n### ${cdata.name}`);
    for (const [routeName, data] of Object.entries(cdata.routes)) {
        let total = 0;
        let detail = "";
        if (data.intervals) {
            total = data.intervals.reduce((a, b) => a + b, 0);
            detail = `(${data.intervals.join(' + ')})`;
        } else if (data.interval) {
            total = (data.stations.length - 1) * data.interval;
            detail = `(${data.interval} * ${data.stations.length - 1}区間)`;
        }
        output.push(`- ${routeName}: **${total.toFixed(1)} km** ${detail}`);
    }
}
console.log(output.join('\n'));
