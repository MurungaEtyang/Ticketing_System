import HandleApi from './HandleApi.ts';

class ApiServices {
    private handleApi: HandleApi;
    private apiUrl: string = 'http://localhost:8080';

    constructor() {
        this.handleApi = new HandleApi(this.apiUrl, this.getAuthorization());
    }

    private getAuthorization(): string {
        return 'Basic ' + localStorage.getItem('email_password_credentials') || '';
    }

    /* start get api*/
    /*login users*/
    async allUsers() {
        const apiEndpoint = '/api/v1/users/management';
        try {
            return await this.handleApi.get(apiEndpoint);
        } catch (error) {
            console.error('Error fetching roles department:', error);
            return { success: false, error };
        }
    }

    /* Fetch all department */
    async fetchRolesDepartmentAuthorities() {
        const apiEndpoint = '/api/v1/authority/all';
        try {
            return await this.handleApi.get(apiEndpoint);
        } catch (error) {
            console.error('Error fetching roles department:', error);
            return { success: false, error };
        }
    }

    /*Downgrade user role*/
    async demoteUserRole (email: any, role: any){
        const apiEndpoint =
            '/api/v1/users/management/downgrade?username='+ email + '&role_to_remove=' + role;

        try {
            return await this.handleApi.get(apiEndpoint);
        }catch (error) {
            console.error('Error during user registration:', error);
            return { success: false, error };
        }

    }

    async getAllTickets (){
        const apiEndpoint = '/api/v1/tickets/report';

        try {
            return await this.handleApi.get(apiEndpoint);
        }catch (error) {
            console.error('Error during user registration:', error);
            return { success: false, error };
        }

    }

    /*end of get api*/

    /*start of post api*/
    /* Registration of users */
    async registrationOfUsers(department: string, email: string, password: string) {
        const apiEndpoint = '/api/v1/users/registration/register';
        const data = {
            username: email,
            password,
            role: department,
        };

        try {
            return await this.handleApi.post(apiEndpoint, data);
        } catch (error) {
            console.error('Error during user registration:', error);
            return { success: false, error };
        }
    }

    /*verification of users*/
    async verificationOfUsers(email: string, token: string){
        const apiEndpoint =
            '/api/v1/users/registration/activate?username='+ email +'&activation_token='+ token
        const data = {
            activation_token: token,
            username: email,
        }
        try {
            return await this.handleApi.post(apiEndpoint, data);
        }catch (error) {
            console.error('Error during user registration:', error);
            return { success: false, error };
        }
    }

    /*end of post api*/

    /*START PUT API*/

    async elevateUserRole (email: string, role: string){
        const apiEndpoint = '/api/v1/users/management/elevate?authority='+ role +
            '&username=' + email;

        const data = {
            username: email,
            role_to_remove: role
        }
        try {
            return await this.handleApi.put(apiEndpoint, data);
        }catch (error) {
            console.error('Error during user registration:', error);
            return { success: false, error };
        }

    }

    /*END OF PUT API*/
}

export default ApiServices;
