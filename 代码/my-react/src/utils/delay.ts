function delay<T>(data: T, time: number = 100): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), time)
  })
}

export default delay
