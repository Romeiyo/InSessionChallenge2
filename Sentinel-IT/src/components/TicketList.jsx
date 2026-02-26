import TicketCard from "./TicketCard";

function TicketList({ tickets }) {
    return (
        <div>
            <h2>Tickets</h2>
            {tickets.map((tic) => (
                <TicketCard key={tic.id} ticket={tic}/>
            ))}
        </div>
    );
}

export default TicketList;