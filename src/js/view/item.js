import fetchData from "../data/fetch-data.js";

export default class Item {
  constructor(id, content) {
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.title = this.elements.root.querySelector(".item-title");
    this.elements.content = this.elements.root.querySelector(".item-content");
    this.elements.removeButton = this.elements.root.querySelector(".item-remove");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = content.title;
    this.elements.content.textContent = content.body;

    const onBlur = () => {
        const newTitle = this.elements.title.textContent.trim();
        const newContent = this.elements.content.textContent.trim();

        console.log(newTitle, newContent);

        fetchData.updateItem(this.elements.root.dataset.id, {content:{title: newTitle, body: newContent}});
    };

    this.elements.removeButton.addEventListener("click", () => {
        if (confirm("Deseja deletar este item?")) {
            fetchData.deleteItem(+this.elements.root.dataset.id);
            this.elements.root.parentElement.removeChild(this.elements.root);
        } else {
        }
    })

    this.elements.title.addEventListener("blur", onBlur);
    this.elements.content.addEventListener("blur", onBlur);
  }

  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);

    return range.createContextualFragment(`
        <div class="item" draggable="true">
            <div class="item-title" contenteditable></div>
            <div class="item-content" contenteditable></div>
            <button class="item-remove">X</button>
        </div>
    `).children[0];
  }
}
