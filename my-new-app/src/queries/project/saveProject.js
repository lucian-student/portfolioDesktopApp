import transport from '../../axios/authAxios';



async function saveProject(data, source, setResult) {

    const { image } = data;

    const formData = new FormData();
    formData.append('image', image[0]);

    return await transport({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
        cancelToken: source.token,
        url: 'http://localhost:5000/apis/projects/create_project'
    })
        .then(res => {
            console.log(res.data);
            const reader = new FileReader();
            reader.readAsDataURL(res.data);
            reader.onloadend = function () {
                setResult([reader.result]);
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export default saveProject;