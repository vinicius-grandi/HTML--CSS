let db;

function createDB(dbName, version = 1) {
  const request = window.indexedDB.open(dbName, version);

  request.onsuccess = () => {
    console.log('db created');
    db = request.result;
  }

  request.onerror = () => {
    console.log('error');
  }

  request.onupgradeneeded = (ev) => {
    db = ev.target.result;
    /**@type {IDBObjectStore} */
    const objectStore = db.createObjectStore('users', {
      keyPath: 'id',
      autoIncrement: true,
    });
    objectStore.createIndex('name', 'name', {
      unique: false,
    });
    console.log('db upgraded');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createDB('site');
  const submitBtn = document.querySelector('#submit');
  const getBtn = document.querySelector('#get-all-values-btn');
  const list = document.querySelector('#list');

  function displayData() {
    const transactionDisplay = db.transaction('users');
    /**@type {IDBObjectStore} */
    const objectStore = transactionDisplay.objectStore('users');
    let outerHtmlLi = '';

    objectStore.openCursor().onsuccess = (ev) => {
      /**@type {IDBCursor & { value: { name: string } }} */
      const cursor = ev.target.result;

      if (cursor) {
        const li = document.createElement('li');
        li.innerText = cursor.value.name;
        outerHtmlLi += li.outerHTML;
        cursor.continue();
      }
      list.innerHTML = outerHtmlLi;
    }
  }

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    /**@type {HTMLInputElement} */
    const name = document.querySelector('#name');
    const transactionAdd = db.transaction(['users'], 'readwrite');
    const objectStore = transactionAdd.objectStore('users');
    const req = objectStore.add({
      name: name.value,
    });

    console.log(req);

    req.onsuccess = () => {
      displayData();
    }

    req.onerror = (ev) => console.log('transaction failed', ev);
  });

  getBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (list.hasChildNodes()) {
      return;
    }
    displayData();
  });
});
