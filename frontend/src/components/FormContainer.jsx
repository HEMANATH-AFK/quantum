const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mt-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
