const async = require('async');
const _     = require('underscore');

exports.formQuery = function (request, callback) {
    let globalObject = {};
    let query        = {
        $and: []
    };

    if (request.filters && request.filters.length) {
        _.each(request.filters, (filter) => {
            if (filter.type == 'FIXED') {
                query.$and.$or = [];
                if (filter.value && filter.value.length) {
                    _.each(filter.value, (values) => {
                        let obj         = {};
                        obj[filter.key] = values.value;
                        query.$and.$or.push(obj);
                    });
                }
            }
        });
    }

    if (request.search && request.search.length) {
        _.each(request.search, (searchOjb) => {
            let obj                    = {};
            var testObj = new RegExp(searchOjb.value);
            obj[searchOjb.key]         = {
                $regex: testObj
            }
            globalObject.searchOjb     = {};
            globalObject.searchOjb.key = searchOjb.value;
            query.$and.push(obj);
            console.log(obj)
        });
    }
    console.log("query", JSON.stringify(query));
    return callback(null, query);
}
