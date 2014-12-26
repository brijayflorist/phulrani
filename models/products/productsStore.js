angular.module('productsStore.services', [])

/**
* A Patient Store service that returns patient data.
*/
.factory('ProductsStore', function ($q, $filter) {
    // Will call phonegap api for storing/retriving patient data and returns a JSON array

    // Some fake testing data
    var products = [
	                { id: 1, name: 'boquet1', photo: "img/ionic.png", category:'c1,c2,c3,c4'},
	                { id: 2, name: 'boquet2', photo: "img/ionic.png", category:'c1,c7,c3,c5' },
	                { id: 3, name: 'boquet3', photo: "img/ionic.png", category:'c1,c8,c9,c4' },
	                { id: 4, name: 'boquet4', photo: "img/ionic.png", category:'c1,c6,c3,c9' },
					{ id: 5, name: 'flower1', photo: "img/ionic.png", category:'c5,c6,c8,c9' },
	                { id: 6, name: 'flower2', photo: "img/ionic.png", category:'c1,c2' },
	                { id: 7, name: 'plant1', photo: "img/ionic.png", category:'c1,c9' },
	                { id: 8, name: 'plant2', photo: "img/ionic.png", category:'c1,c3,c6' }
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
        }
    }
});