import { OrbitLoader } from '@hemanath-afk/afk-motion';

const Loader = ({ className }) => {
  return (
    <div className="flex justify-center items-center py-12 w-full">
      <OrbitLoader className={className} />
    </div>
  );
};

export default Loader;
