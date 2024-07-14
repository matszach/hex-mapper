import { batchMap, chunk, gridCoords } from "./calc.utils"

describe('chunk()', () => {
  test('returns expected result', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const chunkSize = 3
    const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
    expect(chunk(input, chunkSize, false)).toEqual(expected)
  })
  test('skips incomplete chunks if requested', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const chunkSize = 3
    const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expect(chunk(input, chunkSize, true)).toEqual(expected)
  })
})

describe('batchMap()', () => {
  test('returns expected result', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const chunkSize = 3
    const callback = ([o1, o2, o3]: number[]) => [o1 + 10, o2 + 20, o3 + 30]
    const expected = [11, 22, 33, 14, 25, 36, 17, 28, 39]
    expect(batchMap(input, chunkSize, callback)).toEqual(expected)
  })
})

describe('getCoords()', () => {
  test('returns expected result', () => { 
    const expected = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] 
    expect(gridCoords(3, 3)).toEqual(expected)   
  })
})