<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="isShowFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <!-- 信息 -->
          <p class="text">{{ text }}</p>
          <!-- 按钮 -->
          <div class="operate">
            <div @click="cancel" class="operate-btn left">
              {{ cancelBtnText }}
            </div>
            <div @click="confirm" class="operate-btn">{{ confirmBtnText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  setup(props, { emit }) {
    const isShowFlag = ref(false)

    function show() {
      isShowFlag.value = true
    }

    function hide() {
      isShowFlag.value = false
    }

    function cancel() {
      hide()
      emit('cancel')
    }

    function confirm() {
      hide()
      emit('confirm')
    }

    return {
      isShowFlag,
      cancel,
      confirm
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variable.scss';

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: $color-background-d;

  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;

    .confirm-content {
      animation: confirm-zoom 0.3s;
    }
  }

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: $color-highlight-background;

      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: $font-size-large;
        color: $color-text-l;
      }

      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;

        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid $color-background-d;
          color: $color-text-d;

          &.left {
            border-right: 1px solid $color-background-d;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
