export async function getMe() {
    const res = await fetch(`/api/auth/me`, {
        credentials: 'include'
    })
    if (!res.ok) return null;
    return res.json();
}