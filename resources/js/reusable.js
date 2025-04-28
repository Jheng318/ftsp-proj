export const formatDate = (inDate) => {
    const date = new Date(inDate);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return `${date.getDate()} ${
        months[date.getMonth() + 1]
    } ${date.getFullYear()}`;
};
