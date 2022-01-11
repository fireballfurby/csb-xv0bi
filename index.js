import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Level from "./Level/Level.js";
import Pipescans from "./Pipescans/Pipescans.js";
import Goombas from "./Goombas/Goombas.js";
import Platforms from "./Platforms/Platforms.js";
import Background from "./Background/Background.js";
import Goal from "./Goal/Goal.js";
import Levelbackgrounds from "./Levelbackgrounds/Levelbackgrounds.js";
import Wipe from "./Wipe/Wipe.js";
import SpinningBlocks from "./SpinningBlocks/SpinningBlocks.js";
import Thumbnail from "./Thumbnail/Thumbnail.js";
import Levels from "./Levels/Levels.js";
import Thwomps from "./Thwomps/Thwomps.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: 0,
    y: -48.645161290322505,
    direction: 90,
    costumeNumber: 24,
    size: 125,
    visible: true
  }),
  Level: new Level({
    x: -825,
    y: -210,
    direction: 90,
    costumeNumber: 5,
    size: 250,
    visible: false
  }),
  Pipescans: new Pipescans({
    x: -245,
    y: -181,
    direction: 90,
    costumeNumber: 1,
    size: 250,
    visible: true
  }),
  Goombas: new Goombas({
    x: -378,
    y: -280,
    direction: -90,
    costumeNumber: 6,
    size: 125,
    visible: false
  }),
  Platforms: new Platforms({
    x: -284,
    y: -184,
    direction: 90,
    costumeNumber: 1,
    size: 250,
    visible: false
  }),
  Background: new Background({
    x: 288.80002441387614,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Goal: new Goal({
    x: -190.99987793061882,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 250,
    visible: true
  }),
  Levelbackgrounds: new Levelbackgrounds({
    x: -825,
    y: -210,
    direction: 90,
    costumeNumber: 6,
    size: 250,
    visible: false
  }),
  Wipe: new Wipe({
    x: -0.000034764885920394913,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  SpinningBlocks: new SpinningBlocks({
    x: -240,
    y: -180,
    direction: 90,
    costumeNumber: 1,
    size: 250,
    visible: false
  }),
  Thumbnail: new Thumbnail({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Levels: new Levels({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false
  }),
  Thwomps: new Thwomps({
    x: -240,
    y: -180,
    direction: 90,
    costumeNumber: 1,
    size: 125,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
