/**
 * Created by Tank on 2017/8/2 0002.
 */
import VueElementBankCardSelect from './vue-element-bank-card-select.vue'
const bankCardSelect = {
    install (Vue, options) {
        Vue.component(VueElementBankCardSelect.name, VueElementBankCardSelect)
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(bankCardSelect);
}
export default bankCardSelect
