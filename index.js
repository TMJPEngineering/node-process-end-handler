/**
 * @author TMJP ENGINEERING
 * @copyright 2017
 * reference http://stackoverflow.com/questions/18692536/node-js-server-close-event-doesnt-appear-to-fire
 */

module.exports = ProcessEndHandler();

function ProcessEndHandler() {
    var callbacks = [];
    var service = {
        include: include,
    };

    initialize();

    return service;

    function include(callback) {
        // push first the callback and wait for end process
        callbacks.push(callback);
    }

    function runCallbacks() {
        for (var key in callbacks) {
            callbacks[key]();
        }
    }

    function initialize() {
        // listen for close process
        process.on('SIGINT', function() {
            // run process before closing
            console.log('Before process end, running all registered callbacks');
            runCallbacks();
            console.log('All registered callbacks have been run, process will now end ...');
            process.exit(0);
        });
    }
}
