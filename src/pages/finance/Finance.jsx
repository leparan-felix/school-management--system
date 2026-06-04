import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import InvoicesPage from "./Invoices";
import ReceiptsPage from "./Receipts";
import TrackingPage from "./Tracking";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("invoices");

  const renderContent = () => {
    switch (activeTab) {
      case "invoices":
        return <InvoicesPage />;
      case "receipts":
        return <ReceiptsPage />;
      case "tracking":
        return <TrackingPage />;
      default:
        return <InvoicesPage />;
    }
  };

  return (
    <Layout>
      <div className="finance-container">
        <h1 className="page-title">Finance Management</h1>

        <div className="finance-tabs">
          <button
            className={`tab-btn ${activeTab === "invoices" ? "active" : ""}`}
            onClick={() => setActiveTab("invoices")}
          >
            Invoices
          </button>
          <button
            className={`tab-btn ${activeTab === "receipts" ? "active" : ""}`}
            onClick={() => setActiveTab("receipts")}
          >
            Receipts
          </button>
          <button
            className={`tab-btn ${activeTab === "tracking" ? "active" : ""}`}
            onClick={() => setActiveTab("tracking")}
          >
            Tracking
          </button>
        </div>

        <div className="finance-content">{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default Finance;
