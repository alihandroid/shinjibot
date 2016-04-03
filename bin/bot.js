'use strict';

var ShinjiBot = require('../lib/shinjibot');

var name = process.env.BOT_NAME;

var shinjibot = new ShinjiBot({
    token: token,
    name: name
});

shinjibot.run();
