<template>
  <div class="taskModal">
    <div class="modal fade"
         :id="`listNum${taskProp.id}`"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">
              {{ taskProp.name }}
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-for="comment in comments" :key="comment.id" class="d-flex align-items-center justify-content-between m-2">
              <p>{{ comment.body }} <img :src="comment.creator.picture" alt="" class="profile-img"> {{ comment.creator.name }}</p>
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
                  <div v-if="comment.creatorId === account.id" class="dropdown-item bg-danger" @click="deleteComment(comment.id)">
                    Delete
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form class="form-inline" @submit.prevent="createComment(state.newComment)">
                <div class="form-group mx-sm-3 mb-2">
                  <label for="newComment" class="sr-only">New Comment</label>
                  <input type="text" class="form-control" v-model="state.newComment.body" placeholder="New Comment">
                </div>
                <button type="submit" class="btn btn-primary mb-2">
                  Create Comment
                </button>
              </form>
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
import { commentsService } from '../services/CommentService'
export default {
  name: 'CommentModal',
  props: { taskProp: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      newComment: {
        body: ''
      }
    })
    return {
      state,
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),

      filterComment(taskId) {
        const tasks = AppState.comments.filter(c => c.taskId === taskId)
        return tasks
      },

      async deleteComment(id) {
        if (confirm('Do you really want to delete this Comment ??')) {
          commentsService.deleteComment(id)
        }
      },

      async createComment(newComment) {
        newComment.taskId = props.taskProp.id
        newComment.listId = props.taskProp.listId
        newComment.boardId = props.taskProp.boardId
        await commentsService.createComment(newComment)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
}
</style>
