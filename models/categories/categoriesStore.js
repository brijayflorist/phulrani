angular.module('categoriesStore.services', [])

/**
* A Patient Store service that returns patient data.
*/
.factory('CategoriesStore', function ($q, $filter) {  //NR: $filter is used for MOCK, remove it if not required later
    // Some fake testing data
    var categories = [
	                { id: 1, name: 'c1', isRoot:true, childs:[] },
	                { id: 2, name: 'c2', isRoot:true, childs:['c8','c7'] },
					{ id: 3, name: 'c3', isRoot:true, childs:['c9','c7','c6'] },
					{ id: 4, name: 'c4', isRoot:true, childs:[] },
					{ id: 5, name: 'c5', isRoot:true, childs:['c6','c7'] },
					{ id: 6, name: 'c6', isRoot:false, childs:[] },
					{ id: 7, name: 'c7', isRoot:false, childs:[] },
					{ id: 8, name: 'c8', isRoot:false, childs:[] },
					{ id: 9, name: 'c9', isRoot:false, childs:[] }					
	              ];

    return {
        getCount: function () {
            var deferredCount = $q.defer();

            ////NR:TODO:  Mock  ////
            var count = 9; // fire query for count
            ////NR:TODO:  Mock  ////

            deferredCount.resolve(count);
            return deferredCount.promise;
        },
        getRootCategories: function () {
            var deferredFetchAll = $q.defer();

            ////NR:TODO:  Mock  ////
            var allcategories = $filter('filter')(categories, { isRoot: true }, true);
            ////NR:TODO:  Mock  ////

            deferredFetchAll.resolve(allcategories);
            return deferredFetchAll.promise;
        },
        getCategoryByID: function (categoryID) {
            // Search on patients
            var deferredFetch = $q.defer();

            ////NR:TODO:  Mock  ////
            var categoryByID;
            if (categoryID && categoryID !== "") {
                categoryByID = ($filter('filter')(categories, { id: JSON.parse(categoryID) }, true))[0];
            } else {
                categoryByID = null;
            }
            ////NR:TODO:  Mock  ////

            deferredFetch.resolve(categoryByID);
            return deferredFetch.promise;
        },
        getChildsForCategory: function (categoryID) {
            // Search on patients
            var deferredFetch = $q.defer();

            ////NR:TODO:  Mock  ////
            var categoryByID = getCategoryByID(categoryID);
            var childsForCategory;
            if(categoryByID.childs && categoryByID.childs.length > 0) {
				childsForCategory = categoryByID.childs
			} else {
				childsForCategory = null;
			}
			////NR:TODO:  Mock  ////

            deferredFetch.resolve(childsForCategory);
            return deferredFetch.promise;
        }

    }
});