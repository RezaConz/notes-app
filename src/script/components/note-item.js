class NoteItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <style>
                .note-card {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .note-card h3 {
                    margin-top: 0;
                }

                .note-card p {
                    flex-grow: 1;
                }

                .note-card .note-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                }

                .note-card .note-footer span {
                    font-size: 12px;
                    color: #666;
                }

                .note-card .note-footer button {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <div class="note-card">
                <h3>${this.getAttribute("title")}</h3>
                <p>${this.getAttribute("body")}</p>
            </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
