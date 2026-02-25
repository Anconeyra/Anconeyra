/* ============================================
   ANCONEYRA SECURITY PORTFOLIO
   Terminal JavaScript - Enhanced Version
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        bootSpeed: 80,
        bootLines: [
            '<i class="fas fa-power-off"></i> INICIANDO SISTEMA...',
            '<i class="fas fa-shield-cat"></i> CARGANDO MÓDULOS DE SEGURIDAD... <span class="status-ok"><i class="fas fa-check"></i> OK</span>',
            '<i class="fas fa-file-shield"></i> VERIFICANDO INTEGRIDAD... <span class="status-ok"><i class="fas fa-check"></i> OK</span>',
            '<i class="fas fa-lock"></i> ESTABLECIENDO CONEXIÓN SEGURA... <span class="status-ok"><i class="fas fa-check"></i> OK</span>',
            '<i class="fas fa-palette"></i> CARGANDO TEMA PINK/ORANGE... <span class="status-ok"><i class="fas fa-check"></i> OK</span>',
            '<i class="fas fa-icons"></i> INICIALIZANDO ICONOS... <span class="status-ok"><i class="fas fa-check"></i> OK</span>',
            '<i class="fas fa-terminal"></i> CARGANDO INTERFAZ... <span class="status-ok"><i class="fas fa-check"></i> OK</span>',
            '',
            '<span class="highlight">╔════════════════════════════════════════╗</span>',
            '<span class="highlight">║</span>  Portfolio de FRANK ANCONEYRA        <span class="highlight">║</span>',
            '<span class="highlight">║</span>  Fullstack Cloud & Security Researcher <span class="highlight">║</span>',
            '<span class="highlight">╚════════════════════════════════════════╝</span>',
            '',
            'Este sistema está monitoreado. Todas las interacciones quedan registradas.',
            '',
            'Escribe <code class="command">help</code> para listar comandos disponibles.'
        ],
        easterEggs: {
            flag: 'CTF{w3lc0m3_t0_4nc0n3yr4_p1nk_0r4ng3_p0rtf0l10_2026}',
            matrix: true,
            sudo: true,
            rmrf: true
        }
    };

    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const state = {
        commandHistory: [],
        historyIndex: -1,
        matrixActive: false,
        matrixAnimation: null,
        matrixMode: 1,
        bootComplete: false,
        startTime: Date.now(),
        particlesActive: true
    };

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const elements = {};

    function initElements() {
        elements.bootScreen = document.getElementById('boot-screen');
        elements.bootContent = document.getElementById('boot-content');
        elements.mainInterface = document.getElementById('main-interface');
        elements.terminalOutput = document.getElementById('terminal-output');
        elements.commandInput = document.getElementById('command-input');
        elements.matrixCanvas = document.getElementById('matrix-canvas');
        elements.currentYear = document.getElementById('current-year');
        elements.lastLogin = document.getElementById('last-login');
        elements.particlesContainer = document.getElementById('particles-container');
    }

    // ============================================
    // BOOT SEQUENCE
    // ============================================
    async function runBootSequence() {
        const bootContent = elements.bootContent;
        bootContent.innerHTML = '';

        for (let i = 0; i < CONFIG.bootLines.length; i++) {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.innerHTML = CONFIG.bootLines[i];
            bootContent.appendChild(line);
            bootContent.scrollTop = bootContent.scrollHeight;
            await sleep(CONFIG.bootSpeed);
        }

        await sleep(800);
        elements.bootScreen.classList.add('hidden');
        elements.mainInterface.classList.remove('hidden');
        elements.commandInput.focus();
        state.bootComplete = true;
        
        createParticles();
        startUptimeTimer();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ============================================
    // PARTICLES EFFECT
    // ============================================
    function createParticles() {
        if (!elements.particlesContainer) return;
        
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            elements.particlesContainer.appendChild(particle);
        }
    }

    // ============================================
    // UPTIME TIMER
    // ============================================
    function startUptimeTimer() {
        const uptimeElement = document.getElementById('uptime');
        if (!uptimeElement) return;

        setInterval(() => {
            const now = Date.now();
            const diff = now - state.startTime;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            uptimeElement.textContent = `${days} days, ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // ============================================
    // COMMAND PROCESSING
    // ============================================
    const commands = {
        'help': cmdHelp,
        'clear': cmdClear,
        'cls': cmdClear,
        'history': cmdHistory,
        'h': cmdHistory,
        'date': cmdDate,
        'time': cmdDate,
        'uname': cmdUname,
        'whoami': cmdWhoamiSimple,
        'ls': cmdLs,
        'dir': cmdLs,
        'cat': cmdCat,
        'sudo': cmdSudo,
        'rm': cmdRm,
        'matrix': () => cmdMatrix(1),
        'matrix2': () => cmdMatrix(2),
        'matrix3': () => cmdMatrix(3),
        'echo': cmdEcho,
        'neofetch': cmdNeofetch,
        'exit': cmdExit,
        'quit': cmdExit,
        './whoami': cmdModuleWhoami,
        './skills.sh': cmdModuleSkills,
        './projects.log': cmdModuleProjects,
        './contact.gpg': cmdModuleContact,
        'skills': cmdModuleSkills,
        'projects': cmdModuleProjects,
        'contact': cmdModuleContact,
        'about': cmdModuleWhoami,
        // New commands
        'banner': cmdBanner,
        'status': cmdStatus,
        'social': cmdSocial,
        'github': cmdGithub,
        'linkedin': cmdLinkedin,
        'email': cmdEmail,
        'qr': cmdQR,
        'version': cmdVersion,
        'info': cmdInfo,
        'hack': cmdHack,
        'cowsay': cmdCowsay
    };

    function processCommand(input) {
        const trimmedInput = input.trim();
        
        if (!trimmedInput) {
            return;
        }

        state.commandHistory.push(trimmedInput);
        state.historyIndex = state.commandHistory.length;

        appendOutput(`\n<span class="prompt"><i class="fas fa-chevron-right"></i></span> ${trimmedInput}\n`);

        const parts = trimmedInput.split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (commands[command]) {
            commands[command](args);
        } else if (trimmedInput.startsWith('./')) {
            appendOutput(get404Template());
        } else {
            appendOutput(get404Template());
        }

        scrollToBottom();
    }

    // ============================================
    // COMMAND IMPLEMENTATIONS
    // ============================================

    function cmdHelp() {
        appendOutput(getTemplate('help-template'));
    }

    function cmdClear() {
        const children = Array.from(elements.terminalOutput.children);
        children.forEach((child, index) => {
            if (!child.classList.contains('welcome-message') &&
                !child.classList.contains('system-status') &&
                !child.classList.contains('welcome-text') &&
                !child.classList.contains('command-input-line') &&
                index > 0) {
                child.style.opacity = '0';
                child.style.transform = 'translateX(-20px)';
                child.style.transition = 'all 0.3s ease';
                setTimeout(() => child.remove(), 300);
            }
        });
        appendOutput('<span style="color: var(--primary-pink);"><i class="fas fa-broom"></i> Terminal limpiada exitosamente...</span>\n');
    }

    function cmdHistory() {
        if (state.commandHistory.length === 0) {
            appendOutput('> Historial vacío.\n');
            return;
        }
        appendOutput('<h3 style="color: var(--primary-orange); margin: 16px 0;">> HISTORIAL DE COMANDOS:</h3>\n');
        state.commandHistory.forEach((cmd, index) => {
            appendOutput(`<span style="color: var(--text-dim);">${(index + 1).toString().padStart(3, '0')}</span>  ${cmd}\n`);
        });
    }

    function cmdDate() {
        const now = new Date();
        appendOutput(`<span style="color: var(--primary-pink);">> ${now.toLocaleString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })}</span>\n`);
    }

    function cmdUname(args) {
        if (args[0] === '-a') {
            appendOutput('> <span style="color: var(--primary-pink);">Linux anconeyra 5.15.0-generic #1 SMP x86_64 GNU/Linux</span>\n');
        } else {
            appendOutput('> <span style="color: var(--primary-pink);">Linux</span>\n');
        }
    }

    function cmdWhoamiSimple() {
        appendOutput('> <span class="highlight">anconeyra</span> (uid=1000, gid=1000, groups=1000(anconeyra),4(adm),27(sudo))\n');
    }

    function cmdLs(args) {
        if (args.includes('-la') || args.includes('-a')) {
            const date = new Date().toLocaleDateString('es-ES');
            appendOutput(`<span style="color: var(--primary-orange);">total 52</span>
<span style="color: var(--text-success);">drwxr-xr-x</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);">4096</span> ${date} <span style="color: var(--primary-coral);">.</span>
<span style="color: var(--text-success);">drwxr-xr-x</span>  <span style="color: var(--primary-pink);">1</span> root      root      <span style="color: var(--text-info);">4096</span> ${date} <span style="color: var(--primary-coral);">..</span>
<span style="color: var(--text-dim);">-rw-r--r--</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);"> 220</span> ${date} .bashrc
<span style="color: var(--text-dim);">-rw-r--r--</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);"> 807</span> ${date} .profile
<span style="color: var(--text-success);">drwxr-xr-x</span>  <span style="color: var(--primary-pink);">2</span> anconeyra anconeyra <span style="color: var(--text-info);">4096</span> ${date} <span style="color: var(--primary-coral);">.ssh</span>
<span style="color: var(--text-success);">drwxr-xr-x</span>  <span style="color: var(--primary-pink);">2</span> anconeyra anconeyra <span style="color: var(--text-info);">4096</span> ${date} <span style="color: var(--primary-coral);">.config</span>
<span style="color: var(--text-warning);">-rw-r--r--</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);">2.4K</span> ${date} <span style="color: var(--primary-orange);">cv.anconeyra.pdf</span>
<span style="color: var(--text-success);">-rwxr-xr-x</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);"> 156</span> ${date} <span style="color: var(--primary-orange);">whoami</span>
<span style="color: var(--text-success);">-rwxr-xr-x</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);"> 234</span> ${date} <span style="color: var(--primary-orange);">skills.sh</span>
<span style="color: var(--text-success);">-rwxr-xr-x</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);"> 312</span> ${date} <span style="color: var(--primary-orange);">projects.log</span>
<span style="color: var(--text-warning);">-rw-------</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);"> 896</span> ${date} <span style="color: var(--primary-orange);">contact.gpg</span>
<span style="color: var(--text-dim);">-rw-r--r--</span>  <span style="color: var(--primary-pink);">1</span> anconeyra anconeyra <span style="color: var(--text-info);">  42</span> ${date} <span style="color: var(--primary-coral);">flag.txt</span>
`);
        } else {
            appendOutput('<span style="color: var(--primary-orange);">cv.anconeyra.pdf</span>  <span style="color: var(--primary-orange);">whoami</span>  <span style="color: var(--primary-orange);">skills.sh</span>  <span style="color: var(--primary-orange);">projects.log</span>  <span style="color: var(--primary-orange);">contact.gpg</span>  <span style="color: var(--primary-coral);">flag.txt</span>\n');
        }
    }

    function cmdCat(args) {
        if (args[0] === 'flag.txt') {
            appendOutput(`<span style="color: var(--primary-orange); font-weight: bold;">> ${CONFIG.easterEggs.flag}</span>\n`);
        } else if (args[0] === '.bashrc') {
            appendOutput(`# ~/.bashrc: executed by bash(1) for non-login shells.

# Alias definitions
<span style="color: var(--text-success);">alias</span> <span style="color: var(--primary-pink);">ll</span>=<span style="color: var(--text-warning);">'ls -alF'</span>
<span style="color: var(--text-success);">alias</span> <span style="color: var(--primary-pink);">la</span>=<span style="color: var(--text-warning);">'ls -A'</span>
<span style="color: var(--text-success);">alias</span> <span style="color: var(--primary-pink);">l</span>=<span style="color: var(--text-warning);">'ls -CF'</span>

# Security tools path
<span style="color: var(--text-success);">export</span> <span style="color: var(--primary-pink);">PATH</span>=$PATH:/usr/local/go/bin
<span style="color: var(--text-success);">export</span> <span style="color: var(--primary-pink);">EDITOR</span>=vim

# Custom prompt
<span style="color: var(--text-success);">export</span> <span style="color: var(--primary-pink);">PS1</span>=<span style="color: var(--text-warning);">'\\[\\e[38;5;214m\\]\\u@\\h\\[\\e[0m\\]:\\[\\e[38;5;205m\\]\\w\\[\\e[0m\\]\\$ '</span>
`);
        } else if (!args[0]) {
            appendOutput('> Uso: cat [archivo]\n');
        } else {
            appendOutput(`> <span style="color: var(--text-error);">cat: ${args[0]}: No existe el archivo o directorio</span>\n`);
        }
    }

    function cmdEcho(args) {
        if (args.length > 0) {
            appendOutput(`> ${args.join(' ')}\n`);
        } else {
            appendOutput('> Uso: echo [mensaje]\n');
        }
    }

    function cmdSudo() {
        appendOutput('<span style="color: var(--text-error); font-weight: bold;">> Permission denied: You are not in the sudoers file.</span>\n');
        appendOutput('<span style="color: var(--text-warning);">> This incident will be reported.</span>\n');
    }

    function cmdRm(args) {
        if (args[0] === '-rf' && args[1] === '/') {
            appendOutput('<span style="color: var(--text-warning); font-size: 1.2rem;">> Nice try. But I have backups. 💾</span>\n');
            appendOutput('<span style="color: var(--primary-pink);">> Sistema reforzado. Este intento ha sido registrado. 🔒</span>\n');
        } else if (args[0] === '-rf') {
            appendOutput('<span style="color: var(--text-warning);">> ¿Estás seguro? Eso podría ser peligroso... 😏</span>\n');
        } else {
            appendOutput('> Uso: rm [opciones] [archivo]\n');
        }
    }

    function cmdMatrix(mode = 1) {
        state.matrixMode = mode;
        
        if (state.matrixActive) {
            state.matrixActive = false;
            elements.matrixCanvas.classList.remove('active');
            if (state.matrixAnimation) {
                cancelAnimationFrame(state.matrixAnimation);
            }
            appendOutput('<span style="color: var(--text-success);">> Matrix desactivada.</span>\n');
        } else {
            state.matrixActive = true;
            elements.matrixCanvas.classList.add('active');
            startMatrixEffect(mode);
            
            const modeNames = {1: 'Clásico', 2: 'Lluvia', 3: 'Símbolos'};
            appendOutput(`<span style="color: var(--text-success); font-size: 1.2rem;">> Entering the Matrix... Modo ${modeNames[mode]} 🕶</span>\n`);
            appendOutput('<span style="color: var(--text-dim);">> Escribe \'matrix\' nuevamente para salir.</span>\n');
        }
    }

    function cmdNeofetch() {
        appendOutput(getTemplate('neofetch-template'));
    }

    function cmdExit() {
        appendOutput('<span style="color: var(--text-warning);">> Nice try! But you\'re stuck here. 😄</span>\n');
        appendOutput('<span style="color: var(--text-dim);">> (This is a portfolio, not a real terminal)</span>\n');
    }

    function cmdModuleWhoami() {
        appendOutput(getTemplate('whoami-template'));
        setTimeout(() => {
            const img = document.querySelector('.profile-image');
            if (img) {
                img.onerror = function() {
                    this.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 250 250%22><rect fill=%22%231a1a2e%22 width=%22250%22 height=%22250%22/><text x=%22125%22 y=%22125%22 text-anchor=%22middle%22 fill=%22%23ff6b6b%22 font-size=%2280%22 font-weight=%22bold%22>FA</text><text x=%22125%22 y=%22220%22 text-anchor=%22middle%22 fill=%22%23ffa500%22 font-size=%2214%22>Anc0neyra</text></svg>';
                };
            }
        }, 100);
    }

    function cmdModuleSkills() {
        appendOutput(getTemplate('skills-template'));
    }

    function cmdModuleProjects() {
        appendOutput(getTemplate('projects-template'));
    }

    function cmdModuleContact() {
        appendOutput(getTemplate('contact-template'));
    }

    // ============================================
    // NEW COMMANDS IMPLEMENTATIONS
    // ============================================
    
    function cmdBanner() {
        const banner = `
<span style="color: var(--primary-pink); font-size: 1.1rem;">
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   <span style="color: var(--primary-orange);">█████╗</span> <span style="color: var(--primary-orange);">██╗</span>  <span style="color: var(--primary-orange);">██╗</span> <span style="color: var(--primary-orange);">███████╗</span> <span style="color: var(--primary-orange);">██╗</span>     <span style="color: var(--primary-orange);">██████╗</span> <span style="color: var(--primary-orange);">██╗</span>   <span style="color: var(--primary-orange);">██╗</span>    ║
║  <span style="color: var(--primary-orange);">██╔══██╗</span> <span style="color: var(--primary-orange);">██║</span>  <span style="color: var(--primary-orange);">██║</span> <span style="color: var(--primary-orange);">██╔════╝</span> <span style="color: var(--primary-orange);">██║</span>     <span style="color: var(--primary-orange);">██╔══██╗</span> <span style="color: var(--primary-orange);">╚██╗</span> <span style="color: var(--primary-orange);">██╔╝</span>    ║
║  <span style="color: var(--primary-orange);">███████║</span> <span style="color: var(--primary-orange);">███████║</span> <span style="color: var(--primary-orange);">█████╗</span>   <span style="color: var(--primary-orange);">██║</span>     <span style="color: var(--primary-orange);">██████╔╝</span>  <span style="color: var(--primary-orange);">╚████╔╝</span>     ║
║  <span style="color: var(--primary-orange);">██╔══██║</span> <span style="color: var(--primary-orange);">╚════██║</span> <span style="color: var(--primary-orange);">██╔══╝</span>   <span style="color: var(--primary-orange);">██║</span>     <span style="color: var(--primary-orange);">██╔══██╗</span>   <span style="color: var(--primary-orange);">╚██╔╝</span>      ║
║  <span style="color: var(--primary-orange);">██║</span>  <span style="color: var(--primary-orange);">██║</span>      <span style="color: var(--primary-orange);">██║</span> <span style="color: var(--primary-orange);">███████╗</span> <span style="color: var(--primary-orange);">███████╗</span> <span style="color: var(--primary-orange);">██║</span>  <span style="color: var(--primary-orange);">██║</span>    <span style="color: var(--primary-orange);">██║</span>       ║
║  <span style="color: var(--primary-orange);">╚═╝</span>  <span style="color: var(--primary-orange);">╚═╝</span>      <span style="color: var(--primary-orange);">╚═╝</span> <span style="color: var(--primary-orange);">╚══════╝</span> <span style="color: var(--primary-orange);">╚══════╝</span> <span style="color: var(--primary-orange);">╚═╝</span>  <span style="color: var(--primary-orange);">╚═╝</span>    <span style="color: var(--primary-orange);">╚═╝</span>       ║
║                                                               ║
║        <span style="color: var(--primary-coral);">FULLSTACK CLOUD & SECURITY RESEARCHER</span>              ║
║        <span style="color: var(--primary-coral);">🇵🇪 Perú | 💼 Freelance | 🔐 Security</span>               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
</span>
`;
        appendOutput(banner);
    }
    
    function cmdStatus() {
        const status = `
<span style="color: var(--primary-pink); font-weight: bold;">
╭────────────────────────────────────────────────────────────╮
│  <i class="fas fa-signal"></i> ESTADO DEL SISTEMA                         │
├────────────────────────────────────────────────────────────┤
│  <i class="fas fa-circle" style="color: #98fb98; font-size: 8px;"></i> Servidor: <span style="color: #98fb98;">● EN LÍNEA</span>                          │
│  <i class="fas fa-circle" style="color: #ffa500; font-size: 8px;"></i> Proyectos: <span style="color: #ffa500;">● DISPONIBLE</span>                        │
│  <i class="fas fa-circle" style="color: #87ceeb; font-size: 8px;"></i> Freelance: <span style="color: #87ceeb;">● ABIERTO</span>                            │
│  <i class="fas fa-circle" style="color: #ff6b6b; font-size: 8px;"></i> Bug Bounty: <span style="color: #ff6b6b;">● ACTIVO EN VDP</span>                      │
├────────────────────────────────────────────────────────────┤
│  <i class="fas fa-clock"></i> Respuesta promedio: 24-48 horas                  │
│  <i class="fas fa-calendar"></i> Última actualización: Febrero 2026            │
╰────────────────────────────────────────────────────────────╯
</span>
`;
        appendOutput(status);
    }
    
    function cmdSocial() {
        appendOutput(getTemplate('social-template'));
    }
    
    function cmdGithub() {
        const github = `
<span style="color: var(--primary-orange); font-weight: bold;">
╭────────────────────────────────────────────────────────────╮
│  <i class="fab fa-github"></i> GITHUB                                         │
├────────────────────────────────────────────────────────────┤
│  👤 Usuario: <span style="color: var(--primary-pink);">@nynaroot</span>                               │
│  🔗 URL: <span style="color: var(--primary-coral);">github.com/nynaroot</span>                          │
│  📊 Repositorios: <span style="color: #98fb98;">Públicos</span>                                 │
│  💼 Proyectos: <span style="color: var(--primary-coral);">Fullstack, Security, Tools</span>                │
├────────────────────────────────────────────────────────────┤
│  <a href="https://github.com/nynaroot" target="_blank" class="action-link" style="color: var(--primary-pink); text-decoration: underline;">
│     <i class="fas fa-external-link-alt"></i> Abrir GitHub →
│  </a>                                                      │
╰────────────────────────────────────────────────────────────╯
</span>
`;
        appendOutput(github);
    }
    
    function cmdLinkedin() {
        const linkedin = `
<span style="color: var(--primary-orange); font-weight: bold;">
╭────────────────────────────────────────────────────────────╮
│  <i class="fab fa-linkedin"></i> LINKEDIN                                       │
├────────────────────────────────────────────────────────────┤
│  👤 Perfil: <span style="color: var(--primary-pink);">Frank Anconeyra</span>                            │
│  🔗 URL: <span style="color: var(--primary-coral);">linkedin.com/in/frank-anconeyra</span>              │
│  💼 Estado: <span style="color: #98fb98;">Disponible para oportunidades</span>                  │
│  📍 Ubicación: <span style="color: var(--primary-coral);">Perú</span>                                   │
├────────────────────────────────────────────────────────────┤
│  <a href="https://linkedin.com/in/frank-anconeyra" target="_blank" class="action-link" style="color: var(--primary-pink); text-decoration: underline;">
│     <i class="fas fa-external-link-alt"></i> Abrir LinkedIn →
│  </a>                                                      │
╰────────────────────────────────────────────────────────────╯
</span>
`;
        appendOutput(linkedin);
    }
    
    function cmdEmail() {
        const email = `
<span style="color: var(--primary-orange); font-weight: bold;">
╭────────────────────────────────────────────────────────────╮
│  <i class="fas fa-envelope"></i> CORREOS ELECTRÓNICOS                           │
├────────────────────────────────────────────────────────────┤
│  📧 Institucional:                                          │
│     <span style="color: var(--primary-pink);">frank.anconeyra@tecsup.edu.pe</span>                  │
│                                                            │
│  📧 Personal:                                               │
│     <span style="color: var(--primary-pink);">anconeyrafsuyo@gmail.com</span>                       │
│                                                            │
│  📞 Teléfono: <span style="color: var(--primary-coral);">+51 917 394 464</span>                         │
├────────────────────────────────────────────────────────────┤
│  <a href="mailto:anconeyrafsuyo@gmail.com" class="action-link" style="color: var(--primary-pink); text-decoration: underline;">
│     <i class="fas fa-paper-plane"></i> Enviar correo →
│  </a>                                                      │
╰────────────────────────────────────────────────────────────╯
</span>
`;
        appendOutput(email);
    }
    
    function cmdQR() {
        const qr = `
<span style="color: var(--primary-pink); text-align: center;">
╭────────────────────────────────────────────────────────────╮
│  <i class="fas fa-qrcode"></i> CÓDIGO QR - CONTACTO RÁPIDO                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │
│         ▓▓                                        ▓▓       │
│         ▓▓    ████████  ████████  ████████     ▓▓       │
│         ▓▓    ██  ██  ██  ██  ██  ██  ██  ██   ▓▓       │
│         ▓▓    ████████  ████████  ████████     ▓▓       │
│         ▓▓    ██  ██  ██  ██  ██  ██  ██  ██   ▓▓       │
│         ▓▓    ████████  ████████  ████████     ▓▓       │
│         ▓▓                                        ▓▓       │
│         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       │
│                                                            │
│  <span style="color: var(--text-dim);">Escanea para contacto rápido</span>                      │
│                                                            │
╰────────────────────────────────────────────────────────────╯
</span>
`;
        appendOutput(qr);
    }
    
    function cmdVersion() {
        appendOutput(`
<span style="color: var(--primary-pink);">
╭────────────────────────────────────────────────────────────╮
│  <i class="fas fa-code-branch"></i> VERSIÓN                                     │
├────────────────────────────────────────────────────────────┤
│  Portfolio: <span style="color: var(--primary-orange);">v2.5.0</span> (2026 Edition)                  │
│  Build: <span style="color: var(--primary-coral);">Pink/Orange Theme</span>                           │
│  Framework: <span style="color: #98fb98;">Terminal Interactive</span>                       │
│  Author: <span style="color: var(--primary-pink);">Frank Anconeyra</span>                              │
╰────────────────────────────────────────────────────────────╯
</span>
`);
    }
    
    function cmdInfo() {
        const now = new Date();
        appendOutput(`
<span style="color: var(--primary-pink);">
╭────────────────────────────────────────────────────────────╮
│  <i class="fas fa-info-circle"></i> INFORMACIÓN DEL SISTEMA                     │
├────────────────────────────────────────────────────────────┤
│  <i class="fas fa-clock"></i> Fecha: <span style="color: var(--primary-orange);">${now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>  │
│  <i class="fas fa-hourglass-half"></i> Hora: <span style="color: var(--primary-orange);">${now.toLocaleTimeString('es-ES')}</span>                       │
│  <i class="fas fa-user"></i> Usuario: <span style="color: var(--primary-coral);">Visitante</span>                         │
│  <i class="fas fa-browser"></i> Navegador: <span style="color: var(--primary-coral);">${navigator.userAgent.split(' ').pop()}</span>         │
│  <i class="fas fa-desktop"></i> Pantalla: <span style="color: var(--primary-coral);">${window.innerWidth}x${window.innerHeight}</span>                  │
╰────────────────────────────────────────────────────────────╯
</span>
`);
    }
    
    function cmdHack() {
        const hack = `
<span style="color: var(--primary-pink);">
     <i class="fas fa-user-secret"></i> INICIANDO MODO HACKER...
     
     <span style="color: var(--primary-orange);">[▓▓▓▓▓▓▓▓▓▓] 100%</span> Cargando herramientas...
     <span style="color: var(--primary-orange);">[▓▓▓▓▓▓▓▓▓▓] 100%</span> Estableciendo conexión segura...
     <span style="color: var(--primary-orange);">[▓▓▓▓▓▓▓▓▓▓] 100%</span> Bypassing firewalls...
     <span style="color: var(--primary-orange);">[▓▓▓▓▓▓▓▓▓▓] 100%</span> Injecting payloads...
     <span style="color: var(--primary-orange);">[▓▓▓▓▓▓▓▓▓▓] 100%</span> Escalating privileges...
     
     <span style="color: #98fb98; font-weight: bold;">✓ ACCESO CONCEDIDO</span>
     
     <span style="color: var(--text-dim);">"Con gran poder viene gran responsabilidad"</span>
     <span style="color: var(--text-dim);">- Uncle Ben</span>
</span>
`;
        appendOutput(hack);
    }
    
    function cmdCowsay() {
        const messages = [
            "¡Bienvenido al portfolio!",
            "¡Hack the Planet!",
            "Stay Curious. Stay Secure.",
            "¡Explora todos los comandos!",
            "¡Que la fuerza te acompañe!"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        
        const cowsay = `
<span style="color: var(--primary-orange);">
 _________________________________
< ${randomMsg} >
 ---------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</span>
`;
        appendOutput(cowsay);
    }

    // ============================================
    // OUTPUT MANAGEMENT
    // ============================================
    function appendOutput(html) {
        const inputLine = elements.terminalOutput.querySelector('.command-input-line');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        while (tempDiv.firstChild) {
            elements.terminalOutput.insertBefore(tempDiv.firstChild, inputLine);
        }
    }

    function scrollToBottom() {
        elements.terminalOutput.scrollTop = elements.terminalOutput.scrollHeight;
    }

    // ============================================
    // TEMPLATE HANDLING
    // ============================================
    function getTemplate(templateId) {
        const template = document.getElementById(templateId);
        if (template) {
            return template.innerHTML;
        }
        return '';
    }

    function get404Template() {
        return getTemplate('404-template');
    }

    // ============================================
    // MATRIX EFFECTS (3 Modes)
    // ============================================
    function startMatrixEffect(mode) {
        const canvas = elements.matrixCanvas;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        // Characters for different modes
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const symbols = '💀🔐🔑💻🛡️🔒🔓💾🔍🎯';
        
        let alphabet = katakana + latin + nums;
        if (mode === 3) {
            alphabet = symbols;
        }

        function draw() {
            if (!state.matrixActive) return;

            // Fade effect
            ctx.fillStyle = mode === 2 ? 'rgba(10, 10, 15, 0.1)' : 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Create gradient based on mode
            let gradient;
            if (mode === 1) {
                gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#ff6b6b');
                gradient.addColorStop(1, '#ffa500');
            } else if (mode === 2) {
                gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#00ff00');
                gradient.addColorStop(0.5, '#00cc00');
                gradient.addColorStop(1, 'transparent');
            } else {
                gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#ff00ff');
                gradient.addColorStop(0.5, '#00ffff');
                gradient.addColorStop(1, '#ffff00');
            }

            ctx.fillStyle = gradient;
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                // Mode 3 uses emoji symbols
                if (mode === 3) {
                    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                    ctx.font = '20px monospace';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    ctx.font = fontSize + 'px monospace';
                } else {
                    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                }

                // Reset drop randomly when it goes off screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = Math.random() * -50;
                }
                
                // Different fall speeds for different modes
                const fallSpeed = mode === 2 ? 2 : 1;
                drops[i] += fallSpeed;
            }

            state.matrixAnimation = requestAnimationFrame(draw);
        }

        draw();
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    function initEventListeners() {
        elements.commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = elements.commandInput.value;
                elements.commandInput.value = '';
                processCommand(input);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (state.historyIndex > 0) {
                    state.historyIndex--;
                    elements.commandInput.value = state.commandHistory[state.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (state.historyIndex < state.commandHistory.length - 1) {
                    state.historyIndex++;
                    elements.commandInput.value = state.commandHistory[state.historyIndex];
                } else {
                    state.historyIndex = state.commandHistory.length;
                    elements.commandInput.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                autocompleteCommand();
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const command = link.getAttribute('data-command');
                if (command) {
                    elements.commandInput.value = command;
                    processCommand(command);
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (state.bootComplete && 
                !e.target.closest('a') && 
                !e.target.closest('.action-link') &&
                !e.target.closest('.btn') &&
                !e.target.closest('.contact-card')) {
                elements.commandInput.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (state.matrixActive) {
                elements.matrixCanvas.width = window.innerWidth;
                elements.matrixCanvas.height = window.innerHeight;
            }
        });
    }

    // ============================================
    // AUTOCOMPLETE
    // ============================================
    function autocompleteCommand() {
        const input = elements.commandInput.value.toLowerCase();
        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            elements.commandInput.value = matches[0];
        } else if (matches.length > 1) {
            appendOutput(`\n<span class="prompt"><i class="fas fa-chevron-right"></i></span> ${input}\n`);
            appendOutput(`<span style="color: var(--text-info);">> Posibles comandos:</span> <span style="color: var(--primary-orange);">${matches.join('  ')}</span>\n`);
        }
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    function updateFooter() {
        if (elements.currentYear) {
            elements.currentYear.textContent = new Date().getFullYear();
        }

        if (elements.lastLogin) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            elements.lastLogin.textContent = now.toLocaleDateString('es-ES', options);
        }
    }

    // ============================================
    // SECURITY FEATURES
    // ============================================
    function initSecurityFeatures() {
        const consoleWarning = `%c
   ╔═══════════════════════════════════════════════╗
   ║  ⚠️  SECURITY WARNING                      ║
   ╠═══════════════════════════════════════════════╣
   ║  This is a browser feature intended for     ║
   ║  developers. If someone told you to copy-     ║
   ║  paste something here, it is likely a scam.  ║
   ║                                               ║
   ║  Anconeyra Security Portfolio - Stay Safe    ║
   ╚═══════════════════════════════════════════════╝
        `;
        console.log(consoleWarning, 'color: #ff6b6b; font-size: 12px; font-family: monospace;');
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    async function init() {
        initElements();
        initEventListeners();
        initSecurityFeatures();
        updateFooter();

        await runBootSequence();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
