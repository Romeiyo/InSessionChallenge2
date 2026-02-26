function TicketCard({ ticket }) {
    return (
        <div className="tic-card">
            <h3>{ticket.employeeName}</h3>
            <p>
                <strong>Date:</strong>
                {ticket.date}
            </p>
            <p>
                <strong>Issue:</strong>
                {ticket.issue}
            </p>
            <p>
                <strong>Priority:</strong>
                {ticket.priority}
            </p>
        </div>
    );
}

export default TicketCard;