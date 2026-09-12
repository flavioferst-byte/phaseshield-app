const fs = require('fs');
const path = require('path');

const indexHtmlPath = 'c:/Users/ULTRA/Desktop/Phase_C - Copia/index.html';
const styleCssPath = 'c:/Users/ULTRA/Desktop/Phase_C - Copia/style.css';

// 1. Process style.css
let css = fs.readFileSync(styleCssPath, 'utf8');

// Replace colors
css = css.replace(/#00F5FF/gi, '#DAB682');
css = css.replace(/#7B61FF/gi, '#C4994E');
css = css.replace(/#2DFF9A/gi, '#E8CFA0');
css = css.replace(/rgba\(0,\s*245,\s*255/gi, 'rgba(218, 182, 130');
css = css.replace(/rgba\(123,\s*97,\s*255/gi, 'rgba(196, 153, 78');
css = css.replace(/rgba\(45,\s*255,\s*154/gi, 'rgba(232, 207, 160');

// Append Two-Layers Section styles
const twoLayersCss = `
/* ========================================================================== */
/*  Two Layers Section (MaskAI Inspired)                                       */
/* ========================================================================== */
.two-layers-section {
    padding: 100px 0;
    border-top: 1px solid var(--border-color);
    position: relative;
}

.layers-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-top: 40px;
    margin-bottom: 40px;
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
    opacity: 0.1;
    line-height: 1;
}

.layer-footer {
    font-family: var(--font-heading);
    font-size: 10px;
    letter-spacing: 0.2em;
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
`;

if (!css.includes('Two Layers Section')) {
    css += twoLayersCss;
}

fs.writeFileSync(styleCssPath, css, 'utf8');
console.log('Processed style.css colors and layouts!');

// 2. Process index.html
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace progress ring linearGradient offsets to match new gradient color
html = html.replace(/<stop offset="0%" stop-color="#7B61FF" \/>/g, '<stop offset="0%" stop-color="#DAB682" />');
html = html.replace(/<stop offset="100%" stop-color="#00F5FF" \/>/g, '<stop offset="100%" stop-color="#C4994E" />');

// Replace document Title and Meta description to align with MaskAI copy
html = html.replace(/<title>BlackVoice - Proteção de Áudio contra Transcrição Automática<\/title>/gi, '<title>BlackVoice — Crie áudios camuflados. Aprove criativos sem limites.</title>');
html = html.replace(/BlackVoice embaralha o áudio dos seus vídeos usando inversão de fase espectral. Humanos ouvem normalmente. IAs e plataformas ficam surdas./gi, 'Tecnologia dual-layer proprietária que otimiza seus criativos de áudio e vídeo para máxima aprovação nas plataformas de anúncios.');

// Replace navbar link colors or labels if necessary
html = html.replace(/Plano: Gratuito/g, 'Plano: Free');
html = html.replace(/<div class="hero-badge-bv">🔒 Tecnologia Anti-Transcrição<\/div>/g, '<div class="hero-badge-bv">✨ Tecnologia Dual-Layer Audio</div>');
html = html.replace(/<h1>Escale Sem Frescura.<\/h1>/g, '<h1>Ship Ad Creatives That Pass Every Time.</h1>');
html = html.replace(/Proteja o áudio de seus anúncios contra a transcrição automática das plataformas. Você ouve normal, a IA fica no escuro./g, 'A BlackVoice injeta um script seguro em uma camada de áudio oculta que os robôs de moderação leem — enquanto seu público ouve o áudio original, inalterado.');
html = html.replace(/Começar a Usar Grátis/g, 'Começar Grátis — Sem Cartão');
html = html.replace(/Ver Demonstração/g, 'Ver Como Funciona');

// Replace Hero metrics
html = html.replace(/<div class="metric"><span class="metric-val">100%<\/span> <span class="metric-label">Invisível p\/ Humanos<\/span><\/div>/g, '<div class="metric"><span class="metric-val">&lt; 10s</span> <span class="metric-label">Processamento Médio</span></div>');
html = html.replace(/<div class="metric"><span class="metric-val">0%<\/span> <span class="metric-label">Acurácia de IAs<\/span><\/div>/g, '<div class="metric"><span class="metric-val">5M+</span> <span class="metric-label">Arquivos Processados</span></div>');
html = html.replace(/<div class="metric"><span class="metric-val">No Browser<\/span> <span class="metric-label">Sem Upload de Dados<\/span><\/div>/g, '<div class="metric"><span class="metric-val">99.7%</span> <span class="metric-label">Fidelidade Acústica</span></div>');

// Inject the Two Layers Section right after Hero Section (ends around </section>)
const heroEndTag = `</section>\n\n        <!-- Como Funciona Section -->`;
const newTwoLayersHtml = `</section>

        <!-- Two Layers Section -->
        <section class="two-layers-section">
            <div class="container">
                <div class="section-header">
                    <span class="badge-premium">Dual-Layer em Ação</span>
                    <h2>Duas Camadas. Duas Realidades.</h2>
                    <p>O público humano ouve o áudio original. A IA de moderação lê apenas o script seguro.</p>
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

        <!-- Como Funciona Section -->`;

if (!html.includes('two-layers-section')) {
    html = html.replace(`</section>\n\n        <!-- Como Funciona Section -->`, newTwoLayersHtml);
    html = html.replace(`</section>\r\n\r\n        <!-- Como Funciona Section -->`, newTwoLayersHtml);
    html = html.replace(`</section>\n        <!-- Como Funciona Section -->`, newTwoLayersHtml);
}

// Replace the Como Funciona Steps
html = html.replace(/<h3>Upload Inteligente<\/h3>/g, '<h3>1. Upload do Criativo</h3>');
html = html.replace(/Envie seus arquivos de vídeo \(MP4, MOV, etc.\) diretamente pelo navegador com arrastar-e-soltar. Nada vai para servidor./g, 'Anexe seu vídeo ou áudio — suportamos MP4, MOV, MP3, WAV e os principais formatos de mídia.');

html = html.replace(/<h3>Inversão de Fase<\/h3>/g, '<h3>2. Processamento Dual-Layer</h3>');
html = html.replace(/Nosso algoritmo processa os canais de áudio: canal esquerdo = X, canal direito = −X. A soma em mono cancela tudo./g, 'Nosso motor insere uma transcrição alternativa (copy segura) em uma camada de áudio oculta prioritária para as IAs.');

html = html.replace(/<h3>Pronto para Publicar<\/h3>/g, '<h3>3. Baixar &amp; Escalar</h3>');
html = html.replace(/Baixe o arquivo modificado e publique em qualquer plataforma. Seus ouvintes continuam ouvindo você normalmente!/g, 'Baixe o arquivo modificado e publique. As plataformas leem a camada segura enquanto seu público ouve a voz real.');

// Replace Area de Processamento text
html = html.replace(/<h2>Área de Processamento<\/h2>/g, '<h2>Dashboard de Proteção</h2>');

// Replace Pricing plans
html = html.replace(/3 vídeos por mês por IP/g, '2 envios de teste grátis');
html = html.replace(/1 vídeo por vez \(individual\)/g, 'Arquivos de até 50 MB');
html = html.replace(/Processamento no browser \(privado\)/g, 'Retenção de arquivos por 3 dias');

html = html.replace(/10 vídeos por dia/g, '10 envios por dia');
html = html.replace(/Limite de 200MB por arquivo/g, 'Arquivos de até 100 MB');
html = html.replace(/Até 10 criativos simultâneos 🔥/g, 'Criptografia de áudio');
html = html.replace(/Processamento em lote/g, 'Retenção de arquivos por 7 dias');
html = html.replace(/Qualidade de áudio HD/g, 'Fila de processamento rápida');

html = html.replace(/30 criativos por dia/g, 'Envios ilimitados');
html = html.replace(/Limite de 300MB por arquivo/g, 'Arquivos de até 500 MB');
html = html.replace(/Até 10 criativos simultâneos 🔥/g, 'Compressão avançada de vídeo');
html = html.replace(/Gerente de contas exclusivo/g, 'Retenção de arquivos por 30 dias');
// Add missing Enterprise items if needed
html = html.replace(/Assinar por R\$ 97\/mês/g, 'Assinar Plano Pro');
html = html.replace(/Assinar por R\$ 199\/mês/g, 'Assinar Plano Business');

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Processed index.html content and layouts!');
