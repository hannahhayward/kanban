<template>
  <div class="container-fluid">
    <div class="row">
      <div class="board-section col-7 border border-dark m-3" style="height: 100vh">
        <div class="create-board-form row border border-success m-3" style="height: 20vh">
          Board Form
        </div>
        <div class="board-list row border border-primary m-3" style="height: 70vh">
          <BoardPage />
        </div>
      </div>
      <div class="accountDetail col-3 border border-dark m-3" style="height: 100vh">
        Account Details
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardsPage'
}
</script>
