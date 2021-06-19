import transport from '../../axios/authAxios';


export default async function getProject(project_id, setProject, source) {
    return await transport({
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
        url: `http://localhost:5000/apis/projects/get_project/${project_id}`
    }).then(res => {
        setProject(res.data);
    })
        .catch(err => console.error(err));
}