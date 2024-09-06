import settings from "./settings";

const prefix = "&8[&2Cobble&8]&7";

register("command", (...args) => {
    if (args == undefined || args[0] == undefined) { settings.openGUI(); return }
}).setName("c").setAliases(["cobble",])