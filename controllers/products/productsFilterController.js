angular.module('home.productsFilter', ['productsStore.services',
                                        'phulrani.productInfoDirectives',
                                        'ui-rangeSlider'])

.controller('productsFilterController', function ($scope, $state, $stateParams, ProductsStore, productsFiltered, category) {
    //NR:  Will populate products base on category passed in $stateparams and will be rendered inside the CategoryDetails html template
    $scope.products = productsFiltered;
    $scope.productCount = productsFiltered.length;
    $scope.searchCriteria = { "category": category, "key": $stateParams.key, "sort": $stateParams.sort, "price_range": $stateParams.price_range };

    $scope.composeTitle = function (category, key, sort, price_range) {
        var title = "Showing all items ", conjunction=" ";
        if (category) {
            title = title + "for " + category.name;
            conjunction = " and "
        } else if(key){
            title = title + conjunction + " with tags " + key;
            conjunction = " and ";
        } else if(price_range) {
            title = title + conjunction + "with price range " + price_range;
            conjunction = " and ";
        } else if(sort) {
            title = title + conjunction + "sorted on price " + (sort=="asc"?"Low to high":"High to low");
        }
        return title;
    }
    $scope.title = $scope.composeTitle(category, $stateParams.key, $stateParams.sort, $stateParams.price_range);

    // set available range
    $scope.minPrice = 100;
    $scope.maxPrice = 999;

    // default the user's values to the available range
    $scope.userMinPrice = $scope.minPrice;
    $scope.userMaxPrice = $scope.maxPrice;

})

