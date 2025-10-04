<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Header -->
      <div class="modal-header">
        <div class="header-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M16 2V6M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
          </svg>
          <h3>Seleccionar Fecha</h3>
        </div>
        <button @click="closeModal" class="close-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Calendar Navigation -->
      <div class="calendar-nav">
        <button @click="previousMonth" class="nav-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="selectors">
          <select v-model="displayMonth" class="month-select">
            <option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.name }}
            </option>
          </select>
          <select v-model="displayYear" class="year-select">
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>

        <button @click="nextMonth" class="nav-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Calendar Grid -->
      <div class="calendar-grid">
        <div v-for="day in weekDays" :key="day" class="week-day">{{ day }}</div>
        <div v-for="blank in blankDays" :key="'blank-' + blank" class="blank-day"></div>
        <button
          v-for="day in daysInMonth"
          :key="day"
          class="day-cell"
          :class="{ 
            selected: isSelected(day),
            today: isToday(day)
          }"
          @click="selectDate(day)"
        >
          {{ day }}
        </button>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <div class="selected-date-info" v-if="selectedDateFormatted">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 5V9L12 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>{{ selectedDateFormatted }}</span>
        </div>
        <button class="confirm-btn" @click="closeModal">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  initialDate: { type: String, required: true },
});

const emit = defineEmits(['close', 'date-selected']);

const currentDate = ref(new Date(props.initialDate + 'T00:00:00'));

const months = ref([
  { value: 0, name: 'Enero' }, { value: 1, name: 'Febrero' }, { value: 2, name: 'Marzo' },
  { value: 3, name: 'Abril' }, { value: 4, name: 'Mayo' }, { value: 5, name: 'Junio' },
  { value: 6, name: 'Julio' }, { value: 7, name: 'Agosto' }, { value: 8, name: 'Septiembre' },
  { value: 9, name: 'Octubre' }, { value: 10, name: 'Noviembre' }, { value: 11, name: 'Diciembre' },
]);

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  const startYear = 2012;
  const yearList = [];
  for (let i = currentYear; i >= startYear; i--) {
    yearList.push(i);
  }
  return yearList;
});

const displayMonth = computed({
  get: () => currentDate.value.getMonth(),
  set: (newMonth) => { currentDate.value = new Date(currentDate.value.setMonth(newMonth)); },
});

const displayYear = computed({
  get: () => currentDate.value.getFullYear(),
  set: (newYear) => { currentDate.value = new Date(currentDate.value.setFullYear(newYear)); },
});

const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const daysInMonth = computed(() => new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate());

const blankDays = computed(() => {
  let firstDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
});

const isSelected = (day) => {
  const d = currentDate.value;
  const initial = new Date(props.initialDate + 'T00:00:00');
  return day === initial.getDate() && d.getMonth() === initial.getMonth() && d.getFullYear() === initial.getFullYear();
};

const isToday = (day) => {
  const today = new Date();
  const d = currentDate.value;
  return day === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
};

const selectedDateFormatted = computed(() => {
  const initial = new Date(props.initialDate + 'T00:00:00');
  return initial.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});

const previousMonth = () => displayMonth.value--;
const nextMonth = () => displayMonth.value++;

const selectDate = (day) => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  emit('date-selected', formattedDate);
};

const closeModal = () => {
  emit('close');
};

// Bloquear scroll del body cuando el modal está abierto
onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
$nasa-blue: #0B3D91;
$nasa-red: #FC3D21;
$text-primary: #FFFFFF;
$text-secondary: rgba(255, 255, 255, 0.7);
$text-tertiary: rgba(255, 255, 255, 0.5);
$card-bg: rgba(20, 20, 30, 0.95);
$border-color: rgba(255, 255, 255, 0.1);

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
  overflow-y: auto;
  
  // Prevenir scroll en el body
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: $card-bg;
  backdrop-filter: blur(30px);
  border-radius: 24px;
  border: 1px solid rgba($nasa-blue, 0.3);
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5), 0 0 1px rgba($nasa-blue, 0.5);
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(180deg, rgba($nasa-blue, 0.1), transparent);

  .header-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      color: $nasa-blue;
    }

    h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: $text-primary;
    }
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: $text-secondary;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: rgba($nasa-red, 0.2);
      border-color: rgba($nasa-red, 0.5);
      color: $nasa-red;
      transform: rotate(90deg);
    }
  }
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  gap: 1rem;

  .nav-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: $text-secondary;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    flex-shrink: 0;

    &:hover {
      background: rgba($nasa-blue, 0.2);
      border-color: rgba($nasa-blue, 0.4);
      color: $nasa-blue;
    }
  }

  .selectors {
    display: flex;
    gap: 0.75rem;
    flex: 1;
    justify-content: center;

    select {
      background: rgba(0, 0, 0, 0.4);
      color: $text-primary;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.75rem 1rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: rgba($nasa-blue, 0.4);
      }

      &:focus {
        outline: none;
        border-color: $nasa-blue;
        box-shadow: 0 0 0 3px rgba($nasa-blue, 0.2);
      }
    }

    .month-select {
      flex: 1.5;
    }

    .year-select {
      flex: 1;
    }
  }
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  padding: 1rem 2rem 2rem 2rem;
}

.week-day {
  text-align: center;
  font-weight: 700;
  color: $text-tertiary;
  font-size: 0.85rem;
  padding: 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blank-day {
  aspect-ratio: 1;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: $text-secondary;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba($nasa-blue, 0.4);
    color: $text-primary;
    transform: scale(1.05);
  }

  &.today {
    border-color: rgba($nasa-blue, 0.6);
    color: $nasa-blue;
    font-weight: 700;

    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: $nasa-blue;
      border-radius: 50%;
    }
  }

  &.selected {
    background: linear-gradient(135deg, $nasa-blue, #1565C0);
    border-color: $nasa-blue;
    color: white;
    font-weight: 700;
    box-shadow: 0 4px 20px rgba($nasa-blue, 0.4);
    transform: scale(1.05);

    &:hover {
      transform: scale(1.1);
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  gap: 1rem;

  .selected-date-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: $text-secondary;
    font-size: 0.9rem;
    font-weight: 600;

    svg {
      color: $nasa-blue;
    }

    span {
      text-transform: capitalize;
    }
  }

  .confirm-btn {
    background: linear-gradient(135deg, $nasa-blue, #1565C0);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: white;
    padding: 0.75rem 1.75rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba($nasa-blue, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 30px rgba($nasa-blue, 0.5);
      background: linear-gradient(135deg, #1565C0, $nasa-blue);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// RESPONSIVE
@media (max-width: 640px) {
  .modal-content {
    max-width: 100%;
    border-radius: 20px;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;

    .header-title h3 {
      font-size: 1.25rem;
    }
  }

  .calendar-nav {
    padding: 1rem 1.5rem;
  }

  .calendar-grid {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    gap: 0.4rem;
  }

  .day-cell {
    font-size: 0.9rem;
  }

  .modal-footer {
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem 1.5rem 1.5rem 1.5rem;

    .selected-date-info {
      justify-content: center;
    }

    .confirm-btn {
      width: 100%;
    }
  }
}
</style>