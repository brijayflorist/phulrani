var productInfoDirectives = angular.module('phulrani.productInfoDirectives', []);

productInfoDirectives.directive('productInfoBox', function () {
    return {
        restrict: 'E',
        require: '^product',
        scope: {
            ngModel: '=product'
        },
        template: " <div>\
                        <a href='#' class='thumbnail'>\
                            <img class='img-responsive' alt='flower' src={{ngModel.thumbnail}} />\
                        </a>\
                        <div class='caption text-center bg-primary'> {{ngModel.name}} </div>\
                        <div class='bg-info'> {{ngModel.shortInfo}} </div>\
                        <div class='caption text-center bg-primary'> {{ngModel.price}} INR.  </div>\
                    </div>"
    };
});