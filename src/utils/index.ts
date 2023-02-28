const getUId = () => Date.now().toString(36) + Math.random().toString(36);

const validateEmail = (email: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
};

const formatVND = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

export { getUId, validateEmail, formatVND };
