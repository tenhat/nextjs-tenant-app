import { Item } from "../component/jsonItems"

export async function getAllJsonIds() {
  return fetch("http://localhost:8000/items")
    .then((res) => res.json())
    .then((data) => {
      return data.map((item: Item) => {
        return {
          params: {
            id: item.id.toString()
          }
        }
      })
    })
}

export async function getJsonData(id: number) {
  return fetch(`http://localhost:8000/items`).then((res) => res.json()).then((data) => {
    return data.find((el: any) => el.id == id);
  })
}
