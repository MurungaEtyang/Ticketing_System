import HandleApi from './HandleApi.ts';

class ApiServices {
    private HandleApi: HandleApi;
    private apiUrl: string = 'http://localhost:8080/api/v1';

    constructor() {
        this.HandleApi = new HandleApi(this.apiUrl);
    }

    /*fetch all department*/
    async fetchRolesDepartment() {
        const apiEndpoint = '/authority/all';
        try {
            return await this.HandleApi.get(apiEndpoint);
        } catch (error) {
            console.error('Error fetching roles department:', error);
            return error;
        }
    }

    /*Registration of users*/
    async RegistrationOfUsers(department: string, email: string, password: string) {
        const apiEndpoint = '/users/registration/register';
        const data = {
            username: email,
            password: password,
            role: department,
        };

        try {
            return await this.HandleApi.post(apiEndpoint, data);
        } catch (error) {
            console.error('Error during user registration:', error);
            return  error;
        }
    }
}

export default ApiServices;