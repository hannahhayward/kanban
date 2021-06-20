<template>
  <div class="container-fluid " :style="{backgroundImage: `url(${board.backgroundImg})`} || {'background-color':board.color }">
    <div class="row" :style="{'background-color':board.color }">
      <div class="col-12">
        <div :style="{'background-color':board.color }">
          <h1 class="text-center">
            {{ board.name }}
          </h1>
        </div>
      </div>
    </div>
    <div class="row">
      <Lists v-for="list in lists " :key="list.id" :list="list" />
    </div>
    <div class="row">
      <div class="col-12 my-2 ml-2 border border-success">
        <div class="py-2 ">
          <h5 class="text-center">
            Create a New List
          </h5>
          <div class="body">
            <form id="create-list" @submit.prevent="createList(state.newList)">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="List Name" v-model="state.newList.name">
                <div class="input-group">
                  <input type="color" class="form-control" placeholder="List Color" v-model="state.newList.color">
                </div>
              </div>
              <button class="btn btn-success btn-block">
                <i class="fas fa-plus fa-lg"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'

export default {
  setup() {
    const state = reactive({
      newList: {
      }
    })
    const route = useRoute()
    onMounted(async() => {
      logger.log('getting boards')
      await boardsService.getBoard(route.params.id)
      logger.log('getting lists')
      await listsService.getListsByBoardId(route.params.id)
      logger.log('getting tasks')
      await tasksService.getAllTasksByBoardId(route.params.id)
    })
    return {
      state,
      board: computed(() => AppState.board),
      lists: computed(() => AppState.lists),
      createList(newList) {
        newList.boardId = route.params.id
        newList.creatorId = AppState.account.id
        listsService.createList(newList)
      }
    }
  }
}
</script>

<style>

</style>
