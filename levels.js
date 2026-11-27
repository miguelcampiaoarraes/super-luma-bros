// Definição das 10 fases de Super Luma Bros
// Cada fase possui: nome, atributo especial, história, cores, física e layout.

const LEVELS = [
  {
    id: 1,
    name: "Planície dos Cogumelos",
    attrName: "Clássico",
    attrDesc: "Atributo: Aventura Clássica — Quebre blocos '?' para pegar poderes!",
    story: "Luma parte da Vila Veridia. O primeiro Cristal Estelar caiu nas Planícies dos Cogumelos, agora patrulhadas pelos Slimes de Malakor. Pule sobre eles para derrotá-los!",
    bgTop: "#4facfe",
    bgBottom: "#00f2fe",
    groundColor: "#38b000",
    dirtColor: "#7f4f24",
    width: 2600,
    gravity: 0.58,
    friction: 0.82,
    doubleJump: false,
    dash: false,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 750, h: 70, type: "ground" },
      { x: 860, y: 470, w: 650, h: 70, type: "ground" },
      { x: 1620, y: 470, w: 980, h: 70, type: "ground" },
      { x: 260, y: 360, w: 120, h: 24, type: "brick" },
      { x: 480, y: 310, w: 140, h: 24, type: "brick" },
      { x: 980, y: 360, w: 130, h: 24, type: "brick" },
      { x: 1220, y: 280, w: 150, h: 24, type: "brick" },
      { x: 1750, y: 350, w: 140, h: 24, type: "brick" },
      { x: 2020, y: 290, w: 160, h: 24, type: "brick" }
    ],
    qBlocks: [
      { x: 310, y: 260, reward: "mushroom" },
      { x: 540, y: 210, reward: "coin" },
      { x: 1030, y: 260, reward: "flower" },
      { x: 1810, y: 250, reward: "star" }
    ],
    coins: [
      { x: 280, y: 320 }, { x: 320, y: 320 }, { x: 520, y: 270 },
      { x: 800, y: 390 }, { x: 1260, y: 240 }, { x: 1300, y: 240 },
      { x: 1560, y: 390 }, { x: 2070, y: 250 }, { x: 2110, y: 250 }
    ],
    enemies: [
      { x: 430, y: 438, minX: 200, maxX: 700, speed: 1.5, type: "slime" },
      { x: 1050, y: 438, minX: 880, maxX: 1450, speed: 1.8, type: "slime" },
      { x: 1850, y: 438, minX: 1650, maxX: 2250, speed: 2.0, type: "slime" }
    ],
    hazards: [],
    portals: [],
    goal: { x: 2460, y: 390 }
  },
  {
    id: 2,
    name: "Floresta da Gravidade Lunar",
    attrName: "Baixa Gravidade",
    attrDesc: "Atributo: Pulo Lunar — A gravidade é 50% menor, alcance as copas das árvores!",
    story: "O segundo cristal alterou a gravidade desta floresta antiga. Luma sente seu corpo leve como uma pluma. Use pulos altos para alcançar plataformas suspensas!",
    bgTop: "#2b1055",
    bgBottom: "#7597de",
    groundColor: "#52b788",
    dirtColor: "#3c1642",
    width: 2700,
    gravity: 0.30,
    friction: 0.84,
    doubleJump: false,
    dash: false,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 500, h: 70, type: "ground" },
      { x: 650, y: 400, w: 180, h: 24, type: "brick" },
      { x: 930, y: 310, w: 180, h: 24, type: "brick" },
      { x: 1200, y: 220, w: 200, h: 24, type: "brick" },
      { x: 1500, y: 360, w: 220, h: 24, type: "moving", rangeX: 140, speed: 1.6 },
      { x: 1880, y: 260, w: 180, h: 24, type: "brick" },
      { x: 2150, y: 470, w: 550, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 720, y: 280, reward: "mushroom" },
      { x: 1280, y: 120, reward: "flower" },
      { x: 1950, y: 150, reward: "star" }
    ],
    coins: [
      { x: 680, y: 350 }, { x: 740, y: 350 }, { x: 980, y: 260 },
      { x: 1030, y: 260 }, { x: 1250, y: 170 }, { x: 1320, y: 170 },
      { x: 1600, y: 300 }, { x: 1930, y: 210 }, { x: 2280, y: 420 }
    ],
    enemies: [
      { x: 300, y: 438, minX: 120, maxX: 460, speed: 1.5, type: "slime" },
      { x: 1260, y: 188, minX: 1210, maxX: 1360, speed: 1.2, type: "bat" },
      { x: 2300, y: 438, minX: 2180, maxX: 2500, speed: 2.0, type: "shooter" }
    ],
    hazards: [],
    portals: [],
    goal: { x: 2560, y: 390 }
  },
  {
    id: 3,
    name: "Caverna de Cristal & Gelo",
    attrName: "Piso Escorregadio",
    attrDesc: "Atributo: Gelo Escorregadio — Cuidado com a inércia e os espinhos de gelo!",
    story: "Nas profundezas congeladas, o terceiro cristal brilha entre estalactites. O chão de gelo faz Luma deslizar — controle seus passos com precisão!",
    bgTop: "#0f2027",
    bgBottom: "#2c5364",
    groundColor: "#a8dadc",
    dirtColor: "#457b9d",
    width: 2800,
    gravity: 0.58,
    friction: 0.96,
    doubleJump: false,
    dash: false,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 680, h: 70, type: "ground" },
      { x: 790, y: 420, w: 220, h: 24, type: "ice" },
      { x: 1100, y: 350, w: 220, h: 24, type: "ice" },
      { x: 1420, y: 470, w: 580, h: 70, type: "ground" },
      { x: 1580, y: 340, w: 160, h: 24, type: "moving", rangeX: 120, speed: 1.8 },
      { x: 2100, y: 390, w: 200, h: 24, type: "ice" },
      { x: 2380, y: 470, w: 420, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 400, y: 350, reward: "mushroom" },
      { x: 1180, y: 240, reward: "flower" },
      { x: 1780, y: 350, reward: "coin" }
    ],
    coins: [
      { x: 850, y: 370 }, { x: 910, y: 370 }, { x: 1160, y: 300 },
      { x: 1220, y: 300 }, { x: 1640, y: 290 }, { x: 2160, y: 340 },
      { x: 2220, y: 340 }
    ],
    enemies: [
      { x: 450, y: 438, minX: 250, maxX: 640, speed: 1.8, type: "slime" },
      { x: 1600, y: 438, minX: 1450, maxX: 1950, speed: 2.2, type: "slime" }
    ],
    hazards: [
      { x: 520, y: 452, w: 60, h: 18, type: "spikes" },
      { x: 1700, y: 452, w: 80, h: 18, type: "spikes" }
    ],
    portals: [],
    goal: { x: 2660, y: 390 }
  },
  {
    id: 4,
    name: "Deserto dos Ventos Cortantes",
    attrName: "Vento Dinâmico",
    attrDesc: "Atributo: Rajadas de Vento — O vento muda de direção e empurra você!",
    story: "Cruzando as dunas douradas, tempestades de areia sopram sem parar. Observe a direção do vento no ar para não cair nos abismos!",
    bgTop: "#ff9966",
    bgBottom: "#ff5e62",
    groundColor: "#e9c46a",
    dirtColor: "#b5651d",
    width: 2800,
    gravity: 0.58,
    friction: 0.82,
    doubleJump: false,
    dash: false,
    wind: 0.16,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 600, h: 70, type: "ground" },
      { x: 700, y: 400, w: 160, h: 24, type: "brick" },
      { x: 960, y: 330, w: 160, h: 24, type: "brick" },
      { x: 1220, y: 470, w: 500, h: 70, type: "ground" },
      { x: 1820, y: 380, w: 180, h: 24, type: "moving", rangeX: 100, speed: 2.0 },
      { x: 2120, y: 310, w: 160, h: 24, type: "brick" },
      { x: 2360, y: 470, w: 440, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 350, y: 350, reward: "mushroom" },
      { x: 1450, y: 350, reward: "flower" },
      { x: 2180, y: 200, reward: "star" }
    ],
    coins: [
      { x: 760, y: 350 }, { x: 1020, y: 280 }, { x: 1380, y: 420 },
      { x: 1440, y: 420 }, { x: 1880, y: 330 }, { x: 2180, y: 260 }
    ],
    enemies: [
      { x: 400, y: 438, minX: 200, maxX: 560, speed: 1.7, type: "slime" },
      { x: 1400, y: 438, minX: 1250, maxX: 1680, speed: 2.1, type: "shooter" },
      { x: 2480, y: 438, minX: 2380, maxX: 2620, speed: 2.0, type: "slime" }
    ],
    hazards: [
      { x: 1520, y: 452, w: 60, h: 18, type: "spikes" }
    ],
    portals: [],
    goal: { x: 2670, y: 390 }
  },
  {
    id: 5,
    name: "Pântano Tóxico",
    attrName: "Pulo Duplo",
    attrDesc: "Atributo: Pulo Duplo Liberado! — Pressione Pular no ar para saltar duas vezes!",
    story: "O quinto cristal infectou o pântano com lagos ácidos, mas despertou em Luma o poder do Pulo Duplo! Use o segundo salto no ar para cruzar os poços venenosos.",
    bgTop: "#134e5e",
    bgBottom: "#71b280",
    groundColor: "#4a7c59",
    dirtColor: "#2d3a3a",
    width: 2900,
    gravity: 0.56,
    friction: 0.82,
    doubleJump: true,
    dash: false,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 480, h: 70, type: "ground" },
      { x: 480, y: 495, w: 380, h: 45, type: "acid" },
      { x: 600, y: 390, w: 130, h: 24, type: "brick" },
      { x: 860, y: 470, w: 420, h: 70, type: "ground" },
      { x: 1280, y: 495, w: 460, h: 45, type: "acid" },
      { x: 1400, y: 370, w: 140, h: 24, type: "moving", rangeX: 110, speed: 1.9 },
      { x: 1740, y: 470, w: 400, h: 70, type: "ground" },
      { x: 2140, y: 495, w: 300, h: 45, type: "acid" },
      { x: 2240, y: 360, w: 120, h: 24, type: "brick" },
      { x: 2440, y: 470, w: 460, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 280, y: 350, reward: "mushroom" },
      { x: 1050, y: 350, reward: "flower" },
      { x: 1900, y: 350, reward: "coin" }
    ],
    coins: [
      { x: 640, y: 340 }, { x: 980, y: 420 }, { x: 1450, y: 320 },
      { x: 1850, y: 420 }, { x: 2280, y: 310 }, { x: 2550, y: 420 }
    ],
    enemies: [
      { x: 1000, y: 438, minX: 880, maxX: 1240, speed: 2.0, type: "slime" },
      { x: 1900, y: 438, minX: 1760, maxX: 2100, speed: 2.2, type: "slime" }
    ],
    hazards: [],
    portals: [],
    goal: { x: 2760, y: 390 }
  },
  {
    id: 6,
    name: "Cidade nas Nuvens",
    attrName: "Dash + Nuvens Frágeis",
    attrDesc: "Atributo: Dash Aéreo (Shift/X) + Nuvens que somem após pisar!",
    story: "Acima das montanhas, Luma desbloqueia o Dash Aéreo! Mas atenção: as plataformas de nuvem desaparecem segundos após você pisar nelas.",
    bgTop: "#89f7fe",
    bgBottom: "#66a6ff",
    groundColor: "#ffffff",
    dirtColor: "#caf0f8",
    width: 3000,
    gravity: 0.54,
    friction: 0.84,
    doubleJump: true,
    dash: true,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 420, h: 70, type: "ground" },
      { x: 520, y: 410, w: 140, h: 24, type: "vanish" },
      { x: 760, y: 350, w: 140, h: 24, type: "vanish" },
      { x: 1020, y: 290, w: 150, h: 24, type: "vanish" },
      { x: 1300, y: 380, w: 260, h: 24, type: "brick" },
      { x: 1680, y: 330, w: 140, h: 24, type: "vanish" },
      { x: 1940, y: 270, w: 140, h: 24, type: "vanish" },
      { x: 2220, y: 360, w: 160, h: 24, type: "moving", rangeX: 130, speed: 2.2 },
      { x: 2540, y: 470, w: 460, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 260, y: 350, reward: "mushroom" },
      { x: 1410, y: 260, reward: "flower" },
      { x: 2620, y: 350, reward: "star" }
    ],
    coins: [
      { x: 570, y: 360 }, { x: 810, y: 300 }, { x: 1080, y: 240 },
      { x: 1730, y: 280 }, { x: 1990, y: 220 }, { x: 2280, y: 310 }
    ],
    enemies: [
      { x: 1400, y: 348, minX: 1310, maxX: 1520, speed: 1.6, type: "bat" },
      { x: 2680, y: 438, minX: 2560, maxX: 2840, speed: 2.2, type: "slime" }
    ],
    hazards: [],
    portals: [],
    goal: { x: 2880, y: 390 }
  },
  {
    id: 7,
    name: "Vulcão Magmático",
    attrName: "Lava & Bolas de Fogo",
    attrDesc: "Atributo: Calor Extremo — Desvie das chamas que saltam da lava!",
    story: "O sétimo cristal repousa no coração de um vulcão ativo. Use o Pulo Duplo e o Dash para escapar das erupções de magma!",
    bgTop: "#200122",
    bgBottom: "#6f0000",
    groundColor: "#4a4e69",
    dirtColor: "#22223b",
    width: 3000,
    gravity: 0.58,
    friction: 0.82,
    doubleJump: true,
    dash: true,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 460, h: 70, type: "ground" },
      { x: 460, y: 495, w: 500, h: 45, type: "lava" },
      { x: 560, y: 380, w: 130, h: 24, type: "brick" },
      { x: 780, y: 320, w: 130, h: 24, type: "brick" },
      { x: 960, y: 470, w: 420, h: 70, type: "ground" },
      { x: 1380, y: 495, w: 620, h: 45, type: "lava" },
      { x: 1480, y: 370, w: 140, h: 24, type: "moving", rangeX: 140, speed: 2.4 },
      { x: 1780, y: 300, w: 140, h: 24, type: "vanish" },
      { x: 2000, y: 470, w: 400, h: 70, type: "ground" },
      { x: 2400, y: 495, w: 200, h: 45, type: "lava" },
      { x: 2600, y: 470, w: 400, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 280, y: 350, reward: "mushroom" },
      { x: 1140, y: 350, reward: "flower" },
      { x: 2150, y: 350, reward: "star" }
    ],
    coins: [
      { x: 610, y: 330 }, { x: 830, y: 270 }, { x: 1140, y: 420 },
      { x: 1540, y: 320 }, { x: 1830, y: 250 }, { x: 2220, y: 420 }
    ],
    enemies: [
      { x: 1100, y: 438, minX: 980, maxX: 1340, speed: 2.3, type: "shooter" },
      { x: 2180, y: 438, minX: 2020, maxX: 2360, speed: 2.5, type: "slime" }
    ],
    hazards: [
      { x: 690, y: 460, w: 24, h: 24, type: "fireball", minY: 220, maxY: 480, speed: 4.5 },
      { x: 1680, y: 460, w: 24, h: 24, type: "fireball", minY: 200, maxY: 480, speed: 5.0 },
      { x: 2490, y: 460, w: 24, h: 24, type: "fireball", minY: 220, maxY: 480, speed: 4.8 }
    ],
    portals: [],
    goal: { x: 2860, y: 390 }
  },
  {
    id: 8,
    name: "Laboratório Neon",
    attrName: "Portais de Teletransporte",
    attrDesc: "Atributo: Portais Quânticos — Entre nos portais brilhantes para atravessar muros!",
    story: "Malakor construiu um laboratório futurista para drenar a energia dos cristais. Use os portais de teletransporte para superar as barreiras de laser!",
    bgTop: "#090d16",
    bgBottom: "#1b1464",
    groundColor: "#00f5d4",
    dirtColor: "#16213e",
    width: 3000,
    gravity: 0.56,
    friction: 0.84,
    doubleJump: true,
    dash: true,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 750, h: 70, type: "ground" },
      { x: 750, y: 150, w: 40, h: 390, type: "brick" }, // Muro
      { x: 900, y: 470, w: 650, h: 70, type: "ground" },
      { x: 1550, y: 150, w: 40, h: 390, type: "brick" }, // Muro 2
      { x: 1700, y: 470, w: 500, h: 70, type: "ground" },
      { x: 2300, y: 380, w: 180, h: 24, type: "moving", rangeX: 120, speed: 2.3 },
      { x: 2600, y: 470, w: 400, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 320, y: 350, reward: "mushroom" },
      { x: 1180, y: 350, reward: "flower" },
      { x: 1920, y: 350, reward: "star" }
    ],
    coins: [
      { x: 500, y: 420 }, { x: 550, y: 420 }, { x: 1120, y: 420 },
      { x: 1880, y: 420 }, { x: 2370, y: 330 }, { x: 2700, y: 420 }
    ],
    enemies: [
      { x: 450, y: 438, minX: 250, maxX: 680, speed: 2.2, type: "slime" },
      { x: 1200, y: 438, minX: 950, maxX: 1480, speed: 2.5, type: "shooter" },
      { x: 1950, y: 438, minX: 1740, maxX: 2150, speed: 2.6, type: "slime" }
    ],
    hazards: [
      { x: 1320, y: 452, w: 70, h: 18, type: "spikes" }
    ],
    portals: [
      { x: 660, y: 405, targetX: 940, targetY: 400, color: "#00f5d4" },
      { x: 1460, y: 405, targetX: 1740, targetY: 400, color: "#f72585" }
    ],
    goal: { x: 2860, y: 390 }
  },
  {
    id: 9,
    name: "Floresta Sombria",
    attrName: "Escuridão & Lanterna",
    attrDesc: "Atributo: Visão Limitada — Apenas a luz de Luma ilumina o caminho!",
    story: "Falta apenas um cristal antes do castelo! A Floresta Sombria está tomada pela névoa negra de Malakor. Confie na sua luz e nos seus reflexos!",
    bgTop: "#05050a",
    bgBottom: "#141428",
    groundColor: "#3c096c",
    dirtColor: "#10002b",
    width: 3000,
    gravity: 0.56,
    friction: 0.82,
    doubleJump: true,
    dash: true,
    wind: 0,
    darkness: true,
    platforms: [
      { x: 0, y: 470, w: 550, h: 70, type: "ground" },
      { x: 670, y: 400, w: 160, h: 24, type: "brick" },
      { x: 940, y: 330, w: 160, h: 24, type: "vanish" },
      { x: 1200, y: 470, w: 520, h: 70, type: "ground" },
      { x: 1840, y: 380, w: 160, h: 24, type: "moving", rangeX: 120, speed: 2.2 },
      { x: 2140, y: 310, w: 160, h: 24, type: "brick" },
      { x: 2420, y: 470, w: 580, h: 70, type: "ground" }
    ],
    qBlocks: [
      { x: 320, y: 350, reward: "mushroom" },
      { x: 1420, y: 350, reward: "flower" },
      { x: 2200, y: 200, reward: "star" }
    ],
    coins: [
      { x: 730, y: 350 }, { x: 1000, y: 280 }, { x: 1380, y: 420 },
      { x: 1900, y: 330 }, { x: 2200, y: 260 }, { x: 2600, y: 420 }
    ],
    enemies: [
      { x: 400, y: 438, minX: 200, maxX: 520, speed: 2.1, type: "bat" },
      { x: 1450, y: 438, minX: 1240, maxX: 1680, speed: 2.5, type: "shooter" },
      { x: 2600, y: 438, minX: 2450, maxX: 2800, speed: 2.7, type: "slime" }
    ],
    hazards: [
      { x: 1550, y: 452, w: 60, h: 18, type: "spikes" }
    ],
    portals: [],
    goal: { x: 2860, y: 390 }
  },
  {
    id: 10,
    name: "Castelo do Eclipse (Chefe)",
    attrName: "Batalha Final",
    attrDesc: "Atributo: Chefe Final — Pule na cabeça de Lorde Malakor 5 vezes para vencer!",
    story: "Você chegou ao Castelo do Eclipse! Lorde Malakor guarda o 10º Cristal Estelar. Desvie de suas esferas sombrias e pule em sua cabeça para salvar Veridia!",
    bgTop: "#1a0000",
    bgBottom: "#3d0814",
    groundColor: "#6c757d",
    dirtColor: "#212529",
    width: 1800,
    gravity: 0.56,
    friction: 0.84,
    doubleJump: true,
    dash: true,
    wind: 0,
    darkness: false,
    platforms: [
      { x: 0, y: 470, w: 1800, h: 70, type: "ground" },
      { x: 260, y: 350, w: 160, h: 24, type: "brick" },
      { x: 640, y: 280, w: 180, h: 24, type: "brick" },
      { x: 1060, y: 350, w: 160, h: 24, type: "brick" }
    ],
    qBlocks: [
      { x: 320, y: 230, reward: "mushroom" },
      { x: 710, y: 170, reward: "flower" },
      { x: 1120, y: 230, reward: "mushroom" }
    ],
    coins: [
      { x: 290, y: 300 }, { x: 360, y: 300 },
      { x: 690, y: 230 }, { x: 750, y: 230 },
      { x: 1090, y: 300 }, { x: 1160, y: 300 }
    ],
    enemies: [],
    hazards: [],
    portals: [],
    boss: {
      x: 1350,
      y: 380,
      w: 72,
      h: 90,
      hp: 5,
      maxHp: 5,
      minX: 850,
      maxX: 1650,
      speed: 2.6
    },
    goal: null // Vitória ao derrotar o chefe!
  }
];
