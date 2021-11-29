import './App.css';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Descriptions, Badge, Tag, Spin } from 'antd';

export default function Ticket (props) {
    const [ticketData, setTicketData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    let id = location.pathname.split('/').at(-1);

    useEffect(() => {
        setTicketData(location.state);
        if (ticketData === null)
            fetch("/tickets/" + id)
            .then((res) => res.json())
            .then((ticketData) => {
                if (ticketData.error)
                    alert(ticketData.error);
                else
                    setTicketData(ticketData.ticket)})
            .then(() => setLoading(false))
            .catch((error) => {console.log(error); alert("Server Down!")})
    }, []);

    if (isLoading) {
        return (
            <div className="spinWidget">
                <Spin size="large"/>
            </div>
        );
    }

    return (
        (ticketData ? <div className="ticketItem">
                        <Descriptions title="Ticket Information" bordered column={6}>
                            <Descriptions.Item label="Requester" span={2}>{ticketData.requester_id}</Descriptions.Item>
                            <Descriptions.Item label="Assignee ID" span={2}>{ticketData.assignee_id}</Descriptions.Item>
                            <Descriptions.Item label="Group ID" span={2}>{ticketData.group_id}</Descriptions.Item>
                            <Descriptions.Item label="Status" span={2}> <Badge status="processing" text="open" /></Descriptions.Item>
                            <Descriptions.Item label="Created" span={2}>{ticketData.created_at}</Descriptions.Item>
                            <Descriptions.Item label="Last Modified" span={2}>{ticketData.updated_at}</Descriptions.Item>
                            <Descriptions.Item label="Subject" span={4}>{ticketData.subject}</Descriptions.Item>

                            <Descriptions.Item label="Tags">
                                {ticketData.tags.map(tag => {
                                let color = tag.length > 5 ? 'blue' : 'volcano';
                                return (
                                    <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                    </Tag>
                                );
                                })}
                            </Descriptions.Item>
                            <Descriptions.Item label="Priority">{ticketData.priority === null ? "None" : ticketData.priority}</Descriptions.Item>
                            <Descriptions.Item label="Description" span={10}> {ticketData.description}</Descriptions.Item>
                        </Descriptions>
                     </div> : <div></div>)
    );
}
