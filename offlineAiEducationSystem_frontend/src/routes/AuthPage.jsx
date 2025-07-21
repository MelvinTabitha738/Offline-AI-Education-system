import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './AuthPage.module.css';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [focusedField, setFocusedField] = useState('');
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  // Detect when back online and sync any unsynced signups
  useEffect(() => {
    const syncUsers = async () => {
      const unsynced = JSON.parse(localStorage.getItem('unsyncedUsers') || '[]');
      for (let user of unsynced) {
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
          });
          if (response.ok) {
            console.log('Synced user:', user.email);
          }
        } catch (err) {
          console.error('Sync failed for:', user.email,err);
        }
      }
      localStorage.removeItem('unsyncedUsers');
    };

    window.addEventListener('online', syncUsers);
    return () => window.removeEventListener('online', syncUsers);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
  const validateName = (name) => name.trim().length >= 2;

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!isLogin && !validateName(value)) error = 'Name must be at least 2 characters long';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Enter a valid email';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!isLogin && !validatePassword(value)) error = 'Password must include uppercase, lowercase, number, special char & 8+ chars';
        else if (isLogin && value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (!isLogin && value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!isLogin || (isLogin && field !== 'name' && field !== 'confirmPassword')) {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); //prevent form from refreshing the page
  setSubmitMessage('');
  if (!validateForm()) {
    setSubmitMessage('Please fix the errors above');
    return;
  }

  setIsSubmitting(true);

  const payload = isLogin ? {
    email: formData.email,
    password: formData.password
  } : {
    name: formData.name,
    email: formData.email,
    password: formData.password
  };

  const endpoint = isLogin ? 'http://127.0.0.1:8000/api/login/' : 'http://127.0.0.1:8000/api/register/';

  try {
    if (navigator.onLine) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 409 || errorData?.error?.includes('already exists')) {
          setSubmitMessage('Account already exists. Please log in.');
        } else {
          setSubmitMessage('Something went wrong. Try again.');
        }
        setIsSubmitting(false);
        return;
      }
  const data = await res.json();
  const userName = isLogin ? data.name || formData.email : formData.name;

  localStorage.setItem('userName', userName);
  localStorage.setItem(payload.email, JSON.stringify(payload));

  //  Store email globally so SelectRolePage can retrieve current user
        localStorage.setItem('currentUserEmail', payload.email);
  setSubmitMessage(isLogin ? 'Login successful!' : 'Account created!');

 setTimeout(() => {
  const savedRole = localStorage.getItem(`${payload.email}_role`);
  if (savedRole) {
    navigate(`/${savedRole.toLowerCase()}`);
  } else {
    navigate('/selectrole');
  }
}, 1500);




    } else {
      // OFFLINE MODE
      if (!isLogin) {
        //Prevent signup if email already stored locally
        const existingUser = localStorage.getItem(payload.email);
        if (existingUser) {
          setSubmitMessage('Account already exists. Please log in.');
          setIsSubmitting(false);
          return;
        }
        // Store signup data for later syncing
        const unsynced = JSON.parse(localStorage.getItem('unsyncedUsers') || '[]');
        unsynced.push(payload);
        localStorage.setItem('unsyncedUsers', JSON.stringify(unsynced));
        // Also store user info for offline login
        localStorage.setItem(payload.email, JSON.stringify(payload));
         localStorage.setItem('userName', payload.name || payload.email); //  Needed for SelectRolePage
         //Store email globally
        localStorage.setItem('currentUserEmail', payload.email);
        setSubmitMessage('Offline: account saved locally and will sync when online.');
        setTimeout(() => {
    navigate('/selectrole');
  }, 1500); 
      } else {
        // Offline login
        const user = JSON.parse(localStorage.getItem(formData.email));
        if (user && user.password === formData.password) {
          localStorage.setItem('userName', user.name || formData.email); // Ensures userName is stored
          localStorage.setItem('currentUserEmail', formData.email);
          setSubmitMessage('Offline login successful!');
          setTimeout(() => {
      const savedRole = localStorage.getItem(`${formData.email}_role`);
      if (savedRole) {
        navigate(`/${savedRole.toLowerCase()}`);
      } else {
        navigate('/selectrole');
      }
    }, 1500);
        } else {
          setSubmitMessage('Invalid email or password.');
        }
      }
    }

  } catch (err) {
    console.error('Error during fetch:', err);
    setSubmitMessage('Unexpected error. Check console.');
  } finally {
    setIsSubmitting(false);
  }
};


  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setSubmitMessage('');
  };

  const getInputClassName = (fieldName) => {
    let className = styles.input;
    if (focusedField === fieldName) className += ` ${styles.inputFocused}`;
    if (errors[fieldName]) className += ` ${styles.inputError}`;
    if (fieldName === 'password') className += ` ${styles.passwordInput}`;
    return className;
  };


  return (
    <div className={styles.container}>
     

      {/* Right Side - Auth Form */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          

          {/* Auth Toggle */}
          <div className={styles.authToggleContainer}>
            <div className={styles.authToggle}>
              <button
                onClick={() => setIsLogin(true)}
                className={`${styles.toggleButton} ${isLogin ? styles.toggleButtonActive : ''}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`${styles.toggleButton} ${!isLogin ? styles.toggleButtonActive : ''}`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Welcome Text */}
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>
              {isLogin ? 'Welcome Back!' : 'Join TechLearnAI'}
            </h2>
            <p className={styles.welcomeSubtitle}>
              {isLogin 
                ? 'Continue your learning journey' 
                : 'Start your AI-powered learning adventure'
              }
            </p>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`${styles.submitMessage} ${
              submitMessage.includes('successful') || submitMessage.includes('created') 
                ? styles.submitMessageSuccess 
                : styles.submitMessageError
            }`}>
              {submitMessage.includes('successful') || submitMessage.includes('created') ? (
                <CheckCircle className={styles.messageIcon} />
              ) : (
                <AlertCircle className={styles.messageIcon} />
              )}
              <span>{submitMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.formFields}>
            {!isLogin && (
              <div className={styles.inputGroup}>
                <div className={styles.inputIcon}>
                  <User className={styles.icon} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className={getInputClassName('name')}
                  required
                />
                {errors.name && (
                  <div className={styles.errorMessage}>
                    <AlertCircle className={styles.errorIcon} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
            )}

            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Mail className={styles.icon} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className={getInputClassName('email')}
                required
              />
              {errors.email && (
                <div className={styles.errorMessage}>
                  <AlertCircle className={styles.errorIcon} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Lock className={styles.icon} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                className={getInputClassName('password')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? (
                  <Eye className={styles.passwordToggleIcon} />
                ) : (
                  <EyeOff className={styles.passwordToggleIcon} />
                )}
              </button>
              {errors.password && (
                <div className={styles.errorMessage}>
                  <AlertCircle className={styles.errorIcon} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className={styles.inputGroup}>
                <div className={styles.inputIcon}>
                  <Lock className={styles.icon} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField('')}
                  className={getInputClassName('confirmPassword')}
                  required
                />
                {errors.confirmPassword && (
                  <div className={styles.errorMessage}>
                    <AlertCircle className={styles.errorIcon} />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            )}

            {isLogin && (
              <div className={styles.loginOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>Remember me</span>
                </label>
                <button
                  type="button"
                  className={styles.forgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`${styles.submitButton} ${isSubmitting ? styles.submitButtonLoading : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className={styles.loadingSpinner}>
                  <div className={styles.spinner}></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </div>
              ) : (
                isLogin ? 'Login to TechLearnAI' : 'Create Account'
              )}
            </button>
          </form>

          {/* Social Login */}
  
          <div className={styles.socialSection}>
            <div className={styles.divider}>
              <div className={styles.dividerLine}></div>
              <div className={styles.dividerText}>
                <span>Or continue with</span>
              </div>
            </div>

            <div className={styles.socialButtons}>
              <button
                type="button"
                className={styles.socialButton}
                disabled={isSubmitting}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className={styles.socialButtonText}>Google</span>
              </button>

              <button
                type="button"
                className={styles.socialButton}
                disabled={isSubmitting}
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.082.339-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
                <span className={styles.socialButtonText}>GitHub</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                className={styles.footerLink}
                disabled={isSubmitting}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;