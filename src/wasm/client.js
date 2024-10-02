import {Item, StockCatalog} from "@/entities/entities.js";

export class WasmClient {
    constructor() {
        this.wasmModule = null;
    }

    // Initialize the WebAssembly module and expose the available functions
    async init() {
        const go = new Go();

        const wasmModule = await WebAssembly.instantiateStreaming(fetch('http://localhost:8001/static/main.wasm'), go.importObject);
        go.run(wasmModule.instance);

        this.wasmModule = window; // Expose the global window where Go sets its functions

        // Return a promise that resolves when the Wasm module is ready
        return new Promise((resolve) => {
            setTimeout(() => resolve(this), 500); // Small delay to ensure everything is ready
        });
    }

    // Helper method to call the WebAssembly function fetchStockCatalog
    async fetchStockCatalog() {
        if (!this.wasmModule.fetchStockCatalog) {
            throw new Error("fetchStockCatalog is not available in the Wasm module");
        }

        const result = await this.wasmModule.fetchStockCatalog();
        const jsonData = JSON.parse(result);  // Return the parsed JSON

        return new StockCatalog(jsonData.categories);
    }

    async fetchItem(id) {
        if (!this.wasmModule.fetchItem) {
            throw new Error("fetchItem is not available in the Wasm module");
        }

        const result = await this.wasmModule.fetchItem(id);
        const jsonData = JSON.parse(result);  // Return the parsed JSON

        return new Item(jsonData.id, jsonData.name, jsonData.contents, jsonData.calories_100g);
    }
}