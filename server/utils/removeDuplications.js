const removeDuplications = (id, array) => {
  array.map((el) => {
    if (array.includes(el)) {
      if (el.fromId.toString() === id) {
        el.userInfo = el.toIdUserInfo;
        const searchID = el.toId.toString();
        array = array.filter((el) => el.fromId.toString() !== searchID);
      } else {
        el.userInfo = el.fromIdUserInfo;
        const searchID = el.fromId.toString();
        array = array.filter((el) => el.toId.toString() !== searchID);
      }
    }
  });
  return array;
};

module.exports = removeDuplications;
