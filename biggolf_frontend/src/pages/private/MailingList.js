import React, { useState, useEffect } from 'react'
import emailsService from '../../services/emailsService';
const MailingList = (props) => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        retrieveEmails();
    }, [])

    const retrieveEmails = () => {
        emailsService.getAll()
            .then(response => {
                console.log(response.data);
                setEmails(response.data.emails);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return(
        <div>
            {emails.map((email) => {
                return(
                    <h6>{email.email}</h6>
                )
            })}
        </div>
    )
}
export default MailingList;