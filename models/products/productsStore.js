angular.module('productsStore.services', [])

/**
* A Patient Store service that returns patient data.
*/
.factory('ProductsStore', function ($q, $filter) {
    // Will call phonegap api for storing/retriving patient data and returns a JSON array

    // Some fake testing data
    var products = [
	                { id: 1, name: "boquet1", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1, 2, 3, 4] },
	                { id: 2, name: "boquet2", longInfo: "some  long Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1, 7, 3, 5] },
	                { id: 3, name: "boquet3", longInfo: "some  long Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1, 8, 9, 4] },
	                { id: 4, name: "boquet4", longInfo: "some  long Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1, 6, 3, 9] },
					{ id: 5, name: "flower1", longInfo: "some  long Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [5, 6, 8, 9] },
	                { id: 6, name: "flower2", longInfo: "some  long Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1, 2] },
	                { id: 7, name: "plant1", longInfo: "some  long Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1, 9] },
	                { id: 8, name: "plant2", longInfo: "some long  Info", shortInfo: "some Info", price: "100", photo: "img/flower.jpg", thumbnail: "img/flower.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1, 3, 6] }
	               ];

    return {
        getCount: function () {
            var deferredCount = $q.defer();

            ////NR:TODO:  Mock  ////
            var count = 8; // fire query for count
            ////NR:TODO:  Mock  ////

            deferredCount.resolve(count);
            return deferredCount.promise;
        },
        getAllProducts: function () {
            var deferredFetchAll = $q.defer();

            ////NR:TODO:  Mock  ////
            var allProducts = products;
            ////NR:TODO:  Mock  ////

            deferredFetchAll.resolve(allProducts);
            return deferredFetchAll.promise;
        },
        getProductByID: function (productID) {
            // Search on patients
            var deferredFetch = $q.defer();
            var productByID;
            ////NR:TODO:  Mock  ////
            if (productID && productID !== "") {
                productByID = ($filter('filter')(products, { id: JSON.parse(productID) }, true))[0];
            } else {
                productByID = null;
            }
            // return null if not found
            ////NR:TODO:  Mock  ////

            deferredFetch.resolve(productByID);
            return deferredFetch.promise;
        },
        getProductsByCategory: function (categoryID) {
            // Search on patients
            var deferredFetch = $q.defer();
            var productsByCategory;
            ////NR:TODO:  Mock  ////
            if (categoryID && categoryID !== "") {
                productsByCategory = ($filter('filter')(products, function (value, index) { return _.contains(value.category, JSON.parse(categoryID)); }));
            } else {
                productsByCategory = null;
            }
            // return null if not found
            ////NR:TODO:  Mock  ////

            deferredFetch.resolve(productsByCategory);
            return deferredFetch.promise;
        }
    }
});