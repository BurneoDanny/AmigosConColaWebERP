import './index.css'
import router from './routes'
import {setup} from "@storybook/vue3";

setup(app => {
    app
        .use(router)
        .mount("#app")
})
