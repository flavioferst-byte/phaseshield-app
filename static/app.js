// -------------------------------------------------------------------------- //
//  BlackVoice SaaS - Frontend Application Logic v3.0                         //
//  Auth, Planos, Multi-Upload e Fila de Processamento                        //
// -------------------------------------------------------------------------- //

// =========================================================================== //
//  AUTH SYSTEM - Fora do DOMContentLoaded para acesso global                 //
// =========================================================================== //

const BV_AUTH_KEY = 'blackvoice_auth_user';

/** Retorna o usuário logado ou null */
function bvGetUser() {
    try { return JSON.parse(localStorage.getItem(BV_AUTH_KEY)) || null; } catch { return null; }
}

/** Salva usuário e atualiza UI da navbar */
function bvSetUser(user) {
    localStorage.setItem(BV_AUTH_KEY, JSON.stringify(user));
    bvUpdateNavbar();
}

/** Desloga e limpa estado */
function bvLogout() {
    localStorage.removeItem(BV_AUTH_KEY);
    bvUpdateNavbar();
    window.showToast && window.showToast('Você saiu da sua conta.', 'info');
}

/** Atualiza elementos da navbar conforme estado de auth */
function bvUpdateNavbar() {
    const user = bvGetUser();
    const btnLogin = document.getElementById('btn-open-login');
    const btnRegister = document.getElementById('btn-open-register');
    const navUserWrap = document.getElementById('nav-user-wrap');
    const navUserAvatar = document.getElementById('nav-user-avatar');
    const navUserName = document.getElementById('nav-user-name');
    const navUserEmail = document.getElementById('nav-user-email');

    if (user) {
        if (btnLogin)    btnLogin.style.display = 'none';
        if (btnRegister) btnRegister.style.display = 'none';
        if (navUserWrap) navUserWrap.style.display = 'flex';
        const initials = (user.name || user.email || 'U').slice(0, 2).toUpperCase();
        if (navUserAvatar) {
            if (user.picture) {
                navUserAvatar.innerHTML = `<img src="${user.picture}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" alt="">`;
            } else {
                navUserAvatar.textContent = initials;
            }
        }
        if (navUserName) navUserName.textContent = user.name ? user.name.split(' ')[0] : 'Conta';
        if (navUserEmail) navUserEmail.textContent = user.email || '';
    } else {
        if (btnLogin)    btnLogin.style.display = '';
        if (btnRegister) btnRegister.style.display = '';
        if (navUserWrap) navUserWrap.style.display = 'none';
    }
}

/** Valida formato de email */
function bvValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Simula login Google com dados fictícios premium */
function bvGoogleLogin() {
    const names = ['Ana Silva', 'Carlos Mendes', 'Juliana Costa', 'Pedro Alves', 'Mariana Luz'];
    const name = names[Math.floor(Math.random() * names.length)];
    const emailBase = name.toLowerCase().replace(' ', '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const user = {
        name,
        email: `${emailBase}@gmail.com`,
        provider: 'google',
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=a855f7&color=fff&size=68`
    };
    bvSetUser(user);
    return user;
}

// Expor funções globais para uso inline no HTML
window.bvScrollToApp = () => window.location.href = '/auth';
window.bvOpenCheckout = (planId, planName, price) => {
    if (window.openCheckoutModalGlobal && planId) {
        window.openCheckoutModalGlobal(planId, planName, price);
    } else {
        document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
    }
};


document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================= //
    //  SISTEMA DE PLANOS - Configuração Central                                //
    // ======================================================================= //
    const PLANS = {
        free: {
            id: 'free',
            name: 'Gratuito',
            dailyLimit: 99999,
            period: 'day', // 'day' ou 'month'
            maxFileSizeMB: 500,
            maxSimultaneous: 20,
            label: 'Plano: Gratuito'
        },
        creator: {
            id: 'creator',
            name: 'Creator Pro',
            dailyLimit: 9999,
            period: 'day',
            maxFileSizeMB: 200,
            maxSimultaneous: 10,
            label: 'Plano: Creator Pro'
        },
        enterprise: {
            id: 'enterprise',
            name: 'Enterprise',
            dailyLimit: 9999,
            period: 'day',
            maxFileSizeMB: 300,
            maxSimultaneous: 10,
            label: 'Plano: Enterprise 🏆'
        }
    };

    // ======================================================================= //
    //  CONTROLE DE USO (via localStorage — simula controle por IP)            //
    //  Plano Free: 3/mês | Planos pagos: por dia                              //
    // ======================================================================= //
    function getPeriodKey(plan) {
        const now = new Date();
        if (plan.period === 'month') {
            // Chave mensal: 'YYYY-MM'
            const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            return `blackvoice_usage_${plan.id}_${month}`;
        } else {
            // Chave diária: 'YYYY-MM-DD'
            const day = now.toISOString().split('T')[0];
            return `blackvoice_usage_${plan.id}_${day}`;
        }
    }

    function getUsageToday() {
        const plan = getActivePlan();
        const key = getPeriodKey(plan);
        const saved = localStorage.getItem(key);
        return saved ? parseInt(saved, 10) : 0;
    }

    function incrementUsage() {
        const plan = getActivePlan();
        const key = getPeriodKey(plan);
        const current = getUsageToday();
        localStorage.setItem(key, current + 1);
    }

    function getActivePlan() {
        const saved = localStorage.getItem('phaseshield_plan');
        return PLANS[saved] || PLANS.free;
    }

    function setActivePlan(planId) {
        localStorage.setItem('phaseshield_plan', planId);
        applyPlanToUI();
    }

    // ======================================================================= //
    //  ESTADO GLOBAL DA APLICAÇÃO                                              //
    // ======================================================================= //
    let selectedFiles = [];       // Fila de arquivos selecionados
    let processingQueue = [];     // Fila aguardando processamento
    let activeJobs = 0;           // Jobs rodando agora em paralelo
    let ffmpegInstance = null;    // Instância reutilizável do FFmpeg.wasm
    let ffmpegLoading = false;    // Evita carregar duas vezes

    // Web Audio Demo
    let audioCtx = null;
    let demoSource = null;
    let demoActiveType = null;
    let demoTimeout = null;
    let circumference = 251.2;

    // ======================================================================= //
    //  DOM ELEMENTS & STATE                                                    //
    // ======================================================================= //
    const btnTabLocal      = document.getElementById('btn-tab-local');
    const btnTabVoiceover  = document.getElementById('btn-tab-voiceover');
    const voiceoverTextContainer = document.getElementById('voiceover-text-container');
    const voiceoverText    = document.getElementById('voiceover-text');
    const charCounter      = document.getElementById('char-counter');
    // Elementos de Imagem de Camuflagem
    const imageDropzone    = document.getElementById('image-dropzone');
    const imageInputField  = document.getElementById('image-input-field');
    const imagePlaceholderText = document.getElementById('image-placeholder-text');
    const btnClearImage    = document.getElementById('btn-clear-image');
    let selectedImageFile  = null;

    let currentModality    = 'local'; // 'local' ou 'voiceover'

    const dropZone         = document.getElementById('drop-zone-area');
    const fileInput        = document.getElementById('file-input-field');
    const selectedFilesList = document.getElementById('selected-files-list');
    const cardActionBar    = document.getElementById('card-action-bar');
    const btnProcessAction = document.getElementById('btn-process-action');
    const processingBox    = document.getElementById('processing-box');
    const progressCircle   = document.getElementById('progress-circle');
    const progressPct      = document.getElementById('progress-percentage');
    const statusTitle      = document.getElementById('status-title');
    const logConsole       = document.getElementById('log-console');
    const completedBox     = document.getElementById('completed-box');
    const btnDownloadResult = document.getElementById('btn-download-result');
    const btnRestart       = document.getElementById('btn-restart');
    const fileLimitsText   = document.getElementById('file-limits-text');
    const navbarBadge      = document.getElementById('navbar-plan-badge');

    const checkoutModal    = document.getElementById('checkout-modal');
    const btnCloseModal    = document.getElementById('btn-close-modal');
    const modalPlanBadge   = document.getElementById('modal-plan-badge');
    const modalPlanPrice   = document.getElementById('modal-plan-price');
    const btnMockPay       = document.getElementById('btn-mock-pay');
    const paymentSuccessMsg = document.getElementById('payment-success-msg');
    const btnPricingHobby  = document.getElementById('btn-pricing-hobby');
    const btnPricingCreator = document.getElementById('btn-pricing-creator');
    const btnPricingPro    = document.getElementById('btn-pricing-pro');
    const btnPricingEnterprise = document.getElementById('btn-pricing-enterprise');
    const btnPlayStereo    = document.getElementById('btn-play-stereo');
    const btnPlayMono      = document.getElementById('btn-play-mono');
    const stereoWave       = document.getElementById('stereo-wave');

    // Progress ring setup
    if (progressCircle && progressCircle.r) {
        const circleRadius = progressCircle.r.baseVal.value;
        circumference = circleRadius * 2 * Math.PI;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;
    }

    // ======================================================================= //
    //  APLICAR PLANO NA UI                                                     //
    // ======================================================================= //
    function applyPlanToUI() {
        const plan = getActivePlan();
        const usedToday = getUsageToday();
        const remaining = Math.max(0, plan.dailyLimit - usedToday);

        // Atualizar badge da navbar
        if (navbarBadge) navbarBadge.textContent = plan.label;

        // Atualizar texto de limites na dropzone
        if (fileLimitsText) {
            const multiText = plan.maxSimultaneous > 1 ? ` · Até ${plan.maxSimultaneous} simultâneos` : ' · 1 por vez';
            const periodText = plan.period === 'month' ? 'este mês' : 'hoje';
            fileLimitsText.textContent = `${plan.name}: Máx ${plan.maxFileSizeMB}MB por arquivo${multiText} · ${remaining}/${plan.dailyLimit} restantes ${periodText}`;
        }

        // Ativar multiple no input conforme plano
        if (fileInput) {
            if (plan.maxSimultaneous > 1) {
                fileInput.setAttribute('multiple', 'true');
            } else {
                fileInput.removeAttribute('multiple');
            }
        }

        // Sincronizar cota e badges do dashboard
        const sidebarPlanBadge = document.getElementById('sidebar-plan-badge');
        if (sidebarPlanBadge) sidebarPlanBadge.textContent = plan.name;

        const quotaPlanTitle = document.getElementById('quota-plan-title');
        if (quotaPlanTitle) quotaPlanTitle.textContent = `Plano ${plan.name}`;

        const quotaUsageText = document.getElementById('quota-usage-text');
        if (quotaUsageText) {
            const periodLabel = plan.period === 'month' ? 'este mês' : 'hoje';
            quotaUsageText.textContent = `${usedToday} / ${plan.dailyLimit} envios ${periodLabel}`;
        }

        const quotaBarProgress = document.getElementById('quota-bar-progress');
        if (quotaBarProgress) {
            const pct = plan.dailyLimit > 0 ? Math.min(100, (usedToday / plan.dailyLimit) * 100) : 0;
            quotaBarProgress.style.width = `${pct}%`;
        }

        const quotaStatProcessed = document.getElementById('quota-stat-processed');
        if (quotaStatProcessed) {
            quotaStatProcessed.textContent = usedToday;
        }
    }

    // Inicializar UI com o plano atual
    if (stereoWave) stereoWave.classList.add('paused');
    applyPlanToUI();

    // ======================================================================= //
    //  DEMO AUDITIVO - Web Audio API (Phase Cancellation ao vivo)             //
    // ======================================================================= //
    function initAudio() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }

    function stopDemos() {
        if (demoTimeout) { clearTimeout(demoTimeout); demoTimeout = null; }
        if (demoSource) { try { demoSource.stop(); } catch(e) {} demoSource = null; }
        demoActiveType = null;
        if (btnPlayStereo) btnPlayStereo.textContent = '🔊 Ouvir em Estéreo';
        if (btnPlayMono) btnPlayMono.textContent = '🔇 Ouvir em Mono (Silêncio)';
        if (stereoWave) stereoWave.classList.add('paused');
    }

    function playDemo(type) {
        initAudio();
        if (demoActiveType === type) { stopDemos(); return; }
        stopDemos();
        demoActiveType = type;

        const osc = audioCtx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(293.66, audioCtx.currentTime);

        const vibrato = audioCtx.createOscillator();
        const vibratoGain = audioCtx.createGain();
        vibrato.frequency.value = 6;
        vibratoGain.gain.value = 3;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        vibrato.start();

        const gainL = audioCtx.createGain();
        gainL.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.connect(gainL);

        const gainR = audioCtx.createGain();
        gainR.gain.setValueAtTime(-0.15, audioCtx.currentTime);
        osc.connect(gainR);

        if (type === 'stereo') {
            const merger = audioCtx.createChannelMerger(2);
            gainL.connect(merger, 0, 0);
            gainR.connect(merger, 0, 1);
            merger.connect(audioCtx.destination);
            if (btnPlayStereo) btnPlayStereo.textContent = '⏹ Parar Demonstração';
            if (stereoWave) stereoWave.classList.remove('paused');
        } else {
            const sumNode = audioCtx.createGain();
            gainL.connect(sumNode);
            gainR.connect(sumNode);
            sumNode.connect(audioCtx.destination);
            if (btnPlayMono) btnPlayMono.textContent = '⏹ Parar Demonstração';
            if (stereoWave) stereoWave.classList.add('paused');
        }

        osc.start();
        demoSource = osc;
        demoTimeout = setTimeout(stopDemos, 5000);
    }

    if (btnPlayStereo) btnPlayStereo.addEventListener('click', () => playDemo('stereo'));
    if (btnPlayMono) btnPlayMono.addEventListener('click', () => playDemo('mono'));

    // ======================================================================= //
    //  DRAG & DROP + SELEÇÃO DE ARQUIVOS                                       //
    // ======================================================================= //
    if (dropZone) {
        dropZone.addEventListener('click', (e) => {
            if (fileInput && e.target !== fileInput) fileInput.click();
        });

        ['dragenter', 'dragover'].forEach(ev => {
            dropZone.addEventListener(ev, (e) => { e.preventDefault(); dropZone.classList.add('active'); }, false);
        });

        ['dragleave', 'drop'].forEach(ev => {
            dropZone.addEventListener(ev, (e) => { e.preventDefault(); dropZone.classList.remove('active'); }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) handleFilesSelection(files);
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) handleFilesSelection(Array.from(fileInput.files));
        });
    }

    function handleFilesSelection(files) {
        const plan = getActivePlan();
        const usedToday = getUsageToday();
        const remaining = plan.dailyLimit - usedToday;

        // Verificar limite diário
        if (remaining <= 0) {
            showLimitModal(plan);
            return;
        }

        const validExtensions = ['.mp4', '.mkv', '.avi', '.mov'];
        const maxBytes = plan.maxFileSizeMB * 1024 * 1024;
        const maxSimultaneous = plan.maxSimultaneous;

        let validFiles = [];
        let errors = [];

        for (const file of files) {
            const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (!validExtensions.includes(ext)) {
                errors.push(`"${file.name}" tem formato inválido.`);
                continue;
            }
            if (file.size > maxBytes) {
                errors.push(`"${file.name}" excede ${plan.maxFileSizeMB}MB (limite do seu plano).`);
                continue;
            }
            validFiles.push(file);
        }

        if (errors.length > 0) {
            showToast('⚠️ ' + errors.join('\n'), 'error');
        }

        if (validFiles.length === 0) return;

        // Limitar simultaneidade e respeitar limite diário
        const allowedCount = Math.min(validFiles.length, maxSimultaneous, remaining);
        if (validFiles.length > maxSimultaneous) {
            showToast(`Seu plano permite ${maxSimultaneous} arquivo(s) simultâneo(s). Os primeiros ${allowedCount} foram selecionados.`, 'warn');
        }

        validFiles = validFiles.slice(0, allowedCount);

        // Adicionar arquivos à lista sem duplicar os que já estão
        for (const file of validFiles) {
            if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
                if (selectedFiles.length < maxSimultaneous) {
                    selectedFiles.push(file);
                }
            }
        }

        renderSelectedFilesList();
    }

    function updateProcessButtonState() {
        if (selectedFiles.length === 0) {
            btnProcessAction.classList.add('disabled');
            btnProcessAction.setAttribute('disabled', 'true');
            btnProcessAction.textContent = 'Aplicar BlackVoice';
            return;
        }

        btnProcessAction.classList.remove('disabled');
        btnProcessAction.removeAttribute('disabled');
        btnProcessAction.textContent = selectedFiles.length > 1
            ? `Processar ${selectedFiles.length} Criativos`
            : 'Aplicar BlackVoice';
    }

    function renderSelectedFilesList() {
        if (selectedFiles.length === 0) {
            selectedFilesList.style.display = 'none';
            dropZone.style.display = 'block';
            cardActionBar.style.display = 'flex';
            updateProcessButtonState();
            return;
        }

        dropZone.style.display = 'none';
        selectedFilesList.style.display = 'flex';
        selectedFilesList.innerHTML = '';

        selectedFiles.forEach((file, index) => {
            const card = document.createElement('div');
            card.className = 'file-details-container';
            card.style.animation = 'slideIn 0.3s ease';
            card.innerHTML = `
                <div class="file-icon">📹</div>
                <div class="file-info">
                    <h4>${file.name}</h4>
                    <span>${formatBytes(file.size)}</span>
                </div>
                <button class="btn-clear" data-index="${index}" aria-label="Remover arquivo">✕</button>
            `;
            selectedFilesList.appendChild(card);
        });

        // Eventos de remoção individual
        selectedFilesList.querySelectorAll('.btn-clear').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const i = parseInt(btn.dataset.index);
                selectedFiles.splice(i, 1);
                renderSelectedFilesList();
            });
        });

        // Botão para adicionar mais (se plano permite)
        const plan = getActivePlan();
        if (currentModality !== 'voiceover' && selectedFiles.length < plan.maxSimultaneous) {
            const addMoreBtn = document.createElement('button');
            addMoreBtn.className = 'btn btn-outline btn-sm';
            addMoreBtn.style.alignSelf = 'flex-start';
            addMoreBtn.textContent = `+ Adicionar mais (${selectedFiles.length}/${plan.maxSimultaneous})`;
            addMoreBtn.addEventListener('click', () => fileInput.click());
            selectedFilesList.appendChild(addMoreBtn);
        }

        cardActionBar.style.display = 'flex';
        updateProcessButtonState();
    }

    // ======================================================================= //
    //  MODAL DE LIMITE ATINGIDO                                               //
    // ======================================================================= //
    function showLimitModal(plan) {
        modalPlanBadge.textContent = 'Limite Atingido';
        modalPlanPrice.innerHTML = `<span style="color: #ef4444;">Você usou todos os ${plan.dailyLimit} processamentos do dia.</span>`;
        paymentSuccessMsg.style.display = 'none';
        paymentSuccessMsg.textContent = '';
        btnMockPay.textContent = plan.id === 'free'
            ? '🚀 Fazer Upgrade de Plano'
            : '🔔 Aguardar Reset (meia-noite)';
        btnMockPay.removeAttribute('disabled');
        btnMockPay.style.display = 'block';

        if (plan.id === 'free') {
            btnMockPay.onclick = () => {
                closeCheckoutModal();
                document.getElementById('precos').scrollIntoView({ behavior: 'smooth' });
            };
        } else {
            btnMockPay.onclick = closeCheckoutModal;
        }

        checkoutModal.classList.add('active');
    }

    // ======================================================================= //
    //  TOAST NOTIFICATIONS                                                    //
    // ======================================================================= //
    function showToast(message, type = 'info') {
        const existing = document.getElementById('phaseshield-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'phaseshield-toast';
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => { toast.classList.add('toast-visible'); }, 10);
        setTimeout(() => {
            toast.classList.remove('toast-visible');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ======================================================================= //
    //  PROCESSAMENTO FFMPEG.WASM                                              //
    // ======================================================================= //
    function setProgress(percent) {
        if (progressCircle) {
            const offset = circumference - (percent / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
        if (progressPct) {
            progressPct.textContent = `${Math.round(percent)}%`;
        }
    }

    function logToConsole(message, isError = false) {
        const time = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.className = 'log-line';
        if (isError) line.style.color = '#ef4444';
        line.textContent = `[${time}] > ${message}`;
        logConsole.appendChild(line);
        logConsole.scrollTop = logConsole.scrollHeight;
    }

    async function processSingleFile(file, jobIndex, totalJobs) {
        const text = voiceoverText ? voiceoverText.value.trim() : '';
        logToConsole(`[${jobIndex + 1}/${totalJobs}] Enviando arquivo para o servidor: ${file.name} (${formatBytes(file.size)})`);
        
        const formData = new FormData();
        formData.append('file', file);
        if (text) {
            formData.append('text', text);
        }
        const chkEnableCamouflage = document.getElementById('chk-enable-camouflage');
        if (chkEnableCamouflage && chkEnableCamouflage.checked && selectedImageFile) {
            formData.append('image', selectedImageFile);
        }

        // Opacidade da imagem de camuflagem
        const imageOpacitySlider = document.getElementById('image-opacity-slider');
        const imageOpacity = imageOpacitySlider ? (parseInt(imageOpacitySlider.value) / 100).toFixed(2) : '0.20';
        if (chkEnableCamouflage && chkEnableCamouflage.checked) {
            formData.append('imageOpacity', imageOpacity);
        } else {
            formData.append('imageOpacity', '0.00');
        }

        const response = await fetch('/api/process', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || 'Erro ao enviar para o servidor.');
        }

        const { task_id } = await response.json();
        logToConsole(`[${jobIndex + 1}/${totalJobs}] Processamento iniciado no backend. ID da Tarefa: ${task_id}`);

        let completed = false;
        let lastProgress = 0;

        while (!completed) {
            await new Promise(resolve => setTimeout(resolve, 200));
            const statusRes = await fetch(`/api/status/${task_id}`);
            if (!statusRes.ok) {
                throw new Error('Falha ao obter status do processamento no servidor.');
            }
            const task = await statusRes.json();

            if (task.status === 'processing' || task.status === 'pending') {
                if (task.progress) {
                    lastProgress = task.progress;
                    const baseProgress = (jobIndex / totalJobs) * 100;
                    const jobShare = (1 / totalJobs) * lastProgress;
                    setProgress(baseProgress + jobShare);
                }
                if (task.message) {
                    logToConsole(`[${jobIndex + 1}/${totalJobs}] ${task.message}`);
                }
            } else if (task.status === 'completed') {
                completed = true;
                incrementUsage();
                applyPlanToUI();
                logToConsole(`✓ [${jobIndex + 1}/${totalJobs}] Concluído com sucesso: ${file.name}`);
                return { file, downloadUrl: `/api/download/${task_id}` };
            } else if (task.status === 'failed') {
                throw new Error(task.message || 'Falha no processamento no servidor.');
            }
        }
    }

    if (btnProcessAction) {
        btnProcessAction.addEventListener('click', () => {
            if (selectedFiles.length === 0) return;
            startBatchProcessing();
        });
    }

    async function startBatchProcessing() {
        const plan = getActivePlan();
        const usedToday = getUsageToday();
        const remaining = plan.dailyLimit - usedToday;

        if (remaining <= 0) {
            showLimitModal(plan);
            return;
        }

        const filesToProcess = selectedFiles.slice(0, Math.min(selectedFiles.length, remaining));

        // Mudar UI para estado de processamento
        selectedFilesList.style.display = 'none';
        cardActionBar.style.display = 'none';
        processingBox.style.display = 'flex';
        logConsole.innerHTML = '';
        setProgress(0);

        const totalJobs = filesToProcess.length;
        statusTitle.textContent = `Processando ${totalJobs} criativo(s)...`;
        logToConsole(`Iniciando lote de ${totalJobs} arquivo(s) com plano ${plan.name}.`);
        logToConsole(`Limite diário: ${remaining} restantes hoje.`);

        try {
            const results = [];

            // Processar em série (WebAssembly é single-threaded por arquivo)
            for (let i = 0; i < filesToProcess.length; i++) {
                const result = await processSingleFile(filesToProcess[i], i, totalJobs);
                results.push(result);
                setProgress(((i + 1) / totalJobs) * 100);
            }

            handleBatchSuccess(results);

        } catch(err) {
            handleBatchFailure(err.message);
        }
    }

    function handleBatchSuccess(results) {
        setProgress(100);
        logToConsole(`✓ Lote completo! ${results.length} arquivo(s) processado(s) com sucesso!`);

        setTimeout(() => {
            processingBox.style.display = 'none';
            completedBox.style.display = 'flex';

            const successIcon = document.getElementById('completed-success-icon');
            const failureIcon = document.getElementById('completed-failure-icon');
            if (successIcon) successIcon.style.display = 'block';
            if (failureIcon) failureIcon.style.display = 'none';

            completedBox.querySelector('h3').textContent =
                results.length > 1
                    ? `${results.length} Criativos Protegidos!`
                    : 'Vídeo Protegido com Sucesso!';

            completedBox.querySelector('p').textContent =
                results.length > 1
                    ? 'Todos os arquivos estão prontos. Clique para baixar cada um.'
                    : 'O arquivo já está pronto. Clique abaixo para fazer o download.';

            btnDownloadResult.style.display = 'inline-flex';
            btnRestart.textContent = 'Processar Mais';

            if (results.length === 1) {
                btnDownloadResult.textContent = 'Baixar Vídeo Hacked';
                btnDownloadResult.onclick = () => triggerDownload(results[0].downloadUrl, results[0].file.name);
            } else {
                btnDownloadResult.textContent = `⬇ Baixar Todos (${results.length})`;
                btnDownloadResult.onclick = () => {
                    results.forEach((r, i) => {
                        setTimeout(() => triggerDownload(r.downloadUrl, r.file.name), i * 500);
                    });
                };

                // Mostrar botões individuais de download
                const extraBtns = document.createElement('div');
                extraBtns.style.cssText = 'display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 12px;';
                results.forEach(r => {
                    const btn = document.createElement('button');
                    btn.className = 'btn btn-outline btn-sm';
                    btn.textContent = `⬇ ${r.file.name.replace(/\.[^.]+$/, '__hacked$&')}`;
                    btn.onclick = () => triggerDownload(r.downloadUrl, r.file.name);
                    extraBtns.appendChild(btn);
                });
                completedBox.appendChild(extraBtns);
            }
        }, 600);
    }

    function handleBatchFailure(errorMsg) {
        logToConsole(`✗ Falha: ${errorMsg}`, true);
        setTimeout(() => {
            processingBox.style.display = 'none';
            completedBox.style.display = 'flex';

            const successIcon = document.getElementById('completed-success-icon');
            const failureIcon = document.getElementById('completed-failure-icon');
            if (successIcon) successIcon.style.display = 'none';
            if (failureIcon) failureIcon.style.display = 'flex';

            completedBox.querySelector('h3').textContent = 'Falha no Processamento';
            completedBox.querySelector('p').textContent = errorMsg;
            btnDownloadResult.style.display = 'none';
            btnRestart.textContent = 'Tentar Novamente';
        }, 600);
    }

    function triggerDownload(url, originalName) {
        const a = document.createElement('a');
        a.href = url;
        const lastDot = originalName.lastIndexOf('.');
        const name = originalName.substring(0, lastDot);
        const ext = originalName.substring(lastDot);
        a.download = `${name}__hacked${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            selectedFiles = [];
            if (fileInput) fileInput.value = '';
        if (voiceoverText) {
            voiceoverText.value = '';
        }
        if (charCounter) {
            charCounter.textContent = '0 / 400';
        }
        if (btnClearImage) {
            // Simula clique de remoção para limpar imagem selecionada
            btnClearImage.click();
        }


        // Resetar opacidade da imagem
        const opacityContainer = document.getElementById('image-opacity-container');
        if (opacityContainer) opacityContainer.style.display = 'none';
        const opacitySlider = document.getElementById('image-opacity-slider');
        if (opacitySlider) opacitySlider.value = 20;
        const opacityVal = document.getElementById('image-opacity-val');
        if (opacityVal) opacityVal.textContent = '20%';

        // Limpar botões extras de download que podem ter sido adicionados
        const extraBtns = completedBox.querySelector('div[style*="flex-direction: column"]');
        if (extraBtns) extraBtns.remove();

        completedBox.style.display = 'none';
        dropZone.style.display = 'block';
        selectedFilesList.innerHTML = '';
        selectedFilesList.style.display = 'none';
        cardActionBar.style.display = 'flex';
        updateProcessButtonState();
        applyPlanToUI();
    });
}

    if (voiceoverText && charCounter) {
        voiceoverText.addEventListener('input', () => {
            const count = voiceoverText.value.length;
            charCounter.textContent = `${count} / 400`;
            updateProcessButtonState();
        });
    }

    // Ouvintes para Imagem de Camuflagem
    if (imageDropzone && imageInputField) {
        imageDropzone.addEventListener('click', (e) => {
            if (e.target !== btnClearImage && e.target !== imageInputField) {
                imageInputField.click();
            }
        });

        imageInputField.addEventListener('change', () => {
            if (imageInputField.files.length > 0) {
                const file = imageInputField.files[0];
                if (!file.type.startsWith('image/')) {
                    showToast('⚠️ O arquivo selecionado precisa ser uma imagem.', 'error');
                    return;
                }
                selectedImageFile = file;
                imagePlaceholderText.textContent = `Imagem selecionada: ${file.name}`;
                imagePlaceholderText.style.color = '#FFFFFF';
                if (btnClearImage) btnClearImage.style.display = 'inline-block';
            }
        });
    }

    if (btnClearImage) {
        btnClearImage.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedImageFile = null;
            imageInputField.value = '';
            imagePlaceholderText.textContent = 'Clique para anexar imagem de Capa (Miniatura/Hash)';
            imagePlaceholderText.style.color = 'var(--text-dim)';
            btnClearImage.style.display = 'none';
        });
    }



    // ======================================================================= //
    //  IMAGE HUMANIZER INTEGRATION                                            //
    // ======================================================================= //
    const imgHumanizeDropzone = document.getElementById('image-humanize-dropzone');
    const imgHumanizeFileInput = document.getElementById('image-humanize-file-input');
    const humanizeSelectedImageInfo = document.getElementById('humanize-selected-image-info');
    const humanizePreviewImg = document.getElementById('humanize-preview-img');
    const humanizeFileName = document.getElementById('humanize-file-name');
    const humanizeFileSize = document.getElementById('humanize-file-size');
    const btnClearHumanizeImage = document.getElementById('btn-clear-humanize-image');
    const humanizeControlsContainer = document.getElementById('humanize-controls-container');
    const btnProcessImageAction = document.getElementById('btn-process-image-action');
    const imageProcessingBox = document.getElementById('image-processing-box');
    const imageProgressCircle = document.getElementById('image-progress-circle');
    const imageProgressPercentage = document.getElementById('image-progress-percentage');
    const imageStatusTitle = document.getElementById('image-status-title');
    const imageLogConsole = document.getElementById('image-log-console');
    const imageCompletedBox = document.getElementById('image-completed-box');
    const btnDownloadImageResult = document.getElementById('btn-download-image-result');
    const btnRestartImage = document.getElementById('btn-restart-image');
    const imageCardActionBar = document.getElementById('image-card-action-bar');

    let selectedHumanizeImage = null;
    let humanizeDownloadUrl = '';
    let humanizeDownloadName = '';

    // Setup progress circle for image
    const imageCircleRadius = imageProgressCircle ? imageProgressCircle.r.baseVal.value : 42;
    const imageCircumference = imageCircleRadius * 2 * Math.PI;
    if (imageProgressCircle) {
        imageProgressCircle.style.strokeDasharray = `${imageCircumference} ${imageCircumference}`;
        imageProgressCircle.style.strokeDashoffset = imageCircumference;
    }

    function setImageProgress(percent) {
        if (!imageProgressCircle || !imageProgressPercentage) return;
        const offset = imageCircumference - (percent / 100) * imageCircumference;
        imageProgressCircle.style.strokeDashoffset = offset;
        imageProgressPercentage.textContent = `${Math.round(percent)}%`;
    }

    function logToImageConsole(message, isError = false) {
        if (!imageLogConsole) return;
        const time = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.className = 'log-line';
        if (isError) line.style.color = '#ef4444';
        line.textContent = `[${time}] > ${message}`;
        imageLogConsole.appendChild(line);
        imageLogConsole.scrollTop = imageLogConsole.scrollHeight;
    }

    function updateHumanizeButtonState() {
        if (!btnProcessImageAction) return;
        if (selectedHumanizeImage) {
            btnProcessImageAction.classList.remove('disabled');
            btnProcessImageAction.removeAttribute('disabled');
        } else {
            btnProcessImageAction.classList.add('disabled');
            btnProcessImageAction.setAttribute('disabled', 'true');
        }
    }

    if (imgHumanizeDropzone && imgHumanizeFileInput) {
        imgHumanizeDropzone.addEventListener('click', () => {
            imgHumanizeFileInput.click();
        });

        imgHumanizeFileInput.addEventListener('change', () => {
            if (imgHumanizeFileInput.files.length > 0) {
                handleHumanizeImageSelection(imgHumanizeFileInput.files[0]);
            }
        });

        ['dragenter', 'dragover'].forEach(ev => {
            imgHumanizeDropzone.addEventListener(ev, (e) => {
                e.preventDefault();
                imgHumanizeDropzone.classList.add('active');
            }, false);
        });

        ['dragleave', 'drop'].forEach(ev => {
            imgHumanizeDropzone.addEventListener(ev, (e) => {
                e.preventDefault();
                imgHumanizeDropzone.classList.remove('active');
            }, false);
        });

        imgHumanizeDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            imgHumanizeDropzone.classList.remove('active');
            if (e.dataTransfer.files.length > 0) {
                handleHumanizeImageSelection(e.dataTransfer.files[0]);
            }
        });
    }

    function handleHumanizeImageSelection(file) {
        if (!file.type.startsWith('image/')) {
            showToast('⚠️ O arquivo selecionado precisa ser uma imagem.', 'error');
            return;
        }
        if (file.size > 15 * 1024 * 1024) {
            showToast('⚠️ A imagem excede o limite máximo de 15MB.', 'error');
            return;
        }

        selectedHumanizeImage = file;
        
        // Mostrar preview
        const reader = new FileReader();
        reader.onload = (e) => {
            if (humanizePreviewImg) humanizePreviewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);

        if (humanizeFileName) humanizeFileName.textContent = file.name;
        if (humanizeFileSize) humanizeFileSize.textContent = formatBytes(file.size);

        if (imgHumanizeDropzone) imgHumanizeDropzone.style.display = 'none';
        if (humanizeSelectedImageInfo) humanizeSelectedImageInfo.style.display = 'flex';
        if (humanizeControlsContainer) humanizeControlsContainer.style.display = 'flex';

        updateHumanizeButtonState();
    }

    if (btnClearHumanizeImage) {
        btnClearHumanizeImage.addEventListener('click', () => {
            selectedHumanizeImage = null;
            if (imgHumanizeFileInput) imgHumanizeFileInput.value = '';
            if (imgHumanizeDropzone) imgHumanizeDropzone.style.display = 'block';
            if (humanizeSelectedImageInfo) humanizeSelectedImageInfo.style.display = 'none';
            if (humanizeControlsContainer) humanizeControlsContainer.style.display = 'none';
            updateHumanizeButtonState();
        });
    }

    // Toggle para botões de intensidade
    const intensityLabels = document.querySelectorAll('input[name="humanize-intensity"]');
    intensityLabels.forEach(radio => {
        radio.addEventListener('change', () => {
            intensityLabels.forEach(r => r.closest('.intensity-switch-btn').classList.remove('active'));
            radio.closest('.intensity-switch-btn').classList.add('active');
        });
    });

    // Enviar arquivo para processamento
    if (btnProcessImageAction) {
        btnProcessImageAction.addEventListener('click', async () => {
            if (!selectedHumanizeImage) return;

            const activeIntensityRadio = document.querySelector('input[name="humanize-intensity"]:checked');
            const intensity = activeIntensityRadio ? activeIntensityRadio.value : 'medium';

            // Mudar UI para processando
            if (humanizeSelectedImageInfo) humanizeSelectedImageInfo.style.display = 'none';
            if (humanizeControlsContainer) humanizeControlsContainer.style.display = 'none';
            if (imageCardActionBar) imageCardActionBar.style.display = 'none';
            if (imageProcessingBox) imageProcessingBox.style.display = 'flex';
            if (imageLogConsole) imageLogConsole.innerHTML = '';
            
            setImageProgress(0);
            logToImageConsole(`Iniciando sanitização da imagem: ${selectedHumanizeImage.name}`);
            
            const formData = new FormData();
            formData.append('image', selectedHumanizeImage);
            formData.append('intensity', intensity);

            try {
                const response = await fetch('/api/humanize-image', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Falha no upload da imagem.');
                }

                const { task_id } = await response.json();
                logToImageConsole(`Tarefa criada no servidor. ID: ${task_id}`);

                let completed = false;
                while (!completed) {
                    await new Promise(r => setTimeout(r, 200));
                    const statusRes = await fetch(`/api/status/${task_id}`);
                    if (!statusRes.ok) {
                        throw new Error('Falha ao checar status da tarefa.');
                    }

                    const task = await statusRes.json();
                    if (task.status === 'processing' || task.status === 'pending') {
                        if (task.progress) {
                            setImageProgress(task.progress);
                        }
                        if (task.message) {
                            logToImageConsole(task.message);
                        }
                    } else if (task.status === 'completed') {
                        completed = true;
                        setImageProgress(100);
                        logToImageConsole('✓ Processamento concluído com sucesso!');
                        
                        humanizeDownloadUrl = `/api/download/${task_id}`;
                        humanizeDownloadName = selectedHumanizeImage.name.replace(/\.[^.]+$/, '') + '__humanized.jpg';

                        setTimeout(() => {
                            if (imageProcessingBox) imageProcessingBox.style.display = 'none';
                            if (imageCompletedBox) imageCompletedBox.style.display = 'flex';
                        }, 500);
                    } else if (task.status === 'failed') {
                        throw new Error(task.message || 'Falha na humanização.');
                    }
                }

            } catch (err) {
                logToImageConsole(`✗ Erro: ${err.message}`, true);
                showToast(`Erro no processamento da imagem: ${err.message}`, 'error');
                setTimeout(() => {
                    if (imageProcessingBox) imageProcessingBox.style.display = 'none';
                    if (imageCardActionBar) imageCardActionBar.style.display = 'flex';
                    if (humanizeSelectedImageInfo) humanizeSelectedImageInfo.style.display = 'flex';
                    if (humanizeControlsContainer) humanizeControlsContainer.style.display = 'flex';
                }, 1000);
            }
        });
    }

    if (btnDownloadImageResult) {
        btnDownloadImageResult.addEventListener('click', () => {
            if (!humanizeDownloadUrl) return;
            const a = document.createElement('a');
            a.href = humanizeDownloadUrl;
            a.download = humanizeDownloadName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    if (btnRestartImage) {
        btnRestartImage.addEventListener('click', () => {
            selectedHumanizeImage = null;
            if (imgHumanizeFileInput) imgHumanizeFileInput.value = '';
            if (imageCompletedBox) imageCompletedBox.style.display = 'none';
            if (imgHumanizeDropzone) imgHumanizeDropzone.style.display = 'block';
            if (imageCardActionBar) imageCardActionBar.style.display = 'flex';
            updateHumanizeButtonState();
        });
    }

    // Ouvinte para o slider de opacidade
    const imageOpacitySlider = document.getElementById('image-opacity-slider');
    const imageOpacityVal = document.getElementById('image-opacity-val');
    if (imageOpacitySlider && imageOpacityVal) {
        imageOpacitySlider.addEventListener('input', () => {
            imageOpacityVal.textContent = `${imageOpacitySlider.value}%`;
        });
    }

    // ======================================================================= //
    //  HELPERS                                                                 //
    // ======================================================================= //
    function formatBytes(bytes, decimals = 1) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }

    // ======================================================================= //
    //  CHECKOUT MODAL + ATIVAÇÃO DE PLANO                                     //
    // ======================================================================= //
    function openCheckoutModal(planId, planName, price) {
        if (modalPlanBadge) modalPlanBadge.textContent = planName;
        if (modalPlanPrice) modalPlanPrice.textContent = price;
        if (paymentSuccessMsg) paymentSuccessMsg.style.display = 'none';
        if (btnMockPay) {
            btnMockPay.style.display = 'block';
            btnMockPay.textContent = planId === 'free'
                ? 'Usar Gratuitamente'
                : 'Confirmar Pagamento Simulado';
            btnMockPay.removeAttribute('disabled');
            btnMockPay.onclick = null;
        }
        checkoutModal.classList.add('active');

        // Armazenar qual plano está sendo ativado
        checkoutModal.dataset.planId = planId;
    }
    window.openCheckoutModalGlobal = openCheckoutModal;

    function closeCheckoutModal() {
        checkoutModal.classList.remove('active');
    }

    function getSelectedBillingPeriod() {
        const activeSwitch = document.querySelector('.switch-btn.active');
        return activeSwitch ? activeSwitch.getAttribute('data-period') : 'monthly';
    }

    if (btnPricingHobby) {
        btnPricingHobby.addEventListener('click', () => {
            window.location.href = '/auth';
        });
    }
    if (btnPricingCreator) {
        btnPricingCreator.addEventListener('click', () => {
            window.location.href = '/auth';
        });
    }
    if (btnPricingPro) {
        btnPricingPro.addEventListener('click', () => {
            window.location.href = '/auth';
        });
    }
    if (btnPricingEnterprise) {
        btnPricingEnterprise.addEventListener('click', () => {
            window.location.href = '/auth';
        });
    }

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeCheckoutModal);
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) closeCheckoutModal();
        });
    }

    if (btnMockPay) {
        btnMockPay.addEventListener('click', () => {
            if (btnMockPay.onclick) return;

            const planId = checkoutModal.dataset.planId || 'free';
            btnMockPay.setAttribute('disabled', 'true');
            btnMockPay.textContent = planId === 'free'
                ? 'Ativando plano gratuito...'
                : 'Processando transação criptografada...';

            setTimeout(() => {
                setActivePlan(planId);
                btnMockPay.style.display = 'none';
                if (paymentSuccessMsg) {
                    const plan = PLANS[planId];
                    paymentSuccessMsg.style.display = 'block';
                    paymentSuccessMsg.textContent = planId === 'free'
                        ? '✓ Bem-vindo! Plano Gratuito ativo.'
                        : `✓ Pagamento aprovado! Plano ${plan.name} ativado.`;
                }
                showToast(`🎉 Plano ${PLANS[planId].name} ativado com sucesso!`, 'success');
                setTimeout(closeCheckoutModal, 2000);
            }, planId === 'free' ? 500 : 2000);
        });
    }

    // ======================================================================= //
    //  AUTH MODAL - Wire-up                                                   //
    // ======================================================================= //
    window.showToast = showToast; // expor para bvLogout

    const authOverlay    = document.getElementById('auth-modal-overlay');
    const authModalClose = document.getElementById('auth-modal-close');
    const btnOpenLogin   = document.getElementById('btn-open-login');
    const btnOpenRegister = document.getElementById('btn-open-register');
    const btnLogout      = document.getElementById('btn-logout');
    const authTabLogin   = document.getElementById('auth-tab-login');
    const authTabReg     = document.getElementById('auth-tab-register');
    const panelLogin     = document.getElementById('auth-panel-login');
    const panelReg       = document.getElementById('auth-panel-register');
    const loginError     = document.getElementById('login-error');
    const regError       = document.getElementById('register-error');

    function openAuthModal(tab = 'login') {
        authOverlay.style.display = 'flex';
        switchTab(tab);
    }
    function closeAuthModal() {
        authOverlay.style.display = 'none';
    }

    function switchTab(tab) {
        authTabLogin.classList.toggle('active', tab === 'login');
        authTabReg.classList.toggle('active', tab === 'register');
        panelLogin.classList.toggle('active', tab === 'login');
        panelReg.classList.toggle('active', tab === 'register');
        if (loginError) loginError.style.display = 'none';
        if (regError) regError.style.display = 'none';
    }

    function showAuthError(el, msg) {
        el.textContent = msg;
        el.style.display = 'block';
    }

    function onAuthSuccess(user) {
        closeAuthModal();
        bvSetUser(user);
        showToast(`👋 Bem-vindo, ${user.name ? user.name.split(' ')[0] : 'usuário'}!`, 'success');
    }

    // Abrir modal ao clicar em "Entrar" ou "Cadastrar"
    if (btnOpenLogin)    btnOpenLogin.addEventListener('click', () => openAuthModal('login'));
    if (btnOpenRegister) btnOpenRegister.addEventListener('click', () => openAuthModal('register'));

    // Fechar modal
    if (authModalClose) authModalClose.addEventListener('click', closeAuthModal);
    if (authOverlay) authOverlay.addEventListener('click', (e) => { if (e.target === authOverlay) closeAuthModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAuthModal(); });

    // Trocar abas
    if (authTabLogin) authTabLogin.addEventListener('click', () => switchTab('login'));
    if (authTabReg)   authTabReg.addEventListener('click',   () => switchTab('register'));

    // Sair
    if (btnLogout) btnLogout.addEventListener('click', bvLogout);

    // ── Login com Google (redireciona para Firebase Auth real) ──
    const handleGoogle = () => {
        window.location.href = '/auth';
    };
    document.getElementById('btn-google-login')?.addEventListener('click', handleGoogle);
    document.getElementById('btn-google-register')?.addEventListener('click', handleGoogle);

    // ── Continuar sem conta ──
    const handleContinueFree = () => {
        closeAuthModal();
        showToast('🔓 Acessando no modo gratuito — 3 usos por mês.', 'info');
        document.getElementById('app-section')?.scrollIntoView({ behavior: 'smooth' });
    };
    document.getElementById('btn-continue-free')?.addEventListener('click', handleContinueFree);
    document.getElementById('btn-continue-free-register')?.addEventListener('click', handleContinueFree);

    // ── Login por e-mail ──
    document.getElementById('btn-do-login')?.addEventListener('click', () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!bvValidEmail(email)) { showAuthError(loginError, 'E-mail inválido.'); return; }
        if (password.length < 6)  { showAuthError(loginError, 'Senha deve ter ao menos 6 caracteres.'); return; }

        // Verificar se email já está cadastrado no localStorage
        const accounts = JSON.parse(localStorage.getItem('bv_accounts') || '{}');
        if (!accounts[email]) {
            showAuthError(loginError, 'E-mail não encontrado. Crie uma conta primeiro.');
            return;
        }
        if (accounts[email].password !== btoa(password)) {
            showAuthError(loginError, 'Senha incorreta.');
            return;
        }

        const user = { name: accounts[email].name, email, provider: 'email' };
        onAuthSuccess(user);
    });

    // ── Registro por e-mail ──
    document.getElementById('btn-do-register')?.addEventListener('click', () => {
        const name     = document.getElementById('register-name').value.trim();
        const email    = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        if (!name)                 { showAuthError(regError, 'Digite seu nome completo.'); return; }
        if (!bvValidEmail(email))  { showAuthError(regError, 'E-mail inválido.'); return; }
        if (password.length < 6)   { showAuthError(regError, 'Senha deve ter ao menos 6 caracteres.'); return; }

        const accounts = JSON.parse(localStorage.getItem('bv_accounts') || '{}');
        if (accounts[email]) {
            showAuthError(regError, 'E-mail já cadastrado. Faça login.');
            switchTab('login');
            return;
        }

        // Salvar conta
        accounts[email] = { name, password: btoa(password) };
        localStorage.setItem('bv_accounts', JSON.stringify(accounts));

        const user = { name, email, provider: 'email' };
        onAuthSuccess(user);
    });



    // Inicializar navbar conforme estado já salvo
    bvUpdateNavbar();
});
