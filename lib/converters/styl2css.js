var debug = require('debug')('rigger'),
    path = require('path'),
    squirrel = require('squirrel'),
    _ = require('underscore');

module.exports = function(input, callback) {
    var opts = (this.opts || {}).stylus || {},
        renderer;
    
    squirrel('stylus', function(err, stylus) {
        if (err) {
            callback(new Error('Stylus not available'));
        }
        else {
            // create the renderer
            renderer = stylus(input, opts);
            
            // iterate through any plugins and use them
            (opts.plugins || []).forEach(function(plugin) {
                debug('loaded plugin: ', plugin);
                renderer.use(plugin(opts));
            });

            // render stylus (pass through opts)
            debug('running stylus conversion, opts = ', opts);
            renderer.render(callback);
        }
    });
};