let primeList = new Vue({
    el: '#app',
    data: {
        primeList: [],
        storage: []
    },
    mounted: function () {
        if (!localStorage.getItem('primes')) {
            localStorage.setItem('primes', JSON.stringify([2, 3, 5]));
        }

        this.storage = JSON.parse(localStorage.getItem('primes'));
    },
    methods: {
        getPrimes: function (max, min) {

            max = parseInt(max) ? max : 0;
            min = parseInt(min) ? min : 0;

            [max, min] = max > min ? [max, min] : [min, max];

            this.primeList = this.numList(max, min);
        },
        checkRange: function (num) {

            if (num > Math.max(...this.storage)) {
                this.setNums(num);
            }

        },
        // 回傳使用者指定範圍的質數
        numList: function (max, min) {
            min = min < 2 ? 2 : min;

            let list = [];
            let tmp = [];

            for (i = min; i < max; i++) {

                if (tmp.length >= 10) {
                    list.push(tmp);
                    tmp = [];
                }

                if (this.isPrime(i)) {
                    tmp.push(i);
                }
            }

            list.push(tmp);

            return list;
        },
        // 批次設置質數
        setNums: function (num) {

            for (let i = 2; i < num; i++) {
                this.setPrimes(i);
            }

        },
        // 建立質數表
        setPrimes: function (num) {
            let list = JSON.parse(localStorage.getItem('primes'));

            if (!this.isPrime(num)) {
                return;
            }

            if (!list.contains(num)) {
                list.push(num);

                localStorage.setItem('primes', JSON.stringify(list));
                this.storage = list;
            }
        },
        // 判斷是否為質數
        isPrime: function (num) {
            let list = JSON.parse(localStorage.getItem('primes'));

            for (let item of list) {
                // 是否被自己以外的質數整除
                if (num !== item && num % item === 0) {
                    return false;
                }
            }

            return true;
        }
    },
});

// 確認多維陣列內容
Array.prototype.contains = function (item) {
    let result = false;

    for (let i of this) {

        if (i instanceof Array) {
            if (i.contains(item)) {
                result = true;
                break;
            }
        }

        else if (i === item) {
            result = true;
        }
    }

    return result;
}