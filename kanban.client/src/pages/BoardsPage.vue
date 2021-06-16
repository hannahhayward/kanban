<template>
  <div class="container-fluid">
    <div class="row">
      <div class="board-section col-7 border border-dark m-3" style="height: 100vh">
        <div class="create-board-form border border-success m-3" style="height: 20vh">
          <form class="create-list">
            <div class="form-group" @submit.prevent="createBoard">
              <label class="sr-only">Name </label>
              <input type="text" class="form-control" v-model="state.newBoard.name" placeholder="Name" required>
              <div class="form-group">
                <label class="sr-only">Color </label>
                <input type="color" class="form-control" v-model="state.newBoard.color" placeholder="Color">
                <div class="form-group">
                  <label class="sr-only">Background image </label>
                  <input type="text" class="form-control" v-model="state.newBoard.bgImg" placeholder="Background image">
                </div>
                <button class=" btn btn-primary btn-block" type="submit">
                  <i class="far fa-calendar-plus fa-lg"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
<<<<<<< HEAD
        <div class="board-list row border border-primary m-3" style="height: 70vh">
          <Board v-for="board in boards" :key="board.id" :board="board" />
=======
        <div class="board-list border border-primary m-3" style="height: 70vh">
          <Board />
>>>>>>> f4a7fffabdec11d61ff9d2c6dfbe635c1f55ffc3
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
export default {
  name: 'BoardsPage',
  setup() {
    const state = reactive({
      newBoard: {}
    })
    return {
      state,
      createBoard() {
        boardsService.createBoard()
      }
    }
  }
}
</script>

<style scoped>

</style>
