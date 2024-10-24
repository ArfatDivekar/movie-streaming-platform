import React, { useEffect, useState } from 'react'
import MainModel from './MainModel'
import { LoginInputs } from '../../Components/UsedInputs'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction, updateCategoryAction } from '../../Redux/Actions/CategoriesActions';
import toast from 'react-hot-toast';


const CategoryModel = ({ modelOpen, setModelOpen, category }) => {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.categoryCreate
    );

    const { isLoading:upLoading, isError: upError, isSuccess:upSuccess } = useSelector(
        (state) => state.categoryUpdate
    );

    

    // Create category handler
    const submitHandler = (e) => {
        e.preventDefault()
        if (title) {
            // if category is not empty then update category else create category
            if (category) {
                dispatch(updateCategoryAction(category?._id, {title: title}));
                setModelOpen(!modelOpen);
            } else {
                dispatch(createCategoryAction({title: title}));
                setTitle("")
            }
        } else {
            toast.error("Please write a category name")
        }
    }


    const cancelHandler = () => {
        setModelOpen(false);
    }

    useEffect(() => {
        // Error
        if (upError || isError) {
            toast.error(upError || isError);
            dispatch({ type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"});
        }

        if (upSuccess || isSuccess) {
            dispatch({ type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"});
        }

        // if category is not null then set title to category title
        if(category) {
            setTitle(category?.title)
        }

        if (modelOpen === false) {
            setTitle("");
        }
    }, [modelOpen, dispatch, isError, isSuccess, category, upError, upSuccess]);



  return (
    <MainModel modelOpen={modelOpen} setModelOpen={setModelOpen}>
        <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
            <h2 className="text-3xl font-bold">
                {category ? "Update" : "Create"}
            </h2>

            <form onSubmit={submitHandler} className="flex flex-col gap-6 text-left mt-6">
                {/* Create category input box */}
                <LoginInputs 
                    label="Category Name" 
                    placeholder={"Action"}
                    type="text" 
                    bg={false}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex gap-4">
                    <button 
                        disabled={ isLoading || upLoading }
                        type='submit'
                        className="flex-1 py-3 transitions bg-subMain hover:bg-main rounded-[3px] border border-subMain"
                    >
                        {
                            isLoading || upLoading ? "Loading..." : category ? "Update" : "Create"
                        }
                    </button>
                    <button
                        type="button"
                        onClick={cancelHandler}
                        className="flex-1 py-3 transitions bg-gray-500 hover:bg-gray-600 rounded-[3px] border border-subMain text-white"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </MainModel>
  )
}

export default CategoryModel