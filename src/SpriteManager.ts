import { Vector, Bodies } from "matter-js";
import { Sprite as PixiSprite, Texture, Resource, Rectangle } from "pixi.js";
import { app } from "./PixiApp";

const float32ArrayToVector = (array: Float32Array) => {
  var res: Vector[][]
  let currentVector: Vector
  array.forEach((val, index) => {
    if (!currentVector) currentVector = new Vector();
    if (index % 2)
  }
}

export class MatterSprite extends PixiSprite {
  constructor(
    texture?: Texture<Resource>,
    startPosition: { x: number; y: number } = {
      //default to center
      x: app.renderer.width / 2,
      y: app.renderer.height / 2,
    }
  ) {
    super(texture);

    this.scale.x = 2;
    this.scale.y = 2;

    this.x = startPosition.x;
    this.y = startPosition.y;

    app.stage.addChild(this);
    this.rigidBody = Bodies.rectangle(this.x, this.y, this.width, this.height);
  }
  rigidBody: Matter.Body;

  updatePos = () => {
    const rb = this.rigidBody;
    this.x = rb.position.x;
    this.y = rb.position.y;
    this.angle = rb.angle;
  };

}
