module.exports = {
  // Formats the date into MMDDYYYY
  format_date: (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return ` ${month}/${day}/${year}`;
  },
  // Checks if the current user is the one who made the post or comment
  same_user: (sess_user, list_user) => {
    return sess_user == list_user;
  },
};
