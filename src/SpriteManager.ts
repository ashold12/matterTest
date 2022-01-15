import { Vector, Bodies, Body } from "matter-js";
import { Sprite as PixiSprite, Texture, Resource, Rectangle } from "pixi.js";
import { app } from "./PixiApp";

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

    //double size sprite resource
    this.scale.x = 2;
    this.scale.y = 2;

    //anchor (rotation point) center of sprite
    this.anchor.set(0.5);

    this.x = startPosition.x;
    this.y = startPosition.y;

    app.stage.addChild(this);
    this.rigidBody = Bodies.rectangle(this.x, this.y, this.width, this.height);
  }
  rigidBody: Matter.Body;
  readonly rotationMultiplier = 5;
  readonly velocityMultipler = 5;

  //client input
  movementInputs = {
    rotation: {
      right: false,
      left: false,
    },
    forward: false,
  };

  applyForce = () => {
    if (!this.movementInputs.forward) {
      Body.setVelocity(this.rigidBody, { x: 0, y: 0 });
      return;
    }
    const { angle } = this.rigidBody;
    Body.setVelocity(this.rigidBody, {
      x: this.velocityMultipler * Math.cos(angle - Math.PI / 2),
      y: this.velocityMultipler * Math.sin(angle - Math.PI / 2),
    });
  };

  applyRotation = () => {
    const { left, right } = this.movementInputs.rotation;
    //disable angular velocity
    if (left == right) {
      Body.setAngularVelocity(this.rigidBody, 0);
      return;
    }
    //set velocity if inputs

    if (left)
      Body.setAngularVelocity(
        this.rigidBody,
        this.rotationMultiplier * (Math.PI / 180)
      );
    else
      Body.setAngularVelocity(
        this.rigidBody,
        -this.rotationMultiplier * (Math.PI / 180)
      );
  };

  /**
   * DO NOT CALL FROM OUTSIDE MATTER ENGINE
   * this position should only be interacted with from the matter update loop
   */
  updatePos = () => {
    const rb = this.rigidBody;
    this.x = rb.position.x;
    this.y = rb.position.y;
    this.rotation = rb.angle;
  };
}
