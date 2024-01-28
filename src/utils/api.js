export async function authrequest(uri, method, token, body) {
    const res = await fetch(`http://localhost:3000/api/v1${uri}`, {
          headers: {Authorization: `Bearer ${token}`},
          method,
          body
    })
    return await res.json()
}