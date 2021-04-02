module.exports = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = date.getDate();

    return `${year}-${month}-${day}`
}