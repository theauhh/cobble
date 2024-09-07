import settings from "./settings";

const Toolkit = Java.type("java.awt.Toolkit");
const DataFlavor = Java.type("java.awt.datatransfer.DataFlavor");

const prefix = "&8[&2Cobble&8]&7";
export var loadedRoute = settings.routeFromPolar;
var route = []

/**
 * Loads
 */
export function loadRoute() {
    try {
        if(settings.polarRoute) {
            ChatLib.chat(`${prefix} Loading route from config, selected: custom${settings.routeFromPolar + 1}.txt`)
            parsePolar();
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
                // coleweight
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
    loadedRoute = settings.routeFromPolar;
}

function getPolarWaypoints() {
    let num = settings.routeFromPolar + 1; // easy way to get the file :)
    let data = JSON.parse(FileLib.read("PolarConfigV2", `gemstoneroutes/custom${num}.txt`));
    return data;
}

// getter bcs js wont update it if exported (bad language)
export function getRoute() {
    return route;
}