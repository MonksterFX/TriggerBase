import convict = require('convict');

export let config = convict({
  env: {
    doc: 'The application enviroment',
    format: ['dev', 'production'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'Express port',
    format: 'port',
    default: 3000,
    env: 'SERVER_PORT',
  },
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./src/config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });
