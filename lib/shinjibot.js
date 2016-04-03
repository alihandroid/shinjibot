'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
// TODO: Add database support
// var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');
 
var ShinjiBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'shinjibot';
    this.user = null;
};

util.inherits(ShinjiBot, Bot);

ShinjiBot.prototype.run = function () {
    ShinjiBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

ShinjiBot.prototype._onStart = function () {
    this._loadBotUser();
};

ShinjiBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        this._isBotCommand(message)
    ) {
		this.postMessageToChannel(channel.name, 'type ~help to list commands (0 commands)'+
			'\n MAKE *FUYUKI* GREAT AGAIN \n *VOTE FOR SHINJI*', {as_user: true});
    }
};

ShinjiBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

ShinjiBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

ShinjiBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' && message.channel[0] === 'C';
};

ShinjiBot.prototype._isBotCommand = function (message) {
    return message.text.charAt(0) === '~';
};

ShinjiBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

module.exports = ShinjiBot;