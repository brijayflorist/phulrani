angular.module('productsStore.services', [])

/**
* A Patient Store service that returns patient data.
*/
.factory('ProductsStore', function ($q, $filter) {
    // Will call phonegap api for storing/retriving patient data and returns a JSON array

    // Some fake testing data
    var products = [
                    { id: 2, name: "flower1", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/flowers/flowers2.jpg", thumbnail: "img/flowers/flowers2.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1] },
                    { id: 1, name: "flower2", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/flowers/flowers1.jpg", thumbnail: "img/flowers/flowers1.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1] },
                    { id: 3, name: "flower3", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/flowers/flowers3.jpg", thumbnail: "img/flowers/flowers3.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1] },
                    { id: 4, name: "flower4", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/flowers/flowers4.jpg", thumbnail: "img/flowers/flowers4.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1] },
                    { id: 5, name: "flower5", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/flowers/flowers5.jpg", thumbnail: "img/flowers/flowers5.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1] },
                    { id: 6, name: "flower6", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/flowers/flowers6.jpg", thumbnail: "img/flowers/flowers6.jpg", tags: ["t1", "t2", "t3", "t4"], category: [1] },

                    { id: 7, name: "cake1", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/cakes/cake1.jpg", thumbnail: "img/cakes/cake1.jpg", tags: ["t1", "t2", "t3", "t4"], category: [2] },
                    { id: 8, name: "cake2", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/cakes/cake2.jpg", thumbnail: "img/cakes/cake2.jpg", tags: ["t1", "t2", "t3", "t4"], category: [2] },
                    { id: 9, name: "cake3", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/cakes/cake3.jpg", thumbnail: "img/cakes/cake3.jpg", tags: ["t1", "t2", "t3", "t4"], category: [2] },
                    { id: 10, name: "cake4", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/cakes/cake4.jpg", thumbnail: "img/cakes/cake4.jpg", tags: ["t1", "t2", "t3", "t4"], category: [2] },
                    { id: 11, name: "cake5", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/cakes/cake5.jpg", thumbnail: "img/cakes/cake5.jpg", tags: ["t1", "t2", "t3", "t4"], category: [2] },

                    { id: 12, name: "combo1", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo1.jpg", thumbnail: "img/combos/combo1.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },
                    { id: 13, name: "combo2", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo2.jpg", thumbnail: "img/combos/combo2.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },
                    { id: 14, name: "combo3", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo3.jpg", thumbnail: "img/combos/combo3.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },
                    { id: 15, name: "combo4", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo4.jpg", thumbnail: "img/combos/combo4.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },
                    { id: 16, name: "combo5", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo5.jpg", thumbnail: "img/combos/combo5.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },
                    { id: 13, name: "combo6", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo6.jpg", thumbnail: "img/combos/combo6.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },
                    { id: 14, name: "combo7", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo7.jpg", thumbnail: "img/combos/combo7.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },
                    { id: 15, name: "combo8", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/combos/combo8.jpg", thumbnail: "img/combos/combo8.jpg", tags: ["t1", "t2", "t3", "t4"], category: [3] },

                    { id: 16, name: "wedding1", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/wedding/wedding1.jpg", thumbnail: "img/wedding/wedding1.jpg", tags: ["t1", "t2", "t3", "t4"], category: [4] },
                    { id: 17, name: "wedding2", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/wedding/wedding2.jpg", thumbnail: "img/wedding/wedding2.jpg", tags: ["t1", "t2", "t3", "t4"], category: [4] },
                    { id: 18, name: "wedding3", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/wedding/wedding3.jpg", thumbnail: "img/wedding/wedding3.jpg", tags: ["t1", "t2", "t3", "t4"], category: [4] },
                    { id: 19, name: "wedding4", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/wedding/wedding4.jpg", thumbnail: "img/wedding/wedding4.jpg", tags: ["t1", "t2", "t3", "t4"], category: [4] },
                    { id: 20, name: "wedding5", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/wedding/wedding5.jpg", thumbnail: "img/wedding/wedding5.jpg", tags: ["t1", "t2", "t3", "t4"], category: [4] },
                    { id: 21, name: "wedding6", longInfo: "some long Info", shortInfo: "some Info", price: "100", photo: "img/wedding/wedding6.jpg", thumbnail: "img/wedding/wedding6.jpg", tags: ["t1", "t2", "t3", "t4"], category: [4] },

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
        },
        getCategory: function (categoryID) {
            debugger;
            return "hello";
        }
    }
});