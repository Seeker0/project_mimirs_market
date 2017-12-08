// ---------------------------------------------------------
// ProductShowCaser
// 2017-12-06 21:13
// ---------------------------------------------------------
//
// Returns list of ids for products that match search
// criteria; to be used with Sequelize models

const _ = require('lodash');

class ProductShowcaser {
  constructor() {
    this.searched = [];
    this.filteredByCategory = [];
    this.filteredByMin = [];
    this.filteredByMax = [];
    this.sorted = [];
  }

  search(string) {
    
    // push id of found objects to this.searched
  }

  filterByCategory(category) {
    Product.findAll({
      include: [
        {
          model:Category,
          where: {
            name: category
           }
        }
      ]
  }).then(products => {
    console.log(products);
  });

  filterByMin(min) {}

  filterByMax(max) {}

  sort(direction) {}

  reset() {
    this.searched = [];
    this.filteredByCategory = [];
    this.filteredByMin = [];
    this.filteredByMax = [];
    this.sorted = [];
  }

  returnMatches() {
    let queriedArray = _.intersection(
      this.searched,
      this.filteredByCategory,
      this.filteredByMin,
      this.filteredByMax,
      this.sorted,
    );
    this.reset();
    return queriedArray;
  }
}

module.exports = ProductShowcaser;
