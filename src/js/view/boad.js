import Column from "./column.js";

const COLUMN_NAMES = ["To Do", "Doing", "Done"];

export default class Board {
    constructor(root) {
        this.root = root;
        Board.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        })
    }

    static columns() {
        return COLUMN_NAMES.map((name, index) => {
            return {id:index, title:name}
        });
    }
}