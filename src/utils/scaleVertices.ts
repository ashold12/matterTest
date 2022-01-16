import type { Vector } from "matter-js"

export const scaleVertices = (scale: {x: number, y:number}, vectors: Array<Array<Matter.Vector>>): typeof vectors => {
  return vectors.map((vectors: Array<Vector>) => {
    return vectors.map(({x, y}) => ({x: scale.x * x, y: scale.y * y})
  }
}