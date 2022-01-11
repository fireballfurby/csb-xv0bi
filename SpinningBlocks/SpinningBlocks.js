/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SpinningBlocks extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./SpinningBlocks/costumes/1.png", { x: 8, y: 8 }),
      new Costume("2", "./SpinningBlocks/costumes/2.png", { x: 8, y: 5 }),
      new Costume("3", "./SpinningBlocks/costumes/3.png", { x: 8, y: 2 }),
      new Costume("4", "./SpinningBlocks/costumes/4.png", { x: 8, y: 5 }),
      new Costume("Hitbox", "./SpinningBlocks/costumes/Hitbox.png", {
        x: 11,
        y: 0
      }),
      new Costume("Hitbox2", "./SpinningBlocks/costumes/Hitbox2.png", {
        x: 8,
        y: 16
      })
    ];

    this.sounds = [new Sound("Break", "./SpinningBlocks/sounds/Break.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "GoombasLoaded" },
        this.whenIReceiveGoombasloaded
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PlatformsMoved" },
        this.whenIReceivePlatformsmoved
      )
    ];

    this.vars.spinblockno = 29;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 250;
  }

  *whenIReceiveGoombasloaded() {
    if (1 == 1) {
      this.deleteThisClone();
    }
    if (this.stage.vars.deletespinningblockno > 0) {
      this.stage.vars.spinstate.splice(
        this.stage.vars.deletespinningblockno - 1,
        1
      );
      this.stage.vars.spinx.splice(
        this.stage.vars.deletespinningblockno - 1,
        1
      );
      this.stage.vars.spiny.splice(
        this.stage.vars.deletespinningblockno - 1,
        1
      );
      this.stage.vars.deletespinningblockno = 0;
    }
    yield* this.formblocks();
    this.broadcast("SpinningBlocksPlaced");
  }

  *formblocks() {
    this.vars.spinblockno = 1;
    for (let i = 0; i < this.stage.vars.spinx.length; i++) {
      this.goto(
        this.stage.vars.spinx[this.vars.spinblockno - 1] * 20 +
          this.stage.vars.mapx,
        this.stage.vars.spiny[this.vars.spinblockno - 1] * 20 +
          this.stage.vars.mapy
      );
      if (this.x > -240 && this.x < 240 && this.y > -167 && this.y < 167) {
        this.createClone();
      }
      this.vars.spinblockno += 1;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.deletespinningblockno = 0;
    this.stage.vars.spinstate = [];
    this.stage.vars.spinx = [];
    this.stage.vars.spiny = [];
    if (this.stage.vars.level == 1) {
      null;
    }
    if (this.stage.vars.level == 2) {
      this.stage.vars.spinx.push(-2.5);
      this.stage.vars.spiny.push(-9);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(-1.5);
      this.stage.vars.spiny.push(-9);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(-0.5);
      this.stage.vars.spiny.push(-9);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(7);
      this.stage.vars.spiny.push(-9);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(9);
      this.stage.vars.spiny.push(-9);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(8);
      this.stage.vars.spiny.push(-9);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(24.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(25.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(26.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(27.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(34.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(35.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(36.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(37.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(38.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(39.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(40.5);
      this.stage.vars.spiny.push(-3);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(45.5);
      this.stage.vars.spiny.push(-8);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(47.5);
      this.stage.vars.spiny.push(-8);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(49.5);
      this.stage.vars.spiny.push(-8);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(51.5);
      this.stage.vars.spiny.push(-8);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(53.5);
      this.stage.vars.spiny.push(-8);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(108.5);
      this.stage.vars.spiny.push(-11);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(109.5);
      this.stage.vars.spiny.push(-11);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(105.5);
      this.stage.vars.spiny.push(-6);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(109.5);
      this.stage.vars.spiny.push(-5);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(113.5);
      this.stage.vars.spiny.push(-5);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(117.5);
      this.stage.vars.spiny.push(-6);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(135.5);
      this.stage.vars.spiny.push(-12);
      this.stage.vars.spinstate.push(1);
      this.stage.vars.spinx.push(136.5);
      this.stage.vars.spiny.push(-12);
      this.stage.vars.spinstate.push(1);
    }
  }

  *startAsClone() {
    this.visible = true;
    this.costume =
      (this.stage.vars.spinstate[this.vars.spinblockno - 1] % 4) + 1;
    if (this.stage.vars.spinstate[this.vars.spinblockno - 1] > 1) {
      this.stage.vars.spinstate.splice(
        this.vars.spinblockno - 1,
        1,
        this.stage.vars.spinstate[this.vars.spinblockno - 1] + 1
      );
      if (this.stage.vars.spinstate[this.vars.spinblockno - 1] > 12) {
        this.costume = 1;
        if (this.touching(this.sprites["Player"].andClones())) {
          this.stage.vars.spinstate.splice(this.vars.spinblockno - 1, 1, 8);
        } else {
          this.stage.vars.spinstate.splice(this.vars.spinblockno - 1, 1, 1);
        }
      }
    } else {
      this.costume = "Hitbox2";
      if (this.stage.vars.spinstate[this.vars.spinblockno - 1] == 1) {
        if (
          this.touching(this.sprites["Player"].andClones()) &&
          this.stage.vars.spinning == 1
        ) {
          this.stage.vars.deletespinningblockno = this.vars.spinblockno;
          this.stage.vars.maintainspin = 1;
          this.broadcast("Bounce");
          yield* this.startSound("Break");
        }
        this.costume = "Hitbox2";
        if (this.touching(this.sprites["Thwomps"].andClones())) {
          this.stage.vars.deletespinningblockno = this.vars.spinblockno;
          yield* this.startSound("Break");
        }
      }
      if (!(this.stage.vars.yvel < 0)) {
        this.costume = "Hitbox";
        if (this.touching(this.sprites["Player"].andClones())) {
          this.stage.vars.spinstate.splice(this.vars.spinblockno - 1, 1, 2);
        }
      }
      this.costume = this.stage.vars.spinstate[this.vars.spinblockno - 1] % 4;
    }
  }

  *whenIReceivePlatformsmoved() {
    this.goto(
      this.stage.vars.spinx[this.vars.spinblockno - 1] * 20 +
        this.stage.vars.mapx,
      this.stage.vars.spiny[this.vars.spinblockno - 1] * 20 +
        this.stage.vars.mapy
    );
    if (this.stage.vars.spinstate[this.vars.spinblockno - 1] > 1) {
      this.costume = 1;
      if (this.touching(this.sprites["Player"].andClones())) {
        this.stage.vars.passingthroughspinners = 1;
      }
      this.visible = false;
    }
    this.broadcast("SpinningBlocksMoved");
  }
}
