import transport from '../../axios/authAxios';

async function deleteProject(setDeleted, source, project_id) {

    return await transport({
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
        url: `http://localhost:5000/apis/projects/delete_project/${project_id}`
    })
        .then(res => {
            setDeleted(true);
        })
        .catch(err => {
            console.error(err.message);
        });
}

export default deleteProject;