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
    <div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
export default {
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    onMounted(async() => {
      try {
        listsService.getListsByBoardId()
      } catch (error) {
        Notification.toast(error, 'you messed up, cant get lists by id')
      }
    })
    const state = reactive({
      board: computed(() => AppState.boards),
      tasks: computed(() => AppState.tasks)
    })
    return {
      state,
      lists: computed(() => AppState.lists),
      async deleteBoard(Id) {
        if (confirm('Do you really want to delete this board ??')) {
          boardsService.deleteBoard(Id)
        }
      }
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
</style>
