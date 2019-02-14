const config = {
    BaiduImgSelect: [
      {
        'size': '&nbsp;&nbsp;全部图片',
        'value': 0
      },
      {
        'size': '&nbsp;&nbsp;特大尺寸',
        'value': 9
      },
      {
        'size': '&nbsp;&nbsp;大尺寸',
        'value': 3
      },
      {
        'size': '&nbsp;&nbsp;中尺寸',
        'value': 2
      },
      {
        'size': '&nbsp;&nbsp;小尺寸',
        'value': 1
      }
    ]
  },
  mappingEncryption = {
    w: "a",
    k: "b",
    v: "c",
    1: "d",
    j: "e",
    u: "f",
    2: "g",
    i: "h",
    t: "i",
    3: "j",
    h: "k",
    s: "l",
    4: "m",
    g: "n",
    5: "o",
    r: "p",
    q: "q",
    6: "r",
    f: "s",
    p: "t",
    7: "u",
    e: "v",
    o: "w",
    8: "1",
    d: "2",
    n: "3",
    9: "4",
    c: "5",
    m: "6",
    0: "7",
    b: "8",
    l: "9",
    a: "0",
    _z2C$q: ":",
    "_z&e3B": ".",
    AzdH3F: "/"
  },
  mappingEncryptionRegular = /([a-w\d])/g,
  mappingEncryptionIspecial = /(_z2C\$q|_z&e3B|AzdH3F)/g;

module.exports = {config, mappingEncryption, mappingEncryptionRegular, mappingEncryptionIspecial};
