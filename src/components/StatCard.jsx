import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="card text-center p-3 shadow-sm flex-fill">
      <h6 className="text-muted">{title}</h6>
      <h4 className="mt-2 fw-bold">{value}</h4>
    </div>
  );
}
