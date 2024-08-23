import { animate } from "motion";

const baseUrl = "https://notes-api.dicoding.dev/v2";

const showLoading = () => {
  document.getElementById("loading").style.display = "block";
};

const hideLoading = () => {
  document.getElementById("loading").style.display = "none";
};

export const insertNote = async (note, onSuccess) => {
  showLoading();
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${baseUrl}/notes`, options);
    const responseJson = await response.json();

    if (responseJson.status === "success") {
      if (onSuccess) onSuccess();
      const listBookElement = document.querySelector("#note-list");
      const newNoteElement = listBookElement.lastElementChild;

      if (newNoteElement) {
        animate(
          newNoteElement,
          {
            opacity: [0, 1],
            transform: ["translateY(-20px)", "translateY(0)"],
          },
          {
            duration: 0.5,
            easing: "ease-in-out",
          },
        );
      }
    } else {
      showResponseMessage(responseJson.message);
    }
  } catch (error) {
    showResponseMessage(error);
  } finally {
    hideLoading();
  }
};

function main() {
  const getNote = async () => {
    showLoading();
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        showResponseMessage(responseJson.message);
      } else {
        renderAllNotes(responseJson.data);
      }
    } catch (error) {
      showResponseMessage(error);
    } finally {
      hideLoading();
    }
  };

  const removeNote = async (noteId) => {
    showLoading();
    const noteCard = document.querySelector(`.note-card[data-id='${noteId}']`);

    try {
      const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();

      if (responseJson.status === "success") {
        if (noteCard) {
          animate(
            noteCard,
            {
              opacity: [1, 0],
              transform: ["translateY(0)", "translateY(-50%)"],
            },
            {
              duration: 0.5,
              easing: "ease-in-out",
            },
          ).finished.then(() => {
            noteCard.remove();
          });
        }
      } else {
        showResponseMessage(responseJson.message);
      }
    } catch (error) {
      showResponseMessage(error);
    } finally {
      hideLoading();
    }
  };

  const renderAllNotes = (notes) => {
    const listBookElement = document.querySelector("#note-list");
    listBookElement.innerHTML = "";

    notes.forEach((note) => {
      listBookElement.innerHTML += `
         <style>
            .note-card {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .note-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            }

            .note-card h3 {
                margin-top: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
            }

            .note-card p {
                flex-grow: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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

            .trash-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                transition: transform 0.3s ease, filter 0.3s ease;
            }

            .trash-icon:hover {
                transform: scale(1.2);
                filter: brightness(0.8);
            }

            .trash-icon img {
                width: 16px;
                height: 16px;
            }
        </style>

        <div class="note-card" data-id="${note.id}">
            <button class="trash-icon delete-btn" index=${note.id}>
                <img src="delete.png" alt="Delete">
            </button>
            <h3>${note.title}</h3>
            <p>${note.body}</p>
        </div>
      `;
    });

    animate(
      listBookElement,
      {
        opacity: [0, 1],
        transform: ["translateY(20px)", "translateY(0)"],
      },
      {
        duration: 0.5,
        easing: "ease-in-out",
      },
    );

    const buttons = document.querySelectorAll(".delete-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const bookId = event.currentTarget.getAttribute("index");
        removeNote(bookId);
      });
    });
  };

  window.addEventListener("DOMContentLoaded", () => {
    getNote();
  });

  window.main = getNote;
}

function showResponseMessage(message = "Check your internet connection") {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;

  animate(
    errorMessageElement,
    {
      opacity: [0, 1],
      transform: ["translateY(-20px)", "translateY(0)"],
    },
    {
      duration: 0.5,
      easing: "ease-in-out",
    },
  );

  errorMessageElement.style.display = "block";

  setTimeout(() => {
    animate(
      errorMessageElement,
      {
        opacity: [1, 0],
        transform: ["translateY(0)", "translateY(-20px)"],
      },
      {
        duration: 0.5,
        easing: "ease-in-out",
      },
    ).finished.then(() => {
      errorMessageElement.style.display = "none";
    });
  }, 5000);
}

export default main;
