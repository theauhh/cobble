import settings from "../settings";
import { printObjectKeys } from "../update/updateCheck";

const Toolkit = Java.type("java.awt.Toolkit");
const DataFlavor = Java.type("java.awt.datatransfer.DataFlavor");

const prefix = "&8[&2Cobble&8]&7";
var loadedRoute = 0;
var route = []


/**
 * Loads
 */
export function loadRoute() {
    try {
        if(settings.polarRoute) {
            parsePolar();
            ChatLib.chat(`${prefix} Loaded route custom${loadedRoute + 1}.txt&7 from config`)
        } else {
            const clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
            const clipboardData = clipboard.getData(DataFlavor.stringFlavor);
            let cb = JSON.parse(clipboardData);

            // now figuring out what format the route is ... :(
                ChatLib.chat(`${prefix} Loading route from Clipboard`);
    
            if (Array.isArray(cb) && cb.length > 0 && cb[0].x1 !== undefined && cb[0].x2 !== undefined) {
                // polar
                ChatLib.chat(`${prefix} Found Polar route, converting...`)
                parsePolar(cb);
            }
            
            else if (Array.isArray(cb) && cb.length > 0 && cb[0].x !== undefined && cb[0].options !== undefined) {
                // coleweight
                ChatLib.chat(`${prefix} Found Coleweight route, converting...`)
                parseColeweight(cb);
            }

            else if (Array.isArray(cb) && cb.length > 0 && cb[0].x !== undefined && cb[0].y !== undefined && cb[0].z !== undefined) {
                // other, as long as they have x, y, z
                ChatLib.chat(`${prefix} Found a route, converting...`)
                parseColeweight(cb);
            }
    
            else {
                ChatLib.chat(`${prefix}&c Something went wrong! Failed to load route! (${e})`)
            }
        }
    }
    catch (e) {
        console.log(e);
        ChatLib.chat(`${prefix}&c Something went wrong! Failed to load route!`)
    }
}


function parseColeweight(inputRoute) {
    let temp = inputRoute.map(coords => ({
        x: coords.x,
        y: coords.y,
        z: coords.z
    }));
    route = temp;
    saveRoute();
}


export function parsePolar(inputRoute = undefined) {
    let data = []
    if(inputRoute == undefined) {
        data = getPolarWaypoints();
    } else {
        data = inputRoute;
    }

    let temp = data.map(coords => ({
        x: coords.x1,
        y: coords.y1,
        z: coords.z1
    }));
    route = temp;
    if(inputRoute !== undefined) { saveRoute(); }
}


function getPolarWaypoints() {
    let num = getSelectedPolarRoute() + 1; // easy way to get the file :)
    let data = JSON.parse(FileLib.read("PolarConfigV2", `gemstoneroutes/custom${num}.txt`));
    return data;
}

function getSelectedPolarRoute() {
    let gemConf = JSON.parse(FileLib.read("PolarConfigV2", `polarconfig.json`)).find(cat => cat.Name == "Gemstone Macro"); // 16 is the iter for gemstone settings
    loadedRoute = gemConf.Settings.find(setting => setting.Name == "Gemstone Route").Value;
    return loadedRoute;
}

// getter bcs js wont update it if exported (bad language)
export function getRoute() {
    return route;
}


// setter for same purpose as above :fuming:
export function setRoute(inputRoute) {
    route = JSON.parse(inputRoute);
}


function saveRoute() {
    FileLib.write("cobble", "config/saved.json", JSON.stringify(route))
}

export function getLoadedRoute() {
    return loadedRoute;
}