import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import { FaBackward, FaForward } from "react-icons/fa";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { getAllMoviesAction } from "../Redux/Actions/MoviesAction";
import { LanguageData, TimesData, YearData } from "../Data/FilterData";
import { useParams } from "react-router-dom";


const MoviesPage = () => {
  const {search} = useParams()
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  // const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);

  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  // All movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );

  // Get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

    // Clear all selected fields
  const clearFilters = () => {
    setCategory({ title: "All Categories" });
    setYear(YearData[0]);
    setTimes(TimesData[0]);
    // setRates(RatesData[0]);
    setLanguage(LanguageData[0]);
  };


  //QUERIES
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      time: times?.title.replace(/\D/g, ""),
      language: language?.title === "Sort By Language" ? "" : language?.title,
      // rate: rates?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  // }, [category, times, language, rates, year, search ])
  }, [category, times, language, year, search ])

  //useEffect
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }

    // Get all movies 
    dispatch(getAllMoviesAction(queries))
  }, [isError, dispatch, queries]);

  // Pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    // rates: rates,
    // setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  }

  console.log(search)

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />

        <div className=" bg-main text-dryGray flex justify-between p-3 mt-4">
          <p className="text-lg font-medium">
            Total{" "}
            <span className="font-bold text-subMain">
              {movies ? movies?.length : 0}
            </span>{" "}
            items found {search && `for "${search}"`}
          </p>

          <button
            onClick={clearFilters}
            className="text-white px-4 py-2 rounded font-semibold border border-subMain bg-subMain hover:bg-dry"
          >
            Clear Filters
          </button>
        </div>

        {isLoading ? (
          <div className={sameClass}>
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-10">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>

            {/* More Movies loading btn */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain bg-subMain"
              >
                <FaBackward className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain bg-subMain"
              >
                <FaForward className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className={sameClass}>
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seems like we dont have any movie
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MoviesPage;