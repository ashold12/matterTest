import Matter, { Bodies, Engine, Render, World } from "matter-js";
import type { MatterSprite } from "./SpriteManager";
import { app } from "./PixiApp";

class Timer {
  private lastUpdate: number;
  getDelta = () => {
    const time = Date.now();
    const delta = this.lastUpdate ? time - this.lastUpdate : 0;
    this.lastUpdate = time;
    return delta;
  };
}

export abstract class MatterManager {
  private static timer = new Timer();
  private static engine = Engine.create();
  private static render: Matter.Render;
  private static borderSpace = 10; //border outside bounds of app view

  public static start = () => {
    const { height, width } = app.renderer.view;
    this.engine.world.bounds = {
      min: { x: -this.borderSpace, y: this.borderSpace },
      max: {
        x: height + this.borderSpace,
        y: width + this.borderSpace,
      },
    };

    /*
    let left = Bodies.rectangle(
      -(this.borderSpace / 2),
      height / 2,
      height + this.borderSpace * 2,
      this.borderSpace,
      { isStatic: true }
    );

    let right = Bodies.rectangle(
      this.borderSpace / 2 + width,
      height / 2,
      height + this.borderSpace * 2,
      this.borderSpace,
      { isStatic: true }
    );
    */

    let top = Bodies.rectangle(width / 2, height, width, this.borderSpace, {
      isStatic: true,
    });

    let bottom = Bodies.rectangle(
      width / 2,
      this.borderSpace / 2,
      width,
      this.borderSpace,
      { isStatic: true }
    );

    World.add(this.engine.world, [/*left, right */ top, bottom]);

    setInterval(() => {
      const delta = this.timer.getDelta();
      Engine.update(this.engine, delta);
      if (this.render) Render.world(this.render);
    }, 30);
  };

  public static addSprite = (sprite: MatterSprite) => {
    World.add(this.engine.world, [sprite.rigidBody]);
  };

  public static startDebugRender = () => {
    this.render = Render.create({
      element: document.getElementById("matter"),
      engine: this.engine,
      options: {
        width: app.view.width,
        height: app.view.height,
        wireframes: true,
      },
    });
  };
}
