angular.module('app').value('ToastrService', toastr);

angular.module('app').factory('NotifierService', function (ToastrService) {
    return {
        notifySuccess: function (msg) {
            ToastrService.success(msg);
        },
        notifyWarning: function (msg){
            ToastrService.warning(msg);
        }
    }
})