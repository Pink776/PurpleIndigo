let bossRush,
    moon,
    hunt,
    train,
    logger = new LagLogger();

const initGameModeLoop = function() {
    if (c.SPECIAL_BOSS_SPAWNS) bossRush = new BossRush();
    if (c.TRAIN) train = new Train();
    if (c.SPACE_MODE) moon = new Moon();
    if (c.HUNT) hunt = new ManHunt();

    if (c.MOTHERSHIP_LOOP) mothershipLoop.spawn();
    if (c.SPECIAL_BOSS_SPAWNS) bossRush.init();
    if (c.MAZE > 0) generateMaze(c.MAZE);
};

const gamemodeLoop = function() {
    logger.set();
    if (c.HUNT) hunt.loop();
    if (c.TRAIN) train.loop();
    if (c.SPACE_MODE) moon.loop();
    if (c.MOTHERSHIP_LOOP) mothershipLoop.loop();
    if (c.SPECIAL_BOSS_SPAWNS) bossRush.loop();
    logger.mark();
    if (logger.totalTime > 100) {
        console.log("Gamemode loop is taking a long time!");
        console.log(`Gamemode loop took ${logger.totalTime}ms to complete!`);
        console.log(`Gamemode loop log history: (Last ${logger.sum.length} entries)`);
        console.log(logger.sum.map(entry => `Run at: ${entry.at}. Time: ${entry.time}.`).join("\n"));
    }
};

module.exports = { gamemodeLoop, initGameModeLoop };