<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="calendar-header">
        <button @click="previousMonth" class="nav-button">&lt;</button>
        <div class="selectors">
          <select v-model="displayMonth">
            <option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.name }}
            </option>
          </select>
          <select v-model="displayYear">
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <button @click="nextMonth" class="nav-button">&gt;</button>
      </div>
      <div class="calendar-grid">
        <div v-for="day in weekDays" :key="day" class="week-day">{{ day }}</div>
        <div v-for="blank in blankDays" :key="'blank-' + blank" class="blank-day"></div>
        <div
          v-for="day in daysInMonth"
          :key="day"
          class="day-cell"
          :class="{ selected: isSelected(day) }"
          @click="selectDate(day)"
        >
          {{ day }}
        </div>
      </div>
       <button class="close-button" @click="$emit('close')">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  initialDate: { type: String, required: true },
});

const emit = defineEmits(['close', 'date-selected']);

const currentDate = ref(new Date(props.initialDate + 'T00:00:00'));

// --- CAMBIO: Lógica para los selectores de mes y año ---

const months = ref([
  { value: 0, name: 'Enero' }, { value: 1, name: 'Febrero' },
  { value: 2, name: 'Marzo' }, { value: 3, name: 'Abril' },
  { value: 4, name: 'Mayo' }, { value: 5, name: 'Junio' },
  { value: 6, name: 'Julio' }, { value: 7, name: 'Agosto' },
  { value: 8, name: 'Septiembre' }, { value: 9, name: 'Octubre' },
  { value: 10, name: 'Noviembre' }, { value: 11, name: 'Diciembre' },
]);

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  const startYear = 2012; // Año de aterrizaje del Curiosity
  const yearList = [];
  for (let i = currentYear; i >= startYear; i--) {
    yearList.push(i);
  }
  return yearList;
});

// Propiedades computadas con get/set para vincular los 'select' a nuestro 'currentDate'
const displayMonth = computed({
  get: () => currentDate.value.getMonth(),
  set: (newMonth) => {
    currentDate.value = new Date(currentDate.value.setMonth(newMonth));
  },
});

const displayYear = computed({
  get: () => currentDate.value.getFullYear(),
  set: (newYear) => {
    currentDate.value = new Date(currentDate.value.setFullYear(newYear));
  },
});

// --- El resto de la lógica permanece casi igual ---

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

const previousMonth = () => displayMonth.value--;
const nextMonth = () => displayMonth.value++;

const selectDate = (day) => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  emit('date-selected', formattedDate);
};
</script>

<style lang="scss" scoped>
$nasa-blue: #0B3D91;
$light-text: #E0E0E0;
$card-bg: #2a2a2e;
$dark-bg: #121212;
$border-color: #444;

.modal-overlay { /* ... sin cambios ... */
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000;
}
.modal-content { /* ... sin cambios ... */
  background-color: $dark-bg; padding: 1.5rem; border-radius: 12px;
  width: 90%; max-width: 350px; box-shadow: 0 5px 15px rgba(0,0,0,0.5); border: 1px solid #444;
}

/* --- CAMBIO: Nuevos estilos para el header del calendario --- */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  .nav-button {
    background: none; border: none; color: $light-text; font-size: 1.5rem;
    cursor: pointer; padding: 0.5rem; flex-shrink: 0;
  }

  .selectors {
    display: flex;
    gap: 0.5rem;
    flex-grow: 1;
    justify-content: center;

    select {
      background-color: $card-bg;
      color: $light-text;
      border: 1px solid $border-color;
      border-radius: 4px;
      padding: 0.5rem;
      font-size: 1rem;
      width: 50%;
    }
  }
}
/* ... El resto de estilos (.calendar-grid, .day-cell, etc.) no cambian ... */
.calendar-grid {
  display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; text-align: center;
}
.week-day { font-weight: bold; color: #888; font-size: 0.9rem; }
.day-cell {
  padding: 0.5rem; cursor: pointer; border-radius: 50%; transition: background-color 0.2s;
  &:hover { background-color: $card-bg; }
  &.selected { background-color: $nasa-blue; color: white; font-weight: bold; }
}
.close-button {
  margin-top: 1.5rem; width: 100%; padding: 0.75rem; background-color: #333;
  color: $light-text; border: 1px solid #555; border-radius: 8px; cursor: pointer;
}
</style>