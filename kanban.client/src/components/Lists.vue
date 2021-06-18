<template>
  <div class="lists col-4 d-flex">
    <div class="card ">
      <div class="card-header">
        <h3 class="text-dark text-center" data-toggle="modal" :data-target="`#listNum${list.id}`">
          {{ list.name }}
          <button v-if="list.creatorId === account.id" class="btn bg-transparent" @click="deleteList(list.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </h3>
      </div>
      <div class="card-body">
        <div v-for="task in filterTask(list.id)" :key="task.id">
          {{ task.name }}
          <form @submit.prevent="createComment(task.id)">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Add a Comment" v-model="state.newComment.body" />
            </div>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="submit">
                create
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="card-footer">
        <p class="text-center m-1">
          Add a Task
        </p>
        <form @submit.prevent="createTask(state.newTask)">
          <input type="text" class="field-control mb-3" placeholder="Add a Task" v-model="state.newTask.name">
          <button class="btn btn-success btn-block" type="submit">
            <i class="fa fas fa-plus fa-lg"></i>
          </button>
        </form>
      </div>
      <ListModal :list-prop="list" :task-prop="task" />
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { listsService } from '../services/ListsService'
import { commentsService } from '../services/CommentService'
import { logger } from '../utils/Logger'
export default {
  name: 'Lists',
  props: { list: { type: Object, required: true } },
  setup(props) {
    onMounted(async() => {
      await tasksService.getAllTasksByBoardId(route.params.id)
    })
    const state = reactive({
      newTask: {},
      newComment: {
      },
      task: {}
    })
    const route = useRoute()
    return {
      state,
      lists: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks),
      account: computed(() => AppState.account),
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
      task(taskId) {
        const task = AppState.tasks.find(t => t.id === taskId)
        state.task.id = task
        logger.log(state.task, 'state.task')
      },
      createComment(tId) {
        debugger
        logger.log(tId, 'that id yo')
        state.newComment.taskId = tId
        state.newComment.boardId = route.params.id
        state.newComment.listId = props.list.id
        commentsService.createComment(state.newComment)
      },
      deleteList(id) {
        if (confirm('Do you really want to delete this task ??')) { listsService.deleteList(id) }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
