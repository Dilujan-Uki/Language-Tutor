
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
    
    
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
    
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
                   const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const rememberMe = document.getElementById('remember').checked;
            
       
            if (!email || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }
            
                   const submitBtn = loginForm.querySelector('.btn-login-form');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
                    setTimeout(() => {
               
                
               
                if (rememberMe) {
                    localStorage.setItem('userEmail', email);
                }
                
                sessionStorage.setItem('isLoggedIn', 'true');
                
                               showSuccess('Login successful! Redirecting...');
                
                                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            }, 2000);         });
    }
    
        const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            showNotification('Google login would open here in a real application');
            
        });
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            showNotification('GitHub login would open here in a real application');
            
        });
    }
    
    
    const forgotPassword = document.querySelector('.forgot-password');
    
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPasswordModal();
        });
    }
    
    
    const signupLink = document.querySelector('.signup-link');
    
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal();
        });
    }
    
    
    const rememberedEmail = localStorage.getItem('userEmail');
    if (rememberedEmail && document.getElementById('loginEmail')) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function showError(message) {
    
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        background-color: rgba(220, 53, 69, 0.1);
        color: #dc3545;
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 0.95rem;
        border-left: 4px solid #dc3545;
    `;
    
    
    const form = document.getElementById('loginForm');
    if (form) {
        form.insertBefore(errorElement, form.firstChild);
        
        
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}


function showSuccess(message) {
    
    const existingSuccess = document.querySelector('.form-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    
    const successElement = document.createElement('div');
    successElement.className = 'form-success';
    successElement.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 8px;"></i> ${message}`;
    successElement.style.cssText = `
        background-color: rgba(40, 167, 69, 0.1);
        color: #28a745;
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 0.95rem;
        border-left: 4px solid #28a745;
        display: flex;
        align-items: center;
    `;
    
    
    const form = document.getElementById('loginForm');
    if (form) {
        form.insertBefore(successElement, form.firstChild);
        
        
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
    
    
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}



function showForgotPasswordModal() {
 
    const overlay = document.createElement('div');
    overlay.id = 'forgot-password-overlay';
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
    modal.className = 'forgot-password-modal glassmorphism';
    modal.style.cssText = `
        background-color: var(--bg-light);
        padding: 40px;
        border-radius: 20px;
        width: 90%;
        max-width: 450px;
        box-shadow: 0 20px 60px var(--shadow-color);
        position: relative;
    `;
    
    
    modal.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background-color: rgba(67, 97, 238, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i class="fas fa-key" style="font-size: 1.8rem; color: var(--primary-color);"></i>
            </div>
            <h2 style="margin-bottom: 10px;">Reset Password</h2>
            <p style="color: var(--text-light);">Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        
        <form id="forgot-password-form">
            <div style="margin-bottom: 25px;">
                <label for="resetEmail" style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
                <input type="email" id="resetEmail" required style="
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 1rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    transition: border-color 0.3s;
                " placeholder="Enter your registered email">
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
            ">Send Reset Link</button>
        </form>
        
        <div style="text-align: center; margin-top: 20px;">
            <p style="color: var(--text-light); font-size: 0.9rem;">
                Remember your password? 
                <a href="#" id="back-to-login" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">Back to login</a>
            </p>
        </div>
        
        <button id="close-forgot-modal" style="
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
    
    
    document.getElementById('close-forgot-modal').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    document.getElementById('back-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.body.removeChild(overlay);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    
    document.getElementById('forgot-password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value.trim();
        
        
        if (!email) {
            showNotification('Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address');
            return;
        }
        
        
        const submitBtn = document.querySelector('#forgot-password-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        
        setTimeout(() => {
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            
            showNotification(`Password reset link sent to ${email} (demo)`);
            
            
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 1500);
        }, 2000);
    });
}


function showSignupModal() {
    
    const overlay = document.createElement('div');
    overlay.id = 'signup-overlay';
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
    modal.className = 'signup-modal glassmorphism';
    modal.style.cssText = `
        background-color: var(--bg-light);
        padding: 40px;
        border-radius: 20px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 20px 60px var(--shadow-color);
        position: relative;
        max-height: 90vh;
        overflow-y: auto;
    `;
    
    
    modal.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div class="logo" style="justify-content: center; margin-bottom: 20px;">
                <i class="fas fa-language logo-icon"></i>
                <span class="logo-text">Lingua<span class="logo-highlight">AI</span></span>
            </div>
            <h2 style="margin-bottom: 10px;">Create Your Account</h2>
            <p style="color: var(--text-light);">Start your language learning journey today</p>
        </div>
        
        <form id="signup-form">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <label for="firstName" style="display: block; margin-bottom: 8px; font-weight: 500;">First Name</label>
                    <input type="text" id="firstName" required style="
                        width: 100%;
                        padding: 14px;
                        border: 1px solid var(--border-color);
                        border-radius: 10px;
                        font-size: 1rem;
                        background-color: var(--bg-color);
                        color: var(--text-color);
                    " placeholder="John">
                </div>
                
                <div>
                    <label for="lastName" style="display: block; margin-bottom: 8px; font-weight: 500;">Last Name</label>
                    <input type="text" id="lastName" required style="
                        width: 100%;
                        padding: 14px;
                        border: 1px solid var(--border-color);
                        border-radius: 10px;
                        font-size: 1rem;
                        background-color: var(--bg-color);
                        color: var(--text-color);
                    " placeholder="Doe">
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label for="signupEmail" style="display: block; margin-bottom: 8px; font-weight: 500;">Email Address</label>
                <input type="email" id="signupEmail" required style="
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 1rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                " placeholder="john.doe@example.com">
            </div>
            
            <div style="margin-bottom: 20px;">
                <label for="signupPassword" style="display: block; margin-bottom: 8px; font-weight: 500;">Password</label>
                <input type="password" id="signupPassword" required style="
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 1rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                " placeholder="At least 6 characters">
                <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 5px;">Password must be at least 6 characters long</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <label for="confirmPassword" style="display: block; margin-bottom: 8px; font-weight: 500;">Confirm Password</label>
                <input type="password" id="confirmPassword" required style="
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 1rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                " placeholder="Re-enter your password">
            </div>
            
            <div style="margin-bottom: 25px;">
                <label for="languageInterest" style="display: block; margin-bottom: 8px; font-weight: 500;">Primary Language Interest</label>
                <select id="languageInterest" required style="
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 1rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                ">
                    <option value="" disabled selected>Select a language</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="japanese">Japanese</option>
                    <option value="chinese">Chinese</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div style="margin-bottom: 25px;">
                <div style="display: flex; align-items: flex-start;">
                    <input type="checkbox" id="terms" required style="margin-right: 10px; margin-top: 4px;">
                    <label for="terms" style="color: var(--text-light); font-size: 0.9rem;">
                        I agree to the <a href="#" style="color: var(--primary-color);">Terms of Service</a> and <a href="#" style="color: var(--primary-color);">Privacy Policy</a>
                    </label>
                </div>
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
            ">Create Account</button>
            
            <div style="text-align: center;">
                <p style="color: var(--text-light); font-size: 0.9rem;">
                    Already have an account? 
                    <a href="#" id="back-to-login-from-signup" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">Sign in</a>
                </p>
            </div>
        </form>
        
        <button id="close-signup-modal" style="
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
    
    
    document.getElementById('close-signup-modal').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    document.getElementById('back-to-login-from-signup').addEventListener('click', (e) => {
        e.preventDefault();
        document.body.removeChild(overlay);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const languageInterest = document.getElementById('languageInterest').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        
        if (!firstName || !lastName || !email || !password || !confirmPassword || !languageInterest) {
            showNotification('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match');
            return;
        }
        
        if (!termsAccepted) {
            showNotification('You must accept the Terms of Service and Privacy Policy');
            return;
        }
        
        
        const submitBtn = document.querySelector('#signup-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;
        
        
        setTimeout(() => {
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            
            showNotification(`Account created successfully for ${email}! Welcome to LinguaAI.`);
            
            
            const userData = {
                firstName,
                lastName,
                email,
                languageInterest,
                joined: new Date().toISOString()
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userEmail', email);
            
            
            setTimeout(() => {
                document.body.removeChild(overlay);
                
                
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    });
}