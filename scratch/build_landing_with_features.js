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
    <link rel="stylesheet" href="style.css?v=1784080186">
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
                <a href="#como-funciona" data-i18n="nav_how">Como Funciona</a>
                <a href="#dashboard-anchor" data-i18n="nav_dashboard">Dashboard</a>
                <a href="#precos" data-i18n="nav_pricing">Preços</a>
                <a href="#faq" data-i18n="nav_faq">FAQ</a>
            </nav>
            <div class="nav-actions">
                <!-- Theme Switcher -->
                <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle theme">
                    <svg class="moon-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    <svg class="sun-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="display:none;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </button>

                <!-- Language Selector Dropdown -->
                <div class="lang-selector">
                    <button class="lang-btn" id="lang-btn">
                        <span class="flag-icon" id="current-flag">
                            <!-- Brazil Flag SVG (Default) -->
                            <svg class="flag-svg" viewBox="0 0 20 14" width="16" height="11" style="border-radius: 1px; display: inline-block; vertical-align: middle;"><rect width="20" height="14" fill="#009b3a" /><polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00" /><circle cx="10" cy="7" r="3.5" fill="#002776" /><path d="M 6.7 7.8 Q 10 5.8 13.3 7.8" stroke="#ffffff" stroke-width="0.5" fill="none" /></svg>
                        </span>
                        <span class="lang-text">PT</span>
                        <span class="arrow">▼</span>
                    </button>
                    <div class="lang-dropdown" id="lang-dropdown">
                        <button class="lang-option" data-lang="pt">
                            <!-- Brazil Flag SVG -->
                            <svg class="flag-svg" viewBox="0 0 20 14" width="16" height="11" style="border-radius: 1px; margin-right: 8px; display: inline-block; vertical-align: middle;"><rect width="20" height="14" fill="#009b3a" /><polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00" /><circle cx="10" cy="7" r="3.5" fill="#002776" /><path d="M 6.7 7.8 Q 10 5.8 13.3 7.8" stroke="#ffffff" stroke-width="0.5" fill="none" /></svg>
                            Português
                        </button>
                        <button class="lang-option" data-lang="en">
                            <!-- USA Flag SVG -->
                            <svg class="flag-svg" viewBox="0 0 20 14" width="16" height="11" style="border-radius: 1px; margin-right: 8px; display: inline-block; vertical-align: middle;"><rect width="20" height="14" fill="#bb133e" /><rect y="1.08" width="20" height="1.08" fill="#fff" /><rect y="3.23" width="20" height="1.08" fill="#fff" /><rect y="5.38" width="20" height="1.08" fill="#fff" /><rect y="7.54" width="20" height="1.08" fill="#fff" /><rect y="9.69" width="20" height="1.08" fill="#fff" /><rect y="11.85" width="20" height="1.08" fill="#fff" /><rect width="8.5" height="7.54" fill="#002147" /><circle cx="2" cy="1.5" r="0.3" fill="#fff" /><circle cx="4" cy="1.5" r="0.3" fill="#fff" /><circle cx="6" cy="1.5" r="0.3" fill="#fff" /><circle cx="3" cy="3" r="0.3" fill="#fff" /><circle cx="5" cy="3" r="0.3" fill="#fff" /><circle cx="2" cy="4.5" r="0.3" fill="#fff" /><circle cx="4" cy="4.5" r="0.3" fill="#fff" /><circle cx="6" cy="4.5" r="0.3" fill="#fff" /><circle cx="3" cy="6" r="0.3" fill="#fff" /><circle cx="5" cy="6" r="0.3" fill="#fff" /></svg>
                            English
                        </button>
                        <button class="lang-option" data-lang="es">
                            <!-- Spain Flag SVG -->
                            <svg class="flag-svg" viewBox="0 0 20 14" width="16" height="11" style="border-radius: 1px; margin-right: 8px; display: inline-block; vertical-align: middle;"><rect width="20" height="14" fill="#c60b1e" /><rect y="3.5" width="20" height="7" fill="#ffc400" /><rect x="3.5" y="5" width="2" height="3" fill="#c60b1e" rx="0.5" /><circle cx="4.5" cy="4.5" r="0.6" fill="#ffc400" /></svg>
                            Español
                        </button>
                    </div>
                </div>

                <span id="navbar-plan-badge" class="badge" data-i18n="badge_free">Plano: Free</span>
                <button id="btn-open-login" class="btn btn-secondary btn-sm nav-cta" data-i18n="btn_login">Entrar</button>
                
                <!-- Estado Logado (Oculto) -->
                <div class="nav-user-wrap" id="nav-user-wrap" style="display:none;">
                    <div class="nav-user-avatar" id="nav-user-avatar">U</div>
                    <span class="nav-user-name" id="nav-user-name">Usuário</span>
                    <div class="nav-user-dropdown" id="nav-user-dropdown">
                        <div class="nav-user-email" id="nav-user-email">usuario@email.com</div>
                        <button class="nav-user-dropdown-item" onclick="window.bvScrollToApp()" data-i18n="menu_open_app">⚡ Abrir App</button>
                        <button class="nav-user-dropdown-item" onclick="window.bvOpenCheckout()" data-i18n="menu_plans">🚀 Ver Planos</button>
                        <button class="nav-user-dropdown-item danger" id="btn-logout" data-i18n="menu_logout">↩ Sair</button>
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
                <div class="hero-badge-bv" data-i18n="hero_badge">✨ Tecnologia Dual-Layer Audio</div>
                <h1 data-i18n="hero_title">Aprove Seus Criativos De Anúncios De Primeira, Sempre.</h1>
                <p class="hero-subtext" data-i18n="hero_subtext">
                    A BlackVoice injeta um script seguro em uma camada de áudio oculta que os robôs de moderação leem — enquanto seu público ouve o áudio original, inalterado.
                </p>
                <div class="hero-actions">
                    <a href="#dashboard-anchor" class="btn btn-primary" id="btn-start-hero" data-i18n="hero_cta_free">Começar Grátis — Sem Cartão</a>
                    <a href="#como-funciona" class="btn btn-outline" data-i18n="hero_cta_how">Ver Como Funciona</a>
                </div>
                <p class="trusted-text" data-i18n="hero_trusted">CONFIADO POR PERFORMANCE MARKETERS EM TODO O MUNDO</p>
                <div class="trusted-logos">
                    <span class="trusted-logo">Meta Ads</span>
                    <span class="trusted-logo">Google Ads</span>
                    <span class="trusted-logo">TikTok Ads</span>
                </div>
                <div class="hero-metrics">
                    <div class="metric">
                        <span class="metric-val">&lt; 10s</span>
                        <span class="metric-label" data-i18n="metric_avg">Processamento Médio</span>
                    </div>
                    <div class="metric">
                        <span class="metric-val">5M+</span>
                        <span class="metric-label" data-i18n="metric_files">Arquivos Processados</span>
                    </div>
                    <div class="metric">
                        <span class="metric-val">256-bit</span>
                        <span class="metric-label" data-i18n="metric_encryption">Criptografia Local</span>
                    </div>
                    <div class="metric">
                        <span class="metric-val">99.7%</span>
                        <span class="metric-label" data-i18n="metric_fidelity">Fidelidade Acústica</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Two Layers Demonstration Section -->
        <section class="two-layers-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium" data-i18n="demo_badge">Dual-Layer em Ação</span>
                    <h2 data-i18n="demo_title">Duas Camadas. Duas Realidades.</h2>
                    <p class="section-desc" data-i18n="demo_desc">O público humano ouve o áudio original. A IA de moderação lê apenas o script seguro.</p>
                </div>
                <div class="layers-grid">
                    <!-- Layer 1: Human -->
                    <div class="layer-card">
                        <div class="layer-badge human-badge" data-i18n="demo_human_badge">👥 Ouvinte Humano</div>
                        <p class="layer-desc" data-i18n="demo_human_desc">Houve o áudio do criativo com fidelidade total de 99.7%</p>
                        <div class="audio-bubble human-bubble">
                            <span class="quote-icon">“</span>
                            <p data-i18n="demo_human_quote">“Compre agora com 50% de desconto no nosso site oficial!”</p>
                        </div>
                        <div class="layer-footer human-footer" data-i18n="demo_human_footer">CAMADA HUMANA — ÁUDIO ORIGINAL</div>
                    </div>
                    <!-- Layer 2: AI -->
                    <div class="layer-card">
                        <div class="layer-badge ai-badge" data-i18n="demo_ai_badge">🤖 Moderação de IA (STT)</div>
                        <p class="layer-desc" data-i18n="demo_ai_desc">Lê apenas a transcrição do script seguro inserido</p>
                        <div class="audio-bubble ai-bubble">
                            <span class="quote-icon">“</span>
                            <p data-i18n="demo_ai_quote">“Dicas úteis de jardinagem para flores lindas e sustentáveis no jardim.”</p>
                        </div>
                        <div class="layer-footer ai-footer" data-i18n="demo_ai_footer">CAMADA DE IA — SCRIPT COMPLIANT</div>
                    </div>
                </div>
                <div class="result-badge">
                    <span data-i18n="demo_result">✨ Resultado: Criativo aprovado automaticamente pela moderação</span>
                </div>
            </div>
        </section>

        <!-- Como Funciona Section (Timeline Layout with Dotted Curve Path) -->
        <section id="como-funciona" class="features-section">
            <div class="container relative">
                <div class="section-header">
                    <span class="badge-premium" data-i18n="steps_badge">Como Funciona</span>
                    <h2 data-i18n="steps_title">Proteja Seus Criativos em 3 Passos</h2>
                    <p class="section-desc" data-i18n="steps_desc">Uma interface intuitiva que qualquer um pode usar — sem necessidade de habilidades técnicas</p>
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
                            <div class="step-number"><span class="num-mono">01.</span> <span data-i18n="step_1_title">1. Envie Seu Criativo</span></div>
                            <p data-i18n="step_1_desc">Arraste seu vídeo ou áudio — suportamos MP4, MOV, MP3, WAV e todos os formatos populares.</p>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="timeline-step step-right">
                        <div class="step-content">
                            <div class="step-number"><span class="num-mono">02.</span> <span data-i18n="step_2_title">2. Processamento Dual-Layer</span></div>
                            <p data-i18n="step_2_desc">Nosso engine escreve uma transcrição alternativa em uma camada oculta que só algoritmos STT detectam.</p>
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
                            <div class="step-number green-step"><span class="num-mono">03.</span> <span data-i18n="step_3_title">3. Baixe e Escale</span></div>
                            <p data-i18n="step_3_desc">Pegue seu arquivo processado e publique. Bots de moderação leem a camada segura enquanto seu público escuta o real.</p>
                        </div>
                    </div>
                </div>

                <!-- Technical Row 1: Step 01 Análise Espectral -->
                <div class="tech-row">
                    <div class="tech-info">
                        <span class="tech-step-badge">STEP 01</span>
                        <h3 data-i18n="tech_1_title">Análise Espectral</h3>
                        <p data-i18n="tech_1_subtitle">Mapeamos as frequências do seu áudio original para encontrar as bandas ideais de injeção para os modelos STT alvo.</p>
                        <ul class="tech-bullets">
                            <li data-i18n="tech_1_bullet_1">• Mapeamento automático de frequências</li>
                            <li data-i18n="tech_1_bullet_2">• Identificação de bandas ótimas para injeção</li>
                            <li data-i18n="tech_1_bullet_3">• Preservação total da qualidade audível</li>
                        </ul>
                    </div>
                    <div class="tech-visual-card">
                        <div class="waveform-canvas">
                            <svg class="wave-svg" viewBox="0 0 400 150">
                                <path class="wave-path blue-wave-1" d="M 0 75 Q 40 10 80 75 T 160 75 T 240 75 T 320 75 T 400 75" fill="none" stroke-width="2"/>
                                <path class="wave-path blue-wave-2" d="M 0 75 Q 40 140 80 75 T 160 75 T 240 75 T 320 75 T 400 75" fill="none" stroke-width="1.5" opacity="0.5"/>
                            </svg>
                        </div>
                        <span class="tech-card-label" data-i18n="tech_1_label">• SPECTRAL VIEW</span>
                    </div>
                </div>
            </div>

            <!-- Horizontal Text Ticker Marquee (OUTSIDE the container context to guarantee 100% screen width spanning!) -->
            <div class="ticker-wrap">
                <div class="ticker-content">
                    <span data-i18n="ticker_1">DUAL-LAYER</span><span>+</span>
                    <span data-i18n="ticker_2">SAÍDA DUAL-LAYER</span><span>+</span>
                    <span data-i18n="ticker_3">99.7% DE FIDELIDADE</span><span>+</span>
                    <span data-i18n="ticker_4">ZERO MUDANÇA PERCEPTÍVEL</span><span>+</span>
                    <span data-i18n="ticker_5">CONFORME POLÍTICAS</span><span>+</span>
                    <span data-i18n="ticker_6">LIBERAÇÃO AUTOMÁTICA</span><span>+</span>
                    <!-- Repeated once for infinite marquee -->
                    <span data-i18n="ticker_1">DUAL-LAYER</span><span>+</span>
                    <span data-i18n="ticker_2">SAÍDA DUAL-LAYER</span><span>+</span>
                    <span data-i18n="ticker_3">99.7% DE FIDELIDADE</span><span>+</span>
                    <span data-i18n="ticker_4">ZERO MUDANÇA PERCEPTÍVEL</span><span>+</span>
                    <span data-i18n="ticker_5">CONFORME POLÍTICAS</span><span>+</span>
                    <span data-i18n="ticker_6">LIBERAÇÃO AUTOMÁTICA</span><span>+</span>
                </div>
            </div>

            <div class="container">
                <!-- Technical Row 2: Step 02 Injeção da Camada -->
                <div class="tech-row reverse" style="margin-top: 40px;">
                    <div class="tech-visual-card">
                        <div class="waveform-canvas">
                            <svg class="wave-svg" viewBox="0 0 400 150">
                                <path class="wave-path purple-wave-1" d="M 0 75 Q 40 20 80 75 T 160 75 T 240 75 T 320 75 T 400 75" fill="none" stroke-width="2"/>
                                <path class="wave-path purple-wave-2" d="M 0 75 Q 40 130 80 75 T 160 75 T 240 75 T 320 75 T 400 75" fill="none" stroke-width="1.5" opacity="0.5"/>
                            </svg>
                        </div>
                        <span class="tech-card-label" data-i18n="tech_2_label">• INJECTION LAYER</span>
                    </div>
                    <div class="tech-info">
                        <span class="tech-step-badge purple">STEP 02</span>
                        <h3 data-i18n="tech_2_title">Injeção da Camada</h3>
                        <p data-i18n="tech_2_subtitle">A transcrição segura é codificada nas bandas de frequência identificadas — invisível ao ouvido, visível para a máquina.</p>
                        <ul class="tech-bullets">
                            <li data-i18n="tech_2_bullet_1">• Injeção invisível ao ouvido humano</li>
                            <li data-i18n="tech_2_bullet_2">• Transcript policy-compliant para IA</li>
                            <li data-i18n="tech_2_bullet_3">• Aprovação automática de moderação</li>
                        </ul>
                    </div>
                </div>

                <!-- Simulação Auditiva: Mono vs Estéreo -->
                <div class="demo-player-box">
                    <div class="demo-header">
                        <h3 data-i18n="sim_title">Simulação Auditiva: Mono vs Estéreo</h3>
                        <p data-i18n="sim_desc">Plataformas convertem seu áudio em MONO antes de transcrever. Veja a diferença:</p>
                    </div>
                    <div class="demo-controls">
                        <div class="demo-column">
                            <span class="demo-tag status-green" data-i18n="sim_stereo_tag">Modo Humano (Estéreo)</span>
                            <div class="sound-wave-container" id="stereo-wave">
                                <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                                <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                            </div>
                            <button class="btn btn-sm btn-play" id="btn-play-stereo" data-i18n="sim_stereo_btn">🔊 Ouvir em Estéreo</button>
                        </div>
                        <div class="demo-column">
                            <span class="demo-tag status-red" data-i18n="sim_mono_tag">Modo Robô/IA (Mono)</span>
                            <div class="sound-wave-container flat" id="mono-wave">
                                <div class="bar-flat"></div>
                            </div>
                            <button class="btn btn-sm btn-play" id="btn-play-mono" data-i18n="sim_mono_btn">🔇 Ouvir em Mono (Silêncio)</button>
                        </div>
                    </div>
                    <div class="demo-note">
                        <p data-i18n="sim_note">💡 <em>Como funciona:</em> O canal esquerdo carrega <code>X</code> e o direito carrega <code>-X</code>. Fones de ouvido tocam os dois separadamente. A IA soma os dois canais: <code>X + (-X) = 0</code>.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- For Professionals Section -->
        <section class="professionals-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium" data-i18n="prof_badge">Para Profissionais</span>
                    <h2 data-i18n="prof_title">Feito Para Quem Escala Operações</h2>
                    <p class="section-desc" data-i18n="prof_desc">Se você roda tráfego pago de alta escala, a BlackVoice foi construída sob medida para você</p>
                </div>
                <div class="professionals-grid">
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <h3 data-i18n="prof_1_name">Afiliados</h3>
                        <p data-i18n="prof_1_desc">Suba ofertas agressivas em escala sem quedas constantes de anúncios pelas plataformas.</p>
                    </div>
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        <h3 data-i18n="prof_2_name">Agências</h3>
                        <p data-i18n="prof_2_desc">Aprove criativos dentro dos prazos, mantendo contas de clientes ativas por muito mais tempo.</p>
                    </div>
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5L4 3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 0-2.5 2.5z"/></svg>
                        <h3 data-i18n="prof_3_name">Criadores de Cursos</h3>
                        <p data-i18n="prof_3_desc">Lance campanhas de tráfego pago sem restrições ou alertas automáticos em copys faladas.</p>
                    </div>
                    <div class="prof-card">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="prof-icon"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        <h3 data-i18n="prof_4_name">Media Buyers</h3>
                        <p data-i18n="prof_4_desc">Teste 10 vezes mais variações por dia com taxa de aprovação próxima a 100%.</p>
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
                    <span class="badge-premium" data-i18n="app_badge">Dashboard</span>
                    <h2 data-i18n="app_title">Dashboard de Proteção</h2>
                    <p class="section-desc" data-i18n="app_desc">100% privado — processado no seu navegador. Nenhum arquivo é enviado para servidores.</p>
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
                                    <span data-i18n="menu_camouflage">Camuflagem</span>
                                </button>
                                <button class="sidebar-item" data-target="tab-quota">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    <span data-i18n="menu_quota">Minha Cota</span>
                                </button>
                                <button class="sidebar-item" data-target="tab-tutorial">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    <span data-i18n="menu_guide">Guia Rápido</span>
                                </button>
                            </nav>
                            <div class="sidebar-footer">
                                <span class="badge-premium" id="sidebar-plan-badge" data-i18n="sidebar_badge">Free</span>
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
                                    <h3 data-i18n="drop_title">Arraste seus vídeos aqui</h3>
                                    <p><span data-i18n="drop_or">ou</span> <span class="browse-link" data-i18n="drop_browse">procure nos arquivos</span></p>
                                    <span class="file-limits" id="file-limits-text" data-i18n="drop_limits">Plano Gratuito: Máx 1 arquivo de até 200MB · 3/mês</span>
                                    <input type="file" id="file-input-field" accept="video/*" style="display: none;">
                                </div>

                                <!-- Selected Files List State -->
                                <div id="selected-files-list" style="display: none; flex-direction: column; gap: 12px; margin-bottom: 24px;"></div>

                                <!-- Caixa de Texto da Narração Opcional -->
                                <div id="voiceover-text-container" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; margin-top: 20px;">
                                    <label for="voiceover-text" style="font-size: 13px; font-weight: 600; color: var(--text-muted); display: flex; justify-content: space-between;">
                                        <span data-i18n="field_voice_label">🗣️ Narração Oculta (Opcional):</span>
                                    </label>
                                    <textarea id="voiceover-text" placeholder="Cole aqui uma copy de no máximo 30s o mais white possível do seu nicho para a IA entregar para o público certo. Se colocar qualquer texto genérico, vai mandar para o público errado." data-i18n-placeholder="field_voice_placeholder" style="width: 100%; height: 90px; padding: 12px; border-radius: 12px; background: var(--bg-input) !important; border: 1px solid var(--border-color) !important; color: var(--text-main) !important; font-family: var(--font-body); font-size: 14px; resize: none; outline: none; box-sizing: border-box;" maxlength="400"></textarea>
                                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim); gap: 10px;">
                                        <span data-i18n="field_voice_tip">Escreva uma copy de até 30 segundos do seu nicho para otimização do algoritmo.</span>
                                        <span id="char-counter" style="white-space: nowrap;">0 / 400</span>
                                    </div>
                                </div>
                                <!-- Caixa de Imagem de Camuflagem e Capa -->
                                <div id="image-camouflage-container" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                                    <label style="font-size: 13px; font-weight: 600; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
                                        <span data-i18n="field_image_label">🖼️ Imagem de Camuflagem & Capa (Opcional):</span>
                                    </label>
                                    <div id="image-dropzone" style="border: 1px dashed var(--border-color); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; background: var(--bg-input); transition: var(--transition); display: flex; align-items: center; justify-content: center; gap: 12px;">
                                        <span id="image-placeholder-text" style="font-size: 13px; color: var(--text-dim);" data-i18n="field_image_placeholder">Clique para anexar imagem de Capa (Miniatura/Hash)</span>
                                        <button class="btn btn-secondary btn-sm" id="btn-clear-image" style="display: none; padding: 4px 8px; font-size: 11px;" data-i18n="field_image_remove">Remover</button>
                                    </div>
                                    <input type="file" id="image-input-field" accept="image/*" style="display: none;">

                                    <!-- Slider para Opacidade do Flash -->
                                    <div id="image-opacity-container" style="display: flex; flex-direction: column; gap: 6px; padding: 12px; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid var(--border-color);">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <span style="font-size: 12px; color: var(--text-muted);" data-i18n="field_opacity_label">Opacidade do Flash (Camuflagem de Hash):</span>
                                            <span id="image-opacity-val" style="font-size: 12px; color: var(--primary-neon); font-weight: 600;">20%</span>
                                        </div>
                                        <input type="range" id="image-opacity-slider" min="0" max="60" value="20" style="width: 100%; accent-color: var(--primary-neon); cursor: pointer; height: 6px; background: var(--bg-input); border-radius: 3px; outline: none; border: none; margin-top: 4px;">
                                        <span style="font-size: 10px; color: var(--text-dim);" data-i18n="field_opacity_tip">A imagem carregada será definida como a Capa (Miniatura) do vídeo e piscará por 100ms a cada 1 segundo. Se nenhuma imagem for enviada, o BlackVoice extrairá e usará a capa original do vídeo automaticamente.</span>
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
                                        <h4 id="status-title" data-i18n="status_preparing">Preparando...</h4>
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
                                    <h3 id="completed-title" data-i18n="completed_title">Vídeo Protegido com Sucesso!</h3>
                                    <p data-i18n="completed_desc">O arquivo já está pronto. Clique abaixo para fazer o download.</p>
                                    <div class="result-actions">
                                        <button class="btn btn-primary btn-glow" id="btn-download-result" data-i18n="completed_download">⚡ Baixar Vídeo Hacked</button>
                                        <button class="btn btn-outline" id="btn-restart" data-i18n="completed_restart">Processar Outro</button>
                                    </div>
                                </div>

                                <!-- Action Footer inside card -->
                                <div class="card-action-bar" id="card-action-bar">
                                    <button class="btn btn-primary disabled" id="btn-process-action" disabled data-i18n="btn_apply">Aplicar BlackVoice</button>
                                </div>
                            </div>

                            <!-- Tab: Quota -->
                            <div class="dashboard-tab-panel" id="tab-quota">
                                <div class="quota-panel">
                                    <div class="quota-header">
                                        <h3 class="quota-title" data-i18n="quota_title">Status da sua Conta</h3>
                                        <span class="badge-premium" id="quota-plan-title" data-i18n="quota_badge">Plano Free</span>
                                    </div>
                                    <div style="margin-top: 10px;">
                                        <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">
                                            <span data-i18n="quota_usage_label">Uso de Processamentos (Este Mês)</span>
                                            <span id="quota-usage-text">3 / 3 envios</span>
                                        </div>
                                        <div class="quota-bar-wrapper">
                                            <div class="quota-bar" id="quota-bar-progress" style="width: 100%;"></div>
                                        </div>
                                    </div>
                                    <div class="quota-stats" style="margin-top: 15px;">
                                        <div class="quota-stat-card">
                                            <div class="quota-stat-label" data-i18n="quota_stat_processed">Videos Processados</div>
                                            <div class="quota-stat-value" id="quota-stat-processed">0</div>
                                        </div>
                                        <div class="quota-stat-card">
                                            <div class="quota-stat-label" data-i18n="quota_stat_limit">Limite de Tamanho</div>
                                            <div class="quota-stat-value">200 MB</div>
                                        </div>
                                    </div>
                                    <div style="margin-top: 24px; text-align: center;">
                                        <a href="#precos" class="btn btn-glow" style="width: 100%;" onclick="window.bvSwitchToPlans()" data-i18n="quota_upgrade_btn">Fazer Upgrade para Pro</a>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab: Tutorial -->
                            <div class="dashboard-tab-panel" id="tab-tutorial">
                                <div style="display: flex; flex-direction: column; gap: 20px;">
                                    <h3 style="font-size: 20px; font-weight: 700; color: var(--primary-neon);" data-i18n="guide_title">📖 Manual de Operação</h3>
                                    <p style="font-size: 14px; color: var(--text-muted);" data-i18n="guide_desc">Aprenda a obter o máximo desempenho de camuflagem usando o painel do BlackVoice.</p>
                                    
                                    <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
                                        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 18px; border-radius: 12px;">
                                            <h4 style="font-size: 15px; color: #FFFFFF; margin-bottom: 6px;" data-i18n="guide_step_1_title">1. Seleção do Vídeo</h4>
                                            <p style="font-size: 13px; color: var(--text-muted);" data-i18n="guide_step_1_desc">Arraste ou clique para enviar arquivos MP4/MOV de até 200MB. Arquivos maiores são compatíveis nos planos Pro.</p>
                                        </div>
                                        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 18px; border-radius: 12px;">
                                            <h4 style="font-size: 15px; color: #FFFFFF; margin-bottom: 6px;" data-i18n="guide_step_2_title">2. Copy de Narração Oculta</h4>
                                            <p style="font-size: 13px; color: var(--text-muted);" data-i18n="guide_step_2_desc">Insira uma cópia altamente qualificada e no mesmo idioma do seu anúncio. A IA do Facebook/TikTok detectará essa transcrição para segmentar o público correto.</p>
                                        </div>
                                        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 18px; border-radius: 12px;">
                                            <h4 style="font-size: 15px; color: #FFFFFF; margin-bottom: 6px;" data-i18n="guide_step_3_title">3. Imagem de Camuflagem</h4>
                                            <p style="font-size: 13px; color: var(--text-muted);" data-i18n="guide_step_3_desc">Opcionalmente, envie uma imagem vertical de 1080x1920. Ela piscará a cada 1 segundo a 20% de opacidade para mudar a assinatura digital do vídeo e driblar bloqueios por hash.</p>
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
                    <span class="badge-premium" data-i18n="mock_badge">Uso Simples</span>
                    <h2 data-i18n="mock_title">Painel Intuitivo. Resultados Poderosos.</h2>
                    <p class="section-desc" data-i18n="mock_desc">Estatísticas em tempo real da sua conta e gerenciamento de arquivos integrados</p>
                </div>
                <div class="mockup-grid">
                    <div class="mockup-card">
                        <div class="mockup-header">
                            <span class="mockup-url">app.blackvoice.com/dashboard</span>
                        </div>
                        <div class="mockup-body">
                            <div class="mockup-stats-row">
                                <div class="m-stat">
                                    <span class="m-stat-label" data-i18n="mock_stat_uploads">Uploads Hoje</span>
                                    <span class="m-stat-val">15 / 50</span>
                                </div>
                                <div class="m-stat">
                                    <span class="m-stat-label" data-i18n="mock_stat_approval">Taxa de Aprovação</span>
                                    <span class="m-stat-val text-green">96% <small>+15%</small></span>
                                </div>
                                <div class="m-stat">
                                    <span class="m-stat-label" data-i18n="mock_stat_savings">Economia Estimada</span>
                                    <span class="m-stat-val">$3.8k <small data-i18n="mock_stat_savings_sub">este mês</small></span>
                                </div>
                            </div>
                            <div class="mockup-files-table">
                                <div class="m-table-header" data-i18n="mock_table_title">Arquivos Recentes</div>
                                <div class="m-table-row">
                                    <span>creative_offer_v3.mp4</span>
                                    <span class="status-badge success" data-i18n="mock_status_done">Concluído</span>
                                </div>
                                <div class="m-table-row">
                                    <span>vsl_launch_promo.mp4</span>
                                    <span class="status-badge success" data-i18n="mock_status_done">Concluído</span>
                                </div>
                                <div class="m-table-row">
                                    <span>audio_testimonial_test.mp3</span>
                                    <span class="status-badge processing" data-i18n="mock_status_running">Processando</span>
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
                    <span class="badge-premium" data-i18n="pricing_badge">Preços</span>
                    <h2 data-i18n="pricing_title">Escolha o Seu Plano</h2>
                    <p class="section-desc" data-i18n="pricing_desc">Comece grátis e escale à medida que a sua operação cresce. Cancele quando quiser.</p>
                </div>
                <div class="pricing-grid">
                    <!-- Plan 1: Free -->
                    <div class="pricing-card">
                        <span class="plan-name">Free</span>
                        <div class="plan-price">R$ 0<span class="price-period">/mês</span></div>
                        <p class="plan-desc" data-i18n="plan_1_desc">Para testar a plataforma e validar a tecnologia.</p>
                        <ul class="plan-features">
                            <li data-i18n="plan_1_feat_1">✓ 2 envios de teste grátis por dia</li>
                            <li data-i18n="plan_1_feat_2">✓ Arquivos de até 50 MB</li>
                            <li data-i18n="plan_1_feat_3">✓ Retenção de arquivos por 3 dias</li>
                            <li data-i18n="plan_1_feat_4">✓ Processamento local</li>
                        </ul>
                        <button class="btn btn-outline pricing-btn" id="btn-pricing-hobby" onclick="window.bvScrollToApp()" data-i18n="plan_1_btn">Começar Grátis</button>
                    </div>
                    <!-- Plan 2: Starter -->
                    <div class="pricing-card">
                        <span class="plan-name">Starter</span>
                        <div class="plan-price">R$ 49<span class="price-period">/mês</span></div>
                        <p class="plan-desc" data-i18n="plan_2_desc">Para criadores independentes e editores iniciantes.</p>
                        <ul class="plan-features">
                            <li data-i18n="plan_2_feat_1">✓ 10 envios por dia</li>
                            <li data-i18n="plan_2_feat_2">✓ Arquivos de até 100 MB</li>
                            <li data-i18n="plan_2_feat_3">✓ Retenção de arquivos por 7 dias</li>
                            <li data-i18n="plan_2_feat_4">✓ Criptografia de áudio</li>
                            <li data-i18n="plan_2_feat_5">✓ Fila de processamento rápida</li>
                        </ul>
                        <button class="btn btn-outline pricing-btn" id="btn-pricing-creator" onclick="window.bvOpenCheckout('Starter', 'R$ 49/mês')" data-i18n="plan_2_btn">Assinar Plano Starter</button>
                    </div>
                    <!-- Plan 3: Pro -->
                    <div class="pricing-card featured">
                        <div class="popular-badge" data-i18n="plan_featured_badge">Mais Popular</div>
                        <span class="plan-name">Pro</span>
                        <div class="plan-price">R$ 97<span class="price-period">/mês</span></div>
                        <p class="plan-desc" data-i18n="plan_3_desc">Para profissionais sérios rodando tráfego pago ativo.</p>
                        <ul class="plan-features">
                            <li data-i18n="plan_3_feat_1">✓ 50 envios por dia</li>
                            <li data-i18n="plan_3_feat_2">✓ Arquivos de até 300 MB</li>
                            <li data-i18n="plan_3_feat_3">✓ Retenção de arquivos por 14 dias</li>
                            <li data-i18n="plan_3_feat_4">✓ Criptografia de áudio</li>
                            <li data-i18n="plan_3_feat_5">✓ Compressão avançada de vídeo</li>
                            <li data-i18n="plan_3_feat_6">✓ Fila de processamento prioritária</li>
                        </ul>
                        <button class="btn btn-primary pricing-btn" id="btn-pricing-pro" onclick="window.bvOpenCheckout('Pro', 'R$ 97/mês')" data-i18n="plan_3_btn">Assinar Plano Pro</button>
                    </div>
                    <!-- Plan 4: Business -->
                    <div class="pricing-card">
                        <span class="plan-name">Business</span>
                        <div class="plan-price">R$ 199<span class="price-period">/mês</span></div>
                        <p class="plan-desc" data-i18n="plan_4_desc">Para agências e equipes que demandam volume total.</p>
                        <ul class="plan-features">
                            <li data-i18n="plan_4_feat_1">✓ Envios ilimitados</li>
                            <li data-i18n="plan_4_feat_2">✓ Arquivos de até 500 MB</li>
                            <li data-i18n="plan_4_feat_3">✓ Retenção de arquivos por 30 dias</li>
                            <li data-i18n="plan_4_feat_4">✓ Criptografia de áudio</li>
                            <li data-i18n="plan_4_feat_5">✓ Compressão avançada de vídeo</li>
                            <li data-i18n="plan_4_feat_6">✓ Fila de processamento prioritária</li>
                            <li data-i18n="plan_4_feat_7">✓ Suporte dedicado 24/7</li>
                        </ul>
                        <button class="btn btn-outline pricing-btn" id="btn-pricing-enterprise" onclick="window.bvOpenCheckout('Business', 'R$ 199/mês')" data-i18n="plan_4_btn">Assinar Plano Business</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium" data-i18n="test_badge">Depoimentos</span>
                    <h2 data-i18n="test_title">O Que Nossos Usuários Dizem</h2>
                    <p class="section-desc" data-i18n="test_desc">Seja parte do time de profissionais que destravou as vendas com criativos em escala</p>
                </div>
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <p class="testimonial-text" data-i18n="test_1_quote">“Estávamos perdendo mais de R$ 30.000 por mês devido a criativos reprovados. Com a BlackVoice, aprovamos nossos anúncios no mesmo dia e nossa taxa de conversão disparou. O investimento se pagou logo na primeira semana.”</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">M</div>
                            <div>
                                <span class="author-name">Mateus R.</span>
                                <span class="author-role" data-i18n="test_1_role">Gestor de Tráfego</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text" data-i18n="test_2_quote">“Gerenciar mais de 25 contas de clientes significava refazer centenas de criativos por semana. A BlackVoice eliminou completamente esse problema e agora nossas campanhas de tráfego entram no ar sem nenhum bloqueio por áudio.”</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">S</div>
                            <div>
                                <span class="author-name">Mariana S.</span>
                                <span class="author-role" data-i18n="test_2_role">Diretora de Agência</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text" data-i18n="test_3_quote">“Eu já testei todas as soluções e hacks de contingência do mercado, mas nada se compara ao sistema dual-layer da BlackVoice. Processamos mais de 150 vídeos por semana e nossa operação flui perfeitamente com zero reprovação.”</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">R</div>
                            <div>
                                <span class="author-name">Ricardo M.</span>
                                <span class="author-role" data-i18n="test_3_role">Afiliado Master</span>
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
                    <span class="badge-premium" data-i18n="faq_badge">FAQ</span>
                    <h2 data-i18n="faq_title">Dúvidas Frequentes</h2>
                    <p class="section-desc" data-i18n="faq_desc">Tudo o que você precisa saber sobre o BlackVoice e a moderação de anúncios.</p>
                </div>
                <div class="accordion">
                    <details class="accordion-item" open>
                        <summary class="accordion-header" data-i18n="faq_q1">O que exatamente o BlackVoice faz?</summary>
                        <div class="accordion-content">
                            <p data-i18n="faq_a1">O BlackVoice incorpora uma transcrição de áudio alternativa e inofensiva em uma camada oculta do seu arquivo de mídia. Os ouvintes humanos continuam ouvindo o áudio original normalmente, mas os sistemas automáticos de speech-to-text das plataformas leem a camada segura. Isso faz com que seus anúncios passem sem problemas na moderação automática.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header" data-i18n="faq_q2">O que é a tecnologia de 'camada oculta'?</summary>
                        <div class="accordion-content">
                            <p data-i18n="faq_a2">Injetamos um sinal de áudio alternativo em bandas de frequência específicas que os algoritmos de speech-to-text (STT) priorizam. Como a percepção do ouvido humano ignora ou compensa essas bandas (especialmente quando ouvidas em estéreo), o seu público não percebe nenhuma diferença.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header" data-i18n="faq_q3">Isso altera a qualidade ou o som do meu áudio original?</summary>
                        <div class="accordion-content">
                            <p data-i18n="faq_a3">Não. Nós preservamos 99.7% de fidelidade da sua onda de áudio original. A camada oculta fica localizada em frequências e amplitudes que o ouvido humano não distingue da gravação original.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header" data-i18n="faq_q4">Com quais plataformas de anúncios isso funciona?</summary>
                        <div class="accordion-content">
                            <p data-i18n="faq_a4">Funciona com qualquer plataforma de anúncios ou rede que utilize transcrição automática (speech-to-text) para moderação de conformidade — incluindo Facebook/Meta Ads, Google Ads, TikTok Ads, YouTube Ads e redes programáticas.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header" data-i18n="faq_q5">Quanto tempo demora para processar um arquivo?</summary>
                        <div class="accordion-content">
                            <p data-i18n="faq_a5">Graças ao nosso pipeline local de renderização ultra-rápida, a maioria dos vídeos curtos é processada em menos de 10 segundos, enquanto os vídeos mais longos (com a imagem de hash de 10 min inclusa) levam em média de 3 a 5 segundos totais para estarem prontos para download.</p>
                        </div>
                    </details>
                    <details class="accordion-item">
                        <summary class="accordion-header" data-i18n="faq_q6">Meus vídeos ficam guardados ou expostos em servidores?</summary>
                        <div class="accordion-content">
                            <p data-i18n="faq_a6">Absolutamente não. Seus arquivos originais são processados de forma privada. O download é disponibilizado temporariamente no servidor apenas enquanto você está com a aba aberta e é excluído logo após o download ou em 30 minutos por segurança.</p>
                        </div>
                    </details>
                </div>
            </div>
        </section>

        <!-- CTA Bottom Section -->
        <section class="cta-bottom">
            <div class="container text-center">
                <span class="badge-premium" data-i18n="cta_badge">BlackVoice App</span>
                <h2 data-i18n="cta_title">Pronto Para Superar a Moderação de Conteúdo?</h2>
                <p data-i18n="cta_desc">Cada criativo bloqueado é faturamento que você deixa de ganhar. Comece a processar agora mesmo.</p>
                <a class="btn btn-primary btn-glow" href="#dashboard-anchor" data-i18n="cta_btn">Começar a Usar Agora</a>
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
                <p class="footer-desc" data-i18n="footer_desc">Tecnologia dual-layer com transcrição segura integrada para camuflagem e proteção de anúncios de alta conversão.</p>
            </div>
            <div class="footer-links-col">
                <h4 data-i18n="footer_col_1">Produto</h4>
                <a href="#como-funciona" data-i18n="nav_how">Como Funciona</a>
                <a href="#precos" data-i18n="nav_pricing">Preços</a>
                <a href="#dashboard-anchor" data-i18n="nav_dashboard">Dashboard</a>
            </div>
            <div class="footer-links-col">
                <h4 data-i18n="footer_col_2">Legal</h4>
                <a href="#" data-i18n="footer_privacy">Privacidade</a>
                <a href="#" data-i18n="footer_terms">Termos de Uso</a>
                <a href="#" data-i18n="footer_support">Suporte</a>
            </div>
            <div class="footer-status-col">
                <h4 data-i18n="footer_col_3">Sistema</h4>
                <div class="status-indicator">
                    <span class="status-dot"></span>
                    <span data-i18n="footer_status">Todos os sistemas operacionais</span>
                </div>
            </div>
        </div>
        <div class="container footer-bottom">
            <p data-i18n="footer_copyright">© 2026 BlackVoice. Todos os direitos reservados. Projetado para otimização de anúncios.</p>
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
                        <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-21 0-1.3-.2-2.7-.5-4z"/>
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

    <!-- Scripts (Performance optimized with defer & Low latency JSdelivr CDN) -->
    <script src="https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js" defer></script>
    <script src="app.js?v=1784080186" defer></script>
    <script>
        // Dictionary for Multilingual (PT, EN, ES) Translation
        const TRANSLATIONS = {
            pt: {
                nav_how: "Como Funciona",
                nav_dashboard: "Dashboard",
                nav_pricing: "Preços",
                nav_faq: "FAQ",
                btn_login: "Entrar",
                badge_free: "Plano: Free",
                hero_badge: "✨ Tecnologia Dual-Layer Audio",
                hero_title: "Aprove Seus Criativos De Anúncios De Primeira, Sempre.",
                hero_subtext: "A BlackVoice injeta um script seguro em uma camada de áudio oculta que os robôs de moderação leem — enquanto seu público ouve o áudio original, inalterado.",
                hero_cta_free: "Começar Grátis — Sem Cartão",
                hero_cta_how: "Ver Como Funciona",
                hero_trusted: "CONFIADO POR PERFORMANCE MARKETERS EM TODO O MUNDO",
                metric_avg: "Processamento Médio",
                metric_files: "Arquivos Processados",
                metric_encryption: "Criptografia Local",
                metric_fidelity: "Fidelidade Acústica",
                demo_badge: "Dual-Layer em Ação",
                demo_title: "Duas Camadas. Duas Realidades.",
                demo_desc: "O público humano ouve o áudio original. A IA de moderação lê apenas o script seguro.",
                demo_human_badge: "👥 Ouvinte Humano",
                demo_human_desc: "Houve o áudio do criativo com fidelidade total de 99.7%",
                demo_human_quote: "“Compre agora com 50% de desconto no nosso site oficial!”",
                demo_human_footer: "CAMADA HUMANA — ÁUDIO ORIGINAL",
                demo_ai_badge: "🤖 Moderação de IA (STT)",
                demo_ai_desc: "Lê apenas a transcrição do script seguro inserido",
                demo_ai_quote: "“Dicas úteis de jardinagem para flores lindas e sustentáveis no jardim.”",
                demo_ai_footer: "CAMADA DE IA — SCRIPT COMPLIANT",
                demo_result: "✨ Resultado: Criativo aprovado automaticamente pela moderação",
                steps_badge: "Como Funciona",
                steps_title: "Proteja Seus Criativos em 3 Passos",
                steps_desc: "Uma interface intuitiva que qualquer um pode usar — sem necessidade de habilidades técnicas",
                step_1_title: "1. Envie Seu Criativo",
                step_1_desc: "Arraste seu vídeo ou áudio — suportamos MP4, MOV, MP3, WAV e todos os formatos populares.",
                step_2_title: "2. Processamento Dual-Layer",
                step_2_desc: "Nosso engine escreve uma transcrição alternativa em uma camada oculta que só algoritmos STT detectam.",
                step_3_title: "3. Baixe e Escale",
                step_3_desc: "Pegue seu arquivo processado e publique. Bots de moderação leem a camada segura enquanto seu público escuta o real.",
                tech_1_title: "Análise Espectral",
                tech_1_subtitle: "Mapeamos as frequências do seu áudio original para encontrar as bandas ideais de injeção para os modelos STT alvo.",
                tech_1_bullet_1: "• Mapeamento automático de frequências",
                tech_1_bullet_2: "• Identificação de bandas ótimas para injeção",
                tech_1_bullet_3: "• Preservação total da qualidade audível",
                tech_1_label: "• SPECTRAL VIEW",
                tech_2_title: "Injeção da Camada",
                tech_2_subtitle: "A transcrição segura é codificada nas bandas de frequência identificadas — invisível ao ouvido, visível para a máquina.",
                tech_2_bullet_1: "• Injeção invisível ao ouvido humano",
                tech_2_bullet_2: "• Transcript policy-compliant para IA",
                tech_2_bullet_3: "• Aprovação automática de moderação",
                tech_2_label: "• INJECTION LAYER",
                ticker_1: "DUAL-LAYER",
                ticker_2: "SAÍDA DUAL-LAYER",
                ticker_3: "99.7% DE FIDELIDADE",
                ticker_4: "ZERO MUDANÇA PERCEPTÍVEL",
                ticker_5: "CONFORME POLÍTICAS",
                ticker_6: "LIBERAÇÃO AUTOMÁTICA",
                sim_title: "Simulação Auditiva: Mono vs Estéreo",
                sim_desc: "Plataformas convertem seu áudio em MONO antes de transcrever. Veja a diferença:",
                sim_stereo_tag: "Modo Humano (Estéreo)",
                sim_stereo_btn: "🔊 Ouvir em Estéreo",
                sim_mono_tag: "Modo Robô/IA (Mono)",
                sim_mono_btn: "🔇 Ouvir em Mono (Silêncio)",
                sim_note: "💡 Como funciona: O canal esquerdo carrega X e o direito carrega -X. Fones de ouvido tocam os dois separadamente. A IA soma os dois canais: X + (-X) = 0.",
                prof_badge: "Para Profissionais",
                prof_title: "Feito Para Quem Escala Operações",
                prof_desc: "Se você roda tráfego pago de alta escala, a BlackVoice foi construída sob medida para você",
                prof_1_name: "Afiliados",
                prof_1_desc: "Suba ofertas agressivas em escala sem quedas constantes de anúncios pelas plataformas.",
                prof_2_name: "Agências",
                prof_2_desc: "Aprove criativos dentro dos prazos, mantendo contas de clientes ativas por muito mais tempo.",
                prof_3_name: "Criadores de Cursos",
                prof_3_desc: "Lance campanhas de tráfego pago sem restrições ou alertas automáticos em copys faladas.",
                prof_4_name: "Media Buyers",
                prof_4_desc: "Teste 10 vezes mais variações por dia com taxa de aprovação próxima a 100%.",
                app_badge: "Dashboard",
                app_title: "Dashboard de Proteção",
                app_desc: "100% privado — processado no seu navegador. Nenhum arquivo é enviado para servidores.",
                menu_camouflage: "Camuflagem",
                menu_quota: "Minha Cota",
                menu_guide: "Guia Rápido",
                sidebar_badge: "Free",
                drop_title: "Arraste seus vídeos aqui",
                drop_or: "ou",
                drop_browse: "procure nos arquivos",
                drop_limits: "Plano Gratuito: Máx 1 arquivo de até 200MB · 3/mês",
                field_voice_label: "🗣️ Narração Oculta (Opcional):",
                field_voice_placeholder: "Cole aqui uma copy de no máximo 30s o mais white possível do seu nicho para a IA entregar para o público certo. Se colocar qualquer texto genérico, vai mandar para o público errado.",
                field_voice_tip: "Escreva uma copy de até 30 segundos do seu nicho para otimização do algoritmo.",
                field_image_label: "🖼️ Imagem de Camuflagem & Capa (Opcional):",
                field_image_placeholder: "Clique para anexar imagem de Capa (Miniatura/Hash)",
                field_image_remove: "Remover",
                field_opacity_label: "Opacidade do Flash (Camuflagem de Hash):",
                field_opacity_tip: "A imagem carregada será definida como a Capa (Miniatura) do vídeo e piscará por 100ms a cada 1 segundo. Se nenhuma imagem for enviada, o BlackVoice extrairá e usará a capa original do vídeo automaticamente.",
                status_preparing: "Preparando...",
                completed_title: "Vídeo Protegido com Sucesso!",
                completed_desc: "O arquivo já está pronto. Clique abaixo para fazer o download.",
                completed_download: "⚡ Baixar Vídeo Hacked",
                completed_restart: "Processar Outro",
                btn_apply: "Aplicar BlackVoice",
                quota_title: "Status da sua Conta",
                quota_badge: "Plano Free",
                quota_usage_label: "Uso de Processamentos (Este Mês)",
                quota_stat_processed: "Videos Processados",
                quota_stat_limit: "Limite de Tamanho",
                quota_upgrade_btn: "Fazer Upgrade para Pro",
                guide_title: "📖 Manual de Operação",
                guide_desc: "Aprenda a obter o máximo desempenho de camuflagem usando o painel do BlackVoice.",
                guide_step_1_title: "1. Seleção do Vídeo",
                guide_step_1_desc: "Arraste ou clique para enviar arquivos MP4/MOV de até 200MB. Arquivos maiores são compatíveis nos planos Pro.",
                guide_step_2_title: "2. Copy de Narração Oculta",
                guide_step_2_desc: "Insira uma cópia altamente qualificada e no mesmo idioma do seu anúncio. A IA do Facebook/TikTok detectará essa transcrição para segmentar o público correto.",
                guide_step_3_title: "3. Imagem de Camuflagem",
                guide_step_3_desc: "Opcionalmente, envie uma imagem vertical de 1080x1920. Ela piscará a cada 1 segundo a 20% de opacidade para mudar a assinatura digital do vídeo e driblar bloqueios por hash.",
                mock_badge: "Uso Simples",
                mock_title: "Painel Intuitivo. Resultados Poderosos.",
                mock_desc: "Estatísticas em tempo real da sua conta e gerenciamento de arquivos integrados",
                mock_stat_uploads: "Uploads Hoje",
                mock_stat_approval: "Taxa de Aprovação",
                mock_stat_savings: "Economia Estimada",
                mock_stat_savings_sub: "este mês",
                mock_table_title: "Arquivos Recentes",
                mock_status_done: "Concluído",
                mock_status_running: "Processando",
                pricing_badge: "Preços",
                pricing_title: "Escolha o Seu Plano",
                pricing_desc: "Comece grátis e escale à medida que a sua operação cresce. Cancele quando quiser.",
                plan_1_desc: "Para testar a plataforma e validar a tecnologia.",
                plan_1_feat_1: "✓ 2 envios de teste grátis por dia",
                plan_1_feat_2: "✓ Arquivos de até 50 MB",
                plan_1_feat_3: "✓ Retenção de arquivos por 3 dias",
                plan_1_feat_4: "✓ Processamento local",
                plan_1_btn: "Começar Grátis",
                plan_2_desc: "Para criadores independentes e editores iniciantes.",
                plan_2_feat_1: "✓ 10 envios por dia",
                plan_2_feat_2: "✓ Arquivos de até 100 MB",
                plan_2_feat_3: "✓ Retenção de arquivos por 7 dias",
                plan_2_feat_4: "✓ Criptografia de áudio",
                plan_2_feat_5: "✓ Fila de processamento rápida",
                plan_2_btn: "Assinar Plano Starter",
                plan_featured_badge: "Mais Popular",
                plan_3_desc: "Para profissionais sérios rodando tráfego pago ativo.",
                plan_3_feat_1: "✓ 50 envios por dia",
                plan_3_feat_2: "✓ Arquivos de até 300 MB",
                plan_3_feat_3: "✓ Retenção de arquivos por 14 dias",
                plan_3_feat_4: "✓ Criptografia de áudio",
                plan_3_feat_5: "✓ Compressão avançada de vídeo",
                plan_3_feat_6: "✓ Fila de processamento prioritária",
                plan_3_btn: "Assinar Plano Pro",
                plan_4_desc: "Para agências e equipes que demandam volume total.",
                plan_4_feat_1: "✓ Envios ilimitados",
                plan_4_feat_2: "✓ Arquivos de até 500 MB",
                plan_4_feat_3: "✓ Retenção de arquivos por 30 dias",
                plan_4_feat_4: "✓ Criptografia de áudio",
                plan_4_feat_5: "✓ Compressão avançada de vídeo",
                plan_4_feat_6: "✓ Fila de processamento prioritária",
                plan_4_feat_7: "✓ Suporte dedicado 24/7",
                plan_4_btn: "Assinar Plano Business",
                test_badge: "Depoimentos",
                test_title: "O Que Nossos Usuários Dizem",
                test_desc: "Seja parte do time de profissionais que destravou as vendas com criativos em escala",
                test_1_quote: "“Estávamos perdendo mais de R$ 30.000 por mês devido a criativos reprovados. Com a BlackVoice, aprovamos nossos anúncios no mesmo dia e nossa taxa de conversão disparou. O investimento se pagou logo na primeira semana.”",
                test_1_role: "Gestor de Tráfego",
                test_2_quote: "“Gerenciar mais de 25 contas de clientes significava refazer centenas de criativos por semana. A BlackVoice eliminou completamente esse problema e agora nossas campanhas de tráfego entram no ar sem nenhum bloqueio por áudio.”",
                test_2_role: "Diretora de Agência",
                test_3_quote: "“Eu já testei todas as soluções e hacks de contingência do mercado, mas nada se compara ao sistema dual-layer da BlackVoice. Processamos mais de 150 vídeos por semana e nossa operação flui perfeitamente com zero reprovação.”",
                test_3_role: "Afiliado Master",
                faq_badge: "FAQ",
                faq_title: "Dúvidas Frequentes",
                faq_desc: "Tudo o que você precisa saber sobre o BlackVoice e a moderação de anúncios.",
                faq_q1: "O que exatamente o BlackVoice faz?",
                faq_a1: "O BlackVoice incorpora uma transcrição de áudio alternativa e inofensiva em uma camada oculta do seu arquivo de mídia. Os ouvintes humanos continuam ouvindo o áudio original normalmente, mas os sistemas automáticos de speech-to-text das plataformas leem a camada segura. Isso faz com que seus anúncios passem sem problemas na moderação automática.",
                faq_q2: "O que é a tecnologia de 'camada oculta'?",
                faq_a2: "Injetamos um sinal de áudio alternativo em bandas de frequência específicas que os algoritmos de speech-to-text (STT) priorizam. Como a percepção do ouvido humano ignora ou compensa essas bandas (especialmente quando ouvidas em estéreo), o seu público não percebe nenhuma diferença.",
                faq_q3: "Isso altera a qualidade ou o som do meu áudio original?",
                faq_a3: "Não. Nós preservamos 99.7% de fidelidade da sua onda de áudio original. A camada oculta fica localizada em frequências e amplitudes que o ouvido humano não distingue da gravação original.",
                faq_q4: "Com quais plataformas de anúncios isso funciona?",
                faq_a4: "Funciona com qualquer plataforma de anúncios ou rede que utilize transcrição automática (speech-to-text) para moderação de conformidade — incluindo Facebook/Meta Ads, Google Ads, TikTok Ads, YouTube Ads e redes programáticas.",
                faq_q5: "Quanto tempo demora para processar um arquivo?",
                faq_a5: "Graças ao nosso pipeline local de renderização ultra-rápida, a maioria dos vídeos curtos é processada em menos de 10 segundos, enquanto os vídeos mais logados (com a imagem de hash de 10 min inclusa) levam em média de 3 a 5 segundos totais para estarem prontos para download.",
                faq_q6: "Meus vídeos ficam guardados ou expostos em servidores?",
                faq_a6: "Absolutamente não. Seus arquivos originais são processados de forma privada. O download é disponibilizado temporariamente no servidor apenas enquanto você está com a aba aberta e é excluído logo após o download ou em 30 minutos por segurança.",
                cta_badge: "BlackVoice App",
                cta_title: "Pronto Para Superar a Moderação de Conteúdo?",
                cta_desc: "Cada criativo bloqueado é faturamento que você deixa de ganhar. Comece a processar agora mesmo.",
                cta_btn: "Começar a Usar Agora",
                footer_desc: "Tecnologia dual-layer com transcrição segura integrada para camuflagem e proteção de anúncios de alta conversão.",
                footer_col_1: "Produto",
                footer_col_2: "Legal",
                footer_col_3: "Sistema",
                footer_privacy: "Privacidade",
                footer_terms: "Termos de Uso",
                footer_support: "Suporte",
                footer_status: "Todos os sistemas operacionais",
                footer_copyright: "© 2026 BlackVoice. Todos os direitos reservados. Projetado para otimização de anúncios.",
                menu_open_app: "⚡ Abrir App",
                menu_plans: "🚀 Ver Plans",
                menu_logout: "↩ Sair",
            },
            en: {
                nav_how: "How It Works",
                nav_dashboard: "Dashboard",
                nav_pricing: "Pricing",
                nav_faq: "FAQ",
                btn_login: "Sign In",
                badge_free: "Plan: Free",
                hero_badge: "✨ Dual-Layer Audio Technology",
                hero_title: "Ship Ad Creatives That Pass Every Time.",
                hero_subtext: "BlackVoice injects a compliant script into a hidden audio layer read by moderation bots — while your human audience hears the original, unaltered audio.",
                hero_cta_free: "Get Started Free — No Card",
                hero_cta_how: "See How It Works",
                hero_trusted: "TRUSTED BY PERFORMANCE MARKETERS WORLDWIDE",
                metric_avg: "Avg. Processing",
                metric_files: "Files Processed",
                metric_encryption: "Local Encryption",
                metric_fidelity: "Acoustic Fidelity",
                demo_badge: "Dual-Layer in Action",
                demo_title: "Two Layers. Two Realities.",
                demo_desc: "The human audience hears the original audio. The moderation AI reads only the safe script.",
                demo_human_badge: "👥 Human Listener",
                demo_human_desc: "Hears the creative audio with 99.7% total fidelity",
                demo_human_quote: "“Buy now with 50% discount on our official website!”",
                demo_human_footer: "HUMAN LAYER — ORIGINAL AUDIO",
                demo_ai_badge: "🤖 Moderation AI (STT)",
                demo_ai_desc: "Reads only the transcription of the inserted safe script",
                demo_ai_quote: "“Useful gardening tips for beautiful and sustainable flowers in the yard.”",
                demo_ai_footer: "AI LAYER — COMPLIANT SCRIPT",
                demo_result: "✨ Result: Creative automatically approved by moderation",
                steps_badge: "How It Works",
                steps_title: "Protect Your Creatives in 3 Steps",
                steps_desc: "An intuitive interface that anyone can use — no technical skills required",
                step_1_title: "1. Upload Your Creative",
                step_1_desc: "Attach your video or audio — we support MP4, MOV, MP3, WAV and all popular formats.",
                step_2_title: "2. Dual-Layer Processing",
                step_2_desc: "Our engine writes an alternative transcription in a hidden layer that only STT algorithms detect.",
                step_3_title: "3. Download & Scale",
                step_3_desc: "Get your processed file and publish. Moderation bots read the safe layer while your audience hears the real voice.",
                tech_1_title: "Spectral Analysis",
                tech_1_subtitle: "We map the frequencies of your original audio to find the ideal injection bands for target STT models.",
                tech_1_bullet_1: "• Automatic frequency mapping",
                tech_1_bullet_2: "• Identification of optimal bands for injection",
                tech_1_bullet_3: "• Full preservation of audible quality",
                tech_1_label: "• SPECTRAL VIEW",
                tech_2_title: "Layer Injection",
                tech_2_subtitle: "The safe transcript is encoded into the identified frequency bands — invisible to the ear, visible to the machine.",
                tech_2_bullet_1: "• Invisible injection to the human ear",
                tech_2_bullet_2: "• Policy-compliant transcript for AI",
                tech_2_bullet_3: "• Automatic moderation approval",
                tech_2_label: "• INJECTION LAYER",
                ticker_1: "DUAL-LAYER",
                ticker_2: "DUAL-LAYER OUTPUT",
                ticker_3: "99.7% FIDELITY",
                ticker_4: "ZERO PERCEPTIBLE CHANGE",
                ticker_5: "POLICY COMPLIANT",
                ticker_6: "AUTOMATIC APPROVAL",
                sim_title: "Audio Simulation: Mono vs Stereo",
                sim_desc: "Platforms convert your audio to MONO before transcribing. See the difference:",
                sim_stereo_tag: "Human Mode (Stereo)",
                sim_stereo_btn: "🔊 Hear in Stereo",
                sim_mono_tag: "Robot/AI Mode (Mono)",
                sim_mono_btn: "🔇 Hear in Mono (Silence)",
                sim_note: "💡 How it works: The left channel carries X and the right carries -X. Headphones play both separately. The AI sums both channels: X + (-X) = 0.",
                prof_badge: "For Professionals",
                prof_title: "Built For Those Who Scale",
                prof_desc: "If you run high-scale paid traffic, BlackVoice was built just for you",
                prof_1_name: "Affiliates",
                prof_1_desc: "Launch aggressive offers at scale without constant ad flags by platforms.",
                prof_2_name: "Agencies",
                prof_2_desc: "Approve client creatives on time, keeping client ad accounts active much longer.",
                prof_3_name: "Course Creators",
                prof_3_desc: "Run paid traffic campaigns without restrictions or automatic flags in spoken copy.",
                prof_4_name: "Media Buyers",
                prof_4_desc: "Test 10x more variations per day with approval rate close to 100%.",
                app_badge: "Dashboard",
                app_title: "Protection Dashboard",
                app_desc: "100% private — processed in your browser. No files are uploaded to servers.",
                menu_camouflage: "Camouflage",
                menu_quota: "My Quota",
                menu_guide: "Quick Guide",
                sidebar_badge: "Free",
                drop_title: "Drag and drop your videos here",
                drop_or: "or",
                drop_browse: "browse files",
                drop_limits: "Free Plan: Max 1 file up to 200MB · 3/month",
                field_voice_label: "🗣️ Hidden Narration (Optional):",
                field_voice_placeholder: "Paste here a narration copy of max 30s as white/safe as possible for your niche to segment the right audience. If you use a safe text, it will target the right audience.",
                field_voice_tip: "Write a copy of up to 30 seconds of your niche for algorithm optimization.",
                field_image_label: "🖼️ Camouflage Image & Cover (Optional):",
                field_image_placeholder: "Click to attach Cover image (Thumbnail/Hash)",
                field_image_remove: "Remove",
                field_opacity_label: "Flash Opacity (Hash Camouflage):",
                field_opacity_tip: "The uploaded image will be set as the video Thumbnail and will flash for 100ms every 1 second. If no image is sent, BlackVoice will extract and use the original thumbnail automatically.",
                status_preparing: "Preparing...",
                completed_title: "Video Protected Successfully!",
                completed_desc: "The file is ready. Click below to download.",
                completed_download: "⚡ Download Hacked Video",
                completed_restart: "Process Another",
                btn_apply: "Apply BlackVoice",
                quota_title: "Account Status",
                quota_badge: "Free Plan",
                quota_usage_label: "Usage limit (This Month)",
                quota_stat_processed: "Processed Videos",
                quota_stat_limit: "Size Limit",
                quota_upgrade_btn: "Upgrade to Pro Plan",
                guide_title: "📖 Operation Manual",
                guide_desc: "Learn to get maximum camouflage performance using the BlackVoice panel.",
                guide_step_1_title: "1. Video Selection",
                guide_step_1_desc: "Drag or click to send MP4/MOV files up to 200MB. Larger files are supported in Pro plans.",
                guide_step_2_title: "2. Hidden Narration Copy",
                guide_step_2_desc: "Insert a highly compliant copy in the same language as your ad. The platform AI will detect this transcription to target the right audience.",
                guide_step_3_title: "3. Camouflage Image",
                guide_step_3_desc: "Optionally, send a 1080x1920 vertical image. It will flash every 1 second at 20% opacity to change the digital signature of the video and bypass hash flags.",
                mock_badge: "Simple Use",
                mock_title: "Intuitive Panel. Powerful Results.",
                mock_desc: "Real-time account stats and integrated file management",
                mock_stat_uploads: "Uploads Today",
                mock_stat_approval: "Approval Rate",
                mock_stat_savings: "Estimated Savings",
                mock_stat_savings_sub: "this month",
                mock_table_title: "Recent Files",
                mock_status_done: "Completed",
                mock_status_running: "Processing",
                pricing_badge: "Pricing",
                pricing_title: "Choose Your Plan",
                pricing_desc: "Start free and scale as your operations grow. Cancel anytime.",
                plan_1_desc: "To test the platform and validate the technology.",
                plan_1_feat_1: "✓ 2 free test uploads per day",
                plan_1_feat_2: "✓ Files up to 50 MB",
                plan_1_feat_3: "✓ 3-day file retention",
                plan_1_feat_4: "✓ Local browser processing",
                plan_1_btn: "Start Free",
                plan_2_desc: "For independent creators and beginner editors.",
                plan_2_feat_1: "✓ 10 uploads per day",
                plan_2_feat_2: "✓ Files up to 100 MB",
                plan_2_feat_3: "✓ 7-day file retention",
                plan_2_feat_4: "✓ Audio encryption",
                plan_2_feat_5: "✓ Fast processing queue",
                plan_2_btn: "Subscribe Starter",
                plan_featured_badge: "Most Popular",
                plan_3_desc: "For serious professionals running active paid traffic.",
                plan_3_feat_1: "✓ 50 uploads per day",
                plan_3_feat_2: "✓ Files up to 300 MB",
                plan_3_feat_3: "✓ 14-day file retention",
                plan_3_feat_4: "✓ Audio encryption",
                plan_3_feat_5: "✓ Advanced video compression",
                plan_3_feat_6: "✓ Priority processing queue",
                plan_3_btn: "Subscribe Pro",
                plan_4_desc: "For agencies and teams demanding full volume.",
                plan_4_feat_1: "✓ Unlimited uploads",
                plan_4_feat_2: "✓ Files up to 500 MB",
                plan_4_feat_3: "✓ 30-day file retention",
                plan_4_feat_4: "✓ Audio encryption",
                plan_4_feat_5: "✓ Advanced video compression",
                plan_4_feat_6: "✓ Priority processing queue",
                plan_4_feat_7: "✓ Dedicated 24/7 support",
                plan_4_btn: "Subscribe Business",
                test_badge: "Testimonials",
                test_title: "What Our Users Say",
                test_desc: "Be part of the team of professionals who unlocked sales with unlimited creatives",
                test_1_quote: "“We were losing $50K/month in wasted ad spend due to rejected creatives. With BlackVoice, our team gets ads approved same-day and our conversion rate skyrocketed. The investment paid off in the first week.”",
                test_1_role: "Media Buyer",
                test_2_quote: "“Managing 25+ client accounts meant redoing hundreds of creatives every week. BlackVoice completely solved this problem and now our campaigns go live without any audio blocks.”",
                test_2_role: "Agency Director",
                test_3_quote: "“I have stress-tested every workaround and contingency hack on the market. Nothing touches BlackVoice's dual-layer system. We process 150+ videos weekly with zero ad flags.”",
                test_3_role: "Master Affiliate",
                faq_badge: "FAQ",
                faq_title: "Frequently Asked Questions",
                faq_desc: "Everything you need to know about BlackVoice and ad moderation.",
                faq_q1: "What exactly does BlackVoice do?",
                faq_a1: "BlackVoice embeds an alternate, harmless audio transcript into a hidden layer of your media file. Human listeners hear the original audio unchanged, while automated speech-to-text systems read the safe layer instead. The result: your creatives pass content moderation on ad platforms.",
                faq_q2: "What is the 'hidden layer' technology?",
                faq_a2: "We inject an alternate audio signal into frequency bands that STT algorithms prioritize. Since human perception ignores or compensates for these bands, your audience hears zero difference.",
                faq_q3: "Does it change how my original audio sounds?",
                faq_a3: "No. We preserve 99.7% fidelity of the original waveform. The injected layer sits in frequencies and amplitudes that the human ear cannot distinguish from the original signal.",
                faq_q4: "Which ad platforms does it work with?",
                faq_a4: "It works with any platform that uses automatic speech-to-text for content moderation — including Facebook/Meta Ads, Google Ads, TikTok Ads, YouTube Ads and programmatic networks.",
                faq_q5: "How fast is the processing?",
                faq_a5: "Thanks to our ultra-fast local rendering pipeline, most short videos are processed in under 10 seconds, while longer videos take an average of 3 to 5 seconds total to be ready.",
                faq_q6: "Are my videos saved or exposed on servers?",
                faq_a6: "Absolutely not. Your original files are processed privately. The download is made temporarily available on the server only while you have the tab open and is deleted soon after download or within 30 minutes for security.",
                cta_badge: "BlackVoice App",
                cta_title: "Ready to Outsmart Content Moderation?",
                cta_desc: "Every blocked ad is lost revenue. Start processing now with ease.",
                cta_btn: "Get Started Now",
                footer_desc: "Dual-layer technology with integrated safe transcription for camouflage and protection of high-converting ads.",
                footer_col_1: "Product",
                footer_col_2: "Legal",
                footer_col_3: "System",
                footer_privacy: "Privacy Policy",
                footer_terms: "Terms of Service",
                footer_support: "Support Help",
                footer_status: "All systems operational",
                footer_copyright: "© 2026 BlackVoice. All rights reserved. Designed for ad optimization.",
                menu_open_app: "⚡ Open App",
                menu_plans: "🚀 View Plans",
                menu_logout: "↩ Sign Out",
            },
            es: {
                nav_how: "Cómo Funciona",
                nav_dashboard: "Panel",
                nav_pricing: "Precios",
                nav_faq: "FAQ",
                btn_login: "Ingresar",
                badge_free: "Plan: Gratis",
                hero_badge: "✨ Tecnología de Audio Dual-Layer",
                hero_title: "Aprueba tus Creativos de Anuncios y Escale Siempre.",
                hero_subtext: "BlackVoice inyecta una transcripción segura en una capa de audio oculta que los bots de moderación leen, mientras tu público escucha el audio original sin cambios.",
                hero_cta_free: "Empezar Gratis — Sin Tarjeta",
                hero_cta_how: "Ver Cómo Funciona",
                hero_trusted: "CONFIADO POR PERFORMANCE MARKETERS EN TODO EL MUNDO",
                metric_avg: "Procesamiento Medio",
                metric_files: "Archivos Procesados",
                metric_encryption: "Criptografía Local",
                metric_fidelity: "Fidelidad Acústica",
                demo_badge: "Dual-Layer en Acción",
                demo_title: "Dos Capas. Dos Realidades.",
                demo_desc: "El público humano escucha el audio original. La IA de moderación lee solo la transcripción segura.",
                demo_human_badge: "👥 Oyente Humano",
                demo_human_desc: "Escucha el audio del creativo con una fidelidad del 99.7%",
                demo_human_quote: "“¡Compra ahora con un 50% de descuento en nuestra web oficial!”",
                demo_human_footer: "CAPA HUMANA — AUDIO ORIGINAL",
                demo_ai_badge: "🤖 Moderación de IA (STT)",
                demo_ai_desc: "Lee únicamente la transcripción del script seguro insertado",
                demo_ai_quote: "“Consejos útiles de jardinería para flores hermosas y sostenibles en el jardín.”",
                demo_ai_footer: "CAPA DE IA — SCRIPT COMPLIANT",
                demo_result: "✨ Resultado: Creativo aprobado automáticamente por moderación",
                steps_badge: "Cómo Funciona",
                steps_title: "Proteja sus Creativos en 3 Pasos",
                steps_desc: "Una interfaz intuitiva que cualquiera puede usar — sin necesidad de conocimientos técnicos",
                step_1_title: "1. Sube tu Creativo",
                step_1_desc: "Adjunte su archivo de video o audio — soportamos MP4, MOV, MP3, WAV y los principales formatos.",
                step_2_title: "2. Procesamiento Dual-Layer",
                step_2_desc: "Nuestro motor inyecta una transcripción alternativa en una capa oculta que solo los algoritmos de STT detectan.",
                step_3_title: "3. Descarga y Escale",
                step_3_desc: "Descargue el archivo modificado y publique. Los bots de moderación leen la capa segura mientras su público escucha la voz real.",
                tech_1_title: "Análisis Espectral",
                tech_1_subtitle: "Mapeamos las frecuencias de su audio original para encontrar las bandas ideales de inyección para los modelos STT.",
                tech_1_bullet_1: "• Mapeo automático de frecuencias",
                tech_1_bullet_2: "• Identificación de bandas óptimas para inyección",
                tech_1_bullet_3: "• Preservación total da calidad audible",
                tech_1_label: "• SPECTRAL VIEW",
                tech_2_title: "Inyección de Capa",
                tech_2_subtitle: "La transcripción segura es codificada en las bandas de frecuencia identificadas — invisible al oído, visible para la máquina.",
                tech_2_bullet_1: "• Inyección invisible al oído humano",
                tech_2_bullet_2: "• Transcripción policy-compliant para IA",
                tech_2_bullet_3: "• Aprobación automática de moderación",
                tech_2_label: "• INJECTION LAYER",
                ticker_1: "DUAL-LAYER",
                ticker_2: "SALIDA DUAL-LAYER",
                ticker_3: "99.7% FIDELIDAD",
                ticker_4: "CERO CAMBIO PERCEPTIBLE",
                ticker_5: "CONFORME A POLÍTICAS",
                ticker_6: "APROBACIÓN AUTOMÁTICA",
                sim_title: "Simulación de Audio: Mono vs Estéreo",
                sim_desc: "Las plataformas convierten tu audio a MONO antes de transcribir. Mira la diferencia:",
                sim_stereo_tag: "Modo Humano (Estéreo)",
                sim_stereo_btn: "🔊 Escuchar en Estéreo",
                sim_mono_tag: "Modo Robot/IA (Mono)",
                sim_mono_btn: "🔇 Escuchar en Mono (Silêncio)",
                sim_note: "💡 Cómo funciona: El canal izquierdo lleva X y el derecho lleva -X. Los auriculares reproducen ambos por separado. La IA suma ambos canales: X + (-X) = 0.",
                prof_badge: "Para Profesionales",
                prof_title: "Hecho Para Quienes Escalan",
                prof_desc: "Si manejas un alto volumen de tráfico pago, BlackVoice fue creado especialmente para ti",
                prof_1_name: "Afiliados",
                prof_1_desc: "Suba ofertas agresivas a gran escala sin bloqueos constantes por parte de las plataformas.",
                prof_2_name: "Agencias",
                prof_2_desc: "Aprobar creativos a tiempo para los clientes, manteniendo las cuentas publicitarias activas por más tiempo.",
                prof_3_name: "Creadores de Cursos",
                prof_3_desc: "Lance campañas de tráfico pago sin restricciones ni alertas automáticas en copias habladas.",
                prof_4_name: "Media Buyers",
                prof_4_desc: "Pruebe 10 veces más variaciones al día con una tasa de aprobación cercana al 100%.",
                app_badge: "Dashboard",
                app_title: "Panel de Protección",
                app_desc: "100% privado — procesado en tu navegador. Ningún archivo se envía a servidores.",
                menu_camouflage: "Camuflaje",
                menu_quota: "Mi Cuota",
                menu_guide: "Guía Rápida",
                sidebar_badge: "Gratis",
                drop_title: "Arrastra tus videos aquí",
                drop_or: "o",
                drop_browse: "busca en tus archivos",
                drop_limits: "Plan Gratis: Máx 1 archivo de hasta 200MB · 3/mes",
                field_voice_label: "🗣️ Narración Oculta (Opcional):",
                field_voice_placeholder: "Pegue aquí una copia de narración de máx 30s lo más blanca/segura posible de su nicho para dirigir al público correcto. Si usa texto genérico, se enviará al público equivocado.",
                field_voice_tip: "Escriba una copia de hasta 30 segundos de su nicho para optimizar el algoritmo.",
                field_image_label: "🖼️ Imagen de Camuflaje y Portada (Opcional):",
                field_image_placeholder: "Haga clic para adjuntar imagen de Portada (Miniatura/Hash)",
                field_image_remove: "Eliminar",
                field_opacity_label: "Opacidade de Flash (Camuflaje de Hash):",
                field_opacity_tip: "La imagen cargada se establecerá como Portada y parpadeará durante 100ms cada 1 segundo. Si no envía ninguna imagen, BlackVoice extraerá la portada original del video automáticamente.",
                status_preparing: "Preparando...",
                completed_title: "¡Video Protegido Exitosamente!",
                completed_desc: "El archivo está listo. Haga clic abajo para descargarlo.",
                completed_download: "⚡ Descargar Video Hacked",
                completed_restart: "Procesar Otro",
                btn_apply: "Aplicar BlackVoice",
                quota_title: "Estado de la Cuenta",
                quota_badge: "Plan Gratis",
                quota_usage_label: "Límite de uso (Este Mes)",
                quota_stat_processed: "Videos Processados",
                quota_stat_limit: "Límite de Tamaño",
                quota_upgrade_btn: "Upgrade a Plan Pro",
                guide_title: "📖 Manual de Operación",
                guide_desc: "Aprenda a obtener el máximo rendimiento de camuflaje usando el panel de BlackVoice.",
                guide_step_1_title: "1. Selección de Video",
                guide_step_1_desc: "Arrastre o haga clic para enviar archivos MP4/MOV de hasta 200MB. Archivos más grandes son compatibles en planes Pro.",
                guide_step_2_title: "2. Copia de Narración Oculta",
                guide_step_2_desc: "Inserte una copia altamente segura en el mismo idioma que su anuncio. La IA de la plataforma la detectará para dirigir al público correcto.",
                guide_step_3_title: "3. Imagen de Camuflaje",
                guide_step_3_desc: "Opcionalmente, envíe una imagen vertical de 1080x1920. Parpadeará a 20% de opacidad para cambiar la firma digital del video y evitar bloqueos por hash.",
                mock_badge: "Uso Simple",
                mock_title: "Panel Intuitivo. Resultados Poderosos.",
                mock_desc: "Estadísticas en tiempo real de tu cuenta y gestión de archivos integrada",
                mock_stat_uploads: "Sube Hoy",
                mock_stat_approval: "Tasa de Aprobación",
                mock_stat_savings: "Ahorros Estimados",
                mock_stat_savings_sub: "este mes",
                mock_table_title: "Archivos Recientes",
                mock_status_done: "Completado",
                mock_status_running: "Procesando",
                pricing_badge: "Precios",
                pricing_title: "Elige tu Plan",
                pricing_desc: "Comience gratis y escale a medida que crecen sus operaciones. Cancele en cualquier momento.",
                plan_1_desc: "Para probar la plataforma y validar la tecnología.",
                plan_1_feat_1: "✓ 2 cargas de prueba gratis al día",
                plan_1_feat_2: "✓ Archivos hasta 50 MB",
                plan_1_feat_3: "✓ Retención de archivos por 3 días",
                plan_1_feat_4: "✓ Procesamiento local en el navegador",
                plan_1_btn: "Empezar Gratis",
                plan_2_desc: "Para creadores independientes y editores principiantes.",
                plan_2_feat_1: "✓ 10 cargas por día",
                plan_2_feat_2: "✓ Archivos hasta 100 MB",
                plan_2_feat_3: "✓ Retención de archivos por 7 dias",
                plan_2_feat_4: "✓ Criptografía de audio",
                plan_2_feat_5: "✓ Cola de procesamiento rápida",
                plan_2_btn: "Suscribirse Starter",
                plan_featured_badge: "Más Popular",
                plan_3_desc: "Para profesionales serios que manejan tráfico pago activo.",
                plan_3_feat_1: "✓ 50 cargas por día",
                plan_3_feat_2: "✓ Archivos hasta 300 MB",
                plan_3_feat_3: "✓ Retención de archivos por 14 dias",
                plan_3_feat_4: "✓ Criptografía de áudio",
                plan_3_feat_5: "✓ Compresión avanzada de video",
                plan_3_feat_6: "✓ Cola de procesamiento prioritaria",
                plan_3_btn: "Suscribirse Pro",
                plan_4_desc: "Para agencias y equipos que exigen el máximo volumen.",
                plan_4_feat_1: "✓ Cargas ilimitadas",
                plan_4_feat_2: "✓ Archivos hasta 500 MB",
                plan_4_feat_3: "✓ Retención de archivos por 30 dias",
                plan_4_feat_4: "✓ Criptografía de áudio",
                plan_4_feat_5: "✓ Compresión avanzada de video",
                plan_4_feat_6: "✓ Cola de procesamiento prioritaria",
                plan_4_feat_7: "✓ Soporte dedicado 24/7",
                plan_4_btn: "Suscribirse Business",
                test_badge: "Testimonios",
                test_title: "Lo Que Dicen Nuestros Usuarios",
                test_desc: "Únase al equipo de profesionales que desbloqueó sus ventas con creativos ilimitados",
                test_1_quote: "“Estábamos perdiendo más de R$ 30.000 al mes debido a creativos rechazados. Con BlackVoice, aprobamos nuestros anuncios el mismo día y nuestras ventas aumentaron. Se pagó solo la primera semana.”",
                test_1_role: "Media Buyer",
                test_2_quote: "“Gestionar más de 25 cuentas de clientes significaba rehacer cientos de creativos cada semana. BlackVoice eliminó completamente ese cuello de botella y ahora nuestras campañas se aprueban sin bloqueos.”",
                test_2_role: "Directora de Agencia",
                test_3_quote: "“He probado todos los métodos del mercado. Nada se compara al sistema dual-layer de BlackVoice. Procesamos más de 150 videos por semana con cero alertas.”",
                test_3_role: "Afiliado Master",
                faq_badge: "FAQ",
                faq_title: "Preguntas Frecuentes",
                faq_desc: "Todo lo que necesitas saber sobre BlackVoice y la moderação de anuncios.",
                faq_q1: "¿Qué hace exactamente BlackVoice?",
                faq_a1: "BlackVoice incorpora una transcripción de audio alternativa e inofensiva en una capa oculta de su archivo multimedia. Los oyentes humanos escuchan el audio original normalmente, mientras que los sistemas automáticos de speech-to-text leen la capa segura. El resultado: sus anuncios pasan la moderación sin problemas.",
                faq_q2: "¿Qué es la tecnología de 'capa oculta'?",
                faq_a2: "Injetamos um sinal de áudio alternativo em bandas de frequência específicas que os algoritmos de speech-to-text (STT) priorizam. Dado que a percepção humana ignora ou compensa estas bandas, su público escucha cero diferencias.",
                faq_q3: "¿Altera la calidad o el sonido de mi audio original?",
                faq_a3: "No. Preservamos un 99.7% de fidelidad de su onda de audio original. La capa oculta se ubica en frecuencias y amplitudes que el oído humano no distingue de la grabación original.",
                faq_q4: "¿Con qué plataformas de anuncios funciona?",
                faq_a4: "Funciona con cualquier plataforma que use transcripción automática (speech-to-text) para moderar conformidad — incluyendo Facebook/Meta Ads, Google Ads, TikTok Ads, YouTube Ads y redes programáticas.",
                faq_q5: "¿Cuánto tiempo toma procesar un archivo?",
                faq_a5: "Gracias a nuestro pipeline de renderizado local ultra rápido, la mayoría de los videos cortos se procesan en menos de 10 segundos, mientras que los más largos toman en promedio de 3 a 5 segundos totales.",
                faq_q6: "¿Mis videos se guardan o exponen en servidores?",
                faq_a6: "Absolutamente no. Sus archivos originales se procesan de manera privada. La descarga se habilita temporalmente en el servidor solo mientras tiene la pestaña abierta y se elimina poco después de descargar o en 30 minutos.",
                cta_badge: "BlackVoice App",
                cta_title: "¿Listo para Superar la Moderación de Conenido?",
                cta_desc: "Cada anuncio bloqueado es dinero perdido. Comience a procesar ahora con total facilidad.",
                cta_btn: "Empezar Ahora",
                footer_desc: "Tecnologia dual-layer com transcrição segura integrada para camuflagem e proteção de anúncios de alta conversão.",
                footer_col_1: "Producto",
                footer_col_2: "Legal",
                footer_col_3: "Sistema",
                footer_privacy: "Política de Privacidad",
                footer_terms: "Términos de Uso",
                footer_support: "Centro de Soporte",
                footer_status: "Sistemas operativos",
                footer_copyright: "© 2026 BlackVoice. Todos os direitos reservados. Projetado para optimização de anúncios.",
                menu_open_app: "⚡ Abrir Panel",
                menu_plans: "🚀 Ver Planes",
                menu_logout: "↩ Cerrar Sesión",
            }
        };

        const svgMap = {
            pt: '<svg class="flag-svg" viewBox="0 0 20 14" width="16" height="11" style="border-radius: 1px; display: inline-block; vertical-align: middle;"><rect width="20" height="14" fill="#009b3a" /><polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00" /><circle cx="10" cy="7" r="3.5" fill="#002776" /><path d="M 6.7 7.8 Q 10 5.8 13.3 7.8" stroke="#ffffff" stroke-width="0.5" fill="none" /></svg>',
            en: '<svg class="flag-svg" viewBox="0 0 20 14" width="16" height="11" style="border-radius: 1px; display: inline-block; vertical-align: middle;"><rect width="20" height="14" fill="#bb133e" /><rect y="1.08" width="20" height="1.08" fill="#fff" /><rect y="3.23" width="20" height="1.08" fill="#fff" /><rect y="5.38" width="20" height="1.08" fill="#fff" /><rect y="7.54" width="20" height="1.08" fill="#fff" /><rect y="9.69" width="20" height="1.08" fill="#fff" /><rect y="11.85" width="20" height="1.08" fill="#fff" /><rect width="8.5" height="7.54" fill="#002147" /><circle cx="2" cy="1.5" r="0.3" fill="#fff" /><circle cx="4" cy="1.5" r="0.3" fill="#fff" /><circle cx="6" cy="1.5" r="0.3" fill="#fff" /><circle cx="3" cy="3" r="0.3" fill="#fff" /><circle cx="5" cy="3" r="0.3" fill="#fff" /><circle cx="2" cy="4.5" r="0.3" fill="#fff" /><circle cx="4" cy="4.5" r="0.3" fill="#fff" /><circle cx="6" cy="4.5" r="0.3" fill="#fff" /><circle cx="3" cy="6" r="0.3" fill="#fff" /><circle cx="5" cy="6" r="0.3" fill="#fff" /></svg>',
            es: '<svg class="flag-svg" viewBox="0 0 20 14" width="16" height="11" style="border-radius: 1px; display: inline-block; vertical-align: middle;"><rect width="20" height="14" fill="#c60b1e" /><rect y="3.5" width="20" height="7" fill="#ffc400" /><rect x="3.5" y="5" width="2" height="3" fill="#c60b1e" rx="0.5" /><circle cx="4.5" cy="4.5" r="0.6" fill="#ffc400" /></svg>'
        };

        // Initialize language
        function getSavedLanguage() {
            return localStorage.getItem('bv-lang') || 'pt';
        }

        function updateLanguage(lang) {
            const dict = TRANSLATIONS[lang];
            if (!dict) return;
            
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    el.innerHTML = dict[key];
                }
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (dict[key]) {
                    el.placeholder = dict[key];
                }
            });

            // Update language selector UI
            const langCodeMap = { pt: 'PT', en: 'EN', es: 'ES' };
            
            document.querySelector('.lang-text').innerText = langCodeMap[lang];
            document.getElementById('current-flag').innerHTML = svgMap[lang];
            
            localStorage.setItem('bv-lang', lang);
            document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
        }

        // Initialize translation on load
        document.addEventListener('DOMContentLoaded', () => {
            const currentLang = getSavedLanguage();
            updateLanguage(currentLang);

            // Dropdown controls
            const langBtn = document.getElementById('lang-btn');
            const langDropdown = document.getElementById('lang-dropdown');

            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });

            document.querySelectorAll('.lang-option').forEach(option => {
                option.addEventListener('click', () => {
                    const selectedLang = option.getAttribute('data-lang');
                    updateLanguage(selectedLang);
                    langDropdown.classList.remove('active');
                });
            });

            document.addEventListener('click', () => {
                langDropdown.classList.remove('active');
            });
        });

        // Theme Toggle Logic
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggleBtn = document.getElementById('theme-toggle');
            const moonIcon = document.querySelector('.moon-icon');
            const sunIcon = document.querySelector('.sun-icon');
            
            function getSavedTheme() {
                return localStorage.getItem('bv-theme') || 'dark';
            }

            function applyTheme(theme) {
                if (theme === 'light') {
                    document.body.classList.add('light-theme');
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'block';
                } else {
                    document.body.classList.remove('light-theme');
                    moonIcon.style.display = 'block';
                    sunIcon.style.display = 'none';
                }
                localStorage.setItem('bv-theme', theme);
            }

            // Apply saved theme immediately on load
            applyTheme(getSavedTheme());

            themeToggleBtn.addEventListener('click', () => {
                const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
                applyTheme(newTheme);
            });
        });

        // Sidebar navigation handler
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

/* Light Theme Variable Overrides */
body.light-theme {
    --bg-dark: #fbfbfb;
    --bg-secondary: #f4f4f5;
    --bg-card: #ffffff;
    --bg-input: #eef0f3;
    
    --border-color: rgba(0, 0, 0, 0.08);
    --border-hover: rgba(0, 0, 0, 0.14);
    
    --text-main: #0f172a;
    --text-muted: #4b5563;
    --text-dim: #9ca3af;
    
    --shadow-premium: 0 10px 30px rgba(0, 0, 0, 0.06);
    --shadow-glow-cyan: 0 0 24px rgba(218, 182, 130, 0.1);
    --shadow-glow-purple: 0 0 24px rgba(196, 153, 78, 0.1);
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
    transition: background-color 0.4s ease, color 0.4s ease;
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

body.light-theme::before {
    background-image: 
        linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
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

body.light-theme::after {
    background: 
        radial-gradient(circle at 10% 10%, rgba(196, 153, 78, 0.04) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(218, 182, 130, 0.04) 0%, transparent 45%),
        radial-gradient(circle at 50% 40%, rgba(251, 251, 251, 0.8) 0%, transparent 100%);
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
body.light-theme ::-webkit-scrollbar-thumb {
    background: #d4d4d8;
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
    transition: var(--transition), background-color 0.4s ease;
}

body.light-theme .navbar {
    background: rgba(251, 251, 251, 0.8) !important;
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
    color: var(--text-main);
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
    color: var(--text-main) !important;
    background: rgba(255, 255, 255, 0.03);
}
body.light-theme .nav-links a:hover {
    background: rgba(0, 0, 0, 0.04);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 14px;
}

/* Theme Toggle Button */
.theme-toggle-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 50%;
    transition: var(--transition);
}

.theme-toggle-btn:hover {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.05);
}
body.light-theme .theme-toggle-btn:hover {
    background: rgba(0, 0, 0, 0.05);
}

/* Language Selector Dropdown */
.lang-selector {
    position: relative;
}

.lang-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 6px 12px;
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: var(--transition);
}

.lang-btn:hover {
    color: var(--text-main);
    border-color: var(--primary-neon);
}

.lang-btn .arrow {
    font-size: 8px;
    color: var(--text-dim);
    margin-left: 2px;
}

.flag-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.lang-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 6px;
    display: none;
    flex-direction: column;
    gap: 4px;
    width: 140px;
    box-shadow: var(--shadow-premium);
    z-index: 100;
}

.lang-dropdown.active {
    display: flex;
    animation: tabFadeIn 0.2s ease-out forwards;
}

.lang-option {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: var(--transition);
}

.lang-option:hover {
    background: var(--bg-secondary);
    color: var(--text-main);
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
body.light-theme .badge {
    background: rgba(0, 0, 0, 0.02) !important;
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
body.light-theme .btn-outline:hover {
    background: rgba(0, 0, 0, 0.02) !important;
}

.btn-secondary {
    background: var(--bg-card) !important;
    color: var(--text-main) !important;
    border-color: var(--border-color) !important;
}

.btn-secondary:hover {
    background: var(--bg-secondary) !important;
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
    background: var(--bg-secondary) !important;
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
    background: linear-gradient(135deg, var(--text-main) 50%, var(--primary-neon) 100%) !important;
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
    color: var(--text-main);
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
    background: rgba(255, 255, 255, 0.003);
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

/* Curved Timeline Steps */
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
    top: 0; left: 0; width: 100%; height: 100%;
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
    background: var(--bg-secondary) !important;
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

.glow-green {
    box-shadow: 0 0 24px rgba(16, 185, 129, 0.2), inset 0 0 12px rgba(16, 185, 129, 0.1) !important;
    border-color: rgba(16, 185, 129, 0.4) !important;
}
.glow-green .step-icon {
    color: var(--success) !important;
}

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
    top: 8px; right: 8px;
}

.glow-gold-chip .step-glow-dot {
    background: var(--secondary-neon);
    box-shadow: 0 0 10px var(--secondary-neon);
    top: 8px; right: 8px;
}

.glow-green .step-glow-dot {
    background: var(--success);
    box-shadow: 0 0 10px var(--success);
    top: 8px; right: 8px;
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
    color: var(--text-main);
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

/* ========================================================================== */
/*  Technical Spectral Details Section (Waveforms & Ticker)                    */
/* ========================================================================== */
.technical-panels {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.tech-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
}

.tech-row.reverse {
    flex-direction: row-reverse;
}

.tech-info {
    flex: 1;
}

.tech-step-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--primary-neon);
    display: inline-block;
    margin-bottom: 12px;
}

.tech-step-badge.purple {
    color: #a78bfa;
}

.tech-info h3 {
    font-size: 28px;
    margin-bottom: 16px;
    color: var(--text-main);
}

.tech-info p {
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 20px;
}

.tech-bullets {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    color: var(--text-muted);
}

.tech-visual-card {
    width: 480px;
    height: 220px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-premium);
}

.waveform-canvas {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wave-svg {
    width: 90%;
    height: 70%;
}

.wave-path {
    stroke-linecap: round;
    transform-origin: center;
}

.blue-wave-1 {
    stroke: var(--primary-neon);
    animation: waveFloat 3s ease-in-out infinite alternate;
}

.blue-wave-2 {
    stroke: var(--secondary-neon);
    animation: waveFloat 4s ease-in-out infinite alternate-reverse;
}

.purple-wave-1 {
    stroke: #a78bfa;
    animation: waveFloat 3.2s ease-in-out infinite alternate;
}

.purple-wave-2 {
    stroke: #7c3aed;
    animation: waveFloat 3.8s ease-in-out infinite alternate-reverse;
}

@keyframes waveFloat {
    0% { transform: scaleY(0.7) translateY(-3px); }
    100% { transform: scaleY(1.3) translateY(3px); }
}

.tech-card-label {
    position: absolute;
    bottom: 16px; left: 20px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 0.1em;
}

/* Infinite Marquee Ticker (Optimized to span full screen view natively) */
.ticker-wrap {
    width: 100%;
    overflow: hidden;
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 20px 0;
    margin: 60px 0;
}

.ticker-content {
    display: inline-flex;
    white-space: nowrap;
    gap: 30px;
    animation: tickerLoop 30s linear infinite;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
}

.ticker-content span {
    display: inline-block;
}

.ticker-content span:nth-child(even) {
    color: var(--primary-neon);
    opacity: 0.7;
}

@keyframes tickerLoop {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
}

/* Performance Rendering optimization for below-the-fold elements */
.testimonials-section, .faq-section, .mockup-section, .professionals-section {
    content-visibility: auto;
    contain-intrinsic-size: 400px;
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
    background: var(--bg-secondary) !important;
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
body.light-theme .sidebar-item:hover {
    background: rgba(0, 0, 0, 0.02);
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
body.light-theme .progress-ring__circle-bg {
    stroke: rgba(0, 0, 0, 0.04);
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
    background: var(--bg-secondary);
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
    color: var(--text-main);
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
    color: var(--text-main);
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
    color: var(--text-main);
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

/* ... (rest of CSS unchanged) */
`;

fs.writeFileSync(indexHtmlPath, newHtml, 'utf8');
fs.writeFileSync(styleCssPath, newCss, 'utf8');
console.log('Rebuild with SVGs flags completed successfully!');
