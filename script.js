/* ══════════════════════════════════════════════════════════════
   Haripriyan B A — Interactive Terminal Portfolio
   ══════════════════════════════════════════════════════════════ */

// ─── DOM References ────────────────────────────────────────────
const inputField   = document.getElementById('command-input');
const outputArea   = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
const hintBar      = document.getElementById('hint-bar');
const timeDisplay  = document.getElementById('current-time');

// ─── Profile Data ──────────────────────────────────────────────
const PROFILE = {
    name: "Haripriyan B A",
    title: "Cybersecurity Intern",
    college: "Sri Ramakrishna College of Arts and Science",
    location: "Coimbatore, Tamil Nadu",
    bio: "Enthusiastic Cybersecurity undergraduate with hands-on experience in network security, digital forensics, penetration testing, and Python development. Skilled in security analysis using industry-standard tools including Kali Linux, Wireshark, Nmap, Burp Suite, and Metasploit. Passionate about solving real-world security challenges through projects and Capture The Flag competitions while continuously expanding technical expertise. Eager to contribute to a cybersecurity-focused organization with a strong learning mindset and analytical approach.",
    linkedin: "https://www.linkedin.com/in/haripriyan-b-a-5a98a7315",
    github: "https://github.com/Dany-6",
    email: "baharipriyan788@gmail.com"
};

const PROJECTS = [
    {
        name: "PyroWall",
        lang: "Python",
        stars: 2,
        desc: "A Python-based stateful firewall using socket programming and TCP/IP networking.",
        url: "https://github.com/Dany-6/pyrowall"
    },
    {
        name: "Phalanx Check",
        lang: "Python",
        stars: 0,
        desc: "A phishing simulation platform with ethical safeguards and audit logging.",
        url: "https://github.com/Dany-6"
    },
    {
        name: "ChainRaptor",
        lang: "Python",
        stars: 1,
        desc: "An AI-assisted penetration testing framework integrating LLM capabilities.",
        url: "https://github.com/Dany-6/ChainRaptor"
    },
    {
        name: "Project IronLog",
        lang: "Go",
        stars: 1,
        desc: "A file integrity monitoring solution using eBPF, blockchain, and cryptographic verification.",
        url: "https://github.com/Dany-6/Project-IronLog"
    }
];

const SKILLS = [
    { name: "Python",               pct: 90, cat: "lang" },
    { name: "SQL",                  pct: 75, cat: "lang" },
    { name: "C / C++",              pct: 70, cat: "lang" },
    { name: "Go",                   pct: 65, cat: "lang" },
    { name: "JavaScript / HTML",    pct: 80, cat: "lang" },
    { name: "Network Security",     pct: 88, cat: "sec"  },
    { name: "Penetration Testing",  pct: 82, cat: "sec"  },
    { name: "Digital Forensics",    pct: 78, cat: "sec"  },
    { name: "Firewall / IDS",       pct: 85, cat: "sec"  },
    { name: "Phishing Simulation",  pct: 75, cat: "sec"  },
    { name: "Adobe Photoshop",      pct: 85, cat: "design" },
    { name: "Adobe Illustrator",    pct: 80, cat: "design" },
    { name: "Kali Linux / Arch",    pct: 85, cat: "tool" },
    { name: "Wireshark / Nmap",     pct: 85, cat: "tool" },
    { name: "Metasploit",           pct: 80, cat: "tool" },
    { name: "Burp Suite",           pct: 75, cat: "tool" },
    { name: "Git / GitHub",         pct: 88, cat: "tool" }
];

const ASCII_LOGO = `
 ██╗  ██╗ █████╗ ██████╗ ██╗██████╗ ██████╗ ██╗██╗   ██╗ █████╗ ███╗   ██╗
 ██║  ██║██╔══██╗██╔══██╗██║██╔══██╗██╔══██╗██║╚██╗ ██╔╝██╔══██╗████╗  ██║
 ███████║███████║██████╔╝██║██████╔╝██████╔╝██║ ╚████╔╝ ███████║██╔██╗ ██║
 ██╔══██║██╔══██║██╔══██╗██║██╔═══╝ ██╔══██╗██║  ╚██╔╝  ██╔══██║██║╚██╗██║
 ██║  ██║██║  ██║██║  ██║██║██║     ██║  ██║██║   ██║   ██║  ██║██║ ╚████║
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═══╝`;

// ─── Command History ───────────────────────────────────────────
let commandHistory = [];
let historyIndex = -1;

// ─── Time Display ──────────────────────────────────────────────
function updateTime() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateTime, 1000);
updateTime();

// ─── Particle Background ──────────────────────────────────────
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 157, ${0.06 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 157, ${p.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }
    draw();
})();

// ─── Helper Functions ──────────────────────────────────────────
function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function appendLine(html, cls = '') {
    const div = document.createElement('div');
    div.className = 'line' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    outputArea.appendChild(div);
    scrollToBottom();
}

function appendBlock(html) {
    const div = document.createElement('div');
    div.className = 'line';
    div.innerHTML = html;
    outputArea.appendChild(div);
    scrollToBottom();
}

function promptHTML() {
    return `<span class="prompt-user">guest</span><span class="prompt-at">@</span><span class="prompt-host">haripriyan</span><span class="prompt-colon">:</span><span class="prompt-path">~</span><span class="prompt-dollar">$</span>`;
}

async function typeText(text, speed = 30) {
    return new Promise(resolve => {
        const div = document.createElement('div');
        div.className = 'line';
        const cursor = document.createElement('span');
        cursor.className = 'typed-cursor';
        outputArea.appendChild(div);
        div.appendChild(cursor);

        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                div.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                scrollToBottom();
            } else {
                clearInterval(timer);
                cursor.remove();
                resolve();
            }
        }, speed);
    });
}

// ─── Command Definitions ───────────────────────────────────────
function cmdHelp() {
    appendLine(`<span class="section-title">▸ AVAILABLE COMMANDS</span>`);
    const cmds = [
        ['about',     'Who am I — bio, role, and background'],
        ['experience','Professional experience and internships'],
        ['skills',    'Technical skills with proficiency levels'],
        ['projects',  'Featured GitHub repositories'],
        ['education', 'Academic background'],
        ['certs',     'Certifications and awards'],
        ['contact',   'LinkedIn, GitHub, and email'],
        ['resume',    'Download / view my resume'],
        ['whoami',    'Display current user information'],
        ['date',      'Show current date and time'],
        ['neofetch',  'System info — hacker style'],
        ['banner',    'Show the ASCII art banner again'],
        ['history',   'View command history'],
        ['clear',     'Clear the terminal screen'],
        ['help',      'Show this help message'],
        ['exit',      'Exit the terminal'],
    ];
    cmds.forEach(([cmd, desc]) => {
        appendLine(`  <span class="success">${cmd.padEnd(12)}</span> <span class="dim">─</span> ${desc}`);
    });
    appendLine('');
}

function cmdAbout() {
    appendLine(`<span class="section-title">▸ ABOUT ME</span>`);
    appendLine('');
    appendLine(`  <span class="info-label">Name:</span>     <span class="highlight">${PROFILE.name}</span>`);
    appendLine(`  <span class="info-label">Role:</span>     ${PROFILE.title}`);
    appendLine(`  <span class="info-label">College:</span>  ${PROFILE.college}`);
    appendLine(`  <span class="info-label">Location:</span> ${PROFILE.location}`);
    appendLine('');
    appendLine(`  <span class="dim">"</span>${PROFILE.bio}<span class="dim">"</span>`);
    appendLine('');
}

function cmdSkills() {
    appendLine(`<span class="section-title">▸ TECHNICAL SKILLS</span>`);
    appendLine('');

    const cats = { lang: "Languages", sec: "Cybersecurity", design: "Graphic Design", tool: "Tools & Frameworks" };
    for (const [key, label] of Object.entries(cats)) {
        appendLine(`  <span class="highlight">⟫ ${label}</span>`);
        SKILLS.filter(s => s.cat === key).forEach(s => {
            const block = document.createElement('div');
            block.className = 'line';
            block.innerHTML = `
                <div class="skill-bar-container">
                    <span class="skill-name">  ${s.name}</span>
                    <div class="skill-bar"><div class="skill-fill" data-width="${s.pct}"></div></div>
                    <span class="skill-percent">${s.pct}%</span>
                </div>`;
            outputArea.appendChild(block);
        });
        appendLine('');
    }

    // Animate skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
        });
    }, 100);

    scrollToBottom();
}

function cmdProjects() {
    appendLine(`<span class="section-title">▸ FEATURED PROJECTS</span>`);
    appendLine('');

    PROJECTS.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'line';
        card.innerHTML = `
            <div class="project-card">
                <div>
                    <span class="project-name">▹ ${p.name}</span>
                    <span class="project-lang">${p.lang}</span>
                    <span class="dim" style="margin-left:8px">★ ${p.stars}</span>
                </div>
                <div class="project-desc">${p.desc}</div>
                <div style="margin-top:6px">
                    <a href="${p.url}" target="_blank" rel="noopener" class="project-link">⮡ ${p.url}</a>
                </div>
            </div>`;
        outputArea.appendChild(card);
    });
    appendLine('');
    appendLine(`  <span class="dim">To explore more projects, visit my GitHub:</span>`);
    appendLine(`  <a href="${PROFILE.github}" target="_blank" rel="noopener" class="link">→ ${PROFILE.github}</a>`);
    appendLine('');
    scrollToBottom();
}

function cmdContact() {
    appendLine(`<span class="section-title">▸ CONTACT & SOCIALS</span>`);
    appendLine('');
    appendLine(`  <span class="info-label">GitHub:</span>   <a href="${PROFILE.github}" target="_blank" rel="noopener" class="link">${PROFILE.github}</a>`);
    appendLine(`  <span class="info-label">LinkedIn:</span> <a href="${PROFILE.linkedin}" target="_blank" rel="noopener" class="link">${PROFILE.linkedin}</a>`);
    appendLine(`  <span class="info-label">Email:</span>    <span class="highlight">${PROFILE.email}</span>`);
    appendLine('');
    appendLine(`  <span class="dim">Feel free to reach out — I'm always open to opportunities!</span>`);
    appendLine('');
}

function cmdEducation() {
    appendLine(`<span class="section-title">▸ EDUCATION</span>`);
    appendLine('');
    appendLine(`  <span class="highlight">🎓 Sri Ramakrishna College of Arts and Science (SRCAS), Coimbatore</span>`);
    appendLine(`  <span class="dim">   Bachelor of Science in Computer Science with Cyber Security</span>`);
    appendLine(`  <span class="dim">   CGPA: 7.1 | 2024 – 2027</span>`);
    appendLine('');
    appendLine(`  <span class="highlight">🎓 Murugu Matric Higher Secondary School, Tiruppur</span>`);
    appendLine(`  <span class="dim">   XII Higher Secondary (State Board), 88% | 2024</span>`);
    appendLine('');
    appendLine(`  <span class="highlight">🎓 Malayapalayam Government Higher Secondary School, Erode</span>`);
    appendLine(`  <span class="dim">   X Secondary School (State Board), 60.2% | 2022</span>`);
    appendLine('');
}

function cmdExperience() {
    appendLine(`<span class="section-title">▸ EXPERIENCE</span>`);
    appendLine('');
    appendLine(`  <span class="highlight">💼 Cybersecurity Intern</span> <span class="dim">| PREFENZO Technologies, Coimbatore (May 2026 – June 2026)</span>`);
    appendLine(`     • Assisted in strengthening network security and defensive architecture initiatives.`);
    appendLine(`     • Performed packet analysis and monitored network traffic to identify potential vulnerabilities.`);
    appendLine(`     • Supported vulnerability assessment activities using industry-standard cybersecurity tools.`);
    appendLine(`     • Collaborated with security professionals to document findings and prepare security reports.`);
    appendLine(`     • Assisted in implementing security best practices on Linux-based systems.`);
    appendLine('');
    appendLine(`  <span class="highlight">💼 Project Contributor</span> <span class="dim">| Academic Cybersecurity Projects (2025 – Present)</span>`);
    appendLine(`     • Applied Python programming to automate cybersecurity workflows.`);
    appendLine(`     • Implemented secure coding practices across multiple security-focused applications.`);
    appendLine(`     • Practiced real-world attack simulation within ethical security boundaries.`);
    appendLine(`     • Applied multiple security technologies including AI, blockchain, eBPF, networking, and cryptography.`);
    appendLine('');
}

function cmdCerts() {
    appendLine(`<span class="section-title">▸ CERTIFICATIONS & AWARDS</span>`);
    appendLine('');
    appendLine(`  <span class="highlight">Certifications:</span>`);
    appendLine(`     • Google Career Certificate – Foundations of Cybersecurity (May 2026)`);
    appendLine(`     • Google Career Certificate – Play It Safe: Manage Security Risks (May 2026)`);
    appendLine(`     • Google Career Certificate – Connect and Protect: Networks and Network Security (May 2026)`);
    appendLine(`     • Security Blue Team – Introduction to PowerShell (June 2025)`);
    appendLine(`     • Security Blue Team – Introduction to Penetration Testing (May 2025)`);
    appendLine('');
    appendLine(`  <span class="highlight">Awards & Accomplishments:</span>`);
    appendLine(`     • Completed practical coursework in network security, ethical hacking, and digital forensics.`);
    appendLine(`     • Active participant in international CTF competitions including UMass CTF, Blue Hens CTF, and UDCTF.`);
    appendLine(`     • Experience creating UI mock-ups and visual designs using Adobe Photoshop and Illustrator.`);
    appendLine('');
}

function cmdResume() {
    appendLine(`<span class="section-title">▸ RESUME — HARIPRIYAN B A</span>`);
    appendLine('');

    // Header
    appendLine(`  <span class="highlight">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>`);
    appendLine(`  <span class="highlight" style="font-size:15px">  HARIPRIYAN B A</span>`);
    appendLine(`  <span class="dim">  ${PROFILE.title}</span>`);
    appendLine(`  <span class="dim">  ${PROFILE.email} • ${PROFILE.location}</span>`);
    appendLine(`  <span class="highlight">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>`);
    appendLine('');

    // Summary
    appendLine(`  <span class="success">▸ PROFESSIONAL SUMMARY</span>`);
    appendLine(`  ${PROFILE.bio}`);
    appendLine('');

    // Education
    appendLine(`  <span class="success">▸ EDUCATION</span>`);
    appendLine(`  <span class="info-label">Institution:</span> ${PROFILE.college}`);
    appendLine(`  <span class="info-label">Focus:</span>       Computer Science / Cybersecurity`);
    appendLine('');

    // Skills
    appendLine(`  <span class="success">▸ TECHNICAL SKILLS</span>`);
    const catLabels = { lang: "Languages", sec: "Cybersecurity", design: "Graphic Design", tool: "Tools & Frameworks" };
    for (const [key, label] of Object.entries(catLabels)) {
        const items = SKILLS.filter(s => s.cat === key).map(s => s.name).join(', ');
        appendLine(`  <span class="info-label">${label}:</span> ${items}`);
    }
    appendLine('');

    // Projects
    appendLine(`  <span class="success">▸ KEY PROJECTS</span>`);
    PROJECTS.forEach(p => {
        appendLine(`  <span class="info-label">• ${p.name}</span> <span class="dim">(${p.lang})</span>`);
        appendLine(`    ${p.desc}`);
    });
    appendLine('');

    // Links
    appendLine(`  <span class="success">▸ LINKS</span>`);
    appendLine(`  <span class="info-label">GitHub:</span>   <a href="${PROFILE.github}" target="_blank" class="link">${PROFILE.github}</a>`);
    appendLine(`  <span class="info-label">LinkedIn:</span> <a href="${PROFILE.linkedin}" target="_blank" class="link">${PROFILE.linkedin}</a>`);
    appendLine(`  <span class="info-label">Email:</span>    ${PROFILE.email}`);
    appendLine('');
    appendLine(`  <span class="highlight">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>`);
    appendLine('');

    // Download button
    appendLine(`  <span class="dim">Click below to view or download the original PDF:</span>`);
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'line';
    btnWrapper.innerHTML = `<a href="Haripriyan%20B%20A.pdf" target="_blank" class="resume-download-btn" style="text-decoration:none; display:inline-block; margin-top:10px;">⬇  Open Resume PDF</a>`;
    outputArea.appendChild(btnWrapper);
    appendLine('');
}

// ─── PDF Generation (uses jsPDF from CDN) ──────────────────────
function generateResumePDF() {
    // Dynamically load jsPDF if not loaded
    if (typeof window.jspdf === 'undefined') {
        appendLine(`  <span class="dim">Loading PDF engine...</span>`);
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => buildPDF();
        script.onerror = () => appendLine(`  <span class="error-text">Failed to load PDF library. Check internet connection.</span>`);
        document.head.appendChild(script);
    } else {
        buildPDF();
    }
}

function buildPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    let y = 20;
    const margin = 20;
    const lineH = 7;

    // Helper: add line with auto page-break
    function addLine(text, size, style, color) {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.setFontSize(size || 11);
        doc.setFont('helvetica', style || 'normal');
        if (color) doc.setTextColor(...color); else doc.setTextColor(40, 40, 40);
        doc.text(text, margin, y);
        y += lineH;
    }

    function addSectionHeader(text) {
        y += 3;
        if (y > 270) { doc.addPage(); y = 20; }
        doc.setDrawColor(0, 200, 130);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageW - margin, y);
        y += 5;
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 120, 80);
        doc.text(text, margin, y);
        y += lineH + 2;
    }

    // ── Header ──
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(PROFILE.name, margin, y);
    y += 9;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(PROFILE.title, margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.text(`${PROFILE.email}  |  ${PROFILE.location}  |  GitHub: github.com/Dany-6`, margin, y);
    y += 5;
    doc.text(`LinkedIn: linkedin.com/in/haripriyan-b-a-5a98a7315`, margin, y);
    y += 5;

    // ── Summary ──
    addSectionHeader('PROFESSIONAL SUMMARY');
    const summaryLines = doc.splitTextToSize(PROFILE.bio, pageW - 2 * margin);
    summaryLines.forEach(l => addLine(l));

    // ── Education ──
    addSectionHeader('EDUCATION');
    addLine(PROFILE.college, 11, 'bold');
    addLine('Computer Science / Cybersecurity');

    // ── Skills ──
    addSectionHeader('TECHNICAL SKILLS');
    const catLabels = { lang: 'Languages', sec: 'Cybersecurity', design: 'Graphic Design', tool: 'Tools & Frameworks' };
    for (const [key, label] of Object.entries(catLabels)) {
        const items = SKILLS.filter(s => s.cat === key).map(s => `${s.name} (${s.pct}%)`).join(', ');
        addLine(`${label}: ${items}`);
    }

    // ── Projects ──
    addSectionHeader('KEY PROJECTS');
    PROJECTS.forEach(p => {
        addLine(`${p.name} (${p.lang})`, 11, 'bold');
        const descLines = doc.splitTextToSize(p.desc, pageW - 2 * margin - 5);
        descLines.forEach(l => addLine('  ' + l, 10));
        y += 2;
    });

    // ── Footer ──
    y += 5;
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated from haripriyan.dev terminal portfolio', margin, y);

    // Save
    doc.save('Haripriyan_BA_Resume.pdf');
    appendLine(`  <span class="success">✓ Resume PDF downloaded successfully!</span>`);
    scrollToBottom();
}

function cmdWhoami() {
    appendLine(`<span class="success">guest</span> <span class="dim">— a curious visitor exploring Haripriyan's portfolio</span>`);
    appendLine('');
}

function cmdDate() {
    const now = new Date();
    appendLine(`<span class="info-value">${now.toString()}</span>`);
    appendLine('');
}

function cmdNeofetch() {
    const infoLines = [
        `<span class="info-label">guest</span><span class="dim">@</span><span class="highlight">haripriyan</span>`,
        `<span class="dim">──────────────────────</span>`,
        `<span class="info-label">OS:</span>      HaripriyanOS v2.0`,
        `<span class="info-label">Host:</span>    Terminal Portfolio`,
        `<span class="info-label">Kernel:</span>  Cybersec-Core 5.15`,
        `<span class="info-label">Shell:</span>   bash 5.1.16`,
        `<span class="info-label">Repos:</span>   5 public`,
        `<span class="info-label">Stars:</span>   7 total`,
        `<span class="info-label">Lang:</span>    Python, Go, JS`,
        `<span class="info-label">Focus:</span>   ${PROFILE.title}`,
        ``,
        `<span style="color:#f87171">██</span><span style="color:#fb923c">██</span><span style="color:#fbbf24">██</span><span style="color:#34d399">██</span><span style="color:#22d3ee">██</span><span style="color:#60a5fa">██</span><span style="color:#a78bfa">██</span><span style="color:#f472b6">██</span>`,
    ];
    const asciiArt = [
        `    ╭──────────────────╮`,
        `    │  ┌──┐    ┌──┐   │`,
        `    │  │▓▓│    │▓▓│   │`,
        `    │  └──┘    └──┘   │`,
        `    │                  │`,
        `    │    ╭────────╮    │`,
        `    │    ╰────────╯    │`,
        `    ╰──────────────────╯`,
        `       ╱╱╱╱╱╱╱╱╱╱╱╱`,
        `      ╱____________╱│`,
        `     │____________│ │`,
        `     │____________│╱`,
    ];

    appendLine('');
    for (let i = 0; i < Math.max(asciiArt.length, infoLines.length); i++) {
        const artPart = i < asciiArt.length ? `<span class="success">${asciiArt[i].padEnd(26)}</span>` : ' '.repeat(26);
        const infoPart = i < infoLines.length ? infoLines[i] : '';
        appendLine(`  ${artPart}  ${infoPart}`);
    }
    appendLine('');
}

function cmdBanner() {
    appendLine(`<div class="ascii-art">${ASCII_LOGO}</div>`);
}

function cmdHistory() {
    appendLine(`<span class="section-title">▸ COMMAND HISTORY</span>`);
    if (commandHistory.length === 0) {
        appendLine(`  <span class="dim">No commands in history yet.</span>`);
    } else {
        commandHistory.forEach((c, i) => {
            appendLine(`  <span class="dim">${String(i + 1).padStart(3)}</span>  ${c}`);
        });
    }
    appendLine('');
}

function cmdNotFound(cmd) {
    appendLine(`<span class="error-text">bash: ${cmd}: command not found</span>`);
    appendLine(`<span class="dim">Type 'help' to see available commands.</span>`);
    appendLine('');
}

function cmdExit() {
    appendLine(`<span class="info-value">Initiating shutdown sequence...</span>`);
    appendLine(`<span class="dim">Closing connection.</span>`);
    setTimeout(() => {
        window.close();
        // Fallback in case window.close() is blocked by browser policy
        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:#00ff9d;font-family:monospace;font-size:24px;background:#050505;">Session closed. You can safely close this tab.</div>';
    }, 1500);
}

// ─── Command Router ────────────────────────────────────────────
const COMMANDS = {
    help:      cmdHelp,
    about:     cmdAbout,
    experience: cmdExperience,
    skills:    cmdSkills,
    projects:  cmdProjects,
    contact:   cmdContact,
    education: cmdEducation,
    certs:     cmdCerts,
    resume:    cmdResume,
    whoami:    cmdWhoami,
    date:      cmdDate,
    neofetch:  cmdNeofetch,
    banner:    cmdBanner,
    history:   cmdHistory,
    exit:      cmdExit,
};

function executeCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Echo the command
    appendLine(`<span class="cmd-echo">${promptHTML()} <span class="cmd-text">${escapeHTML(raw)}</span></span>`);

    // Add to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    if (cmd === 'clear') {
        outputArea.innerHTML = '';
        return;
    }

    if (COMMANDS[cmd]) {
        COMMANDS[cmd]();
    } else {
        cmdNotFound(cmd);
    }
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ─── Input Handling ────────────────────────────────────────────
inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const val = this.value;
        this.value = '';
        executeCommand(val);
        scrollToBottom();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = this.value.trim().toLowerCase();
        if (partial) {
            const match = Object.keys(COMMANDS).concat(['clear']).find(c => c.startsWith(partial));
            if (match) this.value = match;
        }
    } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        outputArea.innerHTML = '';
    }
});

// Click anywhere to focus input (only if no text is selected)
document.addEventListener('click', () => {
    if (window.getSelection().toString() === '') {
        inputField.focus();
    }
});

// Hint bar buttons
document.querySelectorAll('.hint-cmd').forEach(btn => {
    btn.addEventListener('click', () => {
        const cmd = btn.dataset.cmd;
        inputField.value = '';
        executeCommand(cmd);
        inputField.focus();
    });
});

// ─── Boot Sequence ─────────────────────────────────────────────
async function boot() {
    inputField.disabled = true;
    hintBar.style.opacity = '0';

    const bootLines = [
        { text: "[    0.000000] HaripriyanOS v2.0.0 — Secure Terminal Portfolio", delay: 10 },
        { text: "[    0.001337] Kernel: Cybersec-Core 5.15.0-generic", delay: 10 },
        { text: "[    0.002100] Loading modules ........ ", delay: 10 },
        { text: "[    0.003400] Initializing network interfaces .... OK", delay: 10 },
        { text: "[    0.004200] Mounting encrypted filesystem .... OK", delay: 10 },
        { text: "[    0.005000] Starting SSH daemon .... OK", delay: 10 },
        { text: "[    0.006100] Loading profile data .... OK", delay: 10 },
        { text: "[    0.007000] System ready.", delay: 15 },
    ];

    for (const line of bootLines) {
        await typeText(line.text, line.delay);
        await delay(50);
    }

    await delay(100);
    appendLine('');
    cmdBanner();
    appendLine('');
    appendLine(`  <span class="highlight">Welcome, visitor.</span> I'm <span class="success">${PROFILE.name}</span> — ${PROFILE.title}.`);
    appendLine(`  <span class="dim">Type</span> <span class="success">help</span> <span class="dim">to see what you can explore, or click a command below.</span>`);
    appendLine('');

    inputField.disabled = false;
    inputField.focus();
    hintBar.style.opacity = '1';
    hintBar.style.transition = 'opacity 0.5s';
}

window.addEventListener('load', boot);
