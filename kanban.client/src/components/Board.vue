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
      <Lists v-for="list in lists | lists.filter(list => lists.boardId === board._id)" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { listsService } from '../services/ListsService'
export default {
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    onMounted(async() => {
      try {
        listsService.getAllLists()
      } catch (error) {
        Notification.toast(error, 'Cant get lists..')
      }
    })
    const state = reactive({
      board: computed(() => AppState.boards),
      tasks: computed(() => AppState.tasks)
    })
<<<<<<< HEAD
    return {
      lists: computed(() => AppState.lists),
      state
    }
=======
    return { state }
>>>>>>> 988365b424ca8fd1ffedd029d6d86e8ccd824ba9
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
