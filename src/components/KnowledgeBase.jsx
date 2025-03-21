// src/components/KnowledgeBase.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaUpload, FaTrash, FaFile, FaFilePdf, FaFileCsv, FaFileAlt, FaSearch, FaTimesCircle } from 'react-icons/fa';

const KnowledgeBase = () => {
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Fetch documents when component mounts
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      // This would be replaced with your actual API call
      // const response = await fetch('http://localhost:8080/api/knowledge-base');
      // const data = await response.json();
      
      // For demo, using mock data
      const mockDocuments = [
        { id: '1', name: 'company_policy.pdf', type: 'pdf', size: '1.2 MB', uploadedAt: '2025-02-15T10:30:00Z' },
        { id: '2', name: 'product_manual.txt', type: 'txt', size: '256 KB', uploadedAt: '2025-02-20T14:15:00Z' },
        { id: '3', name: 'customer_data.csv', type: 'csv', size: '3.4 MB', uploadedAt: '2025-03-05T09:45:00Z' },
        { id: '4', name: 'technical_specs.txt', type: 'txt', size: '512 KB', uploadedAt: '2025-03-10T16:20:00Z' },
      ];
      
      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadError('');
    
    // Create FormData object to send files
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!['txt', 'pdf', 'csv'].includes(fileType)) {
        setUploadError('Only TXT, PDF, and CSV files are allowed.');
        setIsUploading(false);
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size should not exceed 10MB.');
        setIsUploading(false);
        return;
      }
      
      formData.append('files', file);
    }
    
    try {
      // This would be replaced with your actual API call
      // const response = await fetch('http://localhost:8080/api/knowledge-base/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // For demo, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate new documents being added
      const newDocuments = Array.from(files).map((file, index) => {
        const fileType = file.name.split('.').pop().toLowerCase();
        return {
          id: `new-${Date.now()}-${index}`,
          name: file.name,
          type: fileType,
          size: formatFileSize(file.size),
          uploadedAt: new Date().toISOString()
        };
      });
      
      setDocuments(prevDocs => [...prevDocs, ...newDocuments]);
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadError('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      // This would be replaced with your actual API call
      // await fetch(`http://localhost:8080/api/knowledge-base/${documentId}`, {
      //   method: 'DELETE'
      // });
      
      // For demo, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update state by filtering out the deleted document
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return <FaFilePdf />;
      case 'csv': return <FaFileCsv />;
      case 'txt': return <FaFileAlt />;
      default: return <FaFile />;
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="knowledge-base-container">
      <h2 className="knowledge-base-title">Knowledge Base Management</h2>
      <p className="knowledge-base-description">
        Upload and manage documents for the chatbot's knowledge base.
        Supported file types: TXT, PDF, CSV. Maximum file size: 10MB.
      </p>
      
      {uploadError && (
        <div className="upload-error">
          <FaTimesCircle /> {uploadError}
        </div>
      )}
      
      <div className="knowledge-base-actions">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <FaTimesCircle />
            </button>
          )}
        </div>
        
        <div className="upload-container">
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".txt,.pdf,.csv"
            onChange={handleUpload}
            className="file-input"
            ref={fileInputRef}
          />
          <label htmlFor="file-upload" className="upload-button">
            <FaUpload />
            <span>{isUploading ? 'Uploading...' : 'Upload Documents'}</span>
          </label>
        </div>
      </div>
      
      <div className="documents-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map(doc => (
                <tr key={doc.id}>
                  <td className="document-name">
                    {getFileIcon(doc.type)} <span>{doc.name}</span>
                  </td>
                  <td className="document-type">{doc.type.toUpperCase()}</td>
                  <td className="document-size">{doc.size}</td>
                  <td className="document-date">{formatDate(doc.uploadedAt)}</td>
                  <td className="document-actions">
                    <button 
                      className="delete-button" 
                      onClick={() => handleDelete(doc.id)}
                      title="Delete document"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-documents">
                  {searchTerm 
                    ? 'No documents matching your search' 
                    : 'No documents in the knowledge base'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KnowledgeBase;