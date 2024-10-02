// Auto-generated JavaScript classes from Go structs

export class Category {
  constructor(items) {
    this.items = items;
  }
}

export class Contents {
  constructor(water, sugar, fat, dry_matter) {
    this.water = water;
    this.sugar = sugar;
    this.fat = fat;
    this.dry_matter = dry_matter;
  }
}

export class Item {
  constructor(id, name, contents, calories_100g) {
    this.id = id;
    this.name = name;
    this.contents = contents;
    this.calories_100g = calories_100g;
  }
}

export class StockCatalog {
  constructor(categories) {
    this.categories = categories;
  }
}

