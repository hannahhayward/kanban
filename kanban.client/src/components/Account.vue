<template>
  <div class="card bg-dark text-light d-flex h-100">
    <div class="card-header">
      <h1>
        USERNAME
        <!-- {{ account.name }} -->
      </h1>
      <div class="card-body">
        <img src="https://pyxis.nymag.com/v1/imgs/84d/5e8/795f6bd4ac0a09abc0c267a829ee7806c4-17-rick-and-morty-animation-lede.rsquare.w1200.jpg " alt="user picture" class="rounded-pill h-100 w-25 justify-content-center">
        <p>user email</p>
        <p>stats or some shit</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-warning btn-block">
          logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state
    }
  }

}
</script>

<style>

</style>
