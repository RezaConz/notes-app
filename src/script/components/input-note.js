import { insertNote } from "../main.js";

class InputNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const titlePlaceholder = this.getAttribute("title") || "Title";
    const contentPlaceholder = this.getAttribute("content") || "Note here...";

    this.shadowRoot.innerHTML = `
      <style>
          .add-note {
              background-color: white;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              margin-bottom: 20px;
          }
          .add-note h2 {
              margin-top: 0;
          }
          .add-note input, .add-note textarea {
              width: 100%;
              margin-bottom: 10px;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
          }
          #add-note-btn {
              background-color: #2d3a5f;
              border: none;
              color: white;
              padding: 10px 20px;
              font-size: 16px;
              cursor: pointer;
              border-radius: 5px;
              transition: background-color 0.3s ease, transform 0.2s ease;
          }
          #add-note-btn:hover {
              background-color: #1f2a3d;
              transform: scale(1.05);
          }
          #add-note-btn:active {
              background-color: #16222e;
              transform: scale(0.98);
          }
          #add-note-btn:disabled {
              background-color: #cccccc;
              cursor: not-allowed;
          }
      </style>
      <form class="add-note" id="add-note">
          <h2>Add a Note</h2>
          <input type="text" placeholder="${titlePlaceholder}" id="note-title" required>
          <textarea placeholder="${contentPlaceholder}" id="note-content" required></textarea>
          <button type="submit" id="add-note-btn" disabled>Add note</button>
      </form>

    `;

    const form = this.shadowRoot.querySelector("#add-note");
    const titleInput = this.shadowRoot.querySelector("#note-title");
    const noteInput = this.shadowRoot.querySelector("#note-content");
    const buttonSubmit = this.shadowRoot.querySelector("#add-note-btn");

    if (form) {
      form.addEventListener("input", () => {
        buttonSubmit.disabled = !(
          titleInput.value.trim() && noteInput.value.trim()
        );
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const note = {
          title: titleInput.value,
          body: noteInput.value,
        };
        insertNote(note, () => {
          titleInput.value = "";
          noteInput.value = "";
          buttonSubmit.disabled = true;
          if (window.main) {
            window.main();
          }
        });
      });
    }
  }
}

customElements.define("input-note", InputNote);
