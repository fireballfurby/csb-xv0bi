/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumbnail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Sprite-0001", "./Thumbnail/costumes/Sprite-0001.png", {
        x: 480,
        y: 360
      }),
      new Costume(
        "SNES - Super Mario World - Title Screen",
        "./Thumbnail/costumes/SNES - Super Mario World - Title Screen.png",
        { x: 280, y: 186 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinishedMovement" },
        this.whenIReceiveFinishedmovement
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
    this.effects.ghost = 100;
  }

  *whenIReceiveFinishedmovement() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }
}
