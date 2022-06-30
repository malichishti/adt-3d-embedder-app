import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { ADT3DSceneAdapter, ADT3DViewer, IAuthService, IEnvironmentToConstantMapping, Locale, MsalAuthService, Theme } from '@microsoft/iot-cardboard-js';
//import { initializeIcons, loadTheme } from '@fluentui/react';

// Wrapper style for div containing scene viewer component
const cardStyle = {
  height: '100%',
  color: 'white'
} as React.CSSProperties;

function App() {
  
  const search = useLocation().search;
  const sceneId = new URLSearchParams(search).get('sceneId') ?? '';// ?? '89f1e8e5bf855e99ade4c4cb0cd067e1';

  // START: Set up adapter and use it to get the scenes config
  const [adapter, setAdapter] = useState<ADT3DSceneAdapter | null>(null);
  const [scenesConfig, setScenesConfig] = useState(null);    

  useEffect(() => {  
    let authenticationParameters = {
      hostUrl: process.env.REACT_APP_ADT_URL ?? '',
      blobContainerUrl: process.env.REACT_APP_STORAGE_URL,
      aadParameters: {
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,//if you allow multi-tenant in your App registeration, then reamplce 'tenant id' with 'common'
        clientId: process.env.REACT_APP_CLIENT_ID ?? '',
        scope: 'https://digitaltwins.azure.net/.default',
        redirectUri: process.env.REACT_APP_REDIRECT_URL ?? '',
        tenantId: process.env.REACT_APP_TENANT_ID,
        uniqueObjectId: 'http://digitaltwins.azure.net'
      }
    }; debugger;
      // Since useAuthParams is async, this needs to be in a useEffect
      setAdapter(
        new ADT3DSceneAdapter(
          new MsalAuthService(
            authenticationParameters.aadParameters
          ),
            authenticationParameters.hostUrl,
            authenticationParameters.blobContainerUrl,
            authenticationParameters.aadParameters.tenantId,
            authenticationParameters.aadParameters.uniqueObjectId
        )
    );
  }, []);
  // Note: It is probably best if ADT3DViewer gets the scenesConfig for you, but right now it doesn't.
  // We are working on it, stay tuned
  useEffect(() => {
      if (adapter) {
          adapter.getScenesConfig().then(({ result }) => {
              setScenesConfig(result.data as any);
          });
      }
  }, [adapter]);
  // END: Adapter set up and config fetching

  // The actual 3D Viewer component
  return !scenesConfig ? (
      <div></div>
  ) : (
      <div style={cardStyle}>
          <ADT3DViewer
              theme={Theme.Kraken}
              locale={Locale.EN}              
              sceneId={sceneId}
              scenesConfig={scenesConfig}
              adapter={adapter as any}
              pollingInterval={10000}
          />
      </div>
  );
}


export default App;
