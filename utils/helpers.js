module.exports = {
  format_date: (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return` ${month}/${day}/${year}`;
  },
  same_user: (sess_user, list_user) => {
    return sess_user == list_user;
  },
};
