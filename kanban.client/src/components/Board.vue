<template>
  <div class="card w-100 my-3 text-light"
       :style="{
         backgroundColor: board.color,
         '-webkit-filter': true
       }"
  >
    <div class="card-header">
      <i class="fas fa-times fa-2x text-right text-dark" @click="deleteBoard(board.id)"></i>
    </div>
    <div class="card-body">
      <!-- TODO - figure out how to remove text decoration -->
      <router-link :to="{ name: 'Board', params:{id: board.id} }" :key="board.boardId" style="text-decoration: none" class=" link">
        <h1 class="text-center text">
          {{ board.name }}
        </h1>
      </router-link>
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
    return { state }
  }

}
</script>

<style>
.text{
 text-shadow: 1px 1px rgb(129, 129, 125) ;
}
.link{
  text-decoration: none;
}
</style>
