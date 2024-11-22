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

const license: any = '55a586c3b3a9cf71930c0c9179a409e3Tz05NDI5OCxFPTE3NTI2NjIxOTAwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
LicenseInfo.setLicenseKey(license)

client.setConfig({
    baseURL: 'https://6qq02s9hq5.execute-api.eu-west-1.amazonaws.com/dev',
    headers: {
        "X-API-Key": 'Hz3fZ1EX4w1TiGpkjWIHS3bNaKhK2GIT3oE21yNc',
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
