import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ticketService, fetchAllTickets } from '..Services/ticketService';

export function useTickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState([]);
    const [retryCount, setRetryCount] = useState(0);

    const fetchTickets = useCallback(async (signal) => {
        try {
            setIsLoading(true);
            setError(null);

            try{
                const data = await ticketService.getTickets({signal});
                setTickets(data);
            } catch (apiError) {

                if (axios.isCancel(apiError)) {
                    console.log('Fetch cancelled:', apiError.message);
                    return;
                }

                if (apiError.code === 'ECONNABORTED') {
                    throw new Error('Request timeout - server took too long to respond. Please try again.');
                }

                if (apiError.message === 'Network Error') {
                    throw new Error('Network error - unable to reach the server. Please check your connection.');
                }

                if (apiError.response) {
                    throw new Error(`Server error (${apiError.response.status}): ${apiError.response.data?.message || 'Something went wrong'}`);
                }

                console.warn('API failed, falling back to mock data:', apiError);
        
                // Fallback to mock data simulation
                const mockData = await fetchAllTickets();
                setTickets(mockData);
            }

        } catch (err) {
            console.error('Failed to fetch Tickets:', err);
            setError(err.message || 'Failed to load tickets');

            const savedTickets = localStorage.getItem('tickets');
            if (savedBookings) {
                setBookings(JSON.parse(savedTickets));
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        fetchTickets(signal);

        return() => {
            controller.abort('Component unmounted - request cancelled');
        }
    }, [fetchTickets, retryCount]);

    useEffect(() => {
        if (tickets.length > 0) {
            localStorage.setItem('tickets', JSON.stringify(tickets));
        }
    }, [tickets]);

    const addTicket = async (newTicket) => {
        try {
            setError(null);

            let createdTicket;
            try {
                createdTicket = await ticketService.createTicket({
                    ...newTicket,
                    status: 'Pending'
                });
            } catch (apiError) {

                if (axios.isCancel(apiError)) {
                    console.log('Fetch cancelled:', apiError.message);
                    return;
                }

                if (apiError.code === 'ECONNABORTED') {
                    throw new Error('Request timeout - server took too long to respond. Please try again.');
                }

                if (apiError.message === 'Network Error') {
                    throw new Error('Network error - unable to reach the server. Please check your connection.');
                }

                if (apiError.response) {
                    throw new Error(`Server error (${apiError.response.status}): ${apiError.response.data?.message || 'Something went wrong'}`);
                }
                
                console.warn('API create failed, using local creating:', apiError);

                createdTicket = {
                    id: Date.now(),
                    ...newTicket,
                    status: 'Pending'
                };
            }

            setTickets(prev => [...prev, createdTicket]);
            return createdTicket;
        } catch (err) {
            console.error('Failed to add Ticket:', err);
            setError(err.message || 'Failed to add Ticket');
            throw err;
        }
    };

    const retryFetch = () => {
        setRetryCount(prev => prev + 1);
    };

    const refreshTickets = () => {
        fetchTickets();
    };

    return {
        tickets,
        isLoading,
        error,

        addTicket,
        retryFetch,
        refreshTickets,
    }
}

export default useTickets;