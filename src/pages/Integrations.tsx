import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  Square,
  Slack,
  Cloud,
  Github,
  FileImage,
  Palette,
  Image,
  PenTool,
} from "lucide-react";
import XMPieConfigModal from "../components/XmpieConfigModal";
interface IntegrationItem {
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  enabled: boolean;
}

const integrations: IntegrationItem[] = [
  {
    name: "XMPie",
    description: "Personalized communication and cross-media campaigns",
    icon: FileImage,
    color: "#FF6600",
    enabled: false,
  },
  {
    name: "Adobe WebBanner",
    description: "Create and manage web banners with Adobe tools",
    icon: FileImage,
    color: "#FF0000",
    enabled: false,
  },
  {
    name: "Chili",
    description: "Online document editing and automation",
    icon: Palette,
    color: "#00C13F",
    enabled: false,
  },
  {
    name: "DaVinci",
    description: "Professional video editing and color correction",
    icon: PenTool,
    color: "#8E44AD",
    enabled: false,
  },
  {
    name: "Google WebBanner",
    description: "Create and manage web banners with Google tools",
    icon: Image,
    color: "#4285F4",
    enabled: false,
  },
  {
    name: "Square",
    description: "Payment processing and financial services",
    icon: Square,
    color: "#3E4348",
    enabled: true,
  },
  {
    name: "Slack",
    description: "Team communication and collaboration",
    icon: Slack,
    color: "#E01E5A",
    enabled: false,
  },
  {
    name: "Dropbox",
    description: "File hosting and cloud storage",
    icon: Cloud,
    color: "#0061FF",
    enabled: false,
  },
  {
    name: "Github",
    description: "Version control and code collaboration",
    icon: Github,
    color: "#24292E",
    enabled: true,
  },
];

const IntegrationsPage: React.FC = () => {
  const [enabledIntegrations, setEnabledIntegrations] = useState(
    integrations.reduce((acc, integration) => {
      acc[integration.name] = integration.enabled;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [isXMPieModalOpen, setIsXMPieModalOpen] = useState(false);

  const handleToggle = (name: string) => {
    setEnabledIntegrations((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleConfigure = (name: string) => {
    if (name === "XMPie") {
      setIsXMPieModalOpen(true);
    } else {
      // Handle other integrations' configuration
      console.log(`Configure ${name}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Settings", path: "/settings" },
          { name: "Integrations" },
        ]}
      />
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Integrations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="bg-white overflow-hidden shadow-sm rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <integration.icon
                className="h-8 w-8 mb-4"
                style={{ color: integration.color }}
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {integration.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {integration.description}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleConfigure(integration.name)}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Configure
                </button>
                <label className="switch-sm">
                  <input
                    type="checkbox"
                    checked={enabledIntegrations[integration.name]}
                    onChange={() => handleToggle(integration.name)}
                  />
                  <span className="sr-only">Enable {integration.name}</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isXMPieModalOpen && (
        <XMPieConfigModal onClose={() => setIsXMPieModalOpen(false)} />
      )}
    </div>
  );
};

export default IntegrationsPage;
