import transport from '../../axios/authAxios';

async function saveProject(data, source) {

    const { image, description, github_url, project_url, name } = data;

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('github_url', github_url);
    formData.append('project_url', project_url);

    return await transport({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
        cancelToken: source.token,
        url: 'http://localhost:5000/apis/projects/create_project'
    })
        .then(res => {
        })
        .catch(err => {
            console.error(err.message);
        });
}

export default saveProject;