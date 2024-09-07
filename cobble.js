import settings from "./settings";
import { getRoute, parsePolar } from "./route.js";

const C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");

register("packetSent", (packet, event) => {
  if(!settings.cobblestone) { return; }

  let pos = packet.func_179715_a();

  const isroute = getRoute().some(coords =>
    coords.x === pos.func_177958_n() &&
    coords.y === pos.func_177956_o() &&
    coords.z === pos.func_177952_p()
  );

  // die cobble break packet
  if(isroute) { cancel(event); }
}).setFilteredClass(C07PacketPlayerDigging);


// updating routes :)
register("step", () => {
  if(!settings.polarRoute) return;
  parsePolar();
}).setFps(1)