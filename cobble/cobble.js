import settings from "../settings.js";
import { getRoute, setRoute, parsePolar } from "./route.js";
import { checkForUpdate } from "../update/updateCheck.js";

const C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");

var checkedForUpdate = false;


register("packetSent", (packet, event) => {
  if(!settings.cobblestone) { return; }

  let pos = packet.func_179715_a();

  const isroute = getRoute().some(coords =>
    coords.x === pos.func_177958_n() &&
    coords.y === pos.func_177956_o() &&
    coords.z === pos.func_177952_p()
  );

  // die cobble break packet
  if(settings.onlyCobble) {
    let block =  World.getBlockAt(pos.func_177958_n(), pos.func_177956_o(), pos.func_177952_p())
    // cobbled stone = 4
    if(block.type?.getID() == 4 && isroute) { cancel(event); }
    return;
  }
  // any block
  if(isroute) { cancel(event); }
}).setFilteredClass(C07PacketPlayerDigging);


// updating routes :)
register("step", () => {
  if(!settings.polarRoute) return;
  parsePolar();
}).setFps(1)

// saving routes to file thing
register("worldLoad", () => {
  if(getRoute() == []) {
    setRoute(FileLib.read("cobble", "config/saved.json"));
  }

  if(!checkedForUpdate) {
    checkForUpdate();
    checkedForUpdate = true
  }
});