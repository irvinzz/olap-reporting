var _ = _ || {};

_.mixin({
    cartesianProductOfArray: function (a) {
        var b = {};
        for (var i = 0; i < a.length; i++) {
            b[i] = a[i];
        }
        return _.reduce(b, function(mtrx, vals) {
            return _.reduce(vals, function(array, val) {
                return array.concat(
                _.map(mtrx, function(row) {
                    return row.concat(val);
                }));
            }, []);
        }, [
            []
        ]);
    },
    cartesianProductOf: function() {
        return _.reduce(arguments, function(mtrx, vals) {
            return _.reduce(vals, function(array, val) {
                return array.concat(
                _.map(mtrx, function(row) {
                    return row.concat(val);
                }));
            }, []);
        }, [
            []
        ]);
    }
});
