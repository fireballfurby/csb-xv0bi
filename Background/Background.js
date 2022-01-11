/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Background extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Background/costumes/1.png", { x: 480, y: 360 }),
      new Costume("2", "./Background/costumes/2.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Background/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinishedMovement" },
        this.whenIReceiveFinishedmovement
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "BackgroundUpdate" },
        this.whenIReceiveBackgroundupdate
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.clone = 0;
  }

  *startAsClone() {
    this.vars.clone = 1;
  }

  *whenIReceiveFinishedmovement() {
    /* TODO: Implement looks_gotofrontback */ null;
    this.goto(((this.stage.vars.mapx * 0.2) % 480) + this.vars.clone * -480, 0);
    this.broadcast("BackgroundPlaced");
  }

  *whenIReceiveBackgroundupdate() {
    if (Math.round(this.stage.vars.mapy) == -210) {
      this.costume = 1;
    }
    if (Math.round(this.stage.vars.mapy) == 150) {
      this.costume = 2;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.createClone();
    this.vars.clone = 0;
  }
}
