<template>
  <div class="d-flex">
    <div class="card w-100">
      <div class="card-header">
        <i class="fas fa-times fa-lg text-right text-danger" @click="deleteBoard(board.id)"></i>
      </div>
      <div class="card-body">
        <h1 class="text-center">
          Board Title
        </h1>
      </div>
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

</style>
