import transport from '../../axios/notAuthAxios';
async function login(name, password, setAdmin, btnRef, source, setLoginErrors) {
    return await transport({
        method: 'post',
        data: { name, password },
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
        url: 'http://localhost:5000/apis/admin/login'
    })
        .then(res => {
            localStorage.setItem('accessToken', res.data.accessToken);
            setAdmin(true);
        })
        .catch(err => {
            setLoginErrors(err.response.data);
            console.error(err.message);
        }).finally(() => {
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
        });
}







export default login;
