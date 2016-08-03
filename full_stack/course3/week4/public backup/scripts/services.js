'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
    
//      .service('menuFactory', function() {
//      .service('menuFactory', ['$http', 'baseURL', function($http,baseURL) {
        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {    
//            this.getDishes = function(){
//                return $http.get(baseURL+"dishes");
//            };

            this.getDishes = function(){
                return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
            };           
            
//            this.getDish = function (index) {
//                return $http.get(baseURL+"dishes/"+index);
//            };

            // that returns a selected promotion.
            this.getPromotions = function () {
                return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
           };                
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            
            console.log("services.js: Inside corporate factory");
            var corpfac = {};
//            var leadership = $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
//            var leadership = $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
            
            corpfac.getLeaders = function(){
                console.log("services.js: Inside get Leaders");
                return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
            };
            corpfac.getLeader = function (index) {
                console.log("Inside get Leader(index)");
                var leadership = $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
                return leadership[index];
            };
            return corpfac;
            
//            this.getLeaders = function (index) {
//                return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
//                return promotions[index];
//            }; 
    
    
    
        }])

        .service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {    
                this.getFeedbacks = function(){
                return $resource(baseURL+"feedback/:id",null, {'create':{method:'POST' }});
            };

        }])


;
