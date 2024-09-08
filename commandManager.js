import settings from "./settings";
import { loadRoute, getRoute } from "./cobble/route.js";
import { checkForUpdate } from "./update/updateCheck.js";

const prefix = "&8[&2Cobble&8]&7";

register("command", (...args) => {
    if (args == undefined || args[0] == undefined) { settings.openGUI(); return }
    switch (args.length) {
        case 1:
            switch (args[0]) {
                case "load":
                    loadRoute();
                    break;

                case "route":
                    let route = getRoute();
                    let finalString = "";
                    route.forEach(pos => {
                        finalString += `{x:${pos.x}, y:${pos.y}, z:${pos.z}},\n`;
                    });
                    ChatLib.chat(`${prefix} Route: \n${finalString}`)
                    break;
                
                case "export":
                    ChatLib.chat(`${prefix} Copied route to clipboard`)
                    ChatLib.command(`ct copy ${JSON.stringify(getRoute())}`, true);
                    break

                case "help":
                    ChatLib.chat(`${prefix} Help \n&7"/c" or "/cobble" - Opens the GUI \n&7"/c load" - Loads the route from ur clipboard, if ur using polar is manually loads it \n&7"/c route" - Displays ur current route in chat \n&7"/c export" - Exports the route in cobble format (useless lol) \n&7"/c help" - Shows this message`)
                    break;

                case "update":
                    checkForUpdate().then((outdated) => {
                        if(outdated) return;
                        ChatLib.chat(`${prefix} No new update right now.`)
                    });
                    break;

                default:
                    ChatLib.chat(`${prefix}&c Unknown command, type "/c help" for list of commands`)
            }
            break;
    }
}).setName("c").setAliases(["cobble"])