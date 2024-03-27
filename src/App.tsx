import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { firebaseAppState, themeState } from "./shared/state";
import { Routes } from "./pages";
// import { MainMenu } from "./components";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./shared/constants";

import styles from "./App.module.scss";
function App() {
	const theme = useRecoilValue(themeState);
	const [firebaseApp, setFirebaseApp] = useRecoilState(firebaseAppState);

	React.useEffect(() => {
		if (!firebaseApp) {
			const app = initializeApp(firebaseConfig);

			setFirebaseApp(app);
		}
	}, [firebaseApp, setFirebaseApp]);

  if (!firebaseApp) {
    return null;
  }

	return (
		<main className={`${styles.appContainer} ${styles[theme]}`}>
			{/* <MainMenu /> */}

			<div className={styles.pageContainer}>
				<Routes />
			</div>
		</main>
	);
}

export default App;
