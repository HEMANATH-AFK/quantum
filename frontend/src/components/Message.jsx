const Message = ({ variant = 'info', children }) => {
  const variants = {
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    danger: 'bg-red-50 text-red-700 border-red-100',
    success: 'bg-green-50 text-green-700 border-green-100',
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} text-sm font-medium`}>
      {children}
    </div>
  );
};

export default Message;
