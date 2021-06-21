<template>
  <div class="w-100 text-light col-5 m-2 bg shadow" :style="{backgroundColor: board.color,'-webkit-filter': true}">
    <div class="header">
      <i v-if="board.creatorId === state.account.id" class="fas fa-times fa-2x text-right text-dark p-1 shadow" @click="deleteBoard(board.id)"></i>
    </div>
    <div class="body">
      <!-- TODO - figure out how to remove text decoration -->
      <router-link :to="{ name: 'Board', params:{id: board.id} }" :key="board.boardId" style="text-decoration: none" class=" text-light">
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
import { boardsService } from '../services/BoardsService'
// import { listsService } from '../services/ListsService'
export default {
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      board: computed(() => AppState.boards),
      tasks: computed(() => AppState.tasks),
      account: computed(() => AppState.account)
    })
    return {
      state,
      lists: computed(() => AppState.lists),
      deleteBoard(Id) {
        if (props.board.creatorId === AppState.account.id) {
          if (confirm('Do you really want to delete this board ??')) {
            boardsService.deleteBoard(Id)
          }
        }
      },
      account: computed(() => AppState.account)
    }
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
.bg{
  background-color: #e2e2df;
  outline: solid .5px; color: #dfdfd5;
}
.b{
  border: rgb(252, 255, 249) solid 1px;
}

</style>
