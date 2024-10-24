import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { IoIosAddCircle } from "react-icons/io";
import Table2 from '../../../Components/Table2';
import CategoryModel from '../../../Components/Model/CategoryModel';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAction} from '../../../Redux/Actions/CategoriesActions';
import Loader from '../../../Components/Notifications/Loader';
import Empty from '../../../Components/Notifications/Empty';
import toast from 'react-hot-toast';

const Categories = () => {
    const [modelOpen, setModelOpen] = useState(false);
    const [category, setCategory] = useState();

    const dispatch = useDispatch();

    // GET ALL CATEGORIES
    const { categories, isLoading} = useSelector(
        (state) => state.categoryGetAll
    );

    //DELETE CATEGORY
    const { isSuccess, isError } = useSelector(
        (state) => state.categoryDelete
    );

    const adminDeleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategoryAction(id))
        }
    }

    const onEditFunction = (id) => {
        setCategory(id);
        setModelOpen(!modelOpen);
    };

    useEffect(() => {

        if (isError) {
            toast.error(isError);
            dispatch({ type: "DELETE_CATEGORY_RESET"});
        }

        if (isSuccess) {
            dispatch({ type: "DELETE_CATEGORY_RESET"});
        }

        if (modelOpen === false) {
            setCategory();
        }
    }, [modelOpen, dispatch, isError, isSuccess]);
  return (
    <Sidebar>
        <CategoryModel modelOpen={modelOpen} setModelOpen={setModelOpen} category={category}/>
        <div className="flex flex-col gap-6">
            <div className="flex-btn gap-2">
                <h2 className="font-semibold">
                    Categories
                </h2>
                <button 
                    onClick={() => setModelOpen(true)} 
                    className="bg-subMain flex-rows font-normal transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded-md"
                >
                    <IoIosAddCircle className='mr-2 w-5 h-5'/>Create
                </button>
            </div>

            
            { isLoading ? (
                <Loader />
            ) : categories?.length > 0 ? (
                <Table2 
                    data={categories} 
                    users={false} 
                    onEditFunction={onEditFunction}
                    onDeleteFunction={adminDeleteCategory}/>
            ) : (
                <Empty message="You have no categories" />
            )
        }


        
        </div>
    </Sidebar>
  )
}

export default Categories