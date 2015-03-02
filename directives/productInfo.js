var productInfoDirectives = angular.module('phulrani.productInfoDirectives', []);

productInfoDirectives.directive('productInfoBox', function ($compile) {
	return {
		restrict: 'E',
		//require: '^product',
		scope: {
			product: '=product'
		},
		transclude: true,
		link: function (scope, elem, attrs) {
		    var outerBox = angular.element("<div style='border:1px solid transparent'></div>");
		    var productImage = angular.element("<img class='img-responsive thumbnail'  style='border:none;margin:auto;height:210px' alt={{product.name}} src={{product.thumbnail}} />");
			var productName = angular.element("<div class='text-center'> {{product.name}} </div>");
			var productPrice = angular.element("<div class='text-center'>Rs.  <b>{{product.price}} </b></div>");
			var quickViewBtn = angular.element("<a style='margin-top: -150px;visibility:hidden' class='btn btn-default'>Quick View</a>");
			var quickViewBtnWrapper = angular.element("<div align='center'></div>");
			var openProductInfoPopup = function (product) {
				var popup = $('<div class="modal" tabindex="-1" role="dialog"></div>');
				var popupDialog = $('<div class="modal-dialog"></div>');
				var popupWrapper = $('<div class="modal-content"></div>');
				var popupHeader = $('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">' + product.name + '</h4> </div>');
				var popupBody = $('<div class="modal-body"></div>');
				var popupContent = $('<img class="img-responsive thumbnail"  style"border:none;margin:auto;" alt="' + product.name + '" src="' + product.thumbnail + '" /><div><span>Product Name :' + product.name + '</span><br><span>Product Price :' + product.price + '</span></div>');
				popupBody.append(popupContent);
				popupWrapper.append(popupHeader);
				popupWrapper.append(popupBody);
				popupDialog.append(popupWrapper);
				popup.append(popupDialog);

				popup.modal('show').on('hidden.bs.modal', function (e) { this.remove(); });
			};
			quickViewBtn.on("click", function () { openProductInfoPopup(scope.product); });
			quickViewBtnWrapper.append(quickViewBtn);

			outerBox.append(productImage);
			outerBox.append(productName);
			outerBox.append(productPrice);
			outerBox.append(quickViewBtnWrapper);
			outerBox.on("mouseenter", function (evt) {
			    quickViewBtn.css("visibility", "visible");
			    outerBox.css("border", "1px solid #FFDAB9");
			});
			outerBox.on("mouseleave", function (evt) {
			    quickViewBtn.css("visibility", "hidden");
			    outerBox.css("border", "1px solid transparent");
			});
			$compile(outerBox)(scope);
			elem.append(outerBox);
		}

	};
});