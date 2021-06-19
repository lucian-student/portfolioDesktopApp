import transport from '../../axios/authAxios';

async function updateProject(setCurrImage, setProject, project_id, removeImage, data, source) {

    const { image, description, github_url, project_url, name } = data;

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('github_url', github_url);
    formData.append('project_url', project_url);
    formData.append('removeImage', removeImage);

    return await transport({
        method: 'put',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
        cancelToken: source.token,
        url: `http://localhost:5000/apis/projects/update_project/${project_id}`
    })
        .then(res => {
            if (res.data.message === 'keep') {
                setProject(res.data.project);
            } else if (res.data.message === 'change') {
                setProject(res.data.project);
                if (res.data.project.data !== null) {
                    setCurrImage(btoa(new Uint8Array(res.data.project.data.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                    }, '')));
                }
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export default updateProject;