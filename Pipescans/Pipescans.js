/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Pipescans extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Pipescans/costumes/costume1.png", {
        x: 5,
        y: 2
      })
    ];

    this.sounds = [new Sound("pop", "./Pipescans/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinishedMovement" },
        this.whenIReceiveFinishedmovement
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShowGame" },
        this.whenIReceiveShowgame
      )
    ];

    this.vars.scanno = 3;
    this.vars.pipex = [-16, 149];
    this.vars.pipey = [9.5, -8.5];
    this.vars.mapydestination2 = [150, -210];
    this.vars.playerydestination2 = [80, -20];
    this.vars.exittype = ["Down", "Up"];
    this.vars.pipeautoscroll = [0, 0];
    this.vars.pipexboundary = [-3360, -3360];
  }

  *whenGreenFlagClicked() {
    this.effects.ghost = 100;
    this.size = 250;
  }

  *whenIReceiveFinishedmovement() {
    if (this.stage.vars.pipetravel == 0) {
      yield* this.scanpipes();
    }
  }

  *scanpipes() {
    this.vars.scanno = 1;
    for (let i = 0; i < this.vars.pipex.length; i++) {
      this.goto(
        this.vars.pipex[this.vars.scanno - 1] * 20 + this.stage.vars.mapx,
        this.vars.pipey[this.vars.scanno - 1] * 20 + this.stage.vars.mapy
      );
      if (
        this.keyPressed("s") ||
        this.keyPressed("down arrow") ||
          (this.mouse.down && this.mouse.y < this.y - 50)
      ) {
        if (this.touching(this.sprites["Player"].andClones())) {
          this.stage.vars.pipeexittype = this.vars.exittype[
            this.vars.scanno - 1
          ];
          this.vars.playerydestination2 = this.vars.playerydestination2[
            this.vars.scanno - 1
          ];
          this.vars.mapydestination2 = this.vars.mapydestination2[
            this.vars.scanno - 1
          ];
          this.stage.vars.pipetravel = 1;
          this.stage.vars.playerx = this.vars.pipex[this.vars.scanno - 1] * 20;
          this.broadcast("PipeTravel");
          this.stage.vars.beginautoxscroll = this.vars.pipeautoscroll[
            this.vars.scanno - 1
          ];
          this.stage.vars.setmapxboundary = this.vars.pipexboundary[
            this.vars.scanno - 1
          ];
        }
      }
      this.vars.scanno += 1;
    }
  }

  *whenIReceiveReset() {
    while (true) {
      this.vars.pipex = [];
      this.vars.pipey = [];
      this.vars.mapydestination2 = [];
      this.vars.playerydestination2 = [];
      this.vars.exittype = [];
      this.vars.pipexboundary = [];
      this.vars.pipeautoscroll = [];
      if (this.stage.vars.level == 1) {
        this.vars.pipex.push(-8);
        this.vars.pipey.push(12.5);
        this.vars.mapydestination2.push(150);
        this.vars.playerydestination2.push(80);
        this.vars.exittype.push("Down");
        this.vars.pipeautoscroll.push(0);
        this.vars.pipexboundary.push(-3360);
        this.vars.pipex.push(12);
        this.vars.pipey.push(-11.5);
        this.vars.mapydestination2.push(-210);
        this.vars.playerydestination2.push(-20);
        this.vars.exittype.push("Up");
        this.vars.pipeautoscroll.push(0);
        this.vars.pipexboundary.push(-3360);
        this.vars.pipex.push(97);
        this.vars.pipey.push(9.5);
        this.vars.mapydestination2.push(150);
        this.vars.playerydestination2.push(100);
        this.vars.exittype.push("Down");
        this.vars.pipeautoscroll.push(-1);
        this.vars.pipexboundary.push(-2760);
        this.vars.pipex.push(135);
        this.vars.pipey.push(-11.5);
        this.vars.mapydestination2.push(-210);
        this.vars.playerydestination2.push(-20);
        this.vars.exittype.push("Up");
        this.vars.pipeautoscroll.push(0);
        this.vars.pipexboundary.push(-3360);
      }
      if (this.stage.vars.level == 2) {
        this.vars.pipex.push(-16);
        this.vars.pipey.push(9.5);
        this.vars.mapydestination2.push(150);
        this.vars.playerydestination2.push(80);
        this.vars.exittype.push("Down");
        this.vars.pipeautoscroll.push(0);
        this.vars.pipexboundary.push(-3360);
        this.vars.pipex.push(149);
        this.vars.pipey.push(-8.5);
        this.vars.mapydestination2.push(-210);
        this.vars.playerydestination2.push(-20);
        this.vars.exittype.push("Up");
        this.vars.pipeautoscroll.push(0);
        this.vars.pipexboundary.push(-3360);
      }
      yield;
    }
  }

  *whenIReceiveShowgame() {
    this.visible = true;
  }
}
