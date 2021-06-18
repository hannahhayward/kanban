<template>
  <div class="lists col-4 d-flex">
    <div class="card ">
      <div class="card-header">
        <h3 class="text-dark text-center" data-toggle="modal" :data-target="`#listNum${list.id}`">
          {{ list.name }}
        </h3>
      </div>
      <div class="card-body">
        <div v-for="task in filterTask(list.id)" :key="task.id">
          {{ task.name }}
        </div>
      </div>
      <div class="card-footer">
        <form @submit.prevent="createTask(state.newTask)">
          <input type="text" class="field-control" placeholder="Add a Task" v-model="state.newTask.name">
          <button class="btn btn-success btn-block" type="submit">
            <i class="fa fas fa-plus fa-lg"></i>
          </button>
        </form>
      </div>
      <button class="btn btn-danger btn-block" @click="deleteList(list.id)">
        -
      </button>
      <ListModal :list-prop="list" :t="t" />
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { listsService } from '../services/ListsService'
export default {
  name: 'Lists',
  props: { list: { type: Object, required: true } },
  setup(props) {
    onMounted(async() => {
      await tasksService.getAllTasksByBoardId(route.params.id)
    })
    const state = reactive({
      newTask: {}
    })
    const route = useRoute()
    return {
      state,
      lists: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks),
      createTask(newTask) {
        newTask.listId = props.list.id
        newTask.boardId = route.params.id
        newTask.CreatorId = AppState.account.id
        tasksService.createTask(newTask)
      },
      filterTask(listId) {
        const tasks = AppState.tasks.filter(t => t.listId === listId)
        return tasks
      },
      deleteList(id) {
        listsService.deleteList(id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
