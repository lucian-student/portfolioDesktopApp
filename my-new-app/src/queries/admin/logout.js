import transport from '../../axios/authAxios';
async function logout(setAdmin, source) {
    return await transport({
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
        cancelToken: source.token,
        url: 'http://localhost:5000/apis/admin/logout'
    })
        .then(res => {
            if (res.data === 'success') {
                localStorage.removeItem('accessToken');
                setAdmin(false);
            }
        })
        .catch(err => {
            console.error(err.message)
        });
}

export default logout;