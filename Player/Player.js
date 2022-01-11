/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("0None", "./Player/costumes/0None.png", { x: 12, y: 20 }),
      new Costume("1None", "./Player/costumes/1None.png", { x: 12, y: 8 }),
      new Costume("0Big", "./Player/costumes/0Big.png", { x: 12, y: 36 }),
      new Costume("1Big", "./Player/costumes/1Big.png", { x: 12, y: 8 }),
      new Costume("Idle1None", "./Player/costumes/Idle1None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Idle1Big", "./Player/costumes/Idle1Big.png", {
        x: 16,
        y: 36
      }),
      new Costume("Run1None", "./Player/costumes/Run1None.png", {
        x: 14,
        y: 22
      }),
      new Costume("Run1Big", "./Player/costumes/Run1Big.png", { x: 16, y: 38 }),
      new Costume("Run2None", "./Player/costumes/Run2None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Run2Big", "./Player/costumes/Run2Big.png", { x: 16, y: 34 }),
      new Costume("Run3Big", "./Player/costumes/Run3Big.png", { x: 16, y: 36 }),
      new Costume("Jump1None", "./Player/costumes/Jump1None.png", {
        x: 14,
        y: 26
      }),
      new Costume("Jump1Big", "./Player/costumes/Jump1Big.png", {
        x: 16,
        y: 42
      }),
      new Costume("Fall1None", "./Player/costumes/Fall1None.png", {
        x: 16,
        y: 20
      }),
      new Costume("Fall1Big", "./Player/costumes/Fall1Big.png", {
        x: 14,
        y: 37
      }),
      new Costume("Crouch1None", "./Player/costumes/Crouch1None.png", {
        x: 15,
        y: 8
      }),
      new Costume("Crouch1Big", "./Player/costumes/Crouch1Big.png", {
        x: 16,
        y: 10
      }),
      new Costume("Dead1None", "./Player/costumes/Dead1None.png", {
        x: 0,
        y: 0
      }),
      new Costume("Dead1Big", "./Player/costumes/Dead1Big.png", {
        x: 26,
        y: 28
      }),
      new Costume("Slide1None", "./Player/costumes/Slide1None.png", {
        x: 14,
        y: 18
      }),
      new Costume("Slide1Big", "./Player/costumes/Slide1Big.png", {
        x: 16,
        y: 30
      }),
      new Costume("Pipe1None", "./Player/costumes/Pipe1None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Pipe1Big", "./Player/costumes/Pipe1Big.png", {
        x: 16,
        y: 36
      }),
      new Costume("Won1None", "./Player/costumes/Won1None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Won1Big", "./Player/costumes/Won1Big.png", { x: 16, y: 36 }),
      new Costume("Spin1None", "./Player/costumes/Spin1None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Spin1Big", "./Player/costumes/Spin1Big.png", {
        x: 16,
        y: 36
      }),
      new Costume("Spin2None", "./Player/costumes/Spin2None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Spin2Big", "./Player/costumes/Spin2Big.png", {
        x: 16,
        y: 36
      }),
      new Costume("Spin3None", "./Player/costumes/Spin3None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Spin3Big", "./Player/costumes/Spin3Big.png", {
        x: 14,
        y: 36
      }),
      new Costume("Spin4None", "./Player/costumes/Spin4None.png", {
        x: 14,
        y: 20
      }),
      new Costume("Spin4Big", "./Player/costumes/Spin4Big.png", {
        x: 16,
        y: 36
      }),
      new Costume("mario-2", "./Player/costumes/mario-2.png", {
        x: 473,
        y: 245
      })
    ];

    this.sounds = [
      new Sound("Jump", "./Player/sounds/Jump.wav"),
      new Sound("PowerUp", "./Player/sounds/PowerUp.mp3"),
      new Sound("Pipe/Damage", "./Player/sounds/Pipe/Damage.mp3"),
      new Sound("ExtraPowerup", "./Player/sounds/ExtraPowerup.mp3"),
      new Sound("Spin", "./Player/sounds/Spin.mp3")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "HideGame" },
        this.whenIReceiveHidegame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShowGame" },
        this.whenIReceiveShowgame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "SendPlayerUp" },
        this.whenIReceiveSendplayerup
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ResetForLevels" },
        this.whenIReceiveResetforlevels
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ThwompsMoved" },
        this.whenIReceiveThwompsmoved
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "GoombasLoaded" },
        this.whenIReceiveGoombasloaded
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PipeTravel" },
        this.whenIReceivePipetravel
      ),
      new Trigger(Trigger.BROADCAST, { name: "Death" }, this.whenIReceiveDeath),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Powerup" },
        this.whenIReceivePowerup
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "PowerDown" },
        this.whenIReceivePowerdown
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Bounce" },
        this.whenIReceiveBounce
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.BROADCAST, { name: "Win" }, this.whenIReceiveWin)
    ];

    this.vars.checkpos = -2;
    this.vars.timesincedeath = 40;
  }

  *whenIReceiveHidegame() {
    this.visible = false;
  }

  *whenIReceiveShowgame() {
    this.visible = true;
  }

  *whenIReceiveSendplayerup() {
    while (!!this.touching(this.sprites["SpinningBlocks"].andClones())) {
      this.y += 1;
      yield;
    }
  }

  *whenIReceiveResetforlevels() {
    this.stage.vars.gravity = -3;
    this.stage.vars.xvel = 0;
    this.stage.vars.yvel = 0;
    this.stage.vars.playerx = -480;
    this.stage.vars.playery = 200;
    this.stage.vars.mapx = 360;
    this.stage.vars.mapy = -210;
    this.stage.vars.powerup = "None";
    this.stage.vars.poweruptype = "None";
    this.stage.vars.previouspowerup = 0;
    this.stage.vars.allowplayermovement = 1;
    this.stage.vars.dead = 0;
    this.stage.vars.pipetravel = 0;
    this.stage.vars.allowdamage = 1;
    this.stage.vars.beginautoxscroll = 0;
    this.stage.vars.mapyautomovespeed = 0;
    this.stage.vars.mapxrightboundary = -3360;
    this.stage.vars.mapxautomovespeed = 0;
    this.stage.vars.won = 0;
    this.stage.vars.maintainspin = 0;
  }

  *whenIReceiveThwompsmoved() {
    if (this.stage.vars.allowplayermovement == 1) {
      this.stage.vars.crouching = 0;
      this.stage.vars.sliding = 0;
      if (
        this.stage.vars.yvel == 0 &&
        (this.keyPressed("s") ||
          this.keyPressed("down arrow") ||
            (this.mouse.down && this.mouse.y < this.y - 50))
      ) {
        this.stage.vars.crouching = 1;
      }
    }
    this.costume = "" + this.stage.vars.crouching + this.stage.vars.poweruptype;
    this.x = this.stage.vars.playerx + this.stage.vars.mapx;
    if (this.stage.vars.allowplayermovement == 1) {
      this.y = this.stage.vars.playery + this.stage.vars.mapy;
      this.stage.vars.yvel += this.stage.vars.gravity / 3.1;
      this.y += this.stage.vars.gravity;
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
          this.stage.vars.passingthroughspinners == 0) ||
          (this.touching(this.sprites["Platforms"].andClones()) &&
            this.stage.vars.passingthroughplatform == 0) ||
            this.touching(this.sprites["Thwomps"].andClones())
      ) {
        this.y += this.stage.vars.gravity * -1;
        yield* this.findfloor();
        if (this.stage.vars.maintainspin == 0) {
          this.stage.vars.yvel = 0;
          this.stage.vars.spinning = 0;
        }
        if (
          this.keyPressed("w") ||
          this.keyPressed("space") ||
          this.keyPressed("up arrow") ||
            (this.mouse.down && this.mouse.y > this.y + 50)
        ) {
          if (this.keyPressed("space")) {
            this.stage.vars.yvel = 13.5;
            this.stage.vars.xvel += this.stage.vars.xvel / 1.5;
            this.stage.vars.spinning = 1;
            yield* this.startSound("Spin");
          } else {
            this.stage.vars.yvel = 16;
            yield* this.startSound("Jump");
          }
        }
      }
      this.y += this.stage.vars.yvel;
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
          this.stage.vars.passingthroughspinners == 0) ||
          (this.touching(this.sprites["Platforms"].andClones()) &&
            this.stage.vars.passingthroughplatform == 0) ||
            this.touching(this.sprites["Thwomps"].andClones())
      ) {
        this.y += this.stage.vars.yvel * -1;
        if (
          this.stage.vars.crouching == 0 &&
          (this.keyPressed("s") ||
            this.keyPressed("down arrow") ||
              (this.mouse.down && this.mouse.y < this.y - 50))
        ) {
          this.stage.vars.crouching = 1;
        }
        if (this.stage.vars.yvel > 0) {
          yield* this.findceiling();
          this.y += 1;
          if (
            !(
              this.touching(this.sprites["SpinningBlocks"].andClones()) ||
              this.touching(this.sprites["Platforms"].andClones())
            )
          ) {
            this.stage.vars.yvel = 0;
          }
          this.y += -1;
        } else {
          yield* this.findfloor();
          this.y += 1;
          if (
            !(
              this.touching(this.sprites["SpinningBlocks"].andClones()) ||
              this.touching(this.sprites["Platforms"].andClones())
            )
          ) {
            if (this.stage.vars.maintainspin == 0) {
              this.stage.vars.spinning = 0;
              this.stage.vars.yvel = 0;
            }
          }
          this.y += -1;
        }
      }
      if (this.stage.vars.crouching == 0) {
        if (
          this.keyPressed("a") ||
          this.keyPressed("left arrow") ||
            (this.mouse.down && this.mouse.x < this.x - 25)
        ) {
          this.stage.vars.xvel += this.stage.vars.gravity / 1.5;
          this.direction = -90;
        }
        if (
          this.keyPressed("d") ||
          this.keyPressed("right arrow") ||
            (this.mouse.down && this.mouse.x > this.x + 25)
        ) {
          this.stage.vars.xvel += this.stage.vars.gravity / -1.5;
          this.direction = 90;
        }
      }
      if (Math.abs(this.stage.vars.xvel) > 5) {
        if (this.stage.vars.xvel > 0) {
          this.stage.vars.xvel = 5;
        } else {
          this.stage.vars.xvel = -5;
        }
      }
      this.x += this.stage.vars.xvel;
      this.stage.vars.playerx = this.x - this.stage.vars.mapx;
      yield* this.findysmooth();
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
          this.stage.vars.passingthroughspinners == 0) ||
          (this.touching(this.sprites["Platforms"].andClones()) &&
            this.stage.vars.passingthroughplatform == 0)
      ) {
        yield* this.findnearestx();
        this.stage.vars.xvel = 0;
      }
      if (this.stage.vars.crouching == 1) {
        if (Math.abs(this.stage.vars.gravity * (-2 / 5.7)) < 1.02) {
          this.stage.vars.xvel = this.stage.vars.xvel / 1.02;
        } else {
          this.stage.vars.xvel =
            this.stage.vars.xvel / (this.stage.vars.gravity * (-2 / 5.7));
        }
      } else {
        if (Math.abs(this.stage.vars.gravity * (-2 / 3)) < 1.02) {
          this.stage.vars.xvel = this.stage.vars.xvel / 1.02;
        } else {
          this.stage.vars.xvel =
            this.stage.vars.xvel / (this.stage.vars.gravity * (-2 / 3));
        }
      }
      if (this.y < -178) {
        this.broadcast("Death");
      }
      this.stage.vars.playerx = this.x - this.stage.vars.mapx;
      this.stage.vars.playery = this.y - this.stage.vars.mapy;
      this.y += -1;
    }
    this.broadcast("FinishedMovement");
  }

  *whenGreenFlagClicked() {
    this.size = 125;
    this.direction = 90;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.stage.vars.pause = 0;
    this.broadcast("ResetForLevels");
    yield* this.wait(0.8);
    this.broadcast("Reset");
  }

  *findfloor() {
    while (
      !(
        this.touching(this.sprites["Level"].andClones()) ||
        (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
          this.stage.vars.passingthroughspinners == 0) ||
          (this.touching(this.sprites["Platforms"].andClones()) &&
            this.stage.vars.passingthroughplatform == 0) ||
            this.touching(this.sprites["Thwomps"].andClones())
      )
    ) {
      this.y += -1;
    }
    this.y += 1;
    if (this.stage.vars.crouching == 1) {
      this.y += -2;
      if (this.touching(this.sprites["Platforms"].andClones())) {
        this.y += 2;
        this.stage.vars.xvel +=
          (this.y + 2 - (this.stage.vars.playery + this.stage.vars.mapy)) /
          ((Math.abs(this.stage.vars.xvel) / this.stage.vars.xvel) * -5);
      } else {
        this.y += 2;
        this.stage.vars.xvel +=
          (this.y - (this.stage.vars.playery + this.stage.vars.mapy)) /
          ((Math.abs(this.stage.vars.xvel) / this.stage.vars.xvel) * -5);
      }
      if (Math.abs(this.stage.vars.xvel) > 2) {
        this.stage.vars.sliding = 1;
      }
    }
  }

  *findceiling() {
    while (
      !(
        this.touching(this.sprites["Level"].andClones()) ||
        (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
          this.stage.vars.passingthroughspinners == 0) ||
          (this.touching(this.sprites["Platforms"].andClones()) &&
            this.stage.vars.passingthroughplatform == 0) ||
            this.touching(this.sprites["Thwomps"].andClones())
      )
    ) {
      this.y += 1;
    }
    this.y += -1;
  }

  *findnearestx() {
    if (this.stage.vars.passingthroughspinners == 0) {
      this.vars.checkpos = 0;
      while (
        !!(
          this.touching(this.sprites["Level"].andClones()) ||
          (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
            this.stage.vars.passingthroughspinners == 0) ||
            (this.touching(this.sprites["Platforms"].andClones()) &&
              this.stage.vars.passingthroughplatform == 0)
        )
      ) {
        this.x = this.stage.vars.playerx + this.stage.vars.mapx;
        if (this.vars.checkpos > 0) {
          this.vars.checkpos += 0.5;
        } else {
          this.vars.checkpos += -0.5;
        }
        this.vars.checkpos = this.vars.checkpos * -1;
        this.x += this.vars.checkpos;
      }
    }
  }

  *findysmooth() {
    for (let i = 0; i < 6; i++) {
      if (
        this.touching(this.sprites["Level"].andClones()) ||
        (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
          this.stage.vars.passingthroughspinners == 0) ||
          (this.touching(this.sprites["Platforms"].andClones()) &&
            this.stage.vars.passingthroughplatform == 0) ||
            this.touching(this.sprites["Thwomps"].andClones())
      ) {
        this.y += 1;
      }
    }
    if (
      this.touching(this.sprites["Level"].andClones()) ||
      (this.touching(this.sprites["SpinningBlocks"].andClones()) &&
        this.stage.vars.passingthroughspinners == 0) ||
        (this.touching(this.sprites["Platforms"].andClones()) &&
          this.stage.vars.passingthroughplatform == 0) ||
          this.touching(this.sprites["Thwomps"].andClones())
    ) {
      this.y += -6;
    }
  }

  *whenIReceiveGoombasloaded() {
    this.stage.vars.maintainspin = 0;
    this.stage.vars.costumeno += 0.3334;
    if (this.stage.vars.won == 1) {
      this.costume =
        "" +
        "Won" +
        ("" +
          (Math.floor(this.stage.vars.costumeno % 1) + 1) +
          this.stage.vars.powerup);
    } else {
      if (this.stage.vars.dead == 1) {
        this.costume =
          "" +
          "Dead" +
          ("" +
            (Math.floor(this.stage.vars.costumeno % 1) + 1) +
            this.stage.vars.powerup);
      } else {
        if (this.stage.vars.pipetravel == 1) {
          this.costume =
            "" +
            "Pipe" +
            ("" +
              (Math.floor(this.stage.vars.costumeno % 1) + 1) +
              this.stage.vars.powerup);
        } else {
          if (this.stage.vars.spinning == 1) {
            this.costume =
              "" +
              "Spin" +
              ("" +
                (Math.floor((this.stage.vars.costumeno * 1.8) % 4) + 1) +
                this.stage.vars.powerup);
          } else {
            if (this.stage.vars.sliding == 1) {
              this.costume =
                "" +
                "Slide" +
                ("" +
                  (Math.floor(this.stage.vars.costumeno % 1) + 1) +
                  this.stage.vars.powerup);
              this.y += -2;
            } else {
              if (this.stage.vars.crouching == 1) {
                this.costume =
                  "" +
                  "Crouch" +
                  ("" +
                    (Math.floor(this.stage.vars.costumeno % 1) + 1) +
                    this.stage.vars.powerup);
              } else {
                if (!(this.stage.vars.yvel == 0)) {
                  if (this.stage.vars.yvel > 3) {
                    this.costume =
                      "" +
                      "Jump" +
                      ("" +
                        (Math.floor(this.stage.vars.costumeno % 1) + 1) +
                        this.stage.vars.powerup);
                  } else {
                    this.costume =
                      "" +
                      "Fall" +
                      ("" +
                        (Math.floor(this.stage.vars.costumeno % 1) + 1) +
                        this.stage.vars.powerup);
                  }
                } else {
                  if (Math.abs(this.stage.vars.xvel) > 0.2) {
                    if (this.stage.vars.powerup == "None") {
                      this.costume =
                        "" +
                        "Run" +
                        ("" +
                          (Math.floor(this.stage.vars.costumeno % 2) + 1) +
                          this.stage.vars.powerup);
                    } else {
                      this.costume =
                        "" +
                        "Run" +
                        ("" +
                          (Math.floor(this.stage.vars.costumeno % 3) + 1) +
                          this.stage.vars.powerup);
                    }
                  } else {
                    this.costume =
                      "" +
                      "Idle" +
                      ("" +
                        (Math.floor(this.stage.vars.costumeno % 1) + 1) +
                        this.stage.vars.powerup);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  *whenIReceivePipetravel() {
    /* TODO: Implement looks_gotofrontback */ null;
    yield* this.startSound("Pipe/Damage");
    this.stage.vars.crouching = 0;
    this.stage.vars.sliding = 0;
    this.stage.vars.xvel = 0;
    this.stage.vars.yvel = 0;
    this.stage.vars.allowplayermovement = 0;
    for (let i = 0; i < 30; i++) {
      this.y += -1;
      yield;
    }
    this.stage.vars.mapy = this.stage.vars.mapydestination;
    this.broadcast("BackgroundUpdate");
    this.y = this.stage.vars.playerydestination;
    this.stage.vars.playerx = this.x - this.stage.vars.mapx;
    this.stage.vars.mapx = this.stage.vars.playerx * -1;
    yield* this.wait(0);
    if (this.stage.vars.beginautoxscroll == 0) {
      this.stage.vars.mapxautomovespeed = this.stage.vars.beginautoxscroll;
    }
    if (this.stage.vars.setmapxboundary == 0) {
      this.stage.vars.mapxrightboundary = this.stage.vars.setmapxboundary;
    }
    this.stage.vars.playerx = this.x - this.stage.vars.mapx;
    this.stage.vars.mapx = this.stage.vars.playerx * -1;
    if (this.stage.vars.pipeexittype == "Down") {
      while (!!this.touching(this.sprites["Level"].andClones())) {
        this.y += -1;
        yield;
      }
    } else {
      while (!!this.touching(this.sprites["Level"].andClones())) {
        this.y += 1;
        yield;
      }
    }
    this.stage.vars.mapxautomovespeed = this.stage.vars.beginautoxscroll;
    this.stage.vars.mapxrightboundary = this.stage.vars.setmapxboundary;
    this.stage.vars.playerx = this.x - this.stage.vars.mapx;
    this.stage.vars.playery = this.y - this.stage.vars.mapy;
    this.stage.vars.allowplayermovement = 1;
    this.stage.vars.pipetravel = 0;
  }

  *whenIReceiveDeath() {
    /* TODO: Implement looks_gotofrontback */ null;
    this.stage.vars.dead = 1;
    this.stage.vars.xvel = 0;
    this.stage.vars.yvel = 0;
    this.stage.vars.allowplayermovement = 0;
    if (!(this.y < -178)) {
      this.vars.timesincedeath = 0;
      for (let i = 0; i < 80; i++) {
        this.vars.timesincedeath += 0.5;
        this.y += 9 - this.vars.timesincedeath;
        this.direction += 45;
        if (this.y < -178) {
          this.visible = false;
        }
        yield;
      }
      this.direction = 90;
    } else {
      this.visible = false;
      yield* this.wait(2.667);
    }
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = true;
    this.broadcast("ResetForLevels");
    yield* this.wait(0.9);
    this.broadcast("Reset");
  }

  *whenIReceivePowerup() {
    if (this.stage.vars.dead == 0) {
      if (!(this.stage.vars.poweruptype == this.stage.vars.powerup)) {
        yield* this.startSound("PowerUp");
        this.stage.vars.previouspowerup = this.stage.vars.powerup;
        this.stage.vars.powerup = this.stage.vars.poweruptype;
        yield* this.wait(0.1);
        this.effects.ghost = 100;
        yield* this.wait(0.1);
        this.effects.ghost = 0;
        this.stage.vars.powerup = this.stage.vars.previouspowerup;
        yield* this.wait(0.1);
        this.stage.vars.powerup = this.stage.vars.poweruptype;
        yield* this.wait(0.1);
        this.effects.ghost = 100;
        yield* this.wait(0.1);
        this.effects.ghost = 0;
        this.stage.vars.powerup = this.stage.vars.previouspowerup;
        yield* this.wait(0.1);
        this.stage.vars.powerup = this.stage.vars.poweruptype;
      } else {
        yield* this.startSound("ExtraPowerup");
        yield* this.wait(0.1);
        this.effects.ghost = 100;
        yield* this.wait(0.1);
        this.effects.ghost = 0;
        yield* this.wait(0.1);
        this.effects.ghost = 100;
        yield* this.wait(0.1);
        this.effects.ghost = 0;
      }
    }
  }

  *whenIReceivePowerdown() {
    if (this.stage.vars.dead == 0) {
      if (this.stage.vars.powerup == "None") {
        this.broadcast("Death");
      } else {
        yield* this.startSound("Pipe/Damage");
        this.stage.vars.allowdamage = 0;
        this.stage.vars.powerup = this.stage.vars.poweruptype;
        yield* this.wait(0.1);
        this.effects.ghost = 100;
        yield* this.wait(0.1);
        this.effects.ghost = 0;
        this.stage.vars.powerup = this.stage.vars.poweruptype;
        yield* this.wait(0.1);
        this.stage.vars.powerup = this.stage.vars.previouspowerup;
        yield* this.wait(0.1);
        this.effects.ghost = 100;
        yield* this.wait(0.1);
        this.effects.ghost = 0;
        this.stage.vars.powerup = this.stage.vars.poweruptype;
        yield* this.wait(0.1);
        this.stage.vars.powerup = this.stage.vars.previouspowerup;
        this.stage.vars.poweruptype = this.stage.vars.powerup;
        this.stage.vars.allowdamage = 1;
      }
    }
  }

  *whenIReceiveBounce() {
    if (
      this.keyPressed("w") ||
      this.keyPressed("space") ||
      this.keyPressed("up arrow") ||
        (this.mouse.down && this.mouse.y > this.y + 25)
    ) {
      if (this.stage.vars.spinning == 1) {
        yield* this.startSound("Spin");
      }
      this.stage.vars.yvel = 16;
    } else {
      this.stage.vars.yvel = 10;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.gravity = -3;
    this.stage.vars.xvel = 0;
    this.stage.vars.yvel = 0;
    this.stage.vars.playerx = -480;
    this.stage.vars.playery = 200;
    this.stage.vars.mapx = 360;
    this.stage.vars.mapy = -210;
    this.stage.vars.powerup = "None";
    this.stage.vars.poweruptype = "None";
    this.stage.vars.previouspowerup = 0;
    this.stage.vars.allowplayermovement = 1;
    this.stage.vars.dead = 0;
    this.stage.vars.pipetravel = 0;
    this.stage.vars.allowdamage = 1;
    this.stage.vars.beginautoxscroll = 0;
    this.stage.vars.mapyautomovespeed = 0;
    this.stage.vars.mapxrightboundary = -3360;
    this.stage.vars.mapxautomovespeed = 0;
    this.stage.vars.won = 0;
    this.stage.vars.maintainspin = 0;
    this.broadcast("BackgroundUpdate");
  }

  *whenIReceiveWin() {
    while (!(this.stage.vars.yvel == 0)) {
      yield;
    }
    this.y += -1;
    this.stage.vars.allowplayermovement = 0;
    this.stage.vars.xvel = 1;
    for (let i = 0; i < 180; i++) {
      if (this.stage.vars.playerx < this.stage.vars.goalx + 190) {
        this.stage.vars.playerx += 2;
        this.x += 2;
      } else {
        this.stage.vars.xvel = 0;
      }
      yield;
    }
    this.stage.vars.xvel = 0;
    this.stage.vars.beginautoxscroll = 0;
    this.stage.vars.mapyautomovespeed = 0;
    this.stage.vars.mapxrightboundary = -3360;
    this.stage.vars.mapxautomovespeed = 0;
  }
}
