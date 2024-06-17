import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
const ReceptsList = ({ recepts }) => {
  const handleDelete = (taskId) => {
    const taskRef = doc(db, "recepts", taskId);
    deleteDoc(taskRef)
      .then(() => {
        toast.success("task deleted succesfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div>
      <h1 className="mb-5 text-4xl font-bold text-center">My Recepts</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
        {recepts.map((recept) => {
          return (
            <div key={recept.id} className="card  bg-base-100 shadow-xl">
              <figure>
                <img
                  src={recept.images[0]}
                  alt="Shoes"
                  className=" object-cover w-full h-52 "
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title text-xl">{recept.title}</h2>
                  <span className="font-bold text-xl text-base-300">
                    {recept.price}.00$
                  </span>
                </div>
                <span className="">{recept.cookingTime} minutes</span>
                <p className="line-clamp-3">{recept.method}</p>

                <div className="card-actions flex-nowrap items-center">
                  <Link
                    to={`/singleRecept/${recept.id}`}
                    className="btn btn-sm  md:btn-md btn-primary "
                  >
                    Read more
                  </Link>
                  <button
                    onClick={() => handleDelete(recept.id)}
                    className="btn btn-secondary"
                  >
                    <IoTrashOutline className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReceptsList;
