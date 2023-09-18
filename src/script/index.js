import {
  CreateNewBook,
  ReadingNotFinish,
  RemoveBookIsFinish,
  ReadingGetFinish,
  RemoveBookNotFinish,
} from "./scriptFunction.js";
const Title = document.getElementById("title");
const Author = document.getElementById("author");
const Year = document.getElementById("year");
const isComplete = document.getElementById("read");
const CreateBook = document.querySelector(".FormBookLibrary");
const ListFinsih = document.querySelector(".listFinish");
const ListNotYet = document.querySelector(".ListNotYetReading");
CreateBook.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    CreateNewBook(Title, Author, Year, isComplete);
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const getDataBookRead = JSON.parse(localStorage.getItem("ListDoneReading"));
  const getDataBookNotYet = JSON.parse(
    localStorage.getItem("ListNotYetReading")
  );
  if (getDataBookRead) {
    let BookFinish = getDataBookRead
      .map((value) => {
        return `
      <li class="BookFinish">
      <div class="titleBook">
        <p>Title</p>
        <span>:</span>
        <p class="nameTitle">${value.Title}</p>
      </div>
      <div class="authorBook">
        <p>Author</p>
        <span>:</span>
        <p class="nameAuthor">${value.Author}</p>
      </div>
      <div class="yearBook">
        <p>Years</p>
        <span>:</span>
        <p class="nameYear">${value.Year}</p>
      </div>
      <div class="optionBook">
        <button type="button" class="notyetButton" data-id=${value.id}>
          NotYet Finish
        </button>
        <button type="button" class="removeButtonFinish" data-id=${value.id}>Remove</button>
      </div>
    </li>
      `;
      })
      .join("");
    ListFinsih.innerHTML = BookFinish;
    let ButtonNotFinish = document.querySelectorAll(".notyetButton");
    let ButtonRemoveFinish = document.querySelectorAll(".removeButtonFinish");
    ButtonNotFinish.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let dataId = e.target.dataset.id;
        try {
          ReadingNotFinish(dataId, getDataBookRead);
          alert(`Buku ini telah dipindahkan`);
          window.location.reload();
        } catch (error) {
          console.log(error.message);
        }
      });
    });
    ButtonRemoveFinish.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let dataId = e.target.dataset.id;
        try {
          RemoveBookIsFinish(dataId, getDataBookRead);
          alert(`Buku ini telah dihapus`);

          window.location.reload();
        } catch (error) {
          console.log(error.message);
        }
      });
    });
  }
  if (getDataBookNotYet) {
    let BookNotFinish = getDataBookNotYet
      .map((value) => {
        return `<li class="BookNotFinish">
  <div class="titleBook">
    <p>Title</p>
    <span>:</span>
    <p class="nameTitle">${value.Title}</p>
  </div>
  <div class="authorBook">
    <p>Author</p>
    <span>:</span>
    <p class="nameAuthor">${value.Author}</p>
  </div>
  <div class="yearBook">
    <p>Years</p>
    <span>:</span>
    <p class="nameYear">${value.Year}</p>
  </div>
  <div class="optionBook">
    <button type="button" class="FinishButton" data-id=${value.id}>
      Reading done
    </button>
    <button type="button" class="removeButton" data-id=${value.id}>Remove</button>
  </div>
</li>`;
      })
      .join("");
    ListNotYet.innerHTML = BookNotFinish;
    let ButtonGetFinish = document.querySelectorAll(".FinishButton");
    let ButtonRemoveFinish = document.querySelectorAll(".removeButton");
    ButtonGetFinish.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let dataId = e.target.dataset.id;
        try {
          ReadingGetFinish(dataId, getDataBookNotYet);
          alert(`Buku ini telah dipindahkan`);

          window.location.reload();
        } catch (error) {
          console.log(error.message);
        }
      });
    });
    ButtonRemoveFinish.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let dataId = e.target.dataset.id;
        try {
          RemoveBookNotFinish(dataId, getDataBookNotYet);
          alert(`Buku ini telah dihapus`);

          window.location.reload();
        } catch (error) {
          console.log(error.message);
        }
      });
    });
  }
});
