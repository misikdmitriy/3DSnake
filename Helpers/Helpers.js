var Helpers = {
    throwIfNotPositive: function(num) {
        if (num <= 0) {
            throw new Error(num + " is negative");
        }
    },

    throwIfNotInteger: function(num) {
        if (!Number.isInteger(num)) {
            throw new Error(num + " is not integer");
        }
    },

    throwIfLess: function(num, comparer) {
        if (num < comparer) {
            throw new Error(num + " is less than " + comparer);
        }
    },

    throwIfGreater: function(num, comparer) {
        if (num > comparer) {
            throw new Error(num + " is greater than " + comparer);
        }
    },

    throwIfStrictEqual: function(num, comparer) {
        if (num === comparer) {
            throw new Error("values are equal (" + num + ")");
        }
    }
};