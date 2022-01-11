/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Goombas extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Goombas/costumes/1.png", { x: 0, y: 0 }),
      new Costume("2", "./Goombas/costumes/2.png", { x: 0, y: 0 }),
      new Costume("3", "./Goombas/costumes/3.png", { x: 0, y: 0 }),
      new Costume("BigHitbox", "./Goombas/costumes/BigHitbox.png", {
        x: 0,
        y: 0
      }),
      new Costume("HitboxTop", "./Goombas/costumes/HitboxTop.png", {
        x: 0,
        y: 0
      }),
      new Costume("goombas", "./Goombas/costumes/goombas.png", {
        x: 246,
        y: 184
      })
    ];

    this.sounds = [new Sound("Stomp", "./Goombas/sounds/Stomp.mp3")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinishedMovement" },
        this.whenIReceiveFinishedmovement
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "MapMoved" },
        this.whenIReceiveMapmoved
      )
    ];

    this.vars.goombano = 12;
  }

  *whenGreenFlagClicked() {
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.size = 125;
    this.visible = false;
  }

  *loadgoombas() {
    this.vars.goombano = 1;
    for (let i = 0; i < this.stage.vars.goombax.length; i++) {
      this.goto(
        this.stage.vars.goombax[this.vars.goombano - 1] * 20 +
          this.stage.vars.mapx,
        this.stage.vars.goombay[this.vars.goombano - 1] * 20 +
          this.stage.vars.mapy
      );
      if (this.x > -230 && this.x < 230 && this.y > -169 && this.y < 169) {
        this.direction = this.stage.vars.goombadir[this.vars.goombano - 1];
        this.createClone();
      }
      this.vars.goombano += 1;
    }
  }

  *whenIReceiveFinishedmovement() {
    if (1 == 1) {
      this.deleteThisClone();
    }
    if (this.stage.vars.deletegooombano > 0) {
      this.stage.vars.goombadir.splice(this.stage.vars.deletegooombano - 1, 1);
      this.stage.vars.goombax.splice(this.stage.vars.deletegooombano - 1, 1);
      this.stage.vars.goombay.splice(this.stage.vars.deletegooombano - 1, 1);
      this.stage.vars.deletegooombano = 0;
    }
    if (this.stage.vars.goombax.length > 0) {
      yield* this.loadgoombas();
    }
    this.broadcast("GoombasLoaded");
  }

  *findfloor() {
    while (
      !(
        this.touching(this.sprites["Level"].andClones()) ||
        this.touching(this.sprites["Platforms"].andClones()) ||
          this.touching(this.sprites["SpinningBlocks"].andClones())
      )
    ) {
      this.y += -1;
    }
    this.y += 1;
  }

  *findfloorsmooth() {
    for (let i = 0; i < 6; i++) {
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        this.touching(this.sprites["Platforms"].andClones()) ||
          this.touching(this.sprites["SpinningBlocks"].andClones())
      ) {
        this.y += 1;
      }
    }
    if (
      this.touching(this.sprites["Level"].andClones()) ||
      this.touching(this.sprites["Platforms"].andClones()) ||
        this.touching(this.sprites["SpinningBlocks"].andClones())
    ) {
      this.y += -6;
    }
  }

  *startAsClone() {
    this.costume = "BigHitbox";
    this.visible = true;
    this.y += this.stage.vars.gravity * 2;
    if (
      this.touching(this.sprites["Level"].andClones()) ||
      this.touching(this.sprites["Platforms"].andClones()) ||
        this.touching(this.sprites["SpinningBlocks"].andClones())
    ) {
      this.y += this.stage.vars.gravity * -2;
      yield* this.findfloor();
    }
    this.stage.vars.goombay.splice(
      this.vars.goombano - 1,
      1,
      (this.y - this.stage.vars.mapy) / 20
    );
    this.x += this.direction / 90;
    yield* this.findfloorsmooth();
    if (
      this.touching(this.sprites["Level"].andClones()) ||
      this.touching(this.sprites["Platforms"].andClones()) ||
        this.touching(this.sprites["SpinningBlocks"].andClones())
    ) {
      this.direction += 180;
      this.move(1);
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        this.touching(this.sprites["Platforms"].andClones()) ||
          this.touching(this.sprites["SpinningBlocks"].andClones())
      ) {
        this.direction += 180;
      }
      this.stage.vars.goombadir.splice(
        this.vars.goombano - 1,
        1,
        this.direction
      );
    }
    this.stage.vars.goombax.splice(
      this.vars.goombano - 1,
      1,
      (this.x - this.stage.vars.mapx) / 20
    );
    this.costume = "HitboxTop";
    if (this.touching(this.sprites["Player"].andClones())) {
      if (this.stage.vars.sliding == 1) {
        this.stage.vars.deletegooombano = this.vars.goombano;
        this.costume = 3;
        yield* this.startSound("Stomp");
        yield* this.wait(0);
      } else {
        this.stage.vars.deletegooombano = this.vars.goombano;
        this.broadcast("Bounce");
        this.stage.vars.maintainspin = 1;
        this.costume = 3;
        yield* this.startSound("Stomp");
        yield* this.wait(0);
      }
    } else {
      this.costume = "BigHitbox";
      if (this.touching(this.sprites["Player"].andClones())) {
        if (this.stage.vars.sliding == 1) {
          this.stage.vars.deletegooombano = this.vars.goombano;
          this.costume = 3;
          yield* this.startSound("Stomp");
          yield* this.wait(0);
        } else {
          if (this.stage.vars.allowdamage == 1) {
            this.broadcast("PowerDown");
          }
        }
      }
    }
    this.costume = (Math.floor(this.stage.vars.costumeno / 4) % 2) + 1;
  }

  *whenIReceiveReset() {
    this.stage.vars.goombadir = [];
    this.stage.vars.goombax = [];
    this.stage.vars.goombay = [];
    if (this.stage.vars.level == 1) {
      this.stage.vars.goombadir.push(90);
      this.stage.vars.goombax.push(-5);
      this.stage.vars.goombay.push(11);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(59.5);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(57.5);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(55.5);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(53.5);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(51.5);
      this.stage.vars.goombay.push(9);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(49.5);
      this.stage.vars.goombay.push(10);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(47.5);
      this.stage.vars.goombay.push(11);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(132);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(128);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(124);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(120);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(116);
      this.stage.vars.goombay.push(10);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(112);
      this.stage.vars.goombay.push(11);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(108);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(104);
      this.stage.vars.goombay.push(8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.deletegooombano = 0;
      yield* this.wait(2);
      while (true) {
        this.goto(
          12 * 20 + this.stage.vars.mapx,
          10 * 20 + this.stage.vars.mapy
        );
        if (
          this.x > -229 &&
          this.x < 229 &&
          this.y > -170 && this.y < 170 &&
          Math.hypot(
            this.sprites["Player"].x - this.x,
            this.sprites["Player"].y - this.y
          ) > 30
        ) {
          this.stage.vars.goombadir.push(-90);
          this.stage.vars.goombax.push(12);
          this.stage.vars.goombay.push(10);
        }
        yield* this.wait(4);
        yield;
      }
    }
    if (this.stage.vars.level == 2) {
      this.stage.vars.goombax.push(61.5);
      this.stage.vars.goombay.push(-2);
      this.stage.vars.goombadir.push(90);
      this.stage.vars.goombax.push(124);
      this.stage.vars.goombay.push(-8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(120);
      this.stage.vars.goombay.push(-9);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(116);
      this.stage.vars.goombay.push(-10);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(112);
      this.stage.vars.goombay.push(-10);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(108);
      this.stage.vars.goombay.push(-10);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(122);
      this.stage.vars.goombay.push(-8);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(118);
      this.stage.vars.goombay.push(-9);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(114);
      this.stage.vars.goombay.push(-10);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(110);
      this.stage.vars.goombay.push(-10);
      this.stage.vars.goombadir.push(-90);
      this.stage.vars.goombax.push(106);
      this.stage.vars.goombay.push(-10);
      this.stage.vars.goombadir.push(-90);
    }
  }

  *whenIReceiveMapmoved() {
    this.goto(
      this.stage.vars.goombax[this.vars.goombano - 1] * 20 +
        this.stage.vars.mapx,
      this.stage.vars.goombay[this.vars.goombano - 1] * 20 +
        this.stage.vars.mapy
    );
  }
}
