import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getAllLists() {
    const res = await api.get('api/lists')
    AppState.lists = res.data
  }

  async getLists() {
    const res = await api.get('/api/lists/')
    AppState.lists = res.data
  }
}
export const listsService = new ListsService()
