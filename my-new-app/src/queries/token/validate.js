import transport from '../../axios/notAuthAxios';
async function validateToken(accessToken, setAdmin, setLoading, source) {
    return await transport({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cancelToken: source.token,
        url: 'http://localhost:5000/apis/token/validate'
    })
        .then(res => {
            if (res.data === 'success') {
                setAdmin(true);
            }
        })
        .catch(err => {
            console.error(err.message)
        }).finally(() => {
            setLoading(false);
        });
}

export default validateToken;