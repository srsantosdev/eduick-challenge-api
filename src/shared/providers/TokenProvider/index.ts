import { container } from 'tsyringe';
import { JWTTokenProvider } from './implementations/JWTTokenProvider';

container.registerSingleton('TokenProvider', JWTTokenProvider);
