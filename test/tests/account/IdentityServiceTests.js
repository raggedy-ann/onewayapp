describe('IdentityService', function () {
    beforeEach(module('app'));
    
    describe('isAuthenticated', function () {
        it('WHEN current user is set THEN returns true', inject(function (UserService, IdentityService) {
                //arrange
                var user = new UserService();
                IdentityService.setCurrentUser(user);
                
                //act
                var result = IdentityService.isAuthenticated();
                
                //aasert
                expect(result).to.be.true;
            }));
        it('WHEN current user is not set THEN returns false', inject(function (IdentityService) {
                //arrange
                
                //act
                var result = IdentityService.isAuthenticated();
                
                //aasert
                expect(result).to.be.falsey;
            }));
    });

    describe('isAuthorized', function () {
        it('WHEN role is in roles list THEN returns true', inject(function (UserService, IdentityService) {
                //arrange
                var user = new UserService();
                user.roles = ['admin'];
                IdentityService.setCurrentUser(user);
                
                //act
                var result = IdentityService.isAuthorized('admin');
                
                //assert
                expect(result).to.be.true;
            }));
        it('WHEN role is not in roles list THEN returns false', inject(function (UserService, IdentityService) {
                //arrange
                var user = new UserService();
                user.roles = ['reader'];
                IdentityService.setCurrentUser(user);
                
                //act
                var result = IdentityService.isAuthorized('admin');
                
                //assert
                expect(result).to.be.falsey;
            })); 
    });
});