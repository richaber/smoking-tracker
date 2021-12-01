import useLocalStorageState, { createLocalStorageStateHook } from 'use-local-storage-state'

// useLocalStorageState "Returns [value, setValue, { removeItem, isPersistent }]"
// import useLocalStorageState from 'use-local-storage-state'

// useLocalStorageState "Returns [value, setValue, { removeItem, isPersistent }]"
// const [items, setItems, {
//   removeItem,
//   isPersistent
// }] = useLocalStorageState('items', [])

const useItems = createLocalStorageStateHook(
  'items',
  []
)

function Items () {
  const [items, setItems] = useItems()
}


export default function Items() {
  const [items, setItems, { isPersistent }] = createLocalStorageStateHook('items', [])

  return items
}
