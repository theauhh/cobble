import { @Vigilant, @SwitchProperty, @SelectorProperty} from "../Vigilance/index"

// taken from coleweight

@Vigilant("cobble/config", "cobble settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&2cobble &7v${JSON.parse(FileLib.read("cobble", "metadata.json")).version}` + 
        `\n&7By &2theauhh`)
    }
    @SwitchProperty({
        name: "Stop breaking route blocks (cobble)",
        description: "cancel the packets bruv",
        category: "General"
    })
    cobblestone = false;

    @SwitchProperty({
        name: "Only stop packets to cobblestone",
        description: "i want my cobbled stone pls",
        category: "General"
    })
    onlyCobble = true;

    @SwitchProperty({
        name: "Get route from Polar",
        description: "Gets ur route from polarclient, auto loads. no need to type \"/c load\" but u can if u want ig",
        category: "General"
    })
    polarRoute = false;
}

export default new Settings()