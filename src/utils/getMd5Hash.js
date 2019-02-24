import SparkMD5 from 'spark-md5';

export const getFileMd5 = (file) => {
  return new Promise((resolve, reject) => {
    const newFile = new FileReader(file);
    newFile.readAsArrayBuffer(file);
    newFile.onloadend = (fileResult) => {
      resolve(window.btoa(SparkMD5.ArrayBuffer.hash(fileResult.target.result)));
    };
    newFile.onerror = () => {
      reject('error');
    };
  });
};
