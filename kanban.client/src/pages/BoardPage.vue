<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 m-auto">
        <h1>{{ board.name }}</h1>
      </div>
      <Lists v-for="list in lists | lists.filter(list => lists.boardId === board._id)" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'

export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      boardsService.getBoard(route.params.id)
      listsService.getLists(route.params.id)
    })
    return {
      board: computed(() => AppState.board),
      getLists() {
        listsService.getLists()
        AppState.lists.find(l => this.board.boardId === l.boardId)
      }
    }
  }
}
</script>

<style>

</style>
