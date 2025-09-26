<script setup>
//imports
import { ref, reactive } from "vue";

defineProps({
  //props
  modalMessage: {
    type: String,
    required: true,
    default: "Warning! ",
  },
  modalType: {
    type: String,
    required: false,
    default: "info",
    validator: (value) => ['success', 'warning', 'error', 'info'].includes(value)
  },
});

defineEmits(["closeModal"]);

//general

//states

//lifecycle

//functions

//
</script>

<template>
  <div class="ultra-modern-modal" :class="`modal-${modalType}`">
    <!-- Animated Background Overlay -->
    <div class="modal-backdrop">
      <div class="backdrop-gradient"></div>
      <div class="floating-particles">
        <div class="modal-particle" v-for="n in 12" :key="n"></div>
      </div>
    </div>

    <!-- Modal Content Container -->
    <div class="modal-container">
      <div class="modal-content">
        <!-- Close Button -->
        <button @click="$emit('closeModal')" class="modal-close-btn">
          <div class="close-icon">
            <span class="close-line close-line-1"></span>
            <span class="close-line close-line-2"></span>
          </div>
        </button>

        <!-- Modal Message -->
        <div class="modal-message">
          <div class="message-icon">
            <div class="icon-butterfly">
              <div class="butterfly-wing wing-left"></div>
              <div class="butterfly-wing wing-right"></div>
              <div class="butterfly-body"></div>
            </div>
          </div>
          <p class="message-text">{{ modalMessage }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="modal-actions">
          <button @click="$emit('closeModal')" class="modal-btn modal-btn-primary">
            <span class="btn-text">Close</span>
            <div class="btn-glow"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ====== ULTRA-MODERN MODAL STYLES ======
.ultra-modern-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999998; // Just below mobile navigation
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modalFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  // ====== SUCCESS MODAL THEME (GREEN) ======
  &.modal-success {
    .modal-backdrop {
      .backdrop-gradient {
        background: linear-gradient(135deg, 
          rgba(5, 5, 15, 0.95) 0%, 
          rgba(10, 20, 30, 0.9) 50%,
          rgba(4, 120, 87, 0.15) 100%
        );
      }

      .modal-particle {
        background: linear-gradient(45deg, #047857, #10b981);
      }
    }

    .modal-content {
      border-color: rgba(4, 120, 87, 0.3);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 100px rgba(4, 120, 87, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);

      &::before {
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(4, 120, 87, 0.6) 50%, 
          transparent 100%
        );
      }
    }
  }

  // ====== WARNING MODAL THEME (YELLOW/ORANGE) ======
  &.modal-warning {
    .modal-backdrop {
      .backdrop-gradient {
        background: linear-gradient(135deg, 
          rgba(5, 5, 15, 0.95) 0%, 
          rgba(10, 20, 30, 0.9) 50%,
          rgba(217, 119, 6, 0.15) 100%
        );
      }

      .modal-particle {
        background: linear-gradient(45deg, #d97706, #fbbf24);
      }
    }

    .modal-content {
      border-color: rgba(217, 119, 6, 0.3);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 100px rgba(217, 119, 6, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);

      &::before {
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(217, 119, 6, 0.6) 50%, 
          transparent 100%
        );
      }
    }
  }

  // ====== ERROR MODAL THEME (RED) ======
  &.modal-error {
    .modal-backdrop {
      .backdrop-gradient {
        background: linear-gradient(135deg, 
          rgba(5, 5, 15, 0.95) 0%, 
          rgba(10, 20, 30, 0.9) 50%,
          rgba(220, 38, 38, 0.15) 100%
        );
      }

      .modal-particle {
        background: linear-gradient(45deg, #dc2626, #f87171);
      }
    }

    .modal-content {
      border-color: rgba(220, 38, 38, 0.3);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 100px rgba(220, 38, 38, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);

      &::before {
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(220, 38, 38, 0.6) 50%, 
          transparent 100%
        );
      }
    }
  }

  // ====== INFO MODAL THEME (BLUE) - DEFAULT ======
  &.modal-info {
    .modal-backdrop {
      .backdrop-gradient {
        background: linear-gradient(135deg, 
          rgba(5, 5, 15, 0.95) 0%, 
          rgba(10, 20, 30, 0.9) 50%,
          rgba(2, 132, 199, 0.15) 100%
        );
      }

      .modal-particle {
        background: linear-gradient(45deg, #0284c7, #38bdf8);
      }
    }

    .modal-content {
      border-color: rgba(2, 132, 199, 0.3);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 100px rgba(2, 132, 199, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);

      &::before {
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(2, 132, 199, 0.6) 50%, 
          transparent 100%
        );
      }
    }
  }

  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    .backdrop-gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, 
        rgba(5, 5, 15, 0.95) 0%, 
        rgba(10, 20, 30, 0.9) 50%,
        rgba(2, 132, 199, 0.1) 100%
      );
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .floating-particles {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .modal-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #0284c7, #38bdf8);
        border-radius: 50%;
        animation: floatParticle 6s infinite linear;

        &:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 8s; }
        &:nth-child(2) { left: 20%; animation-delay: 1s; animation-duration: 7s; }
        &:nth-child(3) { left: 30%; animation-delay: 2s; animation-duration: 9s; }
        &:nth-child(4) { left: 40%; animation-delay: 0.5s; animation-duration: 6s; }
        &:nth-child(5) { left: 50%; animation-delay: 1.5s; animation-duration: 8s; }
        &:nth-child(6) { left: 60%; animation-delay: 2.5s; animation-duration: 7s; }
        &:nth-child(7) { left: 70%; animation-delay: 0.8s; animation-duration: 9s; }
        &:nth-child(8) { left: 80%; animation-delay: 1.8s; animation-duration: 6s; }
        &:nth-child(9) { left: 90%; animation-delay: 2.8s; animation-duration: 8s; }
        &:nth-child(10) { left: 15%; animation-delay: 3s; animation-duration: 7s; }
        &:nth-child(11) { left: 35%; animation-delay: 0.3s; animation-duration: 9s; }
        &:nth-child(12) { left: 75%; animation-delay: 2.3s; animation-duration: 6s; }
      }
    }
  }

  .modal-container {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    animation: modalSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  // ====== BUTTERFLY ICON COLOR THEMES ======
  &.modal-success {
    .icon-butterfly {
      .butterfly-wing {
        background: linear-gradient(135deg, #047857, #059669, #10b981) !important;
        box-shadow: 0 0 10px rgba(4, 120, 87, 0.3) !important;
      }

      .butterfly-body {
        background: linear-gradient(180deg, #064e3b, #047857) !important;
        box-shadow: 0 0 5px rgba(4, 120, 87, 0.5) !important;
      }

      &::before {
        background: #10b981 !important;
        box-shadow: 0 0 8px rgba(16, 185, 129, 0.6) !important;
      }
    }
  }

  &.modal-warning {
    .icon-butterfly {
      .butterfly-wing {
        background: linear-gradient(135deg, #d97706, #f59e0b, #fbbf24) !important;
        box-shadow: 0 0 10px rgba(217, 119, 6, 0.3) !important;
      }

      .butterfly-body {
        background: linear-gradient(180deg, #92400e, #d97706) !important;
        box-shadow: 0 0 5px rgba(217, 119, 6, 0.5) !important;
      }

      &::before {
        background: #fbbf24 !important;
        box-shadow: 0 0 8px rgba(251, 191, 36, 0.6) !important;
      }
    }
  }

  &.modal-error {
    .icon-butterfly {
      .butterfly-wing {
        background: linear-gradient(135deg, #dc2626, #ef4444, #f87171) !important;
        box-shadow: 0 0 10px rgba(220, 38, 38, 0.3) !important;
      }

      .butterfly-body {
        background: linear-gradient(180deg, #991b1b, #dc2626) !important;
        box-shadow: 0 0 5px rgba(220, 38, 38, 0.5) !important;
      }

      &::before {
        background: #f87171 !important;
        box-shadow: 0 0 8px rgba(248, 113, 113, 0.6) !important;
      }
    }
  }

  &.modal-info {
    .icon-butterfly {
      .butterfly-wing {
        background: linear-gradient(135deg, #0284c7, #0ea5e9, #38bdf8) !important;
        box-shadow: 0 0 10px rgba(2, 132, 199, 0.3) !important;
      }

      .butterfly-body {
        background: linear-gradient(180deg, #075985, #0284c7) !important;
        box-shadow: 0 0 5px rgba(2, 132, 199, 0.5) !important;
      }

      &::before {
        background: #38bdf8 !important;
        box-shadow: 0 0 8px rgba(56, 189, 248, 0.6) !important;
      }
    }
  }

  .modal-content {
    position: relative;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(6, 214, 160, 0.2);
    border-radius: 24px;
    padding: 2.5rem;
    min-width: 400px;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 100px rgba(6, 214, 160, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(6, 214, 160, 0.5) 50%, 
        transparent 100%
      );
    }

    .modal-close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(6, 214, 160, 0.3);
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;

      &:hover {
        background: rgba(6, 214, 160, 0.1);
        border-color: rgba(6, 214, 160, 0.5);
        transform: scale(1.05);
      }

      .close-icon {
        position: relative;
        width: 16px;
        height: 16px;

        .close-line {
          position: absolute;
          width: 16px;
          height: 2px;
          background: #ffffff;
          border-radius: 1px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;

          &.close-line-1 {
            transform: translate(-50%, -50%) rotate(45deg);
          }

          &.close-line-2 {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
    }

    .modal-message {
      text-align: center;
      margin-bottom: 2rem;

      .message-icon {
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;

        .icon-butterfly {
          position: relative;
          width: 35px;
          height: 25px;
          animation: butterflyFloat 3s ease-in-out infinite;
          margin: 0 auto 0.5rem;
          transform: rotate(-15deg);

          .butterfly-wing {
            position: absolute;
            background: linear-gradient(135deg, #0284c7, #0ea5e9, #38bdf8);
            border-radius: 60% 20% 60% 20%;
            animation: wingFlap 2.5s ease-in-out infinite;
            box-shadow: 0 0 10px rgba(2, 132, 199, 0.3);

            &.wing-left {
              left: 2px;
              top: 2px;
              width: 14px;
              height: 18px;
              transform-origin: bottom right;
              animation-delay: 0s;
              border-radius: 70% 30% 70% 30%;
            }

            &.wing-right {
              right: 2px;
              top: 2px;
              width: 14px;
              height: 18px;
              transform-origin: bottom left;
              animation-delay: 0.1s;
              border-radius: 30% 70% 30% 70%;
            }
          }

          .butterfly-body {
            position: absolute;
            left: 50%;
            top: 1px;
            transform: translateX(-50%);
            width: 2px;
            height: 23px;
            background: linear-gradient(180deg, #075985, #0284c7);
            border-radius: 50px;
            box-shadow: 0 0 5px rgba(2, 132, 199, 0.5);
          }

          &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            background: #38bdf8;
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
          }
        }
      }

      .message-text {
        color: #ffffff;
        font-size: 0.95rem;
        font-weight: 500;
        line-height: 1.6;
        margin: 0;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
    }

    .modal-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;

      .modal-btn {
        position: relative;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 16px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        min-width: 100px;

        .btn-text {
          position: relative;
          z-index: 2;
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #06d6a0, #40f99b);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        &.modal-btn-primary {
          background: linear-gradient(135deg, #047857, #059669);
          color: #ffffff;
          border: 1px solid rgba(4, 120, 87, 0.3);
          box-shadow: 
            0 8px 25px rgba(4, 120, 87, 0.3),
            0 0 20px rgba(4, 120, 87, 0.1);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 
              0 12px 35px rgba(4, 120, 87, 0.4),
              0 0 30px rgba(4, 120, 87, 0.2);

            .btn-glow {
              opacity: 0.2;
            }
          }

          &:active {
            transform: translateY(0);
          }
        }
      }
    }
  }
}

// ====== ANIMATIONS ======
@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes floatParticle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes butterflyFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes wingFlap {
  0%, 100% {
    transform: scaleX(1) rotateY(0deg);
  }
  50% {
    transform: scaleX(0.8) rotateY(20deg);
  }
}

// ====== RESPONSIVE DESIGN ======
@media (max-width: 768px) {
  .ultra-modern-modal {
    .modal-content {
      min-width: 320px;
      padding: 2rem 1.5rem;
      margin: 1rem;
      border-radius: 20px;

      .modal-close-btn {
        width: 36px;
        height: 36px;
        top: 0.75rem;
        right: 0.75rem;
      }

      .modal-message {
        .message-icon .icon-butterfly {
          width: 30px;
          height: 20px;

          .butterfly-wing {
            &.wing-left,
            &.wing-right {
              width: 12px;
              height: 15px;
            }
          }

          .butterfly-body {
            height: 18px;
          }
        }

        .message-text {
          font-size: 0.9rem;
        }
      }

      .modal-actions {
        .modal-btn {
          padding: 0.65rem 1.25rem;
          font-size: 0.85rem;
          min-width: 90px;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .ultra-modern-modal {
    .modal-content {
      min-width: 280px;
      padding: 1.5rem 1rem;

      .modal-message {
        margin-bottom: 1.5rem;

        .message-icon {
          margin-bottom: 1rem;
        }
      }

      .modal-actions {
        .modal-btn {
          padding: 0.6rem 1rem;
          font-size: 0.8rem;
          min-width: 80px;
        }
      }
    }
  }
}
</style>
