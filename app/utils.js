const objToAssoc = obj => {
  return Object.keys(obj).map(key => [key, obj[key]]);
};

const assocToObj = assoc => {
  return assoc.reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};

const flatten = arr => {
  return arr.reduce((a, b) => {
    return a.concat(b)
  }, []);
};

const mapField = (arr, field, cb) => {
  return arr.map(el => Object.assign({}, el, {
    [field]: cb(el[field])
  }));
};

module.exports = {objToAssoc, assocToObj, flatten, mapField};
