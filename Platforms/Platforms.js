/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Platforms extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Platforms/costumes/1.png", { x: 40, y: 8 }),
      new Costume("HitboxBelow", "./Platforms/costumes/HitboxBelow.png", {
        x: 39,
        y: 6
      })
    ];

    this.sounds = [new Sound("pop", "./Platforms/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "GoombasLoaded" },
        this.whenIReceiveGoombasloaded
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "MapMoved" },
        this.whenIReceiveMapmoved
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "HideGame" },
        this.whenIReceiveHidegame
      )
    ];

    this.vars.platformno = 10;
    this.vars.goombano2 = 0;
  }

  *whenGreenFlagClicked() {
    this.size = 250;
    this.visible = false;
  }

  *formplatforms() {
    this.vars.platformno = 1;
    for (let i = 0; i < this.stage.vars.platformx.length; i++) {
      this.goto(
        this.stage.vars.platformx[this.vars.platformno - 1] * 20 +
          this.stage.vars.mapx,
        this.stage.vars.platformy[this.vars.platformno - 1] * 20 +
          this.stage.vars.mapy
      );
      if (this.x > -284 && this.x < 284 && this.y < 177) {
        this.createClone();
      }
      this.vars.platformno += 1;
    }
  }

  *whenIReceiveGoombasloaded() {
    if (1 == 1) {
      this.deleteThisClone();
    }
    yield* this.formplatforms();
  }

  *startAsClone() {
    this.visible = true;
    if (!(this.y > -180)) {
      this.visible = false;
    }
    if (this.stage.vars.activatedplatforms[this.vars.platformno - 1] == 0) {
      if (this.stage.vars.dead == 0) {
        this.y += 5;
        if (
          this.touching(this.sprites["Player"].andClones()) ||
          this.touching(this.sprites["Goombas"].andClones())
        ) {
          this.stage.vars.activatedplatforms.splice(
            this.vars.platformno - 1,
            1,
            1
          );
        }
        this.y += -5;
      }
    } else {
      if (this.stage.vars.activatedplatforms[this.vars.platformno - 1] < 30) {
        this.stage.vars.activatedplatforms.splice(
          this.vars.platformno - 1,
          1,
          this.stage.vars.activatedplatforms[this.vars.platformno - 1] + 1
        );
        this.x +=
          Math.sin(
            this.scratchToRad(
              this.stage.vars.activatedplatforms[this.vars.platformno - 1] * 90
            )
          ) * 2;
      } else {
        if (
          this.stage.vars.activatedplatforms[this.vars.platformno - 1] < 210
        ) {
          this.y += -2;
          this.stage.vars.platformy.splice(
            this.vars.platformno - 1,
            1,
            (this.y - this.stage.vars.mapy) / 20
          );
          this.stage.vars.activatedplatforms.splice(
            this.vars.platformno - 1,
            1,
            this.stage.vars.activatedplatforms[this.vars.platformno - 1] + 1
          );
        } else {
          this.stage.vars.platformy.splice(
            this.vars.platformno - 1,
            1,
            this.stage.vars.originalplatformy[this.vars.platformno - 1]
          );
          this.stage.vars.activatedplatforms.splice(
            this.vars.platformno - 1,
            1,
            0
          );
        }
      }
    }
  }

  *whenIReceiveMapmoved() {
    this.goto(
      this.stage.vars.platformx[this.vars.platformno - 1] * 20 +
        this.stage.vars.mapx,
      this.stage.vars.platformy[this.vars.platformno - 1] * 20 +
        this.stage.vars.mapy
    );
    this.costume = "HitboxBelow";
    if (this.touching(this.sprites["Player"].andClones())) {
      this.stage.vars.passingthroughplatform = 1;
    }
    this.costume = 1;
    if (this.stage.vars.activatedplatforms[this.vars.platformno - 1] > 29) {
      this.y += -2;
    }
    this.broadcast("PlatformsMoved");
  }

  *whenIReceiveReset() {
    this.stage.vars.activatedplatforms = [];
    this.stage.vars.platformx = [];
    this.stage.vars.platformy = [];
    this.stage.vars.originalplatformy = [];
    if (this.stage.vars.level == 1) {
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(67);
      this.stage.vars.platformy.push(7);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(78.5);
      this.stage.vars.platformy.push(5);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(84.5);
      this.stage.vars.platformy.push(5);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(106);
      this.stage.vars.platformy.push(-4);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(110);
      this.stage.vars.platformy.push(-4);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(114);
      this.stage.vars.platformy.push(-4);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(118);
      this.stage.vars.platformy.push(-4);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(122);
      this.stage.vars.platformy.push(-4);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
    }
    if (this.stage.vars.level == 2) {
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(37.5);
      this.stage.vars.platformy.push(-13);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(49.5);
      this.stage.vars.platformy.push(-13);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(63.5);
      this.stage.vars.platformy.push(-3);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(66);
      this.stage.vars.platformy.push(-3);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(68.5);
      this.stage.vars.platformy.push(-3);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(81.5);
      this.stage.vars.platformy.push(-13);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(119.5);
      this.stage.vars.platformy.push(-16);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(124.5);
      this.stage.vars.platformy.push(-16);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
      this.stage.vars.activatedplatforms.push(0);
      this.stage.vars.platformx.push(129.5);
      this.stage.vars.platformy.push(-16);
      this.stage.vars.originalplatformy.push(
        this.stage.vars.platformy[this.stage.vars.platformy.length - 1]
      );
    }
  }

  *whenIReceiveHidegame() {
    this.visible = false;
  }
}
