import React from 'react';
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  Div,
  View,
  Panel,
  PanelHeader,
  Group,
  SimpleCell,
  Placeholder,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { Icon28UserOutline, Icon28SettingsOutline } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import vkuiLogo from './images/vkui_logo.png';
import styles from './App.module.css';

interface MainProps {
  initialPanel: string;
}

function Main({ initialPanel }: MainProps) {
  const [activePanel, setActivePanel] = React.useState(initialPanel);

  return (
    <SplitLayout style={{ justifyContent: 'center' }} header={<PanelHeader separator={false} />}>
      <SplitCol width="100%" stretchedOnMobile autoSpaced>
        <View activePanel={activePanel}>
          <Panel id="main">
            <PanelHeader>VKUI</PanelHeader>
            <Group>
              <Div className={styles.app}>
                <img src={vkuiLogo} alt="vkui logo" height={100} />
              </Div>
              <SimpleCell onClick={() => setActivePanel('account')} before={<Icon28UserOutline />}>
                Account
              </SimpleCell>
              <SimpleCell
                onClick={() => setActivePanel('settings')}
                before={<Icon28SettingsOutline />}
              >
                Settings
              </SimpleCell>
            </Group>
          </Panel>
          <Panel id="account">
            <PanelHeader before={<PanelHeaderBack onClick={() => setActivePanel('main')} />}>
              Account
            </PanelHeader>
            <Placeholder>The page is empty</Placeholder>
          </Panel>
          <Panel id="settings">
            <PanelHeader before={<PanelHeaderBack onClick={() => setActivePanel('main')} />}>
              Settings
            </PanelHeader>
            <Placeholder>The page is empty</Placeholder>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

function App() {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Main initialPanel="main" />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
