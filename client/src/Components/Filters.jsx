import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
// import { LanguageData, RatesData, TimesData, YearData } from "../Data/FilterData";
import { LanguageData, TimesData, YearData } from "../Data/FilterData";


const Filters = (props) => {
  // const { categories, category, setCategory, year, setYear, times, setTimes, rates, setRates, language, setLanguage } = props?.data;
  const { categories, category, setCategory, year, setYear, times, setTimes, language, setLanguage } = props?.data;

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? categories
          : [{ title: "No categories found" }],
    },
    {
      value: language,
      onChange: setLanguage,
      items: LanguageData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: times,
      onChange: setTimes,
      items: TimesData,
    },
    // {
    //   value: rates,
    //   onChange: setRates,
    //   items: RatesData,
    // },
  ];

  return (
    <div className="mt-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 lg:gap-12 grid-cols-2 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-xs text-left">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaAngleDown className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in diation-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-dry border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white " : "text-white"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected
                              ? "font-semibold text-white"
                              : "font-normal"
                          }`}
                        >
                          {item.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
};

export default Filters;
