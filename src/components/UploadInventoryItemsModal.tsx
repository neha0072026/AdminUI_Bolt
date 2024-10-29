import React, { useState } from "react";
import { X, Upload } from "lucide-react";

interface UploadInventoryItemsModalProps {
  onClose: () => void;
  onUpload: (items: any[]) => void;
}

const UploadInventoryItemsModal: React.FC<UploadInventoryItemsModalProps> = ({
  onClose,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [updateExisting, setUpdateExisting] = useState("replace");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement file upload and parsing logic
    console.log("File to upload:", selectedFile);
    console.log("Update existing inventory:", updateExisting);
    // For now, we'll just close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Upload Inventory Items</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Inventory File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  Note: Upload a file only with the extensions .csv, .xls, .xlsx
                </p>
              </div>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="update-existing"
              className="block text-sm font-medium text-gray-700"
            >
              Update Existing Inventory
            </label>
            <select
              id="update-existing"
              name="update-existing"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={updateExisting}
              onChange={(e) => setUpdateExisting(e.target.value)}
            >
              <option value="replace">Replace Quantity with Update</option>
              <option value="adjust">Adjust Quantity with Update</option>
              <option value="skip">Skip Update</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Upload Items
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadInventoryItemsModal;
