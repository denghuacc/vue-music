<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item, index) in switches"
      :key="index"
      @click="selectItem(index)"
      :class="{ active: currentIndex === index }"
    >
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    function selectItem(index) {
      emit('switch', index)
    }
    return {
      selectItem
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variable.scss';

.switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;

  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;

    &.active {
      background: $color-highlight-background;
      color: $color-text;
    }
  }
}
</style>
