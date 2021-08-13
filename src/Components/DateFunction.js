// FONCTION QUI COMPARE LA DATE DONNEE (BDD) A ACTUELLEMENT.
// RETOURNE UNE PHRASE QUI DIT SI C'EST OLD OU NEW
function getDifferenceInDays(date1, date2){
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24)
}

const exportedObject = {
    getDifferenceInDays
};

export default exportedObject
