
interface ApiResponse {
    // Define a common response format here
}

class HandleApi
{
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async post(endpoint: string, body: object): Promise<ApiResponse> {
        try {
            const response = await fetch(`${this.apiUrl}+${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();
                // Show success toast notification
                console.log('Data submitted successfully.');

                return data;
            } else {
                // If the response is not ok, throw an error
                throw new Error('Error occurred while submitting data');
            }
        } catch (error) {

            console.log(error.message);
            throw error;
        }
    }

    async get(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await fetch(`${this.apiUrl}+${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Show success toast notification
                console.log('Data fetched successfully.');

                return data;
            } else {
                // If the response is not ok, throw an error
                throw new Error('Error occurred while fetching data');
            }
        } catch (error) {
            // Handle errors, show toast notification
            console.log(error.message);
            throw error;
        }
    }

}

export default HandleApi;
