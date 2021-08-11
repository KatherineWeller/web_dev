const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'katto', 
    api_key: '698999242829686', 
    api_secret: 'Hoa8xJxT1YGsBZTc1gNOKA6HSC8' 
  });

  const storage = new CloudinaryStorage({
      cloudinary, 
      params: {
        folder: 'Final_Skeleton',
        allowedFormats: ['jpeg', 'png', 'jpg']
      }
  });

module.exports = {
    cloudinary,
    storage
}  
