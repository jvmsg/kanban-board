export default class Item {
  constructor(id, content) {
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.title = this.elements.root.querySelector(".item-title");
    this.elements.content = this.elements.root.querySelector(".item-content");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = content.title;
    this.elements.content.textContent = content.body;
  }

  static createRoot() {
    const range = document.createRange();
    range.selectNode(document.body);

    return range.createContextualFragment(`
        <div class="item" draggable="true">
            <div class="item-title"></div>
            <div class="item-content"></div>
        </div>
    `).children[0];
  }
}
