import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Frontend-only success state
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact__inner">
          {/* Header */}
          <div className="contact__header reveal">
            <h2 className="contact__heading">
              Let's Build <span>Something Together.</span>
            </h2>
            <p className="contact__subtext">
              Looking for opportunities where I can contribute as a developer,
              continue learning and build meaningful software.
            </p>
          </div>

          <div className="contact__grid reveal">
            {/* Info */}
            <div className="contact__info">
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="contact__info-label">Email</div>
                  <div className="contact__info-value">
                    <a href={`mailto:${personalInfo.email}`}>
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="contact__info-label">Phone</div>
                  <div className="contact__info-value">
                    <a href={`tel:${personalInfo.phone}`}>
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="contact__info-label">Location</div>
                  <div className="contact__info-value">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              <div className="contact__socials">
                <a
                  href={personalInfo.linkedin}
                  className="contact__social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href={personalInfo.github}
                  className="contact__social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="contact__form">
              {submitted ? (
                <div className="contact__form-success">
                  <CheckCircle size={48} className="contact__form-success-icon" />
                  <div className="contact__form-success-text">
                    Message Sent Successfully!
                  </div>
                  <p className="contact__form-success-subtext">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    style={{
                      marginTop: '20px',
                      padding: '10px 24px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="contact-name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="contact__form-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <div className="contact__form-error">{errors.name}</div>
                    )}
                  </div>

                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="contact__form-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <div className="contact__form-error">{errors.email}</div>
                    )}
                  </div>

                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="contact-message">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact__form-textarea"
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <div className="contact__form-error">{errors.message}</div>
                    )}
                  </div>

                  <button type="submit" className="contact__form-submit">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
