'use client';

import { useState } from 'react';
import { Database, CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';

export default function DatabaseInit() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'initializing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const checkDatabase = async () => {
    setStatus('checking');
    setMessage('Đang kiểm tra kết nối...');
    
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        setStatus('success');
        setMessage('Database đã sẵn sàng');
      } else {
        setStatus('error');
        setMessage('Database chưa được khởi tạo');
        setShowDetails(true);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Không thể kết nối đến database');
      setShowDetails(true);
    }
  };

  const initializeDatabase = async () => {
    setStatus('initializing');
    setMessage('Đang khởi tạo database...');
    
    try {
      const response = await fetch('/api/init', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setMessage('Database đã được khởi tạo thành công');
        setShowDetails(false);
      } else {
        setStatus('error');
        setMessage(data.error || 'Lỗi khởi tạo database');
        setShowDetails(true);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Lỗi kết nối đến server');
      setShowDetails(true);
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'idle':
        return <Database className="h-5 w-5 text-gray-500" />;
      case 'checking':
      case 'initializing':
        return <Loader className="h-5 w-5 animate-spin text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'idle':
        return 'text-gray-600';
      case 'checking':
      case 'initializing':
        return 'text-yellow-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-500 max-w-sm">
      <div className="flex items-center space-x-2 mb-2">
        {getIcon()}
        <span className={`text-sm font-medium ${getTextColor()}`}>
          {message}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={checkDatabase}
          disabled={status === 'checking' || status === 'initializing'}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Kiểm tra</span>
        </button>
        
        {status === 'error' && (
          <button
            onClick={initializeDatabase}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
          >
            Khởi tạo DB
          </button>
        )}
      </div>
      
      {showDetails && (
        <div className="mt-2 text-xs text-gray-600">
          <p>Hướng dẫn:</p>
          <ol className="list-decimal list-inside space-y-1 mt-1">
            <li>Mở XAMPP Control Panel</li>
            <li>Khởi động MySQL service</li>
            <li>Click "Khởi tạo DB" ở trên</li>
          </ol>
        </div>
      )}
    </div>
  );
}
