var myApp = angular.module('ContactApp', []);
myApp.controller('ContactController', [
    '$scope',
    '$http',
    function(
    $scope,
    $http){
        
        var refreshContact = function(){
            $http.get('/contactList').success(function(response){
                $scope.contactList = response; 
            });
            $scope.contact = {};
            $scope.showUpdateContact = false;
            console.log($scope.showUpdateContact);
        };
        refreshContact();
        $scope.$watch('showUpdateContact',function(n,o){
           console.log('value changed'); 
            console.log($scope.showUpdateContact);
            console.log('11111111111111111111');
        });
        
        $scope.addContact = function(){
            $http.post('/contactList', $scope.contact).success(function(response){
                refreshContact();
            });
        };
        
        $scope.deleteContact = function(id){
            $http.delete('/contactList/' + id).success(function(response){
                refreshContact();
            })
        };
        
        $scope.editContact = function(id){
            console.log(id);
            $http.get('/contactList/' + id).success(function(response){
                $scope.contact = response; 
            });
            $scope.showUpdateContact = true;
        };
        
        $scope.updateContact = function(){
            $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
                refreshContact();
            });
        };
        
    }
]);