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
});
