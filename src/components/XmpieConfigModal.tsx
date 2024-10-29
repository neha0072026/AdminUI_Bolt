import React, { useState } from "react";
import { X } from "lucide-react";

interface XMPieConfig {
  server: string;
  customerName: string;
  userName: string;
  password: string;
  baseNetworkPath: string;
  baseNetworkUserId: string;
  baseNetworkPassword: string;
  useSampleFile: string;
  printJobPriorityNumber: string;
}

interface XMPieConfigModalProps {
  onClose: () => void;
}

const XMPieConfigModal: React.FC<XMPieConfigModalProps> = ({ onClose }) => {
  const [environment, setEnvironment] = useState<"staging" | "live">("staging");
  const [applyToLive, setApplyToLive] = useState(false);
  const [config, setConfig] = useState<Record<"staging" | "live", XMPieConfig>>(
    {
      staging: {
        server: "10.113.73.175",
        customerName: "",
        userName: "purfinacc",
        password: "",
        baseNetworkPath: "\\MCW-APP-PTXMP01\\",
        baseNetworkUserId: "xmpieservice",
        baseNetworkPassword: "",
        useSampleFile: "No",
        printJobPriorityNumber: "",
      },
      live: {
        server: "10.113.73.175",
        customerName: "",
        userName: "purfinacc",
        password: "",
        baseNetworkPath: "\\MCW-APP-PTXMP01\\",
        baseNetworkUserId: "xmpieservice",
        baseNetworkPassword: "",
        useSampleFile: "No",
        printJobPriorityNumber: "",
      },
    }
  );

  const handleChange = (field: keyof XMPieConfig, value: string) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [environment]: {
        ...prevConfig[environment],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyToLive) {
      setConfig((prevConfig) => ({
        ...prevConfig,
        live: { ...prevConfig[environment] },
      }));
    }
    // TODO: Implement save logic
    console.log("Saving XMPie configuration:", config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl mx-auto my-8">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-900">
            XMPie Integration
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="environment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Environment
              </label>
              <select
                id="environment"
                value={environment}
                onChange={(e) =>
                  setEnvironment(e.target.value as "staging" | "live")
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="staging">Staging</option>
                <option value="live">Live</option>
              </select>
            </div>

            {Object.entries(config[environment]).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                {key === "useSampleFile" ? (
                  <select
                    id={key}
                    value={value}
                    onChange={(e) =>
                      handleChange(key as keyof XMPieConfig, e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                ) : (
                  <input
                    type={key.includes("password") ? "password" : "text"}
                    id={key}
                    value={value}
                    onChange={(e) =>
                      handleChange(key as keyof XMPieConfig, e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </div>
            ))}

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={applyToLive}
                  onChange={(e) => setApplyToLive(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                />
                <span className="text-sm text-gray-700">
                  Apply same settings to live environment
                </span>
              </label>
            </div>
          </form>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XMPieConfigModal;
