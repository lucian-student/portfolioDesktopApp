export default function isFileImage(file, image) {
    if (image && file[0]) {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        return acceptedImageTypes.includes(file[0].type);
    }
    return true;
}