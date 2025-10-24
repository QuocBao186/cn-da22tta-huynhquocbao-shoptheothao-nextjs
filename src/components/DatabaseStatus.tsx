'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function DatabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState('Đang kiểm tra kết nối...');

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        setStatus('connected');
        setMessage('Kết nối database thành công');
      } else {
        setStatus('error');
        setMessage('Lỗi kết nối database');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Không thể kết nối đến server');
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader className="h-5 w-5 animate-spin text-yellow-500" />;
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'checking':
        return 'text-yellow-600';
      case 'connected':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-500">
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className={`text-sm font-medium ${getTextColor()}`}>
          {message}
        </span>
      </div>
    </div>
  );
}
