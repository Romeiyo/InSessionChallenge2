import apiClient from "../api/apiClient";
import initialTickets from "../data/mockdata";

export const fetchAllTickets = () => {
    return new Promise((resolve) => {
        const delay = 2000;

        setTimeout(() => {
            resolve(initialTickets);
        }, delay);
    });
};

export const ticketService = {
    async getTickets() {
        const response = await apiClient.get('/tickets');
        return response.data;  
    },

    async createTicket(ticketData) {
        const response = await apiClient.post('/tickets', ticketData);
        return response.data;
    }
};