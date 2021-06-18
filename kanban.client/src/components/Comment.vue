<template>
  <div>
    {{ comment.name }}
    {{ user.name }}
  </div>
  <p @onclick="deleteComment(comment.id)">
    <b>delete</b>
  </p>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentService'
export default {
  props: { comment: { type: Object, required: true } },
  setup() {
    return {
      comments: computed(() => AppState.comments),
      deleteComment(id) {
        commentsService.deleteComment(id)
      },
      user: computed(() => AppState.comments.find(c => c.creatorId === AppState.account.id))
    }
  }
}
</script>

<style>

</style>
