import React, {useState} from 'react';
import IssueContainer from './IssueContainer/IssueContainer'; // Import the IssueContainer component
import './Issues.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const Issues = () => {
    // Initial state to store a list of issues
    const [issues, setIssues] = useState([{id: 1, content: 'This is the first issue.'}]);

    // Function to handle creating a new issue
    const addNewIssue = () => {
        const newIssue = {id: issues.length + 1, content: ''}; // New issue with blank content
        setIssues([...issues, newIssue]); // Add new issue to the state
    };

    const deleteIssue = (id) => {
        setIssues((prevIssues) => prevIssues.filter((issue) => issue.id !== id));
    };


    return (
        <div className="issues-container">
            <div className='header-issue'>Issues</div>

            {/* Render each issue using the IssueContainer component */}
            {issues.map((issue) => (
                <IssueContainer key={issue.id} issueNumber={issue.id} onDelete={() => deleteIssue(issue.id)}/>
            ))}

            <div className="btn-container" onClick={addNewIssue}>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            {/* Button to add a new issue */}

        </div>

    );
};

export default Issues;
