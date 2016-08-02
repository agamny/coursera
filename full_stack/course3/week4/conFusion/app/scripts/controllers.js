'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            //$scope.dishes= menuFactory.getDishes();

//            $scope.showMenu = false;
//            $scope.message = "Loading ...";
//            $scope.dishes= {};
//            menuFactory.getDishes()
//            .then(
//                function(response) {
//                    $scope.dishes = response.data;
//                    $scope.showMenu = true;
//                },
//                function(response) {
//                    $scope.message = "Error: "+response.status + " " + response.statusText;
//                }
//            );            

//            $scope.showMenu = true;
//            $scope.message = "Loading ...";
//            $scope.dishes = menuFactory.getDishes().query();
            
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            //var dish = menuFactory.getDish(parseInt($stateParams.id,10));
            
            //$scope.dish = dish;
//            $scope.dish = {};
//            $scope.showDish = false;
//            $scope.message="Loading ...";
            
            
//            menuFactory.getDish(parseInt($stateParams.id,10))
//            .then(
//                function(response){
//                    $scope.dish = response.data;
//                    $scope.showDish=true;
//                },
//                function(response) {
//                    $scope.message = "Error: "+response.status + " " + response.statusText;
//                }
//            );
            
//            $scope.showDish = true;   
//            $scope.message="Loading ...";
//            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});
            
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
            
            
            
        }])

//      .controller('DishCommentController', ['$scope', function($scope) {
        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
//            $scope.submitComment = function () {
//                
//                $scope.mycomment.date = new Date().toISOString();
//                console.log($scope.mycomment);
//                
//                $scope.dish.comments.push($scope.mycomment);
//                
//                $scope.commentForm.$setPristine();
//                
//                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
//            };
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
            
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function($scope, $stateParams, menuFactory, corporateFactory) {     
            console.debug("Inside index controller");

//            menuFactory.getDish(0)
//            .then(
//                function(response){
//                    $scope.dish = response.data;
//                    $scope.showDish = true;
//                },
//                function(response) {
//                    $scope.message = "Error: "+response.status + " " + response.statusText;
//                }
//            );
            
//            var dish = menuFactory.getDish(0);
//            $scope.dish = dish;
            
//            $scope.showDish = true;
//            $scope.message="Loading ...";
//            $scope.dish = menuFactory.getDishes().get({id:0});
            
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            //var promotion = menuFactory.getPromotion(parseInt($stateParams.id,10));
            var promotion = menuFactory.getPromotion(0);
            $scope.promotion = promotion;    
            
            var leaders = corporateFactory.getLeaders();
            console.debug("Get Leaders being invoked from index controller");
            $scope.leaders = leaders;
            
        }])


        .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {
            var leaders = corporateFactory.getLeaders();
            console.debug("Get Leaders being invoked from about controller");
            $scope.leaders = leaders;
            
        }])


;