import React, {useState} from 'react';
import './IssueContainer.css';
import IssueBlock from "../IssueBlock/IssueBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons"; // External CSS for styling

const IssueContainer = ({issueNumber, InitContent, onDelete}) => {
    const [content, setContent] = useState(InitContent);
    const [editOrShow, setEditOrShow] = useState(true);

    return (
        <div className="issue-container">
            <div className="issue-header">
                <button className="custom-btn btn-2" onClick={() => setEditOrShow(!editOrShow)}>
                    {editOrShow ? "Edit" : "Save"}
                </button>
                <div>
                    <span>#{issueNumber}</span>
                    <span
                        style={
                            {
                                cursor: "pointer",
                                color: "rgb(255, 0, 0, 0.5)",
                                marginLeft: "10px"
                            }
                        }
                        onClick={onDelete}
                    >
                        <FontAwesomeIcon icon={faClose}/>
                    </span>
                </div>

            </div>
            <IssueBlock
                edit_or_show={editOrShow}
                content={content}
                setContent={setContent}
            />
        </div>
    );
}

export default IssueContainer;
