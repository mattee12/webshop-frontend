import { createStore, StoreOptions } from 'vuex'
import userStore from './modules/user'

const store: StoreOptions<RootState> = {
  state: {
  },
  modules: {
    userStore,
  },
}
export default createStore(store)

export type RootState = unknown