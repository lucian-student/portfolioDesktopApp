import transport from '../../axios/authAxios';

async function saveProject(data, source) {

    const { image, name } = data;

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('name', name);
    return await transport({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
        cancelToken: source.token,
        url: 'http://localhost:5000/apis/projects/create_project'
    })
        .then(res => {
            /* const base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.data)));
             setResult(base64String);*/

            console.log(res.data);
        })
        .catch(err => {
            console.error(err.message);
        });
}

export default saveProject;