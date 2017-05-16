# node-process-end-handler
add/run process before the node intentionally/unintentionally ended

## Installation

    npm install node-process-end-handler

## Usage
- Require the library
```
var processEnd = require('node-process-end-handler');
```

- And include the process you want to run before the node exits.

```
processEnd.include(function(){
// your process here
});
```

That's all and you can test it by running and closing your node.

## Support
- This was tested on ```node version 7.*```

## Contributors
- [Rej Mediodia](https://github.com/rejtg21)
- TMJP ENGINEERS
## License
[MIT](https://github.com/TMJPEngineering/node-process-end-handler/blob/master/LICENSE)
