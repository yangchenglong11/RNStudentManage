import Storage from "react-native-storage";

var storage = new Storage({
  size: 1000, // 最大容量，默认值1000条数据循环存储
  defaultExpires: 1000 * 3600 * 24, // eslint-disable-line no-magic-numbers
  enableCache: true // 读写时在内存中缓存数据
});

module.exports = storage;
