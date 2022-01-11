/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Wipe extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Wipe/costumes/costume1.png", {
        x: 480,
        y: 360
      }),
      new Costume(
        "SNES - Super Mario World - Princess Toadstool Peach",
        "./Wipe/costumes/SNES - Super Mario World - Princess Toadstool Peach.png",
        { x: 320, y: 224 }
      ),
      new Costume("tym", "./Wipe/costumes/tym.png", { x: 363, y: 26.5 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Win" }, this.whenIReceiveWin),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "HideGame" },
        this.whenIReceiveHidegame
      )
    ];
  }

  *whenIReceiveWin() {
    if (this.stage.vars.level == 2) {
      yield* this.wait(9);
      this.visible = true;
      for (let i = 0; i < 90; i++) {
        this.effects.ghost += -4;
        this.x = this.x / 1.2;
        /* TODO: Implement looks_gotofrontback */ null;
        yield;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.costume = "costume1";
    this.size = 100;
    this.visible = false;
  }

  *whenIReceiveReset() {
    this.visible = false;
    this.effects.ghost = 100;
    this.goto(-480, 0);
  }

  *whenthisspriteclicked() {
    this.broadcast("Reset");
  }

  *whenIReceiveHidegame() {
    this.visible = false;
  }
}
