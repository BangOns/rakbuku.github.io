export function CreateNewBook(Title, Author, Year, isComplete) {
  const newBook = {
    id: +new Date(),
    Title: Title.value,
    Author: Author.value,
    Year: parseInt(Year.value),
    isComplete: isComplete.checked,
  };
  if (isComplete.checked) {
    const itemComplete = getLocaleStorageReading();
    itemComplete.push(newBook);
    localStorage.setItem("ListDoneReading", JSON.stringify(itemComplete));
  } else {
    const itemNotComplete = getLocaleStorageNoYet();
    itemNotComplete.push(newBook);
    localStorage.setItem("ListNotYetReading", JSON.stringify(itemNotComplete));
  }
  Title.value = "";
  Author.value = "";
  Year.value = "";
  isComplete.checked = false;
}
// Title = Finished Reading
export async function ReadingNotFinish(id, ThisLocale) {
  let FilterBookIsFinish = await ThisLocale.filter(
    (value) => value.id !== parseInt(id)
  );
  let FindBook = await ThisLocale.find((value) => value.id === parseInt(id));
  if (FindBook) {
    FindBook.isComplete = false;
    const itemComplete = getLocaleStorageNoYet();
    itemComplete.push(FindBook);
    localStorage.setItem("ListNotYetReading", JSON.stringify(itemComplete));
  }
  localStorage.setItem("ListDoneReading", JSON.stringify(FilterBookIsFinish));
}

export async function RemoveBookIsFinish(id, ThisLocale) {
  let FilterBookIsFinish = await ThisLocale.filter(
    (value) => value.id !== parseInt(id)
  );
  localStorage.setItem("ListDoneReading", JSON.stringify(FilterBookIsFinish));
}

// Title = Not Yet Reading
export async function ReadingGetFinish(id, ThisLocale) {
  let FilterBookNotFinish = await ThisLocale.filter(
    (value) => value.id !== parseInt(id)
  );
  let FindBook = await ThisLocale.find((value) => value.id === parseInt(id));
  if (FindBook) {
    FindBook.isComplete = true;
    const itemComplete = getLocaleStorageReading();
    itemComplete.push(FindBook);
    localStorage.setItem("ListDoneReading", JSON.stringify(itemComplete));
  }
  localStorage.setItem(
    "ListNotYetReading",
    JSON.stringify(FilterBookNotFinish)
  );
}

export async function RemoveBookNotFinish(id, ThisLocale) {
  let FilterBookNotFinish = await ThisLocale.filter(
    (value) => value.id !== parseInt(id)
  );
  localStorage.setItem(
    "ListNotYetReading",
    JSON.stringify(FilterBookNotFinish)
  );
}
export function getLocaleStorageReading() {
  return localStorage.getItem("ListDoneReading")
    ? JSON.parse(localStorage.getItem("ListDoneReading"))
    : [];
}
export function getLocaleStorageNoYet() {
  return localStorage.getItem("ListNotYetReading")
    ? JSON.parse(localStorage.getItem("ListNotYetReading"))
    : [];
}
