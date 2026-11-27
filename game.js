// Motor principal de Super Luma Bros
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// HUD
const hudLives = document.getElementById("hud-lives");
const hudCoins = document.getElementById("hud-coins");
const hudScore = document.getElementById("hud-score");
const hudLevel = document.getElementById("hud-level");
const hudPower = document.getElementById("hud-power");
const hudAttr = document.getElementById("hud-attr");

// Telas
const screens = {
  menu: document.getElementById("screen-menu"),
  levels: document.getElementById("screen-levels"),
  controls: document.getElementById("screen-controls"),
  story: document.getElementById("screen-story"),
  pause: document.getElementById("screen-pause"),
  end: document.getElementById("screen-end")
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  if (name && screens[name]) screens[name].classList.add("active");
}

// Áudio sintetizado (Web Audio API)
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playSound(type) {
  try {
    if (!audioCtx) audioCtx = new AudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === "jump") {
      osc.type = "square";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.14);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "coin") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(987, now);
      osc.frequency.setValueAtTime(1318, now + 0.06);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === "power") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.28);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "stomp") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === "hurt") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(60, now + 0.25);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === "fire") {
      osc.type = "square";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "win") {
      osc.type = "triangle";
      [523, 659, 784, 1046].forEach((freq, i) => {
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
      });
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (e) {
    // Ignora erro de áudio se bloqueado pelo navegador
  }
}

// Estado global do jogo
let gameState = "menu"; // menu, story, playing, paused, end
let currentLevelIndex = 0;
let unlockedLevel = parseInt(localStorage.getItem("luma_unlocked") || "1", 10);
let lives = 3;
let coins = 0;
let score = 0;

// Controles
const keys = {
  left: false,
  right: false,
  jump: false,
  fire: false,
  dash: false
};
let jumpPressed = false;
let firePressed = false;
let dashPressed = false;

window.addEventListener("keydown", e => {
  if (["ArrowLeft", "KeyA"].includes(e.code)) keys.left = true;
  if (["ArrowRight", "KeyD"].includes(e.code)) keys.right = true;
  if (["ArrowUp", "KeyW", "Space"].includes(e.code)) {
    if (!keys.jump) jumpPressed = true;
    keys.jump = true;
  }
  if (["KeyF", "KeyZ"].includes(e.code)) {
    if (!keys.fire) firePressed = true;
    keys.fire = true;
  }
  if (["ShiftLeft", "ShiftRight", "KeyX"].includes(e.code)) {
    if (!keys.dash) dashPressed = true;
    keys.dash = true;
  }
  if (["KeyP", "Escape"].includes(e.code) && (gameState === "playing" || gameState === "paused")) {
    togglePause();
  }
});

window.addEventListener("keyup", e => {
  if (["ArrowLeft", "KeyA"].includes(e.code)) keys.left = false;
  if (["ArrowRight", "KeyD"].includes(e.code)) keys.right = false;
  if (["ArrowUp", "KeyW", "Space"].includes(e.code)) keys.jump = false;
  if (["KeyF", "KeyZ"].includes(e.code)) keys.fire = false;
  if (["ShiftLeft", "ShiftRight", "KeyX"].includes(e.code)) keys.dash = false;
});

// Controles touch
document.querySelectorAll(".touch-btn").forEach(btn => {
  const k = btn.dataset.key;
  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    if (k === "jump" && !keys.jump) jumpPressed = true;
    if (k === "fire" && !keys.fire) firePressed = true;
    if (k === "dash" && !keys.dash) dashPressed = true;
    keys[k] = true;
  });
  btn.addEventListener("touchend", e => {
    e.preventDefault();
    keys[k] = false;
  });
});

// Entidades da fase ativa
let level = null;
let player = null;
let platforms = [];
let qBlocks = [];
let levelCoins = [];
let enemies = [];
let hazards = [];
let portals = [];
let items = [];
let fireballs = [];
let bossShots = [];
let enemyShots = [];
let particles = [];
let boss = null;
let cameraX = 0;
let windTimer = 0;
let currentWind = 0;
let portalCooldown = 0;

function resetPlayer(keepPower = false) {
  const prevPower = keepPower && player ? player.power : "normal";
  player = {
    x: 60,
    y: 380,
    w: 32,
    h: prevPower === "normal" ? 38 : 46,
    vx: 0,
    vy: 0,
    facing: 1,
    onGround: false,
    jumpsLeft: 1,
    dashCooldown: 0,
    dashTimer: 0,
    power: prevPower, // normal, big, fire
    starTimer: 0,
    invulnTimer: 0
  };
}

function loadLevel(index, showStoryScreen = true) {
  currentLevelIndex = index;
  const template = LEVELS[index];
  level = JSON.parse(JSON.stringify(template));

  platforms = level.platforms.map(p => ({
    ...p,
    startX: p.x,
    dir: 1,
    vanishState: "solid", // solid, shaking, gone
    vanishTimer: 0
  }));

  qBlocks = level.qBlocks.map(b => ({ ...b, used: false, w: 34, h: 34 }));
  levelCoins = level.coins.map(c => ({ ...c, collected: false, r: 10 }));
  enemies = level.enemies.map(e => ({ ...e, w: 34, h: 34, dir: 1, alive: true, shootTimer: 70 + Math.floor(Math.random() * 50) }));
  hazards = level.hazards.map(h => ({ ...h, startY: h.y, dir: -1 }));
  portals = level.portals || [];
  boss = level.boss ? { ...level.boss, dir: -1, shootTimer: 90, hurtTimer: 0 } : null;

  items = [];
  fireballs = [];
  bossShots = [];
  enemyShots = [];
  particles = [];
  cameraX = 0;
  windTimer = 0;
  currentWind = level.wind || 0;
  portalCooldown = 0;

  resetPlayer(true);
  updateHUD();

  if (showStoryScreen) {
    gameState = "story";
    document.getElementById("story-level-tag").textContent = `FASE ${level.id} DE 10`;
    document.getElementById("story-title").textContent = level.name;
    document.getElementById("story-attr-desc").textContent = level.attrDesc;
    document.getElementById("story-text").textContent = level.story;
    showScreen("story");
  } else {
    gameState = "playing";
    showScreen(null);
  }
}

function updateHUD() {
  hudLives.textContent = lives;
  hudCoins.textContent = coins;
  hudScore.textContent = score;
  hudLevel.textContent = `${currentLevelIndex + 1}/10`;
  const powerNames = { normal: "NORMAL", big: "GRANDE", fire: "FOGO" };
  hudPower.textContent = player && player.starTimer > 0 ? "ESTRELA" : (powerNames[player ? player.power : "normal"]);
  hudAttr.textContent = level ? level.attrName : "Clássico";
}

function spawnParticles(x, y, color, count = 8) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6 - 1,
      life: 25 + Math.random() * 15,
      color
    });
  }
}

function hurtPlayer() {
  if (player.invulnTimer > 0 || player.starTimer > 0) return;
  playSound("hurt");

  if (player.power !== "normal") {
    player.power = "normal";
    player.h = 38;
    player.invulnTimer = 90;
    spawnParticles(player.x + 16, player.y + 20, "#ffbe0b", 12);
    updateHUD();
    return;
  }

  lives--;
  updateHUD();
  if (lives <= 0) {
    gameState = "end";
    document.getElementById("end-title").textContent = "FIM DE JOGO";
    document.getElementById("end-text").textContent = `Mu perdeu todas as vidas na fase "${level.name}". Mas o Reino Pasto Verde precisa de voce!`;
    showScreen("end");
  } else {
    loadLevel(currentLevelIndex, false);
  }
}

function rectIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function update() {
  if (gameState !== "playing") return;

  // Vento dinâmico (Fase 4)
  if (level.wind !== 0) {
    windTimer++;
    if (windTimer % 240 === 0) {
      currentWind = -currentWind;
    }
  }

  if (portalCooldown > 0) portalCooldown--;
  if (player.invulnTimer > 0) player.invulnTimer--;
  if (player.starTimer > 0) {
    player.starTimer--;
    if (player.starTimer === 0) updateHUD();
  }
  if (player.dashCooldown > 0) player.dashCooldown--;

  // Movimento horizontal
  const moveSpeed = player.starTimer > 0 ? 6.2 : 4.6;
  if (player.dashTimer > 0) {
    player.dashTimer--;
    player.vx = player.facing * 10.5;
    player.vy = 0;
  } else {
    if (keys.left) {
      player.vx -= 0.9;
      player.facing = -1;
    }
    if (keys.right) {
      player.vx += 0.9;
      player.facing = 1;
    }
    player.vx += currentWind;
    player.vx *= level.friction;
    if (Math.abs(player.vx) > moveSpeed) {
      player.vx = Math.sign(player.vx) * moveSpeed;
    }
  }

  // Dash (Fases 6+)
  if (dashPressed && level.dash && player.dashCooldown === 0) {
    player.dashTimer = 11;
    player.dashCooldown = 45;
    playSound("jump");
    spawnParticles(player.x + 16, player.y + 20, "#00f5d4", 10);
  }
  dashPressed = false;

  // Pulo / Pulo Duplo
  if (jumpPressed) {
    if (player.onGround) {
      player.vy = -12.2;
      player.onGround = false;
      player.jumpsLeft = level.doubleJump ? 1 : 0;
      playSound("jump");
    } else if (player.jumpsLeft > 0) {
      player.vy = -11.2;
      player.jumpsLeft--;
      playSound("jump");
      spawnParticles(player.x + 16, player.y + player.h, "#ffffff", 6);
    }
  }
  jumpPressed = false;

  // Bola de fogo
  if (firePressed && player.power === "fire" && fireballs.length < 3) {
    fireballs.push({
      x: player.x + (player.facing === 1 ? player.w : -10),
      y: player.y + 18,
      w: 12,
      h: 12,
      vx: player.facing * 8,
      vy: -2
    });
    playSound("fire");
  }
  firePressed = false;

  // Gravidade
  if (player.dashTimer === 0) {
    player.vy += level.gravity;
    if (player.vy > 14) player.vy = 14;
  }

  // Atualiza plataformas móveis e nuvens frágeis
  for (const p of platforms) {
    if (p.type === "moving") {
      p.x += p.speed * p.dir;
      if (p.x > p.startX + p.rangeX || p.x < p.startX) {
        p.dir *= -1;
      }
    } else if (p.type === "vanish") {
      if (p.vanishState === "shaking") {
        p.vanishTimer--;
        if (p.vanishTimer <= 0) {
          p.vanishState = "gone";
          p.vanishTimer = 140;
        }
      } else if (p.vanishState === "gone") {
        p.vanishTimer--;
        if (p.vanishTimer <= 0) p.vanishState = "solid";
      }
    }
  }

  // Colisão X
  player.x += player.vx;
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > level.width) player.x = level.width - player.w;

  const solidBlocks = [
    ...platforms.filter(p => p.vanishState !== "gone" && p.type !== "lava" && p.type !== "acid"),
    ...qBlocks
  ];

  for (const b of solidBlocks) {
    if (rectIntersect(player, b)) {
      if (player.vx > 0) player.x = b.x - player.w;
      else if (player.vx < 0) player.x = b.x + b.w;
      player.vx = 0;
    }
  }

  // Colisão Y
  player.y += player.vy;
  player.onGround = false;

  for (const b of solidBlocks) {
    if (rectIntersect(player, b)) {
      if (player.vy > 0) {
        player.y = b.y - player.h;
        player.vy = 0;
        player.onGround = true;
        player.jumpsLeft = level.doubleJump ? 1 : 0;

        if (b.type === "moving") {
          player.x += b.speed * b.dir;
        }
        if (b.type === "vanish" && b.vanishState === "solid") {
          b.vanishState = "shaking";
          b.vanishTimer = 35;
        }
      } else if (player.vy < 0) {
        player.y = b.y + b.h;
        player.vy = 0;

        // Bloco "?"
        if (b.reward !== undefined && !b.used) {
          b.used = true;
          if (b.reward === "coin") {
            coins++;
            score += 100;
            playSound("coin");
            spawnParticles(b.x + 17, b.y, "#ffd166", 10);
          } else {
            items.push({
              x: b.x + 4,
              y: b.y - 28,
              w: 26,
              h: 26,
              vx: 1.8,
              vy: -3,
              type: b.reward
            });
            playSound("power");
          }
          updateHUD();
        }
      }
    }
  }

  // Queda no abismo ou lava/ácido
  if (player.y > canvas.height + 40) {
    hurtPlayer();
    return;
  }
  for (const p of platforms) {
    if ((p.type === "lava" || p.type === "acid") && rectIntersect(player, p)) {
      hurtPlayer();
      return;
    }
  }

  // Moedas
  for (const c of levelCoins) {
    if (!c.collected && rectIntersect(player, { x: c.x - c.r, y: c.y - c.r, w: c.r * 2, h: c.r * 2 })) {
      c.collected = true;
      coins++;
      score += 50;
      playSound("coin");
      spawnParticles(c.x, c.y, "#ffd166", 6);
      updateHUD();
    }
  }

  // Itens (Cogumelo, Flor, Estrela)
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i];
    it.vy += 0.4;
    it.x += it.vx;
    it.y += it.vy;
    for (const b of solidBlocks) {
      if (rectIntersect(it, b)) {
        if (it.vy > 0) {
          it.y = b.y - it.h;
          it.vy = it.type === "star" ? -7 : 0;
        }
      }
    }
    if (rectIntersect(player, it)) {
      playSound("power");
      if (it.type === "mushroom") {
        if (player.power === "normal") {
          player.power = "big";
          player.h = 46;
          player.y -= 8;
        } else {
          lives++;
        }
      } else if (it.type === "flower") {
        player.power = "fire";
        player.h = 46;
      } else if (it.type === "star") {
        player.starTimer = 360;
      }
      score += 200;
      updateHUD();
      items.splice(i, 1);
    }
  }

  // Bolas de fogo do jogador
  for (let i = fireballs.length - 1; i >= 0; i--) {
    const fb = fireballs[i];
    fb.vy += 0.35;
    fb.x += fb.vx;
    fb.y += fb.vy;

    for (const b of solidBlocks) {
      if (rectIntersect(fb, b)) {
        if (fb.vy > 0 && fb.y + fb.h - fb.vy <= b.y + 8) {
          fb.y = b.y - fb.h;
          fb.vy = -6;
        } else {
          fireballs.splice(i, 1);
          break;
        }
      }
    }

    if (!fireballs[i]) continue;
    if (fb.x < cameraX - 50 || fb.x > cameraX + canvas.width + 50 || fb.y > canvas.height) {
      fireballs.splice(i, 1);
      continue;
    }

    // Acerta inimigos
    for (const en of enemies) {
      if (en.alive && rectIntersect(fb, en)) {
        en.alive = false;
        score += 150;
        playSound("stomp");
        spawnParticles(en.x + 16, en.y + 16, "#ff595e", 10);
        fireballs.splice(i, 1);
        updateHUD();
        break;
      }
    }
  }

  // Inimigos
  for (const en of enemies) {
    if (!en.alive) continue;
    en.x += en.speed * en.dir;
    if (en.x < en.minX || en.x > en.maxX) en.dir *= -1;

    // Inimigo atirador
    if (en.type === "shooter") {
      en.shootTimer--;
      if (en.shootTimer <= 0 && Math.abs(player.x - en.x) < 480) {
        en.shootTimer = 110;
        const dirToPlayer = player.x < en.x ? -1 : 1;
        enemyShots.push({
          x: en.x + (dirToPlayer === 1 ? en.w : -10),
          y: en.y + 12,
          w: 12,
          h: 12,
          vx: dirToPlayer * 4.5
        });
      }
    }

    if (rectIntersect(player, en)) {
      if (player.starTimer > 0 || (player.vy > 0 && player.y + player.h - player.vy <= en.y + 14)) {
        en.alive = false;
        player.vy = -9;
        score += 150;
        playSound("stomp");
        spawnParticles(en.x + 16, en.y + 16, "#ff595e", 10);
        updateHUD();
      } else {
        hurtPlayer();
        return;
      }
    }
  }

  // Projéteis dos inimigos atiradores
  for (let i = enemyShots.length - 1; i >= 0; i--) {
    const es = enemyShots[i];
    es.x += es.vx;
    if (rectIntersect(player, es)) {
      enemyShots.splice(i, 1);
      hurtPlayer();
      return;
    }
    if (es.x < cameraX - 60 || es.x > cameraX + canvas.width + 60) {
      enemyShots.splice(i, 1);
    }
  }

  // Armadilhas (Espinhos e Bolas de fogo do vulcão)
  for (const hz of hazards) {
    if (hz.type === "fireball") {
      hz.y += hz.speed * hz.dir;
      if (hz.y < hz.minY || hz.y > hz.maxY) hz.dir *= -1;
    }
    if (rectIntersect(player, hz)) {
      hurtPlayer();
      return;
    }
  }

  // Portais (Fase 8)
  if (portalCooldown === 0) {
    for (const pt of portals) {
      if (rectIntersect(player, { x: pt.x, y: pt.y, w: 36, h: 64 })) {
        player.x = pt.targetX;
        player.y = pt.targetY;
        portalCooldown = 45;
        playSound("power");
        spawnParticles(player.x + 16, player.y + 20, pt.color, 14);
        break;
      }
    }
  }

  // Chefe Final (Fase 10)
  if (boss && boss.hp > 0) {
    if (boss.hurtTimer > 0) boss.hurtTimer--;
    boss.x += boss.speed * boss.dir;
    if (boss.x < boss.minX || boss.x > boss.maxX) boss.dir *= -1;

    boss.shootTimer--;
    if (boss.shootTimer <= 0) {
      boss.shootTimer = 85;
      const dirToPlayer = player.x < boss.x ? -1 : 1;
      bossShots.push({ x: boss.x + 36, y: boss.y + 40, w: 16, h: 16, vx: dirToPlayer * 5.2, vy: -1.5 });
    }

    for (let i = bossShots.length - 1; i >= 0; i--) {
      const s = bossShots[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.08;
      if (rectIntersect(player, s)) {
        bossShots.splice(i, 1);
        hurtPlayer();
        return;
      }
      if (s.x < 0 || s.x > level.width || s.y > canvas.height) bossShots.splice(i, 1);
    }

    if (rectIntersect(player, boss)) {
      if (player.vy > 0 && player.y + player.h - player.vy <= boss.y + 24 && boss.hurtTimer === 0) {
        boss.hp--;
        boss.hurtTimer = 45;
        player.vy = -12;
        score += 300;
        playSound("stomp");
        spawnParticles(boss.x + 36, boss.y + 20, "#ff006e", 16);
        updateHUD();
        if (boss.hp <= 0) {
          winLevel();
          return;
        }
      } else if (boss.hurtTimer === 0) {
        hurtPlayer();
        return;
      }
    }
  }

  // Objetivo (Cristal Estelar)
  if (level.goal && rectIntersect(player, { x: level.goal.x - 20, y: level.goal.y - 20, w: 40, h: 60 })) {
    winLevel();
    return;
  }

  // Partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life--;
    if (pt.life <= 0) particles.splice(i, 1);
  }

  // Câmera
  cameraX = player.x - canvas.width * 0.35;
  if (cameraX < 0) cameraX = 0;
  if (cameraX > level.width - canvas.width) cameraX = Math.max(0, level.width - canvas.width);
}

function winLevel() {
  playSound("win");
  score += 500;
  if (currentLevelIndex + 1 >= unlockedLevel && unlockedLevel < LEVELS.length) {
    unlockedLevel = currentLevelIndex + 2;
    localStorage.setItem("luma_unlocked", unlockedLevel);
  }

  if (currentLevelIndex + 1 < LEVELS.length) {
    loadLevel(currentLevelIndex + 1, true);
  } else {
    gameState = "end";
    document.getElementById("end-title").textContent = "VITORIA EPICA!";
    document.getElementById("end-text").textContent =
      `Parabens! Mu derrotou Lorde Malakor, recuperou todos os 10 Cristais Estelares e salvou o Reino! Pontuacao Final: ${score} pontos.`;
    showScreen("end");
  }
}

function draw() {
  if (!level) return;
  ctx.imageSmoothingEnabled = false;

  // Fundo gradiente
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, level.bgTop);
  grad.addColorStop(1, level.bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fundo Parallax Pixel Art (montanhas, pinheiros e nuvens)
  drawPixelParallax(ctx, cameraX, canvas.width, canvas.height, level);

  ctx.save();
  ctx.translate(-cameraX, 0);

  // Plataformas
  for (const p of platforms) {
    if (p.vanishState === "gone") continue;
    if (p.type === "ground") {
      ctx.fillStyle = level.dirtColor;
      ctx.fillRect(p.x, p.y + 12, p.w, p.h - 12);
      ctx.fillStyle = level.groundColor;
      ctx.fillRect(p.x, p.y, p.w, 14);
    } else if (p.type === "ice") {
      ctx.fillStyle = "#a8dadc";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(p.x, p.y, p.w, 5);
    } else if (p.type === "vanish") {
      ctx.fillStyle = p.vanishState === "shaking" ? "rgba(255,255,255,0.5)" : "#ffffff";
      ctx.fillRect(p.x + (p.vanishState === "shaking" ? (Math.random() * 4 - 2) : 0), p.y, p.w, p.h);
    } else if (p.type === "lava") {
      ctx.fillStyle = "#ff4500";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = "#ffb703";
      ctx.fillRect(p.x, p.y, p.w, 6);
    } else if (p.type === "acid") {
      ctx.fillStyle = "#38b000";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = "#9ef01a";
      ctx.fillRect(p.x, p.y, p.w, 6);
    } else {
      ctx.fillStyle = p.type === "moving" ? "#ffb703" : "#b5651d";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.strokeStyle = "#00000044";
      ctx.strokeRect(p.x, p.y, p.w, p.h);
    }
  }

  // Blocos "?" Pixel Art
  for (const b of qBlocks) {
    if (b.used) {
      ctx.fillStyle = "#6c757d";
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x, b.y, b.w, b.h);
    } else {
      drawPixelSprite(ctx, QBLOCK_SPRITE, { K: "#111111", Y: "#ffbe0b" }, b.x, b.y, 2.85);
    }
  }

  // Moedas Pixel Art
  for (const c of levelCoins) {
    if (c.collected) continue;
    drawPixelSprite(ctx, COIN_SPRITE, { K: "#111111", Y: "#ffdd00", W: "#ffffff" }, c.x - 10, c.y - 10, 2.5);
  }

  // Portais
  for (const pt of portals) {
    ctx.fillStyle = pt.color;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.ellipse(pt.x + 18, pt.y + 32, 18, 32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Armadilhas
  for (const hz of hazards) {
    if (hz.type === "spikes") {
      ctx.fillStyle = "#e63946";
      for (let sx = hz.x; sx < hz.x + hz.w; sx += 15) {
        ctx.beginPath();
        ctx.moveTo(sx, hz.y + hz.h);
        ctx.lineTo(sx + 7.5, hz.y);
        ctx.lineTo(sx + 15, hz.y + hz.h);
        ctx.fill();
      }
    } else if (hz.type === "fireball") {
      ctx.fillStyle = "#ff5400";
      ctx.beginPath();
      ctx.arc(hz.x + 12, hz.y + 12, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Itens das Lucky Blocks em Pixel Art
  for (const it of items) {
    if (it.type === "mushroom") {
      drawPixelSprite(ctx, MUSHROOM_SPRITE, { K: "#111111", R: "#ff2a2a", W: "#ffffff", S: "#f4d3a1" }, it.x, it.y, 2.4);
    } else if (it.type === "flower") {
      drawPixelSprite(ctx, FLOWER_SPRITE, { K: "#111111", W: "#ffffff", O: "#ff7b00", Y: "#ffdd00", G: "#34c759" }, it.x, it.y, 2.4);
    } else {
      drawPixelSprite(ctx, STAR_SPRITE, { K: "#111111", Y: "#ffdd00" }, it.x, it.y, 2.4);
    }
  }

  // Inimigos Pixel Art
  for (const en of enemies) {
    if (!en.alive) continue;
    if (en.type === "bat") {
      const hoverY = Math.sin(Date.now() / 110) * 4;
      drawPixelSprite(ctx, BAT_SPRITE, BAT_PALETTE, en.x, en.y + hoverY, 2.5);
    } else if (en.type === "shooter") {
      drawPixelSprite(ctx, SHOOTER_SPRITE, SHOOTER_PALETTE, en.x, en.y, 2.6, player.x < en.x);
    } else {
      drawPixelSprite(ctx, SLIME_SPRITE, SLIME_PALETTE, en.x, en.y, 2.6, en.dir === -1);
    }
  }

  // Projéteis dos inimigos atiradores
  for (const es of enemyShots) {
    ctx.fillStyle = "#ffdd00";
    ctx.beginPath();
    ctx.arc(es.x + 6, es.y + 6, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ff2a2a";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Chefe Final (Cavaleiro Pixel Art)
  if (boss && boss.hp > 0) {
    const pal = boss.hurtTimer % 6 > 2
      ? { K: "#ffffff", Y: "#ffffff", G: "#ffffff", S: "#ffffff", C: "#ffffff" }
      : BOSS_PALETTE;
    drawPixelSprite(ctx, BOSS_SPRITE, pal, boss.x, boss.y, 5.5, boss.dir === -1);
  }

  // Projéteis do chefe e do jogador
  ctx.fillStyle = "#ff006e";
  for (const s of bossShots) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#ff9f1c";
  for (const fb of fireballs) {
    ctx.beginPath();
    ctx.arc(fb.x + 6, fb.y + 6, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cristal Estelar (Objetivo)
  if (level.goal) {
    ctx.fillStyle = "#00f5d4";
    ctx.beginPath();
    ctx.moveTo(level.goal.x, level.goal.y - 25);
    ctx.lineTo(level.goal.x + 18, level.goal.y);
    ctx.lineTo(level.goal.x, level.goal.y + 25);
    ctx.lineTo(level.goal.x - 18, level.goal.y);
    ctx.closePath();
    ctx.fill();
  }

  // Jogadora: Vaca Super Mu Pixel Art
  if (player.invulnTimer % 6 < 3) {
    const pal = player.power === "fire" ? COW_PALETTE_FIRE : COW_PALETTE_NORMAL;
    const scale = player.power === "normal" ? 2.4 : 2.9;
    const bounceY = Math.abs(player.vx) > 0.5 && player.onGround ? Math.sin(Date.now() / 65) * 2 : 0;
    drawPixelSprite(ctx, COW_SPRITE, pal, player.x - 2, player.y + bounceY, scale, player.facing === -1);
  }

  // Partículas
  for (const pt of particles) {
    ctx.fillStyle = pt.color;
    ctx.fillRect(pt.x, pt.y, 4, 4);
  }

  ctx.restore();

  // Escuridão (Fase 9)
  if (level.darkness) {
    const px = player.x - cameraX + player.w / 2;
    const py = player.y + player.h / 2;
    const mask = ctx.createRadialGradient(px, py, 60, px, py, 210);
    mask.addColorStop(0, "rgba(0,0,0,0)");
    mask.addColorStop(1, "rgba(0,0,0,0.94)");
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Indicador de Vento (Fase 4)
  if (level.wind !== 0) {
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(14, 14, 170, 30);
    ctx.fillStyle = "#ffd166";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(currentWind > 0 ? "💨 Vento: Direita ➡" : "💨 Vento: ⬅ Esquerda", 24, 34);
  }

  // Barra de vida do Chefe (Fase 10)
  if (boss && boss.hp > 0) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(canvas.width / 2 - 150, 14, 300, 22);
    ctx.fillStyle = "#ff006e";
    ctx.fillRect(canvas.width / 2 - 146, 18, (292 * boss.hp) / boss.maxHp, 14);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("Lorde Malakor", canvas.width / 2 - 42, 30);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function togglePause() {
  if (gameState === "playing") {
    gameState = "paused";
    showScreen("pause");
  } else if (gameState === "paused") {
    gameState = "playing";
    showScreen(null);
  }
}

function renderLevelGrid() {
  const grid = document.getElementById("level-grid");
  grid.innerHTML = "";
  LEVELS.forEach((lvl, idx) => {
    const btn = document.createElement("button");
    btn.className = "level-btn";
    btn.disabled = idx + 1 > unlockedLevel;
    btn.innerHTML = `<div class="lvl-num">Fase ${lvl.id}</div><div class="lvl-name">${lvl.name}</div>`;
    btn.onclick = () => {
      lives = 3;
      coins = 0;
      score = 0;
      loadLevel(idx, true);
    };
    grid.appendChild(btn);
  });
}

// Botões da UI
document.getElementById("btn-play").onclick = () => {
  lives = 3;
  coins = 0;
  score = 0;
  loadLevel(0, true);
};
document.getElementById("btn-levels").onclick = () => {
  renderLevelGrid();
  showScreen("levels");
};
document.getElementById("btn-unlock-all").onclick = () => {
  unlockedLevel = LEVELS.length;
  localStorage.setItem("luma_unlocked", unlockedLevel);
  renderLevelGrid();
};
document.getElementById("btn-back-menu").onclick = () => showScreen("menu");
document.getElementById("btn-controls").onclick = () => showScreen("controls");
document.getElementById("btn-close-controls").onclick = () => showScreen("menu");
document.getElementById("btn-start-level").onclick = () => {
  gameState = "playing";
  showScreen(null);
};
document.getElementById("btn-resume").onclick = togglePause;
document.getElementById("btn-restart-level").onclick = () => loadLevel(currentLevelIndex, false);
document.getElementById("btn-quit-menu").onclick = () => {
  gameState = "menu";
  showScreen("menu");
};
document.getElementById("btn-end-retry").onclick = () => {
  lives = 3;
  loadLevel(currentLevelIndex, false);
};
document.getElementById("btn-end-menu").onclick = () => {
  gameState = "menu";
  showScreen("menu");
};

// Inicia o loop
loop();
