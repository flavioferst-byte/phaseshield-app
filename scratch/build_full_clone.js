const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\ULTRA\\.gemini\\antigravity\\brain\\2b7ad4ca-1750-42d9-a035-40c5dc556706\\.system_generated\\steps\\214\\content.md';
const indexHtmlPath = 'c:/Users/ULTRA/Desktop/Phase_C - Copia/index.html';
const styleCssPath = 'c:/Users/ULTRA/Desktop/Phase_C - Copia/style.css';

// Read raw fetched HTML
let html = fs.readFileSync(srcPath, 'utf8');

// Strip the markdown header info if present
const mdDivider = '---';
const divIndex = html.indexOf(mdDivider);
if (divIndex !== -1 && divIndex < 200) {
    html = html.substring(html.indexOf('\n', divIndex + mdDivider.length + 1)).trim();
}

// 1. Remove Next.js script tags to prevent client-side hydration resetting our dashboard
html = html.replace(/<script src="\/_next\/static\/chunks\/[^"]+" async=""?><\/script>/g, '');
html = html.replace(/<script src="\/_next\/static\/chunks\/[^"]+" noModule=""?><\/script>/g, '');
html = html.replace(/<script defer=""? src="\/_next\/static\/chunks\/[^"]+"><\/script>/g, '');
html = html.replace(/<script fetchPriority="low" src="\/_next\/static\/chunks\/[^"]+" async=""?><\/script>/g, '');
html = html.replace(/<script[^>]*src="\/_next\/[^"]+"[^>]*><\/script>/g, '');
html = html.replace(/<link rel="preload" as="script"[^>]*>/g, '');

// 2. Map remote stylesheets to local ones
html = html.replace(/href="\/_next\/static\/chunks\/bbe15931be9615d8\.css\?[^"]+"/g, 'href="maskai1.css"');
html = html.replace(/href="\/_next\/static\/chunks\/9eb797741c5bb68e\.css\?[^"]+"/g, 'href="maskai2.css"');

// 3. Inject our style.css and ffmpeg scripts into head
const headEndIndex = html.indexOf('</head>');
if (headEndIndex !== -1) {
    const headInject = `
    <link rel="stylesheet" href="style.css?v=1784080183"/>
    <script src="https://unpkg.com/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js"></script>
    <style>
        /* Smooth scrolling adjustments */
        html { scroll-behavior: smooth; }
        /* Dashboard custom overrides inside mockup container */
        .dashboard-card { border: none !important; border-radius: 0 !important; box-shadow: none !important; }
        .app-section { padding: 40px 0 !important; }
    </style>
    `;
    html = html.substring(0, headEndIndex) + headInject + html.substring(headEndIndex);
}

// 4. Update the URL displayed in the browser mockup frame and prepare anchorage
html = html.replace(/app\.maskai\.co\/dashboard/g, '<span id="dashboard-anchor">app.blackvoice.com/dashboard</span>');

// 5. Replace Dashboard mockup body with our functional Dashboard layout HTML
const mockupStartTag = '<div class="space-y-4 p-4"><div class="grid grid-cols-3 gap-3">';
const mockupStartIndex = html.indexOf(mockupStartTag);

if (mockupStartIndex !== -1) {
    // Find the end tag which closes the mockup body div
    // We want to replace everything from mockupStartTag to the closing div of the mockup body
    const mockupEndTag = '</div></div></div></div></section>';
    // Let's search from the start index for the next section close or CTA start
    const nextSectionIndex = html.indexOf('<section id="precos"', mockupStartIndex);
    const endSliceIndex = html.lastIndexOf('</div></div></div>', nextSectionIndex);
    
    const dashboardHtml = `
    <div class="dashboard-card">
        <div class="dashboard-layout">
            <!-- Sidebar -->
            <aside class="dashboard-sidebar">
                <div class="sidebar-logo">
                    <span class="logo-wordmark" style="font-size: 20px;"><span>Black</span><span style="color:var(--primary-neon);">Voice</span></span>
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
            <div class="dashboard-content" style="text-align: left;">
                <!-- Tab: Process -->
                <div class="dashboard-tab-panel active" id="tab-process">
                    <div class="drop-zone" id="drop-zone-area">
                        <div class="drop-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                        </div>
                        <h3 style="font-family:var(--font-heading); color:#fff; font-size:16px;">Arraste seus vídeos aqui</h3>
                        <p style="font-size:14px; color:var(--text-muted); margin-top:4px;">ou <span class="browse-link" style="color:var(--primary-neon); cursor:pointer;">procure nos arquivos</span></p>
                        <span class="file-limits" id="file-limits-text" style="display:block; margin-top:10px; font-size:11px; color:var(--text-dim);">Plano Gratuito: Máx 1 arquivo de até 200MB · 3/mês</span>
                        <input type="file" id="file-input-field" accept="video/*" style="display: none;">
                    </div>

                    <!-- Selected Files List State -->
                    <div id="selected-files-list" style="display: none; flex-direction: column; gap: 12px; margin-bottom: 24px; margin-top: 15px;"></div>

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
                            <h4 id="status-title" style="color:#fff; font-size:15px; margin-bottom:8px;">Preparando...</h4>
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
                            <h3 class="quota-title" style="color:#fff;">Status da sua Conta</h3>
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
    `;
    
    html = html.substring(0, mockupStartIndex) + dashboardHtml + html.substring(endSliceIndex);
}

// 6. Replace the FAQ titles and content to PT-BR, matching our previous file
const faqSectionStart = html.indexOf('Frequently Asked Questions');
if (faqSectionStart !== -1) {
    // Let's replace the FAQ questions and answers with PT-BR translations
    html = html.replace('Frequently Asked Questions', 'Perguntas Frequentes');
    html = html.replace('What exactly does Maskai.co do?', 'O que exatamente o BlackVoice faz?');
    html = html.replace('Maskai.co embeds an alternate, harmless audio transcript into a hidden layer of your media file. Human listeners hear the original audio unchanged, while automated speech-to-text systems read the safe layer instead. The result: your creatives pass content moderation on ad platforms.', 'O BlackVoice incorpora uma transcrição de áudio alternativa e inofensiva em uma camada oculta do seu arquivo de mídia. Os ouvintes humanos continuam ouvindo o áudio original normalmente, mas os sistemas automáticos de speech-to-text das plataformas leem a camada segura. Isso faz com que seus anúncios passem sem problemas na moderação automática.');
    
    html = html.replace('What is the &#x27;hidden layer&#x27; technology?', 'O que é a tecnologia de \'camada oculta\'?');
    html = html.replace('We inject an alternate audio signal into frequency bands that STT algorithms prioritize. Human perception ignores these bands entirely, so your audience hears zero difference.', 'Injetamos um sinal de áudio alternativo em bandas de frequência específicas que os algoritmos de speech-to-text (STT) priorizam. Como a percepção do ouvido humano ignora essas bandas, o seu público não percebe nenhuma diferença.');
    
    html = html.replace('Does it change how my audio sounds?', 'Isso altera a qualidade ou o som do meu áudio original?');
    html = html.replace('No. We preserve 99.7% fidelity of the original waveform. The injected layer sits in frequencies and amplitudes that the human ear cannot distinguish from the original signal.', 'Não. Nós preservamos 99.7% de fidelidade da sua onda de áudio original. A camada oculta fica localizada em frequências e amplitudes que o ouvido humano não distingue da gravação original.');
    
    html = html.replace('Which ad platforms does it work with?', 'Com quais plataformas de anúncios isso funciona?');
    html = html.replace('Any platform that uses automatic speech-to-text for content moderation — including Meta Ads, Google Ads, TikTok Ads, YouTube Ads and programmatic networks.', 'Funciona com qualquer plataforma de anúncios ou rede que utilize transcrição automática (speech-to-text) para moderação de conformidade — incluindo Facebook/Meta Ads, Google Ads, TikTok Ads, YouTube Ads e redes programáticas.');
    
    html = html.replace('How fast is the processing?', 'Quanto tempo demora para processar um arquivo?');
    html = html.replace('Most files complete in under 60 seconds. Pro and Business subscribers get priority queue access with even shorter turnaround.', 'Graças ao nosso pipeline local de renderização ultra-rápida, a maioria dos vídeos curtos é processada em menos de 10 segundos, enquanto os vídeos mais longos levam de 3 a 5 segundos totais.');
    
    html = html.replace('Can I cancel my subscription?', 'Posso cancelar minha assinatura a qualquer momento?');
    html = html.replace('Absolutely — cancel from your dashboard anytime with no penalties. You keep full access until the end of your current billing period.', 'Com certeza — cancele do seu painel a qualquer momento sem penalidades. Você mantém acesso total até o final do período de faturamento atual.');
}

// 7. Update pricing plans text
html = html.replace('Choose Your Plan', 'Escolha o Seu Plano');
html = html.replace('Start free and scale as your operation grows.', 'Comece grátis e escale à medida que a sua operação cresce.');
html = html.replace('2 experience uploads to try the platform', '2 envios de teste grátis');
html = html.replace('2 uploads per day', 'Envios locais processados');
html = html.replace('Files up to 50 MB', 'Arquivos de até 50 MB');
html = html.replace('3-day file retention', 'Retenção de arquivos por 3 dias');

html = html.replace('For solo creators', 'Para criadores independentes');
html = html.replace('10 uploads per day', '10 envios por dia');
html = html.replace('Files up to 100 MB', 'Arquivos de até 100 MB');
html = html.replace('7-day retention', 'Retenção de arquivos por 7 dias');
html = html.replace('Audio Encryption', 'Criptografia local de áudio');

html = html.replace('For serious scaling', 'Para profissionais de escala');
html = html.replace('50 uploads per day', '50 envios por dia');
html = html.replace('Files up to 300 MB', 'Arquivos de até 300 MB');
html = html.replace('14-day retention', 'Retenção de arquivos por 14 dias');
html = html.replace('Video Compression', 'Compressão avançada de vídeo');
html = html.replace('Priority Queue', 'Fila de processamento prioritária');

html = html.replace('For agencies &amp; teams', 'Para agências e equipes');
html = html.replace('Unlimited uploads', 'Envios diários ilimitados');
html = html.replace('Files up to 500 MB', 'Arquivos de até 500 MB');
html = html.replace('30-day retention', 'Retenção de arquivos por 30 dias');
html = html.replace('Dedicated Support', 'Suporte dedicado 24/7');

// Map plan subscribe buttons to show the payment modal
html = html.replace('href="/auth/register">Get Started Free</a>', 'href="#dashboard-anchor">Começar Grátis</a>');
html = html.replace('Subscribe Starter', '<button class="btn btn-outline" style="width:100%;" onclick="window.bvOpenCheckout(\'Starter\', \'R$ 49/mês\')">Assinar Starter</button>');
html = html.replace('Subscribe Pro', '<button class="btn btn-primary" style="width:100%;" onclick="window.bvOpenCheckout(\'Pro\', \'R$ 97/mês\')">Assinar Pro</button>');
html = html.replace('Subscribe Business', '<button class="btn btn-outline" style="width:100%;" onclick="window.bvOpenCheckout(\'Business\', \'R$ 199/mês\')">Assinar Business</button>');

// 8. Replace Testimonials (change quotes, names, and profiles)
html = html.replace('What Our Users Say', 'O Que Nossos Usuários Dizem');

html = html.replace(/“We were losing \$50K\/month in wasted ad spend from rejected creatives. After switching to Maskai.co, our team ships campaigns same-day with a 97% first-pass approval rate. The ROI paid for itself in the first week.”/g, 
    '“Estávamos perdendo mais de R$ 30.000 por mês devido a criativos reprovados. Com a BlackVoice, aprovamos nossos anúncios no mesmo dia e nossa taxa de conversão disparou. O investimento se pagou logo na primeira semana.”');
html = html.replace('Marcus R.', 'Mateus R. (Gestor de Tráfego)');

html = html.replace(/“Running 30\+ client accounts means hundreds of creatives every week. Maskai.co eliminated our biggest production bottleneck — we now guarantee on-time launches with near-zero content flags across all major platforms.”/g,
    '“Gerenciar mais de 25 contas de clientes significava refazer centenas de criativos por semana. A BlackVoice eliminou completamente esse problema e agora nossas campanhas de tráfego entram no ar sem nenhum bloqueio por áudio.”');
html = html.replace('Sarah K.', 'Mariana S. (Diretora de Agência)');

html = html.replace(/“I have stress-tested every workaround on the market. Nothing touches Maskai.co&#x27;s dual-layer approach. My team processes 200\+ creatives weekly in under an hour with zero manual QA — it is the unfair advantage every media buyer needs.”/g,
    '“Eu já testei todas as soluções e hacks de contingência do mercado, mas nada se compara ao sistema dual-layer da BlackVoice. Processamos mais de 150 vídeos por semana e nossa operação flui perfeitamente com zero reprovação.”');
html = html.replace('Daniel F.', 'Ricardo M. (Afiliado Master)');

html = html.replace(/“Our media team used to spend hours redoing rejected creatives. With Maskai.co, the rejection rate dropped to nearly zero. We finally get to focus on scaling instead of fixing.”/g,
    '“Nossa equipe gastava metade do tempo editando e tentando camuflar criativos reprovados pelas plataformas. Agora, basta passar pelo painel da BlackVoice e subir a campanha. É o segredo que todo comprador de mídia deveria usar.”');
html = html.replace('Ana M.', 'Juliana F. (Media Buyer, GrowthLab)');

// 9. Replace Bottom CTA Section
html = html.replace('Ready to Outsmart Content Moderation?', 'Pronto para Superar a Moderação de Conteúdo?');
html = html.replace('Every blocked ad is lost revenue. Start now with 2 free uploads per day. No credit card needed.', 'Cada criativo bloqueado pelas plataformas é faturamento que você deixa de ganhar. Comece a processar agora mesmo de forma simples.');
html = html.replace('Create Free Account Now', 'Começar a Otimizar Agora');

// 10. Inject payment checkout modal, auth modal and footer scripts before </body>
const bodyEndIndex = html.lastIndexOf('</body>');
if (bodyEndIndex !== -1) {
    const modalsHtml = `
    <!-- Checkout Modal -->
    <div class="modal" id="checkout-modal">
        <div class="modal-content glass" style="text-align: left;">
            <button class="modal-close" id="btn-close-modal">✕</button>
            <div class="modal-header">
                <h2 style="color:#fff; font-size:20px; margin-bottom:6px;">BlackVoice <span id="modal-plan-badge" class="badge">Pro</span></h2>
                <p style="color:var(--text-dim); font-size:12px;">Simulador de Checkout de Pagamento (Ambiente de Testes)</p>
            </div>
            <div class="modal-body">
                <div class="payment-summary" style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 16px; border-radius: 12px; margin: 24px 0;">
                    <span>Total a pagar hoje:</span>
                    <strong id="modal-plan-price" style="color:var(--primary-neon); font-size:18px;">R$ 97/mês</strong>
                </div>
                <div class="mock-form" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                    <label for="mock-card-name" style="font-size:12px; color:var(--text-muted);">Nome no cartão</label>
                    <input type="text" id="mock-card-name" placeholder="Fulano de Tal" value="Fulano de Tal" disabled>
                    <label for="mock-card-number" style="font-size:12px; color:var(--text-muted);">Número do Cartão</label>
                    <input type="text" id="mock-card-number" placeholder="4000 1234 5678 9010" value="•••• •••• •••• 4242" disabled>
                    <div class="row" style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
                        <div>
                            <label for="mock-card-expiry" style="font-size:12px; color:var(--text-muted);">Validade</label>
                            <input type="text" id="mock-card-expiry" value="12/30" disabled style="width:100%;">
                        </div>
                        <div>
                            <label for="mock-card-cvv" style="font-size:12px; color:var(--text-muted);">CVC</label>
                            <input type="password" id="mock-card-cvv" value="•••" disabled style="width:100%;">
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
        <div class="auth-modal" style="text-align: left;">
            <button class="auth-modal-close" id="auth-modal-close">✕</button>
            <div class="auth-modal-logo" style="text-align: center; margin-bottom: 24px;">
                <span style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;letter-spacing:-0.5px;">
                    <span style="color:#fff;">Black</span><span style="color:#DAB682;">Voice</span>
                </span>
            </div>
            <!-- Tabs -->
            <div class="auth-tabs" style="display: flex; border-bottom: 1px solid var(--border-color); margin-bottom: 24px;">
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
                <div class="auth-divider" style="text-align: center; font-size: 11px; color: var(--text-dim); position: relative; margin: 8px 0;">ou entre com e-mail</div>
                <div class="auth-error" id="login-error" style="color: var(--error); font-size: 12px; text-align: center; display: none;"></div>
                <div class="auth-field" style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="login-email" style="font-size: 12px; color: var(--text-muted);">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" autocomplete="email">
                </div>
                <div class="auth-field" style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="login-password" style="font-size: 12px; color: var(--text-muted);">Senha</label>
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
                        <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                        <path fill="#FBBC05" d="M24 46c5.9 0 10.9-1.9 14.6-5.2l-6.7-5.5C29.8 36.7 27 37.5 24 37.5c-6 0-11.1-4-12.9-9.5l-7 5.4C7.7 41.6 15.3 46 24 46z"/>
                        <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.3-2.3 4.2-4.4 5.5l6.7 5.5c3.9-3.6 6.4-9 6.4-15.5 0-1.3-.2-2.7-.5-4z"/>
                    </svg>
                    Registrar com Google
                </button>
                <div class="auth-divider" style="text-align: center; font-size: 11px; color: var(--text-dim); position: relative; margin: 8px 0;">ou crie com e-mail</div>
                <div class="auth-error" id="register-error" style="color: var(--error); font-size: 12px; text-align: center; display: none;"></div>
                <div class="auth-field" style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="register-name" style="font-size: 12px; color: var(--text-muted);">Nome completo</label>
                    <input type="text" id="register-name" placeholder="Seu nome" autocomplete="name">
                </div>
                <div class="auth-field" style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="register-email" style="font-size: 12px; color: var(--text-muted);">E-mail</label>
                    <input type="email" id="register-email" placeholder="seu@email.com" autocomplete="email">
                </div>
                <div class="auth-field" style="display: flex; flex-direction: column; gap: 6px;">
                    <label for="register-password" style="font-size: 12px; color: var(--text-muted);">Senha</label>
                    <input type="password" id="register-password" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
                </div>
                <button class="btn-auth-submit" id="btn-do-register">Criar Conta Grátis</button>
                <button class="auth-free-btn" id="btn-continue-free-register">Continuar sem conta (Plano Gratuito)</button>
            </div>
        </div>
    </div>

    <!-- Scripts -->
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
                const appSection = document.getElementById('dashboard-anchor');
                if (appSection) appSection.scrollIntoView({ behavior: 'smooth' });
            };
            
            // Fix sign-in and start links to trigger actions
            const ctas = document.querySelectorAll('a[href="/auth/register"], a[href="/auth/login"]');
            ctas.forEach(cta => {
                cta.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('auth-modal-overlay').classList.add('active');
                });
            });
        });
    </script>
    `;
    html = html.substring(0, bodyEndIndex) + modalsHtml + html.substring(bodyEndIndex);
}

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Processed index.html cloning raw maskai structure!');
