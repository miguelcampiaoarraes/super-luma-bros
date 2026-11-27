// Sprites Pixel Art 16-bit para Super Mu
// Renderizador de matrizes pixeladas com contorno preto nítido

function drawPixelSprite(ctx, grid, palette, x, y, pixelSize, flipX = false) {
  const rows = grid.length;
  const cols = grid[0].length;
  ctx.save();
  for (let r = 0; r < rows; r++) {
    const rowStr = grid[r];
    for (let c = 0; c < cols; c++) {
      const ch = rowStr[c];
      if (ch === "." || !palette[ch]) continue;
      ctx.fillStyle = palette[ch];
      const drawX = flipX ? x + (cols - 1 - c) * pixelSize : x + c * pixelSize;
      ctx.fillRect(Math.floor(drawX), Math.floor(y + r * pixelSize), Math.ceil(pixelSize), Math.ceil(pixelSize));
    }
  }
  ctx.restore();
}

// 1. Vaca Pixel Art (inspirada na imagem de referência 1)
const COW_SPRITE = [
  "......KK.KK.....",
  ".....KYK.KYK....",
  "....KBBKKWWBK...",
  "...KBBWWWWWWWK..",
  "...KBWWWWKWWWK..",
  "....KWWWWWWWWK..",
  "..KKKWWWWSSSSSK.",
  ".KBWKWWWKSSKSSK.",
  "KBBWWWWWWSSSSSK.",
  "KBBWWWWWWKKKKK..",
  "KWWWWBBWWWWK....",
  "KWWWWBBWWWWK....",
  ".KKKKKKKKKKK....",
  "..KBBK..KBBK....",
  "..KKKK..KKKK...."
];

const COW_PALETTE_NORMAL = {
  K: "#111111", // Contorno preto
  W: "#ffffff", // Corpo branco
  B: "#8b3a0e", // Manchas marrom
  Y: "#ffdd00", // Chifres dourados
  S: "#d48c6a"  // Focinho
};

const COW_PALETTE_FIRE = {
  K: "#111111",
  W: "#fff3b0", // Dourado claro
  B: "#ff2a2a", // Manchas vermelho fogo
  Y: "#ffdd00",
  S: "#ff8fa3"
};

// 2. Inimigo Goomba/Cogumelo Bravo (inspirado na imagem 3)
const SLIME_SPRITE = [
  "....KKKKKK....",
  "..KKBBBBBBKK..",
  ".KBBBBBBBBBBK.",
  "KBBWWKBBKWWBBK",
  "KBBWKKBBKKWBBK",
  "KBBBBBBBBBBBBK",
  ".KKKKKKKKKKKK.",
  "...KSSSSSSK...",
  "..KSSSSSSSSK..",
  "..KSSKKKKSSK..",
  ".KKKK....KKKK."
];

const SLIME_PALETTE = {
  K: "#111111",
  B: "#a44a14",
  W: "#ffffff",
  S: "#f4d3a1"
};

// 3. Inimigo Atirador (Planta/Canhão Piranha Pixel Art)
const SHOOTER_SPRITE = [
  "..KKKK..KKKK..",
  ".KRRRRKKRRRRK.",
  "KRRWWRKKRWWWRK",
  "KRRRRRRRRRRRRK",
  ".KRRKKKKKKRRK.",
  "..KKKKKKKKKK..",
  "....KGGGGK....",
  "...KGGGGGGK...",
  "....KGGGGK....",
  "..KKGGGGGGKK..",
  ".KGGGGGGGGGGK.",
  ".KKKKKKKKKKKK."
];

const SHOOTER_PALETTE = {
  K: "#111111",
  R: "#ff2a2a",
  W: "#ffffff",
  G: "#34c759"
};

// 4. Inimigo Voador (Morcego Pixel Art)
const BAT_SPRITE = [
  "KK..........KK",
  "KPK..KKKK..KPK",
  "KPPKKPPPPKKPPK",
  ".KPPPPPPPPPPK.",
  "..KPPYPPYPPK..",
  "..KPPPPPPPPK..",
  "...KKKKKKKK..."
];

const BAT_PALETTE = {
  K: "#111111",
  P: "#7209b7",
  Y: "#ffdd00"
};

// 5. Chefe Final: Cavaleiro Armadura Dourada (inspirado na imagem 4)
const BOSS_SPRITE = [
  "...KY....YK...",
  "..KYYK..KYYK..",
  "..KGGGGGGGGK..",
  "..KGYGYGYGYK..",
  "..KGYGYGYGYK..",
  "..KKKKKKKKKK..",
  ".KGGYYYYYYGGK.",
  "KSSKYYYYYYKCCK",
  "KSSKGGGGGGKCCK",
  "KSSKYYYYYYKCCK",
  ".KK.KGGGGK.KK.",
  "....KGGKGGK...",
  "...KGGK.KGGK..",
  "...KKK...KKK.."
];

const BOSS_PALETTE = {
  K: "#111111",
  Y: "#ffdd00",
  G: "#6c757d",
  S: "#4cc9f0", // Escudo
  C: "#00f5d4"  // Martelo brilhante
};

// 6. Bloco "?" Pixel Art
const QBLOCK_SPRITE = [
  "KKKKKKKKKKKK",
  "KYYYYYYYYYYK",
  "KYKYYKKYYKYK",
  "KYYYKKKKYYYK",
  "KYYYKYYKYYYK",
  "KYYYYYYKYYYK",
  "KYYYYKKYYYYK",
  "KYYYYKKYYYYK",
  "KYYYYYYYYYYK",
  "KYKYYKKYYKYK",
  "KYYYYYYYYYYK",
  "KKKKKKKKKKKK"
];

// 7. Moeda Pixel Art
const COIN_SPRITE = [
  "..KKKK..",
  ".KYYYYK.",
  "KYWYYWYK",
  "KYWYYWYK",
  "KYWYYWYK",
  "KYWYYWYK",
  ".KYYYYK.",
  "..KKKK.."
];

// 7b. Itens das Lucky Blocks (Cogumelo, Flor de Fogo, Estrela)
const MUSHROOM_SPRITE = [
  "...KKKKKK...",
  ".KKRRRRRRKK.",
  "KRRWWRRRWWRK",
  "KRWWWRRWWWRK",
  "KRRRRRRRRRRK",
  ".KKKKKKKKKK.",
  "..KSSSSSSK..",
  "..KSKSSKSK..",
  "..KSSSSSSK..",
  "...KKKKKK..."
];

const FLOWER_SPRITE = [
  "..KKKKKKKK..",
  ".KWWWWWWWWK.",
  "KWWOOOOOOWWK",
  "KWWOYYYYOWWK",
  "KWWOOOOOOWWK",
  ".KWWWWWWWWK.",
  "..KKKKKKKK..",
  "....KGGK....",
  ".KK.KGGK.KK.",
  "KGGKKGGKKGGK",
  ".KKKKKKKKKK."
];

const STAR_SPRITE = [
  ".....KK.....",
  "....KYYK....",
  "....KYYK....",
  "KKKKYYYYKKKK",
  "KYYYYYYYYYYK",
  ".KYYKYYKYYK.",
  "..KYKYYKYK..",
  "..KYYYYYYK..",
  ".KYYK..KYYK.",
  "KKKK....KKKK"
];

// 8. Fundo Parallax Pixel Art (Montanhas e Pinheiros inspirados na imagem 2)
function drawPixelParallax(ctx, cameraX, canvasWidth, canvasHeight, level) {
  // Nuvens pixeladas
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  for (let i = 0; i < 6; i++) {
    const cx = ((i * 260 - cameraX * 0.15) % (canvasWidth + 200) + (canvasWidth + 200)) % (canvasWidth + 200) - 100;
    const cy = 50 + (i % 3) * 35;
    ctx.fillRect(cx, cy, 64, 16);
    ctx.fillRect(cx + 12, cy - 10, 40, 10);
    ctx.fillRect(cx + 22, cy - 16, 20, 6);
  }

  // Montanhas pixeladas ao fundo
  for (let i = 0; i < 5; i++) {
    const mx = ((i * 320 - cameraX * 0.25) % (canvasWidth + 320) + (canvasWidth + 320)) % (canvasWidth + 320) - 160;
    const mh = 140 + (i % 2) * 50;
    const my = canvasHeight - 70 - mh;
    ctx.fillStyle = level.id === 3 ? "#457b9d" : "#e76f51";
    ctx.beginPath();
    ctx.moveTo(mx, canvasHeight - 70);
    ctx.lineTo(mx + 120, my);
    ctx.lineTo(mx + 240, canvasHeight - 70);
    ctx.closePath();
    ctx.fill();

    // Topo nevado
    ctx.fillStyle = "#f1faee";
    ctx.beginPath();
    ctx.moveTo(mx + 120, my);
    ctx.lineTo(mx + 85, my + 42);
    ctx.lineTo(mx + 105, my + 35);
    ctx.lineTo(mx + 120, my + 45);
    ctx.lineTo(mx + 135, my + 35);
    ctx.lineTo(mx + 155, my + 42);
    ctx.closePath();
    ctx.fill();
  }

  // Pinheiros pixelados
  ctx.fillStyle = level.id === 10 ? "#2b0912" : "#264653";
  for (let i = 0; i < 12; i++) {
    const tx = ((i * 110 - cameraX * 0.45) % (canvasWidth + 120) + (canvasWidth + 120)) % (canvasWidth + 120) - 60;
    const ty = canvasHeight - 70;
    ctx.fillRect(tx + 14, ty - 20, 8, 20);
    ctx.fillRect(tx + 2, ty - 38, 32, 18);
    ctx.fillRect(tx + 6, ty - 54, 24, 16);
    ctx.fillRect(tx + 12, ty - 68, 12, 14);
  }
}
