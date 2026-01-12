// app.js — 40 preguntas (1–3) + corrección SOLO al final (con fallos corregidos)

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
  { tipo:"multi", img: IMG.genericMedieval, es:"En el emirato dependiente (714–756), el emir dependía del califa de…", hint:"Capital omeya oriental.", opciones:["Roma","Damasco","Córdoba"], correcta:1, ex
