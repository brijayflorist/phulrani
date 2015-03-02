angular.module('home.categoryDetails', ['productsStore.services','categoriesStore.services',
                                        'phulrani.productInfoDirectives'])

.controller('categoryDetailsController', function ($scope, $state, ProductsStore, productsByCategory) {
    //NR:  Will populate products base on category passed in $stateparams and will be rendered inside the CategoryDetails html template
    $scope.products = productsByCategory;
    //$scope.category = category;
})

