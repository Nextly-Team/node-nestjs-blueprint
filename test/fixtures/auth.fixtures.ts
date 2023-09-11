import { AuthLoginResponseDTO } from '../../src/auth/dto/auth.login.response.dto';
import fetch from 'node-fetch';

export const authLoginFixture = async (data, url, app): Promise<AuthLoginResponseDTO> => {
    const response =  await fetch(`${url}`, {method:"POST", body: JSON.stringify(data)})
    return await response.json();
    
}