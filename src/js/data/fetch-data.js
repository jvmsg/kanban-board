export default class fetchData {
  static getItem(columnId) {
    const column = read().find((column) => column.id === columnId);

    if (!column) {
      return [];
    }

    return column.items;
  }

  static insertItem(columnId, content) {
    const data = read();
    const column = data.find((column) => column.id === columnId);

    if (!column) {
      throw new Error(`Coluna ${columnId} nao existe.`);
    }

    const item = {
      id: Math.floor(Math.random() * 100000),
      content,
    };

    column.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemId, newItem) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id === itemId);
        if (item) {
          return [item, column];
        }
      }
      return [undefined, undefined];
    })();

    if (!item) {
      throw new Error("Item não encontrado.");
    }

    item.content =
      newItem.content === undefined ? item.content : newItem.content;

    if (newItem.columnId !== undefined && newItem.position !== undefined) {
      const targetColumn = data.find(
        (column) => column.id === newItem.columnId
      );

      if (!targetColumn) {
        throw new Error("targetColumn não encontrada.");
      }
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      targetColumn.items.splice(newItem.position, 0, item);
    }
    save(data);
  }

  static deleteItem(itemId) {
    const data = read();
    for (const column of data) {
      const item = column.items.find((item) => item.id === itemId);
      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }
    save(data);
  }
}

const KANBAN_DATA = "kanban-data";

function read() {
  const json = localStorage.getItem(KANBAN_DATA);
  if (!json) {
    return [
      {
        id: 0,
        items: [],
      },
      {
        id: 1,
        items: [],
      },
      {
        id: 2,
        items: [],
      },
    ];
  }

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem(KANBAN_DATA, JSON.stringify(data));
}
