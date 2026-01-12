// app.js — 40 preguntas (1–3) + corrección SOLO al final (con fallos corregidos)
// === DIAGNÓSTICO: NO BORRAR HASTA QUE FUNCIONE ===
document.addEventListener("DOMContentLoaded", () => {
  const ind = document.getElementById("js-indicator");
  if (ind) ind.textContent = "JS SÍ está cargando ✅";
});
window.addEventListener("error", (e) => {
  const box = document.getElementById("js-error");
  if (box) box.textContent = `ERROR JS: ${e.message}\n${e.filename || ""}\nLínea: ${e.lineno || "?"}`;
});

const $ = (id) => document.getElementById(id);

// =====================
// Imágenes libres (Commons)
// =====================
const IMG = {
  mezquita: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/C%C3%B3rdoba%20-%20Mezquita-Catedral%20-%20Interior%20-%2004.jpg?width=1400",
    credit: "Wikimedia Commons (CC BY-SA).",
    link: "https://commons.wikimedia.org/wiki/File:C%C3%B3rdoba_-_Mezquita-Catedral_-_Interior_-_04.jpg"
  },
  medinaAzahara: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cordoba%20-%20Medina%20Azahara%2007.jpg?width=1400",
    credit: "Wikimedia Commons (CC BY-SA).",
    link: "https://commons.wikimedia.org/wiki/File:Cordoba_-_Medina_Azahara_07.jpg"
  },
  torreOro: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Torre%20del%20Oro%2C%20Seville%2C%20Spain.jpg?width=1400",
    credit: "Wikimedia Commons (CC BY-SA).",
    link: "https://commons.wikimedia.org/wiki/File:Torre_del_Oro,_Seville,_Spain.jpg"
  },
  patioLeones: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Patio%20de%20los%20Leones%20Alhambra%20Granada.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Patio_de_los_Leones_Alhambra_Granada.jpg"
  },
  mapConquista711: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Al-Andalus-711-end.svg?width=1400",
    credit: "Wikimedia Commons (SVG).",
    link: "https://commons.wikimedia.org/wiki/File:Al-Andalus-711-end.svg"
  },
  mapAlmanzor: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20Almanzor%20campaigns-es.svg?width=1400",
    credit: "Wikimedia Commons (SVG).",
    link: "https://commons.wikimedia.org/wiki/File:Map_Almanzor_campaigns-es.svg"
  },
  mapTaifas1030: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20Iberian%20Peninsula%201030-es.svg?width=1400",
    credit: "Wikimedia Commons (SVG).",
    link: "https://commons.wikimedia.org/wiki/File:Map_Iberian_Peninsula_1030-es.svg"
  },
  batallaNavas: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Battle%20of%20las%20navas%20de%20tolosa.jpg?width=1400",
    credit: "Wikimedia Commons (PD/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Battle_of_las_navas_de_tolosa.jpg"
  },
  abdRahmanIII: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Abd%20al%20Rahman%20III.jpg?width=1000",
    credit: "Wikimedia Commons (PD/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Abd_al_Rahman_III.jpg"
  },
  genericMap: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%20in%201000.jpg?width=1400",
    credit: "Wikimedia Commons (licencia en Commons).",
    link: "https://commons.wikimedia.org/wiki/File:Europe_in_1000.jpg"
  },
  genericMedieval: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Codex%20Manesse%20miniatur%20Heinrich%20von%20Veldeke.jpg?width=1400",
    credit: "Wikimedia Commons (PD/según ficha).",
    link: "https://commons.wikimedia.org/wiki/File:Codex_Manesse_miniatur_Heinrich_von_Veldeke.jpg"
  }
};

// =====================
// Helpers
// =====================
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

function barajar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// =====================
// 40 preguntas (1–3)
// =====================
const preguntas = [
  // 1) Conquista y emirato dependiente
  { tipo:"img-multi", img: IMG.mapConquista711, es:"Observa el mapa. ¿Por dónde entraron los ejércitos musulmanes en 711?", hint:"Pista: sur de la Península.", opciones:["Por el Estrecho de Gibraltar (sur)","Por los Pirineos (norte)","Por las Islas Baleares"], correcta:0, explicacion:"Entraron por el <strong>Estrecho de Gibraltar</strong>, avanzando desde el sur." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿En qué año comenzó la conquista musulmana de la Península Ibérica?", hint:"Fecha clave.", opciones:["711","732","756"], correcta:0, explicacion:"La conquista comienza en <strong>711</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿Qué batalla marcó la derrota del rey visigodo Rodrigo?", hint:"Conquista inicial.", opciones:["Las Navas de Tolosa","Guadalete","Covadonga"], correcta:1, explicacion:"La batalla de <strong>Guadalete (711)</strong> abre el camino a la ocupación." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el nombre del general que cruzó el Estrecho en 711 (1–3 palabras).", hint:"Suele aparecer como Tariq.", respuestas:["tariq","tariq ibn ziyad","tarik","tarik ibn ziyad"], explicacion:"El general fue <strong>Tariq (Tariq ibn Ziyad)</strong>." },
  { tipo:"multi", img: IMG.genericMap, es:"Entre 711 y 716, los musulmanes dominaron casi toda la península, excepto…", hint:"Piensa en el norte.", opciones:["La franja cantábrica y parte del oeste pirenaico","Toda la costa mediterránea","La Meseta Sur"], correcta:0, explicacion:"Quedaron fuera sobre todo zonas del <strong>norte</strong> (franja cantábrica) y áreas pirenaicas." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿Cómo llamaron los musulmanes al territorio peninsular bajo su poder?", hint:"Concepto clave.", opciones:["Hispania","al-Ándalus","al-Magreb"], correcta:1, explicacion:"El territorio conquistado se denominó <strong>al-Ándalus</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"En el emirato dependiente (714–756), el emir dependía del califa de…", hint:"Capital omeya oriental.", opciones:["Roma","Damasco","Córdoba"], correcta:1, explicacion:"Dependía del califa de <strong>Damasco</strong>." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe la capital del emirato en al-Ándalus (1 palabra).", hint:"Ciudad clave.", respuestas:["cordoba","córdoba"], explicacion:"La capital se estableció en <strong>Córdoba</strong>." },
  { tipo:"multi", img: IMG.genericMap, es:"¿Qué derrota (732) frenó las expediciones musulmanas más allá de los Pirineos?", hint:"Aparece como Poitiers.", opciones:["Poitiers","Guadalete","Toledo"], correcta:0, explicacion:"La derrota de <strong>Poitiers (732)</strong> frenó el avance en la Galia." },

  // 2) Emirato independiente y califato
  { tipo:"multi", img: IMG.genericMedieval, es:"¿En qué año comenzó el emirato independiente de Córdoba?", hint:"Cambio político.", opciones:["756","929","1031"], correcta:0, explicacion:"Comienza en <strong>756</strong> con Abderramán I." },
  { tipo:"corta", img: IMG.genericMedieval, es:"¿Quién proclamó el emirato independiente en 756? (1–3 palabras)", hint:"Empieza por Abder…", respuestas:["abderraman i","abderramán i","abderraman","abderramán"], explicacion:"Fue <strong>Abderramán I</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿Qué significaba que el emirato fuese ‘independiente’?", hint:"No cambia la religión, cambia la política.", opciones:["Dejó de existir el islam en al-Ándalus","Dejó de obedecer políticamente al califa abasí","Desaparecieron los impuestos"], correcta:1, explicacion:"Independiente = <strong>no obediencia política</strong> al califa abasí." },
  { tipo:"multi", img: IMG.abdRahmanIII, es:"¿En qué año Abderramán III se proclamó califa?", hint:"Inicio del califato.", opciones:["929","912","976"], correcta:0, explicacion:"En <strong>929</strong> se proclama califa." },
  { tipo:"img-multi", img: IMG.abdRahmanIII, es:"Observa la imagen. ¿A quién representa?", hint:"Personaje clave del califato.", opciones:["Abderramán III","Almanzor","Al-Hakam II"], correcta:0, explicacion:"Es <strong>Abderramán III</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Al proclamarse califa, Abderramán III pasó a ser también…", hint:"Autoridad religiosa.", opciones:["Un noble cristiano","La máxima autoridad religiosa de al-Ándalus","Un rey visigodo"], correcta:1, explicacion:"El califa es <strong>autoridad política y religiosa</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"El califa contaba con la ayuda del hayib, que era como…", hint:"Equivalencia aproximada.", opciones:["Un primer ministro","Un siervo","Un obispo"], correcta:0, explicacion:"El <strong>hayib</strong> actuaba como <strong>primer ministro</strong>." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el nombre del cargo parecido a ‘primer ministro’ (1 palabra).", hint:"ha-...", respuestas:["hayib","hajib"], explicacion:"El cargo era el <strong>hayib</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿Quiénes gobernaban provincias y marcas fronterizas (Zaragoza, Toledo, Mérida)?", hint:"Funcionarios del califa.", opciones:["Walíes","Siervos","Visigodos"], correcta:0, explicacion:"Los <strong>walíes</strong> gobernaban territorios en nombre del califa." },
  { tipo:"img-multi", img: IMG.mezquita, es:"Esta construcción es un símbolo de la Córdoba califal. ¿Qué monumento es?", hint:"Arcos bicolores.", opciones:["Mezquita de Córdoba","Alhambra","Giralda"], correcta:0, explicacion:"Es la <strong>Mezquita de Córdoba</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿Qué califa impulsó especialmente la cultura y el arte tras Abderramán III?", hint:"Empieza por Al-.", opciones:["Al-Hakam II","Musa ibn Nusayr","Rodrigo"], correcta:0, explicacion:"<strong>Al-Hakam II</strong> destacó por el impulso cultural." },
  { tipo:"img-multi", img: IMG.medinaAzahara, es:"Observa la imagen. ¿Qué conjunto es?", hint:"Ciudad palatina cerca de Córdoba.", opciones:["Medina Azahara","Toledo","Sevilla"], correcta:0, explicacion:"Es <strong>Medina Azahara</strong>." },
  { tipo:"multi", img: IMG.medinaAzahara, es:"Medina Azahara se construyó como…", hint:"Residencia y poder.", opciones:["Una aldea agrícola","Una residencia y sede del gobierno","Un castillo cristiano"], correcta:1, explicacion:"Fue <strong>residencia</strong> y <strong>sede del gobierno</strong>." },

  // 2) Almanzor y crisis
  { tipo:"multi", img: IMG.mapAlmanzor, es:"Tras la muerte de Al-Hakam II, quien concentró gran poder político y militar fue…", hint:"Figura clave de las razias.", opciones:["Almanzor","Abderramán I","Fernando III"], correcta:0, explicacion:"Fue <strong>Almanzor</strong> (hayib) con gran poder." },
  { tipo:"corta", img: IMG.mapAlmanzor, es:"¿Cómo se llamaban las campañas de saqueo contra territorios cristianos? (1 palabra)", hint:"ra-...", respuestas:["razias","razia","razzias","razzia"], explicacion:"Se llamaban <strong>razias</strong>." },
  { tipo:"img-multi", img: IMG.mapAlmanzor, es:"Observa el mapa. ¿Qué representa principalmente?", hint:"Flechas hacia el norte.", opciones:["Expediciones de Almanzor","Rutas romanas","Conquista de 711"], correcta:0, explicacion:"Representa las <strong>expediciones (razias) de Almanzor</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Entre los ataques destacados de Almanzor estuvieron…", hint:"Dos ciudades conocidas.", opciones:["Barcelona y Santiago de Compostela","Granada y Málaga","Córdoba y Sevilla"], correcta:0, explicacion:"Destacan <strong>Barcelona</strong> y <strong>Santiago de Compostela</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Tras Almanzor y sus sucesores, el califato entró en…", hint:"Clave: debilidad del poder central.", opciones:["Un periodo de estabilidad total","Graves problemas internos","Una unificación definitiva"], correcta:1, explicacion:"Tras Almanzor hubo <strong>inestabilidad</strong> y <strong>conflictos internos</strong>." },
  { tipo:"multi", img: IMG.mapTaifas1030, es:"¿En qué año desaparece el califato y se fragmenta al-Ándalus?", hint:"Inicio de taifas.", opciones:["1031","1086","1246"], correcta:0, explicacion:"En <strong>1031</strong> se considera que desaparece el califato." },

  // 3) Taifas, almorávides, almohades, nazarí
  { tipo:"img-multi", img: IMG.mapTaifas1030, es:"Observa el mapa. ¿Qué etapa ilustra principalmente?", hint:"Muchos territorios pequeños.", opciones:["Reinos de taifas","Califato unificado","Conquista de 711"], correcta:0, explicacion:"Representa la <strong>fragmentación en taifas</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Tras 1031, al-Ándalus se dividió en reinos llamados…", hint:"Palabra clave.", opciones:["Taifas","Marcas","Condados"], correcta:0, explicacion:"Se formaron <strong>reinos de taifas</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Las taifas, para evitar ataques, pagaban a reinos cristianos…", hint:"Tributos.", opciones:["Parias","Diezmos","Feudos"], correcta:0, explicacion:"Pagaban <strong>parias</strong> (tributos)." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el nombre del tributo que pagaban muchas taifas (1 palabra).", hint:"pa-...", respuestas:["parias","paria"], explicacion:"Se llamaba <strong>parias</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿Qué ciudad cayó en manos cristianas en 1085?", hint:"Hecho clave.", opciones:["Toledo","Córdoba","Granada"], correcta:0, explicacion:"En <strong>1085</strong> cayó <strong>Toledo</strong>." },

  { tipo:"multi", img: IMG.genericMap, es:"Tras el avance cristiano, los musulmanes pidieron ayuda primero a…", hint:"Potencia norteafricana.", opciones:["Almorávides","Romanos","Visigodos"], correcta:0, explicacion:"Primero pidieron ayuda a los <strong>almorávides</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Los almorávides eran…", hint:"Origen y rasgo religioso.", opciones:["Bereberes norteafricanos con islam estricto","Nobles visigodos","Mercaderes italianos"], correcta:0, explicacion:"Eran <strong>bereberes</strong> del norte de África y defendían un islam <strong>estricto</strong>." },
  { tipo:"multi", img: IMG.genericMap, es:"¿En qué año cruzaron el Estrecho los almorávides?", hint:"Final del XI.", opciones:["1086","1146","1212"], correcta:0, explicacion:"Cruzaron en <strong>1086</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Tras ocupar taifas y aplicar medidas impopulares, al-Ándalus…", hint:"Vuelve a dividirse.", opciones:["Se unificó definitivamente","Se fragmentó en segundas taifas","Conquistó Francia"], correcta:1, explicacion:"La crisis favoreció la <strong>fragmentación</strong> en <strong>segundas taifas</strong>." },

  { tipo:"multi", img: IMG.genericMap, es:"Más tarde, algunas taifas pidieron ayuda a los…", hint:"Otra potencia norteafricana.", opciones:["Almohades","Francos","Normandos"], correcta:0, explicacion:"Pidieron ayuda a los <strong>almohades</strong>." },
  { tipo:"multi", img: IMG.genericMap, es:"¿En qué año se sitúa la llegada de los almohades?", hint:"Siglo XII.", opciones:["1146","1086","1031"], correcta:0, explicacion:"La llegada almohade se sitúa en <strong>1146</strong>." },
  { tipo:"img-multi", img: IMG.batallaNavas, es:"Observa la imagen. ¿Qué batalla representa?", hint:"Fecha clave: 1212.", opciones:["Las Navas de Tolosa","Guadalete","Poitiers"], correcta:0, explicacion:"Es <strong>Las Navas de Tolosa (1212)</strong>." },
  { tipo:"multi", img: IMG.batallaNavas, es:"Tras la derrota almohade en 1212…", hint:"Consecuencia general.", opciones:["El poder almohade se desintegró y avanzó la conquista cristiana","Los almohades unificaron la península","Se creó el califato de Córdoba"], correcta:0, explicacion:"Tras 1212 se debilitó el poder almohade y avanzó la <strong>conquista cristiana</strong>." },

  { tipo:"multi", img: IMG.patioLeones, es:"El único territorio musulmán que resistió fue…", hint:"Reino final.", opciones:["Granada","Zaragoza","Toledo"], correcta:0, explicacion:"Resistió el <strong>reino nazarí de Granada</strong>." },
  { tipo:"multi", img: IMG.patioLeones, es:"¿Entre qué fechas se sitúa el reino nazarí de Granada?", hint:"Periodo final.", opciones:["1246–1492","1031–1086","929–1031"], correcta:0, explicacion:"El reino nazarí se sitúa aprox. entre <strong>1246</strong> y <strong>1492</strong>." },
  { tipo:"img-multi", img: IMG.patioLeones, es:"Observa la imagen. ¿Qué lugar es?", hint:"Muy famoso en la Alhambra.", opciones:["Patio de los Leones (Alhambra)","Mezquita de Córdoba","Torre del Oro"], correcta:0, explicacion:"Es el <strong>Patio de los Leones</strong> (Alhambra)." },
  { tipo:"multi", img: IMG.genericMedieval, es:"El reino nazarí sobrevivió durante siglos aceptando ser…", hint:"Relación política con Castilla.", opciones:["Vasallo de Castilla","Dependiente de Roma","Condado franco"], correcta:0, explicacion:"Granada aceptó ser <strong>vasallo de Castilla</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿En qué siglo alcanzó su máximo esplendor el reino nazarí?", hint:"Antes de 1492.", opciones:["Siglo XIV","Siglo X","Siglo XII"], correcta:0, explicacion:"Tuvo un gran esplendor en el <strong>siglo XIV</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"La conquista cristiana del reino nazarí se produjo en…", hint:"Fecha final.", opciones:["1492","1246","1085"], correcta:0, explicacion:"La conquista final fue en <strong>1492</strong>." },

  // Bloque de fijación (muy breves / orden / conceptos)
  { tipo:"multi", img: IMG.genericMedieval, es:"Orden correcto de etapas: emirato independiente → califato → taifas", hint:"Ponlas en orden temporal.", opciones:["756–929 → 929–1031 → desde 1031","929–1031 → 756–929 → desde 1031","Desde 1031 → 929–1031 → 756–929"], correcta:0, explicacion:"Primero <strong>emirato independiente</strong>, luego <strong>califato</strong> y después <strong>taifas</strong>." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el año del inicio del califato de Córdoba (solo números).", hint:"Abderramán III.", respuestas:["929"], explicacion:"Inicio: <strong>929</strong>." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el año del fin del califato de Córdoba (solo números).", hint:"Inicio taifas.", respuestas:["1031"], explicacion:"Fin: <strong>1031</strong>." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el año de la llegada de los almorávides (solo números).", hint:"Cruzan el Estrecho.", respuestas:["1086"], explicacion:"Llegan en <strong>1086</strong>." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el año de Las Navas de Tolosa (solo números).", hint:"Contra almohades.", respuestas:["1212"], explicacion:"Fue en <strong>1212</strong>." },
  { tipo:"corta", img: IMG.genericMedieval, es:"Escribe el año de la conquista de Granada (solo números).", hint:"Final.", respuestas:["1492"], explicacion:"Fue en <strong>1492</strong>." },

  { tipo:"multi", img: IMG.genericMedieval, es:"¿Qué explica mejor el paso a ‘taifas’?", hint:"Define el concepto.", opciones:["Fragmentación política en reinos pequeños","Unificación militar total","Desaparición de ciudades"], correcta:0, explicacion:"Taifas = <strong>fragmentación</strong> en reinos." },
  { tipo:"multi", img: IMG.genericMedieval, es:"¿Por qué fue importante la conquista de Toledo (1085) para al-Ándalus?", hint:"Consecuencia directa.", opciones:["Aumentó la presión y se pidió ayuda exterior","Creó el califato","Acabó con la agricultura"], correcta:0, explicacion:"Aumentó la presión cristiana y se pidió ayuda a <strong>almorávides</strong> y luego <strong>almohades</strong>." },
  { tipo:"multi", img: IMG.genericMedieval, es:"Secuencia correcta de ayudas norteafricanas:", hint:"Primero uno, luego otro.", opciones:["Almorávides → Almohades","Almohades → Almorávides","Francos → Normandos"], correcta:0, explicacion:"Primero <strong>almorávides</strong> y después <strong>almohades</strong>." },
  { tipo:"img-multi", img: IMG.torreOro, es:"Observa la imagen. ¿Qué monumento de Sevilla es?", hint:"Relacionado con etapa almohade.", opciones:["Torre del Oro","Catedral de Santiago","Alcázar de Segovia"], correcta:0, explicacion:"Es la <strong>Torre del Oro</strong> (Sevilla)." },
];

// Seguridad: debe ser 40
if (preguntas.length !== 40) {
  // Si alguna vez editas y cambias el número, esto te lo recuerda en consola.
  console.warn("⚠️ El test no tiene 40 preguntas. Tiene:", preguntas.length);
}

// =====================
// Estado + orden aleatorio
// =====================
let orden = [...preguntas.keys()];
barajar(orden);

let indice = 0;
let respuestasUsuario = new Array(preguntas.length).fill(null);

// =====================
// Render
// =====================
function actualizarProgreso() {
  const barra = $("progress-bar");
  const label = $("progress-label");
  const porcentaje = ((indice + 1) / preguntas.length) * 100;
  barra.style.width = porcentaje + "%";
  label.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;
}

function renderPregunta() {
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

  // Imagen si existe
  if (q.img) {
    html += `
      <div class="q-image">
        <img src="${q.img.src}" alt="Imagen de apoyo"
             onerror="this.closest('.q-image').style.display='none';">
        <div class="q-credit">${q.img.credit} ·
          <a href="${q.img.link}" target="_blank" rel="noopener">Fuente/licencia</a>
        </div>
      </div>
    `;
  }

  // Respuestas
  if (esMulti(q)) {
    const respGuardada = respuestasUsuario[idxPregunta];
    html += `<div class="options">`;
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
      <div class="hint">Consejo: 1–3 palabras (sin frases largas)</div>
    `;
  }

  cont.innerHTML = html;

  // Botones
  $("btn-prev").disabled = (indice === 0);
  $("btn-next").textContent = (indice === preguntas.length - 1) ? "Terminar test" : "Siguiente ▶";
}

// =====================
// Guardar respuesta actual
// =====================
function guardarRespuestaActual() {
  const idxPregunta = orden[indice];
  const q = preguntas[idxPregunta];

  if (esMulti(q)) {
    const marcada = document.querySelector("input[name='resp']:checked");
    if (!marcada) return false;
    respuestasUsuario[idxPregunta] = parseInt(marcada.value, 10);
    return true;
  }

  if (esCorta(q)) {
    const input = $("short-answer");
    if (!input) return false;
    const valor = input.value.trim();
    if (!valor) return false;
    respuestasUsuario[idxPregunta] = valor;
    return true;
  }

  return false;
}

// =====================
// Navegación
// =====================
function siguiente() {
  if (!guardarRespuestaActual()) {
    alert("Responde antes de continuar 🙂");
    return;
  }

  indice++;
  if (indice >= preguntas.length) {
    mostrarResultados();
  } else {
    renderPregunta();
  }
}

function anterior() {
  if (indice === 0) return;
  indice--;
  renderPregunta();
}

// =====================
// Resultados: aciertos/fallos + fallos corregidos
// =====================
function textoRespuestaUsuario(q, resp) {
  if (resp === null || resp === undefined) return "—";
  if (esMulti(q)) return q.opciones[resp] ?? "—";
  return String(resp);
}

function textoCorrecto(q) {
  if (esMulti(q)) return q.opciones[q.correcta];
  return (q.respuestas && q.respuestas[0]) ? q.respuestas[0] : "—";
}

function esCorrecta(q, resp) {
  if (resp === null || resp === undefined) return false;
  if (esMulti(q)) return resp === q.correcta;
  return coincideCorta(resp, q.respuestas);
}

function mostrarResultados() {
  $("test-card").classList.add("hidden");
  $("result-card").classList.remove("hidden");

  let correctas = 0;
  const fallos = [];

  preguntas.forEach((q, idx) => {
    const resp = respuestasUsuario[idx];
    if (esCorrecta(q, resp)) {
      correctas++;
    } else {
      fallos.push({ q, idx, resp });
    }
  });

  const total = preguntas.length;
  const errores = total - correctas;

  let html = `
    <h2>Resultados del test</h2>
    <div class="summary">
      ✅ Aciertos: <strong>${correctas}</strong> / ${total}<br>
      ❌ Fallos: <strong>${errores}</strong>
    </div>
    <div class="summary" style="margin-top:10px">
      Objetivo: aprender. Revisa abajo los fallos con la <strong>respuesta correcta</strong> y la <strong>idea clave</strong>.
    </div>
  `;

  if (fallos.length > 0) {
    html += `<div class="summary" style="margin-top:12px"><strong>Fallos corregidos</strong>:</div>`;
    html += `<ul class="list-fails">`;

    fallos.forEach(({ q, resp }) => {
      html += `
        <li>
          <span class="qtitle">${q.es}</span>
          <span class="line">Tu respuesta: <strong>${textoRespuestaUsuario(q, resp)}</strong></span>
          <span class="line">Correcta: <strong>${textoCorrecto(q)}</strong></span>
          <span class="line">${q.explicacion ?? ""}</span>
          <span class="pill-mini">Repasar 30s</span>
        </li>
      `;
    });

    html += `</ul>`;
  }

  html += `
    <div class="summary" style="margin-top:14px;text-align:center">
      <button class="btn btn-primary" onclick="location.reload()">🔁 Volver a practicar</button>
    </div>
  `;

  $("result-content").innerHTML = html;
}

// =====================
// Init
// =====================
document.addEventListener("DOMContentLoaded", () => {
  $("btn-prev").addEventListener("click", anterior);
  $("btn-next").addEventListener("click", siguiente);
  renderPregunta();
});
