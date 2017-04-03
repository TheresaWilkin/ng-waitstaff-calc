angular.module('app', [
        'ngMessages'
    ])
    .controller('myCtrl', function() {
      var vm = this;
      vm.price = '';
      vm.tax = '';
      vm.tipPerc = '';

      vm.subtotal = 0;
      vm.tip = 0;
      vm.total = 0;

      vm.tips = [];

      vm.submit = function(mealDetails) {
        if (!mealDetails.$valid) {
          return;
        }

        vm.price = parseFloat(vm.price);
        vm.tax = parseFloat(vm.tax);
        vm.tipPerc = parseFloat(vm.tipPerc);

        vm.subtotal = vm.price + (vm.tax * vm.price / 100);
        vm.tip = vm.price * vm.tipPerc / 100;
        vm.total = vm.subtotal + vm.tip;

        vm.tips.push(vm.tip);
      }

      vm.calcTips = function() {
        if (vm.tips.length === 0) {
          return 0;
        }
        return vm.tips.reduce((a,b) => a + b);
      }

      vm.calcAve = function() {
        if (vm.tips.length === 0) {
          return 0;
        }
        return vm.calcTips() / vm.tips.length;
      }

      vm.cancel = function(mealDetails) {
        vm.price = '';
        vm.tax = '';
        vm.tipPerc = '';
        mealDetails.$setPristine();
      }

      vm.reset = function(mealDetails) {
        vm.price = '';
        vm.tax = '';
        vm.tipPerc = '';

        vm.subtotal = 0;
        vm.tip = 0;
        vm.total = 0;

        vm.tips = [];

        mealDetails.$setPristine();
      }
    });
