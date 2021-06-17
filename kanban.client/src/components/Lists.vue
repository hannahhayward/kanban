<template>
  <div class="lists col-3 d-flex">
    <div class="card mx-4">
      <div class="card-header">
        <h3 class="text-dark text-center" data-toggle="modal" :data-target="`#listNum${list.id}`">
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
        <form @submit.prevent="createTask(state.newTask)">
          <input type="text" class="field-control" placeholder="Add a Task" v-model="state.newTask.name">
          <button class="btn btn-success btn-block" type="submit">
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
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  name: 'Lists',
  props: { list: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      newTask: {}
    })
    return {
      state,
      lists: computed(() => AppState.lists),
      createTask(newTask) {
        logger.log(newTask, 'task in task')
        tasksService.createTask(newTask)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
