import transport from '../../axios/authAxios';

export default async function getProjects(setProjects, source) {
    return await transport({
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
        url: 'http://localhost:5000/apis/projects/get_projects'
    })
        .then(res => {
            console.log(res.data);
            setProjects(res.data);
        })
        .catch(err => console.error(err));
}