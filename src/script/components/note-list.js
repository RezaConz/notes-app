import notesData from "../data/local/notes.js";

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = notesData
      .map(
        (notesData) => `
      <note-item title="${notesData.title}" body="${notesData.body}"></note-item>
    `,
      )
      .join("");
  }
}

customElements.define("note-list", NoteList);
