import "./component.css"
import Menu from "./component";

class MenuManager {

    root: Menu|null;
    sub: Menu[];
    rootAccessor: (menu: JSX.Element[]|undefined) => void;

    constructor() {
        this.rootAccessor = () => undefined;
        this.root = null;
        this.sub = [];
        window.addEventListener("blur", () => this.clear());
        window.addEventListener("click", (event) => {
            if (!(document.getElementById("menu-overlay") as Element).contains(event.target as Element)) {
                this.clear();
            }
        });
    }

    open(menu: Menu) {
        if (this.root == null) {
            this.root = menu;
        } else {
            this.sub.push(menu);
        }
    }


    clear(depth: number = 0) {
        if (depth === 0) {
            this.root = null;
            this.sub = [];
        } else {
            this.sub.splice(depth - 1, this.sub.length - depth + 1)
        }
        this.render();
    }

    render() {
        const queue: any[] = [];
        queue.push(this.root?.render());
        for (let s in this.sub) {
            queue.push(this.sub[s].render());
        }
        this.rootAccessor(queue);
    }

    connect(rootAccessor: (menu: JSX.Element[]|undefined) => void) {
        this.rootAccessor = rootAccessor;
    }

}

const menu = new MenuManager();

export default menu;