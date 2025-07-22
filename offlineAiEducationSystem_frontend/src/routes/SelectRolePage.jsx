import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Settings,
  ChevronRight,
  BookOpen,
  Shield
} from 'lucide-react';
import styles from './SelectRolePage.module.css';

// Role definitions 
const roles = [
  {
    name: 'Student',
    description: 'Explore AI-powered learning modules and track your educational journey',
    icon: GraduationCap,
    color: '#D81B60',
    bgGradient: 'linear-gradient(135deg, #D81B60 0%, #FF6B9D 100%)',
    features: ['Interactive AI Lessons', 'Progress Tracking', 'Offline Access']
  },
  {
    name: 'Teacher',
    description: 'Create engaging content and guide learners with AI assistance',
    icon: Users,
    color: '#00C4CC',
    bgGradient: 'linear-gradient(135deg, #00C4CC 0%, #4ECDC4 100%)',
    features: ['Content Creation', 'Student Analytics', 'AI Teaching Assistant']
  },
  {
    name: 'Admin',
    description: 'Manage the entire ecosystem and oversee system operations',
    icon: Settings,
    color: '#4B0082',
    bgGradient: 'linear-gradient(135deg, #4B0082 0%, #7B68EE 100%)',
    features: ['System Management', 'User Control', 'Analytics Dashboard']
  }
];

const SelectRolePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Get user info from localStorage 
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('currentUserEmail');

  // Redirect back to home if userEmail not found (not logged in)
  useEffect(() => {
    if (!userEmail) {
      navigate('/');
    }

    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [navigate, userEmail]);

  const handleRoleClick = (role) => {
    setSelectedRole(role === selectedRole ? null : role);
  };

  const handleContinue = () => {
    if (selectedRole && userEmail) {
      //  Save role specifically for this user
      localStorage.setItem(`${userEmail}_role`, selectedRole);
      setShowSuccess(true);

      setTimeout(() => {
        navigate(`/${selectedRole.toLowerCase()}`);
      }, 2000);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  if (showSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <span>✓</span>
          </div>
          <h2 className={styles.successTitle}>Success!</h2>
          <p className={styles.successMessage}>Redirecting to your {selectedRole} dashboard...</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      <div className={styles.content}>
        {/* Header */}
        <div className={`${styles.header} ${isAnimating ? styles.slideIn : ''}`}>
          <div className={styles.welcomeSection}>
            {/*  real name from localStorage */}
            <h2 className={styles.welcome}>Welcomel, {userName}! 🎉</h2>
            <p className={styles.instruction}>
              Choose your role to access your personalized AI-powered learning experience
            </p>
          </div>
        </div>

        {/* Role Cards */}
        <div className={`${styles.cards} ${isAnimating ? styles.cardsAnimation : ''}`}>
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.name;

            return (
              <div
                key={role.name}
                className={`${styles.card} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleRoleClick(role.name)}
                style={{
                  '--role-color': role.color,
                  '--role-gradient': role.bgGradient,
                  '--animation-delay': `${index * 200}ms`
                }}
              >
                {isSelected && (
                  <div className={styles.selectedIndicator}>
                    ✓
                  </div>
                )}

                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <IconComponent size={28} />
                  </div>

                  <div className={styles.roleInfo}>
                    <h3 className={styles.roleName}>{role.name}</h3>
                    <p className={styles.roleDescription}>{role.description}</p>
                  </div>
                </div>

                <div className={styles.features}>
                  {role.features.map((feature, idx) => (
                    <div key={idx} className={styles.feature}>
                      <div className={styles.featureIcon}>
                        <BookOpen size={12} />
                      </div>
                      <span className={styles.featureText}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.selectText}>
                    {isSelected ? 'Selected' : 'Select Role'}
                  </span>
                  <ChevronRight
                    size={20}
                    className={`${styles.chevron} ${isSelected ? styles.chevronRotated : ''}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className={`${styles.actions} ${isAnimating ? styles.actionsAnimation : ''}`}>
          <button
            onClick={handleBack}
            disabled={!selectedRole}
            className={`${styles.button} ${styles.backButton}`}
          >
            <Shield size={20} />
            Reset Selection
          </button>

          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`${styles.button} ${styles.continueButton}`}
          >
            Continue to Dashboard
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Footer */}
        <div className={`${styles.footer} ${isAnimating ? styles.footerAnimation : ''}`}>
          <p>Powered by AI • Designed for Education • Built for the Future</p>
        </div>
      </div>
    </div>
  );
};

export default SelectRolePage;
