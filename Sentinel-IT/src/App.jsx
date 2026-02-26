import { useState } from 'react';
import Layout from './components/Layout';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import {useTickets} from './hooks/useTickets';

function App() {
  const { tickets, isLoading, addTicket } = useTickets();

  return (
    <Layout>
      <TicketForm onAdd={addTicket}/>

      {isLoading ? (
        <p className="loading">Fetching history...</p>
      ) : (
        <TicketList tickets={tickets} />
      )}
    </Layout>
  )
}

export default App
