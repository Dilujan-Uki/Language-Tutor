
document.addEventListener('DOMContentLoaded', function() {
    
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    
    const languageTags = document.querySelectorAll('.language-tag');
    languageTags.forEach(tag => {
        tag.addEventListener('click', function() {
            
            languageTags.forEach(t => t.classList.remove('active'));
            
            this.classList.add('active');
            
            
            showNotification(`Selected language: ${this.textContent}`);
        });
    });
    
    
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        setTimeout(() => {
            
            const aiChat = document.querySelector('.ai-chat');
            const newMessage = document.createElement('div');
            newMessage.className = 'message ai-message';
            newMessage.innerHTML = '<p>¡Hola! ¿Cómo estás? Let\'s start with "Buenos días" which means "Good morning".</p>';
            aiChat.insertBefore(newMessage, typingIndicator);
            

            newMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 2000);
    }
});


function navigateToLogin() {
  
  
    showNotification('Redirecting to login page...');
    
    
    setTimeout(() => {
        
        createLoginModal();
    }, 500);
}


function showNotification(message) {
    
    const notification = document.createElement('div');
    notification.className = 'notification glassmorphism';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: var(--bg-light);
        color: var(--text-color);
        border-radius: 10px;
        z-index: 9999;
        box-shadow: 0 5px 15px var(--shadow-color);
        animation: slideIn 0.3s ease;
    `;
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


function createLoginModal() {
    
    const overlay = document.createElement('div');
    overlay.id = 'login-modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    
    
    const modal = document.createElement('div');
    modal.className = 'login-modal glassmorphism';
    modal.style.cssText = `
        background-color: var(--bg-light);
        padding: 40px;
        border-radius: 20px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 20px 60px var(--shadow-color);
    `;
    
    
    modal.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div class="logo" style="justify-content: center; margin-bottom: 20px;">
                <i class="fas fa-language logo-icon"></i>
                <span class="logo-text">Lingua<span class="logo-highlight">AI</span></span>
            </div>
            <h2 style="margin-bottom: 10px;">Welcome Back</h2>
            <p style="color: var(--text-light);">Sign in to continue your language journey</p>
        </div>
        
        <form id="login-form">
            <div style="margin-bottom: 20px;">
                <label for="email" style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
                <input type="email" id="email" required style="
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 1rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    transition: border-color 0.3s;
                ">
            </div>
            
            <div style="margin-bottom: 25px;">
                <label for="password" style="display: block; margin-bottom: 8px; font-weight: 500;">Password</label>
                <input type="password" id="password" required style="
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 1rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    transition: border-color 0.3s;
                ">
            </div>
            
            <button type="submit" style="
                width: 100%;
                padding: 14px;
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.3s;
                margin-bottom: 20px;
            ">Sign In</button>
            
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: var(--text-light); font-size: 0.9rem;">
                    Don't have an account? 
                    <a href="#" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">Sign up</a>
                </p>
            </div>
        </form>
        
        <button id="close-modal" style="
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-light);
            cursor: pointer;
        ">&times;</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    
    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        
        if (email && password) {
            showNotification(`Welcome back! Logging in as ${email}`);
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 1000);
        } else {
            showNotification('Please fill in all fields');
        }
    });
}