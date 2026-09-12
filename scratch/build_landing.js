const fs = require('fs');

const indexHtmlPath = 'c:/Users/ULTRA/Desktop/Phase_C - Copia/index.html';
const styleCssPath = 'c:/Users/ULTRA/Desktop/Phase_C - Copia/style.css';

// Rebuild index.html content
const newHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BlackVoice — Crie criativos únicos. Escale sem limites.</title>
    <meta name="description" content="Tecnologia dual-layer proprietária que otimiza seus criativos de áudio e vídeo para máxima aprovação nas plataformas de anúncios.">
    <!-- Google Fonts: Space Grotesk & Space Mono & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css?v=1784080183">
</head>
<body>
    <div class="noise-overlay"></div>
    
    <!-- Navbar (Sticky & Glassmorphism) -->
    <header class="navbar">
        <div class="container nav-container">
            <a href="#" class="logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span class="logo-wordmark"><span>Black</span><span class="bv-gold">Voice</span></span>
            </a>
            <nav class="nav-links">
                <a href="#como-funciona">Como Funciona</a>
                <a href="#dashboard-anchor">Dashboard</a>
                <a href="#precos">Preços</a>
                <a href="#faq">FAQ</a>
            </nav>
            <div class="nav-actions">
                <span id="navbar-plan-badge" class="badge">Plano: Free</span>
                <button id="btn-open-login" class="btn btn-secondary btn-sm nav-cta">Entrar</button>
                
                <!-- Estado Logado (Oculto) -->
                <div class="nav-user-wrap" id="nav-user-wrap" style="display:none;">
                    <div class="nav-user-avatar" id="nav-user-avatar">U</div>
                    <span class="nav-user-name" id="nav-user-name">Usuário</span>
                    <div class="nav-user-dropdown" id="nav-user-dropdown">
                        <div class="nav-user-email" id="nav-user-email">usuario@email.com</div>
                        <button class="nav-user-dropdown-item" onclick="window.bvScrollToApp()">⚡ Abrir App</button>
                        <button class="nav-user-dropdown-item" onclick="window.bvOpenCheckout()">🚀 Ver Planos</button>
                        <button class="nav-user-dropdown-item danger" id="btn-logout">↩ Sair</button>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main>
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-bg-glow"></div>
            <div class="container hero-content">
                <div class="hero-badge-bv">✨ Tecnologia Dual-Layer Audio</div>
                <h1>Aprove Seus Criativos De Anúncios De Primeira, Sempre.</h1>
                <p class="hero-subtext">
                    A BlackVoice injeta um script seguro em uma camada de áudio oculta que os robôs de moderação leem — enquanto seu público ouve o áudio original, inalterado.
                </p>
                <div class="hero-actions">
                    <a href="#dashboard-anchor" class="btn btn-primary" id="btn-start-hero">Começar Grátis — Sem Cartão</a>
                    <a href="#como-funciona" class="btn btn-outline">Ver Como Funciona</a>
                </div>
                <p class="trusted-text">CONFIADO POR PERFORMANCE MARKETERS EM TODO O MUNDO</p>
                <div class="trusted-logos">
                    <span class="trusted-logo">Meta Ads</span>
                    <span class="trusted-logo">Google Ads</span>
                    <span class="trusted-logo">TikTok Ads</span>
                </div>
                <div class="hero-metrics">
                    <div class="metric">
                        <span class="metric-val">&lt; 10s</span>
                        <span class="metric-label">Processamento Médio</span>
                    </div>
                    <div class="metric">
                        <span class="metric-val">5M+</span>
                        <span class="metric-label">Arquivos Processados</span>
                    </div>
                    <div class="metric">
                        <span class="metric-val">256-bit</span>
                        <span class="metric-label">Criptografia Local</span>
                    </div>
                    <div class="metric">
                        <span class="metric-val">99.7%</span>
                        <span class="metric-label">Fidelidade Acústica</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Two Layers Demonstration Section -->
        <section class="two-layers-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium">Dual-Layer em Ação</span>
                    <h2>Duas Camadas. Duas Realidades.</h2>
                    <p class="section-desc">O público humano ouve o áudio original. A IA de moderação lê apenas o script seguro.</p>
                </div>
                <div class="layers-grid">
                    <!-- Layer 1: Human -->
                    <div class="layer-card">
                        <div class="layer-badge human-badge">👥 Ouvinte Humano</div>
                        <p class="layer-desc">Houve o áudio do criativo com fidelidade total de 99.7%</p>
                        <div class="audio-bubble human-bubble">
                            <span class="quote-icon">“</span>
                            <p>“Compre agora com 50% de desconto no nosso site oficial!”</p>
                        </div>
                        <div class="layer-footer human-footer">CAMADA HUMANA — ÁUDIO ORIGINAL</div>
                    </div>
                    <!-- Layer 2: AI -->
                    <div class="layer-card">
                        <div class="layer-badge ai-badge">🤖 Moderação de IA (STT)</div>
                        <p class="layer-desc">Lê apenas a transcrição do script seguro inserido</p>
                        <div class="audio-bubble ai-bubble">
                            <span class="quote-icon">“</span>
                            <p>“Dicas úteis de jardinagem para flores lindas e sustentáveis no jardim.”</p>
                        </div>
                        <div class="layer-footer ai-footer">CAMADA DE IA — SCRIPT COMPLIANT</div>
                    </div>
                </div>
                <div class="result-badge">
                    <span>✨ Resultado: Criativo aprovado automaticamente pela moderação</span>
                </div>
            </div>
        </section>

        <!-- Como Funciona Section (Timeline Layout with Dotted Curve Path) -->
        <section id="como-funciona" class="features-section">
            <div class="container relative">
                <div class="section-header">
                    <span class="badge-premium">Como Funciona</span>
                    <h2>Proteja Seus Criativos em 3 Passos</h2>
                    <p class="section-desc">Uma interface intuitiva que qualquer um pode usar — sem necessidade de habilidades técnicas</p>
                </div>
                
                <!-- Timeline Wrapper with Curved Path -->
                <div class="timeline-wrapper">
                    <!-- Curved dotted line (SVG) -->
                    <svg class="timeline-svg" viewBox="0 0 800 600" fill="none" preserveAspectRatio="none">
                        <path d="M 120 100 C 350 100, 450 300, 680 300 C 450 300, 350 500, 120 500" stroke="rgba(218, 182, 130, 0.15)" stroke-width="2" stroke-dasharray="6,6" stroke-linecap="round"/>
                        <circle r="4" fill="var(--primary-neon)" class="timeline-glowing-dot">
                            <animateMotion dur="6s" repeatCount="indefinite" path="M 120 100 C 350 100, 450 300, 680 300 C 450 300, 350 500, 120 500" />
                        </circle>
                    </svg>

                    <!-- Step 1 -->
                    <div class="timeline-step step-left">
                        <div class="step-icon-wrapper glow-gold">
                            <div class="step-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            </div>
                            <div class="step-glow-dot"></div>
                        </div>
                        <div class="step-content">
                            <div class="step-number"><span class="num-mono">01.</span> 1. Envie Seu Criativo</div>
                            <p>Arraste seu vídeo ou áudio — suportamos MP4, MOV, MP3, WAV e todos os formatos populares.</p>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="timeline-step step-right">
                        <div class="step-content">
                            <div class="step-number"><span class="num-mono">02.</span> 2. Processamento Dual-Layer</div>
                            <p>Nosso engine escreve uma transcrição alternativa em uma camada oculta que só algoritmos STT detectam.</p>
                        </div>
                        <div class="step-icon-wrapper glow-gold-chip">
                            <div class="step-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
                            </div>
                            <div class="step-glow-dot"></div>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="timeline-step step-left">
                        <div class="step-icon-wrapper glow-green">
                            <div class="step-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                            </div>
                            <div class="step-glow-dot"></div>
                        </div>
                        <div class="step-content">
                            <div class="step-number green-step"><span class="num-mono">03.</span> 3. Baixe e Escale</div>
                            <p>Pegue seu arquivo processado e publique. Bots de moderação leem a camada segura enquanto seu público escuta o real.</p>
                        </div>
                    </div>
                </div>

                <!-- Simulação Auditiva: Mono vs Estéreo -->
                <div class="demo-player-box">
                    <div class="demo-header">
                        <h3>Simulação Auditiva: Mono vs Estéreo</h3>
                        <p>Plataformas convertem seu áudio em MONO antes de transcrever. Veja a diferença:</p>
                    </div>
                    <div class="demo-controls">
                        <div class="demo-column">
                            <span class="demo-tag status-green">Modo Humano (Estéreo)</span>
                            <div class="sound-wave-container" id="stereo-wave">
                                <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                                <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                            </div>
                            <button class="btn btn-sm btn-play" id="btn-play-stereo">🔊 Ouvir em Estéreo</button>
                        </div>
                        <div class="demo-column">
                            <span class="demo-tag status-red">Modo Robô/IA (Mono)</span>
                            <div class="sound-wave-container flat" id="mono-wave">
                                <div class="bar-flat"></div>
                            </div>
                            <button class="btn btn-sm btn-play" id="btn-play-mono">🔇 Ouvir em Mono (Silêncio)</button>
                        </div>
                    </div>
                    <div class="demo-note">
                        <p>💡 <em>Como funciona:</em> O canal esquerdo carrega <code>X</code> e o direito carrega <code>-X</code>. Fones de ouvido tocam os dois separadamente. A IA soma os dois canais: <code>X + (-X) = 0</code>.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- For Professionals Section -->
        <section class="professionals-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium">Para Profissionais</span>
                    <h2>Feito Para Quem Escala Operações</h2>
                    <p class="section-desc">Se você roda tráfego pago de alta escala, a BlackVoice foi construída sob medida para você</p>
                </div>
                <div class="professionals-grid">
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <h3>Afiliados</h3>
                        <p>Suba ofertas agressivas em escala sem quedas constantes de anúncios pelas plataformas.</p>
                    </div>
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        <h3>Agências</h3>
                        <p>Aprove criativos dentro dos prazos, mantendo contas de clientes ativas por muito mais tempo.</p>
                    </div>
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5L4 3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 0-2.5 2.5z"/></svg>
                        <h3>Criadores de Cursos</h3>
                        <p>Lance campanhas de tráfego pago sem restrições ou alertas automáticos em copys faladas.</p>
                    </div>
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        <h3>Media Buyers</h3>
                        <p>Teste 10 vezes mais variações por dia com taxa de aprovação próxima a 100%.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Dashboard App Section -->
        <span id="dashboard-anchor"></span>
        <section id="app-section" class="app-section">
            <div class="app-bg-glow"></div>
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium">Dashboard</span>
                    <h2>Dashboard de Proteção</h2>
                    <p class="section-desc">100% privado — processado no seu navegador. Nenhum arquivo é enviado para servidores.</p>
                </div>

                <!-- Dashboard Interface -->
                <div class="dashboard-card">
                    <div class="dashboard-layout">
                        <!-- Sidebar -->
                        <aside class="dashboard-sidebar">
                            <div class="sidebar-logo">
                                <span class="logo-wordmark" style="font-size: 20px;"><span>Black</span><span class="bv-gold">Voice</span></span>
                            </div>
                            <nav class="sidebar-menu">
                                <button class="sidebar-item active" data-target="tab-process">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    <span>Camuflagem</span>
                                </button>
                                <button class="sidebar-item" data-target="tab-quota">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    <span>Minha Cota</span>
                                </button>
                                <button class="sidebar-item" data-target="tab-tutorial">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    <span>Guia Rápido</span>
                                </button>
                            </nav>
                            <div class="sidebar-footer">
                                <span class="badge-premium" id="sidebar-plan-badge">Free</span>
                            </div>
                        </aside>

                        <!-- Content Area -->
                        <div class="dashboard-content">
                            <!-- Tab: Process -->
                            <div class="dashboard-tab-panel active" id="tab-process">
                                <div class="drop-zone" id="drop-zone-area">
                                    <div class="drop-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                    </div>
                                    <h3>Arraste seus vídeos aqui</h3>
                                    <p>ou <span class="browse-link">procure nos arquivos</span></p>
                                    <span class="file-limits" id="file-limits-text">Plano Gratuito: Máx 1 arquivo de até 200MB · 3/mês</span>
                                    <input type="file" id="file-input-field" accept="video/*" style="display: none;">
                                </div>

                                <!-- Selected Files List State -->
                                <div id="selected-files-list" style="display: none; flex-direction: column; gap: 12px; margin-bottom: 24px;"></div>

                                <!-- Caixa de Texto da Narração Opcional -->
                                <div id="voiceover-text-container" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; margin-top: 20px;">
                                    <label for="voiceover-text" style="font-size: 13px; font-weight: 600; color: var(--text-muted); display: flex; justify-content: space-between;">
                                        <span>🗣️ Narração Oculta (Opcional):</span>
                                    </label>
                                    <textarea id="voiceover-text" placeholder="Cole aqui uma copy de no máximo 30s o mais white possível do seu nicho para a IA entregar para o público certo. Se colocar qualquer texto genérico, vai mandar para o público errado." style="width: 100%; height: 90px; padding: 12px; border-radius: 12px; background: var(--bg-input) !important; border: 1px solid var(--border-color) !important; color: var(--text-main) !important; font-family: var(--font-body); font-size: 14px; resize: none; outline: none; box-sizing: border-box;" maxlength="400"></textarea>
                                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim); gap: 10px;">
                                        <span>Escreva uma copy de até 30 segundos do seu nicho para otimização do algoritmo.</span>
                                        <span id="char-counter" style="white-space: nowrap;">0 / 400</span>
                                    </div>
                                </div>
                                <!-- Caixa de Imagem de Camuflagem e Capa -->
                                <div id="image-camouflage-container" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                                    <label style="font-size: 13px; font-weight: 600; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
                                        <span>🖼️ Imagem de Camuflagem & Capa (Opcional):</span>
                                    </label>
                                    <div id="image-dropzone" style="border: 1px dashed var(--border-color); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; background: var(--bg-input); transition: var(--transition); display: flex; align-items: center; justify-content: center; gap: 12px;">
                                        <span id="image-placeholder-text" style="font-size: 13px; color: var(--text-dim);">Clique para anexar imagem de Capa (Miniatura/Hash)</span>
                                        <button class="btn btn-secondary btn-sm" id="btn-clear-image" style="display: none; padding: 4px 8px; font-size: 11px;">Remover</button>
                                    </div>
                                    <input type="file" id="image-input-field" accept="image/*" style="display: none;">

                                    <!-- Slider para Opacidade do Flash -->
                                    <div id="image-opacity-container" style="display: flex; flex-direction: column; gap: 6px; padding: 12px; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid var(--border-color);">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <span style="font-size: 12px; color: var(--text-muted);">Opacidade do Flash (Camuflagem de Hash):</span>
                                            <span id="image-opacity-val" style="font-size: 12px; color: var(--primary-neon); font-weight: 600;">20%</span>
                                        </div>
                                        <input type="range" id="image-opacity-slider" min="0" max="60" value="20" style="width: 100%; accent-color: var(--primary-neon); cursor: pointer; height: 6px; background: var(--bg-input); border-radius: 3px; outline: none; border: none; margin-top: 4px;">
                                        <span style="font-size: 10px; color: var(--text-dim);">A imagem carregada será definida como a Capa (Miniatura) do vídeo e piscará por 100ms a cada 1 segundo. Se nenhuma imagem for enviada, o BlackVoice extrairá e usará a capa original do vídeo automaticamente.</span>
                                    </div>
                                </div>

                                <!-- Processing State -->
                                <div class="processing-container" id="processing-box" style="display: none;">
                                    <div class="progress-ring-container">
                                        <svg class="progress-ring" width="100" height="100">
                                            <circle class="progress-ring__circle-bg" stroke="rgba(255, 255, 255, 0.05)" stroke-width="6" fill="transparent" r="42" cx="50" cy="50"/>
                                            <circle class="progress-ring__circle" id="progress-circle" stroke="url(#gradient)" stroke-width="6" fill="transparent" r="42" cx="50" cy="50"/>
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stop-color="#DAB682" />
                                                    <stop offset="100%" stop-color="#C4994E" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div class="progress-text" id="progress-percentage">0%</div>
                                    </div>

                                    <div class="status-info" style="flex: 1;">
                                        <h4 id="status-title">Preparando...</h4>
                                        <div class="logger-console" id="log-console">
                                            <div class="log-line">> Iniciando motor BlackVoice...</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Completed State -->
                                <div class="completed-container" id="completed-box" style="display: none;">
                                    <!-- Icone de Sucesso -->
                                    <div class="success-checkmark" id="completed-success-icon"></div>
                                    <!-- Icone de Falha -->
                                    <div class="failure-cross-container" id="completed-failure-icon" style="display: none; justify-content: center; margin-bottom: 20px;">
                                        <div style="width: 56px; height: 56px; border-radius: 50%; border: 2px solid var(--error); display: flex; align-items: center; justify-content: center; box-sizing: border-box;">
                                            <span style="color: var(--error); font-size: 28px; font-weight: bold; font-family: sans-serif; line-height: 1; margin-top: -2px;">✕</span>
                                        </div>
                                    </div>
                                    <h3 id="completed-title">Vídeo Protegido com Sucesso!</h3>
                                    <p>O arquivo já está pronto. Clique abaixo para fazer o download.</p>
                                    <div class="result-actions">
                                        <button class="btn btn-primary btn-glow" id="btn-download-result">⚡ Baixar Vídeo Hacked</button>
                                        <button class="btn btn-outline" id="btn-restart">Processar Outro</button>
                                    </div>
                                </div>

                                <!-- Action Footer inside card -->
                                <div class="card-action-bar" id="card-action-bar">
                                    <button class="btn btn-primary disabled" id="btn-process-action" disabled>Aplicar BlackVoice</button>
                                </div>
                            </div>

                            <!-- Tab: Quota -->
                            <div class="dashboard-tab-panel" id="tab-quota">
                                <div class="quota-panel">
                                    <div class="quota-header">
                                        <h3 class="quota-title">Status da sua Conta</h3>
                                        <span class="badge-premium" id="quota-plan-title">Plano Free</span>
                                    </div>
                                    <div style="margin-top: 10px;">
                                        <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">
                                            <span>Uso de Processamentos (Este Mês)</span>
                                            <span id="quota-usage-text">3 / 3 envios</span>
                                        </div>
                                        <div class="quota-bar-wrapper">
                                            <div class="quota-bar" id="quota-bar-progress" style="width: 100%;"></div>
                                        </div>
                                    </div>
                                    <div class="quota-stats" style="margin-top: 15px;">
                                        <div class="quota-stat-card">
                                            <div class="quota-stat-label">Videos Processados</div>
                                            <div class="quota-stat-value" id="quota-stat-processed">0</div>
                                        </div>
                                        <div class="quota-stat-card">
                                            <div class="quota-stat-label">Limite de Tamanho</div>
                                            <div class="quota-stat-value">200 MB</div>
                                        </div>
                                    </div>
                                    <div style="margin-top: 24px; text-align: center;">
                                        <a href="#precos" class="btn btn-glow" style="width: 100%;" onclick="window.bvSwitchToPlans()">Fazer Upgrade para Pro</a>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab: Tutorial -->
                            <div class="dashboard-tab-panel" id="tab-tutorial">
                                <div style="display: flex; flex-direction: column; gap: 20px;">
                                    <h3 style="font-size: 20px; font-weight: 700; color: var(--primary-neon);">📖 Manual de Operação</h3>
                                    <p style="font-size: 14px; color: var(--text-muted);">Aprenda a obter o máximo desempenho de camuflagem usando o painel do BlackVoice.</p>
                                    
                                    <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
                                        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 18px; border-radius: 12px;">
                                            <h4 style="font-size: 15px; color: #FFFFFF; margin-bottom: 6px;">1. Seleção do Vídeo</h4>
                                            <p style="font-size: 13px; color: var(--text-muted);">Arraste ou clique para enviar arquivos MP4/MOV de até 200MB. Arquivos maiores são compatíveis nos planos Pro.</p>
                                        </div>
                                        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 18px; border-radius: 12px;">
                                            <h4 style="font-size: 15px; color: #FFFFFF; margin-bottom: 6px;">2. Copy de Narração Oculta</h4>
                                            <p style="font-size: 13px; color: var(--text-muted);">Insira uma cópia altamente qualificada e no mesmo idioma do seu anúncio. A IA do Facebook/TikTok detectará essa transcrição para segmentar o público correto.</p>
                                        </div>
                                        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 18px; border-radius: 12px;">
                                            <h4 style="font-size: 15px; color: #FFFFFF; margin-bottom: 6px;">3. Imagem de Camuflagem</h4>
                                            <p style="font-size: 13px; color: var(--text-muted);">Opcionalmente, envie uma imagem vertical de 1080x1920. Ela piscará a cada 1 segundo a 20% de opacidade para mudar a assinatura digital do vídeo e driblar bloqueios por hash.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- MaskAI Dashboard Section Preview Mockup -->
        <section class="mockup-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium">Uso Simples</span>
                    <h2>Painel Intuitivo. Resultados Poderosos.</h2>
                    <p class="section-desc">Estatísticas em tempo real da sua conta e gerenciamento de arquivos integrados</p>
                </div>
                <div class="mockup-grid">
                    <div class="mockup-card">
                        <div class="mockup-header">
                            <span class="mockup-url">app.blackvoice.com/dashboard</span>
                        </div>
                        <div class="mockup-body">
                            <div class="mockup-stats-row">
                                <div class="m-stat">
                                    <span class="m-stat-label">Uploads Hoje</span>
                                    <span class="m-stat-val">15 / 50</span>
                                </div>
                                <div class="m-stat">
                                    <span class="m-stat-label">Taxa de Aprovação</span>
                                    <span class="m-stat-val text-green">96% <small>+15%</small></span>
                                </div>
                                <div class="m-stat">
                                    <span class="m-stat-label">Economia Estimada</span>
                                    <span class="m-stat-val">$3.8k <small>este mês</small></span>
                                </div>
                            </div>
                            <div class="mockup-files-table">
                                <div class="m-table-header">Arquivos Recentes</div>
                                <div class="m-table-row">
                                    <span>creative_offer_v3.mp4</span>
                                    <span class="status-badge success">Concluído</span>
                                </div>
                                <div class="m-table-row">
                                    <span>vsl_launch_promo.mp4</span>
                                    <span class="status-badge success">Concluído</span>
                                </div>
                                <div class="m-table-row">
                                    <span>audio_testimonial_test.mp3</span>
                                    <span class="status-badge processing">Processando</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section id="precos" class="pricing-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium">Preços</span>
                    <h2>Escolha o Seu Plano</h2>
                    <p class="section-desc">Comece grátis e escale à medida que a sua operação cresce. Cancele quando quiser.</p>
                </div>
                <div class="pricing-grid">
                    <!-- Plan 1: Free -->
                    <div class="pricing-card">
                        <span class="plan-name">Free</span>
                        <div class="plan-price">R$ 0<span class="price-period">/mês</span></div>
                        <p class="plan-desc">Para testar a plataforma e validar a tecnologia.</p>
                        <ul class="plan-features">
                            <li>✓ 2 envios de teste grátis por dia</li>
                            <li>✓ Arquivos de até 50 MB</li>
                            <li>✓ Retenção de arquivos por 3 dias</li>
                            <li>✓ Processamento local</li>
                        </ul>
                        <button class="btn btn-outline pricing-btn" id="btn-pricing-hobby" onclick="window.bvScrollToApp()">Começar Grátis</button>
                    </div>
                    <!-- Plan 2: Starter -->
                    <div class="pricing-card">
                        <span class="plan-name">Starter</span>
                        <div class="plan-price">R$ 49<span class="price-period">/mês</span></div>
                        <p class="plan-desc">Para criadores independentes e editores iniciantes.</p>
                        <ul class="plan-features">
                            <li>✓ 10 envios por dia</li>
                            <li>✓ Arquivos de até 100 MB</li>
                            <li>✓ Retenção de arquivos por 7 dias</li>
                            <li>✓ Criptografia de áudio</li>
                            <li>✓ Fila de processamento rápida</li>
                        </ul>
                        <button class="btn btn-outline pricing-btn" id="btn-pricing-creator" onclick="window.bvOpenCheckout('Starter', 'R$ 49/mês')">Assinar Plano Starter</button>
                    </div>
                    <!-- Plan 3: Pro -->
                    <div class="pricing-card featured">
                        <div class="popular-badge">Mais Popular</div>
                        <span class="plan-name">Pro</span>
                        <div class="plan-price">R$ 97<span class="price-period">/mês</span></div>
                        <p class="plan-desc">Para profissionais sérios rodando tráfego pago ativo.</p>
                        <ul class="plan-features">
                            <li>✓ 50 envios por dia</li>
                            <li>✓ Arquivos de até 300 MB</li>
                            <li>✓ Retenção de arquivos por 14 dias</li>
                            <li>✓ Criptografia de áudio</li>
                            <li>✓ Compressão avançada de vídeo</li>
                            <li>✓ Fila de processamento prioritária</li>
                        </ul>
                        <button class="btn btn-primary pricing-btn" id="btn-pricing-pro" onclick="window.bvOpenCheckout('Pro', 'R$ 97/mês')">Assinar Plano Pro</button>
                    </div>
                    <!-- Plan 4: Business -->
                    <div class="pricing-card">
                        <span class="plan-name">Business</span>
                        <div class="plan-price">R$ 199<span class="price-period">/mês</span></div>
                        <p class="plan-desc">Para agências e equipes que demandam volume total.</p>
                        <ul class="plan-features">
                            <li>✓ Envios ilimitados</li>
                            <li>✓ Arquivos de até 500 MB</li>
                            <li>✓ Retenção de arquivos por 30 dias</li>
                            <li>✓ Criptografia de áudio</li>
                            <li>✓ Compressão avançada de vídeo</li>
                            <li>✓ Fila de processamento prioritária</li>
                            <li>✓ Suporte dedicado 24/7</li>
                        </ul>
                        <button class="btn btn-outline pricing-btn" id="btn-pricing-enterprise" onclick="window.bvOpenCheckout('Business', 'R$ 199/mês')">Assinar Plano Business</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium">Depoimentos</span>
                    <h2>O Que Nossos Usuários Dizem</h2>
                    <p class="section-desc">Seja parte do time de profissionais que destravou as vendas com criativos ilimitados</p>
                </div>
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <p class="testimonial-text">“Nós estávamos perdendo $50K/mês em orçamento de anúncios por conta de criativos rejeitados. Depois de usar o BlackVoice, nossa equipe aprova anúncios no mesmo dia com 97% de aprovação de primeira. O ROI se pagou na primeira semana.”</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">M</div>
                            <div>
                                <span class="author-name">Marcus R.</span>
                                <span class="author-role">Performance Marketer</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text">“Gerenciar mais de 30 contas de clientes significa centenas de criativos por semana. O BlackVoice eliminou nosso maior gargalo de produção. Agora garantimos lançamentos no prazo com quase zero reprovação.”</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">S</div>
                            <div>
                                <span class="author-name">Sarah K.</span>
                                <span class="author-role">Diretora de Agência</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text">“Já testei todos os métodos do mercado. Nada chega perto do BlackVoice. Minha equipe processa mais de 200 criativos por semana em menos de uma hora e com zero erro manual. É o diferencial que todo afiliado precisa.”</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">D</div>
                            <div>
                                <span class="author-name">Daniel F.</span>
                                <span class="author-role">Afiliado 7-Dígitos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faq" class="faq-section">
            <div class="container faq-container">
                <div class="section-header">
                    <span class="badge-premium">FAQ</span>
                    <h2>Dúvidas Frequentes</h2>
                    <p class="section-desc">Tudo o que você precisa saber sobre o BlackVoice e a moderação de anúncios.</p>
                </div>
                <div class="accordion">
                    <details class="accordion-item" open>
                        <summary class="accordion-header">O que exatamente o BlackVoice faz?</summary>
                        <div class="accordion-content">
                            <p>O BlackVoice incorpora uma transcrição de áudio alternativa e inofensiva em uma camada oculta do seu arquivo de mídia. Os ouvintes humanos continuam ouvindo o áudio original normalmente, mas os sistemas automáticos de speech-to-text das plataformas leem a camada segura. Isso faz com que seus anúncios passem sem problemas na moderação automática.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header">O que é a tecnologia de 'camada oculta'?</summary>
                        <div class="accordion-content">
                            <p>Injetamos um sinal de áudio alternativo em bandas de frequência específicas que os algoritmos de speech-to-text (STT) priorizam. Como a percepção do ouvido humano ignora ou compensa essas bandas (especialmente quando ouvidas em estéreo), o seu público não percebe nenhuma diferença.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header">Isso altera a qualidade ou o som do meu áudio original?</summary>
                        <div class="accordion-content">
                            <p>Não. Nós preservamos 99.7% de fidelidade da sua onda de áudio original. A camada oculta fica localizada em frequências e amplitudes que o ouvido humano não distingue da gravação original.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header">Com quais plataformas de anúncios isso funciona?</summary>
                        <div class="accordion-content">
                            <p>Funciona com qualquer plataforma de anúncios ou rede que utilize transcrição automática (speech-to-text) para moderação de conformidade — incluindo Facebook/Meta Ads, Google Ads, TikTok Ads, YouTube Ads e redes programáticas.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header">Quanto tempo demora para processar um arquivo?</summary>
                        <div class="accordion-content">
                            <p>Graças ao nosso pipeline local de renderização ultra-rápida, a maioria dos vídeos curtos é processada em menos de 10 segundos, enquanto os vídeos mais longos (com a imagem de hash de 10 min inclusa) levam em média de 3 a 5 segundos totais para estarem prontos para download.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header">Meus vídeos ficam guardados ou expostos em servidores?</summary>
                        <div class="accordion-content">
                            <p>Absolutamente não. Seus arquivos originais são processados de forma privada. O download é disponibilizado temporariamente no servidor apenas enquanto você está com a aba aberta e é excluído logo após o download ou em 30 minutos por segurança.</p>
                        </div>
                    </details>
                </div>
            </div>
        </section>

        <!-- CTA Bottom Section -->
        <section class="cta-bottom">
            <div class="container text-center">
                <span class="badge-premium">BlackVoice App</span>
                <h2>Pronto Para Superar a Moderação de Conteúdo?</h2>
                <p>Cada criativo bloqueado é faturamento que você deixa de ganhar. Comece a processar agora mesmo.</p>
                <a class="btn btn-primary btn-glow" href="#dashboard-anchor">Começar a Usar Agora</a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container footer-grid">
            <div class="footer-brand">
                <a href="#" class="logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    <span class="logo-wordmark"><span>Black</span><span class="bv-gold">Voice</span></span>
                </a>
                <p class="footer-desc">Tecnologia dual-layer com transcrição segura integrada para camuflagem e proteção de anúncios de alta conversão.</p>
            </div>
            <div class="footer-links-col">
                <h4>Produto</h4>
                <a href="#como-funciona">Como Funciona</a>
                <a href="#precos">Preços</a>
                <a href="#dashboard-anchor">Dashboard</a>
            </div>
            <div class="footer-links-col">
                <h4>Legal</h4>
                <a href="#">Privacidade</a>
                <a href="#">Termos de Uso</a>
                <a href="#">Suporte</a>
            </div>
            <div class="footer-status-col">
                <h4>Sistema</h4>
                <div class="status-indicator">
                    <span class="status-dot"></span>
                    <span>Todos os sistemas operacionais</span>
                </div>
            </div>
        </div>
        <div class="container footer-bottom">
            <p>© 2026 BlackVoice. Todos os direitos reservados. Projetado para otimização de anúncios.</p>
        </div>
    </footer>

    <!-- Checkout Modal -->
    <div class="modal" id="checkout-modal">
        <div class="modal-content glass">
            <button class="modal-close" id="btn-close-modal">✕</button>
            <div class="modal-header">
                <h2>BlackVoice <span id="modal-plan-badge" class="badge">Pro</span></h2>
                <p>Simulador de Checkout de Pagamento (Ambiente de Testes)</p>
            </div>
            <div class="modal-body">
                <div class="payment-summary">
                    <span>Total a pagar hoje:</span>
                    <strong id="modal-plan-price">R$ 97/mês</strong>
                </div>
                <div class="mock-form">
                    <label for="mock-card-name">Nome no cartão</label>
                    <input type="text" id="mock-card-name" placeholder="Fulano de Tal" value="Fulano de Tal" disabled>
                    <label for="mock-card-number">Número do Cartão</label>
                    <input type="text" id="mock-card-number" placeholder="4000 1234 5678 9010" value="•••• •••• •••• 4242" disabled>
                    <div class="row">
                        <div>
                            <label for="mock-card-expiry">Validade</label>
                            <input type="text" id="mock-card-expiry" value="12/30" disabled>
                        </div>
                        <div>
                            <label for="mock-card-cvv">CVC</label>
                            <input type="password" id="mock-card-cvv" value="•••" disabled>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary btn-full" id="btn-mock-pay">Confirmar Pagamento Simulado</button>
                <div id="payment-success-msg" style="display: none; margin-top: 15px; color: #10b981; font-weight: bold; text-align: center;">
                    ✓ Pagamento aprovado! Plano ativado com sucesso.
                </div>
            </div>
        </div>
    </div>

    <!-- Auth Modal -->
    <div class="auth-modal-overlay" id="auth-modal-overlay">
        <div class="auth-modal">
            <button class="auth-modal-close" id="auth-modal-close">✕</button>
            <div class="auth-modal-logo">
                <span style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;letter-spacing:-0.5px;">
                    <span style="color:#fff;">Black</span><span style="color:#DAB682;">Voice</span>
                </span>
            </div>
            <!-- Tabs -->
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login" id="auth-tab-login">Entrar</button>
                <button class="auth-tab" data-tab="register" id="auth-tab-register">Criar Conta</button>
            </div>

            <!-- Login Panel -->
            <div class="auth-panel active" id="auth-panel-login">
                <button class="btn-google" id="btn-google-login">
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-21 0-1.3-.2-2.7-.5-4z"/>
                        <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                        <path fill="#FBBC05" d="M24 46c5.9 0 10.9-1.9 14.6-5.2l-6.7-5.5C29.8 36.7 27 37.5 24 37.5c-6 0-11.1-4-12.9-9.5l-7 5.4C7.7 41.6 15.3 46 24 46z"/>
                        <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.3-2.3 4.2-4.4 5.5l6.7 5.5c3.9-3.6 6.4-9 6.4-15.5 0-1.3-.2-2.7-.5-4z"/>
                    </svg>
                    Continuar com Google
                </button>
                <div class="auth-divider">ou entre com e-mail</div>
                <div class="auth-error" id="login-error"></div>
                <div class="auth-field">
                    <label for="login-email">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" autocomplete="email">
                </div>
                <div class="auth-field">
                    <label for="login-password">Senha</label>
                    <input type="password" id="login-password" placeholder="••••••••" autocomplete="current-password">
                </div>
                <button class="btn-auth-submit" id="btn-do-login">Entrar na Conta</button>
                <button class="auth-free-btn" id="btn-continue-free">Continuar sem conta (Plano Gratuito)</button>
            </div>

            <!-- Register Panel -->
            <div class="auth-panel" id="auth-panel-register">
                <button class="btn-google" id="btn-google-register">
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-21 0-1.3-.2-2.7-.5-4z"/>
                        <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-21 0-1.3-.2-2.7-.5-4z"/>
                        <path fill="#FBBC05" d="M24 46c5.9 0 10.9-1.9 14.6-5.2l-6.7-5.5C29.8 36.7 27 37.5 24 37.5c-6 0-11.1-4-12.9-9.5l-7 5.4C7.7 41.6 15.3 46 24 46z"/>
                        <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.3-2.3 4.2-4.4 5.5l6.7 5.5c3.9-3.6 6.4-9 6.4-15.5 0-1.3-.2-2.7-.5-4z"/>
                    </svg>
                    Registrar com Google
                </button>
                <div class="auth-divider">ou crie com e-mail</div>
                <div class="auth-error" id="register-error"></div>
                <div class="auth-field">
                    <label for="register-name">Nome completo</label>
                    <input type="text" id="register-name" placeholder="Seu nome" autocomplete="name">
                </div>
                <div class="auth-field">
                    <label for="register-email">E-mail</label>
                    <input type="email" id="register-email" placeholder="seu@email.com" autocomplete="email">
                </div>
                <div class="auth-field">
                    <label for="register-password">Senha</label>
                    <input type="password" id="register-password" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
                </div>
                <button class="btn-auth-submit" id="btn-do-register">Criar Conta Grátis</button>
                <button class="auth-free-btn" id="btn-continue-free-register">Continuar sem conta (Plano Gratuito)</button>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://unpkg.com/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js"></script>
    <script src="app.js?v=1784080183"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const sidebarItems = document.querySelectorAll('.sidebar-item');
            const tabPanels = document.querySelectorAll('.dashboard-tab-panel');

            sidebarItems.forEach(item => {
                item.addEventListener('click', () => {
                    const target = item.getAttribute('data-target');
                    sidebarItems.forEach(i => i.classList.remove('active'));
                    tabPanels.forEach(p => p.classList.remove('active'));
                    item.classList.add('active');
                    const panel = document.getElementById(target);
                    if (panel) panel.classList.add('active');
                });
            });

            window.bvSwitchToPlans = function() {
                const precosSection = document.getElementById('precos');
                if (precosSection) precosSection.scrollIntoView({ behavior: 'smooth' });
            };
            
            window.bvScrollToApp = function() {
                const appSection = document.getElementById('app-section');
                if (appSection) appSection.scrollIntoView({ behavior: 'smooth' });
            };
        });
    </script>
</body>
</html>`;

// Rebuild style.css content
const newCss = `/* ========================================================================== */
/*  BlackVoice SaaS - Premium Futuristic Design System                        */
/*  Theme: Dark (#0a0a0a), Accent (#DAB682 / #C4994E)                         */
/* ========================================================================== */

:root {
    --bg-dark: #0a0a0a;
    --bg-secondary: #121212;
    --bg-card: #171717;
    --bg-input: #202020;
    
    --border-color: rgba(255, 255, 255, 0.06);
    --border-hover: rgba(255, 255, 255, 0.12);
    
    --text-main: #FFFFFF;
    --text-muted: #a3a3a3;
    --text-dim: #737373;
    
    --primary-neon: #DAB682;      /* Gold Accent Light */
    --secondary-neon: #C4994E;    /* Gold Accent Dark */
    --accent: #E8CFA0;            /* Pale Gold */
    --error: #ef4444;             /* Red Alert */
    --warning: #f59e0b;           /* Amber */
    --success: #10b981;           /* Emerald Green */
    
    --font-heading: 'Space Grotesk', 'Inter', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'Space Mono', monospace;
    
    --transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    
    --shadow-premium: 0 10px 40px rgba(0, 0, 0, 0.65);
    --shadow-glow-cyan: 0 0 24px rgba(218, 182, 130, 0.15);
    --shadow-glow-purple: 0 0 24px rgba(196, 153, 78, 0.15);
}

/* Reset & Base Rules */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
}

body {
    background-color: var(--bg-dark) !important;
    color: var(--text-main) !important;
    font-family: var(--font-body) !important;
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}

/* Background Grid & Ambient Light */
body::before {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.006) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.006) 1px, transparent 1px);
    background-size: 60px 60px;
    background-position: center;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%);
    pointer-events: none;
    z-index: -2;
}

body::after {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: 
        radial-gradient(circle at 10% 10%, rgba(196, 153, 78, 0.03) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(218, 182, 130, 0.03) 0%, transparent 45%),
        radial-gradient(circle at 50% 40%, rgba(10, 10, 10, 0.5) 0%, transparent 100%);
    pointer-events: none;
    z-index: -1;
}

.noise-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.012'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    background: var(--bg-dark);
}
::-webkit-scrollbar-thumb {
    background: #262626;
    border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
    background: #404040;
}

/* Typography */
h1, h2, h3, h4 {
    font-family: var(--font-heading) !important;
    font-weight: 700;
    letter-spacing: -0.02em;
}

p {
    font-weight: 400;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* Navbar */
.navbar {
    position: fixed;
    top: 0; left: 0; width: 100%;
    z-index: 1000;
    background: rgba(10, 10, 10, 0.75) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid var(--border-color) !important;
    padding: 16px 0;
    transition: var(--transition);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
}

.logo-icon {
    color: var(--primary-neon);
    filter: drop-shadow(0 0 4px rgba(218, 182, 130, 0.4));
}

.logo-wordmark {
    font-family: var(--font-heading);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.6px;
    color: #FFFFFF;
}

.logo-wordmark .bv-gold {
    color: var(--primary-neon) !important;
}

.nav-links {
    display: flex;
    gap: 28px;
    align-items: center;
}

.nav-links a {
    color: var(--text-muted) !important;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 8px;
    transition: var(--transition);
}

.nav-links a:hover {
    color: #FFFFFF !important;
    background: rgba(255, 255, 255, 0.03);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.badge {
    border: 1px solid var(--border-color) !important;
    border-radius: 20px !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.02) !important;
    color: var(--text-muted) !important;
    padding: 6px 12px !important;
    font-family: var(--font-mono);
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 12px !important;
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    border: 1px solid transparent;
    gap: 8px;
}

.btn:active {
    transform: scale(0.97) !important;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-neon), var(--secondary-neon)) !important;
    color: #000000 !important;
    border: none !important;
    box-shadow: 0 4px 18px rgba(218, 182, 130, 0.25) !important;
}

.btn-primary:hover {
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 8px 24px rgba(218, 182, 130, 0.4), var(--shadow-glow-cyan) !important;
    background: linear-gradient(135deg, var(--accent), var(--primary-neon)) !important;
}

.btn-outline {
    background: rgba(255, 255, 255, 0.01) !important;
    color: var(--text-main) !important;
    border-color: var(--border-color) !important;
}

.btn-outline:hover {
    background: rgba(255, 255, 255, 0.03) !important;
    border-color: var(--primary-neon) !important;
    transform: translateY(-2px) !important;
    box-shadow: var(--shadow-glow-cyan) !important;
}

.btn-secondary {
    background: #1c1c1e !important;
    color: var(--text-main) !important;
    border-color: var(--border-color) !important;
}

.btn-secondary:hover {
    background: #2c2c2e !important;
    border-color: var(--primary-neon) !important;
    transform: translateY(-2px) !important;
    box-shadow: var(--shadow-glow-cyan) !important;
}

.btn-glow {
    box-shadow: 0 0 20px rgba(218, 182, 130, 0.2) !important;
}

.btn-sm {
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 8px !important;
}

.btn-full {
    width: 100%;
}

.btn:disabled, .btn.disabled {
    background: #171717 !important;
    color: var(--text-dim) !important;
    border-color: var(--border-color) !important;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
}

/* Hero Section */
.hero {
    position: relative;
    padding: 160px 0 100px 0;
    text-align: center;
    overflow: hidden;
}

.hero-bg-glow {
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 1200px; height: 100%;
    background: radial-gradient(ellipse 60% 45% at 50% 0%, rgba(218, 182, 130, 0.08) 0%, transparent 65%) !important;
    pointer-events: none;
    z-index: 0;
}

.hero-badge-bv {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(218, 182, 130, 0.06) !important;
    border: 1px solid rgba(218, 182, 130, 0.2) !important;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
    color: var(--primary-neon);
    margin-bottom: 24px;
}

.hero h1 {
    font-size: 56px !important;
    line-height: 1.1 !important;
    margin-bottom: 24px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #FFFFFF 50%, var(--primary-neon) 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
}

.hero-subtext {
    font-size: 18px;
    color: var(--text-muted);
    max-width: 680px;
    margin: 0 auto 36px auto;
    line-height: 1.6;
}

.hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 60px;
}

.trusted-text {
    font-size: 10px;
    font-family: var(--font-mono);
    letter-spacing: 0.15em;
    color: var(--text-dim);
    margin-bottom: 16px;
    text-transform: uppercase;
}

.trusted-logos {
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-bottom: 60px;
}

.trusted-logo {
    font-family: var(--font-heading);
    font-size: 15px;
    font-weight: 600;
    color: var(--text-dim);
    opacity: 0.8;
}

.hero-metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--border-color);
    padding-top: 48px;
    max-width: 900px;
    margin: 0 auto;
}

.metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid var(--border-color);
}

.metric:last-child {
    border-right: none;
}

.metric-val {
    font-family: var(--font-heading);
    font-size: 32px;
    font-weight: 700;
    color: #FFFFFF;
}

.metric-label {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 4px;
}

/* Two Layers Section */
.two-layers-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
    position: relative;
    background: rgba(255, 255, 255, 0.005);
}

.section-header {
    text-align: center;
    margin-bottom: 56px;
}

.section-header h2 {
    font-size: 36px !important;
    margin-top: 12px;
    margin-bottom: 16px;
}

.section-desc {
    color: var(--text-muted);
    font-size: 16px;
    max-width: 600px;
    margin: 0 auto;
}

.layers-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 32px;
}

.layer-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 18px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: var(--shadow-premium);
    transition: var(--transition);
}

.layer-card:hover {
    transform: translateY(-4px);
    border-color: var(--primary-neon);
}

.layer-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
    width: fit-content;
    gap: 6px;
}

.human-badge {
    background: rgba(218, 182, 130, 0.08);
    color: var(--primary-neon);
    border: 1px solid rgba(218, 182, 130, 0.2);
}

.ai-badge {
    background: rgba(167, 139, 250, 0.08);
    color: #a78bfa;
    border: 1px solid rgba(167, 139, 250, 0.2);
}

.layer-desc {
    font-size: 13px;
    color: var(--text-muted);
}

.audio-bubble {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100px;
    display: flex;
    align-items: center;
}

.human-bubble p {
    color: var(--primary-neon);
    font-weight: 500;
}

.ai-bubble p {
    color: #a78bfa;
    font-weight: 500;
}

.quote-icon {
    font-size: 40px;
    position: absolute;
    top: 10px;
    left: 15px;
    opacity: 0.05;
    line-height: 1;
}

.layer-footer {
    font-family: var(--font-heading);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-align: center;
    text-transform: uppercase;
    margin-top: auto;
}

.human-footer {
    color: var(--primary-neon);
    opacity: 0.7;
}

.ai-footer {
    color: #a78bfa;
    opacity: 0.7;
}

.result-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px auto 0 auto;
    width: fit-content;
    padding: 10px 24px;
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 30px;
    color: #10b981;
    font-size: 14px;
    font-weight: 600;
    gap: 8px;
}

/* Como Funciona Section */
.features-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 60px;
}

.feature-card {
    background: var(--bg-card) !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 18px !important;
    padding: 36px;
    box-shadow: var(--shadow-premium) !important;
    transition: var(--transition);
}

.feature-card:hover {
    transform: translateY(-4px) !important;
    border-color: rgba(218, 182, 130, 0.25) !important;
    box-shadow: var(--shadow-glow-cyan) !important;
}

.card-icon {
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-neon);
    margin-bottom: 20px;
}

.step-title {
    font-size: 18px;
    margin-bottom: 12px;
}

.feature-card p {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.6;
}

/* Sound demo component */
.demo-player-box {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 40px;
    max-width: 800px;
    margin: 40px auto 0 auto;
    box-shadow: var(--shadow-premium);
}

.demo-header {
    text-align: center;
    margin-bottom: 32px;
}

.demo-header h3 {
    font-size: 20px;
    margin-bottom: 6px;
}

.demo-header p {
    color: var(--text-muted);
    font-size: 14px;
}

.demo-controls {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 24px;
}

.demo-column {
    flex: 1;
    background: var(--bg-dark);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.demo-tag {
    font-size: 11px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 20px;
    text-transform: uppercase;
}

.status-green {
    background: rgba(16, 185, 129, 0.08);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-red {
    background: rgba(239, 68, 68, 0.08);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.sound-wave-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 40px;
    width: 100%;
}

.sound-wave-container .bar {
    width: 3px;
    height: 100%;
    background: var(--primary-neon);
    border-radius: 3px;
    animation: bounce 0.8s infinite alternate;
}

.sound-wave-container .bar:nth-child(2) { animation-delay: 0.1s; height: 60%; }
.sound-wave-container .bar:nth-child(3) { animation-delay: 0.2s; height: 30%; }
.sound-wave-container .bar:nth-child(4) { animation-delay: 0.15s; height: 75%; }
.sound-wave-container .bar:nth-child(5) { animation-delay: 0.3s; height: 50%; }
.sound-wave-container .bar:nth-child(6) { animation-delay: 0.05s; height: 90%; }
.sound-wave-container .bar:nth-child(7) { animation-delay: 0.25s; height: 40%; }
.sound-wave-container .bar:nth-child(8) { animation-delay: 0.18s; height: 65%; }
.sound-wave-container .bar:nth-child(9) { animation-delay: 0.12s; height: 80%; }
.sound-wave-container .bar:nth-child(10) { animation-delay: 0.22s; height: 35%; }

@keyframes bounce {
    from { transform: scaleY(0.1); }
    to { transform: scaleY(1); }
}
.sound-wave-container.paused .bar {
    animation-play-state: paused;
    height: 15% !important;
    background: var(--text-dim) !important;
}

.sound-wave-container.flat {
    height: 40px;
}

.bar-flat {
    width: 70%;
    height: 2px;
    background: var(--text-dim);
}

.demo-note {
    text-align: center;
    font-size: 12px;
    color: var(--text-dim);
    border-top: 1px solid var(--border-color);
    padding-top: 20px;
}

/* Timeline Step System (MaskAI Curved Timeline) */
.timeline-wrapper {
    position: relative;
    max-width: 900px;
    margin: 60px auto;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 80px;
}

.timeline-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.timeline-step {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    width: 100%;
}

.step-left {
    justify-content: flex-start;
}

.step-right {
    justify-content: flex-end;
}

.step-icon-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #0f0f10 !important;
    border: 1px solid var(--border-color) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-shrink: 0;
    transition: var(--transition);
}

.step-icon-wrapper:hover {
    transform: scale(1.05);
}

.step-icon {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Gold glow styling matching screenshot */
.glow-gold {
    box-shadow: 0 0 24px rgba(218, 182, 130, 0.15), inset 0 0 12px rgba(218, 182, 130, 0.08) !important;
    border-color: rgba(218, 182, 130, 0.3) !important;
}
.glow-gold .step-icon {
    color: var(--primary-neon) !important;
}

.glow-gold-chip {
    box-shadow: 0 0 24px rgba(196, 153, 78, 0.15), inset 0 0 12px rgba(196, 153, 78, 0.08) !important;
    border-color: rgba(196, 153, 78, 0.3) !important;
}
.glow-gold-chip .step-icon {
    color: var(--secondary-neon) !important;
}

/* Green glow styling matching screenshot */
.glow-green {
    box-shadow: 0 0 24px rgba(16, 185, 129, 0.2), inset 0 0 12px rgba(16, 185, 129, 0.1) !important;
    border-color: rgba(16, 185, 129, 0.4) !important;
}
.glow-green .step-icon {
    color: var(--success) !important;
}

/* Glowing dot on the border of the icon */
.step-glow-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 3;
}

.glow-gold .step-glow-dot {
    background: var(--primary-neon);
    box-shadow: 0 0 10px var(--primary-neon);
    top: 8px;
    right: 8px;
}

.glow-gold-chip .step-glow-dot {
    background: var(--secondary-neon);
    box-shadow: 0 0 10px var(--secondary-neon);
    top: 8px;
    right: 8px;
}

.glow-green .step-glow-dot {
    background: var(--success);
    box-shadow: 0 0 10px var(--success);
    top: 8px;
    right: 8px;
}

.step-content {
    max-width: 450px;
    padding: 0 40px;
}

.step-left .step-content {
    margin-left: 20px;
}

.step-right .step-content {
    margin-right: 20px;
    text-align: right;
}

.step-number {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.step-right .step-number {
    justify-content: flex-end;
}

.num-mono {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-neon);
}

.green-step .num-mono {
    color: var(--success);
}

.step-content p {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.6;
}

/* For Professionals Section */
.professionals-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
}

.professionals-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

.prof-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 32px;
    box-shadow: var(--shadow-premium);
    transition: var(--transition);
}

.prof-card:hover {
    transform: translateY(-4px);
    border-color: var(--primary-neon);
}

.prof-icon {
    color: var(--primary-neon);
    margin-bottom: 20px;
}

.prof-card h3 {
    font-size: 18px;
    margin-bottom: 10px;
}

.prof-card p {
    color: var(--text-muted);
    font-size: 13px;
    line-height: 1.6;
}

/* App / Dashboard Section styling */
.app-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
    position: relative;
}

.app-bg-glow {
    position: absolute;
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 80%; height: 80%;
    background: radial-gradient(circle, rgba(218, 182, 130, 0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}

.dashboard-card {
    background: var(--bg-card) !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 20px !important;
    max-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: var(--shadow-premium), 0 0 60px rgba(196, 153, 78, 0.02) !important;
    position: relative;
    z-index: 1;
}

.dashboard-layout {
    display: flex;
    min-height: 600px;
}

.dashboard-sidebar {
    width: 240px;
    background: #0f0f10 !important;
    border-right: 1px solid var(--border-color);
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar-logo {
    margin-bottom: 40px;
    padding-left: 10px;
}

.sidebar-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
}

.sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: transparent;
    border: none;
    border-radius: 12px;
    color: var(--text-muted);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: var(--transition);
    outline: none;
}

.sidebar-item svg {
    stroke: var(--text-dim);
}

.sidebar-item:hover {
    background: rgba(255, 255, 255, 0.02);
    color: var(--text-main);
}

.sidebar-item:hover svg {
    stroke: var(--text-muted);
}

.sidebar-item.active {
    background: rgba(218, 182, 130, 0.06) !important;
    color: var(--primary-neon) !important;
    font-weight: 600;
}

.sidebar-item.active svg {
    stroke: var(--primary-neon) !important;
    filter: drop-shadow(0 0 4px var(--primary-neon));
}

.sidebar-footer {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
}

.badge-premium {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(218, 182, 130, 0.05);
    border: 1px solid rgba(218, 182, 130, 0.15);
    border-radius: 20px;
    color: var(--primary-neon);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: center;
    font-family: var(--font-mono);
}

.dashboard-content {
    flex: 1;
    padding: 40px;
    background: var(--bg-dark);
}

.dashboard-tab-panel {
    display: none;
    height: 100%;
}

.dashboard-tab-panel.active {
    display: block;
    animation: tabFadeIn 0.3s ease-out forwards;
}

@keyframes tabFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Drag Zone */
.drop-zone {
    border: 2px dashed var(--border-color) !important;
    border-radius: 16px !important;
    padding: 48px 20px !important;
    text-align: center;
    cursor: pointer;
    background: var(--bg-secondary) !important;
    transition: var(--transition);
}

.drop-zone:hover, .drop-zone.active {
    border-color: var(--primary-neon) !important;
    background: var(--bg-card) !important;
    box-shadow: var(--shadow-glow-cyan) !important;
}

.drop-icon svg {
    stroke: var(--primary-neon) !important;
    filter: drop-shadow(0 0 6px rgba(218, 182, 130, 0.4));
}

.drop-zone h3 {
    font-size: 16px;
    margin-top: 16px;
    margin-bottom: 6px;
}

.browse-link {
    color: var(--primary-neon);
    font-weight: 600;
}

.file-limits {
    display: block;
    margin-top: 12px;
    font-size: 12px;
    color: var(--text-dim);
}

textarea, input[type="text"], input[type="email"], input[type="password"] {
    background: var(--bg-input) !important;
    border: 1px solid var(--border-color) !important;
    color: var(--text-main) !important;
    border-radius: 12px !important;
    padding: 14px 16px !important;
    font-size: 14px !important;
    font-family: var(--font-body) !important;
    outline: none !important;
    transition: var(--transition) !important;
}

textarea:focus, input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus {
    border-color: var(--primary-neon) !important;
    box-shadow: 0 0 0 1px var(--primary-neon), var(--shadow-glow-cyan) !important;
}

#image-dropzone {
    border: 1px dashed var(--border-color) !important;
    background: var(--bg-secondary) !important;
    border-radius: 12px !important;
    padding: 16px !important;
    transition: var(--transition) !important;
}

#image-dropzone:hover {
    border-color: var(--secondary-neon) !important;
    box-shadow: var(--shadow-glow-purple) !important;
}

.file-details-container {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
}

.file-info h4 {
    font-size: 14px;
    margin-bottom: 2px;
}

.file-info span {
    font-size: 12px;
    color: var(--text-dim);
}

.btn-clear {
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
    transition: var(--transition);
}

.btn-clear:hover {
    color: var(--error);
}

.card-action-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
}

/* Processing View */
.processing-container {
    display: flex;
    align-items: center;
    gap: 28px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 24px;
}

.progress-ring-container {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
}

.progress-ring {
    transform: rotate(-90deg);
}

.progress-ring__circle-bg {
    stroke: rgba(255, 255, 255, 0.04);
}

.progress-ring__circle {
    stroke: var(--primary-neon) !important;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.35s;
    transform-origin: 50% 50%;
    filter: drop-shadow(0 0 6px var(--primary-neon));
}

.progress-text {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-neon);
}

.status-info h4 {
    font-size: 15px;
    margin-bottom: 8px;
}

.logger-console {
    background: #000000;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 12px;
    height: 80px;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 12px;
    color: #e2e8f0;
}

.log-line {
    margin-bottom: 4px;
}

.completed-container {
    text-align: center;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 40px 24px;
}

.success-checkmark {
    width: 56px;
    height: 56px;
    margin: 0 auto 20px auto;
    border-radius: 50%;
    border: 2px solid var(--success);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--success);
    font-size: 28px;
    font-weight: bold;
    filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));
}

.success-checkmark::before {
    content: '✓';
}

.completed-container h3 {
    font-size: 20px;
    margin-bottom: 6px;
}

.completed-container p {
    color: var(--text-muted);
    font-size: 14px;
    margin-bottom: 24px;
}

.result-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
}

/* Quota page */
.quota-panel {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.quota-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quota-title {
    font-size: 18px;
}

.quota-bar-wrapper {
    background: var(--bg-input);
    border-radius: 8px;
    height: 8px;
    width: 100%;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--border-color);
}

.quota-bar {
    background: linear-gradient(90deg, var(--secondary-neon), var(--primary-neon));
    height: 100%;
    border-radius: 8px;
    width: 100%;
}

.quota-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.quota-stat-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    padding: 16px;
    border-radius: 12px;
}

.quota-stat-label {
    font-size: 11px;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
}

.quota-stat-value {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
}

/* MaskAI Dashboard Mockup Section styling */
.mockup-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
}

.mockup-grid {
    max-width: 800px;
    margin: 0 auto;
}

.mockup-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-premium);
}

.mockup-header {
    background: #121212;
    border-bottom: 1px solid var(--border-color);
    padding: 12px 20px;
    display: flex;
    align-items: center;
}

.mockup-url {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-dim);
}

.mockup-body {
    padding: 32px;
}

.mockup-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;
}

.m-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.m-stat-label {
    font-size: 11px;
    color: var(--text-muted);
}

.m-stat-val {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
}

.m-stat-val small {
    font-size: 12px;
    font-weight: 500;
    margin-left: 4px;
}

.text-green {
    color: var(--success);
}

.mockup-files-table {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.m-table-header {
    font-family: var(--font-heading);
    font-size: 14px;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 4px;
}

.m-table-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 12px 20px;
    font-size: 13px;
}

.status-badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
}

.status-badge.success {
    background: rgba(16, 185, 129, 0.08);
    color: var(--success);
    border: 1px solid rgba(16, 185, 129, 0.15);
}

.status-badge.processing {
    background: rgba(218, 182, 130, 0.08);
    color: var(--primary-neon);
    border: 1px solid rgba(218, 182, 130, 0.15);
}

/* Pricing Grid */
.pricing-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
}

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

.pricing-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 18px;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--shadow-premium);
    transition: var(--transition);
}

.pricing-card:hover {
    border-color: var(--primary-neon);
}

.pricing-card.featured {
    border: 1.5px solid var(--primary-neon);
    box-shadow: var(--shadow-premium), 0 0 32px rgba(218, 182, 130, 0.05);
}

.popular-badge {
    position: absolute;
    top: -14px; left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, var(--primary-neon), var(--secondary-neon));
    color: #000000;
    font-size: 10px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 20px;
    text-transform: uppercase;
}

.plan-name {
    font-size: 14px;
    color: var(--text-muted);
    text-transform: uppercase;
    font-weight: 600;
}

.plan-price {
    font-family: var(--font-heading);
    font-size: 36px;
    font-weight: 700;
    margin: 16px 0;
    color: #FFFFFF;
}

.price-period {
    font-size: 13px;
    font-weight: 400;
    color: var(--text-dim);
}

.plan-desc {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 24px;
    min-height: 40px;
    line-height: 1.5;
}

.plan-features {
    list-style: none;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 13px;
    flex: 1;
}

.plan-features li {
    color: var(--text-muted);
}

.pricing-btn {
    width: 100%;
}

/* Testimonials section */
.testimonials-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
}

.testimonial-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: var(--shadow-premium);
}

.testimonial-text {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-muted);
    margin-bottom: 24px;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
}

.author-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary-neon);
    color: #000000;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.author-name {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #FFFFFF;
}

.author-role {
    font-size: 11px;
    color: var(--text-dim);
}

/* FAQ Accordion */
.faq-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
}

.faq-container {
    max-width: 800px;
}

.accordion {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.accordion-item {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    background: var(--bg-card);
    overflow: hidden;
}

.accordion-header {
    padding: 20px 24px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    user-select: none;
    color: #FFFFFF;
}

.accordion-item[open] .accordion-header {
    border-bottom: 1px solid var(--border-color);
    color: var(--primary-neon);
}

.accordion-content {
    padding: 20px 24px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
}

/* CTA Bottom Section */
.cta-bottom {
    padding: 120px 0;
    border-top: 1px solid var(--border-color);
    background: radial-gradient(circle at center, rgba(218, 182, 130, 0.03) 0%, transparent 60%);
}

.cta-bottom h2 {
    font-size: 36px !important;
    margin-top: 16px;
    margin-bottom: 16px;
}

.cta-bottom p {
    color: var(--text-muted);
    font-size: 16px;
    max-width: 600px;
    margin: 0 auto 32px auto;
}

/* Footer Section */
footer {
    border-top: 1px solid var(--border-color);
    background: #050505;
    padding: 80px 0 40px 0;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 60px;
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer-desc {
    font-size: 13px;
    color: var(--text-muted);
    max-width: 320px;
    line-height: 1.6;
}

.footer-links-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-links-col h4, .footer-status-col h4 {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #FFFFFF;
    margin-bottom: 8px;
}

.footer-links-col a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition: var(--transition);
}

.footer-links-col a:hover {
    color: var(--primary-neon);
}

.footer-status-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #10b981;
    font-weight: 500;
}

.status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
}

.footer-bottom {
    border-top: 1px solid var(--border-color);
    padding-top: 32px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--text-dim);
}

/* Modals */
.modal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.7);
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
}

.modal.active {
    display: flex;
}

.modal-content {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 36px;
    width: 100%;
    max-width: 480px;
    position: relative;
    box-shadow: var(--shadow-premium);
    animation: modalSlideUp 0.3s ease-out forwards;
}

@keyframes modalSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.modal-close {
    position: absolute;
    top: 20px; right: 20px;
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 18px;
    cursor: pointer;
    outline: none;
}

.modal-close:hover {
    color: #FFFFFF;
}

.modal-header h2 {
    font-size: 20px;
    margin-bottom: 6px;
}

.modal-header p {
    font-size: 12px;
    color: var(--text-dim);
}

.payment-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    padding: 16px;
    border-radius: 12px;
    margin: 24px 0;
}

.payment-summary strong {
    color: var(--primary-neon);
    font-size: 18px;
}

.mock-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.mock-form label {
    font-size: 12px;
    color: var(--text-muted);
}

.mock-form .row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 12px;
}

/* Auth Modal overlay and box */
.auth-modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.7);
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
}

.auth-modal-overlay.active {
    display: flex;
}

.auth-modal {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 36px;
    width: 100%;
    max-width: 400px;
    position: relative;
    box-shadow: var(--shadow-premium);
    animation: modalSlideUp 0.3s ease-out forwards;
}

.auth-modal-close {
    position: absolute;
    top: 20px; right: 20px;
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 18px;
    cursor: pointer;
    outline: none;
}

.auth-modal-close:hover {
    color: #FFFFFF;
}

.auth-modal-logo {
    text-align: center;
    margin-bottom: 24px;
}

.auth-tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 24px;
}

.auth-tab {
    flex: 1;
    background: none;
    border: none;
    padding: 12px;
    color: var(--text-muted);
    font-family: var(--font-heading);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    outline: none;
}

.auth-tab.active {
    color: var(--primary-neon);
    border-bottom-color: var(--primary-neon);
}

.auth-panel {
    display: none;
}

.auth-panel.active {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.btn-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #FFFFFF;
    color: #000000;
    border: none;
    border-radius: 12px;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.btn-google:hover {
    background: #f1f5f9;
}

.auth-divider {
    text-align: center;
    font-size: 11px;
    color: var(--text-dim);
    position: relative;
    margin: 8px 0;
}

.auth-divider::before, .auth-divider::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: var(--border-color);
}

.auth-divider::before { left: 0; }
.auth-divider::after { right: 0; }

.auth-error {
    color: var(--error);
    font-size: 12px;
    text-align: center;
    display: none;
}

.auth-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.auth-field label {
    font-size: 12px;
    color: var(--text-muted);
}

.btn-auth-submit {
    background: linear-gradient(135deg, var(--primary-neon), var(--secondary-neon));
    color: #000000;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.btn-auth-submit:hover {
    box-shadow: var(--shadow-glow-cyan);
}

.auth-free-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
    outline: none;
}

.auth-free-btn:hover {
    color: var(--text-muted);
}
`;

fs.writeFileSync(indexHtmlPath, newHtml, 'utf8');
fs.writeFileSync(styleCssPath, newCss, 'utf8');
console.log('Rebuild of index.html and style.css completed successfully!');
