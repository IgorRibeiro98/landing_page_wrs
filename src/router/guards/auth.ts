import { Guard } from '@/router/guards';

export default ((to) => {
    if (to.name === 'login') return true;

    if (!localStorage.getItem("accessToken") || !localStorage.getItem("user")) {
        return { name: "login" };
    }
    return true;
}) as Guard;