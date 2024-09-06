import settings from "./settings";

const C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");

register("packetSent", (packet, event) => {
    if(!settings.cobblestone) { return; }

    let pos = packet.func_179715_a();
    let block =  World.getBlockAt(pos.func_177958_n(), pos.func_177956_o(), pos.func_177952_p())

    if(!(block instanceof Block)) { return; }
    
    if(block.type.getID() == 4) { // id of cobblestone is 4
        cancel(event);
    }
}).setFilteredClass(C07PacketPlayerDigging);