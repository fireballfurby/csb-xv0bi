/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Levelbackgrounds extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Level1A", "./Levelbackgrounds/costumes/Level1A.png", {
        x: 480,
        y: 360
      }),
      new Costume("Dot", "./Levelbackgrounds/costumes/Dot.png", { x: 0, y: 0 }),
      new Costume("Level1B", "./Levelbackgrounds/costumes/Level1B.png", {
        x: 480,
        y: 360
      }),
      new Costume("Level1C", "./Levelbackgrounds/costumes/Level1C.png", {
        x: 480,
        y: 360
      }),
      new Costume("Level1D", "./Levelbackgrounds/costumes/Level1D.png", {
        x: 370,
        y: 264
      }),
      new Costume("Level2A", "./Levelbackgrounds/costumes/Level2A.png", {
        x: 480,
        y: 360
      }),
      new Costume("Level2D", "./Levelbackgrounds/costumes/Level2D.png", {
        x: 368,
        y: 264
      })
    ];

    this.sounds = [new Sound("pop", "./Levelbackgrounds/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinishedMovement" },
        this.whenIReceiveFinishedmovement
      )
    ];

    this.vars.cloneno2 = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.effects.ghost = 0;
    this.vars.cloneno2 = 1;
    this.createClone();
    this.vars.cloneno2 = 2;
    this.createClone();
    this.vars.cloneno2 = 3;
    this.createClone();
    this.vars.cloneno2 = 0;
  }

  *startAsClone() {
    this.visible = true;
  }

  *whenIReceiveFinishedmovement() {
    this.costume = "Dot";
    this.size = 250;
    if (this.vars.cloneno2 == 0) {
      this.costume = "" + "Level" + ("" + this.stage.vars.level + "A");
      if (this.stage.vars.mapx < -840 || this.stage.vars.mapx > 840) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
    if (this.vars.cloneno2 == 1) {
      this.costume = "" + "Level" + ("" + this.stage.vars.level + "B");
      if (this.stage.vars.mapx < -2040 || this.stage.vars.mapx > -360) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
    if (this.vars.cloneno2 == 2) {
      this.costume = "" + "Level" + ("" + this.stage.vars.level + "C");
      if (this.stage.vars.mapx < -3240 || this.stage.vars.mapx > -1560) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
    if (this.vars.cloneno2 == 3) {
      this.costume = "" + "Level" + ("" + this.stage.vars.level + "D");
      if (this.stage.vars.mapx < -4440 || this.stage.vars.mapx > -2915) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
    this.goto(
      this.stage.vars.mapx + this.vars.cloneno2 * 1200,
      this.stage.vars.mapy
    );
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }
}
