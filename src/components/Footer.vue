<script setup>
//imports
import { RouterLink } from "vue-router";

import linkedlnIcon from "@/assets/icons/linkedin-brands.svg";
import instagramIcon from "@/assets/icons/instagram-brands.svg";
import youtubeIcon from "@/assets/icons/youtube-brands.svg";
//props

//states

//lifecycle

//functions
</script>

<template>
  <footer class="modern-footer">
    <!-- Animated Background Elements -->
    <div class="footer-background">
      <div class="footer-gradient"></div>
      <div class="footer-pattern">
        <div class="pattern-butterfly" v-for="n in 3" :key="n" :class="`pattern-${n}`">
          <div class="pattern-wing pattern-wing-left"></div>
          <div class="pattern-wing pattern-wing-right"></div>
          <div class="pattern-body"></div>
        </div>
      </div>
      <div class="floating-light-particles">
        <div class="light-particle" v-for="n in 12" :key="n"></div>
      </div>
    </div>

    <!-- Modern Footer Content -->
    <div class="footer-content">
      <!-- Brand Section -->
      <section class="footer-brand">
        <RouterLink :to="{ name: 'home' }" class="footer-logo">
          <img src="@/assets/images/omniBlogLogo.png" alt="OmniBlog" class="footer-brand-logo">
          <div class="footer-brand-text">
            <h2>
              <span class="brand-omni">Omni</span>
              <span class="brand-blog">Blog</span>
            </h2>
            <p class="brand-tagline">Transform Ideas Into Stories</p>
          </div>
        </RouterLink>

        <p class="footer-description">
          Where creativity takes flight and stories come alive. 
          Join our community of writers and readers transforming the digital landscape.
        </p>

        <!-- Enhanced Social Links -->
        <div class="social-links">
          <a href="https://www.linkedin.com" target="_blank" class="social-link linkedin">
            <img :src="linkedlnIcon" alt="LinkedIn" />
            <span class="social-tooltip">LinkedIn</span>
          </a>
          <a href="https://www.instagram.com" target="_blank" class="social-link instagram">
            <img :src="instagramIcon" alt="Instagram" />
            <span class="social-tooltip">Instagram</span>
          </a>
          <a href="https://www.youtube.com" target="_blank" class="social-link youtube">
            <img :src="youtubeIcon" alt="YouTube" />
            <span class="social-tooltip">YouTube</span>
          </a>
        </div>
      </section>

      <!-- Modern Divider -->
      <div class="footer-divider">
        <div class="divider-line"></div>
        <div class="divider-butterfly">
          <div class="divider-wing divider-wing-left"></div>
          <div class="divider-wing divider-wing-right"></div>
          <div class="divider-body"></div>
        </div>
        <div class="divider-line"></div>
      </div>

      <!-- Navigation Links -->
      <section class="footer-navigation">
        <h3 class="nav-title">Explore</h3>
        <div class="nav-links">
          <RouterLink :to="{ name: 'blog' }" class="footer-nav-link">
            <!-- #todoArt: Add blog icon here -->
            <span class="nav-text">Blog</span>
            <div class="nav-hover-effect"></div>
          </RouterLink>
          <RouterLink :to="{ name: 'post' }" class="footer-nav-link">
            <!-- #todoArt: Add create post icon here -->
            <span class="nav-text">Create Post</span>
            <div class="nav-hover-effect"></div>
          </RouterLink>
          <RouterLink :to="{ name: 'about' }" class="footer-nav-link">
            <!-- #todoArt: Add about icon here -->
            <span class="nav-text">About</span>
            <div class="nav-hover-effect"></div>
          </RouterLink>
        </div>
      </section>

      <!-- Newsletter Section -->
      <section class="footer-newsletter">
        <h3 class="newsletter-title">Stay Inspired</h3>
        <p class="newsletter-description">
          Join our community and get the latest stories delivered to your inbox.
        </p>
        <div class="newsletter-form">
          <div class="input-wrapper">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="newsletter-input"
            />
            <button class="newsletter-button">
              <span class="button-text">Subscribe</span>
              <!-- #todoArt: Add subscribe button icon here -->
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Modern Footer Bottom -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">
          © 2025 <span class="highlight">OmniBlog</span>. All rights reserved.
        </p>
        <div class="footer-meta">
          <span class="meta-item">Made with 💙 for creators</span>
          <span class="meta-separator">•</span>
          <span class="meta-item">Powered by imagination</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
// ====== ULTRA-MODERN FOOTER VARIABLES ======
:root {
  --footer-bg: rgba(5, 5, 16, 0.95);
  --footer-surface: rgba(255, 255, 255, 0.03);
  --footer-border: rgba(6, 214, 160, 0.15);
  --footer-text: #f8fafc;
  --footer-text-muted: #94a3b8;
  --footer-accent: #06d6a0;
  --footer-accent-light: #40f99b;
  --footer-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

// ====== MODERN FOOTER CONTAINER ======
.modern-footer {
  position: relative;
  background: var(--footer-bg);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--footer-border);
  box-shadow: var(--footer-shadow);
  overflow: hidden;
  margin-top: 4rem;

  // Animated Background
  .footer-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .footer-gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(ellipse at top left, rgba(6, 214, 160, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(255, 107, 157, 0.05) 0%, transparent 50%),
        linear-gradient(135deg, transparent 0%, rgba(6, 214, 160, 0.02) 100%);
      animation: footerGradientShift 12s ease-in-out infinite;
    }

    .footer-pattern {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.03;

      .pattern-butterfly {
        position: absolute;
        animation: patternButterfly 20s ease-in-out infinite;

        .pattern-wing {
          position: absolute;
          background: linear-gradient(135deg, var(--footer-accent), var(--footer-accent-light));
          border-radius: 50% 10% 50% 80%;
          animation: patternWingFlap 4s ease-in-out infinite;

          &.pattern-wing-left {
            width: 12px;
            height: 15px;
            top: 0;
            left: -8px;
            transform-origin: bottom right;
          }

          &.pattern-wing-right {
            width: 12px;
            height: 15px;
            top: 0;
            right: -8px;
            transform-origin: bottom left;
            transform: scaleX(-1);
            animation-delay: 0.2s;
          }
        }

        .pattern-body {
          width: 1.5px;
          height: 12px;
          background: var(--footer-accent);
          border-radius: 1px;
          position: absolute;
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
        }

        &.pattern-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        &.pattern-2 {
          top: 60%;
          right: 20%;
          animation-delay: 7s;
        }

        &.pattern-3 {
          bottom: 30%;
          left: 60%;
          animation-delay: 14s;
        }
      }
    }

    .floating-light-particles {
      position: absolute;
      width: 100%;
      height: 100%;

      .light-particle {
        position: absolute;
        width: 1px;
        height: 1px;
        background: var(--footer-accent);
        border-radius: 50%;
        opacity: 0;
        animation: lightParticleFloat 8s ease-in-out infinite;

        &:nth-child(1) { left: 10%; animation-delay: 0s; }
        &:nth-child(2) { left: 20%; animation-delay: 0.7s; }
        &:nth-child(3) { left: 30%; animation-delay: 1.4s; }
        &:nth-child(4) { left: 40%; animation-delay: 2.1s; }
        &:nth-child(5) { left: 50%; animation-delay: 2.8s; }
        &:nth-child(6) { left: 60%; animation-delay: 3.5s; }
        &:nth-child(7) { left: 70%; animation-delay: 4.2s; }
        &:nth-child(8) { left: 80%; animation-delay: 4.9s; }
        &:nth-child(9) { left: 90%; animation-delay: 5.6s; }
        &:nth-child(10) { left: 25%; animation-delay: 6.3s; }
        &:nth-child(11) { left: 65%; animation-delay: 7s; }
        &:nth-child(12) { left: 85%; animation-delay: 7.7s; }
      }
    }
  }

  // Footer Content
  .footer-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem 2rem;
    display: grid;
    grid-template-columns: 2fr auto 1fr 1fr;
    gap: 3rem;
    align-items: start;

    // Brand Section
    .footer-brand {
      .footer-logo {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        margin-bottom: 1.5rem;
        transition: var(--transition-smooth);

        .footer-brand-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          padding: 6px;
          flex-shrink: 0;
          filter: drop-shadow(0 0 8px rgba(6, 214, 160, 0.3));
          transition: var(--transition-smooth);
        }

        .footer-brand-text {
          h2 {
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0;
            line-height: 1;

            .brand-omni {
              color: var(--footer-text);
            }

            .brand-blog {
              color: var(--footer-accent);
              text-shadow: 0 0 10px rgba(6, 214, 160, 0.4);
            }
          }

          .brand-tagline {
            font-size: 0.8rem;
            color: var(--footer-text-muted);
            margin: 4px 0 0 0;
            font-weight: 500;
            letter-spacing: 0.05em;
          }
        }

        &:hover {
          transform: translateY(-2px);

          .footer-brand-logo {
            background: rgba(255, 255, 255, 1);
            filter: drop-shadow(0 0 12px rgba(6, 214, 160, 0.5));
            transform: scale(1.05);
          }

          .footer-brand-text .brand-blog {
            text-shadow: 0 0 15px rgba(6, 214, 160, 0.6);
          }
        }
      }

      .footer-description {
        color: var(--footer-text-muted);
        line-height: 1.6;
        margin-bottom: 2rem;
        font-size: 0.95rem;
      }

      .social-links {
        display: flex;
        gap: 1rem;

        .social-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: var(--footer-surface);
          border: 1px solid var(--footer-border);
          border-radius: 16px;
          text-decoration: none;
          transition: var(--transition-spring);
          backdrop-filter: blur(10px);
          overflow: hidden;

          img {
            width: 20px;
            height: 20px;
            filter: brightness(0) invert(1);
            transition: var(--transition-smooth);
            z-index: 2;
            position: relative;
          }

          .social-tooltip {
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 8px;
            font-size: 0.75rem;
            opacity: 0;
            pointer-events: none;
            transition: var(--transition-smooth);
            white-space: nowrap;
            backdrop-filter: blur(10px);
          }

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--footer-accent);
            opacity: 0;
            transition: var(--transition-smooth);
            z-index: 1;
          }

          &:hover {
            transform: translateY(-3px) scale(1.05);
            border-color: var(--footer-accent);
            box-shadow: 0 8px 25px rgba(6, 214, 160, 0.3);

            &::before {
              opacity: 0.1;
            }

            img {
              filter: brightness(0) invert(1);
              transform: scale(1.1);
            }

            .social-tooltip {
              opacity: 1;
              transform: translateX(-50%) translateY(-5px);
            }
          }

          &.linkedin:hover {
            border-color: #0077b5;
            box-shadow: 0 8px 25px rgba(0, 119, 181, 0.3);

            &::before {
              background: #0077b5;
            }
          }

          &.instagram:hover {
            border-color: #e4405f;
            box-shadow: 0 8px 25px rgba(228, 64, 95, 0.3);

            &::before {
              background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
            }
          }

          &.youtube:hover {
            border-color: #ff0000;
            box-shadow: 0 8px 25px rgba(255, 0, 0, 0.3);

            &::before {
              background: #ff0000;
            }
          }
        }
      }
    }

    // Modern Divider
    .footer-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      padding: 1rem 0;

      .divider-line {
        width: 2px;
        flex: 1;
        background: linear-gradient(to bottom, 
          transparent 0%, 
          var(--footer-border) 20%, 
          var(--footer-accent) 50%, 
          var(--footer-border) 80%, 
          transparent 100%
        );
        border-radius: 2px;
        box-shadow: 0 0 10px rgba(6, 214, 160, 0.2);
      }

      .divider-butterfly {
        position: relative;
        width: 20px;
        height: 16px;
        margin: 1rem 0;
        animation: dividerButterfly 4s ease-in-out infinite;

        .divider-wing {
          position: absolute;
          background: linear-gradient(135deg, var(--footer-accent), var(--footer-accent-light));
          border-radius: 50% 10% 50% 80%;
          box-shadow: 0 0 8px rgba(6, 214, 160, 0.4);
          animation: dividerWingFlap 2s ease-in-out infinite;

          &.divider-wing-left {
            width: 9px;
            height: 12px;
            top: 2px;
            left: 3px;
            transform-origin: bottom right;
          }

          &.divider-wing-right {
            width: 9px;
            height: 12px;
            top: 2px;
            right: 3px;
            transform-origin: bottom left;
            transform: scaleX(-1);
            animation-delay: 0.1s;
          }
        }

        .divider-body {
          position: absolute;
          width: 1.5px;
          height: 10px;
          background: var(--footer-accent);
          border-radius: 1px;
          top: 3px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 4px rgba(6, 214, 160, 0.5);
        }
      }
    }

    // Navigation Section
    .footer-navigation {
      .nav-title {
        color: var(--footer-text);
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, var(--footer-accent), var(--footer-accent-light));
          border-radius: 2px;
        }
      }

      .nav-links {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .footer-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--footer-text-muted);
          text-decoration: none;
          border-radius: 12px;
          transition: var(--transition-smooth);
          position: relative;
          overflow: hidden;
          background: var(--footer-surface);
          border: 1px solid transparent;

          .nav-icon {
            font-size: 1rem;
            opacity: 0.7;
            transition: var(--transition-smooth);
          }

          .nav-text {
            font-weight: 500;
            font-size: 0.9rem;
          }

          .nav-hover-effect {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(6, 214, 160, 0.1), transparent);
            transition: left 0.5s ease;
          }

          &:hover {
            color: var(--footer-accent);
            border-color: rgba(6, 214, 160, 0.2);
            background: rgba(6, 214, 160, 0.05);
            transform: translateX(8px);

            .nav-icon {
              opacity: 1;
              transform: scale(1.1);
            }

            .nav-hover-effect {
              left: 100%;
            }
          }

          &.router-link-active {
            color: var(--footer-accent);
            background: rgba(6, 214, 160, 0.1);
            border-color: var(--footer-accent);
            box-shadow: 0 0 20px rgba(6, 214, 160, 0.2);
          }
        }
      }
    }

    // Newsletter Section
    .footer-newsletter {
      .newsletter-title {
        color: var(--footer-text);
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, var(--footer-accent), var(--footer-accent-light));
          border-radius: 2px;
        }
      }

      .newsletter-description {
        color: var(--footer-text-muted);
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 1.5rem;
      }

      .newsletter-form {
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;

          .newsletter-input {
            width: 100%;
            padding: 0.875rem 1rem;
            background: var(--footer-surface);
            border: 1px solid var(--footer-border);
            border-radius: 12px;
            color: var(--footer-text);
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
            transition: var(--transition-smooth);

            &::placeholder {
              color: var(--footer-text-muted);
            }

            &:focus {
              outline: none;
              border-color: var(--footer-accent);
              background: rgba(6, 214, 160, 0.05);
              box-shadow: 0 0 20px rgba(6, 214, 160, 0.2);
            }
          }

          .newsletter-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.875rem 1.5rem;
            background: linear-gradient(135deg, var(--footer-accent), #118a73);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: var(--transition-spring);
            position: relative;
            overflow: hidden;

            .button-text {
              position: relative;
              z-index: 2;
            }

            .button-wing {
              position: relative;
              z-index: 2;
              animation: buttonWingFlutter 2s ease-in-out infinite;
            }

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
              transition: left 0.5s;
            }

            &:hover {
              transform: translateY(-2px) scale(1.02);
              box-shadow: 0 8px 25px rgba(6, 214, 160, 0.4);

              &::before {
                left: 100%;
              }
            }

            &:active {
              transform: translateY(-1px) scale(1.01);
            }
          }
        }
      }
    }
  }

  // Modern Footer Bottom
  .footer-bottom {
    position: relative;
    z-index: 2;
    border-top: 1px solid var(--footer-border);
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);

    .footer-bottom-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;

      .copyright {
        color: var(--footer-text-muted);
        font-size: 0.9rem;
        margin: 0;

        .highlight {
          color: var(--footer-accent);
          font-weight: 600;
        }
      }

      .footer-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--footer-text-muted);
        font-size: 0.85rem;

        .meta-item {
          opacity: 0.8;
        }

        .meta-separator {
          opacity: 0.5;
        }
      }
    }
  }
}

// ====== FOOTER ANIMATIONS ======
@keyframes footerGradientShift {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes patternButterfly {
  0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
  25% { transform: translate(10px, -5px) rotate(2deg); opacity: 0.5; }
  50% { transform: translate(-5px, -10px) rotate(-1deg); opacity: 0.4; }
  75% { transform: translate(8px, -3px) rotate(1deg); opacity: 0.6; }
}

@keyframes patternWingFlap {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(-15deg); }
}

@keyframes lightParticleFloat {
  0%, 100% { 
    opacity: 0; 
    transform: translateY(100px) scale(0);
  }
  10% { 
    opacity: 0.6; 
    transform: translateY(80px) scale(1);
  }
  90% { 
    opacity: 0.4; 
    transform: translateY(-10px) scale(1);
  }
}

@keyframes footerWingFlap {
  0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
  50% { transform: rotateY(-12deg) rotateX(6deg); }
}

@keyframes dividerButterfly {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(2deg); }
}

@keyframes dividerWingFlap {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(-20deg); }
}

@keyframes buttonWingFlutter {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-5deg) scale(1.1); }
  75% { transform: rotate(5deg) scale(0.9); }
}

// ====== RESPONSIVE DESIGN ======
@media (max-width: 1024px) {
  .modern-footer .footer-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;

    .footer-divider {
      flex-direction: row;
      height: auto;
      width: 100%;
      padding: 1rem 0;

      .divider-line {
        height: 2px;
        flex: 1;
        background: linear-gradient(to right, 
          transparent 0%, 
          var(--footer-border) 20%, 
          var(--footer-accent) 50%, 
          var(--footer-border) 80%, 
          transparent 100%
        );
      }

      .divider-butterfly {
        margin: 0 1rem;
      }
    }

    .footer-navigation,
    .footer-newsletter {
      max-width: 400px;
      margin: 0 auto;
    }
  }
}

@media (max-width: 768px) {
  .modern-footer {
    .footer-content {
      padding: 3rem 1.5rem 1.5rem;
      gap: 2rem;

      .footer-brand {
        .footer-description {
          font-size: 0.9rem;
        }

        .social-links {
          justify-content: center;
          
          .social-link {
            width: 45px;
            height: 45px;

            img {
              width: 18px;
              height: 18px;
            }
          }
        }
      }

      .footer-newsletter {
        .newsletter-form .input-wrapper {
          .newsletter-input,
          .newsletter-button {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
        }
      }
    }

    .footer-bottom .footer-bottom-content {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
      padding: 1.25rem 1.5rem;

      .footer-meta {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}

@media (max-width: 480px) {
  .modern-footer {
    .footer-content {
      padding: 2rem 1rem 1rem;

      .footer-brand {
        .footer-logo {
          flex-direction: column;
          text-align: center;
          gap: 0.75rem;

          .footer-brand-text h2 {
            font-size: 1.3rem;
          }
        }

        .social-links {
          gap: 0.75rem;

          .social-link {
            width: 40px;
            height: 40px;

            img {
              width: 16px;
              height: 16px;
            }
          }
        }
      }

      .footer-newsletter {
        .newsletter-form .input-wrapper {
          gap: 0.5rem;
        }
      }
    }
  }
}
</style>
