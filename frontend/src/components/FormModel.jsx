import {FaTimes} from 'react-icons/fa'
const FormModel = ({ title, closeModel, children, onsubmit, err }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/50 ">
      <div className="bg-white w-[50%] mx-auto my-[5rem] p-4 capitalize mb-10">
        <div className="flex justify-between ">
          <h1 className="font-bold text-xl text-blue-500">{title}</h1>
          <button onClick={closeModel} className='bg-blue-500 text-white rounded-full p-2' ><FaTimes /></button>
        </div>
        <form onSubmit={onsubmit}>
          <h1> {err}</h1>
          {children}
        </form>
      </div>
    </div>
  );
};

export default FormModel;
