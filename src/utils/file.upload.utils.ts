import { extname } from 'path';

export const filterImage = (_, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const getFileName = (_, file, callback) => {
  const name = file.originalname.split('.')[0].replace(' ', '');
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  file.originalname = randomName;
  callback(null, `${name}-${randomName}${fileExtName}`);
};
