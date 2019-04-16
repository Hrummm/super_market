/* ���ߺ��� */ 
// ��֤���� (����ĸ��ͷ��������3~6֮�䣬ֻ�ܰ����ַ������ֺ��»���)
export function passwordReg(val) {
    const reg = /^[a-zA-Z]\w{2,5}$/;
    return reg.test(val)
}