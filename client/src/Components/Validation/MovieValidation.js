import * as yup from "yup"

const movieValidation = yup.object().shape({
    name: yup
    .string()
    .required("Please enter a movie name")
    .max(50, "Movie name must be less than 50 characters"),
    
    time: yup
    .number("Please enter a number")
    .required("Please enter the movie duration"),

    language: yup
    .string()
    .required("Please enter movie language"),

    year: yup
    .string("Please enter the release year")
    .required("Please enter year of release"),

    category: yup
    .string()
    .required("Please select movie category"),

    desc: yup
    .string()
    .required("Please enter movie description")
    .max(300, "Movie description should be less than 300 characters"),

});

export { movieValidation };