/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Level1A", "./Level/costumes/Level1A.png", {
        x: 480,
        y: 280
      }),
      new Costume("Level1B", "./Level/costumes/Level1B.png", {
        x: 480,
        y: 360
      }),
      new Costume("Level1C", "./Level/costumes/Level1C.png", {
        x: 480,
        y: 216
      }),
      new Costume("Level1D", "./Level/costumes/Level1D.png", {
        x: 480,
        y: 120
      }),
      new Costume("Level2A", "./Level/costumes/Level2A.png", {
        x: 480,
        y: 264
      }),
      new Costume("Level2B", "./Level/costumes/Level2B.png", { x: 480, y: 8 }),
      new Costume("Level2C", "./Level/costumes/Level2C.png", {
        x: 480,
        y: 360
      }),
      new Costume("Level2D", "./Level/costumes/Level2D.png", {
        x: 480,
        y: 360
      }),
      new Costume("Dot", "./Level/costumes/Dot.png", { x: 0, y: 0 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.cloneno = 0;
    this.vars.checkpos2 = 0;
    this.vars.timesincedeath2 = 0;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.level = 1;
    this.vars.cloneno = 1;
    this.createClone();
    this.vars.cloneno = 2;
    this.createClone();
    this.vars.cloneno = 3;
    this.createClone();
    this.vars.cloneno = 0;
    while (true) {
      this.broadcast("Tick");
      yield;
    }
  }

  *whenIReceiveTick() {
    if (this.stage.vars.pause == 0) {
      this.stage.vars.passingthroughplatform = 0;
      this.stage.vars.passingthroughspinners = 0;
      if (this.vars.cloneno == 0) {
        if (this.stage.vars.mapxautomovespeed < 0) {
          this.stage.vars.mapx += this.stage.vars.mapxautomovespeed;
        } else {
          this.stage.vars.mapx +=
            (this.stage.vars.playerx * -1 - this.stage.vars.mapx) /
            (15 + this.stage.vars.gravity * 4.5);
        }
        if (this.stage.vars.mapx > 360) {
          this.stage.vars.mapx = 360;
        }
        if (!(this.stage.vars.mapxrightboundary == 0)) {
          if (this.stage.vars.mapx < this.stage.vars.mapxrightboundary) {
            this.stage.vars.mapx = this.stage.vars.mapxrightboundary;
          }
        }
        if (this.stage.vars.mapyautomovespeed < 0) {
          this.stage.vars.mapy += this.stage.vars.mapyautomovespeed;
        }
      }
      this.costume = "Dot";
      this.size = 250;
      if (this.vars.cloneno == 0) {
        this.costume = "" + "Level" + ("" + this.stage.vars.level + "A");
        if (this.stage.vars.mapx < -840 || this.stage.vars.mapx > 840) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
      if (this.vars.cloneno == 1) {
        this.costume = "" + "Level" + ("" + this.stage.vars.level + "B");
        if (this.stage.vars.mapx < -2040 || this.stage.vars.mapx > -360) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
      if (this.vars.cloneno == 2) {
        this.costume = "" + "Level" + ("" + this.stage.vars.level + "C");
        if (this.stage.vars.mapx < -3240 || this.stage.vars.mapx > -1560) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
      if (this.vars.cloneno == 3) {
        this.costume = "" + "Level" + ("" + this.stage.vars.level + "D");
        if (this.stage.vars.mapx < -4440 || this.stage.vars.mapx > -2760) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
      this.goto(
        this.stage.vars.mapx + this.vars.cloneno * 1200,
        this.stage.vars.mapy
      );
      if (this.vars.cloneno == 0) {
        this.broadcast("MapMoved");
      }
    }
  }

  *startAsClone() {
    this.visible = true;
  }
}
