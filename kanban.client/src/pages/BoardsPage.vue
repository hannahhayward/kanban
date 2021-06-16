<template>
  <div class="container-fluid">
    <div class="row">
      <div class="board-section col-7 m-3" style="height: 100vh">
        <div class="create-board-form m-3 bg shadow px-2 pt-2" style="height: 20vh">
          <form class="create-list">
            <div class="form-group my-1" @submit.prevent="createBoard">
              <label class="sr-only">Name </label>
              <input type="text" class="form-control outline" v-model="state.newBoard.name" placeholder="Name" required>
              <div class="form-group my-1">
                <label class="sr-only">Color </label>
                <input type="color" class="form-control outline" v-model="state.newBoard.color" placeholder="Color">
                <div class="form-group my-1">
                  <label class="sr-only">Background image </label>
                  <input type="text" class="form-control outline" v-model="state.newBoard.bgImg" placeholder="Background image">
                </div>
                <button class=" btn btn-success btn-block" type="submit">
                  <i class="far fa-calendar-plus fa-lg"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="board-list row m-3" style="height: 70vh">
          <div class="col-12 bg shadow">
            <Board v-for="board in boards" :key="board.id" :board="board" />
          </div>
        </div>
      </div>
      <div class="accountDetail col-3 border border-dark m-3" style="height: 100vh">
        <Account />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { boardsService } from '../services/BoardsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'BoardsPage',
  setup() {
    const state = reactive({ newBoard: {} })
    return {
      boards: computed(() => AppState.boards),
      state,
      createBoard(newBoard) {
        boardsService.createBoard(newBoard)
      }
    }
  }
}
</script>

<style scoped>
.bg{
  background-color: #e2e2df;
  outline: solid .5px; color: #dfdfd5;
}
.outline{
  border: dashed green 1.85px;

}
</style>
