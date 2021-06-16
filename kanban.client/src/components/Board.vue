<template>
  <div class="card h-25 col-12"
       :style="{
         backgroundColor: board.color,
         '-webkit-filter': true
       }"
  >
    <div class="card-header">
      <i class="fas fa-times fa-lg text-right text-danger" @click="deleteBoard(board.id)"></i>
    </div>
    <div class="card-body">
      <h1 class="text-center">
        {{ board.name }}
      </h1>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      board: computed(() => AppState.boards)
    })
    return {
      state
    }
  }

}
</script>

<style>
bg{
  background-image: url();
}

</style>
