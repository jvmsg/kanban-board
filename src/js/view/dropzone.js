import fetchData from "../data/fetch-data.js";

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="dropzone"></div>
        `).children[0];

        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("dropzone--active");
        })

        dropZone.addEventListener("dragleave", e => {
            dropZone.classList.remove("dropzone--active");
        })

        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("dropzone--active");

            const columnElement = dropZone.closest(".column");
            const columnId = +columnElement.dataset.id;

            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".dropzone"));
            const dropIndex = dropZonesInColumn.indexOf(dropZone);

            const itemId = +e.dataTransfer.getData("text/plain");
            const item = document.querySelector(`[data-id="${itemId}"]`);
            const insertAfter = dropZone.parentElement.classList.contains("item") ? dropZone.parentElement : dropZone;

            insertAfter.after(item);

            fetchData.updateItem(itemId, {
                columnId,
                position: dropIndex
            })
        })

        return dropZone;
    }
}