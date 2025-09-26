<script setup>
//imports
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { arrowRight } from "@/assets/icons";

//props
defineProps({
  post: {
    type: Object,
    required: true,
  },
  content: {
    type: Array,
    required: false,
    default: [],
  },
  index: {
    type: Number,
    required: false,
  },
  originalPostIndex: {
    type: Number,
    required: false,
  },
});
//states

//lifecycle
onMounted(() => {});
//functions
function extractTextFromFeatured(html) {
  if (!html) return '';
  // Remove HTML tags and get first 150 characters for featured posts
  const text = html.replace(/<[^>]*>/g, '').trim();
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
}
</script>

<template>
  <div class="blog-post-card-container">
    <div class="blot__content">
      <div>
        <section v-if="post.welcomeScreen" class="blog__hero-container">
          <!-- Ultra-Modern Hero Content -->
          <div class="hero-container__content">
            <!-- Animated Title Section -->
            <div class="hero-title-section">
              <!-- <div class="hero-badge">
                <span class="badge-text">OmniBlog</span>
              </div> -->

              <h1 class="hero-main-title">
                <span class="title-line-1">Transform Your</span>
                <span class="title-line-2">
                  <span class="gradient-text">Ideas</span> Into
                </span>
                <span class="title-line-3">Beautiful Stories</span>
              </h1>

              <p class="hero-subtitle">
                Like a butterfly emerging from its cocoon, let your thoughts
                take flight and inspire the world with your unique perspective.
              </p>

              <!-- Modern CTA Buttons -->
              <div class="hero-cta-container">
                <RouterLink :to="{ name: 'register' }" class="cta-primary">
                  <span class="cta-text">Begin Your Journey</span>
                  <div class="cta-arrow">
                    <img :src="arrowRight" width="16" height="16" />
                  </div>
                </RouterLink>

                <RouterLink :to="{ name: 'login' }" class="cta-secondary">
                  <span class="cta-text">Welcome Back</span>
                </RouterLink>
              </div>

              <!-- Feature Highlights -->
              <div class="hero-features">
                <div class="feature-item">
                  <span>Rich Editor</span>
                </div>
                <div class="feature-item">
                  <span>Beautiful Themes</span>
                </div>
                <div class="feature-item">
                  <span>Global Reach</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Butterfly Image Container -->
          <div class="hero-container__visual">
            <div class="butterfly-showcase">
              <!-- Main Butterfly Image -->
              <div class="main-butterfly">
                <img
                  src="../assets/images/beautealfly.jpg"
                  :alt="'Beautiful teal butterfly representing transformation'"
                  preload="true"
                  class="butterfly-image"
                />

                <!-- Overlay Effects -->
                <div class="butterfly-overlay">
                  <div class="glow-effect"></div>
                  <div class="particle-trail">
                    <div class="trail-particle" v-for="n in 8" :key="n"></div>
                  </div>
                </div>
              </div>

              <!-- Decorative Elements -->
              <div class="decorative-elements">
                <div class="floating-orb orb-1"></div>
                <div class="floating-orb orb-2"></div>
                <div class="floating-orb orb-3"></div>

                <!-- Animated Text Paths -->
                <div class="text-path path-1">
                  <span>Create</span>
                </div>
                <div class="text-path path-2">
                  <span>Inspire</span>
                </div>
                <div class="text-path path-3">
                  <span>Transform</span>
                </div>
              </div>

              <!-- Background Pattern -->
              <div class="visual-background">
                <div class="bg-pattern pattern-1"></div>
                <div class="bg-pattern pattern-2"></div>
                <div class="bg-pattern pattern-3"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- FEATURED POSTS -->

        <section
          v-else
          :class="
            index % 2 == 0
              ? 'featured-blog-container'
              : 'featured-blog-container-alt'
          "
        >
          <!-- Modern Featured Blog Layout -->
          <div class="featured-blog-content">
            <!-- Blog Content Section -->
            <div class="featured-content-section">
              <div class="featured-badge">
                <span class="badge-pulse"></span>
                <span class="badge-text">Featured</span>
              </div>
              
              <header class="featured-header">
                <h1 class="featured-title">{{ post.title }}</h1>
                <div class="featured-title-underliner"></div>
              </header>

              <div class="featured-excerpt" v-if="extractTextFromFeatured(post.blogHTML)">
                <p class="excerpt-text">{{ extractTextFromFeatured(post.blogHTML) }}</p>
              </div>

              <div class="featured-metadata">
                <time class="featured-date">{{ post.blogData }}</time>
                <div class="featured-divider"></div>
                <span class="featured-category">Blog Post</span>
              </div>

              <div class="featured-actions">
                <RouterLink
                  :to="{
                    name: 'viewPost',
                    params: { uid: post.uid, index: originalPostIndex },
                  }"
                  class="featured-cta"
                >
                  <span class="cta-text">Read Full Story</span>
                  <div class="cta-arrow">
                    <img :src="arrowRight" width="18" alt="" />
                  </div>
                  <div class="cta-ripple"></div>
                </RouterLink>
              </div>
            </div>

            <!-- Blog Image Section -->
            <div class="featured-image-section">
              <div class="featured-image-container">
                <img :src="post.blogCoverPhotoUrl" :alt="post.title" class="featured-image" />
                <div class="image-overlay">
                  <div class="overlay-gradient"></div>
                  <div class="overlay-particles">
                    <div class="particle" v-for="n in 4" :key="n"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Background Effects -->
          <div class="featured-background">
            <div class="bg-gradient"></div>
            <div class="bg-mesh"></div>
            <div class="floating-elements">
              <div class="float-element" v-for="n in 6" :key="n"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-post-card-container {
  padding: 0;
  overflow: hidden;
  min-width: 100vw;
}

a {
  border-bottom: 1px solid transparent;
  transition: 0.3s ease-in all;
  &:hover {
    border-bottom: 1px solid black;
  }
}

// ====== ULTRA-MODERN BUTTERFLY HERO SECTION ======
.blog__hero-container {
  min-width: 100vw;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  background: radial-gradient(
      ellipse at top left,
      rgba(6, 214, 160, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at top right,
      rgba(255, 107, 157, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at bottom center,
      rgba(255, 210, 63, 0.06) 0%,
      transparent 50%
    ),
    linear-gradient(135deg, #0a0a0f 0%, #050510 100%);
  overflow: hidden;
  padding: 0 2rem;

  // Animated Background Elements
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(6, 214, 160, 0.03) 2px,
      rgba(6, 214, 160, 0.03) 4px
    );
    animation: backgroundShift 20s linear infinite;
    pointer-events: none;
  }

  // Modern Content Layout
  .hero-container__content {
    flex: 1;
    max-width: 600px;
    padding: 2rem;
    z-index: 2;
    position: relative;

    .hero-title-section {
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(6, 214, 160, 0.1);
        border: 1px solid rgba(6, 214, 160, 0.2);
        border-radius: 50px;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 2rem;
        backdrop-filter: blur(10px);
        animation: badgeGlow 3s ease-in-out infinite;

        .badge-icon {
          font-size: 1rem;
          animation: iconFloat 2s ease-in-out infinite;
        }

        .badge-text {
          color: var(--butterfly-teal);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      }

      .hero-main-title {
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        font-family: "Inter", system-ui, sans-serif;

        .title-line-1,
        .title-line-2,
        .title-line-3 {
          display: block;
          animation: titleSlideIn 1s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .title-line-1 {
          animation-delay: 0.2s;
          color: var(--text-primary);
        }

        .title-line-2 {
          animation-delay: 0.4s;
          color: var(--text-secondary);

          .gradient-text {
            background: linear-gradient(
              135deg,
              var(--butterfly-teal),
              var(--butterfly-light),
              var(--butterfly-accent)
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% 200%;
            animation: gradientShift 3s ease-in-out infinite;
          }
        }

        .title-line-3 {
          animation-delay: 0.6s;
          color: var(--text-primary);
        }
      }

      .hero-subtitle {
        font-size: 1.125rem;
        line-height: 1.7;
        color: var(--text-secondary);
        margin-bottom: 3rem;
        max-width: 500px;
        opacity: 0;
        animation: fadeInUp 1s ease-out 0.8s forwards;
      }

      .hero-cta-container {
        display: flex;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
        opacity: 0;
        animation: fadeInUp 1s ease-out 1s forwards;

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(
            135deg,
            var(--butterfly-teal),
            var(--butterfly-deep)
          );
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(6, 214, 160, 0.3);

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: left 0.5s;
          }

          .cta-arrow {
            transition: transform 0.3s ease;

            img {
              filter: brightness(0) invert(1);
            }
          }

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(6, 214, 160, 0.4);

            &::before {
              left: 100%;
            }

            .cta-arrow {
              transform: translateX(4px);
            }
          }
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(6, 214, 160, 0.2);
          color: var(--text-primary);
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;

          &:hover {
            background: rgba(6, 214, 160, 0.1);
            border-color: var(--butterfly-teal);
            transform: translateY(-1px);
            color: var(--butterfly-light);
          }
        }
      }

      .hero-features {
        display: flex;
        gap: 2rem;
        opacity: 0;
        animation: fadeInUp 1s ease-out 1.2s forwards;

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.507);
          font-size: 0.875rem;

          .feature-icon {
            font-size: 1.25rem;
            animation: iconBounce 2s ease-in-out infinite;
          }
        }
      }
    }
  }

  // Enhanced Visual Section
  .hero-container__visual {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 600px;

    .butterfly-showcase {
      position: relative;
      width: 100%;
      max-width: 500px;
      aspect-ratio: 1;
      margin: 0 auto;

      .main-butterfly {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        animation: butterflyHover 6s ease-in-out infinite;

        .butterfly-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.2) contrast(1.1);
          transition: all 0.5s ease;
        }

        .butterfly-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;

          .glow-effect {
            position: absolute;
            top: -20%;
            left: -20%;
            width: 140%;
            height: 140%;
            background: radial-gradient(
              circle,
              var(--butterfly-shadow) 0%,
              transparent 70%
            );
            animation: glowPulse 4s ease-in-out infinite;
            border-radius: 50%;
          }

          .particle-trail {
            position: absolute;
            top: 50%;
            left: 50%;

            .trail-particle {
              position: absolute;
              width: 4px;
              height: 4px;
              background: var(--butterfly-light);
              border-radius: 50%;
              animation: trailFloat 3s ease-in-out infinite;

              @for $i from 1 through 8 {
                &:nth-child(#{$i}) {
                  animation-delay: #{$i * 0.2}s;
                  transform: rotate(#{$i * 45}deg) translateX(120px);
                }
              }
            }
          }
        }

        &:hover {
          .butterfly-image {
            transform: scale(1.05);
            filter: saturate(1.4) contrast(1.2);
          }
        }
      }

      .decorative-elements {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            var(--butterfly-shadow) 0%,
            transparent 70%
          );
          animation: orbFloat 8s ease-in-out infinite;

          &.orb-1 {
            width: 60px;
            height: 60px;
            top: 10%;
            right: 10%;
            animation-delay: 0s;
          }

          &.orb-2 {
            width: 40px;
            height: 40px;
            bottom: 20%;
            left: 15%;
            animation-delay: 2s;
          }

          &.orb-3 {
            width: 50px;
            height: 50px;
            top: 60%;
            right: 20%;
            animation-delay: 4s;
          }
        }

        .text-path {
          position: absolute;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--butterfly-teal);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.7;
          animation: textPathMove 12s linear infinite;

          &.path-1 {
            top: 20%;
            left: 0%;
            animation-delay: 0s;
          }

          &.path-2 {
            bottom: 30%;
            right: 0%;
            animation-delay: 4s;
          }

          &.path-3 {
            top: 70%;
            left: 20%;
            animation-delay: 8s;
          }
        }
      }

      .visual-background {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        z-index: -1;

        .bg-pattern {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: patternRotate 20s linear infinite;

          &.pattern-1 {
            width: 300px;
            height: 300px;
            top: 20%;
            left: 20%;
            background: conic-gradient(
              from 0deg,
              var(--butterfly-teal),
              transparent,
              var(--butterfly-teal)
            );
          }

          &.pattern-2 {
            width: 200px;
            height: 200px;
            bottom: 30%;
            right: 30%;
            background: conic-gradient(
              from 45deg,
              var(--butterfly-accent),
              transparent,
              var(--butterfly-accent)
            );
            animation-delay: 7s;
          }

          &.pattern-3 {
            width: 250px;
            height: 250px;
            top: 60%;
            left: 60%;
            background: conic-gradient(
              from 90deg,
              var(--butterfly-gold),
              transparent,
              var(--butterfly-gold)
            );
            animation-delay: 14s;
          }
        }
      }
    }
  }
}

// ====== ULTRA-MODERN FEATURED BLOG CONTAINER ======
.featured-blog-container {
  position: relative;
  width: 100%;
  min-width: 100vw;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(10, 10, 15, 0.98) 0%, 
    rgba(15, 15, 25, 0.95) 50%, 
    rgba(5, 5, 10, 0.98) 100%
  );
  border-top: 2px solid rgba(6, 214, 160, 0.2);

  .featured-blog-content {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 2rem;
    gap: 4rem;

    .featured-content-section {
      flex: 1;
      max-width: 600px;

      .featured-badge {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(6, 214, 160, 0.1);
        border: 1px solid rgba(6, 214, 160, 0.3);
        border-radius: 20px;
        margin-bottom: 2rem;
        backdrop-filter: blur(10px);

        .badge-pulse {
          width: 8px;
          height: 8px;
          background: #06d6a0;
          border-radius: 50%;
          animation: badgePulse 2s ease-in-out infinite;
        }

        .badge-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: #06d6a0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }

      .featured-header {
        margin-bottom: 2rem;

        .featured-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #f8fafc;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #06d6a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .featured-title-underliner {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #06d6a0, rgba(6, 214, 160, 0.3));
          border-radius: 2px;
          animation: underlinerGlow 3s ease-in-out infinite;
        }
      }

      .featured-excerpt {
        margin-bottom: 2rem;

        .excerpt-text {
          font-size: 1.125rem;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.8);
          font-weight: 400;
        }
      }

      .featured-metadata {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2.5rem;

        .featured-date {
          font-size: 0.875rem;
          color: rgba(6, 214, 160, 0.8);
          font-weight: 500;
        }

        .featured-divider {
          width: 1px;
          height: 16px;
          background: rgba(6, 214, 160, 0.3);
        }

        .featured-category {
          font-size: 0.875rem;
          color: rgba(248, 250, 252, 0.6);
          font-weight: 500;
        }
      }

      .featured-actions {
        .featured-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: rgba(6, 214, 160, 0.1);
          border: 2px solid rgba(6, 214, 160, 0.3);
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
          overflow: hidden;

          .cta-text {
            font-size: 1rem;
            font-weight: 600;
            color: #06d6a0;
            z-index: 2;
            position: relative;
          }

          .cta-arrow {
            z-index: 2;
            position: relative;
            transition: transform 0.3s ease;
          }

          .cta-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(6, 214, 160, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
            z-index: 1;
          }

          &:hover {
            border-color: #06d6a0;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(6, 214, 160, 0.2);

            .cta-arrow {
              transform: translateX(4px);
            }

            .cta-ripple {
              width: 300px;
              height: 300px;
            }
          }
        }
      }
    }

    .featured-image-section {
      flex: 1;
      max-width: 600px;

      .featured-image-container {
        position: relative;
        width: 100%;
        height: 400px;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(6, 214, 160, 0.2);

        .featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;

          .overlay-gradient {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              135deg,
              rgba(6, 214, 160, 0.1) 0%,
              transparent 50%,
              rgba(6, 214, 160, 0.05) 100%
            );
          }

          .overlay-particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            .particle {
              position: absolute;
              width: 4px;
              height: 4px;
              background: #06d6a0;
              border-radius: 50%;
              opacity: 0.6;
              animation: particleFloat 4s ease-in-out infinite;

              &:nth-child(1) {
                top: 20%;
                left: 15%;
                animation-delay: 0s;
              }

              &:nth-child(2) {
                top: 60%;
                right: 20%;
                animation-delay: 1s;
              }

              &:nth-child(3) {
                bottom: 30%;
                left: 70%;
                animation-delay: 2s;
              }

              &:nth-child(4) {
                top: 80%;
                right: 60%;
                animation-delay: 3s;
              }
            }
          }
        }

        &:hover {
          .featured-image {
            transform: scale(1.05);
          }
        }
      }
    }
  }

  .featured-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .bg-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        ellipse at center,
        rgba(6, 214, 160, 0.05) 0%,
        transparent 70%
      );
    }

    .bg-mesh {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 2px 2px, rgba(6, 214, 160, 0.1) 1px, transparent 0);
      background-size: 40px 40px;
      opacity: 0.3;
    }

    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .float-element {
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(6, 214, 160, 0.4);
        border-radius: 50%;
        animation: floatUp 8s ease-in-out infinite;

        &:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
        }

        &:nth-child(2) {
          left: 30%;
          animation-delay: 2s;
        }

        &:nth-child(3) {
          right: 20%;
          animation-delay: 4s;
        }

        &:nth-child(4) {
          right: 40%;
          animation-delay: 6s;
        }

        &:nth-child(5) {
          left: 60%;
          animation-delay: 1s;
        }

        &:nth-child(6) {
          right: 10%;
          animation-delay: 3s;
        }
      }
    }
  }
}

// ====== ALTERNATE FEATURED BLOG CONTAINER ======
.featured-blog-container-alt {
  @extend .featured-blog-container;
  
  background: linear-gradient(135deg, 
    rgba(15, 15, 25, 0.98) 0%, 
    rgba(10, 10, 15, 0.95) 50%, 
    rgba(20, 20, 30, 0.98) 100%
  );
  border-top: 2px solid rgba(255, 107, 157, 0.2);

  .featured-blog-content {
    flex-direction: row-reverse;

    .featured-badge {
      background: rgba(255, 107, 157, 0.1);
      border-color: rgba(255, 107, 157, 0.3);

      .badge-pulse {
        background: #ff6b9d;
        animation: badgePulseAlt 2s ease-in-out infinite;
      }

      .badge-text {
        color: #ff6b9d;
      }
    }

    .featured-header {
      .featured-title {
        background: linear-gradient(135deg, #f8fafc 0%, #ff6b9d 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .featured-title-underliner {
        background: linear-gradient(90deg, #ff6b9d, rgba(255, 107, 157, 0.3));
      }
    }

    .featured-metadata {
      .featured-date {
        color: rgba(255, 107, 157, 0.8);
      }

      .featured-divider {
        background: rgba(255, 107, 157, 0.3);
      }
    }

    .featured-actions {
      .featured-cta {
        background: rgba(255, 107, 157, 0.1);
        border-color: rgba(255, 107, 157, 0.3);

        .cta-text {
          color: #ff6b9d;
        }

        .cta-ripple {
          background: rgba(255, 107, 157, 0.2);
        }

        &:hover {
          border-color: #ff6b9d;
          box-shadow: 0 10px 30px rgba(255, 107, 157, 0.2);
        }
      }
    }

    .featured-image-container {
      border-color: rgba(255, 107, 157, 0.2);

      .overlay-gradient {
        background: linear-gradient(
          135deg,
          rgba(255, 107, 157, 0.1) 0%,
          transparent 50%,
          rgba(255, 107, 157, 0.05) 100%
        );
      }

      .overlay-particles .particle {
        background: #ff6b9d;
      }
    }
  }

  .featured-background {
    .bg-gradient {
      background: radial-gradient(
        ellipse at center,
        rgba(255, 107, 157, 0.05) 0%,
        transparent 70%
      );
    }

    .bg-mesh {
      background-image: 
        radial-gradient(circle at 2px 2px, rgba(255, 107, 157, 0.1) 1px, transparent 0);
    }

    .floating-elements .float-element {
      background: rgba(255, 107, 157, 0.4);
    }
  }
}

// ====== FEATURED BLOG ANIMATIONS ======
@keyframes badgePulse {
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.1); 
  }
}

@keyframes badgePulseAlt {
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.1); 
  }
}

@keyframes underlinerGlow {
  0%, 100% { 
    opacity: 0.8; 
    box-shadow: 0 0 5px rgba(6, 214, 160, 0.3);
  }
  50% { 
    opacity: 1; 
    box-shadow: 0 0 15px rgba(6, 214, 160, 0.6);
  }
}

@keyframes particleFloat {
  0%, 100% { 
    opacity: 0.4; 
    transform: translateY(0) scale(1);
  }
  50% { 
    opacity: 0.8; 
    transform: translateY(-10px) scale(1.1);
  }
}

@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  10%, 90% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}

// ====== MODERN HERO ANIMATIONS ======
@keyframes backgroundShift {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
}

@keyframes badgeGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(6, 214, 160, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(6, 214, 160, 0.4);
  }
}

@keyframes iconFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes titleSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes butterflyHover {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(2deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-2deg);
  }
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes trailFloat {
  0%,
  100% {
    opacity: 0;
    transform: translateX(120px) scale(0);
  }
  50% {
    opacity: 1;
    transform: translateX(140px) scale(1);
  }
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(20px, -20px) scale(1.2);
    opacity: 0.6;
  }
}

@keyframes textPathMove {
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }
  10%,
  90% {
    opacity: 0.7;
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
    opacity: 0;
  }
}

@keyframes patternRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// ====== RESPONSIVE DESIGN ======
@media screen and (max-width: 768px) {
  .blog__hero-container {
    flex-direction: column;
    padding: 1rem;
    min-height: auto;
    z-index: 2;

    .hero-container__content {
      order: 2;
      padding: 2rem 1rem;
      text-align: center;

      .hero-title-section {
        .hero-main-title {
          font-size: clamp(2rem, 10vw, 3rem);
        }

        .hero-cta-container {
          flex-direction: column;
          align-items: center;
          gap: 1rem;

          .cta-primary,
          .cta-secondary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }

        .hero-features {
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
      }
    }

    .hero-container__visual {
      order: 1;
      min-height: 400px;

      .butterfly-showcase {
        max-width: 350px;
        height: 350px;
      }
    }
  }
}

.blog__regular-container {
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  gap: 0;
  .regular-container__title {
    display: flex;
    justify-content: center;
    margin-left: 0;
    width: 100% !important;
    height: 100%;
    padding: 1rem;
    h1 {
      margin-left: 0;
    }

    p {
      margin-left: 0;
    }
    a {
      margin-left: 0;
    }
  }

  .regular-container__img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 100%;
      height: 60vh;
      object-fit: cover;
    }
  }
}

.blog__regular-container-odd {
  flex-direction: column-reverse;
  height: 30%;

  .regular-container__title {
    display: flex;
    justify-content: center;
    margin-left: 0;
    width: 100% !important;
    height: 100%;
    padding: 1rem;
    h1 {
      margin-left: 0;
    }

    p {
      margin-left: 0;
    }
    a {
      margin-left: 0;
    }
  }

  .regular-container__img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 100%;
      height: 60vh;
      object-fit: cover;
    }
  }
}

// ====== FEATURED BLOG RESPONSIVE DESIGN ======
@media (max-width: 768px) {
  .featured-blog-container,
  .featured-blog-container-alt {
    min-height: auto;
    padding: 2rem 0;

    .featured-blog-content {
      flex-direction: column !important;
      gap: 2rem;
      padding: 2rem 1rem;

      .featured-content-section {
        text-align: center;

        .featured-header {
          .featured-title {
            font-size: 2rem;
          }
        }

        .featured-excerpt {
          margin-bottom: 1.5rem;

          .excerpt-text {
            font-size: 1rem;
          }
        }

        .featured-metadata {
          justify-content: center;
        }
      }

      .featured-image-section {
        .featured-image-container {
          height: 300px;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .featured-blog-container,
  .featured-blog-container-alt {
    .featured-blog-content {
      padding: 1.5rem 1rem;

      .featured-content-section {
        .featured-header {
          .featured-title {
            font-size: 1.75rem;
          }
        }

        .featured-actions {
          .featured-cta {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
          }
        }
      }

      .featured-image-section {
        .featured-image-container {
          height: 250px;
        }
      }
    }
  }

  // Mobile responsiveness for butterfly section
  .hero-image-section {
    min-height: 400px;
    padding: 2rem 1rem;

    .butterfly-showcase {
      max-width: 280px;
      
      .main-butterfly .butterfly-overlay {
        .glow-effect {
          top: -10%;
          left: -10%;
          width: 120%;
          height: 120%;
        }
      }
    }
  }
}
</style>
