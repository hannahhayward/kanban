<template>
  <div class="listModal">
    <div class="modal fade"
         :id="`listNum${listProp.id}`"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">
              {{ listProp.name }}
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-for="task in filterTask(listProp.id)" :key="task.id" :t="task.id" class="d-flex align-items-center justify-content-between m-2">
              <h5>{{ task.name }}</h5>
              <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                >
                </button>
                <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton">
                  <!-- <div class="form-group">
                    <p>
                      Edit
                    </p>
                    <label for="exampleDropdownFormEmail1" class="sr-only">Name</label>
                    <input type="text" class="form-control" v-model="state.taskEdit.name" placeholder="Name">
                  </div>
                  <div class="form-group">
                    <label for="taskEditColor" class="sr-only">Color</label>
                    <input type="color" class="form-control" v-model="state.taskEdit.color" placeholder="Color">
                  </div> -->
                  <div class="dropdown-divider"></div>
                  <div v-if="listProp.creatorId === account.id" class="dropdown-item bg-danger" @click="deleteTask(task.id)">
                    Delete
                  </div>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item">Move to:</a>
                  <div class="dropdown-item" v-for="list in lists" :key="list.id" @click="moveTask(task.id, list.id)">
                    {{ list.name }}
                  </div>
                </div>
              </div>
              <div>
                <Comment v-for="comment in filterComment(task.Id)" :key="comment.id" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'ListModal',
  props: {
    listProp: { type: Object, required: true },
    taskProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      taskEdit: {},
      newComment: {}
    })
    const route = useRoute()
    return {
      state,
      comments: computed(() => AppState.comments),
      lists: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks),
      account: computed(() => AppState.account),

      async moveTask(tId, lId) {
        tasksService.moveTask(tId, lId)
      },
      filterTask(listId) {
        const tasks = AppState.tasks.filter(t => t.listId === listId)
        return tasks
      },

      async deleteTask(id) {
        if (confirm('Do you really want to delete this task ??')) {
          tasksService.deleteTask(id)
        }
      },
      filterComment(taskId) {
        const comments = AppState.comments.filter(c => c.taskId === taskId)
        return comments
      },
      createComment(newComment, tId) {
        logger.log(tId, 'that id yo')
        newComment.taskId = tId
        newComment.boardId = route.params.id
        newComment.listId = props.listProp.id
        commentsService.createComment(newComment)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
