import React, { useEffect, useState } from "react";
import { getUsertasks } from "../../services/api_service";
import toast from "react-hot-toast";
import Layout from "../../elements/Layout";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("incomplete"); // Tabs: 'incomplete' | 'complete'
  const [selectedProject, setSelectedProject] = useState("");

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
  const uniqueProjects = [...new Set(tasks.map((task) => task.deal.project))];

  const filteredTasks = tasks
    .filter((task) =>
      activeTab === "incomplete"
        ? task.status !== "Complete"
        : task.status === "Complete"
    )
    .filter((task) =>
      selectedProject ? task.deal.project === selectedProject : true
    );

  return (
    <Layout title="Tasks">
      <h1 className="text-2xl font-bold mb-4 mt-4">Tasks</h1>
      <div className="relative mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-[50%] pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm === "") {
              fetchTasks();
            } else {
              setTasks((prevTasks) =>
                prevTasks.filter((task) =>
                  task.title.toLowerCase().includes(searchTerm)
                )
              );
            }
          }}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1118 10.5a7.5 7.5 0 01-1.35 6.15z"
          />
        </svg>
        <select
          className="w-[50%] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">All Projects</option>
          {uniqueProjects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "incomplete"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("incomplete")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "complete"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("complete")}
        >
          Complete
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
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Project: {task.deal.project}
                    </h3>
                    <p className="text-sm">
                      {/* <strong>Status:</strong>{" "} */}
                      <span
                        className={`${
                          task.status === "Complete"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        <strong>{task.status}</strong>
                      </span>
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {task.description}
                  </p>
                  {/* <p className="text-sm mb-2">
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
                  </p> */}
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
