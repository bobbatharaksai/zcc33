import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, Table, Tag, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Home () {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/tickets")
        .then((res) => res.json())
        .then((data) => {
            if (data.error)
                alert(data.error);
            else
                setData(data.tickets)
        }).then(() => setLoading(false))
        .catch((error) => {console.log(error); alert("Server Down!")})
    }, []);

    if (isLoading) {
        return (
            <div className="spinWidget">
                <Spin size="large"/>
            </div>
        );
    }

    const columns = [
    {
        title: 'Requester ID',
        dataIndex: 'requester_id',
        key: 'requester_id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => <Tag color='green'>{text.toUpperCase()}</Tag>,
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
        <>
            {tags.map(tag => {
            let color = tag.length > 5 ? 'blue' : 'volcano';
            return (
                <Tag color={color} key={tag}>
                {tag.toUpperCase()}
                </Tag>
            );
            })}
        </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
        <Space size="middle">
            <Button >View</Button>
        </Space>
        ),
    },
    ];

    const onClickRow=(record)=>{
        return {
            onClick: () => {
              let path = `/tickets/${record.id}`;
              navigate(path,
                {state: record}
             );
            },
        };
    }

    return (
        <div className="ticketGrid">
            <Table columns={columns} rowKey="id" onRow={(record) =>onClickRow(record)} bordered ={true} dataSource={data} />
        </div>
    );

}
