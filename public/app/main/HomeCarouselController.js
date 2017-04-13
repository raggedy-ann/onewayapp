angular.module('app').controller('HomeCarouselController', function ($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function (slide) {
        slides.push({
            image: 'img/slides/' + slide + '.jpg',
            text: 'Some text here for slide ' + slide
        });
    };
    for (var i = 0; i < 7; i++) {
        $scope.addSlide(i + 1);
    }
});