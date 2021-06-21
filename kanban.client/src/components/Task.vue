<template>
  <div class="task">
    <p data-toggle="modal" :data-target="`#listNum${task.id}`" @click="getAllCommentsByTaskId(task.id)">
      {{ task.name }}
    </p>
    <CommentModal :task-prop="task" />
  </div>
</template>

<script>
import { commentsService } from '../services/CommentService'
export default {
  name: 'Task',
  props: { task: { type: Object, required: true } },
  setup(props) {
    return {
      async getAllCommentsByTaskId(id) {
        await commentsService.getAllCommentsByTaskId(id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
