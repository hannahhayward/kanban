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
    return {
      lists: computed(() => AppState.lists),
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
