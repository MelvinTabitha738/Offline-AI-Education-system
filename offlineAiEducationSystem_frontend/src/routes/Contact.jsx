import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, User, MessageSquare } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  //  store the icon COMPONENT instead of JSX
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      info: 'support@techlearnai.com',
      description: 'Get help with our offline AI education platform'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      info: '+254-72956-3144',
      description: 'Available Mon-Fri, 8AM-5PM EAT'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      info: '123 Innovation Drive, Tech City, TC 12345',
      description: 'Visit our AI learning center'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      info: 'Monday - Friday: 9AM - 6PM EST',
      description: 'Weekend support via email'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Feedback' }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.headerTitle}>Get in Touch</h1>
            <p className={styles.headerSubtitle}>
              Ready to revolutionize your AI education? We're here to help you succeed with our offline learning platform.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.grid}>
          {/* Contact Form */}
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Send us a Message</h2>
              <p className={styles.formDescription}>
                Have questions about our offline AI education system? We'd love to hear from you.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                <CheckCircle className={styles.successIcon} />
                <span className={styles.successText}>
                  Message sent successfully! We'll get back to you soon.
                </span>
              </div>
            )}

            <div className={styles.formFields}>
              <div className={`${styles.fieldGroup} ${styles.gridMd}`}>
                <div>
                  <div className={styles.fieldLabel}>Full Name *</div>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${styles.input} ${styles.inputWithIcon}`}
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.fieldLabel}>Email Address *</div>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${styles.input} ${styles.inputWithIcon}`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.fieldLabel}>Inquiry Type</div>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  {inquiryTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className={styles.fieldLabel}>Subject *</div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <div className={styles.fieldLabel}>Message *</div>
                <div className={styles.inputWrapper}>
                  <MessageSquare className={styles.inputIcon} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className={`${styles.textarea} ${styles.textareaWithIcon}`}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.spinner}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <div>
              <h2 className={styles.contactHeader}>Contact Information</h2>
              <p className={styles.contactDescription}>
                Connect with our team to learn more about our offline AI education platform and how it can transform your learning experience.
              </p>
            </div>

            <div className={styles.contactCards}>
              {contactInfo.map((item, index) => (
                <div key={index} className={styles.contactCard}>
                  <div className={styles.contactCardContent}>
                    <div className={styles.contactCardIcon}>
                      {/*  render the icon component  */}
                      <item.icon />
                    </div>
                    <div className={styles.contactCardDetails}>
                      <h3 className={styles.contactCardTitle}>{item.title}</h3>
                      <p className={styles.contactCardInfo}>{item.info}</p>
                      <p className={styles.contactCardDescription}>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.promiseCard}>
              <div className={styles.promiseCardHeader}>
                <CheckCircle className={styles.promiseCardIcon} />
                <h3 className={styles.promiseCardTitle}>Quick Response Promise</h3>
              </div>
              <p className={styles.promiseCardText}>
                We typically respond to all inquiries within 24 hours. For urgent technical support,
                please call our support line during business hours for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
