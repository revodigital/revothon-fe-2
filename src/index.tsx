import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import App from 'App'
import {BASE_PATH} from 'config'
import {persistor, store} from 'store'
import {ConfigProvider} from 'contexts/ConfigContext'
import 'assets/scss/style.scss'
import Locales from "./ui-components/common/Locales";
import {client} from "./api-read-license/client";
import {LicenseInfo} from "@mui/x-license";

const license: any = import.meta.env.VITE_MUI_LICENSE_KEY
LicenseInfo.setLicenseKey(license)

client.setConfig({
    baseURL: import.meta.env.VITE_API_READ_LICENSE,
    headers: {
        "X-API-Key": import.meta.env.VITE_X_API_KEY,
    },
})

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider>
                <Locales>
                    <BrowserRouter basename={BASE_PATH}>
                        <App/>
                    </BrowserRouter>
                </Locales>
            </ConfigProvider>
        </PersistGate>
    </Provider>
)
