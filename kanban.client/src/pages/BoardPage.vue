<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 m-auto">
        <h1>{{ board.name }}</h1>
      </div>
      <Lists v-for="list in lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'

export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      boardsService.getBoard(route.params.id)
    })
    return {
      board: computed(() => AppState.board),
      lists: computed(() => AppState.lists.filter(l => route.params.id === l.boardId))
    }
  }
}
</script>

<style>

</style>
