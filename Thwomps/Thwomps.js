/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thwomps extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Thwomps/costumes/1.png", { x: 0, y: 0 }),
      new Costume("2", "./Thwomps/costumes/2.png", { x: 0, y: 0 }),
      new Costume("3", "./Thwomps/costumes/3.png", { x: 0, y: 0 }),
      new Costume("BounceHitbox", "./Thwomps/costumes/BounceHitbox.png", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("HitFloor", "./Thwomps/sounds/HitFloor.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "SpinningBlocksPlaced" },
        this.whenIReceiveSpinningblocksplaced
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "SpinningBlocksMoved" },
        this.whenIReceiveSpinningblocksmoved
      )
    ];

    this.vars.thwompno = 13;
  }

  *whenGreenFlagClicked() {
    this.size = 125;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.visible = false;
  }

  *whenIReceiveReset() {
    this.stage.vars.thwompx = [];
    this.stage.vars.thwompy = [];
    this.stage.vars.thwompstate = [];
    this.stage.vars.thwompyvelocity = [];
    if (this.stage.vars.level == 1) {
      null;
    }
    if (this.stage.vars.level == 2) {
      this.stage.vars.thwompx.push(8);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(12);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(16);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(20);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(26);
      this.stage.vars.thwompy.push(-4.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(36);
      this.stage.vars.thwompy.push(-4.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(39);
      this.stage.vars.thwompy.push(-4.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(81.5);
      this.stage.vars.thwompy.push(-2.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(132.5);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(132.5);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(143);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
      this.stage.vars.thwompx.push(146);
      this.stage.vars.thwompy.push(-1.5);
      this.stage.vars.thwompstate.push(0);
      this.stage.vars.thwompyvelocity.push(0);
    }
  }

  *whenIReceiveSpinningblocksplaced() {
    if (1 == 1) {
      this.deleteThisClone();
    }
    if (this.stage.vars.thwompx.length > 0) {
      yield* this.thwomps();
    }
    this.broadcast("ThwompsPlaced");
  }

  *thwomps() {
    this.vars.thwompno = 1;
    for (let i = 0; i < this.stage.vars.thwompx.length; i++) {
      this.goto(
        this.stage.vars.thwompx[this.vars.thwompno - 1] * 20 +
          this.stage.vars.mapx,
        this.stage.vars.thwompy[this.vars.thwompno - 1] * 20 +
          this.stage.vars.mapy
      );
      if (this.x > -240 && this.x < 240 && this.y > -180 && this.y < 180) {
        this.createClone();
      }
      this.vars.thwompno += 1;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.costume = "BounceHitbox";
    if (this.touching(this.sprites["Player"].andClones())) {
      if (this.stage.vars.spinning == 1) {
        this.stage.vars.yvel = 8;
        this.broadcast("Bounce");
        this.stage.vars.maintainspin = 1;
      }
    } else {
      this.costume = 1;
      if (this.touching(this.sprites["Player"].andClones())) {
        this.broadcast("PowerDown");
      }
    }
    if (this.stage.vars.thwompstate[this.vars.thwompno - 1] == 0) {
      if (Math.abs(this.x - this.sprites["Player"].x) < 80) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Player"].y - this.y,
            this.sprites["Player"].x - this.x
          )
        );
        this.costume = 2;
        if (
          Math.abs(this.x - this.sprites["Player"].x) < 30 &&
          this.sprites["Player"].y < this.y + 40
        ) {
          this.stage.vars.thwompstate.splice(this.vars.thwompno - 1, 1, 1);
        }
      } else {
        this.costume = 1;
      }
    }
    if (this.stage.vars.thwompstate[this.vars.thwompno - 1] == 1) {
      this.costume = 3;
      this.y += -2;
      this.y += this.stage.vars.thwompyvelocity[this.vars.thwompno - 1];
      this.stage.vars.thwompyvelocity.splice(
        this.vars.thwompno - 1,
        1,
        this.stage.vars.thwompyvelocity[this.vars.thwompno - 1] + -1
      );
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        this.touching(this.sprites["SpinningBlocks"].andClones()) ||
          this.touching(this.sprites["Platforms"].andClones())
      ) {
        yield* this.findfloor();
      }
      yield* this.startSound("HitFloor");
      this.stage.vars.thwompy.splice(
        this.vars.thwompno - 1,
        1,
        (this.y - this.stage.vars.mapy) / 20
      );
    }
    if (
      this.stage.vars.thwompstate[this.vars.thwompno - 1] > 1 &&
      !(this.stage.vars.thwompstate[this.vars.thwompno - 1] == 3.5)
    ) {
      this.stage.vars.thwompstate.splice(
        this.vars.thwompno - 1,
        1,
        this.stage.vars.thwompstate[this.vars.thwompno - 1] + 1
      );
      this.costume = 3;
      this.stage.vars.thwompyvelocity.splice(this.vars.thwompno - 1, 1, 0);
    }
    if (this.stage.vars.thwompstate[this.vars.thwompno - 1] > 40) {
      this.stage.vars.thwompstate.splice(this.vars.thwompno - 1, 1, 3.5);
    }
    if (this.stage.vars.thwompstate[this.vars.thwompno - 1] == 3.5) {
      this.costume = 1;
      this.y += 2;
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        this.touching(this.sprites["SpinningBlocks"].andClones())
      ) {
        yield* this.findceiling();
      }
      this.stage.vars.thwompy.splice(
        this.vars.thwompno - 1,
        1,
        (this.y - this.stage.vars.mapy) / 20
      );
      this.stage.vars.thwompyvelocity.splice(this.vars.thwompno - 1, 1, 0);
    }
  }

  *whenIReceiveSpinningblocksmoved() {
    this.costume = 1;
    this.goto(
      this.stage.vars.thwompx[this.vars.thwompno - 1] * 20 +
        this.stage.vars.mapx,
      this.stage.vars.thwompy[this.vars.thwompno - 1] * 20 +
        this.stage.vars.mapy
    );
    if (this.stage.vars.thwompstate[this.vars.thwompno - 1] == 3.5) {
      this.y += 2;
      if (this.stage.vars.spinning == 1) {
        if (this.touching(this.sprites["Player"].andClones())) {
          this.stage.vars.maintainspin = 1;
        }
      }
    }
    this.broadcast("ThwompsMoved");
  }

  *findfloor() {
    while (
      !!(
        this.touching(this.sprites["Level"].andClones()) ||
        this.touching(this.sprites["SpinningBlocks"].andClones()) ||
          this.touching(this.sprites["Platforms"].andClones())
      )
    ) {
      this.y += 1;
    }
    this.stage.vars.thwompstate.splice(this.vars.thwompno - 1, 1, 2);
  }

  *findceiling() {
    while (
      !!(
        this.touching(this.sprites["Level"].andClones()) ||
        this.touching(this.sprites["SpinningBlocks"].andClones())
      )
    ) {
      this.y += -1;
    }
    this.stage.vars.thwompstate.splice(this.vars.thwompno - 1, 1, 0);
  }
}
