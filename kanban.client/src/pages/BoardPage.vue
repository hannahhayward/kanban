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
        <div class="card">
          <div class="card-header">
            <div class="card-body">
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
        <Lists v-for="list in lists " :key="list.id" :list="list" />
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

export default {
  setup() {
    const state = reactive({
      newList: {
      }
    })
    const route = useRoute()
    onMounted(async() => {
      boardsService.getBoard(route.params.id)
      listsService.getListsByBoardId(route.params.id)
      tasksService.getAllTasksByBoardId(route.params.id)
    })
    return {
      state,
      board: computed(() => AppState.board),
      lists: computed(() => AppState.lists),
      createList(newList) {
        newList.boardId = route.params.id
        newList.creatorId = AppState.account.id
        console.log(newList)
        console.log(AppState.lists)
        listsService.createList(newList)
      }
    }
  }
}
</script>

<style>

</style>
