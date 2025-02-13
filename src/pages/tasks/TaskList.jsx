import React, { useEffect, useState } from "react";
import { getUsertasks } from "../../services/api_service";
import toast from "react-hot-toast";
import Layout from "../../elements/Layout";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("incomplete"); // Tabs: 'incomplete' | 'complete'

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getUsertasks();
      setTasks(response.tasks);
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = (taskId) => {
    // Logic to mark task as complete (replace with API call if needed)
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.task_id === taskId ? { ...task, status: "Complete" } : task
      )
    );
    toast.success("Task marked as complete!");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    activeTab === "incomplete"
      ? task.status !== "Complete"
      : task.status === "Complete"
  );

  return (
    <Layout title="Tasks">
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "incomplete"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("incomplete")}
        >
          Pending Tasks
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "complete"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("complete")}
        >
          Complete Tasks
        </button>
      </div>

      <div className="w-full">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task.task_id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    Project : {task.deal.project}
                  </h3>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {task.description}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        task.status === "Complete"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Due Date:</strong>{" "}
                    {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No {activeTab === "incomplete" ? "incomplete" : "complete"} tasks
            available.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default TaskList;
