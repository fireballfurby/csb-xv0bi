/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Stage/costumes/1.png", { x: 480, y: 360 }),
      new Costume("2", "./Stage/costumes/2.png", { x: 480, y: 360 })
    ];

    this.sounds = [
      new Sound("1", "./Stage/sounds/1.wav"),
      new Sound("2", "./Stage/sounds/2.wav"),
      new Sound("Death", "./Stage/sounds/Death.wav"),
      new Sound("Win", "./Stage/sounds/Win.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "BackgroundUpdate" },
        this.whenIReceiveBackgroundupdate
      ),
      new Trigger(Trigger.BROADCAST, { name: "Death" }, this.whenIReceiveDeath),
      new Trigger(Trigger.BROADCAST, { name: "Win" }, this.whenIReceiveWin),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.mapx = -3355.999877930619;
    this.vars.mapy = -210;
    this.vars.playerx = 3355.999877930619;
    this.vars.playery = 163.3548387096775;
    this.vars.gravity = -3;
    this.vars.xvel = 0;
    this.vars.yvel = 0;
    this.vars.crouching = 0;
    this.vars.costumeno = 836657.6686075996;
    this.vars.powerup = "None";
    this.vars.sliding = 0;
    this.vars.pipetravel = 0;
    this.vars.allowplayermovement = 0;
    this.vars.mapydestination = -210;
    this.vars.playerydestination = -20;
    this.vars.pipeexittype = "Up";
    this.vars.dead = 0;
    this.vars.deleteblockno = 0;
    this.vars.itemspawnx = -7.5;
    this.vars.itemspawny = 14;
    this.vars.poweruptype = "None";
    this.vars.deleteitemno = 0;
    this.vars.previouspowerup = 0;
    this.vars.deletegooombano = 0;
    this.vars.allowdamage = 1;
    this.vars.mapxautomovespeed = 0;
    this.vars.mapyautomovespeed = 0;
    this.vars.mapxrightboundary = -3360;
    this.vars.beginautoxscroll = 0;
    this.vars.setmapxboundary = -3360;
    this.vars.pause = 0;
    this.vars.deletecoinno = 0;
    this.vars.goalx = 3165;
    this.vars.goaly = 238;
    this.vars.won = 1;
    this.vars.level = 2;
    this.vars.spinning = 0;
    this.vars.passingthroughspinners = 0;
    this.vars.deletespinningblockno = 0;
    this.vars.maintainspin = 0;
    this.vars.passingthroughplatform = 0;
    this.vars.itemx = [];
    this.vars.itemy = [];
    this.vars.itemdir = [];
    this.vars.goombax = [
      63.85,
      122.65,
      118.8,
      115,
      111,
      107,
      120.65,
      116.8,
      113,
      109,
      105
    ];
    this.vars.goombay = [
      -16.1,
      -16.1,
      -16.2,
      -16,
      -16,
      -16,
      -16.1,
      -16.2,
      -16,
      -16,
      -16
    ];
    this.vars.goombadir = [
      90,
      -90,
      -90,
      -90,
      -90,
      -90,
      -90,
      -90,
      -90,
      -90,
      -90
    ];
    this.vars.platformx = [
      37.5,
      49.5,
      63.5,
      66,
      68.5,
      81.5,
      119.5,
      124.5,
      129.5
    ];
    this.vars.platformy = [-16.7, -16.7, -3, -3, -3, -16.7, -16, -16, -16];
    this.vars.activatedplatforms = [97, 83, 0, 0, 0, 77, 0, 0, 0];
    this.vars.originalplatformy = [-13, -13, -3, -3, -3, -13, -16, -16, -16];
    this.vars.spinx = [
      -2.5,
      -1.5,
      -0.5,
      7,
      24.5,
      25.5,
      26.5,
      27.5,
      34.5,
      35.5,
      36.5,
      37.5,
      38.5,
      39.5,
      40.5,
      45.5,
      47.5,
      49.5,
      51.5,
      53.5,
      108.5,
      109.5,
      105.5,
      109.5,
      113.5,
      117.5,
      135.5,
      136.5
    ];
    this.vars.spiny = [
      -9,
      -9,
      -9,
      -9,
      -3,
      -3,
      -3,
      -3,
      -3,
      -3,
      -3,
      -3,
      -3,
      -3,
      -3,
      -8,
      -8,
      -8,
      -8,
      -8,
      -11,
      -11,
      -6,
      -5,
      -5,
      -6,
      -12,
      -12
    ];
    this.vars.spinstate = [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    this.vars.thwompx = [
      8,
      12,
      16,
      20,
      26,
      36,
      39,
      81.5,
      132.5,
      132.5,
      143,
      146
    ];
    this.vars.thwompy = [
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5,
      -16.5
    ];
    this.vars.thwompstate = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    this.vars.thwompyvelocity = [
      -24,
      -24,
      -24,
      -24,
      -21,
      -21,
      -21,
      -23,
      -24,
      -24,
      -24,
      -24
    ];
  }

  *whenIReceiveBackgroundupdate() {
    this.audioEffects.volume = 80;
    this.stopAllSounds();
    if (Math.round(this.vars.mapy) == -210) {
      this.costume = 1;
    }
    if (Math.round(this.vars.mapy) == 150) {
      this.costume = 2;
    }
    if (Math.round(this.vars.pause) == 1) {
      this.costume = 1;
      yield* this.startSound("Main");
    } else {
      yield* this.startSound(this.costumeNumber);
    }
  }

  *whenIReceiveDeath() {
    this.stopAllSounds();
    this.audioEffects.volume = 100;
    yield* this.startSound("Death");
  }

  *whenIReceiveWin() {
    this.stopAllSounds();
    this.audioEffects.volume = 100;
    yield* this.startSound("Win");
    yield* this.wait(7.3);
    this.vars.won = 1;
    yield* this.wait(1);
    if (this.vars.level == 1) {
      this.vars.level = 2;
      this.broadcast("ResetForLevels");
      yield* this.wait(0.9);
      this.broadcast("Reset");
    }
  }

  *whenGreenFlagClicked() {
    this.costume = 1;
  }
}
