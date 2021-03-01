class InMemoryLinkStorage {
    constructor() {
        this.store = new Set();
    }

    add(url) {
        this.store.add(url);
        console.log(this.store);
    }

    getAll() {
        console.log(this.store.values());
        return this.store.values();
    }
}

module.exports = InMemoryLinkStorage;