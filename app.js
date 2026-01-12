// app.js — versión robusta sin onclick (funciona bien en GitHub Pages)

const $ = (id) => document.getElementById(id);

const IMG = {
  mezquita: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/C%C3%B3rdoba%20-%20Mezquita-Catedral%20-%20Interior%20-%2004.jpg?width=1200",
    credit: "Wikimedia Commons (CC BY-SA).",
    link: "https://commons.wikimedia.org/wiki/File:C%C3%B3rdoba_-_Mezquita-Catedral_-_Interior_-_04.jpg"
  }
};

function normalizar(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

function esMulti(q) { return q.tipo === "multi" || q.tipo === "img-multi"; }
function esCorta(q) { return q.tipo === "corta" || q.tipo === "img-corta"; }

function coincideCorta(dado, esperados) {
  const d = normalizar(dado);
  return (esperados || []).some(e => normalizar(e) === d);
}

const preguntas = [
  {
    tipo: "multi",
    es: "¿En qué año comenzó la conquista musulmana de la Península Ibérica?",
    hint: "Dato clave de inicio.",
    opciones: ["711", "732", "756"],
    correcta: 0,
    explicacion: "Comienza en <strong>711</strong>."
  },
  {
    tipo: "img-multi",
    es: "Observa la imagen. ¿Qué monumento es?",
    hint: "Arcos bicolores muy característicos.",
    img: IMG.mezquita,
    opciones: ["Mezquita de Córdoba", "Alhambra", "Giralda"],
    correcta: 0,
    explicacion: "Es la <strong>Mezquita de Córdoba</strong>."
  },
  {
    tipo: "corta",
    es: "Escribe el año de inicio del califato (solo números).",
    hint: "Abderramán III.",
    respuestas: ["929"],
    explicacion: "El califato empieza en <strong>929</strong>."
  }
];

let orden = [...preguntas.keys()];
function barajar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
barajar(orden);

let indice = 0;
let respuestasUsuario = new Array(preguntas.length).fill(null);
let ultimoFeedback = null;

function setError(msg) {
  const box = $("err");
  if (!box) return;
  if (!msg) { box.classList.add("hidden"); box.textContent = ""; return; }
  box.classList.remove("hidden");
  box.textContent = msg;
}

window.addEventListener("error", (e) => {
  setError(`⚠️ Error de JavaScript:\n${e.message}\n${e.filename || ""}\nLínea: ${e.lineno || "?"}`);
});

function actualizarProgreso() {
  const barra = $("progress-bar");
  const label = $("progress-label");
  const porcentaje = ((indice + 1) / preguntas.length) * 100;
  barra.style.width = porcentaje + "%";
  label.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
}

function renderPregunta() {
  setError(""); // limpia
  actualizarProgreso();

  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];
  const cont = $("question-container");

  let html = `
    <div class="question-text">
      <span class="q-es">${q.es}</span>
      <span class="q-hint">${q.hint ?? ""}</span>
    </div>
  `;

  if (q.img) {
    html += `
      <div class="q-image">
        <img src="${q.img.src}" alt="Imagen de apoyo"
             onerror="this.closest('.q-image').style.display='none'">
        <div class="q-credit">${q.img.credit} ·
          <a href="${q.img.link}" target="_blank" rel="noopener">Fuente/licencia</a>
        </div>
      </div>
    `;
  }

  if (esMulti(q)) {
    html += `<div class="options">`;
    const respGuardada = respuestasUsuario[idxPregunta];
    q.opciones.forEach((op, iOp) => {
      const checked = respGuardada === iOp ? "checked" : "";
      html += `
        <label class="option">
          <input type="radio" name="resp" value="${iOp}" ${checked}>
          <div class="option-text">${op}</div>
        </label>
      `;
    });
    html += `</div>`;
  } else if (esCorta(q)) {
    const valor = respuestasUsuario[idxPregunta] ?? "";
    html += `
      <input id="short-answer" class="short-answer" type="text"
             value="${valor}" placeholder="Respuesta muy breve (1–3 palabras)">
      <div class="hint">Escribe lo mínimo imprescindible</div>
    `;
  } else {
    setError("Tipo de pregunta desconocido: " + q.tipo);
  }

  cont.innerHTML = html;

  // Estado botones
  $("btn-prev").disabled = (indice === 0);
  $("btn-next").textContent = (indice === preguntas.length - 1)
    ? "Comprobar y terminar"
    : "Comprobar y seguir ▶";
}

function guardarYCorregirActual() {
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];

  if (esMulti(q)) {
    const marcada = document.querySelector("input[name='resp']:checked");
    if (!marcada) return { ok: null, reason: "Marca una opción." };
    const val = parseInt(marcada.value, 10);
    respuestasUsuario[idxPregunta] = val;
    return { ok: (val === q.correcta), q, idxPregunta };
  }

  if (esCorta(q)) {
    const input = $("short-answer");
    if (!input) return { ok: null, reason: "Escribe una respuesta." };
    const valor = input.value.trim();
    if (!valor) return { ok: null, reason: "Escribe una respuesta." };
    respuestasUsuario[idxPregunta] = valor;
    return { ok: coincideCorta(valor, q.respuestas), q, idxPregunta };
  }

  return { ok: null, reason: "Tipo desconocido: " + q.tipo };
}

function abrirFeedback(info) {
  ultimoFeedback = info;
  $("overlay").classList.remove("hidden");

  const badge = $("fb-badge");
  badge.className = "badge " + (info.ok ? "ok" : "no");
  badge.textContent = info.ok ? "✅ Correcto" : "❌ Casi: mira la idea clave";

  $("fb-title").textContent = info.q.es;
  $("fb-explain").innerHTML = info.q.explicacion ?? "—";
}

function cerrarFeedback() {
  $("overlay").classList.add("hidden");
}

function continuarTrasFeedback() {
  cerrarFeedback();
  indice++;
  if (indice >= preguntas.length) {
    // Demo: reinicia
    alert("Fin de demo ✅ (cuando confirmes que funciona, meto las 40 aquí).");
    location.reload();
    return;
  }
  renderPregunta();
}

function siguiente() {
  const res = guardarYCorregirActual();
  if (res.ok === null) { alert(res.reason); return; }
  abrirFeedback(res);
}

function anterior() {
  if (indice === 0) return;
  indice--;
  renderPregunta();
}

document.addEventListener("DOMContentLoaded", () => {
  $("btn-prev").addEventListener("click", anterior);
  $("btn-next").addEventListener("click", siguiente);
  $("btn-close").addEventListener("click", cerrarFeedback);
  $("btn-continue").addEventListener("click", continuarTrasFeedback);
  renderPregunta();
});
