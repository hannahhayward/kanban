<template>
  <div class="col-5">
    <div class="card w-100">
      <div class="card-header">
        <button class="btn btn-danger">
          X
        </button>
      </div>
      <div class="card-body">
        <h1>Board Title</h1>
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
