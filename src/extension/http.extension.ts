import axios from 'axios';

class HttpExtension implements Extension {
  name = 'TB-HTTP-01';

  initialize(): Promise<this> {
    throw new Error('Method not implemented.');
  }

  async execute(message: JSON): Promise<any> {
    return axios.post('http://localhost:3000/test', message);
  }
}
