/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Levels extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Levels/costumes/1.png", { x: 480, y: 360 }),
      new Costume("2", "./Levels/costumes/2.png", { x: 480, y: 360 }),
      new Costume(
        "SNES - Super Mario World - Fonts",
        "./Levels/costumes/SNES - Super Mario World - Fonts.png",
        { x: 256, y: 184 }
      )
    ];

    this.sounds = [new Sound("pop", "./Levels/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "ResetForLevels" },
        this.whenIReceiveResetforlevels
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveResetforlevels() {
    this.goto(0, 0);
    this.effects.clear();
    this.visible = true;
    /* TODO: Implement looks_gotofrontback */ null;
    this.costume = this.stage.vars.level;
    yield* this.wait(1);
    for (let i = 0; i < 5; i++) {
      this.effects.ghost += 20;
      yield;
    }
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
