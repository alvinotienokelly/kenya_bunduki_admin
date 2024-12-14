import React from 'react';

const TaskDetails = ({ task }) => {
    return (
        <div className="space-y-4">
            <div><strong>Title:</strong> {task.title}</div>
            <div><strong>Description:</strong> {task.description}</div>
            <div><strong>Status:</strong> {task.status}</div>
            <div><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</div>
            <hr className='w-full my-2' />
            <div>
                <strong>Assigned To:</strong> {task.assignee?.name} ({task.assignee?.email})
            </div>
            <div>
                <strong>Created By:</strong> {task.creator?.name} ({task.creator?.email})
            </div>
            <hr className='w-full my-2' />
            <div><strong>Deal:</strong> {task.deal?.title}</div>
            <div><strong>Deal Sector:</strong> {task.deal?.sector}</div>
            <div><strong>Deal Region:</strong> {task.deal?.region}</div>
            <div><strong>Deal Stage:</strong> {task.deal?.deal_stage}</div>
        </div>
    );
};

export default TaskDetails;