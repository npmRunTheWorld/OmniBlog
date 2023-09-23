<script setup>
//imports
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import useUserStore from "../stores/userStore";
import { storeToRefs } from "pinia";
import userIcon from "../assets/Icons/user-alt-light.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";

//general
defineProps({
  //props
  isMobile: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["logout", "routechange"]);

//states
const showProfile = ref(false);
const modalRef = ref(null);
const userStore = useUserStore();
const {
  profileUserName,
  profileFirstName,
  profileLastName,
  profileEmail,
  profileInitials,
} = storeToRefs(userStore);
//lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

//functions
function handleClickOutside(event) {
  if (showProfile.value == true) {
    if (modalRef.value && !modalRef.value.contains(event.target)) {
      // Handle the click outside event here
      toggleProfile();
    }
  }
}

function toggleProfile() {
  showProfile.value = !showProfile.value;
}

function routeChange(instruction) {
  if (instruction === "logout") {
    emit("logout");
  } else {
    emit("routechange");
  }

  showProfile.value = false;
}
//
</script>

<template>
  <div class="profile-menu-container">
    <div
      :class="
        isMobile ? 'mobile-profile-image-wrapper' : 'profile-image-wrapper'
      "
      @click.stop="toggleProfile()"
    >
      <p :class="isMobile ? 'mobile-profile-initials' : 'profile-initials'">
        {{ profileInitials }}
      </p>
    </div>
    <div v-show="showProfile" class="profile-modal-container" ref="modalRef">
      <div class="user-info">
        <div class="info-1">
          <p>{{ profileFirstName + " " + profileLastName }}</p>
        </div>

        <div class="info-2">
          <p>{{ "@" + profileUserName }}</p>
        </div>

        <div class="info-3">
          <p>{{ profileEmail }}</p>
        </div>
      </div>

      <div class="seperator"></div>

      <div class="icon-links" @click.stop="routeChange('')">
        <img :src="userIcon" />
        <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
      </div>

      <div class="icon-links" @click.stop="routeChange('')">
        <img :src="adminIcon" />

        <RouterLink :to="{ name: 'admin' }">Admin</RouterLink>
      </div>

      <div class="icon-links" @click.stop="routeChange('logout')">
        <img :src="signOutIcon" />
        <RouterLink :to="{}">Log out</RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  .profile-image-wrapper {
    background-color: $background;
    color: white;
    border-radius: 50%;
    width: 39px;
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .profile-initials {
      display: flex;
      text-align: center;
      justify-content: center;
      color: white;
      transform: translate(-5%, -5%);
      user-select: none;
    }
  }

  .mobile-profile-image-wrapper {
    background-color: $white;
    color: white;
    border-radius: 50%;
    width: 39px;
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .mobile-profile-initials {
      display: flex;
      text-align: center;
      justify-content: center;
      color: rgb(0, 0, 0);
      transform: translate(-5%, -5%);
      user-select: none;
    }
  }

  .profile-modal-container {
    position: absolute;
    top: 110%;
    right: -35%;
    width: max-content;
    padding: 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: $black;
    color: $white;
    cursor: default;

    @media screen and (max-width: 767px) {
      right: auto;
    }

    .user-info {
      color: $text2;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;

      .info-3 {
        p {
          font-size: 0.8rem;
        }
      }
    }

    .seperator {
      width: 150%;
      height: 3px;
      background-color: $primary;
      margin: 1.3rem 0;
      transform: translateX(-18%);
    }

    .icon-links {
      display: flex;
      gap: 0.6rem;

      img {
        width: 15px;
        filter: invert(1);
      }

      &:hover {
        a {
          color: $primary;
        }

        img {
          filter: invert(1) sepia(1) saturate(100) hue-rotate(-50deg);
        }
      }
    }
  }
}
</style>
