<script setup>
//imports
import { ref, reactive, toRef, computed } from "vue";

import { arrowRight, edit, trash } from "@/assets/icons";
import { useModalStore } from "../stores/modalStore";
import { useBlogStore } from "../stores/blogStore";
import { doc, collection, deleteDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/connection";

const modalStore = useModalStore();

const props = defineProps({
  //props
  content: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["open-modal", "open-edit-modal"]);

const { content, index } = toRefs(props);

//boner overlord
//states
const blogStore = useBlogStore();
const hover = ref(false);

//lifecycle

//functions
function deletePost() {
  //console.log("delete post", content.value);
  modalStore.displayModal({
    title: "Are you sure?",
    text: "this will delete your post forever",
    showCancelButton: true,
    onOk: async () => {
      const storage = getStorage();

      //delete all files that are stored in this path

      //the image path in URL form contains %
      const imagePathInUrlForm = content.value.blogCoverPhotoUrl;
      //console.log(imagePathInUrlForm);
      const blogPhotoRef = storageRef(storage, imagePathInUrlForm);

      if (imagePathInUrlForm !== "" && imagePathInUrlForm) {
        deleteObject(blogPhotoRef)
          .then((res) => {
            //console.log("Images deleted successfully");
          })
          .catch((err) => {
            //console.log("Images failed to delete");
            modalStore.displayModal({
              title: "Error",
              text: "Failed to delete the image",
              showCancelButton: false,
            });
          });
      }

      // Delete the file

      deleteDoc(doc(db, "posts", content.value.docId))
        .then(() => {
          modalStore.displayModal({
            title: "Success",
            text: "Post deleted successfully",
            showCancelButton: false,
          });
          blogStore.blogCardState.splice(index.value, 1);
        })
        .catch((error) => {
          modalStore.displayModal({
            title: "Error",
            text: "Failed to delete the post",
            showCancelButton: false,
          });
        });
    },
  });
}

function editPost() {
  emits("open-edit-modal", content.value, index.value);
}

// Helper function to extract text preview from HTML content
function extractTextFromHTML(html) {
  if (!html) return '';
  // Remove HTML tags and get first 120 characters
  const text = html.replace(/<[^>]*>/g, '').trim();
  return text.length > 120 ? text.substring(0, 120) + '...' : text;
}
</script>

<template>
  <article class="ultra-modern-card">
    <!-- Dynamic Background System -->
    <div class="card-atmosphere">
      <div class="prismatic-gradient"></div>
      <div class="neural-mesh"></div>
      <div class="quantum-particles">
        <div class="particle" v-for="n in 6" :key="n"></div>
      </div>
      <div class="morphic-blur"></div>
    </div>

    <!-- Magnetic Action Panel -->
    <div class="magnetic-actions" v-if="blogStore.editPost">
      <div class="action-cluster">
        <button class="neo-action edit-action" @click="editPost" aria-label="Edit Post">
          <div class="action-core">
            <img :src="edit" width="14" alt="" />
          </div>
          <div class="action-ripple"></div>
        </button>
        <button class="neo-action delete-action" @click="deletePost" aria-label="Delete Post">
          <div class="action-core">
            <img :src="trash" width="14" alt="" />
          </div>
          <div class="action-ripple"></div>
        </button>
      </div>
    </div>

    <!-- Immersive Media Container -->
    <div 
      class="media-portal" 
      @click.prevent="$emit('open-modal', content, index)"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div class="media-frame">
        <img
          :src="content.blogCoverPhotoUrl"
          :alt="content.title"
          class="hero-image"
          loading="lazy"
        />
        <div class="holographic-overlay">
          <div class="activation-zone">
            <div class="pulse-ring"></div>
            <div class="action-indicator">
              <span class="indicator-text">Explore</span>
              <div class="arrow-propulsion">
                <img :src="arrowRight" width="18" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Floating Metadata -->
      <div class="metadata-capsule">
        <time class="temporal-stamp">{{ content.blogData }}</time>
        <!-- #todoArt: Add dynamic category chip -->
      </div>
    </div>

    <!-- Content Layer - Better Layout -->
    <div class="content-matrix">
      <!-- Title Section - Now at Top -->
      <header class="title-section">
        <h2 class="blog-title">{{ content.title || 'Untitled Post' }}</h2>
        <div class="title-accent"></div>
      </header>

      <!-- Description Section - Smaller Text -->
      <div class="description-section">
        <p class="description-text">
          {{ extractTextFromHTML(content.blogHTML) || content.description || content.excerpt || content.summary || 'Discover the amazing stories and insights within this blog post.' }}
        </p>
      </div>

      <!-- Action Section - Prominent Button -->
      <div class="action-section">
        <RouterLink
          :to="{ name: 'viewPost', params: { uid: content?.uid, index: index } }"
          class="read-post-btn"
        >
          <span class="btn-text">Read Post</span>
          <div class="btn-icon">
            <img :src="arrowRight" width="18" alt="" />
          </div>
          <div class="btn-glow"></div>
        </RouterLink>
      </div>
    </div>

    <!-- Ambient Glow System -->
    <div class="luminescence-field"></div>
  </article>
</template>

<style lang="scss" scoped>
// ====== NEO-FUTURISTIC DESIGN SYSTEM ======
:root {
  --neo-void: #0a0a0f;
  --neo-surface: rgba(15, 15, 25, 0.95);
  --neo-glass: rgba(255, 255, 255, 0.03);
  --neo-border: rgba(6, 214, 160, 0.12);
  --neo-accent: #06d6a0;
  --neo-accent-bright: #40f99b;
  --neo-accent-electric: #7fffd4;
  --neo-text-primary: #ffffff;
  --neo-text-secondary: #a1a1aa;
  --neo-text-muted: #71717a;
  --neo-gradient-primary: linear-gradient(135deg, #06d6a0 0%, #40f99b 50%, #7fffd4 100%);
  --neo-gradient-surface: linear-gradient(145deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 25, 40, 0.9) 100%);
  --neo-shadow-ambient: 0 0 60px rgba(6, 214, 160, 0.05);
  --neo-shadow-focused: 0 20px 60px rgba(6, 214, 160, 0.15);
  --neo-shadow-elevated: 0 30px 80px rgba(6, 214, 160, 0.25);
  --neo-blur-light: blur(20px);
  --neo-blur-heavy: blur(40px);
  --neo-transition-smooth: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  --neo-transition-spring: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

// ====== ULTRA-MODERN CARD ARCHITECTURE ======
.ultra-modern-card {
  position: relative;
  width: 100%;
  height: 520px;
  background: var(--neo-surface);
  border: 1px solid var(--neo-border);
  border-radius: 28px;
  overflow: hidden;
  transition: var(--neo-transition-smooth);
  cursor: pointer;
  isolation: isolate;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(6, 214, 160, 0.15);
    border-color: rgba(6, 214, 160, 0.4);

    .magnetic-actions {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .media-portal .hero-image {
      transform: scale(1.05);
    }

    .metadata-capsule {
      transform: translateY(-4px);
      opacity: 1;
    }

    .content-matrix {
      .title-accent {
        width: 60px;
        opacity: 1;
      }

      .read-post-btn {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(6, 214, 160, 0.3);
        
        .btn-glow {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }

  // ====== DYNAMIC ATMOSPHERE SYSTEM ======
  .card-atmosphere {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;

    .prismatic-gradient {
      position: absolute;
      inset: -20%;
      background: conic-gradient(
        from 45deg at 50% 50%,
        rgba(6, 214, 160, 0.1) 0deg,
        rgba(64, 249, 155, 0.05) 120deg,
        rgba(127, 255, 212, 0.08) 240deg,
        rgba(6, 214, 160, 0.1) 360deg
      );
      border-radius: 50%;
      opacity: 0.3;
      transition: var(--neo-transition-smooth);
      animation: prismaticRotation 20s linear infinite;
    }

    .neural-mesh {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 25% 25%, rgba(6, 214, 160, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(64, 249, 155, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(127, 255, 212, 0.01) 0%, transparent 60%);
      opacity: 0.2;
      transition: var(--neo-transition-smooth);
    }

    .quantum-particles {
      position: absolute;
      inset: 0;

      .particle {
        position: absolute;
        width: 1px;
        height: 1px;
        background: var(--neo-accent-electric);
        border-radius: 50%;
        opacity: 0.4;
        animation: quantumFloat 8s ease-in-out infinite;
        animation-play-state: paused;

        &:nth-child(1) { top: 15%; left: 25%; animation-delay: 0s; }
        &:nth-child(2) { top: 35%; left: 75%; animation-delay: 1.3s; }
        &:nth-child(3) { top: 65%; left: 20%; animation-delay: 2.6s; }
        &:nth-child(4) { top: 85%; left: 80%; animation-delay: 3.9s; }
        &:nth-child(5) { top: 25%; left: 60%; animation-delay: 5.2s; }
        &:nth-child(6) { top: 55%; left: 40%; animation-delay: 6.5s; }
      }
    }

    .morphic-blur {
      position: absolute;
      inset: 0;
      backdrop-filter: var(--neo-blur-light);
      transition: backdrop-filter 0.4s ease;
    }
  }

  // ====== MAGNETIC ACTION SYSTEM ======
  .magnetic-actions {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 20;
    opacity: 0;
    transform: translateY(-15px) scale(0.8);
    transition: var(--neo-transition-spring);

    .action-cluster {
      display: flex;
      gap: 8px;
      
      .neo-action {
        position: relative;
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 50%;
        background: var(--neo-glass);
        backdrop-filter: var(--neo-blur-light);
        border: 1px solid var(--neo-border);
        cursor: pointer;
        overflow: hidden;
        transition: var(--neo-transition-smooth);

        .action-core {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          transition: var(--neo-transition-smooth);

          img {
            filter: brightness(0) invert(1);
            opacity: 0.8;
            transition: var(--neo-transition-smooth);
          }
        }

        .action-ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0);
          transition: var(--neo-transition-smooth);
        }

        &.edit-action {
          &:hover {
            border-color: var(--neo-accent);
            box-shadow: 0 8px 32px rgba(6, 214, 160, 0.3);
            
            .action-ripple {
              background: var(--neo-gradient-primary);
              opacity: 0.1;
              transform: scale(1);
            }

            .action-core img {
              filter: brightness(0) invert(1);
              opacity: 1;
              transform: scale(1.1);
            }
          }
        }

        &.delete-action {
          &:hover {
            border-color: #ef4444;
            box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
            
            .action-ripple {
              background: linear-gradient(135deg, #ef4444, #f87171);
              opacity: 0.1;
              transform: scale(1);
            }

            .action-core img {
              filter: brightness(0) invert(1);
              opacity: 1;
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }

  // ====== IMMERSIVE MEDIA PORTAL ======
  .media-portal {
    position: relative;
    height: 300px;
    overflow: hidden;
    cursor: pointer;
    margin: 0;
    border-radius: 28px 28px 0 0;

    .media-frame {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .hero-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--neo-transition-smooth);
        filter: brightness(0.95) saturate(1.1);
      }

      .holographic-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          rgba(6, 214, 160, 0.85) 0%,
          rgba(64, 249, 155, 0.75) 35%,
          rgba(127, 255, 212, 0.65) 70%,
          rgba(6, 214, 160, 0.8) 100%
        );
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        backdrop-filter: blur(0px);
        transition: var(--neo-transition-smooth);

        .activation-zone {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;

          .pulse-ring {
            width: 80px;
            height: 80px;
            border: 2px solid rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: pulseExpansion 2s ease-in-out infinite;
          }

          .action-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            color: white;

            .indicator-text {
              font-size: 1.1rem;
              font-weight: 700;
              letter-spacing: 0.05em;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            .arrow-propulsion {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 48px;
              height: 48px;
              background: rgba(255, 255, 255, 0.15);
              border: 1px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              backdrop-filter: blur(8px);
              transition: var(--neo-transition-smooth);

              img {
                filter: brightness(0) invert(1);
                transition: var(--neo-transition-smooth);
              }

              &:hover {
                transform: scale(1.1);
                background: rgba(255, 255, 255, 0.25);
              }
            }
          }
        }
      }
    }

    .metadata-capsule {
      position: absolute;
      top: 20px;
      left: 20px;
      opacity: 0.8;
      transform: translateY(0);
      transition: var(--neo-transition-smooth);

      .temporal-stamp {
        display: inline-block;
        padding: 8px 16px;
        background: var(--neo-glass);
        border: 1px solid var(--neo-border);
        border-radius: 20px;
        backdrop-filter: var(--neo-blur-light);
        color: var(--neo-text-secondary);
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 0.025em;
      }
    }
  }

  // ====== IMPROVED CONTENT LAYER ======
  .content-matrix {
    position: relative;
    z-index: 5;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 200px;

    .title-section {
      position: relative;
      margin-bottom: 12px;

      .blog-title {
        font-size: 1.6rem;
        font-weight: 900;
        color: #ffffff;
        line-height: 1.2;
        margin: 0 0 8px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-shadow: 0 2px 10px rgba(6, 214, 160, 0.3);
        letter-spacing: -0.02em;
      }

      .title-accent {
        height: 3px;
        width: 0%;
        background: linear-gradient(90deg, #06d6a0, #40f99b);
        border-radius: 2px;
        transition: all 0.3s ease;
        opacity: 0.8;
      }
    }

    .description-section {
      flex: 1;
      margin-bottom: 16px;

      .description-text {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        letter-spacing: 0.01em;
        font-weight: 400;
      }
    }

    .action-section {
      margin-top: auto;
      
      .read-post-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 5px 12px;
        background: linear-gradient(135deg, rgba(6, 214, 160, 0.1) 0%, rgba(64, 249, 155, 0.05) 100%);
        border: 2px solid rgba(6, 214, 160, 0.3);
        border-radius: 25px;
        text-decoration: none;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        overflow: hidden;

        .btn-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #06d6a0;
          z-index: 2;
          position: relative;
        }

        .btn-icon {
          z-index: 2;
          position: relative;
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
          
          img {
            filter: brightness(0) saturate(100%) invert(64%) sepia(96%) saturate(459%) hue-rotate(115deg) brightness(91%) contrast(87%);
          }
        }

        .btn-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(6, 214, 160, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: all 0.3s ease;
          z-index: 1;
          opacity: 0;
        }

        &:hover {
          border-color: #06d6a0;
          
          .btn-icon {
            transform: translateX(4px);
          }
          
          .btn-glow {
            width: 200px;
            height: 200px;
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      }
    }
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          background: var(--neo-glass);
          border: 1px solid var(--neo-border);
          border-radius: 16px;
          backdrop-filter: var(--neo-blur-light);
          transition: var(--neo-transition-smooth);
          position: relative;
          z-index: 2;

          .link-caption {
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.025em;
          }

          .link-accelerator {
            display: flex;
            align-items: center;
            transition: var(--neo-transition-smooth);

            img {
              filter: brightness(0) invert(1);
              opacity: 0.8;
              transition: var(--neo-transition-smooth);
            }
          }
        }

        .link-trail {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0%;
          background: var(--neo-gradient-primary);
          transition: var(--neo-transition-smooth);
          z-index: 1;
        }

        &:hover {
          .link-nucleus {
            background: rgba(6, 214, 160, 0.1);
            border-color: var(--neo-accent);
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(6, 214, 160, 0.2);

            .link-accelerator {
              transform: translateX(4px);
              
              img {
                opacity: 1;
      }
    }
  }

  // ====== AMBIENT LUMINESCENCE ======
  .luminescence-field {
    position: absolute;
    inset: -50%;
    background: radial-gradient(
      circle at center,
      rgba(6, 214, 160, 0.05) 0%,
      transparent 70%
    );
    opacity: 0;
    transform: scale(0.8);
    transition: var(--neo-transition-smooth);
    pointer-events: none;
    z-index: 0;
  }
}

// ====== QUANTUM ANIMATIONS ======
@keyframes prismaticRotation {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes quantumFloat {
  0%, 100% { 
    opacity: 0.2; 
    transform: translateY(0px) scale(1);
  }
  25% { 
    opacity: 0.6; 
    transform: translateY(-8px) scale(1.2);
  }
  50% { 
    opacity: 0.8; 
    transform: translateY(-15px) scale(0.8);
  }
  75% { 
    opacity: 0.4; 
    transform: translateY(-8px) scale(1.1);
  }
}

@keyframes pulseExpansion {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.6; 
  }
  50% { 
    transform: scale(1.2); 
    opacity: 0.3; 
  }
}

@keyframes luminescenceGlow {
  0%, 100% { 
    opacity: 0.1; 
    transform: scale(0.8) rotate(0deg);
  }
  50% { 
    opacity: 0.3; 
    transform: scale(1.2) rotate(180deg);
  }
}

// ====== RESPONSIVE QUANTUM DESIGN ======
@media (max-width: 1024px) {
  .ultra-modern-card {
    height: 460px;

    .media-portal {
      height: 260px;
    }

    .content-matrix {
      padding: 20px;
      gap: 14px;

      .title-constellation .quantum-title {
        font-size: 1.3rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .ultra-modern-card {
    height: 440px;

    .magnetic-actions {
      top: 16px;
      right: 16px;

      .action-cluster .neo-action {
        width: 40px;
        height: 40px;
      }
    }

    .media-portal {
      height: 240px;

      .metadata-capsule {
        top: 16px;
        left: 16px;

        .temporal-stamp {
          padding: 6px 12px;
          font-size: 0.8rem;
        }
      }

      .media-frame .holographic-overlay {
        .activation-zone {
          gap: 12px;

          .pulse-ring {
            width: 60px;
            height: 60px;
          }

          .action-indicator {
            gap: 8px;

            .indicator-text {
              font-size: 1rem;
            }

            .arrow-propulsion {
              width: 40px;
              height: 40px;
            }
          }
        }
      }
    }

    .content-matrix {
      padding: 18px;
      gap: 12px;

      .title-constellation .quantum-title {
        font-size: 1.2rem;
      }

      .description-section .description-text {
        font-size: 0.8rem;
        -webkit-line-clamp: 2;
        line-clamp: 2;
      }

      .action-section .read-post-btn {
        padding: 10px 20px;

        .btn-text {
          font-size: 0.85rem;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .ultra-modern-card {
    height: 400px;

    .media-portal {
      height: 200px;
    }

    .content-matrix {
      padding: 16px;

      .title-section .blog-title {
        font-size: 1.2rem;
      }

      .action-section .read-post-btn {
        padding: 8px 16px;
        gap: 6px;
        
        .btn-text {
          font-size: 0.8rem;
        }
      }
    }
  }
}
}
</style>
