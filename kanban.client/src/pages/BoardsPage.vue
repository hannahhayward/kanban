<template>
  <div class="container-fluid bg">
    <div class="row text-center mt-2">
      <div class="col-10 m-auto">
        <h2 class="text-dark mt-3">
          Create a New Board
        </h2>
      </div>
    </div>
    <div class="row d-flex justify-content-center shadow pb-5 align-items-center">
      <div class="board-section col-10">
        <div class="create-board-form px-2 pt-2" style="height: 20vh">
          <form class="create-board shadow" @submit.prevent="createBoard" id="create-board">
            <div class="form-group my-1">
              <label class="sr-only">Name </label>
              <input type="text" class="form-control outline" v-model="state.newBoard.name" placeholder="Name" required>
              <div class="form-group my-1">
                <label class="sr-only">Color </label>
                <input type="color" class="form-control outline" v-model="state.newBoard.color" placeholder="Color">
                <div class="form-group my-1">
                  <label class="sr-only">Background image </label>
                  <input type="text" class="form-control outline" v-model="state.newBoard.bgImg" placeholder="Background image Url">
                </div>
                <button class=" btn btn-success btn-block" type="submit">
                  <i class="far fa-calendar-plus fa-lg"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <!-- <div class="accountDetail col-2 border border-dark m-3" style="height: 100vh">
          <Account />
        </div> -->
      </div>
    </div>
    <div class="board-list row m-3 d-flex justify-content-center shadow py-3" style="height: 70vh">
      <Board v-for="board in boards" :key="board.id" :board="board" />
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
    const state = reactive({
      newBoard: {
        name: '',
        color: '',
        bgImg: ''
      }
    })
    return {
      boards: computed(() => AppState.boards),
      state,
      async createBoard() {
        await boardsService.createBoard(state.newBoard)
      }
    }
  }
}
</script>

<style scoped>

.bg{
  background-color: #2878a6ad;
  outline: solid .5px #111101;
}
.outline{
  border: dashed #074061 1.85px;

}
</style>
