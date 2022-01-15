import {
  Application as PixiApp,
  Loader,
  ObservablePoint,
  Sprite,
} from "pixi.js";
import { MatterSprite } from "./SpriteManager";
import { MatterManager } from "./Matter";
import Matter from "matter-js";

export let app: PixiApp;
export const InitializePixi = () => {
  app = new PixiApp();
  app.view.width = window.innerWidth * 0.5;
  app.view.height = window.innerHeight * 0.9;
  document.getElementById("main").appendChild(app.view);
  app.loader.add("car", "./blue_pixel_car.png").load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image.
    const car = new MatterSprite(resources.car.texture, {
      x: app.renderer.width / 2,
      y: app.renderer.height / 2,
    });

    // Add the car to the scene we are building.
    app.stage.addChild(car);
    MatterManager.addSprite(car);

    // Listen for frame updates
    app.ticker.add((delta) => {
      car.applyRotation();
      car.updatePos();
    });

    //managing inputs
    window.addEventListener("mousedown", (e) => car.applyForce());
    window.onkeydown = (e: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      let direction: keyof typeof car.rotationInputs =
        e.key == "ArrowLeft" ? "right" : "left";
      car.rotationInputs[direction] = true;
    };
    window.onkeyup = (e: KeyboardEvent) => {
      if (e.key == "ArrowLeft") car.rotationInputs.right = false;
      else if (e.key == "ArrowRight") car.rotationInputs.left = false;
    };
  });
};
