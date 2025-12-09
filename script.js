document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const langBtns = document.querySelectorAll('.lang-switch button');
    const elementsToTranslate = document.querySelectorAll('[data-cn]');

    const unlockBtn = document.getElementById('unlock-btn');
    const modal = document.getElementById('lock-modal');
    const closeModal = document.querySelector('.close-modal');
    const passwordInput = document.getElementById('password-input');
    const submitPassBtn = document.getElementById('submit-pass');
    const errorMsg = document.getElementById('error-msg');

    const identityCube = document.getElementById('identity-cube');
    const privateInfo = document.getElementById('private-info');

    let currentLang = 'zh-CN'; // Default

    // --- Language Switching ---
    function setLanguage(lang) {
        currentLang = lang;

        // Update Buttons
        langBtns.forEach(btn => btn.classList.remove('active'));
        if (lang === 'zh-CN') {
            document.getElementById('lang-cn').classList.add('active');
        } else {
            document.getElementById('lang-en').classList.add('active');
        }

        // Update Text Content
        elementsToTranslate.forEach(el => {
            if (el.dataset[lang === 'zh-CN' ? 'cn' : 'en']) {
                el.textContent = el.dataset[lang === 'zh-CN' ? 'cn' : 'en'];
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    document.getElementById('lang-cn').addEventListener('click', () => setLanguage('zh-CN'));
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));

    // --- Privacy Unlock Logic ---
    unlockBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
        errorMsg.classList.add('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    function attemptUnlock() {
        const pass = passwordInput.value;
        if (pass === '123456') {
            // Success
            unlockIdentity();
            modal.classList.add('hidden');
        } else {
            // Fail
            errorMsg.classList.remove('hidden');
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
        }
    }

    submitPassBtn.addEventListener('click', attemptUnlock);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptUnlock();
    });

    function unlockIdentity() {
        // 1. Rotate Cube
        identityCube.classList.remove('show-front');
        identityCube.classList.add('show-back');

        // 2. Show Private Info
        privateInfo.classList.remove('hidden');

        // 3. Hide Unlock Button (optional, or change text)
        unlockBtn.style.display = 'none';

        // 4. Play a sound? (Maybe later)
    }

    // Initialize Language
    setLanguage('zh-CN');
});
