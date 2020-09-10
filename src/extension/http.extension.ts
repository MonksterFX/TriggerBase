import axios, { AxiosResponse } from 'axios';
import { Extension } from '../shared/extension';

export class SimpleHttpExtension implements Extension {
  name = 'simple http executor';

  initialize(): Promise<this> {
    throw new Error('Method not implemented.');
  }

  async execute(message: JSON): Promise<AxiosResponse> {
    return axios.post('http://localhost:3000/mirror', message);
  }
}
