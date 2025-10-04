<template>
  <nav class="main-nav">
    <div class="nav-container">
      <div class="nav-brand">
        <div class="brand-icon">
          <img
            src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg"
            alt="NASA Logo"
          />
        </div>
        <span class="brand-text">MARS EXPLORER</span>
      </div>

      <div class="nav-links">
        <router-link to="/" class="nav-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="2"
              y="4"
              width="16"
              height="13"
              rx="2"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <circle
              cx="10"
              cy="10.5"
              r="3"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M6 4L7.5 2H12.5L14 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span>Explorador</span>
        </router-link>

        <router-link to="/log" class="nav-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="3"
              y="2"
              width="14"
              height="16"
              rx="1.5"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M7 6H13M7 10H13M7 14H10"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M3 2V18C3 18 3 18 5 18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <span>Bitácora</span>
        </router-link>

        <router-link to="/routes" class="nav-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M10 2C10 2 6 6 6 10C6 14 10 18 10 18C10 18 14 14 14 10C14 6 10 2 10 2Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </svg>
          <span>Rutas</span>
        </router-link>

        <router-link to="/game" class="nav-link">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M17.5 9.17V6.5a2 2 0 00-2-2h-11a2 2 0 00-2 2v11a2 2 0 002 2h2.67"
            />
            <path d="M12.5 12.5H15V15h2.5V12.5H20V10h-2.5V7.5H15V10h-2.5z" />
          </svg>
          <span>Juego</span>
        </router-link>
      </div>

      <div class="mission-badge">
        <div class="status-indicator"></div>
        <span>FILA 2 Company</span>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
$nasa-blue: #0b3d91;
$nasa-red: #fc3d21;
$mars-red: #cd5c5c;
$active-red: #e63946;
$text-primary: #ffffff;
$text-secondary: rgba(255, 255, 255, 0.7);

.main-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(10, 10, 20, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .brand-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .brand-text {
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(135deg, $text-primary, $nasa-blue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.nav-links {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: $text-secondary;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  svg {
    transition: transform 0.3s;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, $active-red, transparent);
    transition: transform 0.3s;
  }

  &:hover {
    color: $text-primary;
    background: rgba(255, 255, 255, 0.05);

    svg {
      transform: translateY(-2px);
    }

    &::before {
      transform: translateX(-50%) scaleX(1);
    }
  }

  &.router-link-exact-active {
    color: white;
    background: linear-gradient(
      135deg,
      rgba($active-red, 0.3),
      rgba($nasa-red, 0.2)
    );
    border: 1px solid rgba($active-red, 0.4);
    box-shadow: 0 4px 15px rgba($active-red, 0.3);

    svg {
      color: $active-red;
    }

    &::before {
      transform: translateX(-50%) scaleX(1);
      background: linear-gradient(90deg, transparent, $active-red, transparent);
    }
  }
}

.mission-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: $text-secondary;

  .status-indicator {
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse-status 2s ease-in-out infinite;
    box-shadow: 0 0 10px #4ade80;
  }
}

@keyframes pulse-status {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

// RESPONSIVE
@media (max-width: 768px) {
  .nav-container {
    padding: 0.75rem 1rem;
    gap: 1rem;
  }

  .nav-brand {
    .brand-text {
      display: none;
    }

    .brand-icon {
      width: 45px;
      height: 45px;
    }
  }

  .nav-links {
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.65rem 0.85rem;
    font-size: 0.85rem;

    span {
      display: none;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .mission-badge {
    padding: 0.5rem 0.75rem;
    font-size: 0.7rem;

    span {
      display: none;
    }
  }
}
</style>
