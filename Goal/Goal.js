/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Goal extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Bar", "./Goal/costumes/Bar.png", { x: 12, y: 4 })
    ];

    this.sounds = [new Sound("pop", "./Goal/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "FinishedMovement" },
        this.whenIReceiveFinishedmovement
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset)
    ];

    this.vars.goaldirection = "Up";
    this.vars.stop = 1;
  }

  *whenIReceiveFinishedmovement() {
    this.goto(
      this.stage.vars.goalx + this.stage.vars.mapx,
      this.stage.vars.goaly + this.stage.vars.mapy
    );
    if (this.vars.stop == 0) {
      if (this.vars.goaldirection == "Up") {
        this.stage.vars.goaly += 1;
      } else {
        this.stage.vars.goaly += -1;
      }
      if (this.stage.vars.goaly < 155) {
        this.vars.goaldirection = "Up";
      }
      if (this.stage.vars.goaly > 315) {
        this.vars.goaldirection = "Down";
      }
      if (this.x > -250 && this.x < 250 && this.y > -180 && this.y < 180) {
        this.visible = true;
        if (this.touching(this.sprites["Player"].andClones())) {
          this.vars.stop = 1;
          this.broadcast("Win");
        }
      } else {
        this.visible = false;
      }
    }
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *whenIReceiveReset() {
    /* TODO: Implement looks_gotofrontback */ null;
    this.size = 250;
    this.visible = true;
    this.stage.vars.goalx = 3165;
    this.stage.vars.goaly = 315;
    this.vars.goaldirection = "Up";
    this.vars.stop = 0;
  }
}
