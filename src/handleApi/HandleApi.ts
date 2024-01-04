interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
}

class HandleApi {
    private apiUrl: string;
    private authHeader: string;

    constructor(apiUrl: string, authHeader: string) {
        this.apiUrl = apiUrl;
        this.authHeader = authHeader;
    }

    private async handleResponse(response: Response): Promise<ApiResponse> {
        if (response.ok) {
            const data = await response.json();
            console.log('Data operation successful.');
            return { success: true, data };
        } else {
            const error = await response.text();
            console.error('Error in API operation:', error);
            return { success: false, error };
        }
    }

    private getRequestHeaders(): Headers {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authHeader,
        });
        return headers;
    }

    async post(endpoint: string, body: object): Promise<ApiResponse> {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
                method: 'POST',
                headers: this.getRequestHeaders(),
                body: JSON.stringify(body),
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error in API request:', error.message);
            throw error;
        }
    }

    async get(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
                method: 'GET',
                headers: this.getRequestHeaders(),
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error in API request:', error.message);
            throw error;
        }
    }

    async put(endpoint: string, body: object): Promise<ApiResponse> {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
                method: 'PUT',
                headers: this.getRequestHeaders(),
                body: JSON.stringify(body),
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error in API request:', error.message);
            throw error;
        }
    }
}

export default HandleApi;
