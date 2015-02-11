angular.module("dang-jssor", [])
	.directive("enableJssor", function () {
	    return {
	        restrict: "A",
	        scope: {
	            jssorOptions: "="
	        },
	        link: function (scope, element, attrs) {
	            if (attrs.jssorTrigger == 'true') {
	                var container = $(element).closest('.slides-container');
	                
	                if (!container.attr("id"))
	                	container.attr("id", new Date().getTime());

	                var slider = new $JssorSlider$(container.attr("id"), scope.jssorOptions);
                
	                slider.$On($JssorSlider$.$EVT_PARK, function (slideIndex, fromIndex) {
	                    var status = null;
	                    scope.$emit("JssorSliderChanged", status = {
	                        name: scope.jssorOptions.name,
	                        slideIndex: slideIndex,
	                        fromIndex: fromIndex
	                    });

	                    if (scope.jssorOptions.name) {
	                        console.log("SliderChanged:", scope.jssorOptions.name, angular.toJson(status));
	                    }
	                    scope.$apply();
	                });

	                //responsive code begin
	                //you can remove responsive code if you don't want the slider scales while window resizes
                    // NR: Commenting this code as it causes dimension issues. Need to re work on Responsiveness
	                //var ScaleSlider = function () {
	                //    var parentWidth = slider.$Elmt.parentNode.clientWidth;
	                //    if (parentWidth) {
	                //        slider.$ScaleWidth(parentWidth - 30);
	                //    }
	                //    else
	                //        window.setTimeout(ScaleSlider, 30);
	                //};
	                //ScaleSlider();

	                //$(window).bind("load", ScaleSlider);
	                //$(window).bind("resize", ScaleSlider);
	                //$(window).bind("orientationchange", ScaleSlider);
	                //responsive code end
	            }
	        }
	    }
	});