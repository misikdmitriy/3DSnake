var Helpers = {
    throwIfNotPositive: function(num) {
        if (num <= 0) {
            throw new Error("number is negative");
        }
    },

    throwIfNotInteger: function(num) {
        if (!Number.isInteger(num)) {
            throw new Error("number is not integer");
        }
    }
};