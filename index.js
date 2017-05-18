/**
 * @author TMJP ENGINEERING
 * @copyright 2017
 * reference http://stackoverflow.com/questions/18692536/node-js-server-close-event-doesnt-appear-to-fire
 * , http://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
 * http://joseoncode.com/2014/07/21/graceful-shutdown-in-node-dot-js/
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
        // since we only want to run the call back once on any event that triggers
        let check = 0;

        // prevent the app to close instantly
        process.stdin.resume();

        // listen for close processes

        // on ctrl + c
        process.on('SIGINT', onEnd);
        // on app close
        process.on('exit', onEnd);
        // on uncaught exceptions
        process.on('uncaughtException', onEnd)
        // on process terminated/kill
        process.on('SIGTERM', onEnd);

        /**
         * if uncaught exception error has a value
         */
        function onEnd(err) {
            if (check) return;
            // if it is not yet run increment the checker to inform that this was already run
            check++;

            // run process before closing
            console.log('Before process end, running all registered callbacks');
            runCallbacks(err);
            console.log('All registered callbacks have been run, process will now end ...');
            // inform to continue to exit
            process.exit(0);
        }
    }
}
