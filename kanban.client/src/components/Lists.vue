<template>
  <div class="lists">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      {{ list.name }}
    </button>
    <ListModal v-for="l in lists" :key="l.id" :list-prop="list" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Lists',
  props: { list: { type: Object, required: true } },
  setup(props) {
    return {
      lists: computed(() => AppState.lists)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
