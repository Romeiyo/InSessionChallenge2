import { useState } from "react";
import Button from "./Button";

function TicketForm({ onAdd }) {
    const [employeeName, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [issue, setIssue] = useState("");
    const [priority, setPriority] = useState("");

    const formatDateForInput = (dateObject) => {
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTicket = {
            id: Date.now(),
            employeeName,
            date: formatDateForInput(date),
            issue,
            priority
        }

        onAddTicket(newTicket);

        setName("");
        setDate(new Date());
        setIssue("");
        setPriority("");
    };

    return (
        <form className="ticket-form" onSubmit={handleSubmit}>
            <h3>
                Create a New Ticket
            </h3>

            <div className="form-row">
                <label>Employee Name:</label>
                <input 
                    type="text"
                    id="employeeName"
                    value={employeeName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                    required 
                />
            </div>

            <div className="form-row">
                <label>Date:</label>
                <input 
                    id="date"
                    type="date" 
                    value={formatDateForInput(date)}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    required
                />
            </div>

            <div className="form-row">
                <label>Issue:</label>
                <input 
                    type="text"
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Enter your Problem"
                    required 
                />
            </div>

            <div className="form-row">
                <label>Priority</label>
                <select 
                    id="priority"
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    
                </select>
            </div>

            <div className="form-row">
                <Button label="Create Ticket"/>
            </div>

        </form>
    );
}

export default TicketForm;