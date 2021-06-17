import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  boards: [],
  board: {},
  lists: [],
  list: {},
  tasks: [
    {
      name: 'task1',
      id: 1
    },
    {
      name: 'task2',
      id: 2
    },
    {
      name: 'task3',
      id: 3
    }
  ],
  task: {}
})
