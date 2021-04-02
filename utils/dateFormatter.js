module.exports = (date) => {
    const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    console.log("estDate", estDate);
    const year = estDate.getFullYear();
    const month = ("0" + (estDate.getMonth() + 1)).slice(-2);
    const day = estDate.getDate();

    return `${year}-${month}-${day}`;
}