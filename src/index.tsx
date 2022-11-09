import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {AppRoutes} from "./routes/routes";
import {AuthContainer} from "./context/authContext";
import {ScaleContainer} from "./context/scaleContext";
import 'antd/dist/antd.css';
import "./index.scss";

import {QueryClient, QueryClientProvider, useQuery} from 'react-query'

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ScaleContainer>
                <AuthContainer>
                    <BrowserRouter>
                        <AppRoutes/>
                    </BrowserRouter>
                </AuthContainer>
            </ScaleContainer>
        </QueryClientProvider>
    </React.StrictMode>
);
