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
            <div v-for="task in tasks" :key="task.id" class="d-flex align-items-center justify-content-between m-2">
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
                  <div class="form-group">
                    <p>
                      Edit
                    </p>
                    <label for="exampleDropdownFormEmail1" class="sr-only">Name</label>
                    <input type="text" class="form-control" v-model="state.taskEdit.name" placeholder="Name">
                  </div>
                  <div class="form-group">
                    <label for="taskEditColor" class="sr-only">Color</label>
                    <input type="color" class="form-control" v-model="state.taskEdit.color" placeholder="Color">
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-item bg-danger" @click="deleteTask(task.id)">
                    Delete
                  </div>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Move</a>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
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
export default {
  name: 'ListModal',
  props: { listProp: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      taskEdit: {}
    })
    return {
      state,
      lists: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks.filter(t => props.listProp.id === t.listId)),

      async deleteTask(id) {
        if (confirm('Do you really want to delete this task ??')) {
          tasksService.deleteTask(id)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
