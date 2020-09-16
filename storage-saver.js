"use strict";

class StorageSaver {
  constructor(STORAGE_ID, STORAGE_TYPE) {
    this.storageId = STORAGE_ID;
    this.storage = STORAGE_TYPE === 'local' ? window.localStorage : window.sessionStorage;
    this.init();
  }

  init() {
    if (!this.getStorageData()) {
      this.storage.setItem(this.storageId, '{}');
    }
  }

  getStorageData(key) {
    const data = this.storage && JSON.parse(this.storage.getItem(this.storageId));
    let storageData = data;
    if (data && key) {
      storageData = data[key];
    }
    return storageData;
  }

  add(key, data) {
    const sd = this.getStorageData();
    sd[key] = data;
    this.save(sd);
  }

  save(data) {
    try {
      this.storage.setItem(this.storageId, JSON.stringify(data));
    } catch (e) {
      console.error('Storage is not available!', 'StorageSaver');
    }
  }

  remove(key) {
    const sd = this.getStorageData();
    if (!sd[key]) {
      console.error('Wrong storage key', 'StorageSaver');
      return;
    }
    delete sd[key];
    this.save(sd);
  }
}

const storageSaver = new StorageSaver('test', 'session');
export { storageSaver };
