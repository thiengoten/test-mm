const items = Array.from({ length: 1000 }).map((_, index) => ({
  id: index,
  name: `Item ${index}`,
}))

type Item = (typeof items)[number]

const LIMIT = 10

export const getItems = ({
  pageParam,
}: {
  pageParam: number
}): Promise<{
  data: Item[]
  currentPage: number
  nextPage: number | null
}> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: items.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
      })
    }, 1000)
  })
