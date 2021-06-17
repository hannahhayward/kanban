<template>
  <div class="container-fluid " :style="{backgroundImage: `url(${board.backgroundImg})`}">
    <div class="row">
      <div class="col-12">
        <div :style="{'background-color':board.color }">
          <h1 class="text-center">
            {{ board.name }}
          </h1>
        </div>
      </div>
      <div class="row">
        <Lists v-for="list in lists " :key="list.id" :list="list" />
      </div>
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
      listsService.getListsByBoardId(route.params.id)
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
