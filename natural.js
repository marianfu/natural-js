module.exports = (function () {
    
    var _ = require('lodash');
    var Synonyms = {
        '{': ['entonces'],
        '}': ['fin'],
        'var': ['variable'],
        '[]': ['lista']
    };

    var Natural = function() { }

    function _transformSynonym(object, value) {
        if (_.has(object, value))
            return value;
        for (var key in object) {
            for(var i = 0, length = object[key].length; i < length; i++)
                if (object[key][i] == value) {
                    return key;
                }
        }
        return value;
    }

    Natural.transformSynonym = function (value) {
        return _transformSynonym(Synonyms, value);
    }

    Natural.splitSentence = function(sentence) {
        return _.split(sentence, ' ');
    }

    Natural.transform = function(sentence) {
        var code = this.splitSentence(sentence);
        for(var i = 0; i < code.length; i++) {
            code[i] = this.transformSynonym(code[i]);
        }
        return code.join(' ');
    }

    return Natural;
})();
