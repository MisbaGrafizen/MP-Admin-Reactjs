import axios from 'axios';

const cloudinaryUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Mp_admin_img'); 

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dn1jdxyoq/image/upload`, 
            formData
        );
        return response.data.secure_url; 
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; 
    }
};

export default cloudinaryUpload;
