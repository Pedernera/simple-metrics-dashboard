import { mockData } from "../../data/mock";

export default function DashboardPage() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Simple Metrics Dashboard</h1>
      <p>Registros: {mockData.length}</p>
    </div>
  );
}

