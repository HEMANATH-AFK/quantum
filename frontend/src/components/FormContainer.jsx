const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-5/12 mt-12 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300 text-left">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
