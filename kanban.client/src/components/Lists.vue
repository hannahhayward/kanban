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
        <Task v-for="task in filterTask(list.id)" :key="task.id" :task="task" />
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
      <button v-if="list.creatorId === account.id" class="btn btn-danger btn-block" @click="deleteList(list.id)">
        -
      </button>
      <ListModal :list-prop="list" />
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { listsService } from '../services/ListsService'
import { commentsService } from '../services/CommentService'
import { logger } from '../utils/Logger'
export default {
  name: 'Lists',
  props: { list: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      newTask: {},
      newComment: {
      },
      task: {}
    })
    const route = useRoute()
    return {
      state,
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
        if (confirm('Do you really want to delete this List ??')) { listsService.deleteList(id) }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
