module.exports = function BattleInfo(mod) {
    const config = require('./config');

    let gameId = null;
    let bossInfo = null;
    let currentClass = null;
    let zoneId = null;
    let isBatlle = false;

    mod.hook('S_LOGIN', 14, (event) => {
        gameId = event.gameId;
        currentClass = (event.templateId - 10101) % 100;
    });

    mod.hook('S_LOAD_TOPO', 3, event => {
        zoneId = event.zone;
        if (isBatlle) {
            isBatlle = false;
            mod.clearTimeout(config.missing_timer);
            resetTimeouts();
        }
    });

    mod.hook('S_BOSS_GAGE_INFO', 3, event => {
        if (zoneId === null) {
            zoneId = event.huntingZoneId;
        }
        if (zoneId !== event.huntingZoneId) return;
        let bossHP = (Number(event.curHp) / Number(event.maxHp));
        bossInfo = event;
        if ((bossHP === 1 || bossHP <= 0) && isBatlle) {
            isBatlle = false;
            mod.clearTimeout(config.missing_timer);
            resetTimeouts();
        } else if (bossHP < 1 && !isBatlle) {
            isBatlle = true;
            config.missing_timer = mod.setTimeout(checkMissingStatuses, config.missing_timeout);
        }
        if (bossHP <= 0) {
            bossInfo = null;
        }
    });

    mod.hook('S_ABNORMALITY_BEGIN', 5, event => {
        config.classes.forEach(teraClass => {
            teraClass.statuses.forEach(status => {
                if (event.id === status.id) {
                    status.status = 1;
                    if (bossInfo && (event.target === bossInfo.id || event.target === gameId)) {
                        if (status.show_start) {
                            statusStart(status, teraClass, getStatusDuration(event));
                        }
                        if (status.show_warning && currentClass === teraClass.id) {
                            status.timer = mod.setTimeout(statusWarning, Number(event.duration) - status.timeout_warning, status, teraClass);
                        }
                    }
                }
            })
        });
    });

    mod.hook('S_ABNORMALITY_REFRESH', 2, event => {
        config.classes.forEach(teraClass => {
            teraClass.statuses.forEach(status => {
                if (event.id === status.id) {
                    status.status = 1;
                    if (bossInfo && (event.target === bossInfo.id || event.target === gameId)) {
                        mod.clearTimeout(status.timer);
                        if (status.show_start) {
                            statusStart(status, teraClass, getStatusDuration(event));
                        }
                        if (status.show_warning && currentClass === teraClass.id) {
                            status.timer = mod.setTimeout(statusWarning, Number(event.duration) - status.timeout_warning, status, teraClass);
                        }
                    }
                }
            })
        });
    });

    mod.hook('S_ABNORMALITY_END', 1, event => {
        config.classes.forEach(teraClass => {
            teraClass.statuses.forEach(status => {
                if (event.id === status.id) {
                    status.status = 0;
                    if (bossInfo && (event.target === bossInfo.id || event.target === gameId)) {
                        mod.clearTimeout(status.timer);
                        if (status.show_ends && currentClass === teraClass.id) {
                            statusEnd(status, teraClass);
                        }
                    }
                }
            })
        });
    });

    mod.hook('S_START_COOLTIME_SKILL', 3, (event) => {
        if (!bossInfo) return;

        config.classes.forEach(teraClass => {
            teraClass.skills.forEach(skill => {
                if (event.skill.id === skill.id && skill.show_cooldown) {
                    skill.timer = mod.setTimeout(skillOfCooldown, event.cooldown, skill, teraClass);
                }
            })
        });
    });

    mod.hook('S_DECREASE_COOLTIME_SKILL', 3, (event) => {
        if (!bossInfo) return;

        config.classes.forEach(teraClass => {
            teraClass.skills.forEach(skill => {
                if (event.skill.id === skill.id && skill.show_cooldown) {
                    mod.clearTimeout(skill.timer);
                    skill.timer = mod.setTimeout(skillOfCooldown, event.cooldown, skill, teraClass);
                }
            })
        });
    });

    mod.hook('S_CREST_MESSAGE', 2, (event) => {
        if (!bossInfo || event.type !== 6) return;

        config.classes.forEach(teraClass => {
            teraClass.skills.forEach(skill => {
                if (event.skill === skill.id && skill.show_cooldown) {
                    mod.clearTimeout(skill.timer);
                    skillOfCooldown(skill, teraClass);
                }
            })
        });
    });

    function checkMissingStatuses () {
        if (!isBatlle) return;

        let timeout = 0;

        config.classes.forEach(teraClass => {
            if (currentClass === teraClass.id) {
                teraClass.statuses.forEach(status => {
                    if (status.status === 0 && status.show_missing) {
                        let message = '';
                        message += getSkillImage(teraClass.templateId, status.imageId, config.img_size);
                        message += prepareText(config.messages.missing, config.colors.red, config.font_size);
                        message += prepareText(status.name, config.colors.white, config.font_size);
                        mod.setTimeout(sendMessage, timeout, config.message_type, message);
                        timeout += 1000;
                    }
                })
            }
        });

        if (timeout > 0) {
            timeout -= 1000;
        }

        if (timeout > config.missing_timeout) {
            let delay = Math.ceil(timeout / config.missing_timeout);
            config.missing_timer = mod.setTimeout(checkMissingStatuses, delay * config.missing_timeout);
        } else {
            config.missing_timer = mod.setTimeout(checkMissingStatuses, config.missing_timeout);
        }
    }

    function resetTimeouts () {
        config.classes.forEach(teraClass => {
            teraClass.statuses.forEach(status => {
                mod.clearTimeout(status.timer);
            })
            teraClass.skills.forEach(skill => {
                mod.clearTimeout(skill.timer);
            })
        });
    }

    function statusStart (status, teraClass, duration) {
        let message = '';
        message += getSkillImage(teraClass.templateId, status.imageId, config.img_size);
        message += prepareText(status.name, config.colors.white, config.font_size);
        message += prepareText(config.messages.status_start, config.colors.green, config.font_size);
        message += prepareText(duration + config.messages.duration_unit, config.colors.orange, config.font_size);
        sendMessage(config.message_type, message);
    }

    function statusWarning (status, teraClass) {
        let message = '';
        message += getSkillImage(teraClass.templateId, status.imageId, config.img_size);
        message += prepareText(status.name, config.colors.white, config.font_size);
        message += prepareText(config.messages.status_warning, config.colors.orange, config.font_size);
        sendMessage(config.message_type, message);
    }

    function statusEnd (status, teraClass) {
        let message = '';
        message += getSkillImage(teraClass.templateId, status.imageId, config.img_size);
        message += prepareText(status.name, config.colors.white, config.font_size);
        message += prepareText(config.messages.status_end, config.colors.red, config.font_size);
        sendMessage(config.message_type, message);
    }

    function skillOfCooldown (skill, teraClass) {
        let message = '';
        message += getSkillImage(teraClass.templateId, skill.imageId, config.img_size);
        message += prepareText(skill.name, config.colors.white, config.font_size);
        message += prepareText(config.messages.cooldown, config.colors.orange, config.font_size);
        sendMessage(config.message_type, message);
    }

    function getSkillImage (templateId, skillId, imgSize) {
        return `<img src="img://skill__0__${templateId}__${skillId}" width="${imgSize}" height="${imgSize}" vspace="-20"/>`;
    }

    function getStatusDuration (event) {
        return Number(event.duration) / 1000;
    }

    function prepareText (message, color, size) {
        return `<font size="${size}" color="#${color}">&nbsp;${message}</font>`;
    }

    function sendMessage (type, msg) {
        mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
            type: type,
            chat: false,
            channel: 0,
            message: msg
        });
    }
};