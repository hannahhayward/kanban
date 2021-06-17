<template>
  <div class="lists col-3 d-flex">
    <div class="card mx-4">
      <div class="card-header">
        <h3 class="text-dark text-center" data-toggle="modal" data-target="#exampleModal">
          {{ list.name }}
        </h3>
      </div>
      <div class="card-body">
        <p>
          <input type="checkbox" :name="list.name" :id="list.id">
          <!-- <b>{{ task.name }}</b>
          {{ task.description }} -->
        </p>
      </div>
      <div class="card-footer">
        <form @submit.prevent="createTask">
          <input type="text" class="field-control" placeholder="Add a Task" v-model="state.newTask.name">
          <button class="btn btn-success btn-block">
            <i class="fa fas fa-plus fa-lg"></i>
          </button>
        </form>
      </div>
    </div>
    <ListModal :list-prop="list" />
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Lists',
  props: { list: { type: Object, required: true } },
  setup(props) {
    const state = {
      newTask: {}
    }
    return {
      state,
      lists: computed(() => AppState.lists),
      createTask(newTask) {
        tasksService.createTask(newTask)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
