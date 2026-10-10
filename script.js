// ==========================================================
//  DADOS PERSONALIZADOS
// ==========================================================
const dados = {
    bio: '"Minha eterna Corinthiana — você é meu maior título. 6 anos de nós, e o melhor ainda está por vir.❤️"',
    mensagemSurpresa: `
        Bianca, você é a protagonista da melhor história que já vivi.<br><br>
        São <strong>6 anos</strong> de risadas, planos, abraços e muito amor.<br><br>
        Obrigado por ser minha eterna Corinthiana, minha melhor amiga e o amor da minha vida.<br><br>
    `
};

// ==========================================================
//  FOTOS — PASTA "fotos"
// ==========================================================
const fotos = [
    { arquivo: "MAPA-PINHEIROS.jpeg",      titulo: "ONDE COMEÇOU" },
    { arquivo: "FOTO CABELO AZUL.jpeg",    titulo: "sorrizin" },
    { arquivo: "FOTO ESPELHO2.jpeg",       titulo: "Espelho" },
    { arquivo: "FOTO BANHEIRO.jpeg",       titulo: "Selfie no banheiro" },
    { arquivo: "FOTO ANIVERSARIO.jpeg",    titulo: "Aniversário" },
    { arquivo: "FOTO CABELO AZUL2.jpeg",   titulo: "Cabelo Azul"},
    { arquivo: "FOTO EMBU.jpeg",           titulo: "Embu" },
    { arquivo: "FOTO MANDANDO BEIJO.jpeg", titulo: "Mandando beijo" },
    { arquivo: "FOTO NO SOFÁ.jpeg",        titulo: "No sofá" },
    { arquivo: "FOTO NO CARRO .jpeg",      titulo: "No carro" },
    { arquivo: "FOTO CINEMA.jpeg",         titulo: "Cinema" },
    { arquivo: "fOTO DIRIGINDO2.jpeg",     titulo: "Na estrada" },
    { arquivo: "FOTO ESTADIO.jpeg",        titulo: "Nosso Lugar favorito" },
    { arquivo: "FOTO NO RESTAURANTE.jpeg", titulo: "No restaurante" },
    { arquivo: "FOTO NO SOFÁ.jpeg",        titulo: "No sofá" },
    { arquivo: "FOTO PESQUEIRO.jpeg",      titulo: "Pesqueiro" },
    { arquivo: "FOTO RESTAURANTE.jpeg",    titulo: "Restaurante" },
    { arquivo: "FOTO SORRISO .jpeg",       titulo: "Seu sorriso" },
    { arquivo: "FOTO SORRISO4.jpeg",       titulo: "Sorrizin dnv" },
    { arquivo: "FOTO NOIVADO.jpeg",        titulo: "Noivado 💍" },
    { arquivo: "FOTO-NO-BARCO.jpeg",       titulo: "No barco" },
    { arquivo: "FOTO FANTASIADOS.jpeg",    titulo: "Fantasiados" },
    { arquivo: "FOTO CHALÉZINHO.jpeg",     titulo: "Chalézinho" },
    { arquivo: "FOTO DATE.jpeg",           titulo: "Nosso date" },
];

// Foto usada no fundo do hero (FOTO HORIZONTAL)
const fotoHero = "FOTO-NO-BARCO.jpeg";

// ==========================================================
//  PLAYLIST — ANIMADA → ROMÂNTICA → ROMÂNTICA
// ==========================================================
const playlist = [
    { arquivo: "uptown-funk.mp3",      titulo: "Uptown Funk",         artista: "Mark Ronson ft. Bruno Mars", emoji: "🕺" },
    { arquivo: "die-with-a-smile.mp3", titulo: "Die With A Smile",    artista: "Lady Gaga & Bruno Mars",     emoji: "🌹" },
    { arquivo: "talking-moon.mp3",     titulo: "Talking to the Moon", artista: "Bruno Mars",                 emoji: "🌙" }
];

// Música que toca quando abre o TRAILER (0=Uptown, 1=Die With A Smile, 2=Talking)
const MUSICA_DO_TRAILER = 1;

// Música que toca quando ABRE O SITE (padrão: 0 = Uptown Funk)
const MUSICA_INICIAL = 0;

// ==========================================================
//  INICIALIZAÇÃO
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    aplicarDados();
    aplicarHeroBackdrop();
    aplicarGaleria();
    configurarModais();
    configurarCarrossel();
    configurarSlideshow();
    iniciarPlayerMusica();
    efeitoScrollNav();
});

// ==========================================================
//  DADOS NA TELA
// ==========================================================
function aplicarDados() {
    const bioEl = document.getElementById('bioTexto');
    if (bioEl) bioEl.innerHTML = dados.bio;

    const msgEl = document.getElementById('mensagemPersonalizada');
    if (msgEl) msgEl.innerHTML = dados.mensagemSurpresa;

    const totalEl = document.getElementById('totalFotos');
    if (totalEl) totalEl.textContent = fotos.length;
}

// ==========================================================
//  HERO BACKDROP
// ==========================================================
function aplicarHeroBackdrop() {
    const hero = document.getElementById('heroBackdrop');
    if (!hero) return;
    hero.style.backgroundImage = `url('fotos/${encodeURIComponent(fotoHero)}')`;
}

// ==========================================================
//  GALERIA
// ==========================================================
function aplicarGaleria() {
    const galeria = document.getElementById('galeriaFotos');
    if (!galeria) return;

    galeria.innerHTML = '';

    fotos.forEach((foto) => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const img = document.createElement('img');
        img.src = `fotos/${encodeURIComponent(foto.arquivo)}`;
        img.alt = foto.titulo;
        img.loading = 'lazy';
        img.onerror = () => {
            console.warn('Foto não encontrada:', foto.arquivo);
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="300"><rect width="220" height="300" fill="%23222"/><text x="110" y="150" fill="%23888" font-size="14" text-anchor="middle">Foto não encontrada</text></svg>';
        };

        const title = document.createElement('div');
        title.className = 'movie-title';
        title.textContent = foto.titulo;

        card.appendChild(img);
        card.appendChild(title);
        galeria.appendChild(card);

        card.addEventListener('click', () => abrirFotoModal(foto));
    });
}

// ==========================================================
//  CARROSSEL
// ==========================================================
function configurarCarrossel() {
    const galeria = document.getElementById('galeriaFotos');
    const left = document.getElementById('carouselLeft');
    const right = document.getElementById('carouselRight');
    if (!galeria || !left || !right) return;

    const passo = () => {
        const card = galeria.querySelector('.movie-card');
        return card ? card.offsetWidth + 15 : 240;
    };

    left.addEventListener('click', () => {
        galeria.scrollBy({ left: -passo() * 2, behavior: 'smooth' });
    });
    right.addEventListener('click', () => {
        galeria.scrollBy({ left: passo() * 2, behavior: 'smooth' });
    });

    const verTodos = document.getElementById('verTodosBtn');
    if (verTodos) {
        verTodos.addEventListener('click', () => {
            galeria.scrollTo({ left: 0, behavior: 'smooth' });
        });
    }
}

// ==========================================================
//  MODAIS
// ==========================================================
function configurarModais() {
    ligarModal('botaoSurpresa', 'surpresaModal', 'closeSurpresaModal', () => soltarCoracoes());

    ligarModal('assistirTrailerBtn', 'trailerModal', 'closeTrailerModal', () => {
        iniciarSlideshow();
        tocarMusicaDoTrailer();
    });

    const closeTrailer = document.getElementById('closeTrailerModal');
    if (closeTrailer) {
        closeTrailer.addEventListener('click', pararSlideshow);
    }

    ligarModal(null, 'fotoModal', 'closeFotoModal');

    ligarModal('duvidasLink', 'duvidasModal', 'closeDuvidasModal', null, true);
    ligarModal('ajudaLink', 'ajudaModal', 'closeAjudaModal', null, true);
    ligarModal('termosLink', 'termosModal', 'closeTermosModal', null, true);
    ligarModal('privacidadeLink', 'privacidadeModal', 'closePrivacidadeModal', null, true);
}

function ligarModal(idAbrir, idModal, idFechar, callbackAbrir = null, isLink = false) {
    const abrir = idAbrir ? document.getElementById(idAbrir) : null;
    const modal = document.getElementById(idModal);
    const fechar = document.getElementById(idFechar);
    if (!modal) return;

    if (abrir) {
        abrir.addEventListener('click', (e) => {
            if (isLink) e.preventDefault();
            modal.classList.add('show');
            if (callbackAbrir) callbackAbrir();
        });
    }

    if (fechar) {
        fechar.addEventListener('click', () => {
            modal.classList.remove('show');
            if (idModal === 'trailerModal') pararSlideshow();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            if (idModal === 'trailerModal') pararSlideshow();
        }
    });
}

// ==========================================================
//  MODAL DE FOTO AMPLIADA
// ==========================================================
function abrirFotoModal(foto) {
    const modal = document.getElementById('fotoModal');
    const img = document.getElementById('fotoAmpliada');
    const titulo = document.getElementById('fotoTitulo');
    if (!modal || !img) return;

    img.src = `fotos/${encodeURIComponent(foto.arquivo)}`;
    img.alt = foto.titulo;
    if (titulo) titulo.textContent = `📸 ${foto.titulo.toUpperCase()}`;
    modal.classList.add('show');
}

// ==========================================================
//  SLIDESHOW (Trailer)
// ==========================================================
let slideIndex = 0;
let slideTimer = null;

function configurarSlideshow() {
    const prev = document.getElementById('slidePrev');
    const next = document.getElementById('slideNext');
    if (prev) prev.addEventListener('click', () => mudarSlide(-1));
    if (next) next.addEventListener('click', () => mudarSlide(1));
}

function iniciarSlideshow() {
    const container = document.getElementById('slideshowSlides');
    if (!container) return;

    container.innerHTML = '';
    slideIndex = 0;

    fotos.forEach((foto, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide-item';
        if (i === 0) slide.classList.add('active');

        const bg = document.createElement('div');
        bg.className = 'slide-bg';
        bg.style.backgroundImage = `url('fotos/${encodeURIComponent(foto.arquivo)}')`;

        const img = document.createElement('img');
        img.src = `fotos/${encodeURIComponent(foto.arquivo)}`;
        img.alt = foto.titulo;
        img.loading = i === 0 ? 'eager' : 'lazy';

        slide.appendChild(bg);
        slide.appendChild(img);
        container.appendChild(slide);
    });

    pararSlideshow();
    slideTimer = setInterval(() => mudarSlide(1), 3200);
}

function mudarSlide(dir) {
    const slides = document.querySelectorAll('#slideshowSlides .slide-item');
    if (slides.length === 0) return;

    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + dir + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

function pararSlideshow() {
    if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
    }
}

// ==========================================================
//  PLAYER DE MÚSICA
// ==========================================================
let audioAtual = null;
let musicaIndex = 0;
let tocando = false;

function iniciarPlayerMusica() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;

    audioAtual = audio;
    carregarMusica(MUSICA_INICIAL);

    const playPause = document.getElementById('playPauseMusic');
    const prev = document.getElementById('prevMusic');
    const next = document.getElementById('nextMusic');
    const navBtn = document.getElementById('navMusicBtn');

    if (playPause) playPause.addEventListener('click', togglePlay);
    if (prev) prev.addEventListener('click', () => mudarMusica(-1));
    if (next) next.addEventListener('click', () => mudarMusica(1));
    if (navBtn) navBtn.addEventListener('click', togglePlay);

    audio.addEventListener('timeupdate', atualizarProgresso);
    audio.addEventListener('ended', () => mudarMusica(1));
    audio.addEventListener('error', () => {
        console.warn('Erro ao tocar:', playlist[musicaIndex].arquivo);
    });

    tentarAutoplay();
}

// ==========================================================
//  AUTOPLAY INTELIGENTE
// ==========================================================
function tentarAutoplay() {
    if (!audioAtual) return;

    audioAtual.play().then(() => {
        tocando = true;
        atualizarBotoesPlay();
    }).catch(() => {
        const liberarAudio = () => {
            audioAtual.play().then(() => {
                tocando = true;
                atualizarBotoesPlay();
            }).catch(() => {});

            ['click', 'touchstart', 'keydown', 'scroll'].forEach(evento => {
                document.removeEventListener(evento, liberarAudio);
            });
        };

        ['click', 'touchstart', 'keydown', 'scroll'].forEach(evento => {
            document.addEventListener(evento, liberarAudio, { once: true, passive: true });
        });
    });
}

function carregarMusica(index) {
    if (!audioAtual) return;
    musicaIndex = (index + playlist.length) % playlist.length;
    const musica = playlist[musicaIndex];

    audioAtual.src = `music/${musica.arquivo}`;
    audioAtual.load();

    const titleEl = document.getElementById('musicTitle');
    const artistEl = document.getElementById('musicArtist');
    const emojiEl = document.getElementById('musicEmoji');

    if (titleEl) titleEl.textContent = musica.titulo;
    if (artistEl) artistEl.textContent = musica.artista;
    if (emojiEl) emojiEl.textContent = musica.emoji;
}

function tocarMusicaAtual() {
    if (!audioAtual) return;
    audioAtual.play().then(() => {
        tocando = true;
        atualizarBotoesPlay();
    }).catch(err => {
        console.log('Autoplay bloqueado:', err.message);
        tocando = false;
        atualizarBotoesPlay();
    });
}

function tocarMusicaDoTrailer() {
    if (!audioAtual) return;

    carregarMusica(MUSICA_DO_TRAILER);
    audioAtual.currentTime = 0;

    audioAtual.play().then(() => {
        tocando = true;
        atualizarBotoesPlay();
    }).catch(err => {
        console.log('Autoplay bloqueado:', err.message);
        tocando = false;
        atualizarBotoesPlay();
    });
}

function togglePlay() {
    if (!audioAtual) return;

    if (tocando) {
        audioAtual.pause();
        tocando = false;
    } else {
        audioAtual.play().then(() => {
            tocando = true;
        }).catch(err => {
            console.warn('Não foi possível tocar:', err);
        });
    }
    atualizarBotoesPlay();
}

function atualizarBotoesPlay() {
    const playPause = document.getElementById('playPauseMusic');
    const navBtn = document.getElementById('navMusicBtn');

    if (playPause) playPause.textContent = tocando ? '⏸' : '▶';
    if (navBtn) {
        navBtn.textContent = tocando ? '⏸' : '🎵';
        navBtn.classList.toggle('playing', tocando);
    }
}

function mudarMusica(dir) {
    carregarMusica(musicaIndex + dir);
    tocarMusicaAtual();
}

function atualizarProgresso() {
    if (!audioAtual || !audioAtual.duration) return;
    const pct = (audioAtual.currentTime / audioAtual.duration) * 100;
    const barra = document.getElementById('musicProgressBar');
    if (barra) barra.style.width = `${pct}%`;
}

// ==========================================================
//  CORAÇÕES FLUTUANTES
// ==========================================================
function soltarCoracoes() {
    const emojis = ['❤️', '💖', '💗', '💓', '💕', '💝', '💘', '💞', '⚫', '⚪'];
    for (let i = 0; i < 45; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, i * 45);
    }
}

// ==========================================================
//  NAVBAR — efeito ao rolar
// ==========================================================
function efeitoScrollNav() {
    const nav = document.querySelector('.netflix-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.style.background = '#000';
            nav.style.padding = '12px 40px';
        } else {
            nav.style.background = 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0.9) 50%, transparent 100%)';
            nav.style.padding = '20px 40px';
        }
    });
}