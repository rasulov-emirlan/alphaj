import { useState } from "react";
import CreateForm from "./components/create";
import List from "./components/list";
import UpdateForm from "./components/update";

const AdminComp = () => {
  const [tab, setTab] = useState<"create" | "update">("create");

  return (
    <main className="mx-auto max-w-[1260px] p-2">
      <div className="flex w-full justify-between gap-2 rounded-md bg-pink-200 p-2">
        <button
          className={`${
            tab === "create" ? "bg-blue-500" : "bg-blue-300"
          } w-full rounded-md px-2 py-1 text-white`}
          onClick={() => setTab("create")}
        >
          Create
        </button>
        <button
          className={`${
            tab === "update" ? "bg-blue-500" : "bg-blue-300"
          } w-full rounded-md px-2 py-1 text-white`}
          onClick={() => setTab("update")}
        >
          Update
        </button>
      </div>

      {tab === "create" && <CreateForm forceUpdate={() => {}} />}

      {tab === "update" && <UpdateForm />}

      <List />
    </main>
  );
};

export default AdminComp;
