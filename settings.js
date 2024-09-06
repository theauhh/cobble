import { @Vigilant,@SwitchProperty} from "../Vigilance/index"

@Vigilant("cobble/config", "cobble settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&cobble &bv${JSON.parse(FileLib.read("cobble", "metadata.json")).version}` + 
        `\n&aBy &btheauhh`)
    }
    @SwitchProperty({
        name: "Stop breaking cobble",
        description: "cancel the packets bruv",
        category: "General"
    })
    cobblestone = false;
}

export default new Settings()