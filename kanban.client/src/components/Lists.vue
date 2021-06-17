<template>
  <div class="lists">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      {{ list.name }}
    </button>
    <ListModal :list-prop="list" />
  </div>
</template>

<script>
export default {
  name: 'Lists',
  props: { list: { type: Object, required: true } },
  setup(props) {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
