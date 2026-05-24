// netlify/functions/hint-auth.js

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false })
    };
  }

  const body = JSON.parse(event.body || "{}");

  const layer = body.layer;
  const password = String(body.password || "").trim();

  const answers = {
    layer1: ["久々戸", "久々戸地区", "kuguto", "くぐと", "くぐとちく"],
    layer2: ["桃山四季", "momoyamashiki", "shikimomoyama"],
    layer3: ["オトソワカ", "おとそわか", "otosowaka"],
    layer4: ["宗吉", "そうきち", "soukiti"]
  };

  const redirects = {
    layer1: "hint-layer1.html",
    layer2: "hint-layer2.html",
    layer3: "hint-layer3.html",
    layer4: "hint-layer4.html"
  };

  const ok =
    answers[layer] &&
    answers[layer].includes(password);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: ok,
      redirect: ok ? redirects[layer] : null
    })
  };
};
